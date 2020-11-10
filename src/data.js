require("dotenv").config();

const pageURL = "https://claro-gestoronline.claro.com.br/evpn4g/login";

const mongoURI = process.env.MONGOURI;

const claroClienteRJ = process.env.CLARO_CLIENTERJ;
const claroClienteSP = process.env.CLARO_CLIENTESP;
const claroEmail = process.env.CLARO_EMAIL;
const claroSenha = process.env.CLARO_SENHA;

module.exports = {
  pageURL,
  mongoURI,
  claroClienteRJ,
  claroClienteSP,
  claroEmail,
  claroSenha,
};

