'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import * as style from './../KSRSForm/classes';
import clsx from 'clsx';

const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <button
      onClick={toggleTheme}
      className={clsx(
        style.enabledButton,
        style.baseButton,
        style.hoverButton,
        'text-white',
        'hover:text-black',
        'mx-auto',
        'block',
        'mt-8',
      )}
    >
      {theme === 'dark' ? 'Light' : 'Dark'} Mode
    </button>
  );
};

export default ThemeSwitcher;
