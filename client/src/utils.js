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

export const createNewCollectionLocations = (rowCount, colCount) => {
    let R = 1
    let availableLocations = {}

    while (R <= rowCount) {
        let currCol = 1
        let C = "A"
        while (currCol <= colCount) {
            let curr = String(R) + C
            availableLocations[curr] = true
            C = incrementString(C)
            currCol++
        }
        R++
    }

    return availableLocations
}

function incrementString(value) {
    let carry = 1;
    let res = '';

    for (let i = value.length - 1; i >= 0; i--) {
        let char = value.toUpperCase().charCodeAt(i);

        char += carry;

        if (char > 90) {
            char = 65;
            carry = 1;
        } else {
            carry = 0;
        }

        res = String.fromCharCode(char) + res;

        if (!carry) {
            res = value.substring(0, i) + res;
            break;
        }
    }

    if (carry) {
        res = 'A' + res;
    }

    return res;
}


export function currencyDisplay(value, locale = 'en-US', currency = 'USD') {
    return (value / 100).toLocaleString(locale, {
        style: 'currency',
        currency: currency
    })
}