# Order API

API simples para gerenciamento de pedidos usando Node.js, Express, MongoDB (Atlas) e JWT.

## Requisitos

- Node.js (versão 18+ recomendada)
- Uma instância MongoDB (por exemplo, MongoDB Atlas)

## Configuração

1. Instale as dependências:

```bash
npm install
```

2. Crie um arquivo `.env` na raiz do projeto baseado em `.env.example`:

```bash
cp .env.example .env
```

Preencha os valores:

- `MONGO_URI`: connection string do seu cluster MongoDB (incluindo o database).
- `JWT_SECRET`: string forte usada para assinar/verificar os tokens JWT.
- `API_USER`: usuário para autenticação na rota `/login`.
- `API_PASSWORD`: senha para autenticação na rota `/login`.

## Executando a API

```bash
npm start
```

A API ficará disponível em `http://localhost:3000`.

## Endpoints principais

- `POST /login`
  - Body:
    ```json
    {
      "username": "seu-usuario",
      "password": "sua-senha"
    }
    ```
  - Retorna um token JWT.

- `POST /order` (autenticado)
  - Header: `Authorization: Bearer <token>`
  - Body:
    ```json
    {
      "numeroPedido": "12345-01",
      "valorTotal": 150.75,
      "dataCriacao": "2026-03-09T10:00:00.000Z",
      "items": [
        {
          "idItem": 1,
          "quantidadeItem": 2,
          "valorItem": 50.25
        }
      ]
    }
    ```

- `GET /order/list` (autenticado) — lista todos os pedidos.
- `GET /order/:orderId` (autenticado) — busca um pedido específico.
- `PUT /order/:orderId` (autenticado) — atualiza um pedido, aceitando o mesmo formato de body do `POST /order`.
- `DELETE /order/:orderId` (autenticado) — remove um pedido.

## Swagger

A documentação Swagger está disponível em:

- `http://localhost:3000/docs`

