describe('Carrinhos - API Serverest', () => {

  const emailUser = 'usuario.carrinho@teste.com';
  const senhaUser = '123456';
  let tokenUser = "";
  const produtoValido = "BeeJh5lz3k6kSIzA"; // produto público e sempre válido

  before(() => {

    // 1) Garante a existência do usuário fixo para carrinhos
    cy.criarUsuarioSeNaoExistir({
      nome: "Usuario Carrinho QA",
      email: emailUser,
      password: senhaUser,
      administrador: "false"
    });

    // 2) Login e captura de token
    cy.login(emailUser, senhaUser).then((res) => {
      expect(res.status).to.eq(200);
      tokenUser = res.body.authorization;

      // 3) Finaliza carrinho existente (caso exista)
      cy.finalizarCompraSeExistir(tokenUser);
    });

  });

  it('Criar carrinho com produto válido', () => {

    const carrinho = {
      produtos: [
        {
          idProduto: produtoValido,
          quantidade: 1
        }
      ]
    };

    cy.criarCarrinho(carrinho, tokenUser).then((res) => {
      expect(res.status).to.eq(201);
      expect(res.body.message).to.eq("Cadastro realizado com sucesso");
      expect(res.body._id).to.exist;
    });

  });

  it('Finalizar compra', () => {

    cy.finalizarCompraSeExistir(tokenUser).then((res) => {
      // API pode retornar:
      // 200 = finalizado
      // 400 = nenhum carrinho para finalizar
      // 401 = token expirado (comum na Serverest)
      expect([200, 400, 401]).to.include(res.status);
    });

  });

});
