---
title: MySQL
definition: MySQL é um sistema de gerenciamento de banco de dados relacional que consulta e modifica dados usando SQL.
aliases:
  - banco relacional
  - SQL
categories:
  - bancos de dados
---

## Comandos úteis

- **`mysql -h <host> -u <usuário> -p <banco>`** — conecta ao servidor e solicita a senha de forma interativa.
- **`SHOW DATABASES;`** — lista os bancos de dados que a conta pode visualizar.
- **`USE <banco>;`** — seleciona o banco atual para as próximas consultas.
- **`SHOW TABLES;`** — lista as tabelas do banco selecionado.
- **`SELECT * FROM <tabela> LIMIT 10;`** — consulta até dez linhas de uma tabela.
- **`CREATE DATABASE <banco>;`** — cria um banco de dados vazio.
- **`mysqldump -h <host> -u <usuário> -p <banco> > backup.sql`** — grava um backup lógico do banco em um arquivo SQL.
- **`mysql -h <host> -u <usuário> -p <banco> < backup.sql`** — executa um arquivo SQL de entrada contra o banco selecionado; confirme o destino antes de importar.
- **`mysqldump -h <host> -u <usuário> -p --hex-blob <banco> > backup.sql`** — exporta o banco com valores binários em formato hexadecimal.

## Exemplo de uso

Faça um backup lógico; digite a senha quando solicitada:

```sh
mysqldump -h <host> -u <usuário> -p <banco> > backup.sql
```

Restaure no banco escolhido:

```sh
mysql -h <host> -u <usuário> -p <banco> < backup.sql
```

Revise o arquivo e o banco: a restauração pode substituir dados.

`DROP DATABASE <banco>;` remove o banco e seus dados; não há confirmação adicional garantida pelo servidor. Use somente quando a remoção for intencional e houver backup validado.

## Referências

- [Cliente de linha de comando `mysql`](https://dev.mysql.com/doc/refman/8.4/en/mysql.html)
- [Manual de referência MySQL 8.4](https://dev.mysql.com/doc/refman/8.4/en/)
- [Ferramenta de backup `mysqldump`](https://dev.mysql.com/doc/refman/8.4/en/mysqldump.html)
