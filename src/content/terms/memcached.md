---
title: Memcached
definition: Memcached é um sistema de cache em memória que guarda pares de chave e valor para acelerar o acesso a dados temporários.
aliases:
  - cache distribuído
  - cache em memória
categories:
  - bancos de dados
---

## Comandos úteis

Os comandos abaixo pertencem ao protocolo de texto do Memcached e podem ser enviados por um cliente compatível.

- **`stats`** — mostra estatísticas e contadores do servidor.
- **`stats items`** — apresenta informações sobre os itens armazenados, agrupadas por slab.
- **`stats slabs`** — mostra contadores de alocação e desempenho agrupados por slab.
- **`get <chave>`** — solicita o valor associado a uma chave de cache.
- **`set <chave> <flags> <expiração> <bytes>`** — armazena um item; o protocolo espera em seguida uma linha com o valor e um terminador de linha.

## Exemplo de uso

Consulte o cache local usando `netcat`:

```sh
printf 'stats items\r\n' | nc localhost 11211
printf 'get chave-de-exemplo\r\n' | nc localhost 11211
```

Use apenas chaves autorizadas. `flush_all` invalida todos os itens.

`stats cachedump <slab-id> <limite>` lista chaves para diagnóstico e pode degradar caches grandes.

## Referências

- [Protocolo básico do Memcached](https://docs.memcached.org/protocols/basic/)
