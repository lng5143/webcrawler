function printReport(pages) {
    console.log('=======')
    console.log('REPORT')
    console.log('=======')
    const sortedPages = sortPages(pages)
    for (const sortedPage of sortedPages) {
        const url = sortedPage[0]
        const hit = sortedPage[1]
        console.log(`Found ${hit} links to page: ${url}`)
    }
    console.log('=======')
    console.log('END REPORT')
    console.log('=======')
}

function sortPages(pages) {
    pagesArr = Object.entries(pages);
    // array of arrays
    pagesArr.sort((a, b) => {
        aHits = a[1];
        bHits = b[1];
        return b[1] - a[1];
    })
    return pagesArr;
}

module.exports = {
    sortPages
}