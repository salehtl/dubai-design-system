/**
 * A Node CLI tool that generates color palettes (primary, secondary, and optionally
 * system palettes like success, warning, info, error and neutral) based on user-provided seed colors.
 * Optionally, it can output a CSS variables file.
 */

const fs = require("fs");
const readlineSync = require("readline-sync");
const { Hct } = require("@material/material-color-utilities");

/**
 * Converts an HCT color to an RGB hex string.
 * @param {number} hue - The hue (0-360).
 * @param {number} chroma - The chroma (color intensity).
 * @param {number} tone - The tone (lightness, 0-100).
 * @returns {string} - RGB color in hex format.
 */
function hctToHex(hue, chroma, tone) {
  const hctColor = Hct.from(hue, chroma, tone);
  const intValue = hctColor.toInt();
  return `#${intValue.toString(16).slice(-6).toUpperCase()}`; // Extract RGB hex
}

/**
 * Generates a Material Design palette based on the root color using HCT.
 * @param {string} rootHex - The root color in HEX format (e.g., #FF5722).
 * @returns {object} - A palette object with 27 generated shades.
 */
function generateHctPalette(rootHex) {
  // Convert root HEX to HCT
  const rootColor = Hct.fromInt(parseInt(rootHex.replace("#", ""), 16));
  const hue = rootColor.hue; // Preserve root color's hue
  const chroma = Math.max(rootColor.chroma, 16); // Avoid chroma becoming too muted

  // Generate 27 shades using specific tone values
  const palette = {};
  const toneValues = [0, 4, 5, 6, 10, 12, 17, 20, 22, 24, 25, 30, 35, 40, 50, 60, 70, 80, 87, 90, 92, 94, 95, 96, 98, 99, 100];
  for (let i = 0; i < toneValues.length; i++) {
    const tone = toneValues[i];
    const colorHex = hctToHex(hue, chroma, tone);
    palette[`${toneValues[i]}`] = colorHex;
  }

  return palette;
}

/**
 * Generates a neutral gray palette using HCT with minimal chroma.
 * @returns {object} - A palette object with 27 neutral shades.
 */
function generateNeutralPalette() {
  const hue = 240; // Blue-based gray
  const chroma = 4; // Very low chroma for neutral appearance
  const palette = {};
  const toneValues = [0, 4, 5, 6, 10, 12, 17, 20, 22, 24, 25, 30, 35, 40, 50, 60, 70, 80, 87, 90, 92, 94, 95, 96, 98, 99, 100];
  
  for (let i = 0; i < toneValues.length; i++) {
    const tone = toneValues[i];
    const colorHex = hctToHex(hue, chroma, tone);
    palette[`${toneValues[i]}`] = colorHex;
  }

  return palette;
}

/**
 * Generates a neutral variant palette with a hint of the primary color.
 * @param {string} primaryHex - The primary color in HEX format to influence the neutral variant.
 * @returns {object} - A palette object with 27 neutral variant shades.
 */
function generateNeutralVariantPalette(primaryHex) {
  const primaryColor = Hct.fromInt(parseInt(primaryHex.replace("#", ""), 16));
  const hue = primaryColor.hue; // Use primary color's hue
  const chroma = 8; // Slightly higher chroma than neutral but still subtle
  const palette = {};
  const toneValues = [0, 4, 5, 6, 10, 12, 17, 20, 22, 24, 25, 30, 35, 40, 50, 60, 70, 80, 87, 90, 92, 94, 95, 96, 98, 99, 100];
  
  for (let i = 0; i < toneValues.length; i++) {
    const tone = toneValues[i];
    const colorHex = hctToHex(hue, chroma, tone);
    palette[`${toneValues[i]}`] = colorHex;
  }

  return palette;
}

/**
 * Generates CSS :root variables for a given palette.
 * @param {{ [key: string]: string }} palette - The palette object (e.g. {100: #..., ...}).
 * @param {string} prefix - A short prefix for variable names (e.g. "primary" or "secondary").
 * @returns {string} - A string containing CSS custom properties.
 */
function generateCssVariables(palette, prefix) {
  let css = `/* ${prefix} palette */\n`;
  css += `:root {\n`;
  for (const key in palette) {
    css += `  --${prefix}-${key}: ${palette[key]};\n`;
  }
  css += `}\n\n`;
  return css;
}

/**
 * Generates Level 2 semantic variables for light and dark modes.
 * @returns {string} - A CSS string containing semantic variables.
 */
