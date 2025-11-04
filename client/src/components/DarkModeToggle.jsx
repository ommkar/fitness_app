import React, { useEffect, useState } from 'react';

export default function DarkModeToggle() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('theme');
    if (stored) setIsDark(stored === 'dark');
  }, []);

  const toggle = () => {
    const next = !isDark;
    setIsDark(next);
    if (next) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      className="px-3 py-1.5 rounded-xl text-sm bg-neutral-200 text-neutral-900 dark:bg-neutral-700 dark:text-neutral-100 transition-colors"
      aria-label="Toggle dark mode"
      title={isDark ? 'Dark' : 'Light'}
    >
      {isDark ? 'Dark' : 'Light'}
    </button>
  );
}


