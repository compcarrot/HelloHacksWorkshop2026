const http = require('http')

const PORT = process.env.PORT || 5001

const server = http.createServer(async (request, response) => {
  const url = new URL(request.url, `http://${request.headers.host}`)
  const typeMatch = url.pathname.match(/^\/api\/type\/([^/]+)\/?$/)

  if (request.method === 'GET' && typeMatch) {
    const type = decodeURIComponent(typeMatch[1])

    try {
      const pokeApiResponse = await fetch(`https://pokeapi.co/api/v2/type/${encodeURIComponent(type)}/`)
      const pokeApiData = await pokeApiResponse.json()

      if (!pokeApiResponse.ok) {
        response.writeHead(pokeApiResponse.status, { 'Content-Type': 'application/json' })
        response.end(JSON.stringify({ error: pokeApiData.detail || 'Pokémon type not found' }))
        return
      }

      const damageRelations = pokeApiData.damage_relations
      const result = {
        half_damage_to: damageRelations.half_damage_to.map(({ name }) => name),
        double_damage_from: damageRelations.double_damage_from.map(({ name }) => name),
      }

      response.writeHead(200, { 'Content-Type': 'application/json' })
      response.end(JSON.stringify(result))
    } catch {
      response.writeHead(502, { 'Content-Type': 'application/json' })
      response.end(JSON.stringify({ error: 'Could not reach PokéAPI' }))
    }
    return
  }

  response.writeHead(404, { 'Content-Type': 'application/json' })
  response.end(JSON.stringify({ error: 'Not found' }))
})

server.listen(PORT, () => {
  console.log(`GET endpoint available at http://localhost:${PORT}/api/type/{id-or-name}`)
})
