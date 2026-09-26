---
title: Cypress
definition: Cypress é uma ferramenta de testes que executa testes de ponta a ponta e de componentes em um navegador real.
aliases:
  - testes end-to-end
  - E2E
categories:
  - testes
---

## Comandos úteis

- **`npm install cypress --save-dev`** — adiciona Cypress como dependência de desenvolvimento do projeto.
- **`npx cypress open`** — abre a interface interativa para configurar e executar testes.
- **`npx cypress run`** — executa os testes em modo de linha de comando, útil em integração contínua.
- **`npm run cy:open`** — abre Cypress por um script `cy:open` configurado no `package.json`.
- **`cy.visit('<url>')`** — navega para uma página durante um teste.
- **`cy.location('pathname')`** — lê o caminho atual da URL para fazer uma asserção.
- **`cy.findByText('<texto>')`** — localiza um elemento pelo texto acessível quando o plugin Testing Library está configurado.

## Exemplo de uso

```js
it('abre a página inicial', () => {
  cy.visit('/')
  cy.location('pathname').should('eq', '/')
  cy.findByText('Área pública').should('be.visible')
})
```

`cy.findByText` requer o plugin Cypress Testing Library.

## Referências

- [Instalação do Cypress](https://docs.cypress.io/app/get-started/install-cypress)
- [Abrir a aplicação Cypress](https://docs.cypress.io/app/get-started/open-the-app)
- [Comandos de teste do Cypress](https://docs.cypress.io/api/table-of-contents)
