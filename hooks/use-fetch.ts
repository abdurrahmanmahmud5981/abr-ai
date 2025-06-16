import { useState,  } from 'react';
import { toast } from 'sonner';
const useFetch = (cb)=>{
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const fn = async (...args) => {
        setLoading(true);
        try {
            const result = await cb(...args);
            setData(result);
        } catch (err) {
            setError(err.message || 'An error occurred');
            toast.error(err.message || 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    return { data, error, loading, fn,setData };
}

export default useFetch; 