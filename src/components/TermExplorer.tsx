import { useEffect, useRef, useState } from 'react';

type TermSummary = {
  id: string;
  title: string;
  definition: string;
  aliases: string[];
  searchText: string;
};

type Result = {
  url: string;
  title: string;
  description: string;
};

type PagefindResult = {
  data: () => Promise<{
    url: string;
    excerpt?: string;
    meta: { title?: string; description?: string };
  }>;
};

type PagefindModule = {
  search: (query: string) => Promise<{ results: PagefindResult[] }>;
};

const PAGE_SIZE = 8;
const normalize = (value: string) =>
  value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('pt-BR');
const plainText = (value: string) => value.replace(/<[^>]+>/g, '').trim();

export default function TermExplorer({ terms }: { terms: TermSummary[] }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const searching = query.trim().length > 0;

  useEffect(() => {
    if (searching) return;
    setVisibleCount(PAGE_SIZE);
  }, [searching]);

  useEffect(() => {
    if (searching || visibleCount >= terms.length) return;
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisibleCount((count) => Math.min(count + PAGE_SIZE, terms.length));
        }
      },
      { rootMargin: '240px' },
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [searching, terms.length, visibleCount]);

  useEffect(() => {
    const value = query.trim();
    if (!value) {
      setResults([]);
      setSearched(false);
      setLoading(false);
      return;
    }

    let cancelled = false;
    setLoading(true);
    const timer = window.setTimeout(async () => {
      let next: Result[];
      try {
        const bundleUrl = `${import.meta.env.BASE_URL}pagefind/pagefind.js`;
        const pagefind = (await import(/* @vite-ignore */ bundleUrl)) as PagefindModule;
        const matches = await pagefind.search(value);
        next = await Promise.all(
          matches.results.slice(0, 20).map(async (match) => {
            const data = await match.data();
            return {
              url: data.url,
              title: data.meta.title ?? 'Termo',
              description: plainText(data.excerpt ?? data.meta.description ?? ''),
            };
          }),
        );
      } catch {
        // No dev server, Pagefind ainda não foi gerado; usa o conteúdo Markdown.
        const needle = normalize(value);
        next = terms
          .filter((term) => normalize(`${term.title} ${term.definition} ${term.aliases.join(' ')} ${term.searchText}`).includes(needle))
          .slice(0, 20)
          .map((term) => ({
            url: `${import.meta.env.BASE_URL}termos/${term.id}/`,
            title: term.title,
            description: term.definition,
          }));
      }

      if (!cancelled) {
        setResults(next);
        setLoading(false);
        setSearched(true);
      }
    }, 180);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [query, searching, terms]);

  const visibleTerms = terms.slice(0, visibleCount);

  return (
    <>
      <div className="mt-8">
        <label className="mb-2 block text-sm font-medium text-neutral-200" htmlFor="term-search">
          Buscar termos
        </label>
        <input
          id="term-search"
          type="search"
          value={query}
          onChange={(event) => {
            const value = event.target.value;
            setQuery(value);
            setResults([]);
            setLoading(Boolean(value.trim()));
            setSearched(false);
          }}
          placeholder="Ex.: Git, status, commit"
          autoComplete="off"
          className="w-full rounded-xl border border-neutral-600 bg-neutral-800 px-4 py-3 text-base text-neutral-100 outline-none placeholder:text-neutral-400 focus:border-sky-300 focus:ring-2 focus:ring-sky-300/25"
        />
      </div>

      <section className="mt-12" aria-labelledby="terms-heading">
        <div className="mb-5 flex items-baseline justify-between gap-4">
          <h2 id="terms-heading" className="text-xl font-semibold">
            {searching ? 'Resultados da busca' : 'Termos'}
          </h2>
          <span className="text-sm text-neutral-300">
            {searching
              ? loading
                ? 'Buscando…'
                : `${results.length} ${results.length === 1 ? 'resultado' : 'resultados'}`
              : `${terms.length} ${terms.length === 1 ? 'termo' : 'termos'}`}
          </span>
        </div>

        {searching ? (
          <div aria-live="polite" aria-busy={loading}>
            {results.length > 0 ? (
              <ul className="space-y-3">
                {results.map((result) => (
                  <li key={result.url}>
                    <a className="block rounded-xl border border-neutral-700 bg-neutral-800 px-5 py-4 hover:border-neutral-500 hover:bg-neutral-700 focus-visible:outline-2 focus-visible:outline-sky-300" href={result.url}>
                      <span className="font-semibold text-neutral-100">{result.title}</span>
                      {result.description && (
                        <span className="mt-1 block text-sm leading-6 text-neutral-300">{result.description}</span>
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            ) : searched && !loading ? (
              <p className="text-sm text-neutral-300">Nenhum termo encontrado.</p>
            ) : null}
          </div>
        ) : (
          <>
            <ul className="space-y-3">
              {visibleTerms.map((term) => (
                <li key={term.id}>
                  <a
                    className="block rounded-xl border border-neutral-700 bg-neutral-800 px-5 py-4 transition-colors hover:border-neutral-500 hover:bg-neutral-700 focus-visible:outline-2 focus-visible:outline-sky-300"
                    href={`${import.meta.env.BASE_URL}termos/${term.id}/`}
                  >
                    <span className="block text-lg font-semibold text-neutral-100">{term.title}</span>
                    <span className="mt-1 block leading-7 text-neutral-300">{term.definition}</span>
                  </a>
                </li>
              ))}
            </ul>
            {visibleCount < terms.length && <div ref={sentinelRef} className="h-8" aria-hidden="true" />}
            {visibleCount < terms.length && <p className="py-2 text-center text-sm text-neutral-400">Role para carregar mais termos</p>}
          </>
        )}
      </section>
    </>
  );
}
