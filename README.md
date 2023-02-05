## Descrição

Este projeto constitui uma API para cadastro de clientes, que irá armazenar as seguintes informações:

- Nome
- CPF
- Data de nascimento

## Pontos que ainda serão melhorados

- Este projeto será refatorado para ser totalmente orientado a objetos seguindo principios SOLID
- Também será refatorado para se adequar a uma arquitetura de microsserviços
- Serão adicionados mais testes unitários

## Tecnologias Utilizadas

- [TypeScript](https://www.typescriptlang.org/)
- [Node.js](https://nodejs.org/en/)
- [Express](https://expressjs.com/)
- [Docker](https://www.docker.com/)
- [Prisma ORM](https://www.prisma.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [Joi](https://joi.dev/)
- [Jest](https://jestjs.io/)

## Instalação

### - Clonar o repositório para sua máquina

```bash
$ git clone
```

### - Para rodar na sua própria máquina, instale as dependências

```bash
npm install
```

### - Para rodar utilizando Docker (é necessário ter Docker instalado na máquina)

```bash
npm install
```

## Features

- Cadastrar cliente
- Buscar cliente por cpf
- Buscar todos os clientes cadastados (com paginação ou sem)

## Rotas

- **POST** `/create-customer` - Cadastra um novo cliente

  Esta rota espera receber um body com o seguinte formato:

  ```json
  {
  	"name": "Gabriel",
  	"cpf": "11111111111" | "111.111.111-11",
  	"birthdate": "YYYY-MM-DD",
  }
  ```

  - O valor do CPF será validado conforme explicação deste [algoritmo](https://www.macoratti.net/alg_cpf.htm#:~:text=O). Se o seu valor não passar nesta validação, será retornado status 422
  - Se o body enviado estiver com o formato errado, será retornado status 422
  - Se o CPF enviado no body já estiver cadastrado, será retornado status 409
  - Em caso de sucesso, será retornado status 201

- **GET** `/customer` - Retorna um único cliente (se cadastrado)

  Esta rota espera receber um body com o seguinte formato:

  ```json
  {
  	"cpf": "11111111111" | "111.111.111-11"
  }
  ```

  - Se o body enviado estiver com o formato errado, será retornado status 422
  - Se o CPF enviado não estiver cadastrado, será retornado status 404
  - Em caso de sucesso, será retornado status 200 e json abaixo

  Exemplo de retorno:

  ```json
  {
    "id": 0,
    "name": "Gabriel",
    "cpf": "11111111111",
    "birthdate": "YYYY-MM-DDTHH:mm:ss"
  }
  ```

- **GET** `/customers?page=1` - Retorna clientes cadatrados de forma paginada

  Esta rota espera receber um valor de página(page) válido (inteiro maior ou igual a 1) obrigatoriamente. Se nenhum valor for enviado para page ou se for um valor inválido, será retornado status 500

  Exemplo de retorno (Será sempre limitado a 5 clientes por página):

  ```json
  [
    {
      "id": 0,
      "name": "gabriel",
      "cpf": "11111111111",
      "birthdate": "YYYY-MM-DDTHH:mm:ss",
      "createAt": "YYYY-MM-DDTHH:mm:ss"
    },
    {
      "id": 1,
      "name": "gabriel",
      "cpf": "22222222222",
      "birthdate": "YYYY-MM-DDTHH:mm:ss",
      "createAt": "YYYY-MM-DDTHH:mm:ss"
    },
    .
    .
    .
  ]
  ```

- **GET** `/allCustomers` - Retorna todos os clientes cadastrados

  Exemplo de retorno:

  ```json
  [
    {
      "id": 0,
      "name": "gabriel",
      "cpf": "11111111111",
      "birthdate": "YYYY-MM-DDTHH:mm:ss",
      "createAt": "YYYY-MM-DDTHH:mm:ss"
    },
    {
      "id": 1,
      "name": "gabriel",
      "cpf": "22222222222",
      "birthdate": "YYYY-MM-DDTHH:mm:ss",
      "createAt": "YYYY-MM-DDTHH:mm:ss"
    },
    .
    .
    .
  ]
  ```