function generateSemanticVariables() {
  // Centralized shade configuration
  const lightMode = {
    primary: {
      base: 40,
      on: 100,
      variant: 95,
      onVariant: 30,
      fixed: 60
    },
    secondary: {
      base: 40,
      on: 100,
      variant: 95,
      onVariant: 30,
      fixed: 60
    },
    success: {
      base: 40,
      on: 100,
      variant: 95,
      onVariant: 30,
      fixed: 60
    },
    warning: {
      base: 40,
      on: 100,
      variant: 95,
      onVariant: 30,
      fixed: 60
    },
    info: {
      base: 40,
      on: 100,
      variant: 95,
      onVariant: 30,
      fixed: 60
    },
    error: {
      base: 40,
      on: 100,
      variant: 95,
      onVariant: 30,
      fixed: 60
    },
    neutral: {
      base: 40,
      on: 100,
      variant: 95,
      onVariant: 30,
      fixed: 60
    },
    'neutral-variant': {
      base: 40,
      on: 100,
      variant: 95,
      onVariant: 30,
      fixed: 60
    }
  };

  const darkMode = {
    primary: {
      base: 70,
      on: 10,
      variant: 30,
      onVariant: 90,
      fixed: 60
    },
    secondary: {
      base: 70,
      on: 10,
      variant: 30,
      onVariant: 90,
      fixed: 60
    },
    success: {
      base: 70,
      on: 10,
      variant: 30,
      onVariant: 90,
      fixed: 60
    },
    warning: {
      base: 70,
      on: 10,
      variant: 30,
      onVariant: 90,
      fixed: 60
    },
    info: {
      base: 70,
      on: 10,
      variant: 30,
      onVariant: 90,
      fixed: 60
    },
    error: {
      base: 70,
      on: 10,
      variant: 30,
      onVariant: 90,
      fixed: 60
    },
    neutral: {
      base: 70,
      on: 10,
      variant: 30,
      onVariant: 90,
      fixed: 60
    },
    'neutral-variant': {
      base: 70,
      on: 10,
      variant: 30,
      onVariant: 90,
      fixed: 60
    }
  };

  // Generate CSS using the configurations
  let css = `/* Semantic variables */\n`;
  css += `:root {\n`;
  
  // Generate light mode variables
  Object.entries(lightMode).forEach(([colorName, shades]) => {
    css += `  --${colorName}: var(--${colorName}-${shades.base});\n`;
    css += `  --on-${colorName}: var(--${colorName}-${shades.on});\n`;
    css += `  --${colorName}-variant: var(--${colorName}-${shades.variant});\n`;
    css += `  --on-${colorName}-variant: var(--${colorName}-${shades.onVariant});\n`;
    css += `  --${colorName}-fixed: var(--${colorName}-${shades.fixed});\n`;
  });

  // Add surface and background variables
  css += `  --surface: var(--neutral-100);\n`;
  css += `  --surface-dim: var(--neutral-96);\n`;
  css += `  --surface-bright: var(--neutral-98);\n`;
  css += `  --on-surface: var(--neutral-0);\n`;
  css += `  --surface-variant: var(--neutral-variant-90);\n`;
  css += `  --on-surface-variant: var(--neutral-variant-30);\n\n`;

  css += `  --background-dim: var(--neutral-96);\n`;
  css += `  --background-bright: var(--neutral-100);\n`;
  css += `  --on-background: var(--neutral-10);\n\n`;

  css += `  --outline: var(--neutral-90);\n`;
  css += `  --outline-variant: var(--neutral-variant-80);\n\n`;

  css += `  --surface-container-lowest: var(--neutral-variant-96);\n`;
  css += `  --surface-container-low: var(--neutral-variant-94);\n`;
  css += `  --surface-container: var(--neutral-variant-92);\n`;
  css += `  --surface-container-high: var(--neutral-variant-90);\n`;
  css += `  --surface-container-highest: var(--neutral-variant-87);\n`;

  css += `  --disabled: var(--neutral-92);\n`;
  css += `  --on-disabled: var(--neutral-70);\n`;
  css += `}\n\n`;

  // Generate dark mode variables
  css += `@media (prefers-color-scheme: dark) {\n`;
  css += `  :root {\n`;
  Object.entries(darkMode).forEach(([colorName, shades]) => {
    css += `    --${colorName}: var(--${colorName}-${shades.base});\n`;
    css += `    --on-${colorName}: var(--${colorName}-${shades.on});\n`;
    css += `    --${colorName}-variant: var(--${colorName}-${shades.variant});\n`;
    css += `    --on-${colorName}-variant: var(--${colorName}-${shades.onVariant});\n`;
    css += `    --${colorName}-fixed: var(--${colorName}-${shades.fixed});\n`;
  });

  // Add surface and background variables for dark mode
  css += `    --surface: var(--neutral-10);\n`;
  css += `    --surface-dim: var(--neutral-17);\n`;
  css += `    --surface-bright: var(--neutral-12);\n`;
  css += `    --on-surface: var(--neutral-100);\n`;
  css += `    --surface-variant: var(--neutral-variant-30);\n`;
  css += `    --on-surface-variant: var(--neutral-variant-80);\n\n`;

  css += `    --background-dim: var(--neutral-0);\n`;
  css += `    --background-bright: var(--neutral-0);\n`;
  css += `    --on-background: var(--neutral-90);\n\n`;

  css += `    --outline: var(--neutral-30);\n`;
  css += `    --outline-variant: var(--neutral-variant-40);\n\n`;

  css += `    --surface-container-lowest: var(--neutral-variant-17);\n`;
  css += `    --surface-container-low: var(--neutral-variant-20);\n`;
  css += `    --surface-container: var(--neutral-variant-22);\n`;
  css += `    --surface-container-high: var(--neutral-variant-24);\n`;
  css += `    --surface-container-highest: var(--neutral-variant-24);\n`;

  css += `    --disabled: var(--neutral-20);\n`;
  css += `    --on-disabled: var(--neutral-40);\n`;
  css += `  }\n}\n\n`;

  return css;
}

