import { useState } from "react"

export interface InputController {
    value: string,
    isFocused: boolean
    setValue: (value: string) => void,
    setIsFocused: (value: boolean) => void
}

const useInputController = (): InputController => {
    const [isFocused, setIsFocused] = useState<boolean>(false)
    const [value, setValue] = useState<string>('')

    return {
        value,
        isFocused,
        setValue,
        setIsFocused
    } as InputController
}

export default useInputController