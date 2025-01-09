# Dubai Design System React Components

## Installation

```bash
npm install @dubai-design-system/components-react
```

## Usage
After adding the @dubai-design-system/components-react package to your project, you've to extend the standard React setup by the DubaiDesignSystemProvider.

```tsx
// index.tsx
import { DubaiDesignSystemProvider } from '@dubai-design-system/components-react';

const App = () => {
  return (
    <DubaiDesignSystemProvider>
      <h1>Hello World</h1>
    </DubaiDesignSystemProvider>
  );
};
```

Change your App file to use at least one Dubai Design System component, for example:

```tsx
// App.tsx
import { Button } from '@dubai-design-system/components-react';

const App = () => {
  return (
    <Button>Click me</Button>
  );
};
```