import {
  QwikRollupPluginOptions,
  QwikVitePluginOptions,
} from '@builder.io/qwik/optimizer';

const csr = true;
const srcDir = './resources/designs/components';

export const qwikViteConfig: QwikVitePluginOptions = {
  csr,
  srcDir,
};

export const qwikRollupConfig: QwikRollupPluginOptions = {
  csr,
  srcDir,
};

export const qwikConfig: {
  vite: QwikVitePluginOptions;
  rollup: QwikRollupPluginOptions;
} = {
  vite: qwikViteConfig,
  rollup: qwikRollupConfig,
};

export default qwikConfig;
