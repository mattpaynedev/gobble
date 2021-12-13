import { useEffect, useRef } from 'react';

export const useInterval = (callback, delay) => {
    const savedCallback = useRef();

    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
        function tick() {
            savedCallback.current();
        }
        if (delay !== null) {
            const id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, [delay]);
}

export const apiAddress = "http://localhost:4000";

export const generateVintages = () => {
    const currYear = new Date().getFullYear()
    let year = currYear + 1
    const vintages = [NON_VINTAGE]
    while (year >= currYear - 75) {
        vintages.push(year)
        year--
    }
    return vintages
}

export const NON_VINTAGE = "Non-Vintage"