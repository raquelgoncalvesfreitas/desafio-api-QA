import dados from '../fixtures/dados.json'

describe('Usuários - API Serverest', () => {

  const senha = dados.usuario.senha;
  const emailDuplicado = 'duplicado@teste.com';
  const emailNovo = `novo_${Date.now()}@teste.com`;

  before(() => {
    cy.criarUsuarioSeNaoExistir({
      nome: "Usuário Existente",
      email: emailDuplicado,
      password: senha,
      administrador: "true"
    });
  });

  it('Criar novo usuário com sucesso', () => {
    cy.criarUsuario({
      nome: "QA Teste Novo",
      email: emailNovo,
      password: senha,
      administrador: "true"
    }).then((res) => {
      expect(res.status).to.equal(201);
      expect(res.body.message).to.equal("Cadastro realizado com sucesso");
      expect(res.body._id).to.exist;
    });
  });

  it('Criar usuário duplicado', () => {
    cy.criarUsuario({
      nome: "QA Teste",
      email: emailDuplicado,
      password: senha,
      administrador: "true"
    }).then((res) => {
      expect(res.status).to.equal(400);
      expect(res.body.message).to.equal("Este email já está sendo usado");
    });
  });

});
