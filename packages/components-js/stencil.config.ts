import { Config } from '@stencil/core';
import { reactOutputTarget as react } from '@stencil/react-output-target';
import { vueOutputTarget as vue } from '@stencil/vue-output-target';

export const config: Config = {
  namespace: 'components-js',
  globalStyle: 'src/global/global.css',
  outputTargets: [
		{
			type: 'dist',
			esmLoaderPath: '../loader',
			copy: [{ src: 'assets', dest: '../assets', warn: true }]
		},
		{
			type: 'dist-custom-elements',
      externalRuntime: false,
		},
		{
			type: 'docs-readme',
			strict: true,
			footer: ''
		},
		{
			type: 'docs-json',
			file: 'docs/docs.json'
		},
    react({
      outDir: '../components-react/src/',
		}),
    vue({
      componentCorePackage: '@dubai-design-system/components-js',
      proxiesFile: '../components-vue/src/',
		}),
		// {
		// 	type: 'www',
		// 	serviceWorker: null, // disable service workers
		// 	copy: [{ src: 'assets/svg-symbols.svg', dest: 'svg-symbols.svg' }]
		// }
  ],
  testing: {
    browserHeadless: "new",
  },
};
