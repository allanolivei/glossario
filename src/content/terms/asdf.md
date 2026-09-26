---
title: asdf
definition: asdf é um gerenciador extensível que instala ferramentas e seleciona versões por projeto usando o arquivo `.tool-versions`.
aliases:
  - asdf-vm
  - gerenciador de versões
categories:
  - desenvolvimento
---

## Comandos úteis

- **`asdf plugin add <ferramenta>`** — adiciona o plugin que permite ao asdf gerenciar uma ferramenta.
- **`asdf list all <ferramenta>`** — consulta as versões disponíveis para uma ferramenta.
- **`asdf install <ferramenta> <versão>`** — instala uma versão específica da ferramenta.
- **`asdf set <ferramenta> <versão>`** — define a versão da ferramenta no projeto atual, registrando-a em `.tool-versions`.
- **`asdf set -u <ferramenta> <versão>`** — define a versão do usuário para diretórios sem uma seleção de projeto mais específica.
- **`asdf list <ferramenta>`** — lista as versões instaladas da ferramenta.
- **`asdf current`** — mostra as versões ativas ou selecionadas no diretório atual.

## Exemplo de uso

Adicione o plugin `nodejs`, instale uma versão e selecione-a no projeto com `asdf set nodejs <versão>`.

## Referências

- [Guia oficial do asdf](https://asdf-vm.com/guide/getting-started.html)
- [Referência de comandos do asdf](https://asdf-vm.com/manage/commands.html)
