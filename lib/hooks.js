import { useDispatch, useSelector, useStore } from 'react-redux'
import { useState } from "react";

export const useAppDispatch = useDispatch.withTypes()
export const useAppSelector = useSelector.withTypes()
export const useAppStore = useStore.withTypes()


export function useAsyncAction() {
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const execute = async (action, payload = {}) => {
        setLoading(true);
        setError(null);
        setSuccess(null);

        try {
            const result = await dispatch(action(payload)).unwrap();
            setSuccess(result);
            return result;
        } catch (err) {
            setError(err.message || "Something went wrong");
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { execute, loading, error, success };
}