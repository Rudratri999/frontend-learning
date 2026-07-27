import { useState, useEffect } from "react";
import api from '../api/axios'



export function useFetch(endpoint) {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    const fetchData = async () => {
        setLoading(true)
        try {
            const response = await api.get(endpoint)
            setData(response.data)

        }
        catch (err) {
            setError("Failed to Fetch data")
        }
        finally {
            setLoading(false)
        }

    }

    useEffect(() => {
        fetchData()
    }, [endpoint])


    return {
        data, loading, error
    }


}

export default useFetch;