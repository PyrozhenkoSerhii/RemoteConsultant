import _forEach from 'lodash/forEach'


/**
 * Create a valid req url to API
 * @param {string} url req.url 
 * @param {string} params req.params (Optional)
 * @param {object} query req.query (Optional)
 */
const buildUrl = (url, params, query) => {
    let urlBuilder = url
    urlBuilder += params ? params : ''
    if (query) {
        urlBuilder += '?'
        _forEach(query, (value, key) => {
            urlBuilder += `${key}=${value}&`
        })
    }
    return urlBuilder
}


export { buildUrl }