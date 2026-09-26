import { useMemo, useState } from 'react';

type Term = {
  id: string;
  title: string;
  definition: string;
  aliases: string[];
  searchText: string;
};

const normalize = (value: string) =>
  value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('pt-BR');

export default function TermSidebar({
  terms,
  currentId,
}: {
  terms: Term[];
  currentId: string;
}) {
  const [query, setQuery] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);
  const filteredTerms = useMemo(() => {
    const needle = normalize(query.trim());
    if (!needle) return terms;
    return terms.filter((term) =>
      normalize(`${term.title} ${term.definition} ${term.aliases.join(' ')} ${term.searchText}`).includes(needle),
    );
  }, [query, terms]);

  return (
    <aside className="min-w-0 lg:sticky lg:top-6 lg:max-h-[calc(100vh-3rem)] lg:self-start lg:overflow-y-auto">
      <button
        type="button"
        className="flex w-full items-center justify-between rounded-lg border border-neutral-700 bg-neutral-800 px-4 py-3 text-left font-medium text-neutral-100 lg:hidden"
        aria-expanded={mobileOpen}
        onClick={() => setMobileOpen((open) => !open)}
      >
        Navegar pelos termos <span aria-hidden="true">{mobileOpen ? '−' : '+'}</span>
      </button>

      <div className={`${mobileOpen ? 'mt-4' : 'hidden'} lg:mt-0 lg:block`}>
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-neutral-300">Glossário</h2>
        <label htmlFor="sidebar-term-search" className="sr-only">Buscar termos</label>
        <input
          id="sidebar-term-search"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Buscar termos…"
          autoComplete="off"
          className="mb-3 w-full rounded-lg border border-neutral-600 bg-neutral-800 px-3 py-2 text-sm text-neutral-100 outline-none placeholder:text-neutral-400 focus:border-sky-300 focus:ring-2 focus:ring-sky-300/25"
        />
        <nav aria-label="Termos do glossário">
          {filteredTerms.length > 0 ? (
            <ul className="space-y-1">
              {filteredTerms.map((term) => (
                <li key={term.id}>
                  <a
                    href={`${import.meta.env.BASE_URL}termos/${term.id}/`}
                    aria-current={term.id === currentId ? 'page' : undefined}
                    className={`block rounded-md px-3 py-2 text-sm transition-colors ${
                      term.id === currentId
                        ? 'bg-neutral-700 font-medium text-neutral-100'
                        : 'text-neutral-300 hover:bg-neutral-800 hover:text-neutral-100'
                    }`}
                  >
                    {term.title}
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="px-3 py-2 text-sm text-neutral-300">Nenhum termo encontrado.</p>
          )}
        </nav>
      </div>
    </aside>
  );
}