(function main() {
  // 1) Ask for the primary seed color
  const primarySeed = readlineSync.question(
    "Enter your PRIMARY seed color in HEX (e.g., #8514FF): "
  );
  // 2) Ask for the secondary seed color
  const secondarySeed = readlineSync.question(
    "Enter your SECONDARY seed color in HEX (e.g., #FF5722): "
  );

  // Generate the two palettes
  console.log("\nGenerating palettes...\n");
  const primaryPalette = generateHctPalette(primarySeed);
  const secondaryPalette = generateHctPalette(secondarySeed);

  console.log("Primary Palette:");
  console.log(JSON.stringify(primaryPalette, null, 2));
  console.log("\nSecondary Palette:");
  console.log(JSON.stringify(secondaryPalette, null, 2));

  // Ask if user wants system palettes
  const generateSystemPalettes = readlineSync.keyInYNStrict(
    "\nWould you like to generate system palettes (success, warning, info, error, neutral)?"
  );

  let infoPalette, successPalette, warningPalette, errorPalette, neutralPalette, neutralVariantPalette;
  if (generateSystemPalettes) {
    console.log("\nGenerating system palettes...\n");
    infoPalette = generateHctPalette("#006687");
    successPalette = generateHctPalette("#0D6D2D");
    warningPalette = generateHctPalette("#835400");
    errorPalette = generateHctPalette("#C0000A");
    neutralPalette = generateNeutralPalette();
    neutralVariantPalette = generateNeutralVariantPalette(primarySeed);

    console.log("Info Palette:");
    console.log(JSON.stringify(infoPalette, null, 2));
    console.log("\nSuccess Palette:");
    console.log(JSON.stringify(successPalette, null, 2));
    console.log("\nWarning Palette:");
    console.log(JSON.stringify(warningPalette, null, 2));
    console.log("\nError Palette:");
    console.log(JSON.stringify(errorPalette, null, 2));
    console.log("\nNeutral Palette:");
    console.log(JSON.stringify(neutralPalette, null, 2));
    console.log("\nNeutral Variant Palette:");
    console.log(JSON.stringify(neutralVariantPalette, null, 2));
  }

  // Ask if user wants a CSS variables file
  const generateCss = readlineSync.keyInYNStrict(
    "\nWould you like to generate a CSS file with color variables?"
  );

  if (generateCss) {
    let cssContent = generateCssVariables(primaryPalette, "primary") +
                    generateCssVariables(secondaryPalette, "secondary");

    if (generateSystemPalettes) {
      cssContent += generateCssVariables(infoPalette, "info") +
                   generateCssVariables(successPalette, "success") +
                   generateCssVariables(warningPalette, "warning") +
                   generateCssVariables(errorPalette, "error") +
                   generateCssVariables(neutralPalette, "neutral") +
                   generateCssVariables(neutralVariantPalette, "neutral-variant");
    }

    cssContent += generateSemanticVariables();

    fs.writeFileSync("colors.css", cssContent, "utf-8");
    console.log("Created 'colors.css' with color variables.");
  } else {
    console.log("No CSS file generated.");
  }
})();
