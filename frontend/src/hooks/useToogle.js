import { useState } from "react"

export const useToogle = () => {
    const [value, setValue] = useState(false);

    const toogle = () => {
        setValue((prev) => !prev);
    }

    return [value, toogle];
}