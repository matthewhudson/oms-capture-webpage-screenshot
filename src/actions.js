// const { URL } = require('./node_modules/url/url')
const chrome = require('chrome-aws-lambda')
const puppeteer = require('puppeteer-core')

const getInt = str => {
  return /[0-9]+/.test(str) ? parseInt(str) : undefined
}

const getUrlWithProtocol = str => {
  const url = str
  if (!url.startsWith('http')) {
    return 'https://' + url
  }
  return url
}

const isValidUrl = str => {
  try {
    const url = new URL(str)
    return url.hostname.includes('.')
  } catch (er) {
    return er
  }
}

// const DEBUG = process.env.DEBUG;

// Error: options.quality is unsupported for the png screenshots
async function getScreenshot ({
  fullPage = false,
  quality = 80,
  type = 'png',
  url
}) {
  const browser = null

  try {
    if (!url) {
      // @TODO: Better URL checking.
      throw new Error('No URL means no getScreenshot() for you.')
    }
    const options = {
      fullPage,
      type
    }

    // `page.screenshot()` throws an error otherwise
    if (type !== 'png') {
      options.quality = quality
    }

    const browser = await puppeteer.launch({
      args: chrome.args,
      defaultViewport: chrome.defaultViewport,
      executablePath: 'google-chrome-unstable',
      headless: true
    })

    const page = await browser.newPage()
    await page.goto(url)
    return await page.screenshot(options)
  } catch (er) {
    throw new Error(er)
  } finally {
    if (browser !== null) {
      console.log('closing browser')
      await browser.close()
    }
  }
}
const actionHandler = async ({ fullPage, quality, type = 'png', url }) => {
  return new Promise((resolve, reject) => {
    try {
      url = getUrlWithProtocol(url)
      quality = getInt(quality)

      if (!isValidUrl(url)) {
        reject(new Error(`The url '${url}' is not valid.`))
      } else {
        const file = getScreenshot({ fullPage, quality, type, url })
        resolve(file)
      }
    } catch (er) {
      reject(er)
    }
  })
}

module.exports = { actionHandler }
