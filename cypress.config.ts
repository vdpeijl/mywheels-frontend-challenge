import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:9009",
  },
  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
  },
});
