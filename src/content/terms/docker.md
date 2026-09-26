---
title: Docker
definition: Docker empacota aplicações e dependências em imagens que podem ser executadas como containers isolados.
aliases:
  - container
  - imagem Docker
categories:
  - desenvolvimento
---

## Comandos úteis

- **`docker version`** — exibe as versões do cliente e do servidor Docker.
- **`docker image ls`** — lista as imagens disponíveis localmente.
- **`docker pull <imagem>`** — baixa uma imagem de um registry.
- **`docker ps`** — lista os containers em execução; `docker ps -a` também inclui os parados.
- **`docker inspect <container>`** — mostra detalhes da configuração de um container ou outro objeto Docker.
- **`docker run -p <porta-host>:<porta-container> <imagem>`** — cria e executa um container, encaminhando uma porta. Sem IP explícito, a porta pode ficar acessível por outras interfaces da máquina.
- **`docker stop <container>`** — solicita que um container em execução pare.
- **`docker rm <container>`** — remove um container parado; os dados fora dos volumes podem ser perdidos.
- **`docker volume create <nome>`** — cria um volume nomeado para persistir dados fora do ciclo de vida do container.
- **`docker volume ls`** — lista os volumes Docker.
- **`docker volume inspect <nome>`** — mostra detalhes de um volume.
- **`docker volume rm <nome>`** — remove um volume; confirme antes que nenhum dado persistente necessário esteja nele.
- **`docker run -d --name <nome> -v <volume>:/dados <imagem>`** — executa um container em segundo plano com um volume montado.
- **`docker compose up`** — cria e inicia os serviços definidos no arquivo Compose.
- **`docker compose up -d --build`** — constrói as imagens e inicia os serviços em segundo plano.
- **`docker compose logs -f`** — acompanha os registros dos serviços em tempo real.
- **`docker compose exec <serviço> sh`** — abre um shell em um container de serviço em execução.

## Exemplo de uso

Inicie os serviços com `docker compose up` e acompanhe-os com `docker compose logs -f`.

Volume nomeado para dados persistentes:

```sh
docker volume create dados-app
docker run -d --name app -v dados-app:/dados <imagem>
docker volume inspect dados-app
```

Troque `/dados` pelo diretório de dados da imagem. Não passe senhas na linha de comando.

## Exemplo: iniciar um serviço com porta local

```sh
docker run -d --name web -p 127.0.0.1:8080:80 nginx:latest
docker ps
docker logs -f web
docker stop web
docker rm web
```

`127.0.0.1` limita a porta à máquina local. Dados persistentes devem ficar em volume.

## Referências

- [Referência da CLI Docker](https://docs.docker.com/reference/cli/docker/)
- [Referência de `docker run`](https://docs.docker.com/reference/cli/docker/container/run/)
- [Referência de `docker compose up`](https://docs.docker.com/reference/cli/docker/compose/up/)
- [Configurações do Docker Desktop](https://docs.docker.com/desktop/settings-and-maintenance/settings/)
