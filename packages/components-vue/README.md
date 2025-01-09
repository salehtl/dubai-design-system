# Dubai Design System Vue Components

The Dubai Design System Vue Components library provides a set of reusable UI components designed using Stencil.js and seamlessly integrated with Vue applications.

## Installation

To install the package, use the following command:
```bash
npm install @dubai-design-system/components-vue
```

## Getting Started

In your Vue application's entry file (e.g., main.js or main.ts), you need to register the Web Components globally by calling the defineCustomElements function from the loader
```ts
// main.ts
import { createApp } from 'vue';
import App from './App.vue';
import { defineCustomElements } from '@dubai-design-system/components-vue/loader';

// Initialize Web Components
defineCustomElements();

const app = createApp(App);
app.mount('#app');
```

## Usage

You can now use the components directly in your Vue application. Since the components are Web Components, they are treated like any other HTML element in Vue templates
```vue
<template>
  <div>
    <h1>Welcome to Dubai Design System</h1>
    <dds-button @click="handleClick">Click Me</dds-button>
  </div>
</template>

<script>
export default {
  methods: {
    handleClick() {
      alert('Button clicked!');
    },
  },
};
</script>
```