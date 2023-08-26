import { DefaultTheme } from "vitepress";

const navConfig: DefaultTheme.NavItem[] = [
  { text: "主页", link: "/" },
  { 
    text: "关于",
    items:[
      {text: "关于，我", link: "/About/Me" },
      { text: "关于这个站", link: "/About/About-This-Blog" },
    ]
  },
];

export default navConfig;
