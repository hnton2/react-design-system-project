// Replace your-framework with the framework you are using (e.g., react-webpack5, vue3-vite)
import { StorybookConfig } from "@storybook/react-webpack5";

const config: StorybookConfig = {
  // Required
  framework: "@storybook/react-webpack5",
  stories: [
    "../src/**/*.stories.ts",
    "../src/**/**/*.stories.ts",
    "../src/atoms/Color/Color.stories.ts",
    "../src/Color.stories.ts",
    "../**/*.stories.ts",
    "./**/*.stories.ts",
    "../**/**/*.stories.ts",
    "../**/**/**/*.stories.ts",
  ],
  // Optional
  addons: ["@storybook/addon-essentials"],
  docs: {
    autodocs: "tag",
  },
};

export default config;
