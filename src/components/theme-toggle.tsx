"use client";

import { useEffect, useState } from "react";

export function ThemeToggle() {
    const [dark, setDark] = useState(true);

    useEffect(() => {
        const saved = localStorage.getItem("theme");
        if (saved === "light") {
            setDark(false);
            document.documentElement.classList.remove("dark");
        }
    }, []);

    function toggle() {
        const next = !dark;
        setDark(next);
        if (next) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }

    return (
        <button
            onClick={toggle}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-black/5 dark:bg-white/10 text-base backdrop-blur-sm transition-all hover:bg-black/10 dark:hover:bg-white/20"
            aria-label="Toggle theme"
            title={dark ? "Switch to light mode" : "Switch to dark mode"}
        >
            {dark ? "☀️" : "🌙"}
        </button>
    );
}
