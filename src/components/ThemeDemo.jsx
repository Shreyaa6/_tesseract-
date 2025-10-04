import React, { useState } from 'react';
import { theme } from '../theme';
import { Button, Card, Input, Typography, Container } from './UI';

// Example component demonstrating theme usage
export const ThemeDemo = () => {
  const [selectedColor, setSelectedColor] = useState('primary');
  const [selectedSize, setSelectedSize] = useState('md');

  const colorOptions = [
    { key: 'primary', label: 'Primary', color: theme.colors.primary[600] },
    { key: 'secondary', label: 'Secondary', color: theme.colors.secondary[600] },
    { key: 'success', label: 'Success', color: theme.colors.success },
    { key: 'warning', label: 'Warning', color: theme.colors.warning },
    { key: 'error', label: 'Error', color: theme.colors.error },
  ];

  const sizeOptions = [
    { key: 'sm', label: 'Small' },
    { key: 'md', label: 'Medium' },
    { key: 'lg', label: 'Large' },
  ];

  const demoStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: theme.spacing[6],
    marginTop: theme.spacing[8],
  };

  const colorPaletteStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 1fr)',
    gap: theme.spacing[2],
    marginTop: theme.spacing[4],
  };

  const colorSwatchStyle = (color) => ({
    width: '100%',
    height: '40px',
    backgroundColor: color,
    borderRadius: theme.borderRadius.md,
    border: `1px solid ${theme.colors.neutral[200]}`,
    cursor: 'pointer',
    transition: theme.transitions.fast,
    '&:hover': {
      transform: 'scale(1.05)',
    },
  });

  return (
    <Container>
      <div style={demoStyle}>
        {/* Color Palette Demo */}
        <Card>
          <Typography variant="h3" style={{ marginBottom: theme.spacing[4] }}>
            Color Palette
          </Typography>
          <Typography variant="body2" color="secondary" style={{ marginBottom: theme.spacing[4] }}>
            All colors are defined in theme.js and can be accessed programmatically
          </Typography>
          
          <div>
            <Typography variant="body1" style={{ marginBottom: theme.spacing[2] }}>
              Primary Colors:
            </Typography>
            <div style={colorPaletteStyle}>
              {Object.entries(theme.colors.primary).map(([shade, color]) => (
                <div key={shade} style={colorSwatchStyle(color)} title={`Primary ${shade}: ${color}`} />
              ))}
            </div>
          </div>

          <div style={{ marginTop: theme.spacing[6] }}>
            <Typography variant="body1" style={{ marginBottom: theme.spacing[2] }}>
              Secondary Colors:
            </Typography>
            <div style={colorPaletteStyle}>
              {Object.entries(theme.colors.secondary).map(([shade, color]) => (
                <div key={shade} style={colorSwatchStyle(color)} title={`Secondary ${shade}: ${color}`} />
              ))}
            </div>
          </div>
        </Card>

        {/* Typography Demo */}
        <Card>
          <Typography variant="h3" style={{ marginBottom: theme.spacing[4] }}>
            Typography Scale
          </Typography>
          <Typography variant="body2" color="secondary" style={{ marginBottom: theme.spacing[4] }}>
            Consistent typography using theme values
          </Typography>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing[3] }}>
            <Typography variant="h1">Heading 1</Typography>
            <Typography variant="h2">Heading 2</Typography>
            <Typography variant="h3">Heading 3</Typography>
            <Typography variant="body1">Body text - Regular</Typography>
            <Typography variant="body2">Body text - Small</Typography>
            <Typography variant="caption">Caption text</Typography>
          </div>
        </Card>

        {/* Interactive Components Demo */}
        <Card>
          <Typography variant="h3" style={{ marginBottom: theme.spacing[4] }}>
            Interactive Components
          </Typography>
          <Typography variant="body2" color="secondary" style={{ marginBottom: theme.spacing[4] }}>
            Components that respond to theme changes
          </Typography>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing[4] }}>
            {/* Button Variants */}
            <div>
              <Typography variant="body1" style={{ marginBottom: theme.spacing[2] }}>
                Button Variants:
              </Typography>
              <div style={{ display: 'flex', gap: theme.spacing[2], flexWrap: 'wrap' }}>
                <Button variant="primary" size={selectedSize}>Primary</Button>
                <Button variant="secondary" size={selectedSize}>Secondary</Button>
                <Button variant="outline" size={selectedSize}>Outline</Button>
              </div>
            </div>

            {/* Size Controls */}
            <div>
              <Typography variant="body1" style={{ marginBottom: theme.spacing[2] }}>
                Button Size:
              </Typography>
              <div style={{ display: 'flex', gap: theme.spacing[2] }}>
                {sizeOptions.map(({ key, label }) => (
                  <Button
                    key={key}
                    variant={selectedSize === key ? 'primary' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedSize(key)}
                  >
                    {label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Input Demo */}
            <div>
              <Typography variant="body1" style={{ marginBottom: theme.spacing[2] }}>
                Input Field:
              </Typography>
              <Input placeholder="Type something here..." />
            </div>
          </div>
        </Card>

        {/* Spacing Demo */}
        <Card>
          <Typography variant="h3" style={{ marginBottom: theme.spacing[4] }}>
            Spacing Scale
          </Typography>
          <Typography variant="body2" color="secondary" style={{ marginBottom: theme.spacing[4] }}>
            Consistent spacing using theme values
          </Typography>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing[2] }}>
            {Object.entries(theme.spacing).slice(0, 8).map(([key, value]) => (
              <div key={key} style={{ display: 'flex', alignItems: 'center', gap: theme.spacing[4] }}>
                <div style={{ width: '60px', fontSize: theme.typography.fontSize.sm }}>
                  {key}
                </div>
                <div
                  style={{
                    height: '20px',
                    width: value,
                    backgroundColor: theme.colors.primary[200],
                    borderRadius: theme.borderRadius.sm,
                  }}
                />
                <div style={{ fontSize: theme.typography.fontSize.sm, color: theme.colors.text.secondary }}>
                  {value}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </Container>
  );
};

export default ThemeDemo;
