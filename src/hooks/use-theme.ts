import { useEffect, useState } from "react";

export const useTheme = () => {
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) setIsDark(savedTheme === 'dark');
    }, []);

    const toggleTheme = (checked: boolean) => {
        setIsDark(checked);
        localStorage.setItem('theme', checked ? 'dark' : 'light');
    };

    return { isDark, toggleTheme };
}
