# Order API

API simples para gerenciamento de pedidos usando Node.js, Express, MongoDB (Atlas) e JWT.

## Uso em produção (Render)

API publicada em:

- `https://api-jitterbit.onrender.com`
- Swagger UI: `https://api-jitterbit.onrender.com/docs`

### Passo a passo no Swagger (Render)

1. Acesse `https://api-jitterbit.onrender.com/docs`.
2. No topo da página, no dropdown **Servers**, escolha:
   - **Servidor produção** → `https://api-jitterbit.onrender.com`
3. Abra o endpoint **`POST /login`**, clique em **“Try it out”** e envie:
4. Copie o campo `token` retornado na resposta.
5. No topo da página do Swagger, clique em **“Authorize”**.
6. No campo do esquema `bearerAuth`, informe:
   ```text
   Bearer SEU_TOKEN_AQUI
   ```
   e clique em **Authorize**.

A partir desse momento, o Swagger enviará automaticamente o header:

```http
Authorization: Bearer SEU_TOKEN_AQUI
```

em todas as chamadas protegidas (`/order`, `/order/list`, etc.).

### Endpoints principais

- `POST /login`
  - Gera um token JWT para uso nas demais rotas.

- `POST /order` (autenticado)
  - Cria um novo pedido.
  - Body (exemplo):
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
- `GET /order/{orderId}` (autenticado) — busca um pedido específico.
- `PUT /order/{orderId}` (autenticado) — atualiza um pedido (mesmo formato de body do `POST /order`).
- `DELETE /order/{orderId}` (autenticado) — remove um pedido.

> Observação: internamente, os valores monetários (`valorTotal`, `valorItem`) são armazenados em centavos (inteiros), por exemplo `10.00` → `1000`.

## Execução local (opcional)

Para rodar a API localmente:

### Requisitos

- Node.js (versão 18+ recomendada)
- Uma instância MongoDB (por exemplo, MongoDB Atlas)

### Configuração

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

### Rodando localmente

```bash
npm start
```

A API ficará disponível em `http://localhost:3000` e o Swagger UI em `http://localhost:3000/docs`.

