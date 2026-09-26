---
title: Python
definition: Python é uma linguagem de programação de alto nível conhecida por sua sintaxe legível e ecossistema amplo.
aliases:
  - pip
  - venv
  - Pipenv
categories:
  - linguagens
---

## Comandos úteis

- **`python --version`** — informa a versão do interpretador Python selecionado.
- **`python -m venv .venv`** — cria um ambiente virtual isolado na pasta `.venv`.
- **`python -m pip install <pacote>`** — instala um pacote usando o `pip` associado a esse interpretador.
- **`pip install pipenv`** — instala a ferramenta Pipenv no ambiente Python selecionado.
- **`python -m pip freeze`** — lista os pacotes instalados no ambiente no formato de requisitos.
- **`PIPENV_VENV_IN_PROJECT=1`** — configura Pipenv para criar o ambiente virtual dentro da pasta do projeto em shells compatíveis com essa variável.
- **`pipenv install <pacote>`** — instala uma dependência e a registra no projeto gerenciado pelo Pipenv.
- **`pipenv shell`** — inicia um shell com o ambiente virtual do projeto ativado.
- **`pipenv install python-decouple`** — adiciona uma biblioteca para ler configurações da aplicação a partir do ambiente.
- **`pipenv install --dev black`** — adiciona Black como dependência de desenvolvimento para formatar o código.
- **`python manage.py runserver`** — inicia o servidor de desenvolvimento de um projeto Django.
- **`python manage.py migrate`** — aplica ao banco as migrações pendentes do Django.
- **`python manage.py makemigrations <app>`** — cria migrações para alterações nos modelos de um app Django.
- **`python manage.py startapp <app>`** — cria a estrutura inicial de um app Django.
- **`python manage.py createsuperuser`** — cria uma conta administrativa no Django.

## Exemplo de uso

Crie e use um ambiente isolado:

```sh
python -m venv .venv
python -m pip install <pacote>
```

Fluxo básico do Django:

```sh
django-admin startproject setup .
python manage.py startapp core
python manage.py makemigrations core
python manage.py migrate
python manage.py runserver
```

## Referências

- [Ambientes virtuais com `venv`](https://docs.python.org/3/library/venv.html)
- [Documentação do `pip`](https://pip.pypa.io/en/stable/)
- [Documentação do Pipenv](https://pipenv.pypa.io/en/latest/)
