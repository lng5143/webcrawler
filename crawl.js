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

module.exports = {
    normalizeURL
}

normalizeURL('https://blog.boot.dev/path/')