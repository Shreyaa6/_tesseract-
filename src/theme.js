// Theme configuration for consistent styling across components
export const theme = {
  // Color palette
  colors: {
    // Primary colors
    primary: {
      50: '#f0f9ff',
      100: '#e0f2fe',
      200: '#bae6fd',
      300: '#7dd3fc',
      400: '#38bdf8',
      500: '#0ea5e9',
      600: '#0284c7',
      700: '#0369a1',
      800: '#075985',
      900: '#0c4a6e',
    },
    
    // Secondary colors
    secondary: {
      50: '#fdf4ff',
      100: '#fae8ff',
      200: '#f5d0fe',
      300: '#f0abfc',
      400: '#e879f9',
      500: '#d946ef',
      600: '#c026d3',
      700: '#a21caf',
      800: '#86198f',
      900: '#701a75',
    },
    
    // Neutral colors
    neutral: {
      50: '#fafafa',
      100: '#f5f5f5',
      200: '#e5e5e5',
      300: '#d4d4d4',
      400: '#a3a3a3',
      500: '#737373',
      600: '#525252',
      700: '#404040',
      800: '#262626',
      900: '#171717',
    },
    
    // Semantic colors
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6',
    
    // Background colors
    background: {
      light: '#ffffff',
      dark: '#0f172a',
      card: 'rgba(255, 255, 255, 0.1)',
      cardDark: 'rgba(0, 0, 0, 0.1)',
    },
    
    // Text colors
    text: {
      primary: '#1f2937',
      secondary: '#6b7280',
      light: '#ffffff',
      dark: '#111827',
    },
  },

  // Typography
  typography: {
    fontFamily: {
      sans: ['Inter', 'system-ui', 'Avenir', 'Helvetica', 'Arial', 'sans-serif'],
      mono: ['Fira Code', 'Monaco', 'Consolas', 'monospace'],
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '3.75rem',
    },
    fontWeight: {
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
    },
    lineHeight: {
      tight: '1.25',
      normal: '1.5',
      relaxed: '1.75',
    },
  },

  // Spacing
  spacing: {
    0: '0',
    1: '0.25rem',
    2: '0.5rem',
    3: '0.75rem',
    4: '1rem',
    5: '1.25rem',
    6: '1.5rem',
    8: '2rem',
    10: '2.5rem',
    12: '3rem',
    16: '4rem',
    20: '5rem',
    24: '6rem',
    32: '8rem',
  },

  // Border radius
  borderRadius: {
    none: '0',
    sm: '0.125rem',
    base: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    '2xl': '1rem',
    '3xl': '1.5rem',
    full: '9999px',
  },

  // Shadows
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
  },

  // Breakpoints
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },

  // Transitions
  transitions: {
    fast: '150ms ease-in-out',
    normal: '250ms ease-in-out',
    slow: '350ms ease-in-out',
  },

  // Z-index
  zIndex: {
    hide: -1,
    auto: 'auto',
    base: 0,
    docked: 10,
    dropdown: 1000,
    sticky: 1100,
    banner: 1200,
    overlay: 1300,
    modal: 1400,
    popover: 1500,
    skipLink: 1600,
    toast: 1700,
    tooltip: 1800,
  },
};

// Utility function to get theme values
export const getThemeValue = (path) => {
  return path.split('.').reduce((obj, key) => obj?.[key], theme);
};

// CSS-in-JS helper functions
export const createStyles = (styles) => {
  return styles;
};

// Common component styles
export const componentStyles = {
  button: {
    base: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: theme.borderRadius.md,
      fontWeight: theme.typography.fontWeight.medium,
      transition: theme.transitions.fast,
      cursor: 'pointer',
      border: 'none',
      outline: 'none',
    },
    sizes: {
      sm: {
        padding: `${theme.spacing[2]} ${theme.spacing[3]}`,
        fontSize: theme.typography.fontSize.sm,
      },
      md: {
        padding: `${theme.spacing[3]} ${theme.spacing[4]}`,
        fontSize: theme.typography.fontSize.base,
      },
      lg: {
        padding: `${theme.spacing[4]} ${theme.spacing[6]}`,
        fontSize: theme.typography.fontSize.lg,
      },
    },
    variants: {
      primary: {
        backgroundColor: theme.colors.primary[600],
        color: theme.colors.text.light,
        '&:hover': {
          backgroundColor: theme.colors.primary[700],
        },
      },
      secondary: {
        backgroundColor: theme.colors.secondary[600],
        color: theme.colors.text.light,
        '&:hover': {
          backgroundColor: theme.colors.secondary[700],
        },
      },
      outline: {
        backgroundColor: 'transparent',
        color: theme.colors.primary[600],
        border: `1px solid ${theme.colors.primary[600]}`,
        '&:hover': {
          backgroundColor: theme.colors.primary[50],
        },
      },
    },
  },
  
  card: {
    base: {
      borderRadius: theme.borderRadius.lg,
      padding: theme.spacing[6],
      boxShadow: theme.shadows.md,
      backgroundColor: theme.colors.background.card,
      border: `1px solid rgba(255, 255, 255, 0.2)`,
    },
  },
  
  input: {
    base: {
      width: '100%',
      padding: `${theme.spacing[3]} ${theme.spacing[4]}`,
      borderRadius: theme.borderRadius.md,
      border: `1px solid ${theme.colors.neutral[300]}`,
      fontSize: theme.typography.fontSize.base,
      transition: theme.transitions.fast,
      outline: 'none',
      '&:focus': {
        borderColor: theme.colors.primary[500],
        boxShadow: `0 0 0 3px ${theme.colors.primary[100]}`,
      },
    },
  },
};

export default theme;
