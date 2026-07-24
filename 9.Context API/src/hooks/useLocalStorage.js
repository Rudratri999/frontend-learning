import { useState } from "react";


function useLocalStorage(key, initialValue) {




    const [value, setValue] = useState(() => {

        const storedValue = localStorage.getItem(key);
        if (storedValue !== null) {
            try {
                return JSON.parse(storedValue);
            } catch {
                return storedValue; // plain string fallback — this already exists, good
            }
        }

        return initialValue;
    });


    
    const setStoredValue = (newValue) => {
        setValue(newValue);
        const toStore = typeof newValue === "string" ? newValue : JSON.stringify(newValue);
        localStorage.setItem(key, toStore);
    };

    const removeValue = () => {

        setValue(initialValue);

        localStorage.removeItem(key);
    };


    return {
        value,
        setValue: setStoredValue,
        removeValue
    };
}


export default useLocalStorage;