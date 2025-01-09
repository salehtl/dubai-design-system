import { Config } from '@stencil/core';
import { reactOutputTarget } from '@stencil/react-output-target';
import { vueOutputTarget } from '@stencil/vue-output-target';

export const config: Config = {
  namespace: 'components-js',
  globalStyle: 'src/global/global.css',
  outputTargets: [
    vueOutputTarget({
      componentCorePackage: '@dubai-design-system/components-js',
      proxiesFile: '../components-vue/dist/components.ts',
    }),
    reactOutputTarget({
      // Relative path to where the React components will be generated
      outDir: '../components-react/dist/components/stencil-generated/',
    }),
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements',
      customElementsExportBehavior: 'auto-define-custom-elements',
      externalRuntime: false,
    },
    {
      type: 'docs-readme',
    },
    {
      type: 'www',
      serviceWorker: null, // disable service workers
    },
  ],
  testing: {
    browserHeadless: "new",
  },
};
