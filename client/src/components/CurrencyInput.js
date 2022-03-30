// Inspired by https://github.com/larkintuckerllc/react-currency-input'

import { TextInput } from "grommet";
import React from "react";
import { currencyDisplay } from "../utils";

const DELETE_KEYCODE = 8
const isValidKeycode = (keyCode) => {
    return keyCode === DELETE_KEYCODE || (keyCode >= 48 && keyCode <= 57) || (keyCode >= 96 && keyCode <= 105)
}

export default function CurrencyInput({ value, setValue, size, max, locale, currency }) {


    const handleKeyDown = (e) => {
        const { key, keyCode } = e
        console.log({ e, key, keyCode })

        if (isValidKeycode(keyCode)) {

            setValue(prev => {
                if (keyCode === DELETE_KEYCODE) {
                    return Math.floor(prev / 10)
                } else {
                    const newValue = prev * 10 + parseInt(key)
                    return newValue > max ? prev : newValue

                }
            })
        }
    }

    const valueDisplay = currencyDisplay(value, locale, currency)

    return (
        <TextInput
            size={size}
            value={valueDisplay}
            onChange={() => { }}
            onKeyDown={handleKeyDown}
        />
    )
}