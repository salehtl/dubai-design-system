# Dubai Design System React Components

The Dubai Design System React Components library provides a set of reusable UI components designed using Stencil.js and seamlessly integrated with React applications.

## Installation

To install the package, use the following command:
```bash
npm install @dubai-design-system/components-react
```
## Getting Started

In your application's entry file (e.g., index.tsx or main.tsx):
```tsx
// index.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { defineCustomElements } from '@dubai-design-system/components-react/loader';
import App from './App';

// Initialize Web Components
defineCustomElements();

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

## Usage

You can now use the components directly in your React application. The components are imported like any other React component
```tsx
import React from 'react';
import { DdsButton } from '@dubai-design-system/components-react';

const HomePage = () => {
  return (
    <div>
      <h1>Welcome to Dubai Design System</h1>
      <DdsButton onClick={() => alert('Button clicked!')}>Click Me</DdsButton>
    </div>
  );
};

export default HomePage;
```