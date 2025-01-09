import { Config } from '@stencil/core';
import { reactOutputTarget } from '@stencil/react-output-target';
import { vueOutputTarget } from '@stencil/vue-output-target';

export const config: Config = {
  namespace: 'components-js',
  globalStyle: 'src/global/global.css',
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements',
      customElementsExportBehavior: 'default',
      dir: 'loader',
      generateTypeDeclarations: true,
      externalRuntime: false,
    },
    vueOutputTarget({
      componentCorePackage: '@dubai-design-system/components-js',
      proxiesFile: '../components-vue/dist/components.ts',
    }),
    reactOutputTarget({
      // Relative path to where the React components will be generated
      outDir: '../components-react/dist/components/stencil-generated/',
      esModules: true,
    }),
    {
      type: 'docs-readme',
    },
    {
			type: 'docs-json',
			file: 'docs/docs.json'
		},
    // {
    //   type: 'www',
    //   serviceWorker: null, // disable service workers
    // },
  ],
  testing: {
    browserHeadless: "new",
  },
};
