import DefaultTheme from "vitepress/theme";
import type { Theme } from "vitepress";
import "./custom.css";

import ImageWithDescription from "./components/ImageWithDescription.vue";
import CopyOrDownloadAsMarkdownButtons from "vitepress-plugin-llms/vitepress-components/CopyOrDownloadAsMarkdownButtons.vue";

export default {
  extends: DefaultTheme,
  enhanceApp: ({ app }) => {
    app.component("ImageWithDescription", ImageWithDescription);
    app.component(
      "CopyOrDownloadAsMarkdownButtons",
      CopyOrDownloadAsMarkdownButtons,
    );
  },
} satisfies Theme;
