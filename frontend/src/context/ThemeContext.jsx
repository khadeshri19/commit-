import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext(null);

export const THEMES = {
  default: {
    id: 'default',
    name: 'GitHub Terminal',
    bg: '#070a12',
    surface: '#0b0f1a',
    border: '#1e293b',
    accent: '#38bdf8',
    glow: 'rgba(56, 189, 248, 0.2)'
  },
  matrix: {
    id: 'matrix',
    name: 'Matrix Phosphor',
    bg: '#030a04',
    surface: '#061308',
    border: '#143818',
    accent: '#22c55e',
    glow: 'rgba(34, 197, 94, 0.25)'
  },
  amber: {
    id: 'amber',
    name: 'Retro Amber VT220',
    bg: '#0c0803',
    surface: '#171007',
    border: '#3d280d',
    accent: '#f59e0b',
    glow: 'rgba(245, 158, 11, 0.25)'
  },
  cyberpunk: {
    id: 'cyberpunk',
    name: 'Cyberpunk Neon',
    bg: '#0a0614',
    surface: '#120b24',
    border: '#2c1a59',
    accent: '#c084fc',
    glow: 'rgba(192, 132, 252, 0.25)'
  }
};

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => localStorage.getItem('commit_theme') || 'default');
  const [scanlines, setScanlines] = useState(() => localStorage.getItem('commit_scanlines') === 'true');

  useEffect(() => {
    localStorage.setItem('commit_theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('commit_scanlines', scanlines ? 'true' : 'false');
  }, [scanlines]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, themes: THEMES, scanlines, setScanlines }}>
      <div className={`theme-${theme} ${scanlines ? 'crt-scanlines' : ''}`}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
}
