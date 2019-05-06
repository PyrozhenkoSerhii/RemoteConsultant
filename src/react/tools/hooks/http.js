import { useState, useEffect } from 'react'
import axios from 'axios'

/**
 * Hook to load data when component was mounted
 * @param {string} url Url with params and query
 * @param {array} dependencies Rerequest when provided fields were changed
 * @returns {Array} [loading, data, error]
 */
const useHTTP = (url, dependencies) => {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState(null)
    const [error, setError] = useState(null)


    useEffect(() => {
        setLoading(true)

        axios.get(url)
            .then(response => {
                console.log(`/${response.config.method}/ request done to ${url}`)
                setData(response.data.data)
                setLoading(false)
            })
            .catch(err => setError(err.response.data.error || 'Unknown error on the server'))
            .finally()
    }, dependencies)

    return [loading, data, error]
}

export { useHTTP }