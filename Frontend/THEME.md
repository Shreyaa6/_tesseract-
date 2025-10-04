# Theme System Documentation

This React application uses a centralized theme system for consistent styling across all components. All design tokens are defined in `src/theme.js` and can be used both in JavaScript/JSX and CSS.

## 🎨 Theme Structure

The theme object contains the following categories:

### Colors
- **Primary**: Blue color palette (50-900 shades)
- **Secondary**: Purple color palette (50-900 shades)  
- **Neutral**: Gray color palette (50-900 shades)
- **Semantic**: Success, warning, error, info colors
- **Background**: Light/dark background colors
- **Text**: Primary, secondary, light, dark text colors

### Typography
- **Font Families**: Sans-serif and monospace fonts
- **Font Sizes**: From xs (0.75rem) to 6xl (3.75rem)
- **Font Weights**: Light to extrabold
- **Line Heights**: Tight, normal, relaxed

### Spacing
- Consistent spacing scale from 0 to 32 (0 to 8rem)
- Used for margins, padding, gaps, etc.

### Other Design Tokens
- **Border Radius**: From none to full (rounded)
- **Shadows**: Multiple shadow levels
- **Transitions**: Fast, normal, slow timing
- **Breakpoints**: Responsive design breakpoints
- **Z-Index**: Layering system

## 🚀 Usage Examples

### In React Components (JavaScript/JSX)

```jsx
import { theme } from './theme';

const MyComponent = () => {
  const buttonStyle = {
    backgroundColor: theme.colors.primary[600],
    color: theme.colors.text.light,
    padding: theme.spacing[4],
    borderRadius: theme.borderRadius.md,
    fontSize: theme.typography.fontSize.base,
    fontWeight: theme.typography.fontWeight.medium,
    boxShadow: theme.shadows.md,
    transition: theme.transitions.fast,
  };

  return <button style={buttonStyle}>Click me</button>;
};
```

### In CSS (using CSS Custom Properties)

```css
.my-button {
  background-color: var(--color-primary-600);
  color: var(--color-text-light);
  padding: var(--spacing-4);
  border-radius: var(--radius-md);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-medium);
  box-shadow: var(--shadow-md);
  transition: var(--transition-fast);
}
```

### Using Pre-built Components

```jsx
import { Button, Card, Input, Typography } from './components/UI';

const MyPage = () => (
  <Card>
    <Typography variant="h2">Welcome</Typography>
    <Typography variant="body1">Enter your name:</Typography>
    <Input placeholder="Your name" />
    <Button variant="primary" size="md">Submit</Button>
  </Card>
);
```

## 🧩 Available Components

The theme system includes pre-built components in `src/components/UI.jsx`:

### Button
- **Variants**: primary, secondary, outline
- **Sizes**: sm, md, lg
- **Props**: onClick, disabled, children

### Card
- Consistent card styling with theme colors and shadows
- **Props**: children, style

### Input
- Styled input fields with focus states
- **Props**: placeholder, value, onChange, type, style

### Typography
- **Variants**: h1, h2, h3, body1, body2, caption
- **Colors**: primary, secondary, light, dark
- **Props**: children, variant, color, style

### Container
- Responsive container with max-width
- **Props**: children, maxWidth, padding, style

## 🎯 Best Practices

### 1. Always Use Theme Values
```jsx
// ✅ Good - uses theme
const style = {
  padding: theme.spacing[4],
  color: theme.colors.text.primary,
};

// ❌ Bad - hardcoded values
const style = {
  padding: '16px',
  color: '#333',
};
```

### 2. Use Semantic Color Names
```jsx
// ✅ Good - semantic
backgroundColor: theme.colors.primary[600]

// ❌ Bad - specific shade without context
backgroundColor: '#0284c7'
```

### 3. Leverage Component Styles
```jsx
// ✅ Good - uses componentStyles
const buttonStyle = {
  ...componentStyles.button.base,
  ...componentStyles.button.variants.primary,
};

// ❌ Bad - recreating styles
const buttonStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  // ... many more properties
};
```

### 4. Use CSS Custom Properties for Global Styles
```css
/* ✅ Good - uses CSS variables */
.my-component {
  background-color: var(--color-primary-600);
  padding: var(--spacing-4);
}

/* ❌ Bad - hardcoded values */
.my-component {
  background-color: #0284c7;
  padding: 1rem;
}
```

## 🔧 Extending the Theme

### Adding New Colors
```javascript
// In theme.js
colors: {
  // ... existing colors
  brand: {
    50: '#f0f9ff',
    500: '#0ea5e9',
    900: '#0c4a6e',
  },
}
```

### Adding New Component Styles
```javascript
// In theme.js
componentStyles: {
  // ... existing styles
  modal: {
    base: {
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: theme.colors.background.light,
      borderRadius: theme.borderRadius.lg,
      boxShadow: theme.shadows.xl,
    },
  },
}
```

## 📱 Responsive Design

Use theme breakpoints for responsive design:

```jsx
const responsiveStyle = {
  padding: theme.spacing[4],
  '@media (min-width: 768px)': {
    padding: theme.spacing[8],
  },
};
```

## 🌙 Dark Mode Support

The theme system includes dark mode support through CSS custom properties and media queries. Components automatically adapt to the user's system preference.

## 🎨 Customization

To customize the theme:

1. **Modify `src/theme.js`** - Update color values, spacing, typography, etc.
2. **Update CSS variables** - Sync changes in `src/index.css`
3. **Test components** - Ensure all components work with new values
4. **Document changes** - Update this documentation

## 📚 Examples

See `src/components/ThemeDemo.jsx` for comprehensive examples of how to use the theme system in practice.
