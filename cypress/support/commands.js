// ----------------------------
// LOGIN
// ----------------------------

Cypress.Commands.add('login', (email, senha) => {
  return cy.request({
    method: 'POST',
    url: '/login',
    body: { email, password: senha },
    failOnStatusCode: false
  });
});


// ----------------------------
// USUÁRIOS
// ----------------------------


// CRIAR USUÁRIO COMUM
Cypress.Commands.add('criarUsuario', (usuario) => {
  return cy.request({
    method: 'POST',
    url: '/usuarios',
    body: usuario,
    failOnStatusCode: false
  });
});

// CRIAR USUÁRIO SE NÃO EXISTIR (201 ou 400)
Cypress.Commands.add('criarUsuarioSeNaoExistir', (usuario) => {
  return cy.request({
    method: 'POST',
    url: '/usuarios',
    body: usuario,
    failOnStatusCode: false
  }).then((res) => {
    expect([201, 400]).to.include(res.status);
    return res;
  });
});

// CRIAR USUÁRIO ADMIN SE NÃO EXISTIR
Cypress.Commands.add('criarUsuarioAdminSeNaoExistir', (email, senha) => {
  return cy.request({
    method: 'POST',
    url: '/usuarios',
    body: {
      nome: "Admin QA",
      email,
      password: senha,
      administrador: "true"
    },
    failOnStatusCode: false
  }).then((res) => {
    expect([201, 400]).to.include(res.status);
    return res;
  });
});


// ----------------------------
// PRODUTOS
// ----------------------------

// CRIAR PRODUTO
Cypress.Commands.add('criarProduto', (produto, token) => {
  return cy.request({
    method: 'POST',
    url: '/produtos',
    body: produto,
    headers: { authorization: token },
    failOnStatusCode: false
  });
});



// ----------------------------
// CARRINHOS
// ----------------------------

// CRIAR CARRINHO
Cypress.Commands.add('criarCarrinho', (carrinho, token) => {
  return cy.request({
    method: 'POST',
    url: '/carrinhos',
    body: carrinho,
    headers: { authorization: token },
    failOnStatusCode: false
  });
});

// FINALIZAR COMPRA (aceita 200, 400, 401)
Cypress.Commands.add('finalizarCompraSeExistir', (token) => {
  return cy.request({
    method: 'DELETE',
    url: '/carrinhos/concluir-compra',
    headers: { authorization: token },
    failOnStatusCode: false
  }).then((res) => {
    expect([200, 400, 401]).to.include(res.status);
    return res;
  });
});








