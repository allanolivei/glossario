---
title: Git
definition: Git é um sistema de controle de versão que registra mudanças em arquivos e ajuda a trabalhar em equipe.
aliases:
  - controle de versão
categories:
  - ferramentas
---

## Comandos úteis

- **`git status`** — mostra os arquivos modificados e o que já está preparado para o próximo commit.
- **`git log`** — mostra o histórico de commits do repositório, começando pelos mais recentes.
- **`git add <arquivo>`** — coloca a versão atual de um arquivo na área de preparação (*staging area*).
- **`git stage <arquivo>`** — faz o mesmo que `git add`; é outro nome para preparar um arquivo.
- **`git commit -m "mensagem"`** — grava um novo commit com as alterações que foram preparadas.
- **`git diff`** — mostra alterações ainda não preparadas para commit.
- **`git diff --staged`** — mostra o conteúdo preparado para o próximo commit.
- **`git restore --staged <arquivo>`** — remove um arquivo da área de preparação sem apagar suas alterações locais.
- **`git switch -c <branch>`** — cria uma branch e muda para ela.
- **`git stash list`** — lista as alterações temporariamente guardadas.
- **`git stash apply`** — reaplica o stash mais recente e o mantém na lista.
- **`git stash drop`** — descarta uma entrada do stash; o conteúdo deixa de estar disponível ali.
- **`git push --force-with-lease origin <branch>`** — atualiza uma branch remota reescrevendo histórico, desde que ninguém tenha avançado a referência remota desde sua última consulta.
- **`git diff --staged > wip.patch`** — grava as diferenças preparadas em um arquivo de patch.
- **`git apply wip.patch`** — aplica um patch ao diretório de trabalho.
- **`git config --global user.name "Seu Nome"`** — define o nome usado como autor de commits neste usuário.
- **`git config --global user.email "voce@exemplo.com"`** — define o e-mail usado como autor de commits neste usuário.

## Exemplo de uso

Guarde as alterações, troque de branch e reaplique-as depois:

```sh
git status
git stash push -u -m "trabalho em andamento"
git switch outra-branch
```

```sh
git switch minha-branch
git stash pop
```

`-u` inclui arquivos não rastreados. Conflitos podem ocorrer ao reaplicar o stash.

## Exemplo: revisar o que será comitado

```sh
git status
git add caminho/do/arquivo
git diff --staged
git restore --staged caminho/do/arquivo  # se não quiser incluir o arquivo ainda
```

`git reset HEAD~1` desfaz o último commit mantendo as alterações locais; pode afetar histórico compartilhado.

`git push --force` pode sobrescrever commits remotos. Prefira `--force-with-lease` em reescritas combinadas.

## Referências

- [Documentação de `git status`](https://git-scm.com/docs/git-status)
- [Documentação de `git log`](https://git-scm.com/docs/git-log)
- [Documentação de `git add`](https://git-scm.com/docs/git-add)
- [Documentação de `git stage`](https://git-scm.com/docs/git-stage)
- [Documentação de `git commit`](https://git-scm.com/docs/git-commit)
- [Documentação de `git stash`](https://git-scm.com/docs/git-stash)
