# Glossário

Glossário de programação em português, com definições rápidas, comandos e exemplos. O site é gerado pelo Astro a partir de arquivos Markdown. React cuida da busca interativa, Tailwind CSS dos estilos e Pagefind gera o índice de busca depois do build. A publicação atual usa GitHub Pages; Cloudflare Pages também pode hospedar a versão estática.

## Requisitos

- Docker e Docker Compose. Node e npm não precisam estar instalados no host.

## Desenvolvimento

```sh
docker compose up --build
```

Abra <http://localhost:4323>. O código é montado no container para recarga durante a edição. Na prévia de desenvolvimento, a busca consulta nomes, definições e aliases; o índice completo de comandos e exemplos é gerado no build.

Se a porta 4323 estiver ocupada, defina `GLOSSARIO_PORT` antes do `docker compose up --build` (por exemplo, `4330`) e abra a porta escolhida. No PowerShell: `$env:GLOSSARIO_PORT = '4330'`.

Para instalar uma biblioteca, execute o npm pelo Compose e depois reconstrua a imagem:

```sh
docker compose run --rm app npm install nome-da-biblioteca
docker compose up --build
```

O comando atualiza `package.json` e `package-lock.json` no checkout. Para instalar uma ferramenta de desenvolvimento, acrescente `--save-dev`.

## Build e verificação

```sh
docker compose run --rm app npm run check
docker compose run --rm app npm run build
docker compose run --rm --service-ports app npm run preview -- --host 0.0.0.0
```

O build gera `dist/` e, em seguida, o índice em `dist/pagefind/`. Na prévia do build, a busca inclui também comandos e exemplos.

## Adicionar um termo

Crie `src/content/terms/<slug>.md`. O frontmatter exige `title` e `definition`; `aliases` e `categories` são opcionais. No corpo, use as seções **Comandos úteis**, **Exemplo de uso** e **Referências** quando fizerem sentido. A listagem e a página individual usam o mesmo arquivo. O nome do arquivo define a URL `/termos/<slug>/`.

## Publicação

O workflow `.github/workflows/deploy.yml` publica no GitHub Pages a cada push para `main`, no endereço <https://allanolivei.github.io/glossario/>. Ele configura automaticamente o caminho base `/glossario` e envia o conteúdo gerado em `dist`.

Para usar Cloudflare Pages, conecte este repositório, use `npm run build` como comando e `dist` como diretório de saída. O arquivo `.node-version` fixa Node 24.20.0 no build remoto. Defina `SITE_URL` com a URL pública final para gerar links canônicos, `robots.txt` e sitemap corretos. O Dockerfile é usado localmente; o Pages executa o build na infraestrutura da Cloudflare.
