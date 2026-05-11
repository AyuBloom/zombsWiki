import type { Theme } from "vitepress";
import DefaultTheme from "vitepress/theme";
import "./custom.css";

import ImageWithDescription from "./components/ImageWithDescription.vue";

export default {
  extends: DefaultTheme,
  enhanceApp: ({ app }) => {
    app.component("ImageWithDescription", ImageWithDescription);
  },
} satisfies Theme;
