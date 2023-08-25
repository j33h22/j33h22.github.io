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
  "/Articles/Technolgies/": [
    {
      text: "技术文",
      items: [
        { text: "首页", link: "/Articles/Technolgies/" },
      ],
    },
  ],
  "/Articles/TheRoadOfDesign/": [
    {
      text: "设计之路",
      items: [
        { text: "首页", link: "/Articles/TheRoadOfDesign/" },
      ],
    },
  ],
};

Object.assign(
  sidebarConfig,
  )

// console.log(sidebarConfig)

export default sidebarConfig;
