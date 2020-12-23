const admin = require("../database/index");

module.exports = {
  Query: {
    produtos: () => {
      return admin
        .database()
        .ref("produtos")
        .once("value")
        .then((snap) => snap.val())
        .then((val) => Object.keys(val).map((key) => val[key]));
    },
    produto: (_, { id }) => {
      return admin
        .database()
        .ref("/produtos/" + id)
        .once("value")
        .then((snap) => snap.val())
        .then((val) => val);
    },
  },
  Mutation: {
    novoProduto(
      _,
      { id, nomeproduto, descricao, fornecedor, preco, datacadastro }
    ) {
      const novo = {
        id: id,
        nomeproduto: nomeproduto,
        descricao: descricao,
        fornecedor: fornecedor,
        preco: preco,
        datacadastro: datacadastro,
      };
      admin.database().ref("produtos").push(novo);
      return admin
        .database()
        .ref("produtos")
        .limitToLast(1)
        .once("value")
        .then((snap) => snap.val())
        .then((val) => Object.keys(val).map((key) => val[key]));
    },
    atualizarProduto(
      _,
      { id, nomeproduto, descricao, fornecedor, preco, datacadastro }
    ) {
      const update = {
        id: id,
        nomeproduto: nomeproduto,
        descricao: descricao,
        fornecedor: fornecedor,
        preco: preco,
        datacadastro: datacadastro,
      };
      admin
        .database()
        .ref("produtos/" + id)
        .update(update);
      return admin
        .database()
        .ref("produtos")
        .child(id)
        .once("value")
        .then((snap) => snap.val())
        .then((val) => val);
    },
    excluirProduto(_, { id }) {
      return admin
        .database()
        .ref("produtos/" + id)
        .remove();
    },
  },
};
