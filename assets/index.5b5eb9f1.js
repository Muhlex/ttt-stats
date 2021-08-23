var t=Object.defineProperty,e=Object.defineProperties,n=Object.getOwnPropertyDescriptors,r=Object.getOwnPropertySymbols,a=Object.prototype.hasOwnProperty,s=Object.prototype.propertyIsEnumerable,l=(e,n,r)=>n in e?t(e,n,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[n]=r,o=(t,e)=>{for(var n in e||(e={}))a.call(e,n)&&l(t,n,e[n]);if(r)for(var n of r(e))s.call(e,n)&&l(t,n,e[n]);return t};import{S as i,i as c,s as u,e as m,a as d,b as p,n as $,d as f,R as g,c as b,m as v,t as y,f as h,g as x,L as w,h as T,j as q,k as D,l as C,o as P,r as O,p as _,q as N,u as S,C as A,v as I,w as M,x as R,y as j,z as k,A as E,B as U,D as B,E as G,F}from"./vendor.d46af960.js";function L(t){const e=t.match(/TTT_ROUND_START;\d*;\d*;\d*;(\d+)/);return e?new Date(1e3*Number(e[1])):null}function W(t){let e=t.match(/TTT_ROUND_START;(\d*);(\d*);(\d*)/);return e?(e=e.slice(1).map((t=>Number(t))),e[0]<1?null:{total:e[0],innocent:e[0]-e[1]-e[2],traitor:e[1],detective:e[2]}):null}function J(t,e){return[...t.matchAll(/J;(.*?);/g)].map((([,t])=>({guid:t,meta:e.get(t)})))}function K(t){return[...t.matchAll(/TTT_ITEM_BOUGHT;(.*?);(.*?);(.*?);(.*)/g)].map((t=>({name:t[4],role:t[3],player:t[1]})))}function z(t){const e=t.match(/TTT_ROUND_END;(.*?);(.*?);(.*);*/);return e?{winner:e[1],reason:e[2],roundLength:Number(e[3])}:null}async function H(){try{const t=await fetch("https://muhlex.github.io/ttt-stats-log/full.log");let e=(await t.text()).replaceAll("\r","");e=e.replace(/.* -{20,}\n.*InitGame\n.*TTT_ROUND_START.*\n.*TTT_ROUND_END.*(?:.|\n)*?.*ShutdownGame.*\n.*-{20,}\n/g,"");const n=function(t){const e=new Map,n=[...t.matchAll(/J;(.*?);.*?;(.*)/g)];for(const[,a,s]of n)e.set(a,{name:(r=s,r.replace(/\^[\d:;]/g,"")).trim(),isBot:16!==a.length});var r;return e}(e),r=e.match(/\d*:\d* InitGame(?:.|\n)*?ShutdownGame/g).map((t=>({date:L(t),playerCounts:W(t),players:J(t,n),items:K(t),outcome:z(t)}))).filter((({playerCounts:t,outcome:e})=>t&&e)).filter((({players:t})=>t.every((({meta:{isBot:t}})=>!t))));return{players:n,rounds:r}}catch(t){return t}}function Q(t){const r=t.reduce(((t,e)=>{const n={playtime:t.playtime+e.outcome.roundLength,wins:t.wins};n.wins[e.outcome.winner]||(n.wins[e.outcome.winner]={});const r=n.wins[e.outcome.winner];return r[e.outcome.reason]=(r[e.outcome.reason]||0)+1,n}),{playtime:0,wins:{}});return a=o({rounds:t.length||0},r),s={playtime:Math.floor(r.playtime)},e(a,n(s));var a,s}function V(t){let e;return{c(){e=m("div"),e.textContent="Loading Data...",d(e,"class","svelte-15li9q4")},m(t,n){p(t,e,n)},p:$,i:$,o:$,d(t){t&&f(e)}}}class X extends i{constructor(t){super(),c(this,t,null,V,u,{})}}function Y(t){let e;return{c(){e=D("Overview")},m(t,n){p(t,e,n)},d(t){t&&f(e)}}}function Z(t){let e;return{c(){e=D("Player Stats")},m(t,n){p(t,e,n)},d(t){t&&f(e)}}}function tt(t){let e,n,r,a,s;return n=new w({props:{to:"/",$$slots:{default:[Y]},$$scope:{ctx:t}}}),a=new w({props:{to:"/players",$$slots:{default:[Z]},$$scope:{ctx:t}}}),{c(){e=m("nav"),b(n.$$.fragment),r=T(),b(a.$$.fragment),d(e,"class","svelte-11t1l")},m(t,l){p(t,e,l),v(n,e,null),q(e,r),v(a,e,null),s=!0},p(t,e){const r={};1&e&&(r.$$scope={dirty:e,ctx:t}),n.$set(r);const s={};1&e&&(s.$$scope={dirty:e,ctx:t}),a.$set(s)},i(t){s||(y(n.$$.fragment,t),y(a.$$.fragment,t),s=!0)},o(t){h(n.$$.fragment,t),h(a.$$.fragment,t),s=!1},d(t){t&&f(e),x(n),x(a)}}}function et(t){let e,n;return e=new g({props:{basepath:"/ttt-stats/",$$slots:{default:[tt]},$$scope:{ctx:t}}}),{c(){b(e.$$.fragment)},m(t,r){v(e,t,r),n=!0},p(t,[n]){const r={};1&n&&(r.$$scope={dirty:n,ctx:t}),e.$set(r)},i(t){n||(y(e.$$.fragment,t),n=!0)},o(t){h(e.$$.fragment,t),n=!1},d(t){x(e,t)}}}class nt extends i{constructor(t){super(),c(this,t,null,et,u,{})}}function rt(t){let e,n,r,a,s,l,o,i,c,u,g,b,v,y,h,x,w,D,_,N,S,A,I,M,R,j,k,E,U;return{c(){e=m("div"),n=m("h2"),n.textContent="Filters",r=T(),a=m("div"),s=m("div"),l=m("h3"),l.textContent="Playercount",o=T(),i=m("label"),i.textContent="min",c=T(),u=m("input"),b=T(),v=m("label"),v.textContent="max",y=T(),h=m("input"),w=T(),D=m("div"),_=m("h3"),_.textContent="Date",N=T(),S=m("label"),S.textContent="between",A=T(),I=m("input"),M=T(),R=m("label"),R.textContent="and",j=T(),k=m("input"),d(n,"class","svelte-1bqqd9"),d(l,"class","svelte-1bqqd9"),d(i,"for","filter-min-players"),d(i,"class","svelte-1bqqd9"),d(u,"id","filter-min-players"),d(u,"type","number"),d(u,"min","1"),d(u,"max","18"),u.value=g=t[0].minPlayers,C(u,"width","calc(2ch + 32px)"),d(u,"class","svelte-1bqqd9"),d(v,"for","filter-max-players"),d(v,"class","svelte-1bqqd9"),d(h,"id","filter-max-players"),d(h,"type","number"),d(h,"min","1"),d(h,"max","18"),h.value=x=t[0].maxPlayers,C(h,"width","calc(2ch + 32px)"),d(h,"class","svelte-1bqqd9"),d(s,"class","filter svelte-1bqqd9"),d(_,"class","svelte-1bqqd9"),d(S,"for","filter-min-players"),d(S,"class","svelte-1bqqd9"),d(I,"id","filter-min-date"),d(I,"type","date"),d(I,"max",t[2]),I.value=t[1],d(I,"class","svelte-1bqqd9"),d(R,"for","filter-max-players"),d(R,"class","svelte-1bqqd9"),d(k,"id","filter-max-date"),d(k,"type","date"),d(k,"max",t[2]),k.value=t[2],d(k,"class","svelte-1bqqd9"),d(D,"class","filter svelte-1bqqd9"),d(a,"class","filter-groups svelte-1bqqd9"),d(e,"class","filters svelte-1bqqd9")},m(m,d){p(m,e,d),q(e,n),q(e,r),q(e,a),q(a,s),q(s,l),q(s,o),q(s,i),q(s,c),q(s,u),q(s,b),q(s,v),q(s,y),q(s,h),q(a,w),q(a,D),q(D,_),q(D,N),q(D,S),q(D,A),q(D,I),q(D,M),q(D,R),q(D,j),q(D,k),E||(U=[P(u,"input",t[3]),P(h,"input",t[4]),P(I,"input",t[5]),P(k,"input",t[6])],E=!0)},p(t,[e]){1&e&&g!==(g=t[0].minPlayers)&&(u.value=g),1&e&&x!==(x=t[0].maxPlayers)&&(h.value=x)},i:$,o:$,d(t){t&&f(e),E=!1,O(U)}}}function at(t,e,n){const r=new Date,a=new Date;a.setMonth(a.getMonth()-2);const s=a.toISOString().split("T")[0],l=r.toISOString().split("T")[0];let{filters:o={minPlayers:6,maxPlayers:18,minDate:new Date(s),maxDate:new Date(l)}}=e;return t.$$set=t=>{"filters"in t&&n(0,o=t.filters)},[o,s,l,({target:{value:t}})=>{n(0,o.minPlayers=Number(t),o),n(0,o.maxPlayers=Math.max(Number(t),o.maxPlayers),o)},({target:{value:t}})=>{n(0,o.maxPlayers=Number(t),o),n(0,o.minPlayers=Math.min(Number(t),o.minPlayers),o)},({target:{value:t}})=>{n(0,o.minDate=new Date(t),o)},({target:{value:t}})=>{n(0,o.maxDate=new Date(t),o)}]}class st extends i{constructor(t){super(),c(this,t,at,rt,u,{filters:0})}}function lt(t,e,n){const r=t.slice();return r[5]=e[n].key,r[6]=e[n].value,r}function ot(t){let e,n,r,a,s,l,o,i=t[5]+"",c=t[6]+"";return{c(){e=m("tr"),n=m("th"),r=D(i),a=T(),s=m("td"),l=D(c),o=T(),d(n,"class","svelte-1lrmq06")},m(t,i){p(t,e,i),q(e,n),q(n,r),q(e,a),q(e,s),q(s,l),q(e,o)},p(t,e){2&e&&i!==(i=t[5]+"")&&_(r,i),2&e&&c!==(c=t[6]+"")&&_(l,c)},d(t){t&&f(e)}}}function it(t){let e,n,r,a,s,l,o,i=t[1],c=[];for(let u=0;u<i.length;u+=1)c[u]=ot(lt(t,i,u));return{c(){e=m("h2"),e.textContent="Rounds",n=T(),r=m("div"),a=m("div"),s=m("canvas"),l=T(),o=m("table");for(let t=0;t<c.length;t+=1)c[t].c();d(a,"class","chart svelte-1lrmq06"),d(o,"class","svelte-1lrmq06"),d(r,"class","rounds svelte-1lrmq06")},m(i,u){p(i,e,u),p(i,n,u),p(i,r,u),q(r,a),q(a,s),t[4](s),q(r,l),q(r,o);for(let t=0;t<c.length;t+=1)c[t].m(o,null)},p(t,[e]){if(2&e){let n;for(i=t[1],n=0;n<i.length;n+=1){const r=lt(t,i,n);c[n]?c[n].p(r,e):(c[n]=ot(r),c[n].c(),c[n].m(o,null))}for(;n<c.length;n+=1)c[n].d(1);c.length=i.length}},i:$,o:$,d(a){a&&f(e),a&&f(n),a&&f(r),t[4](null),N(c,a)}}}function ct(t,e,n){let r,a,s,{roundTotals:l}=e;return S((()=>{n(3,s=new A(a,{type:"pie",options:{backgroundColor:["rgba(75, 192, 120, 0.2)","rgba(213, 194, 43, 0.2)","rgba(255, 99, 132, 0.2)"],borderColor:["rgb(75, 192, 120)","rgb(213, 194, 43)","rgb(255, 99, 132)"],borderWidth:2},data:{labels:["Innocent (death)","Innocent (timelimit)","Traitors (death)"],datasets:[{data:[]}]}}))})),t.$$set=t=>{"roundTotals"in t&&n(2,l=t.roundTotals)},t.$$.update=()=>{var e,a,o,i,c,u,m;4&t.$$.dirty&&n(1,r=[{key:"Rounds played",value:l.rounds},{key:"Average round length",value:(m=l.playtime/l.rounds,String(Math.floor(m/60)).padStart(2,"0")+":"+String(Math.floor(m%60)).padStart(2,"0"))},{key:"Innocent Wins",value:(Object.values(l.wins.innocent||{none:0}).reduce(((t,e)=>t+e))/l.rounds*100).toFixed()+"%"},{key:"Traitor Wins",value:(Object.values(l.wins.traitor||{none:0}).reduce(((t,e)=>t+e))/l.rounds*100).toFixed()+"%"}]),12&t.$$.dirty&&s&&(n(3,s.data.datasets[0].data=[(null==(a=null==(e=l.wins)?void 0:e.innocent)?void 0:a.death)||0,(null==(i=null==(o=l.wins)?void 0:o.innocent)?void 0:i.timelimit)||0,(null==(u=null==(c=l.wins)?void 0:c.traitor)?void 0:u.death)||0],s),s.update())},[a,r,l,s,function(t){I[t?"unshift":"push"]((()=>{a=t,n(0,a)}))}]}class ut extends i{constructor(t){super(),c(this,t,ct,it,u,{roundTotals:2})}}function mt(t){let e,n,r,a,s,l,o,i,c,u,g,b;return{c(){e=m("h2"),e.textContent="Items",n=T(),r=m("label"),r.textContent="Select role",a=T(),s=m("select"),l=m("option"),l.textContent="Traitor",o=m("option"),o.textContent="Detective",i=T(),c=m("div"),u=m("canvas"),d(r,"for","item-role"),l.__value="traitor",l.value=l.__value,o.__value="detective",o.value=o.__value,d(s,"id","item-select-role"),void 0===t[0]&&M((()=>t[4].call(s))),d(c,"class","chart")},m(m,d){p(m,e,d),p(m,n,d),p(m,r,d),p(m,a,d),p(m,s,d),q(s,l),q(s,o),R(s,t[0]),p(m,i,d),p(m,c,d),q(c,u),t[5](u),g||(b=P(s,"change",t[4]),g=!0)},p(t,[e]){1&e&&R(s,t[0])},i:$,o:$,d(l){l&&f(e),l&&f(n),l&&f(r),l&&f(a),l&&f(s),l&&f(i),l&&f(c),t[5](null),g=!1,b()}}}function dt(t,e,n){let r,a,s,{items:l}=e;return S((()=>{n(3,a=new A(r,{type:"bar",options:{indexAxis:"y",backgroundColor:["rgba(255, 99, 132, 0.2)","rgba(255, 159, 64, 0.2)","rgba(255, 205, 86, 0.2)","rgba(75, 192, 192, 0.2)","rgba(54, 162, 235, 0.2)","rgba(153, 102, 255, 0.2)","rgba(171, 172, 173, 0.2)"],borderColor:["rgb(255, 99, 132)","rgb(255, 159, 64)","rgb(255, 205, 86)","rgb(75, 192, 192)","rgb(54, 162, 235)","rgb(153, 102, 255)","rgb(171, 172, 173)"],borderWidth:1.5},data:{datasets:[{data:[],label:"times bought",parsing:{yAxisKey:"name",xAxisKey:"count"}}]}}))})),t.$$set=t=>{"items"in t&&n(2,l=t.items)},t.$$.update=()=>{13&t.$$.dirty&&a&&s&&(n(3,a.data.labels=[],a),n(3,a.data.datasets[0].data=l[s],a),a.update())},[s,r,l,a,function(){s=j(this),n(0,s)},function(t){I[t?"unshift":"push"]((()=>{r=t,n(1,r)}))}]}class pt extends i{constructor(t){super(),c(this,t,dt,mt,u,{items:2})}}function $t(t){let e,n,r,a;return e=new ut({props:{roundTotals:t[1]}}),r=new pt({props:{items:t[0]}}),{c(){b(e.$$.fragment),n=T(),b(r.$$.fragment)},m(t,s){v(e,t,s),p(t,n,s),v(r,t,s),a=!0},p(t,[n]){const a={};2&n&&(a.roundTotals=t[1]),e.$set(a);const s={};1&n&&(s.items=t[0]),r.$set(s)},i(t){a||(y(e.$$.fragment,t),y(r.$$.fragment,t),a=!0)},o(t){h(e.$$.fragment,t),h(r.$$.fragment,t),a=!1},d(t){x(e,t),t&&f(n),x(r,t)}}}function ft(t,e,n){let r,a,{rounds:s}=e;return t.$$set=t=>{"rounds"in t&&n(2,s=t.rounds)},t.$$.update=()=>{var e;4&t.$$.dirty&&n(1,r=s&&Q(s)),4&t.$$.dirty&&n(0,a=s&&(e="role",function(t){var e;const n=new Map;for(const r of t)n.set(r.name,{count:((null==(e=n.get(r.name))?void 0:e.count)||0)+1,role:r.role});return[...n].map((([t,e])=>o({name:t},e))).sort(((t,e)=>e.count-t.count))}(s.flatMap((({items:t})=>t))).reduce(((t,n)=>{const r=n[e];return t[r]=(t[r]||[]).concat(n),t}),{})))},[a,r,s]}class gt extends i{constructor(t){super(),c(this,t,ft,$t,u,{rounds:2})}}function bt(t){let e;return{c(){e=m("h2"),e.textContent="Coming soon..."},m(t,n){p(t,e,n)},p:$,i:$,o:$,d(t){t&&f(e)}}}class vt extends i{constructor(t){super(),c(this,t,null,bt,u,{})}}function yt(t){let e,n,r,a,s,l,o,i,c;function u(e){t[4](e)}let $={};void 0!==t[0]&&($.filters=t[0]),a=new st({props:$}),I.push((()=>B(a,"filters",u)));let g=t[2]&&xt(t);return i=new nt({}),{c(){e=m("main"),n=m("h1"),n.textContent="Trouble in Terrorist Town — Statistics",r=T(),b(a.$$.fragment),l=T(),g&&g.c(),o=T(),b(i.$$.fragment),d(n,"class","svelte-12mrmby"),d(e,"class","svelte-12mrmby")},m(t,s){p(t,e,s),q(e,n),q(e,r),v(a,e,null),q(e,l),g&&g.m(e,null),p(t,o,s),v(i,t,s),c=!0},p(t,n){const r={};!s&&1&n&&(s=!0,r.filters=t[0],G((()=>s=!1))),a.$set(r),t[2]?g?(g.p(t,n),4&n&&y(g,1)):(g=xt(t),g.c(),y(g,1),g.m(e,null)):g&&(U(),h(g,1,1,(()=>{g=null})),E())},i(t){c||(y(a.$$.fragment,t),y(g),y(i.$$.fragment,t),c=!0)},o(t){h(a.$$.fragment,t),h(g),h(i.$$.fragment,t),c=!1},d(t){t&&f(e),x(a),g&&g.d(),t&&f(o),x(i,t)}}}function ht(t){let e,n;return e=new X({}),{c(){b(e.$$.fragment)},m(t,r){v(e,t,r),n=!0},p:$,i(t){n||(y(e.$$.fragment,t),n=!0)},o(t){h(e.$$.fragment,t),n=!1},d(t){x(e,t)}}}function xt(t){let e,n;return e=new g({props:{basepath:"/ttt-stats/",$$slots:{default:[qt]},$$scope:{ctx:t}}}),{c(){b(e.$$.fragment)},m(t,r){v(e,t,r),n=!0},p(t,n){const r={};36&n&&(r.$$scope={dirty:n,ctx:t}),e.$set(r)},i(t){n||(y(e.$$.fragment,t),n=!0)},o(t){h(e.$$.fragment,t),n=!1},d(t){x(e,t)}}}function wt(t){let e,n;return e=new gt({props:{rounds:t[2]}}),{c(){b(e.$$.fragment)},m(t,r){v(e,t,r),n=!0},p(t,n){const r={};4&n&&(r.rounds=t[2]),e.$set(r)},i(t){n||(y(e.$$.fragment,t),n=!0)},o(t){h(e.$$.fragment,t),n=!1},d(t){x(e,t)}}}function Tt(t){let e,n;return e=new vt({}),{c(){b(e.$$.fragment)},m(t,r){v(e,t,r),n=!0},i(t){n||(y(e.$$.fragment,t),n=!0)},o(t){h(e.$$.fragment,t),n=!1},d(t){x(e,t)}}}function qt(t){let e,n,r,a;return e=new F({props:{path:"/",$$slots:{default:[wt]},$$scope:{ctx:t}}}),r=new F({props:{path:"/players",$$slots:{default:[Tt]},$$scope:{ctx:t}}}),{c(){b(e.$$.fragment),n=T(),b(r.$$.fragment)},m(t,s){v(e,t,s),p(t,n,s),v(r,t,s),a=!0},p(t,n){const a={};36&n&&(a.$$scope={dirty:n,ctx:t}),e.$set(a);const s={};32&n&&(s.$$scope={dirty:n,ctx:t}),r.$set(s)},i(t){a||(y(e.$$.fragment,t),y(r.$$.fragment,t),a=!0)},o(t){h(e.$$.fragment,t),h(r.$$.fragment,t),a=!1},d(t){x(e,t),t&&f(n),x(r,t)}}}function Dt(t){let e,n,r,a;const s=[ht,yt],l=[];function o(t,e){return t[1]?0:1}return e=o(t),n=l[e]=s[e](t),{c(){n.c(),r=k()},m(t,n){l[e].m(t,n),p(t,r,n),a=!0},p(t,[a]){let i=e;e=o(t),e===i?l[e].p(t,a):(U(),h(l[i],1,1,(()=>{l[i]=null})),E(),n=l[e],n?n.p(t,a):(n=l[e]=s[e](t),n.c()),y(n,1),n.m(r.parentNode,r))},i(t){a||(y(n),a=!0)},o(t){h(n),a=!1},d(t){l[e].d(t),t&&f(r)}}}function Ct(t,e,n){let r,a,s,l=!0;return(async()=>{n(3,a=await H()),n(1,l=!1)})(),t.$$.update=()=>{9&t.$$.dirty&&n(2,r=a&&s&&function(t,{minPlayers:e,maxPlayers:n,minDate:r,maxDate:a}){return t.filter((({playerCounts:t,date:s})=>("number"!=typeof e||t.total>=e)&&("number"!=typeof n||t.total<=n)&&(isNaN(r)||s>=r)&&(isNaN(a)||s<=a)))}(a.rounds,s))},[s,l,r,a,function(t){s=t,n(0,s)}]}new class extends i{constructor(t){super(),c(this,t,Ct,Dt,u,{})}}({target:document.getElementById("app")});
