---
title: Chocolatey (choco)
definition: Chocolatey é um gerenciador de pacotes para Windows que instala e mantém ferramentas pela linha de comando.
aliases:
  - choco
  - gerenciador de pacotes do Windows
categories:
  - ferramentas
---

## Comandos úteis

- **`choco install <pacote>`** — instala um pacote do repositório configurado.
- **`choco install <pacote> -y`** — instala o pacote e responde automaticamente “sim” às confirmações.
- **`choco install nodejs-lts -y`** — instala o pacote Node.js LTS quando disponível na fonte configurada.
- **`choco install microsoft-openjdk17 -y`** — instala o pacote Microsoft OpenJDK 17.
- **`choco upgrade <pacote>`** — atualiza um pacote instalado.
- **`choco list`** — lista pacotes conforme as opções e fontes disponíveis na versão instalada; use `choco list --help` para consultar filtros.

## Exemplo de uso

Instale um pacote pelo identificador do Chocolatey, por exemplo `choco install nodejs-lts -y`. Confira o pacote e a fonte antes da instalação.

## Referências

- [Documentação do comando install](https://docs.chocolatey.org/en-us/choco/commands/install/)
- [Referência de comandos](https://docs.chocolatey.org/en-us/choco/commands/)
