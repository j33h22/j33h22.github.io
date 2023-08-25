import { DefaultTheme } from "vitepress";

const sidebarConfig: DefaultTheme.Sidebar = {
  "/About/": [
    {
      text: "关于",
      items: [
        { text: "关于，我", link: "/About/Me" },
        { text: "关于这个站", link: "/About/About-This-Blog" },
      ],
    },
  ],
  "/Articles/JustSomeShit/": [
    {
      text: "发电文",
      items: [
        { text: "首页", link: "/Articles/JustSomeShit/" },
      ],
    },
  ],
};

Object.assign(
  sidebarConfig,
  )

// console.log(sidebarConfig)

export default sidebarConfig;
