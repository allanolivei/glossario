---
title: Redis
definition: Redis é um armazenamento de dados em memória que oferece estruturas como strings, listas, hashes e conjuntos.
aliases:
  - cache
  - armazenamento chave-valor
categories:
  - bancos de dados
---

## Comandos úteis

- **`redis-cli -h <host> -p <porta>`** — abre uma conexão interativa com um servidor Redis.
- **`redis-cli -h <host> -p <porta> -n <índice>`** — conecta e seleciona o índice de banco indicado para essa sessão.
- **`PING`** — verifica se o servidor responde.
- **`GET <chave>`** — lê o valor de uma chave do tipo string.
- **`SET <chave> <valor>`** — grava um valor de string em uma chave.
- **`KEYS <padrão>`** — encontra chaves que correspondem a um padrão; evite `KEYS *` em produção, pois pode bloquear o servidor.
- **`SCAN 0`** — inicia uma iteração paginada pelas chaves; continue usando o cursor retornado até ele voltar a zero.
- **`redis-cli --scan`** — percorre as chaves pela CLI sem usar o comando potencialmente bloqueante `KEYS *`.

## Exemplo de uso

```text
PING
SET chave-de-exemplo "valor"
GET chave-de-exemplo
```

Para enumerar chaves em um servidor ativo, prefira `redis-cli --scan` ou `SCAN` a `KEYS *`, que pode bloquear o servidor quando há muitas chaves. Os dados também podem mudar durante uma varredura.

## Referências

- [Referência da CLI `redis-cli`](https://redis.io/docs/latest/develop/tools/cli/)
- [Comando `SCAN`](https://redis.io/docs/latest/commands/scan/)
- [Referência dos comandos Redis](https://redis.io/docs/latest/commands/)
