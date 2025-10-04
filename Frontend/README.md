# _tesseract/ Frontend

A modern React application built with Vite.

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Development

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### Building for Production

Build the application for production:
```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

Preview the production build locally:
```bash
npm run preview
```

### Linting

Run ESLint to check for code quality issues:
```bash
npm run lint
```

Fix linting issues automatically:
```bash
npm run lint:fix
```

## Project Structure

```
frontend/
├── public/          # Static assets
├── src/
│   ├── components/  # React components
│   ├── App.jsx      # Main App component
│   ├── main.jsx     # Application entry point
│   └── index.css    # Global styles
├── index.html       # HTML template
├── package.json     # Dependencies and scripts
├── vite.config.js   # Vite configuration
└── .eslintrc.cjs    # ESLint configuration
```

## Technologies Used

- **React 18** - UI library
- **Vite** - Build tool and development server
- **ESLint** - Code linting
- **CSS3** - Styling

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
