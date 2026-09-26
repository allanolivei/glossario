---
title: NVM for Windows
definition: NVM for Windows instala e alterna entre versões do Node.js em ambientes Windows.
aliases:
  - nvm
  - nvm-windows
  - Node Version Manager
categories:
  - desenvolvimento
---

## Comandos úteis

- **`nvm list`** — lista as versões do Node.js instaladas pelo NVM for Windows.
- **`nvm list available`** — exibe versões disponíveis para instalação.
- **`nvm install <versão>`** — instala uma versão específica do Node.js.
- **`nvm use <versão>`** — ativa uma versão instalada para os terminais do Windows.
- **`nvm current`** — informa a versão atualmente selecionada.

> Este verbete trata do NVM for Windows, projeto separado do `nvm` mais comum em Linux e macOS.

## Exemplo de uso

```powershell
nvm list available
nvm install <versão>
nvm use <versão>
nvm current
```

No Windows, `nvm use` pode exigir terminal elevado.

## Referências

- [Repositório oficial do NVM for Windows](https://github.com/coreybutler/nvm-windows)
