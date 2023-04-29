const { JSDOM } = require('jsdom');

function getURLsFromHTML(htmlBody, baseURL) {
    const urls = []
    const dom = new JSDOM(htmlBody);
    const linkElements = dom.window.document.querySelectorAll('a');
    for (const linkElement of linkElements) {
        if (linkElement.href.slice(0, 1) == '/') {
            const link = baseURL+ linkElement.href;
            try {
                const urlObj = new URL(link);
                urls.push(urlObj.href);
            } catch (err) {
                console.log(`Error: ${err}`);
            }
        }
        else {
            try {
                const urlObj = new URL(linkElement.href)
                urls.push(urlObj.href);
            } catch(err) {
                console.log(`Error: ${err}`);
            }
        }
        console.log(linkElement.href);
    }
    return urls;
}

function normalizeURL(urlString) {
    const urlObj = new URL(urlString);
    let result = urlObj.hostname + urlObj.pathname;
    console.log(result);
    console.log(urlString)

    if (result.length > 0 && result.slice(-1) === '/' ) {
        result = result.slice(0, -1)
    }

    result = result.toLowerCase();

    return result;
}

async function crawlPage(baseURL, currentURL, pages) {
    try {
        const response = await fetch(currentURL);
        if (response.status > 399) {
            console.log(`Error in fetch with status code ${response.status} on page ${currentURL}`);
            return;
        }

        const contentType = response.headers.get('content-type');
        if (contentType.includes('text/html')) {
           console.log(`Non-HTML response, content type: ${contentType} on page ${currentURL}`);
        }

        const htmlBody = await response.text();
        const URLs = getURLsFromHTML(htmlBody, baseURL);

        for (const URL of URLs) {
            crawlPage(baseURL, URL, )
        }

        // remaining problems 
        // how to count pages? 
        // what to return? 

        console.log(await response.text());
    } catch(err) {
        console.log(`Error in fetch : ${err.message} on page ${currentURL}`);
    }
}

module.exports = {
    normalizeURL, 
    getURLsFromHTML,
    crawlPage
}
