import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import svelte from "rollup-plugin-svelte";
import zip from "rollup-plugin-zip";
import yaml from "@rollup/plugin-yaml";
import postcss from "rollup-plugin-postcss";
import { terser } from "rollup-plugin-terser";
import sveltePreprocess from "svelte-preprocess";
import typescript from "@rollup/plugin-typescript";
import {
  chromeExtension,
  simpleReloader,
} from "rollup-plugin-chrome-extension";
import { emptyDir } from "rollup-plugin-empty-dir";
import injectProcessEnv from "rollup-plugin-inject-process-env";

const production = !process.env.ROLLUP_WATCH;

export default {
  input: "src/manifest.json",
  output: {
    dir: "dist",
    format: "esm",
  },
  plugins: [
    // always put chromeExtension() before other plugins
    chromeExtension({ extendManifest: {name: "Power Gmail"} }),
    simpleReloader(),
    svelte({
      preprocess: sveltePreprocess({}),
      compilerOptions: {
        // enable run-time checks when not in production
        dev: !production,
      },
    }),
    yaml(),
    postcss({ minimize: production }),
    // the plugins below are optional
    resolve({
      dedupe: ["svelte", "lodash", "tailwindcss", "got"],
    }),
    // https://github.com/rollup/plugins/tree/master/packages/commonjs
    commonjs(),
    typescript({ sourceMap: true }),
    injectProcessEnv({
      ROLLUP_WATCH: process.env.ROLLUP_WATCH,
      NODE_ENV: process.env.NODE_ENV,
    }),
    // Empties the output dir before a new build
    emptyDir(),
    // If we're building for production, minify
    production && terser(),
    // Outputs a zip file in ./releases
    production && zip({ dir: "releases" }),
  ],
  perf: true,
};
