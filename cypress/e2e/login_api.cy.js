describe('Login - API Serverest', () => {

  const emailLogin = 'login@teste.com';
  const senhaLogin = '123456';

  before(() => {
    cy.criarUsuarioSeNaoExistir({
      nome: "Usuario Login Teste",
      email: emailLogin,
      password: senhaLogin,
      administrador: "true"
    });
  });

  it('Login com sucesso', () => {
    cy.login(emailLogin, senhaLogin).then((res) => {
      expect(res.status).to.equal(200);
      expect(res.body.message).to.equal('Login realizado com sucesso');
      expect(res.body.authorization).to.exist;
    });
  });

  it('Login com senha inválida', () => {
    cy.login(emailLogin, 'senhaErrada').then((res) => {
      expect(res.status).to.equal(401);
      expect(res.body.message).to.equal('Email e/ou senha inválidos');
    });
  });

});
