import dados from '../fixtures/dados.json'

describe('Produtos - API Serverest', () => {

  const emailAdmin = 'admin.produtos@teste.com';
  const senhaAdmin = dados.admin.senha;
  let tokenAdm = "";

  before(() => {
    cy.criarUsuarioAdminSeNaoExistir(emailAdmin, senhaAdmin);

    cy.login(emailAdmin, senhaAdmin).then((res) => {
      expect(res.status).to.eq(200);
      tokenAdm = res.body.authorization;
    });
  });

  it('Criar produto com sucesso', () => {
    const produto = {
      nome: "Produto Cypress " + Date.now(),
      preco: 120,
      descricao: dados.produto.descricaoPadrao,
      quantidade: 10
    };

    cy.criarProduto(produto, tokenAdm).then((res) => {
      expect(res.status).to.equal(201);
      expect(res.body.message).to.equal('Cadastro realizado com sucesso');
    });
  });

  it('Criar produto duplicado', () => {
    const nomeDuplicado = "Produto Duplicado QA";

    const produto = {
      nome: nomeDuplicado,
      preco: 150,
      descricao: dados.produto.descricaoPadrao,
      quantidade: 5
    };

    cy.criarProduto(produto, tokenAdm);

    cy.criarProduto(produto, tokenAdm).then((res) => {
      expect(res.status).to.equal(400);
      expect(res.body.message).to.equal("Já existe produto com esse nome");
    });
  });

});
