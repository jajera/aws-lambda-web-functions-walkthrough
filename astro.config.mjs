import { defineConfig } from "astro/config";
import { unified } from "@astrojs/markdown-remark";
import starlight from "@astrojs/starlight";
import starlightImageZoom from "starlight-image-zoom";
import { starlightBasePath } from "starlight-base-path";
import mermaid from "astro-mermaid";

const site = "https://aws-lambda-web-functions-walkthrough.johna.kiwi";
const base = "/";

export default defineConfig({
  site,
  base,
  markdown: {
    processor: unified(),
  },
  integrations: [
    mermaid(),
    starlight({
      title: "Lambda Web Functions Walkthrough",
      favicon: "/favicon.svg",
      description:
        "Deploy Node.js web apps and HTTP APIs on AWS Lambda Web Functions — no adapters, built-in HTTPS, scale to zero.",
      customCss: [
        "./src/styles/patina-tokens.css",
        "./src/styles/splash-overrides.css",
      ],
      components: {
        ThemeSelect: "./src/components/ThemeSelect.astro",
        Head: "./src/components/Head.astro",
      },
      head: [
        {
          tag: "meta",
          attrs: {
            property: "og:image",
            content: `${site}${base}og-image.png`,
          },
        },
        {
          tag: "meta",
          attrs: {
            property: "og:image:alt",
            content:
              "AWS Lambda Web Functions walkthrough — console-first, optional CLI",
          },
        },
        {
          tag: "meta",
          attrs: {
            name: "twitter:image",
            content: `${site}${base}og-image.png`,
          },
        },
      ],
      plugins: [starlightBasePath(), starlightImageZoom()],
      social: [
        {
          icon: "github",
          label: "Source Repository",
          href: "https://github.com/jajera/aws-lambda-web-functions-walkthrough",
        },
      ],
      editLink: {
        baseUrl:
          "https://github.com/jajera/aws-lambda-web-functions-walkthrough/edit/main/",
      },
      lastUpdated: true,
      pagination: true,
      sidebar: [
        { label: "Home", link: "/" },
        {
          label: "Before you begin",
          items: [
            { label: "Tooling", slug: "tooling" },
            { label: "Prerequisites", slug: "prerequisites" },
            { label: "Concepts", slug: "concepts" },
          ],
        },
        {
          label: "Walkthrough",
          items: [
            { label: "1. Local listen", slug: "local-listen" },
            { label: "2. Console create", slug: "console-create" },
            { label: "3. Revisions and endpoints", slug: "revisions-endpoints" },
            { label: "4. Prove", slug: "prove" },
            { label: "5. Logs peek", slug: "logs-peek" },
            { label: "6. Optional Express and CLI", slug: "optional-cli" },
            { label: "7. Go deeper", slug: "go-deeper" },
            { label: "8. Teardown", slug: "teardown" },
          ],
        },
        {
          label: "Reference",
          items: [
            { label: "Troubleshooting", slug: "troubleshooting" },
            { label: "AWS docs", slug: "references" },
          ],
        },
      ],
    }),
  ],
});
