import { useState } from "react"

export interface InputController {
    value: string,
    isFocused: boolean
    setValue: (value: string) => void,
    setIsFocused: (value: boolean) => void
    clear(): () => void
}

const useInputController = (): InputController => {
    const [isFocused, setIsFocused] = useState<boolean>(false)
    const [value, setValue] = useState<string>('')

    const clear = () => {
        setValue('')
    }

    return {
        value,
        isFocused,
        setValue,
        setIsFocused,
        clear
    } as InputController
}

export default useInputController