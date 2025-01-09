# Dubai Design System Web Components

The Dubai Design System Web Components library provides a set of reusable, framework-agnostic UI components built with Stencil.js. These components can be used in any JavaScript project, including plain HTML, without relying on frameworks.

##  Installation
To install the package, use the following command:

```bash
npm install @dubai-design-system/components-js
```

## Getting Started

Import the loader to define the custom elements globally in your application.

```js
// main.js
import { defineCustomElements } from '@dubai-design-system/components/loader';

// Initialize Web Components
defineCustomElements();
```


## Usage

You can now use the components directly in your JavaScript application. The components are imported like any other JavaScript module.

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Dubai Design System</title>
        <script src="PATH/TO/PACKAGE/@dubai-design-system/components-js/index.js"></script>
    </head>
    <body>
        <script type="text/javascript">
        dubaiDesignSystem.load();
        </script>
        <h1>Welcome to Dubai Design System</h1>

        <!-- Using the button component -->
        <dds-button id="myButton">Click Me</dds-button>

        <script type="module">
        // Add interactivity
        const button = document.getElementById('myButton');
        button.addEventListener('click', () => {
        alert('Button clicked!');
        });
        </script>
    </body>
</html>
```