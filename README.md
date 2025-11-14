# 🔍 Desafio de Automação de API — QA  
Automação desenvolvida para avaliação técnica utilizando a API pública **Serverest**.  
A solução foi construída com **Cypress 13** e segue um padrão profissional de testes automatizados para APIs REST.

---

# 📌 Objetivo

Avaliar a capacidade de:

- Levantar cenários relevantes da API  
- Criar estratégias de automação estáveis e reutilizáveis  
- Implementar testes robustos em Cypress  
- Utilizar boas práticas de versionamento e padronização  
- Garantir execução repetida sem falhas (zero flakiness)

---

# 🛠️ Tecnologias utilizadas

- **Node.js**  
- **Cypress**  
- **JavaScript**  
- **cypress-plugin-api** (visualização de request/response no runner)

---

# 📁 Estrutura do Projeto

desafio-api-QA/
├── cypress/
│ ├── e2e/
│ │ ├── login_api.cy.js
│ │ ├── usuarios_api.cy.js
│ │ ├── produtos_api.cy.js
│ │ ├── carrinhos_api.cy.js
│ ├── fixtures/
│ │ └── dados.json
│ ├── support/
│ │ ├── commands.js
│ │ └── e2e.js
├── cypress.config.js
├── package.json
└── README.md

yaml
Copiar código

---

# 📦 Instalação do projeto

1. Criar o package.json
npm init -y

2. Instalar o Cypress
npm install cypress

3. Instalar o plugin de API (opcional, mas usado no projeto)
npm install cypress-plugin-api

3.1.  É necessário ativar no cypress.config.js
env: {
  requestMode: true
}

3.2. E importar no cypress/support/e2e.js
import 'cypress-plugin-api'

4. Abrir o Cypress em modo interativo
npx cypress open

5. Rodar todos os testes no terminal
npx cypress run


# 🧪 Funcionalidades e Cenários Automatizados

A API utilizada:
🔗 https://serverest.dev

O desafio exige 2 cenários críticos por funcionalidade.
Abaixo estão as funcionalidades e cenários implementados.

1️⃣ Login

✔ Login com sucesso
Valida:
Status 200
Mensagem de sucesso
Token JWT presente

✔ Login com senha inválida
Valida:
Status 401
Mensagem de erro da API

2️⃣ Usuários

✔ Criar novo usuário com sucesso
Gera e-mail único
Valida status 201 e ID gerado

✔ Criar usuário duplicado
Usuário criado previamente
Segunda tentativa retorna 400
Valida mensagem “Este email já está sendo usado”

Obs.:
Para evitar erros, foi implementado o comando criarUsuarioSeNaoExistir, que aceita 201 ou 400.

3️⃣ Produtos

Requisitos da API Serverest:
🔸 Apenas administradores podem criar produtos

✔ Criar produto com sucesso
Admin fixo criado somente se não existir
Login do admin gera token válido
201 + validação da mensagem

✔ Criar produto duplicado
Primeiro cria
Segundo retorna 400
Valida a mensagem da API

Foi implementado o comando: criarUsuarioAdminSeNaoExistir para garantir consistência e independência do estado da API pública.

4️⃣ Carrinhos

Regras da API Serverest:
Apenas 1 carrinho por usuário
Deve finalizar o carrinho anterior antes de criar outro
Token expira rápido (por isso aceitamos 401 em finalização)

✔ Criar carrinho com produto válido
Usuário fixo criado apenas se não existir
Login captura token
Conclusão de compra prévia impede falhas
Valida status 201

✔ Finalizar compra
Aceita:
200 → carrinho finalizado
400 → nenhum carrinho existente
401 → token expirado (comum na Serverest)

Comando criado: finalizarCompraSeExistir