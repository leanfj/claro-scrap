const puppeteer = require("puppeteer")
const data = require("./data")

const {claroCliente, claroEmail, claroSenha} = data

const webScraping = async pageURL => {
    const browser = await puppeteer.launch({
        headless: true,
        args: ["--no-sandbox"]
    })

    const page = await browser.newPage()

    let dataObj = []

    try {
        await page.goto(pageURL, {waitUntil: 'networkidle0'})
        await page.type('#login-form > div > div > div:nth-child(2) > div.col-sm-16 > input', claroCliente)
        await page.type('#login-form > div > div > div:nth-child(3) > div > input', claroEmail)
        await page.type('#login-form > div > div > div:nth-child(4) > div > input', claroSenha)

        await Promise.all([
            page.click('#login-form > div > div > div:nth-child(5) > div.col-sm-8.text-right > button'),
            page.waitForNavigation({waitUntil: 'networkidle0'})
        ])

        await page.goto("https://claro-gestoronline.claro.com.br/evpn4g/quota/membersQuota")

              
        let data = await page.evaluate(() => {
            return JSON.parse(document.querySelector("body").innerText)
        })

        const {totalPages} = data
        console.time("Pegando dados")
        for (let index = 1; index <= totalPages; index++) {
            await page.goto(`https://claro-gestoronline.claro.com.br/evpn4g/quota/membersQuota?pageNumber=${index}`)

            let dataToSave = await page.evaluate(() => {
                return JSON.parse(document.querySelector("body").innerText)
            })

            dataObj.push(...dataToSave.content)
        }
        console.timeEnd()

    } catch (error) {
        console.log(error)
    }

    browser.close()

    return dataObj
}

module.exports = webScraping