import{h as v,w as F,o as d,c as r,C as e,F as $,R as b,t as c,a as N,K as k,b as n,a5 as C,a6 as P,i as B,e as J,J as x}from"./chunks/framework.25239179.js";const M="/img/avatar/Ju33Huang22.jpg",w=[{title:"VitePress博客折腾日记",author:"Ju33Huang22",date:"2023-08-26",categories:["技术文"],tags:["VitePress"],link:"/Articles/Technolgies/VitePress-Build"}];function D(){w.sort((i,t)=>new Date(t.date)-new Date(i.date));const _={},l=new Set;let f=0,p=0;return w.map(i=>{f++,i.categories&&i.categories.map(t=>{_[t]||(_[t]=0),_[t]++}),i.tags&&i.tags.map(t=>{l.add(t)})}),p=l.size,{docData:w,categories:_,tags:l,docNum:f,tagNum:p}}const V={class:"docs-list-wrap"},E={class:"docs-list"},S=["href"],H={class:"docs-title"},L={class:"docs-footer"},A={class:"docs-info"},O={class:"docs-info"},R=["href"],T={class:"page-nation"},j=["disabled"],z=["disabled"],U=e("span",null,"跳转至",-1),K={__name:"docList",props:["filter","type"],setup(_){const l=_,{categories:f,docData:p}=D(),i=v([]);let t=v(1),h=v(1),g=v(null),m=v([]);F(()=>l.filter,s=>{let o=[];l.type==="tag"?o=p.filter(a=>!s||a.tags&&a.tags.includes(s)):o=p.filter(a=>!s||a.categories&&a.categories.includes(s)),h.value=Math.ceil(o.length/10),i.value=o,m.value=o.slice(0,10)},{immediate:!0});function u(s){!isNaN(s)||s>=h.value||s<1?t.value=s>h.value?h.value:s<1?1:+s:s=="prev"||s=="next"?t.value+=s==="prev"?-1:1:t.value=1,m.value=i.value.slice((t.value-1)*10,t.value*10)}return(s,o)=>(d(),r("div",V,[e("div",E,[(d(!0),r($,null,b(n(m),a=>(d(),r("a",{key:a.title,href:a.link,class:"docs"},[e("div",H,c(a.title),1),e("div",L,[e("span",A,"✍️"+c(a.author),1),e("span",O,"🕐"+c(a.date),1),e("span",null,[N(" 🔗 "),(d(!0),r($,null,b(a.tags,y=>(d(),r("a",{class:"docs-info docs-tag",style:k({color:y===l.filter?"var(--vp-home-hero-name-color)":"#7f7f7f"}),key:y,href:`/categories?tag=${y}&type=tag`,target:"_blank"},[e("span",null,c(y),1)],12,R))),128))])])],8,S))),128))]),e("div",T,[e("span",null,"共"+c(n(h))+"页",1),e("span",null,"当前第"+c(n(t))+"页",1),e("button",{onClick:o[0]||(o[0]=a=>u("prev")),disabled:n(t)==1},"上一页",8,j),e("button",{onClick:o[1]||(o[1]=a=>u("next")),disabled:n(t)==n(h)},"下一页",8,z),U,C(e("input",{"onUpdate:modelValue":o[2]||(o[2]=a=>B(g)?g.value=a:g=a),class:"input-page"},null,512),[[P,n(g)]]),e("button",{onClick:o[3]||(o[3]=a=>u(n(g)))},"前往")])]))}};const q={class:"home-page"},G=e("div",{class:"home-top"},[e("h1",{class:"name"},"Ju33Huang22's Blog"),e("p",{class:"tagline"},"Just sharing my ideas.")],-1),I={class:"docs-wrap"},Q={class:"docs info-wrapper"},W={class:"info-person"},X=e("img",{class:"info-avatar",src:M},null,-1),Y=e("div",{class:"info-name"},"Ju33Huang22",-1),Z={class:"info-num"},ee=e("h6",null,"文章",-1),se=e("h6",null,"标签",-1),te=e("h3",{class:"docs-types"},"分类",-1),ae=["href"],oe=e("h3",{class:"docs-types"},"标签",-1),ne=["href"],le={__name:"home",setup(_){const l=["#FFB3B3","#FFDBA4","#FFE9AE","#C1EFFF"],{docData:f,categories:p,tags:i,docNum:t,tagNum:h}=D();return J(()=>{if(typeof window!==void 0){console.log(window,"window"),console.log(document,"document");var g=document.createElement("div");document.body.appendChild(g)}}),(g,m)=>(d(),r("div",q,[G,e("div",I,[x(K),e("div",Q,[e("div",W,[X,Y,e("div",Z,[e("div",null,[e("h3",null,c(n(t)),1),ee]),e("div",null,[e("h3",null,c(n(h)),1),se])])]),e("div",null,[te,(d(!0),r($,null,b(n(p),(u,s)=>(d(),r("a",{key:s,class:"docs-categor docs",href:`/categories?cat=${s}&type=cat`,target:"_blank"},[e("span",null,c(s),1),e("span",{class:"docs-categor-num",style:k({backgroundColor:l[Math.floor(Math.random()*4)]})},c(u),5)],8,ae))),128))]),e("div",null,[oe,(d(!0),r($,null,b(n(i),u=>(d(),r("a",{key:u,class:"docs-tags",style:k({backgroundColor:l[Math.floor(Math.random()*4)]}),href:`/categories?tag=${u}&type=tag`,target:"_blank"},[e("div",null,c(u),1)],12,ne))),128))])])])]))}},de=JSON.parse('{"title":"首页","description":"","frontmatter":{"layout":"home","title":"首页"},"headers":[],"relativePath":"index.md","filePath":"index.md","lastUpdated":1693040727000}'),ie={name:"index.md"},re=Object.assign(ie,{setup(_){return(l,f)=>(d(),r("div",null,[x(le)]))}});export{de as __pageData,re as default};
