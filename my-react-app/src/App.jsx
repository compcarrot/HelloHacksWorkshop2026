import { useState } from 'react'

const types = [
  { name: 'Fire', icon: 'F', tone: 'border-orange-200 bg-orange-50 text-orange-800 hover:border-orange-400', selected: 'border-orange-500 bg-orange-100 ring-2 ring-orange-200' },
  { name: 'Water', icon: 'W', tone: 'border-sky-200 bg-sky-50 text-sky-800 hover:border-sky-400', selected: 'border-sky-500 bg-sky-100 ring-2 ring-sky-200' },
  { name: 'Fairy', icon: 'Y', tone: 'border-pink-200 bg-pink-50 text-pink-800 hover:border-pink-400', selected: 'border-pink-500 bg-pink-100 ring-2 ring-pink-200' },
  { name: 'Dragon', icon: 'D', tone: 'border-violet-200 bg-violet-50 text-violet-800 hover:border-violet-400', selected: 'border-violet-500 bg-violet-100 ring-2 ring-violet-200' },
]

function App() {
  const [selectedType, setSelectedType] = useState(null)

  function getMatchup(type) {
  // API CALL WILL GO HERE, AND WE WILL RETURN THE RESPONSE
  return `Fake API response: You are fighting a ${type}-type Pokémon.`;
}

function handleTypeClick(type) {
  const response = getMatchup(type);
  setSelectedType(response);
}

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#f6f8fc] px-5 py-12 text-slate-800">
      <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-28 h-80 w-80 rounded-full border-[40px] border-red-100/70" />
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-40 -left-24 h-96 w-96 rounded-full border-[40px] border-sky-100/70" />

      <section className="relative w-full max-w-xl rounded-[2rem] border border-slate-200/80 bg-white p-7 shadow-[0_24px_70px_-32px_rgba(15,23,42,0.28)] sm:p-11">
        <header className="mb-9 flex items-center gap-3">
          <span aria-hidden="true" className="relative h-11 w-11 overflow-hidden rounded-full border-[3px] border-slate-800 bg-white shadow-sm">
            <span className="absolute inset-x-0 top-0 h-1/2 bg-red-500" />
            <span className="absolute inset-x-0 top-1/2 h-[3px] -translate-y-1/2 bg-slate-800" />
            <span className="absolute left-1/2 top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-slate-800 bg-white" />
          </span>
          <div>
            <p className="text-sm font-extrabold tracking-tight text-slate-800">{'POK\u00c9DEX'} <span className="font-medium text-slate-400">/ BATTLE GUIDE</span></p>
            <p className="mt-0.5 text-xs text-slate-500">A little help for your next match</p>
          </div>
        </header>

        <div className="mb-7">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-red-500">Type matchup</p>
          <h1 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">Choose your opponent</h1>
          <p className="mt-2 text-[15px] leading-relaxed text-slate-500">Select their type to get ready for battle.</p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {types.map(({ name, icon, tone, selected }) => (
            <button
              key={name}
              type="button"
              aria-pressed={selectedType === name}
              onClick={() => handleTypeClick(name)}
              className={`flex min-h-16 items-center gap-3 rounded-2xl border px-4 py-3 text-left font-bold transition duration-150 hover:-translate-y-0.5 hover:shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-800 ${tone} ${selectedType === name ? selected : ''}`}
            >
              <span aria-hidden="true" className="flex h-8 w-8 items-center justify-center rounded-full bg-white/80 text-sm font-black">{icon}</span>
              <span>{name}</span>
              <span className="ml-auto text-xs opacity-50">&gt;</span>
            </button>
          ))}
        </div>

        <p aria-live="polite" className="mt-6 min-h-6 text-sm font-semibold text-slate-700">
          {selectedType}
        </p>

        <footer className="mt-7 border-t border-slate-100 pt-5 text-center text-xs text-slate-400">Choose wisely, Trainer.</footer>
      </section>
    </main>
  )
}

export default App
