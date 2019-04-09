import { useState, useEffect } from 'react'
import axios from 'axios'


export const useHTTP = (url, dependencies, param) => {
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        setLoading(true)

        console.log(`Sending request to ${url} with params ${param}`)

        axios.get(url + param)
            .then(response => setData(response.data))
            .catch(err => setError(err.response.data.error || 'Unknown error on the server'))
            .finally(setLoading(false))
    }, dependencies)

    return [loading, data, error]
}
