import React from 'react';
import { theme, componentStyles } from '../theme';

// Button component using theme
export const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  onClick, 
  disabled = false,
  ...props 
}) => {
  const buttonStyle = {
    ...componentStyles.button.base,
    ...componentStyles.button.sizes[size],
    ...componentStyles.button.variants[variant],
    opacity: disabled ? 0.6 : 1,
    cursor: disabled ? 'not-allowed' : 'pointer',
  };

  return (
    <button
      style={buttonStyle}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

// Card component using theme
export const Card = ({ children, style = {}, ...props }) => {
  const cardStyle = {
    ...componentStyles.card.base,
    ...style,
  };

  return (
    <div style={cardStyle} {...props}>
      {children}
    </div>
  );
};

// Input component using theme
export const Input = ({ 
  placeholder, 
  value, 
  onChange, 
  type = 'text',
  style = {},
  ...props 
}) => {
  const inputStyle = {
    ...componentStyles.input.base,
    ...style,
  };

  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      style={inputStyle}
      {...props}
    />
  );
};

// Typography component using theme
export const Typography = ({ 
  children, 
  variant = 'body1', 
  color = 'primary',
  style = {},
  ...props 
}) => {
  const getTypographyStyle = () => {
    const baseStyle = {
      fontFamily: theme.typography.fontFamily.sans.join(', '),
      margin: 0,
    };

    const variants = {
      h1: {
        fontSize: theme.typography.fontSize['4xl'],
        fontWeight: theme.typography.fontWeight.bold,
        lineHeight: theme.typography.lineHeight.tight,
      },
      h2: {
        fontSize: theme.typography.fontSize['3xl'],
        fontWeight: theme.typography.fontWeight.bold,
        lineHeight: theme.typography.lineHeight.tight,
      },
      h3: {
        fontSize: theme.typography.fontSize['2xl'],
        fontWeight: theme.typography.fontWeight.semibold,
        lineHeight: theme.typography.lineHeight.normal,
      },
      body1: {
        fontSize: theme.typography.fontSize.base,
        fontWeight: theme.typography.fontWeight.normal,
        lineHeight: theme.typography.lineHeight.normal,
      },
      body2: {
        fontSize: theme.typography.fontSize.sm,
        fontWeight: theme.typography.fontWeight.normal,
        lineHeight: theme.typography.lineHeight.normal,
      },
      caption: {
        fontSize: theme.typography.fontSize.xs,
        fontWeight: theme.typography.fontWeight.normal,
        lineHeight: theme.typography.lineHeight.normal,
      },
    };

    const colorStyles = {
      primary: { color: theme.colors.text.primary },
      secondary: { color: theme.colors.text.secondary },
      light: { color: theme.colors.text.light },
      dark: { color: theme.colors.text.dark },
    };

    return {
      ...baseStyle,
      ...variants[variant],
      ...colorStyles[color],
    };
  };

  const Component = variant.startsWith('h') ? variant : 'p';

  return (
    <Component style={{ ...getTypographyStyle(), ...style }} {...props}>
      {children}
    </Component>
  );
};

// Container component using theme
export const Container = ({ 
  children, 
  maxWidth = 'lg',
  padding = true,
  style = {},
  ...props 
}) => {
  const containerStyle = {
    width: '100%',
    margin: '0 auto',
    maxWidth: theme.breakpoints[maxWidth],
    padding: padding ? theme.spacing[6] : 0,
    ...style,
  };

  return (
    <div style={containerStyle} {...props}>
      {children}
    </div>
  );
};
