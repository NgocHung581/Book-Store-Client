import { useEffect, useState } from "react";

function useDarkMode() {
    const darkModeInit = localStorage.getItem("darkTheme")
        ? JSON.parse(localStorage.getItem("darkTheme"))
        : false;

    const [darkMode, setDarkMode] = useState(darkModeInit);

    const toggleDarkMode = () => {
        setDarkMode((prev) => !prev);
    };

    useEffect(() => {
        localStorage.setItem("darkTheme", JSON.stringify(darkMode));

        if (darkMode) {
            window.document.body.classList.add("dark");
        } else {
            window.document.body.classList.remove("dark");
        }
    }, [darkMode]);

    return [darkMode, toggleDarkMode];
}

export default useDarkMode;
