# Solução

Este documento é a solução do desafio de mapeamento de domínio proposto pela Rocketseat no módulo de DDD.

## Entidades de Domínio
1. User
    - id
    - name
    - email
    - password_hash
    - role
    - created_at
2. Product
    - id
    - name
    - price
    - storage
    - status
    - created_at
    - updated_at
3. Purchase
    - id
    - product_id
    - amount
    - total_value
    - status
    - created_at
    - updated_at
4. Notification
    - id
    - product_id
    - content
    - created_at
5. Order
    - id
    - product_id
    - status
    - created_at
    - updated_at

## Casos de Uso da Aplicação

1. User
    - Register: registrar novo usuário;
    - Authenticate: autenticar usuário cadastrado;
2. Product
    - Create Product: criar novo produto;
    - Update Product Status: atualizar status do produtos;
    - Update Product Storage: atualizar quantidade de produto em estoque;
3. Purchase
    - Create Purchase: cadastrar compra baseado no produto solicitado;
    - Update Purchase Status: atualizar status de compra;
    - Purchase History: exibição do histórico de compras;
4. Notification
    - Create notification: criar notificação automaticamente quando o estoque de algum produto estiver em baixa;
5. Order
    - Create Order: criar ordem de compra automaticamente quando um produto atingir o limite de estoque;
    - Update Order Status: atualizar o status do pedido de compra (feito pelo usuário com cargo "supplier");
