const puppeteer = require("puppeteer");
const data = require("./data");
const cliProgress = require("cli-progress")

const bar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);

const { claroClienteRJ, claroEmail, claroSenha } = data;

const webScraping = async (pageURL) => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox"],
  });

  const page = await browser.newPage();

  await page.setExtraHTTPHeaders({
    "Accept-Language": "pt-BR",
  });
  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36"
  );
  const dataObj = []

  try {
    await page.goto(pageURL, { waitUntil: ["load", "domcontentloaded"] });
    await page.type(
      "#login-form > div > div > div:nth-child(2) > div.col-sm-16 > input",
      claroClienteRJ
    );
    await page.type(
      "#login-form > div > div > div:nth-child(3) > div > input",
      claroEmail
    );
    await page.type(
      "#login-form > div > div > div:nth-child(4) > div > input",
      claroSenha
    );

    await Promise.all([
      page.click(
        "#login-form > div > div > div:nth-child(5) > div.col-sm-8.text-right > button"
      ),
      page.waitForNavigation({ waitUntil: ["load", "domcontentloaded"] }),
    ]);

    console.log(page.url());

    page.on('response', response => {
      if(response.status() !== 200) {
        console.log("Erro de login!!!!")
        process.exit(1)
      }
    })

    const response = await page
      .goto(
        "https://claro-gestoronline.claro.com.br/evpn4g/quota/membersQuota",
        { waitUntil: ["load", "domcontentloaded"] }
      )
      .then(async (response) => {

        return response.text()

      });

    const responseParsed = JSON.parse(response)
    
    const {totalPages} = responseParsed

    bar.start(totalPages, 0);

    for (let index = 1; index <= totalPages; index++) {
      
      const response = await page
      .goto(
        `https://claro-gestoronline.claro.com.br/evpn4g/quota/membersQuota?pageNumber=${index}`,
        { waitUntil: ["load", "domcontentloaded"] }
      )
      .then(async (response) => {

        return response.text()

      });

      const responseParsed = JSON.parse(response)

      dataObj.push(...responseParsed.content)

      bar.update(index)
    }

    bar.stop()

  } catch (error) {
    console.log(error)
  }

  browser.close()
  return dataObj
};

module.exports = webScraping;

