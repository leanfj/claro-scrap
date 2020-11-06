require("dotenv").config()

const pageURL = "https://claro-gestoronline.claro.com.br/evpn4g/login"

const mongoURI = process.env.MONGOURI

const claroCliente = process.env.CLARO_CLIENTE
const claroEmail = process.env.CLARO_EMAIL
const claroSenha = process.env.CLARO_SENHA

module.exports = {
    pageURL,
    mongoURI,
    claroCliente,
    claroEmail,
    claroSenha
}