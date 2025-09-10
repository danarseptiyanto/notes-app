import React, { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";

// Utility: read preferred theme (localStorage -> system)
function getPreferredTheme() {
    if (typeof window === "undefined") return "light";
    const stored = window.localStorage.getItem("theme");
    if (stored === "light" || stored === "dark") return stored;
    const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)",
    ).matches;
    return prefersDark ? "dark" : "light";
}

// Apply the theme by toggling the `dark` class on <html>
function applyTheme(theme) {
    const root = document.documentElement;
    if (theme === "dark") {
        root.classList.add("dark");
    } else {
        root.classList.remove("dark");
    }
}

export default function ThemeToggle({ className = "" }) {
    const [theme, setTheme] = useState(() => getPreferredTheme());

    // Initialize & react to theme changes
    useEffect(() => {
        applyTheme(theme);
        window.localStorage.setItem("theme", theme);
    }, [theme]);

    // Keep in sync if changed in another tab
    useEffect(() => {
        const onStorage = (e) => {
            if (
                e.key === "theme" &&
                (e.newValue === "light" || e.newValue === "dark")
            ) {
                setTheme(e.newValue);
            }
        };
        window.addEventListener("storage", onStorage);
        return () => window.removeEventListener("storage", onStorage);
    }, []);

    const toggle = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

    return (
        <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label={
                theme === "dark"
                    ? "Switch to light theme"
                    : "Switch to dark theme"
            }
            aria-pressed={theme === "dark"}
            onClick={toggle}
            className={`relative h-9 w-9 rounded-full transition-all ${className}`}
        >
            {/* Sun icon (visible in light mode) */}
            <Sun className="absolute h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            {/* Moon icon (visible in dark mode) */}
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
        </Button>
    );
}

/*
Usage:
  1) Ensure Tailwind's dark mode is class-based in tailwind.config.js:  darkMode: ["class"]
  2) Drop <ThemeToggle /> anywhere in your UI (e.g., in your Navbar).
  3) Make sure your app's root HTML element (<html>) is where the `dark` class is applied.

Optional: To avoid a flash of incorrect theme on first paint, you can inline this script
right after your opening <head> tag:

  <script>
    (function() {
      try {
        var stored = localStorage.getItem('theme');
        var prefers = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        var theme = stored === 'light' || stored === 'dark' ? stored : prefers;
        if (theme === 'dark') document.documentElement.classList.add('dark');
      } catch (e) {}
    })();
  </script>
*/
