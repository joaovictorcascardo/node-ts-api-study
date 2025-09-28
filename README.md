# API de Gestão de Utilizadores e Posts

## 📖 Sobre o Projeto

Esta é uma API REST completa desenvolvida como um projeto para a disciplina de APIs na Faminas. O objetivo foi aplicar conceitos teóricos de backend num desafio prático, utilizando Node.js, Express e TypeScript.

A aplicação permite realizar operações CRUD (Criar, Ler, Atualizar, Apagar) para gerir utilizadores e os seus respetivos posts e foi refatorada de uma estrutura de um aqruivo único para uma arquitetura em camadas (MVC).

## ✨ Funcionalidades

* **Gestão de Utilizadores**:
    * Leitura de utilizador por ID.
    * Filtro de utilizadores por faixa etária.
    * Remoção de utilizadores inativos (sem posts).
* **Gestão de Posts**:
    * CRUD completo para posts (Criar, Ler, Atualizar Parcialmente, Apagar).
    * Validações detalhadas para a criação e atualização de posts.
    * Sistema de autorização: apenas o autor ou um admin pode apagar um post.

## 🛠️ Tecnologias Utilizadas

* **Node.js**: Ambiente de execução do JavaScript no servidor.
* **Express.js**: Framework para a construção da API e gestão de rotas.
* **TypeScript**: Superset do JavaScript que adiciona tipagem estática.
* **ts-node-dev**: Ferramenta para reiniciar o servidor automaticamente durante o desenvolvimento.
* **Postman**: Utilizados para testar os endpoints.
