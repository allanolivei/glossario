import { useEffect } from 'react';

const COPY_ICON = '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3"/></svg>';
const CHECK_ICON = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12 4 4L19 6"/></svg>';

function makeCopyButton(readCode: () => string, className: string) {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = className;
  button.innerHTML = COPY_ICON;
  button.title = 'Copiar código';
  button.setAttribute('aria-label', 'Copiar código');
  button.setAttribute('data-copy-button', '');
  let resetTimer = 0;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(readCode());
      button.innerHTML = CHECK_ICON;
      button.title = 'Código copiado';
      button.setAttribute('aria-label', 'Código copiado');
    } catch {
      button.title = 'Não foi possível copiar';
      button.setAttribute('aria-label', 'Não foi possível copiar o código');
    }
    window.clearTimeout(resetTimer);
    resetTimer = window.setTimeout(() => {
      button.innerHTML = COPY_ICON;
      button.title = 'Copiar código';
      button.setAttribute('aria-label', 'Copiar código');
    }, 1600);
  };

  button.addEventListener('click', copy);
  return {
    button,
    cleanup: () => {
      window.clearTimeout(resetTimer);
      button.removeEventListener('click', copy);
      button.remove();
    },
  };
}

export default function CodeCopyButtons() {
  useEffect(() => {
    const cleanups: Array<() => void> = [];

    document.querySelectorAll<HTMLElement>('.term-content pre').forEach((block) => {
      if (block.querySelector('[data-copy-button]')) return;
      const control = makeCopyButton(
        () => block.querySelector('code')?.innerText ?? block.innerText,
        'copy-code-button',
      );
      block.append(control.button);
      cleanups.push(control.cleanup);
    });

    document.querySelectorAll<HTMLElement>('.term-content :not(pre) > code').forEach((code) => {
      // Evita inserir um botão interativo dentro de links de referência.
      if (code.closest('a')) return;
      const wrapper = document.createElement('span');
      wrapper.className = 'copy-inline-wrap';
      code.before(wrapper);
      wrapper.append(code);
      const control = makeCopyButton(() => code.innerText, 'copy-inline-button');
      wrapper.append(control.button);
      cleanups.push(() => {
        control.cleanup();
        wrapper.replaceWith(code);
      });
    });

    return () => cleanups.forEach((cleanup) => cleanup());
  }, []);

  return <span className="sr-only" aria-live="polite">Botões para copiar os exemplos de código.</span>;
}
