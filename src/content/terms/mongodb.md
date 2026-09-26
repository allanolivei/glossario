---
title: MongoDB
definition: MongoDB é um banco de dados orientado a documentos que armazena registros flexíveis em documentos BSON dentro de coleções.
aliases:
  - banco de documentos
  - NoSQL
categories:
  - bancos de dados
---

## Comandos úteis

Os exemplos abaixo são executados no shell interativo `mongosh`.

- **`show dbs`** — lista os bancos de dados que o usuário conectado pode visualizar.
- **`use <banco>`** — muda o banco de dados atual no shell.
- **`show collections`** — lista as coleções do banco atual.
- **`db.<coleção>.find()`** — consulta documentos de uma coleção e retorna um cursor.
- **`db.<coleção>.find({ <campo>: <valor> })`** — filtra documentos pelo valor de um campo.
- **`db.<coleção>.find().limit(10)`** — limita a saída aos primeiros dez documentos retornados.

## Exemplo de uso

```javascript
show dbs
use <banco>
show collections
db.<coleção>.find({ status: 'ativo' }).limit(10)
```

## Executar MongoDB localmente com Docker

```sh
docker volume create mongo-dados
docker run -d --name mongo -p 127.0.0.1:27017:27017 -v mongo-dados:/data/db mongo
```

Exemplo local sem autenticação; não exponha em redes compartilhadas ou produção.

## Referências

- [Executar comandos no mongosh](https://www.mongodb.com/pt-br/docs/mongodb-shell/run-commands/)
- [Método `db.collection.find()`](https://www.mongodb.com/docs/manual/reference/method/db.collection.find/)
- [Ajuda do mongosh](https://www.mongodb.com/docs/mongodb-shell/reference/access-mdb-shell-help/)
