// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/oceanicNext");
const darkCodeTheme = require("prism-react-renderer/themes/palenight");
const remarkBreak = import("remark-breaks");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Axes",
  tagline:
    "A module used to change the information of user action entered by various input devices such as touch screen or mouse into the logical virtual coordinates.",
  url: "https://naver.github.io",
  baseUrl: "/egjs-axes/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: 'img/favicon.ico',
  organizationName: "naver",
  projectName: "naver.github.io",
  trailingSlash: false,
  plugins: ["docusaurus-plugin-sass"],
  presets: [
    [
      "@docusaurus/preset-classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          // Please change this to your repo.
          editUrl: "https://github.com/naver/egjs-axes/edit/master/packages/demo/",
          remarkPlugins: [remarkBreak]
        },
        pages: {
          remarkPlugins: [remarkBreak]
        },
        theme: {
          customCss: [
            require.resolve("./src/css/custom.css"),
            require.resolve("./src/css/bulma-override.sass")
          ]
        }
      })
    ]
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: "Axes",
        logo: {
          alt: "egjs",
          src: "img/logo.svg"
        },
        items: [
          {
            type: "doc",
            docId: "tutorials/installation",
            label: "Docs",
            position: "left"
          },
          {
            to: "Options",
            label: "Options",
            position: "left"
          },
          {
            type: "doc",
            docId: "api/Axes",
            label: "API",
            position: "left"
          },
          {
            type: "doc",
            docId: "demos/axes",
            label: "Demos",
            position: "left"
          },
          {
            href: "https://www.npmjs.com/package/@egjs/axes",
            className: "header-npm-link",
            "aria-label": "NPM Package",
            position: "right"
          },
          {
            href: "https://github.com/naver/egjs-axes",
            className: "header-github-link",
            "aria-label": "GitHub Repository",
            position: "right"
          }
        ]
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "Docs",
            items: [
              {
                label: "Getting Started",
                to: "docs/"
              }
            ]
          },
          {
            title: "More",
            items: [
              {
                label: "GitHub",
                href: "https://github.com/naver/egjs-axes"
              },
              {
                label: "Issues",
                href: "https://github.com/naver/egjs-axes/issues"
              },
              {
                label: "Naver Open Source",
                href: "https://naver.github.io/"
              }
            ]
          }
        ],
        logo: {
          alt: "egjs",
          src: "img/egjs_white.svg",
          href: "https://naver.github.io/egjs/"
        },
        copyright: `Copyright © ${new Date().getFullYear()} NAVER, Inc. Built with Docusaurus & Bulma.`
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme
      }
    })
};

module.exports = config;
