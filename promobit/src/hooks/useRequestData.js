import { useState, useEffect } from 'react';
import axios from 'axios';

export const useRequestData = (url, initialState) => {
    const [data, setData] = useState(initialState);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    useEffect(() => {
        const fetch = async () => {
            setIsLoading(true);
            try {
                const { data } = await axios.get(url)
                setData(data);
            } catch (e) {
                console.log(e);
                setError(e);
            } finally {
                setIsLoading(false);
            }
        };
        fetch();
    },[url]);

    return [data, isLoading, error];
}