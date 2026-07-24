import { useState } from "react";


function useLocalStorage(key, initialvalue) {

    const [value, setValue] = useState(() => {
        const storedValue = localStorage.getItem(key)
        if (storedValue !== null) {
            return JSON.parse(storedValue)
        }
        return initialvalue
    });

    const setstoredValue = (newValue) => {
        setValue(newValue)
        localStorage.setItem(key, JSON.stringify(newValue))
    };

    const removeValue =()=>{
        setValue(initialvalue)
        localStorage.removeItem(key)
    }

    return{
        value,
        setValue:setstoredValue,
        removeValue
    }

}

export default useLocalStorage;