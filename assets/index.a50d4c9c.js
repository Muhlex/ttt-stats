var TN=Object.defineProperty,ON=Object.defineProperties;var mN=Object.getOwnPropertyDescriptors;var bE=Object.getOwnPropertySymbols;var UN=Object.prototype.hasOwnProperty,cN=Object.prototype.propertyIsEnumerable;var vE=(L,E,N)=>E in L?TN(L,E,{enumerable:!0,configurable:!0,writable:!0,value:N}):L[E]=N,X=(L,E)=>{for(var N in E||(E={}))UN.call(E,N)&&vE(L,N,E[N]);if(bE)for(var N of bE(E))cN.call(E,N)&&vE(L,N,E[N]);return L},AE=(L,E)=>ON(L,mN(E));import{c as DN,S as B,i as y,s as Y,a as UE,e as o,b as i,d as s,u as cE,g as DE,f as dE,t as T,h as O,j as l,L as dN,k as d,m as u,l as p,n as uE,o as VE,p as M,q as a,r as c,v as pE,w as V,x as W,y as uN,z as f,A as Q,B as tE,C as EE,D as hE,E as eE,F as PE,G as z,H as Z,R as CE,I as pN,J as wE,K as XE,M as sE,N as lE,O as hN,P as gN,Q as fN,T as WN,U as KN,V as BN,W as yN,X as YN,Y as kN}from"./vendor.38de3b33.js";const bN=function(){const E=document.createElement("link").relList;if(E&&E.supports&&E.supports("modulepreload"))return;for(const _ of document.querySelectorAll('link[rel="modulepreload"]'))n(_);new MutationObserver(_=>{for(const R of _)if(R.type==="childList")for(const A of R.addedNodes)A.tagName==="LINK"&&A.rel==="modulepreload"&&n(A)}).observe(document,{childList:!0,subtree:!0});function N(_){const R={};return _.integrity&&(R.integrity=_.integrity),_.referrerpolicy&&(R.referrerPolicy=_.referrerpolicy),_.crossorigin==="use-credentials"?R.credentials="include":_.crossorigin==="anonymous"?R.credentials="omit":R.credentials="same-origin",R}function n(_){if(_.ep)return;_.ep=!0;const R=N(_);fetch(_.href,R)}};bN();function aE(L){const[E,N]=L.split(":");return Number(E)*60+Number(N)}function vN(L){const E=L.match(/\n *\d*:\d* TTT_ROUND_START;(\d+)/);return E?new Date(Number(E[1])*1e3):null}function VN(L,E){const N=L.match(/\n *\d*:\d* TTT_PLAYERS;(.*)\n/);return N?N[1].split(";").map(n=>{const[,_,R]=n.match(/(.*)<(.*)>/);return AE(X({},E.get(_)),{role:R})}):[]}function wN(L){const E=L.match(/\n *\d*:\d* TTT_ROUND_END;(.*?);(.*?);(.*);*/);if(!E)return null;const[,N,n,_]=E;return{winner:N,reason:n,roundLength:Number(_)}}function XN(L,E){const N=L.match(/ *(\d*:\d*) (D|K);(.*);.*;.*;.*;(.*);.*;.*;.*;(.*);(.*);(.*);(.*)/);if(!N)return null;const[,n,_,R,A,e,G,I,t]=N,S=aE(n),H=E.find(({guid:m})=>m===R),C=E.find(({guid:m})=>m===A);let r=e;I==="MOD_MELEE"&&!["combat_knife_mp","riotshield_mp"].includes(r)&&(r="melee_mp");const F=[{type:"damage",time:S,victim:H,attacker:C,damage:Number(G),weapon:r,means:I,hitLoc:t}];return _==="K"&&F.push({type:"death",time:S,victim:H,attacker:C,damage:Number(G),weapon:r,means:I,hitLoc:t}),F}function xN(L,E){const N=L.match(/ *(\d*:\d*) TTT_ITEM_BOUGHT;(.*);.*;.*;(.*)/);if(!N)return null;const[,n,_,R]=N,A=E.find(e=>e.guid===_);return{type:"item-buy",time:aE(n),player:A,item:R}}function JN(L,E,N){const n=L.match(/ *(\d*:\d*) say;(.*?);.*?;.*?;(.*)/);if(!n)return null;const[,_,R,A]=n,e=E.find(t=>t.guid===R)||N.get(R)||{guid:R},G=A[0]===""?"quickmessage":"chat",I=["",""].includes(A[0])?A.slice(1):A;return{type:"say",time:aE(_),player:e,message:I,messageType:G}}function jN(L,E,N){const n=L.match(/\n *(\d*:\d*) TTT_ROUND_START.*\n((?:.|\n)*?)\n *(\d*:\d*) TTT_ROUND_END/);if(!n)return null;const[,_,R,A]=n,e=aE(_),G=aE(A),I=R.split(`
`).map(t=>XN(t,E)||xN(t,E)||JN(t,E,N)||null).filter(t=>t).flat(1);return[{type:"round-start",time:e},...I,{type:"round-end",time:G}].map(t=>AE(X({},t),{time:t.time-e}))}function QN(L){return L.replace(/\^[\d:;]/g,"")}function $N(L){const E=new Map,N=[...L.matchAll(/\n *\d*:\d* J;(.*?);.*?;(.*)/g)];for(const[,n,_]of N)E.set(n,{guid:n,name:QN(_).trim(),isBot:n.length!==16});return E}async function zN(){return await(await fetch("https://muhlex.github.io/ttt-stats-log/full.log")).text()}function ZN(L){return new Promise(E=>{let N=L.replaceAll("\r","");N=N.replace(/.* -{20,}\n.*InitGame\n.*TTT_ROUND_START.*\n.*TTT_ROUND_END.*(?:.|\n)*?.*ShutdownGame.*\n.*-{20,}\n/g,"");const n=$N(N),_=N.match(/\d*:\d* InitGame(?:.|\n)*?ShutdownGame/g).map(R=>{const A=VN(R,n);return{date:vN(R),players:A,outcome:wN(R),events:jN(R,A,n)}}).filter(({players:R,outcome:A})=>R.length&&A).filter(({players:R})=>R.every(({isBot:A})=>!A));E({players:n,rounds:_})})}function ME(L,E){return E.reduce((N,n)=>{const _=typeof L=="string"?n[L]:L(n);return N[_]=(N[_]||[]).concat(n),N},{})}function xE(L){return String(Math.floor(L/60)).padStart(2,"0")+":"+String(Math.floor(L%60)).padStart(2,"0")}const gE={leaderboards:{minRounds:50,maxDaysSinceLastSeen:90}};function qN(L,E){return L.filter(({players:N,date:n})=>(typeof E.players.min!="number"||N.length>=E.players.min)&&(typeof E.players.max!="number"||N.length<=E.players.max)&&(E.date.min===null||isNaN(E.date.min)||n>=E.date.min)&&(E.date.max===null||isNaN(E.date.max)||n<=E.date.max))}function En(L,E){const N=Nn(L,E);return{rounds:L,totals:_n(L),items:Ln(L),players:N,leaderboards:nn(N.filter(n=>{var I,t;const _=(I=L[L.length-1])==null?void 0:I.date,R=(t=n.rounds.any[n.rounds.any.length-1])==null?void 0:t.date,A=(_-(R||0))/(1e3*60*60*24),{leaderboards:{minRounds:e,maxDaysSinceLastSeen:G}}=gE;return n.rounds.any.length>=e||A<=G}))}}function Nn(L,E){return E.map(N=>{const n=(t,S)=>{const H=Object.keys(S[0]);return Object.fromEntries(H.map(C=>[C,t(...S.map(r=>r[C]))]))},_=An(L,N.guid),R=(()=>{const t=X({any:_,innocent:[],traitor:[],detective:[]},ME(({player:S})=>S.role,_));return t.innocentTeam=[...t.innocent,...t.detective],t})(),A=n(fE,[R]),e=n(rn,[A]),G=n(Cn,[R]),I=n(en,[R]);return AE(X({},N),{rounds:R,inRounds:Rn(_,N.guid),stats:{playtime:n(tn,[R]),roundsWon:I,roundsSurvived:n(Gn,[R]),roundsDiedFirst:n(Sn,[R]),roundsFirstBlood:n(In,[R]),kills:A,hitscanKills:e,teamKills:n(JE,[A]),explosiveKills:n(Pn,[A]),environmentalKills:n(sn,[A]),multiKills:n(ln,[R]),aces:n(Mn,[I]),deaths:G,suicides:n(Fn,[G]),kdr:n(an,[A,G]),kdrAdjusted:n(Hn,[A,G]),headshotPct:n(on,[e]),chatMessages:n(mn,[R]),items:X({traitor:[],detective:[]},ME("role",On(_,N.guid))),weapons:Tn(A.any)}})})}function nn(L){return{kills:[...L].map(E=>({player:E,value:E.stats.kills.any.length})).filter(({value:E})=>E>0).sort((E,N)=>N.value-E.value),deaths:[...L].map(E=>({player:E,value:E.stats.deaths.any.length})).filter(({value:E})=>E>0).sort((E,N)=>N.value-E.value),kdrAdjusted:[...L].filter(E=>E.stats.kills.any.length>0).sort((E,N)=>N.stats.kdrAdjusted.any-E.stats.kdrAdjusted.any).map(E=>({player:E,value:E.stats.kdrAdjusted.any.toFixed(2)})),headshotPct:[...L].filter(E=>E.stats.kills.any.length>0).sort((E,N)=>N.stats.headshotPct.any-E.stats.headshotPct.any).map(E=>({player:E,value:(E.stats.headshotPct.any*100).toFixed()+"%"})),neckKillsPct:[...L].map(E=>({player:E,value:E.stats.hitscanKills.any.filter(({hitLoc:N})=>N==="neck").length/(E.stats.hitscanKills.any.length||1)})).filter(({value:E})=>E>0).sort((E,N)=>N.value-E.value).map(({player:E,value:N})=>({player:E,value:(N*100).toFixed(1)+"%"})),multiKills:[...L].map(E=>({player:E,value:E.stats.multiKills.any.length})).filter(({value:E})=>E>0).sort((E,N)=>N.value-E.value),bombMultiKills:[...L].map(E=>({player:E,value:E.stats.multiKills.any.filter(([N])=>N.weapon==="briefcase_bomb_mp").length})).filter(({value:E})=>E>0).sort((E,N)=>N.value-E.value),explosiveKills:[...L].map(E=>({player:E,value:E.stats.explosiveKills.any.length})).filter(({value:E})=>E>0).sort((E,N)=>N.value-E.value),environmentalKills:[...L].map(E=>({player:E,value:E.stats.environmentalKills.any.length})).filter(({value:E})=>E>0).sort((E,N)=>N.value-E.value),revolverKills:[...L].map(E=>({player:E,value:E.stats.kills.any.filter(({weapon:N})=>N==="coltanaconda_mp").length})).filter(({value:E})=>E>0).sort((E,N)=>N.value-E.value),rpgDirectHitKills:[...L].map(E=>({player:E,value:E.stats.kills.any.filter(({weapon:N,means:n})=>N==="rpg_mp"&&n==="MOD_PROJECTILE").length})).filter(({value:E})=>E>0).sort((E,N)=>N.value-E.value),suicides:[...L].map(E=>({player:E,value:E.stats.suicides.any.length})).filter(({value:E})=>E>0).sort((E,N)=>N.value-E.value),fallingSuicides:[...L].map(E=>({player:E,value:E.stats.suicides.any.filter(({means:N})=>["MOD_FALLING","MOD_TRIGGER_HURT"].includes(N)).length})).filter(({value:E})=>E>0).sort((E,N)=>N.value-E.value),attackHeliSuicides:[...L].map(E=>({player:E,value:E.stats.suicides.any.filter(({weapon:N})=>N==="cobra_20mm_mp").length})).filter(({value:E})=>E>0).sort((E,N)=>N.value-E.value),traitorRoundWinTime:[...L].map(E=>({player:E,value:E.stats.roundsWon.traitor.reduce((N,{outcome:{roundLength:n}})=>n<N?n:N,1/0)})).filter(({value:E})=>E<1/0).sort((E,N)=>E.value-N.value).map(({player:E,value:N})=>({player:E,value:xE(N)})),traitorRoundsLostTimelimitCount:[...L].map(E=>({player:E,value:E.rounds.traitor.filter(N=>N.outcome.reason==="timelimit").length})).filter(({value:E})=>E>0).sort((E,N)=>N.value-E.value),traitorNoItemsWonRoundCount:[...L].map(E=>{const N=E.guid,n=E.rounds.traitor.filter(({events:_,outcome:R})=>{const A=R.winner==="traitor",e=_.some(({type:G,player:I})=>G==="item-buy"&&I.guid===N);return A&&!e}).length;return{player:E,value:n}}).filter(({value:E})=>E>0).sort((E,N)=>N.value-E.value),traitorRoundsFirstBlood:[...L].map(E=>({player:E,value:E.stats.roundsFirstBlood.traitor.length/(E.rounds.traitor.length||1)})).filter(({value:E})=>E>0).sort((E,N)=>N.value-E.value).map(({player:E,value:N})=>({player:E,value:(N*100).toFixed(1)+"%"})),traitorRoundsAced:[...L].map(E=>({player:E,value:E.stats.aces.traitor.length})).filter(({value:E})=>E>0).sort((E,N)=>N.value-E.value),radarsBoughtPct:[...L].filter(E=>E.stats.items.traitor.length>0).map(E=>{var R;const N=E.stats.items.traitor,n=((R=N.find(({name:A})=>A==="RADAR"))==null?void 0:R.count)||0,_=N.reduce((A,{count:e})=>A+e,0);return{player:E,value:n/(_||1)}}).sort((E,N)=>N.value-E.value).map(({player:E,value:N})=>({player:E,value:(N*100).toFixed(1)+"%"})),chatMessages:[...L].filter(E=>E.stats.chatMessages.any.length>0).sort((E,N)=>N.stats.chatMessages.any.length-E.stats.chatMessages.any.length).map(E=>({player:E,value:E.stats.chatMessages.any.length}))}}function HE(L){return L==="traitor"?"traitor":"innocent"}function _n(L){const E=L.reduce((N,n)=>{const _={playtime:N.playtime+n.outcome.roundLength,wins:N.wins};_.wins[n.outcome.winner]||(_.wins[n.outcome.winner]={});const R=_.wins[n.outcome.winner];return R[n.outcome.reason]=(R[n.outcome.reason]||0)+1,_},{playtime:0,wins:{}});return AE(X({rounds:L.length||0},E),{playtime:Math.floor(E.playtime)})}function Ln(L){var n;const E=L.flatMap(({events:_})=>_.filter(({type:R})=>R==="item-buy")),N=new Map;for(const _ of E)N.set(_.item,{count:(((n=N.get(_.item))==null?void 0:n.count)||0)+1,role:_.player.role});return[...N].map(([_,R])=>X({name:_},R)).sort((_,R)=>R.count-_.count)}function Rn(L,E){return L.findIndex(({players:N})=>N.findIndex(n=>n.guid===E)>-1)>-1}function An(L,E){return L.filter(({players:N})=>N.findIndex(n=>n.guid===E)>-1).map(N=>AE(X({},N),{player:N.players.find(n=>n.guid===E)}))}function en(L){return L.filter(({player:E,outcome:N})=>HE(E.role)===N.winner)}function Gn(L){return L.filter(({events:E,player:N})=>E.filter(({type:_})=>_==="death").findIndex(({victim:_})=>_.guid===N.guid)===-1)}function Sn(L){return L.filter(({events:E,player:N})=>E.filter(({type:_})=>_==="death").findIndex(({victim:_})=>_.guid===N.guid)===0)}function In(L){return L.filter(({events:E,player:N})=>{var _,R,A;const n=E.filter(({type:e})=>e==="death");return((R=(_=n[0])==null?void 0:_.attacker)==null?void 0:R.guid)===N.guid&&((A=n[0])==null?void 0:A.victim.guid)!==N.guid})}function tn(L){return L.reduce((E,{outcome:{roundLength:N}})=>E+N,0)}function fE(L){var n;const E=(n=L[0])==null?void 0:n.player.guid;return L.flatMap(({events:_})=>_.filter(({type:R})=>R==="death")).filter(({victim:_,attacker:R})=>R&&R.guid===E&&R.guid!==_.guid)}function Cn(L){var n;const E=(n=L[0])==null?void 0:n.player.guid;return L.flatMap(({events:_})=>_.filter(({type:R})=>R==="death")).filter(({victim:_})=>_.guid===E)}function an(L,E){return L.length/(E.length||1)}function Hn(L,E){const N=JE(L).length,n=L.length-N,_=E.length+N;return n/(_||1)}function rn(L){return L.filter(({means:E})=>["MOD_PISTOL_BULLET","MOD_RIFLE_BULLET","MOD_HEAD_SHOT"].includes(E))}function on(L){return L.filter(({means:N})=>N==="MOD_HEAD_SHOT").length/(L.length||1)}function JE(L){return L.filter(({victim:E,attacker:N})=>E&&HE(E.role)===HE(N.role))}function Fn(L){return L.filter(({victim:E,attacker:N})=>!N||E.guid===N.guid)}function Pn(L){return L.filter(({means:E})=>["MOD_EXPLOSIVE","MOD_GRENADE_SPLASH","MOD_PROJECTILE_SPLASH","MOD_PROJECTILE"].includes(E))}function sn(L){return L.filter(({weapon:E})=>["barrel_mp","destructible_car"].includes(E))}function ln(L){const E=5;return L.flatMap(N=>fE([N]).reduce((_,R,A,{[A-1]:e,[A+1]:G})=>{const I=_[_.length-1];return e&&R.time-E<=e.time?(I.includes(e)||I.push(e),I.push(R)):G&&(!I||I.length>0)&&_.push([]),_},[])).filter(N=>N.length>0)}function Mn(L){return L.filter(E=>{const N=fE([E]),n=E.players.filter(({role:_})=>HE(_)!==HE(E.player.role));return N.length===n.length})}function Tn(L){var N;const E=new Map;for(const n of L)E.set(n.weapon,{kills:(((N=E.get(n.weapon))==null?void 0:N.kills)||0)+1});return[...E].map(([n,_])=>X({name:n},_)).sort((n,_)=>_.kills-n.kills)}function On(L,E){var _;const N=L.flatMap(({events:R})=>R.filter(({type:A,player:e})=>A==="item-buy"&&e.guid===E)),n=new Map;for(const R of N)n.set(R.item,{count:(((_=n.get(R.item))==null?void 0:_.count)||0)+1,role:R.player.role});return[...n].map(([R,A])=>X({name:R},A)).sort((R,A)=>A.count-R.count)}function mn(L){var n;const E=(n=L[0])==null?void 0:n.player.guid;return L.flatMap(({events:_})=>_.filter(({type:R})=>R==="say")).filter(_=>_.player.guid===E&&_.messageType==="chat")}function Un(L){const E=DN({basename:L});let N=[];return E.listen(n=>{E.action==="POP"&&N.forEach(_=>_(n))}),{get location(){return E.location},addEventListener(n,_){n==="popstate"&&N.push(_)},removeEventListener(n,_){n==="popstate"&&(N=N.filter(R=>R!==_))},history:{get state(){return E.location.state},pushState(n,_,R){E.push(R,n)},replaceState(n,_,R){E.replace(R,n)},go(n){E.go(n)}}}}function cn(L){let E,N;const n=L[1].default,_=UE(n,L,L[0],null);return{c(){E=o("div"),_&&_.c(),i(E,"class","svelte-15li9q4")},m(R,A){s(R,E,A),_&&_.m(E,null),N=!0},p(R,[A]){_&&_.p&&(!N||A&1)&&cE(_,n,R,R[0],N?dE(n,R[0],A,null):DE(R[0]),null)},i(R){N||(T(_,R),N=!0)},o(R){O(_,R),N=!1},d(R){R&&l(E),_&&_.d(R)}}}function Dn(L,E,N){let{$$slots:n={},$$scope:_}=E;return L.$$set=R=>{"$$scope"in R&&N(0,_=R.$$scope)},[_,n]}class jE extends B{constructor(E){super();y(this,E,Dn,cn,Y,{})}}function dn(L){let E;const N=L[2].default,n=UE(N,L,L[3],null);return{c(){n&&n.c()},m(_,R){n&&n.m(_,R),E=!0},p(_,R){n&&n.p&&(!E||R&8)&&cE(n,N,_,_[3],E?dE(N,_[3],R,null):DE(_[3]),null)},i(_){E||(T(n,_),E=!0)},o(_){O(n,_),E=!1},d(_){n&&n.d(_)}}}function un(L){let E,N;return E=new dN({props:{to:L[0],getProps:L[1],$$slots:{default:[dn]},$$scope:{ctx:L}}}),{c(){d(E.$$.fragment)},m(n,_){u(E,n,_),N=!0},p(n,[_]){const R={};_&1&&(R.to=n[0]),_&8&&(R.$$scope={dirty:_,ctx:n}),E.$set(R)},i(n){N||(T(E.$$.fragment,n),N=!0)},o(n){O(E.$$.fragment,n),N=!1},d(n){p(E,n)}}}function pn(L,E,N){let{$$slots:n={},$$scope:_}=E,{to:R}=E;function A({href:e,isPartiallyCurrent:G,isCurrent:I}){return{class:`${(e==="/"?I:G||I)?"active":""} ${E.class}`}}return L.$$set=e=>{N(4,E=uE(uE({},E),VE(e))),"to"in e&&N(0,R=e.to),"$$scope"in e&&N(3,_=e.$$scope)},E=VE(E),[R,A,n,_]}class TE extends B{constructor(E){super();y(this,E,pn,un,Y,{to:0})}}function hn(L){let E;return{c(){E=c("Overview")},m(N,n){s(N,E,n)},d(N){N&&l(E)}}}function gn(L){let E;return{c(){E=c("Player Stats")},m(N,n){s(N,E,n)},d(N){N&&l(E)}}}function fn(L){let E;return{c(){E=c("Leaderboards")},m(N,n){s(N,E,n)},d(N){N&&l(E)}}}function Wn(L){let E,N,n,_,R,A,e;return N=new TE({props:{to:"/",$$slots:{default:[hn]},$$scope:{ctx:L}}}),_=new TE({props:{to:"/players",$$slots:{default:[gn]},$$scope:{ctx:L}}}),A=new TE({props:{to:"/leaderboards",$$slots:{default:[fn]},$$scope:{ctx:L}}}),{c(){E=o("nav"),d(N.$$.fragment),n=M(),d(_.$$.fragment),R=M(),d(A.$$.fragment),i(E,"class","svelte-1o90zz8")},m(G,I){s(G,E,I),u(N,E,null),a(E,n),u(_,E,null),a(E,R),u(A,E,null),e=!0},p(G,[I]){const t={};I&1&&(t.$$scope={dirty:I,ctx:G}),N.$set(t);const S={};I&1&&(S.$$scope={dirty:I,ctx:G}),_.$set(S);const H={};I&1&&(H.$$scope={dirty:I,ctx:G}),A.$set(H)},i(G){e||(T(N.$$.fragment,G),T(_.$$.fragment,G),T(A.$$.fragment,G),e=!0)},o(G){O(N.$$.fragment,G),O(_.$$.fragment,G),O(A.$$.fragment,G),e=!1},d(G){G&&l(E),p(N),p(_),p(A)}}}class Kn extends B{constructor(E){super();y(this,E,null,Wn,Y,{})}}function Bn(L){let E,N,n,_,R,A,e,G,I,t,S,H,C,r,F,m,U,P,h,w,GE,g,NE,$,k,nE,J,b,D,K,SE,v,_E,LE,IE,KE,j,rE,BE,oE,yE,iE,YE,FE,mE,kE;return{c(){E=o("div"),N=o("h2"),N.textContent="Filters",n=M(),_=o("div"),R=o("div"),A=o("h3"),A.textContent="\u{1F465} Playercount",e=M(),G=o("div"),I=o("label"),I.textContent="min",t=M(),S=o("input"),C=M(),r=o("label"),r.textContent="max",F=M(),m=o("input"),P=M(),h=o("div"),w=o("h3"),w.textContent="\u{1F4C5} Date",GE=M(),g=o("div"),NE=o("label"),NE.textContent="between",$=M(),k=o("input"),J=M(),b=o("button"),b.textContent="\u274C",D=M(),K=o("label"),K.textContent="and",SE=M(),v=o("input"),LE=M(),IE=o("button"),IE.textContent="\u274C",KE=M(),j=o("div"),rE=o("button"),rE.textContent="all time",BE=M(),oE=o("button"),oE.textContent="last 3 months",yE=M(),iE=o("button"),iE.textContent="Yesterday",YE=M(),FE=o("button"),FE.textContent="Today",i(I,"for","filter-min-players"),i(S,"id","filter-min-players"),i(S,"type","number"),i(S,"min","1"),i(S,"max","18"),S.value=H=L[0].players.min,pE(S,"width","calc(2ch + 32px)"),i(r,"for","filter-max-players"),i(m,"id","filter-max-players"),i(m,"type","number"),i(m,"min","1"),i(m,"max","18"),m.value=U=L[0].players.max,pE(m,"width","calc(2ch + 32px)"),i(G,"class","row"),i(R,"class","filter svelte-14ocuen"),i(NE,"for","filter-min-date"),i(k,"id","filter-min-date"),i(k,"type","date"),k.required=!0,i(k,"max",L[4]),k.value=nE=L[1].min,i(b,"aria-label","Remove minimum date"),i(K,"for","filter-max-date"),i(v,"id","filter-max-date"),i(v,"type","date"),v.required=!0,i(v,"max",L[4]),v.value=_E=L[1].max,i(IE,"aria-label","Remove maximum date"),i(g,"class","row svelte-14ocuen"),i(j,"class","row svelte-14ocuen"),i(h,"class","filter svelte-14ocuen"),i(_,"class","filter-groups svelte-14ocuen"),i(E,"class","filters svelte-14ocuen")},m(q,RE){s(q,E,RE),a(E,N),a(E,n),a(E,_),a(_,R),a(R,A),a(R,e),a(R,G),a(G,I),a(G,t),a(G,S),a(G,C),a(G,r),a(G,F),a(G,m),a(_,P),a(_,h),a(h,w),a(h,GE),a(h,g),a(g,NE),a(g,$),a(g,k),a(g,J),a(g,b),a(g,D),a(g,K),a(g,SE),a(g,v),a(g,LE),a(g,IE),a(h,KE),a(h,j),a(j,rE),a(j,BE),a(j,oE),a(j,yE),a(j,iE),a(j,YE),a(j,FE),mE||(kE=[V(S,"input",L[5]),V(m,"input",L[6]),V(k,"input",L[7]),V(b,"click",L[8]),V(v,"input",L[9]),V(IE,"click",L[10]),V(rE,"click",L[11]),V(oE,"click",L[12]),V(iE,"click",L[13]),V(FE,"click",L[14])],mE=!0)},p(q,[RE]){RE&1&&H!==(H=q[0].players.min)&&(S.value=H),RE&1&&U!==(U=q[0].players.max)&&(m.value=U),RE&2&&nE!==(nE=q[1].min)&&(k.value=nE),RE&2&&_E!==(_E=q[1].max)&&(v.value=_E)},i:W,o:W,d(q){q&&l(E),mE=!1,uN(kE)}}}function yn(L){return[String(L.getFullYear()),String(L.getMonth()+1).padStart(2,"0"),String(L.getDate()).padStart(2,"0")].join("-")}function Yn(L,E,N){let n;function _(P,h){h&&P==="min"?h.setUTCHours(0,0,0,0):h&&P==="max"&&h.setUTCHours(23,59,59,999),N(0,e.date[P]=h,e)}const R=new Date,A=yn(R);let{filters:e={players:{min:6,max:18},date:{min:null,max:R}}}=E;const G=({target:{value:P}})=>{N(0,e.players.min=Number(P),e),N(0,e.players.max=Math.max(e.players.min,e.players.max),e)},I=({target:{value:P}})=>{N(0,e.players.max=Number(P),e),N(0,e.players.min=Math.min(e.players.max,e.players.min),e)},t=({target:{value:P}})=>{_("min",new Date(P)),P&&e.date.max!==null&&_("max",new Date(Math.max(e.date.min,e.date.max)))},S=()=>_("min",null),H=({target:{value:P}})=>{_("max",new Date(P)),P&&e.date.min!==null&&_("min",new Date(Math.min(e.date.max,e.date.min)))},C=()=>_("max",R),r=()=>{_("min",null),_("max",new Date)},F=()=>{const P=new Date;P.setMonth(P.getMonth()-3),_("min",P),_("max",new Date)},m=()=>{const P=new Date;P.setDate(P.getDate()-1),_("min",P),_("max",new Date(P))},U=()=>{_("min",new Date),_("max",new Date)};return L.$$set=P=>{"filters"in P&&N(0,e=P.filters)},L.$$.update=()=>{L.$$.dirty&1&&N(1,n={min:e.date.min&&e.date.min.toISOString().split("T")[0],max:e.date.max&&e.date.max.toISOString().split("T")[0]})},[e,n,_,R,A,G,I,t,S,H,C,r,F,m,U]}class kn extends B{constructor(E){super();y(this,E,Yn,Bn,Y,{filters:0})}}function QE(L,E,N){const n=L.slice();return n[5]=E[N].key,n[6]=E[N].value,n}function $E(L){let E,N,n=L[5]+"",_,R,A,e=L[6]+"",G,I;return{c(){E=o("tr"),N=o("th"),_=c(n),R=M(),A=o("td"),G=c(e),I=M(),i(N,"scope","row"),i(N,"class","svelte-1gcm33n"),i(A,"class","svelte-1gcm33n")},m(t,S){s(t,E,S),a(E,N),a(N,_),a(E,R),a(E,A),a(A,G),a(E,I)},p(t,S){S&2&&n!==(n=t[5]+"")&&f(_,n),S&2&&e!==(e=t[6]+"")&&f(G,e)},d(t){t&&l(E)}}}function bn(L){let E,N,n,_,R,A,e,G=L[1],I=[];for(let t=0;t<G.length;t+=1)I[t]=$E(QE(L,G,t));return{c(){E=o("h2"),E.textContent="Rounds",N=M(),n=o("div"),_=o("div"),R=o("canvas"),A=M(),e=o("table");for(let t=0;t<I.length;t+=1)I[t].c();i(_,"class","chart svelte-1gcm33n"),i(e,"class","svelte-1gcm33n"),i(n,"class","rounds svelte-1gcm33n")},m(t,S){s(t,E,S),s(t,N,S),s(t,n,S),a(n,_),a(_,R),L[4](R),a(n,A),a(n,e);for(let H=0;H<I.length;H+=1)I[H].m(e,null)},p(t,[S]){if(S&2){G=t[1];let H;for(H=0;H<G.length;H+=1){const C=QE(t,G,H);I[H]?I[H].p(C,S):(I[H]=$E(C),I[H].c(),I[H].m(e,null))}for(;H<I.length;H+=1)I[H].d(1);I.length=G.length}},i:W,o:W,d(t){t&&l(E),t&&l(N),t&&l(n),L[4](null),Q(I,t)}}}function vn(L,E,N){let n,{totals:_}=E,R,A;tE(()=>{N(3,A=new EE(R,{type:"pie",plugins:[hE],options:{backgroundColor:["rgba(75, 192, 120, 0.2)","rgba(213, 194, 43, 0.2)","rgba(255, 99, 132, 0.2)"],borderColor:["rgb(75, 192, 120)","rgb(213, 194, 43)","rgb(255, 99, 132)"],borderWidth:2,plugins:{datalabels:{formatter(G){return(G/_.rounds*100).toFixed()+"%"}}}},data:{labels:["Innocent (death)","Innocent (timelimit)","Traitors (death)"],datasets:[{data:[]}]}}))});function e(G){eE[G?"unshift":"push"](()=>{R=G,N(0,R)})}return L.$$set=G=>{"totals"in G&&N(2,_=G.totals)},L.$$.update=()=>{var G,I,t,S,H,C;L.$$.dirty&4&&N(1,n=[{key:"Rounds played",value:_.rounds},{key:"Average round length",value:xE(_.playtime/_.rounds)},{key:"Innocent Wins",value:(Object.values(_.wins.innocent||{none:0}).reduce((r,F)=>r+F)/_.rounds*100).toFixed()+"%"},{key:"Traitor Wins",value:(Object.values(_.wins.traitor||{none:0}).reduce((r,F)=>r+F)/_.rounds*100).toFixed()+"%"}]),L.$$.dirty&12&&A&&(N(3,A.data.datasets[0].data=[((I=(G=_.wins)==null?void 0:G.innocent)==null?void 0:I.death)||0,((S=(t=_.wins)==null?void 0:t.innocent)==null?void 0:S.timelimit)||0,((C=(H=_.wins)==null?void 0:H.traitor)==null?void 0:C.death)||0],A),A.update())},[R,n,_,A,e]}class Vn extends B{constructor(E){super();y(this,E,vn,bn,Y,{totals:2})}}function zE(L,E,N){const n=L.slice();return n[8]=E[N],n}function ZE(L){let E,N=L[8].charAt(0).toUpperCase()+L[8].slice(1)+"",n,_,R,A,e;function G(){return L[6](L[8])}return{c(){E=o("button"),n=c(N),_=M(),i(E,"style",R=`--col-btn-bg: ${L[3][L[8]][0]};--col-btn-bg-hover: ${L[3][L[8]][1]};`),i(E,"class","svelte-1salme1"),PE(E,"active",L[0]===L[8])},m(I,t){s(I,E,t),a(E,n),a(E,_),A||(e=V(E,"click",G),A=!0)},p(I,t){L=I,t&5&&PE(E,"active",L[0]===L[8])},d(I){I&&l(E),A=!1,e()}}}function wn(L){let E,N,n,_,R,A,e=L[2],G=[];for(let I=0;I<e.length;I+=1)G[I]=ZE(zE(L,e,I));return{c(){E=o("h2"),E.textContent="Items",N=M(),n=o("div");for(let I=0;I<G.length;I+=1)G[I].c();_=M(),R=o("div"),A=o("canvas"),i(n,"class","item-select-role svelte-1salme1"),i(n,"aria-label","Select role"),i(R,"class","chart svelte-1salme1")},m(I,t){s(I,E,t),s(I,N,t),s(I,n,t);for(let S=0;S<G.length;S+=1)G[S].m(n,null);s(I,_,t),s(I,R,t),a(R,A),L[7](A)},p(I,[t]){if(t&13){e=I[2];let S;for(S=0;S<e.length;S+=1){const H=zE(I,e,S);G[S]?G[S].p(H,t):(G[S]=ZE(H),G[S].c(),G[S].m(n,null))}for(;S<G.length;S+=1)G[S].d(1);G.length=e.length}},i:W,o:W,d(I){I&&l(E),I&&l(N),I&&l(n),Q(G,I),I&&l(_),I&&l(R),L[7](null)}}}function Xn(L,E,N){let{items:n}=E,_,R;const A=["traitor","detective"];let e=A[0];const G={traitor:["255, 99, 132","191, 74, 99"],detective:["54, 162, 235","39, 118, 170"]};tE(()=>{N(5,R=new EE(_,{type:"bar",options:{aspectRatio:3,indexAxis:"y",borderWidth:1.5,plugins:{legend:{display:!1}}},data:{datasets:[{data:[],label:"Times bought",parsing:{yAxisKey:"name",xAxisKey:"count"}}]}}))});const I=S=>N(0,e=S);function t(S){eE[S?"unshift":"push"](()=>{_=S,N(1,_)})}return L.$$set=S=>{"items"in S&&N(4,n=S.items)},L.$$.update=()=>{L.$$.dirty&49&&R&&e&&(N(5,R.data.labels=[],R),N(5,R.data.datasets[0].data=n[e],R),N(5,R.options.backgroundColor=G[e].map(S=>`rgba(${S}, 0.2)`),R),N(5,R.options.borderColor=G[e].map(S=>`rgb(${S})`),R),R.update())},[e,_,A,G,n,R,I,t]}class xn extends B{constructor(E){super();y(this,E,Xn,wn,Y,{items:4})}}function Jn(L){let E,N,n,_,R;return N=new Vn({props:{totals:L[0].totals}}),_=new xn({props:{items:ME("role",L[0].items)}}),{c(){E=o("section"),d(N.$$.fragment),n=M(),d(_.$$.fragment),i(E,"class","overview svelte-1qjeaz7")},m(A,e){s(A,E,e),u(N,E,null),a(E,n),u(_,E,null),R=!0},p(A,[e]){const G={};e&1&&(G.totals=A[0].totals),N.$set(G);const I={};e&1&&(I.items=ME("role",A[0].items)),_.$set(I)},i(A){R||(T(N.$$.fragment,A),T(_.$$.fragment,A),R=!0)},o(A){O(N.$$.fragment,A),O(_.$$.fragment,A),R=!1},d(A){A&&l(E),p(N),p(_)}}}function jn(L,E,N){let{evalData:n}=E;return L.$$set=_=>{"evalData"in _&&N(0,n=_.evalData)},[n]}class Qn extends B{constructor(E){super();y(this,E,jn,Jn,Y,{evalData:0})}}function $n(L){let E,N,n,_;const R=L[2].default,A=UE(R,L,L[1],null);return{c(){E=o("div"),A&&A.c(),N=M(),n=o("span"),i(n,"class","tooltip svelte-15p278t"),i(E,"class","tooltip-parent svelte-15p278t"),i(E,"tabindex","0")},m(e,G){s(e,E,G),A&&A.m(E,null),a(E,N),a(E,n),n.innerHTML=L[0],_=!0},p(e,[G]){A&&A.p&&(!_||G&2)&&cE(A,R,e,e[1],_?dE(R,e[1],G,null):DE(e[1]),null),(!_||G&1)&&(n.innerHTML=e[0])},i(e){_||(T(A,e),_=!0)},o(e){O(A,e),_=!1},d(e){e&&l(E),A&&A.d(e)}}}function zn(L,E,N){let{$$slots:n={},$$scope:_}=E,{text:R}=E;return L.$$set=A=>{"text"in A&&N(0,R=A.text),"$$scope"in A&&N(1,_=A.$$scope)},[R,_,n]}class qE extends B{constructor(E){super();y(this,E,zn,$n,Y,{text:0})}}function EN(L,E,N){const n=L.slice();return n[2]=E[N].key,n[3]=E[N].row,n[4]=E[N].tooltip,n}function NN(L,E,N){const n=L.slice();return n[7]=E[N],n}function Zn(L){let E=L[2]+"",N;return{c(){N=c(E)},m(n,_){s(n,N,_)},p(n,_){_&1&&E!==(E=n[2]+"")&&f(N,E)},i:W,o:W,d(n){n&&l(N)}}}function qn(L){let E,N;return E=new qE({props:{text:L[4],$$slots:{default:[E_]},$$scope:{ctx:L}}}),{c(){d(E.$$.fragment)},m(n,_){u(E,n,_),N=!0},p(n,_){const R={};_&1&&(R.text=n[4]),_&1025&&(R.$$scope={dirty:_,ctx:n}),E.$set(R)},i(n){N||(T(E.$$.fragment,n),N=!0)},o(n){O(E.$$.fragment,n),N=!1},d(n){p(E,n)}}}function E_(L){let E=L[2]+"",N;return{c(){N=c(E)},m(n,_){s(n,N,_)},p(n,_){_&1&&E!==(E=n[2]+"")&&f(N,E)},d(n){n&&l(N)}}}function nN(L){let E,N=L[7]+"",n;return{c(){E=o("td"),n=c(N),i(E,"class","svelte-1my070a")},m(_,R){s(_,E,R),a(E,n)},p(_,R){R&1&&N!==(N=_[7]+"")&&f(n,N)},d(_){_&&l(E)}}}function _N(L){let E,N,n,_,R,A,e;const G=[qn,Zn],I=[];function t(C,r){return C[4]?0:1}n=t(L),_=I[n]=G[n](L);let S=L[3],H=[];for(let C=0;C<S.length;C+=1)H[C]=nN(NN(L,S,C));return{c(){E=o("tr"),N=o("th"),_.c(),R=M();for(let C=0;C<H.length;C+=1)H[C].c();A=M(),i(N,"scope","row"),i(N,"class","svelte-1my070a")},m(C,r){s(C,E,r),a(E,N),I[n].m(N,null),a(E,R);for(let F=0;F<H.length;F+=1)H[F].m(E,null);a(E,A),e=!0},p(C,r){let F=n;if(n=t(C),n===F?I[n].p(C,r):(z(),O(I[F],1,1,()=>{I[F]=null}),Z(),_=I[n],_?_.p(C,r):(_=I[n]=G[n](C),_.c()),T(_,1),_.m(N,null)),r&1){S=C[3];let m;for(m=0;m<S.length;m+=1){const U=NN(C,S,m);H[m]?H[m].p(U,r):(H[m]=nN(U),H[m].c(),H[m].m(E,A))}for(;m<H.length;m+=1)H[m].d(1);H.length=S.length}},i(C){e||(T(_),e=!0)},o(C){O(_),e=!1},d(C){C&&l(E),I[n].d(),Q(H,C)}}}function N_(L){let E,N,n,_,R,A=L[0],e=[];for(let I=0;I<A.length;I+=1)e[I]=_N(EN(L,A,I));const G=I=>O(e[I],1,1,()=>{e[I]=null});return{c(){E=o("table"),N=o("thead"),N.innerHTML=`<tr><th scope="col" class="svelte-1my070a"></th> 
			<th scope="col" class="svelte-1my070a"><span class="i svelte-1my070a" aria-label="Innocent"></span></th> 
			<th scope="col" class="svelte-1my070a"><span class="t svelte-1my070a" aria-label="Traitor"></span></th> 
			<th scope="col" class="svelte-1my070a"><span class="d svelte-1my070a" aria-label="Detective"></span></th> 
			<th scope="col" class="svelte-1my070a"><span class="i svelte-1my070a" aria-label="Innocent"></span><span class="d svelte-1my070a" aria-label="Detective"></span></th> 
			<th scope="col" class="svelte-1my070a">Total</th></tr>`,n=M(),_=o("tbody");for(let I=0;I<e.length;I+=1)e[I].c();i(E,"class","svelte-1my070a")},m(I,t){s(I,E,t),a(E,N),a(E,n),a(E,_);for(let S=0;S<e.length;S+=1)e[S].m(_,null);R=!0},p(I,[t]){if(t&1){A=I[0];let S;for(S=0;S<A.length;S+=1){const H=EN(I,A,S);e[S]?(e[S].p(H,t),T(e[S],1)):(e[S]=_N(H),e[S].c(),T(e[S],1),e[S].m(_,null))}for(z(),S=A.length;S<e.length;S+=1)G(S);Z()}},i(I){if(!R){for(let t=0;t<A.length;t+=1)T(e[t]);R=!0}},o(I){e=e.filter(Boolean);for(let t=0;t<e.length;t+=1)O(e[t]);R=!1},d(I){I&&l(E),Q(e,I)}}}function x(L){return[L.innocent,L.traitor,L.detective,L.innocentTeam,L.any]}function n_(L,E,N){let n,{player:_}=E;return L.$$set=R=>{"player"in R&&N(1,_=R.player)},L.$$.update=()=>{L.$$.dirty&2&&N(0,n=[{key:"Playtime",row:x(_.stats.playtime).map(R=>`${(R/60/60).toFixed(1)} h`)},{key:"Rounds played",row:x(_.rounds).map(R=>R.length)},{key:"Rounds won",row:x(Object.fromEntries(Object.keys(_.rounds).map(R=>[R,_.stats.roundsWon[R].length/(_.rounds[R].length||1)]))).map(R=>`${(R*100).toFixed()}%`)},{key:"Rounds survived",row:x(Object.fromEntries(Object.keys(_.rounds).map(R=>[R,_.stats.roundsSurvived[R].length/(_.rounds[R].length||1)]))).map(R=>`${(R*100).toFixed()}%`)},{key:"Rounds died first",row:x(Object.fromEntries(Object.keys(_.rounds).map(R=>[R,_.stats.roundsDiedFirst[R].length/(_.rounds[R].length||1)]))).map(R=>`${(R*100).toFixed()}%`)},{key:"Kills",row:x(_.stats.kills).map(R=>R.length)},{key:"Deaths",row:x(_.stats.deaths).map(R=>R.length)},{key:"K/D Ratio",row:x(_.stats.kdr).map(R=>R.toFixed(2))},{key:"Adjusted KDR",row:x(_.stats.kdrAdjusted).map(R=>R.toFixed(2)),tooltip:"Friendly-fire kills instead count as deaths"},{key:"Headshot Kills",row:x(_.stats.headshotPct).map(R=>`${(R*100).toFixed()}%`)},{key:"Team Kills",row:x(Object.fromEntries(Object.keys(_.stats.kills).map(R=>[R,_.stats.teamKills[R].length/(_.stats.kills[R].length||1)]))).map(R=>`${(R*100).toFixed(1)}%`)}])},[n,_]}class __ extends B{constructor(E){super();y(this,E,n_,N_,Y,{player:1})}}var LN={aa12_eotech_fmj_mp:"WEAPON_AA12_BLING",aa12_eotech_grip_mp:"WEAPON_AA12_BLING",aa12_eotech_mp:"WEAPON_AA12_EOTECH",aa12_eotech_silencer_mp:"WEAPON_AA12_BLING",aa12_eotech_xmags_mp:"WEAPON_AA12_BLING",aa12_fmj_grip_mp:"WEAPON_AA12_BLING",aa12_fmj_mp:"WEAPON_AA12_FMJ",aa12_fmj_reflex_mp:"WEAPON_AA12_BLING",aa12_fmj_silencer_mp:"WEAPON_AA12_BLING",aa12_fmj_xmags_mp:"WEAPON_AA12_BLING",aa12_grip_mp:"WEAPON_AA12_GRIP",aa12_grip_reflex_mp:"WEAPON_AA12_BLING",aa12_grip_silencer_mp:"WEAPON_AA12_BLING",aa12_grip_xmags_mp:"WEAPON_AA12_BLING",aa12_mp:"WEAPON_AA12",aa12_reflex_mp:"WEAPON_AA12_REDDOT",aa12_reflex_silencer_mp:"WEAPON_AA12_BLING",aa12_reflex_xmags_mp:"WEAPON_AA12_BLING",aa12_silencer_mp:"WEAPON_AA12_SILENCER",aa12_silencer_xmags_mp:"WEAPON_AA12_BLING",aa12_xmags_mp:"WEAPON_AA12_XMAGS",airdrop_marker_mp:"WEAPON_AIRDROP_MARKER",airdrop_mega_marker_mp:"WEAPON_AIRDROP_MEGA_MARKER",airdrop_sentry_marker_mp:"WEAPON_AIRDROP_SENTRY_MARKER",ak47_acog_fmj_mp:"WEAPON_AK47_BLING",ak47_acog_gl_mp:"WEAPON_AK47_BLING",ak47_acog_heartbeat_mp:"WEAPON_AK47_BLING",ak47_acog_mp:"WEAPON_AK47_ACOG",ak47_acog_shotgun_mp:"WEAPON_AK47_BLING",ak47_acog_silencer_mp:"WEAPON_AK47_BLING",ak47_acog_xmags_mp:"WEAPON_AK47_BLING",ak47_eotech_fmj_mp:"WEAPON_AK47_BLING",ak47_eotech_gl_mp:"WEAPON_AK47_BLING",ak47_eotech_heartbeat_mp:"WEAPON_AK47_BLING",ak47_eotech_mp:"WEAPON_AK47_EOTECH",ak47_eotech_shotgun_mp:"WEAPON_AK47_BLING",ak47_eotech_silencer_mp:"WEAPON_AK47_BLING",ak47_eotech_xmags_mp:"WEAPON_AK47_BLING",ak47_fmj_gl_mp:"WEAPON_AK47_BLING",ak47_fmj_heartbeat_mp:"WEAPON_AK47_BLING",ak47_fmj_mp:"WEAPON_AK47_FMJ",ak47_fmj_reflex_mp:"WEAPON_AK47_BLING",ak47_fmj_shotgun_mp:"WEAPON_AK47_BLING",ak47_fmj_silencer_mp:"WEAPON_AK47_BLING",ak47_fmj_thermal_mp:"WEAPON_AK47_BLING",ak47_fmj_xmags_mp:"WEAPON_AK47_BLING",ak47_gl_heartbeat_mp:"WEAPON_AK47_BLING",ak47_gl_mp:"WEAPON_AK47_GP25",ak47_gl_reflex_mp:"WEAPON_AK47_BLING",ak47_gl_silencer_mp:"WEAPON_AK47_BLING",ak47_gl_thermal_mp:"WEAPON_AK47_BLING",ak47_gl_xmags_mp:"WEAPON_AK47_BLING",ak47_heartbeat_mp:"WEAPON_AK47_HEARTBEAT",ak47_heartbeat_reflex_mp:"WEAPON_AK47_BLING",ak47_heartbeat_shotgun_mp:"WEAPON_AK47_BLING",ak47_heartbeat_silencer_mp:"WEAPON_AK47_BLING",ak47_heartbeat_thermal_mp:"WEAPON_AK47_BLING",ak47_heartbeat_xmags_mp:"WEAPON_AK47_BLING",ak47_mp:"WEAPON_AK47",ak47_reflex_mp:"WEAPON_AK47_REDDOT",ak47_reflex_shotgun_mp:"WEAPON_AK47_BLING",ak47_reflex_silencer_mp:"WEAPON_AK47_BLING",ak47_reflex_xmags_mp:"WEAPON_AK47_BLING",ak47_shotgun_attach_mp:"WEAPON_AK47_SHOTGUN",ak47_shotgun_mp:"WEAPON_AK47_SHOTGUN",ak47_shotgun_silencer_mp:"WEAPON_AK47_BLING",ak47_shotgun_thermal_mp:"WEAPON_AK47_BLING",ak47_shotgun_xmags_mp:"WEAPON_AK47_BLING",ak47_silencer_mp:"WEAPON_AK47_SILENCER",ak47_silencer_thermal_mp:"WEAPON_AK47_BLING",ak47_silencer_xmags_mp:"WEAPON_AK47_BLING",ak47_thermal_mp:"WEAPON_AK47_THERMAL",ak47_thermal_xmags_mp:"WEAPON_AK47_BLING",ak47_xmags_mp:"WEAPON_AK47_XMAGS",ak47classic_acog_fmj_mp:"WEAPON_AK47_CLASSIC_BLING",ak47classic_acog_gl_mp:"WEAPON_AK47_BLING_CLASSIC",ak47classic_acog_mp:"WEAPON_AK47_CLASSIC_ACOG",ak47classic_acog_silencer_mp:"WEAPON_AK47_CLASSIC_BLING",ak47classic_acog_xmags_mp:"WEAPON_AK47_CLASSIC_BLING",ak47classic_fmj_gl_mp:"WEAPON_AK47_CLASSIC_BLING",ak47classic_fmj_mp:"WEAPON_AK47_CLASSIC_FMJ",ak47classic_fmj_reflex_mp:"WEAPON_AK47_CLASSIC_BLING",ak47classic_fmj_silencer_mp:"WEAPON_AK47_CLASSIC_BLING",ak47classic_fmj_xmags_mp:"WEAPON_AK47_CLASSIC_BLING",ak47classic_gl_mp:"WEAPON_AK47_CLASSIC_GP25",ak47classic_gl_reflex_mp:"WEAPON_AK47_CLASSIC_BLING",ak47classic_gl_silencer_mp:"WEAPON_AK47_CLASSIC_BLING",ak47classic_gl_xmags_mp:"WEAPON_AK47_CLASSIC_BLING",ak47classic_mp:"WEAPON_AK47_CLASSIC",ak47classic_reflex_mp:"WEAPON_AK47_CLASSIC_REDDOT",ak47classic_reflex_silencer_mp:"WEAPON_AK47_CLASSIC_BLING",ak47classic_reflex_xmags_mp:"WEAPON_AK47_CLASSIC_BLING",ak47classic_silencer_mp:"WEAPON_AK47_CLASSIC_SILENCER",ak47classic_silencer_xmags_mp:"WEAPON_AK47_CLASSIC_BLING",ak47classic_xmags_mp:"WEAPON_AK47_CLASSIC_XMAGS",ak74u_acog_mp:"WEAPON_AK74U_ACOG",ak74u_acog_xmags_mp:"WEAPON_AK74U_ACOG",ak74u_mp:"WEAPON_AK74U",ak74u_xmags_mp:"WEAPON_AK74U_EXTENDED_MAGS",artillery_mp:"WEAPON_CLAYMORE",at4_mp:"WEAPON_AT4_LOCKAIR",aug_acog_fmj_mp:"WEAPON_AUG_BLING",aug_acog_grip_mp:"WEAPON_AUG_BLING",aug_acog_heartbeat_mp:"WEAPON_AUG_BLING",aug_acog_mp:"WEAPON_AUG_ACOG",aug_acog_silencer_mp:"WEAPON_AUG_BLING",aug_acog_xmags_mp:"WEAPON_AUG_BLING",aug_eotech_fmj_mp:"WEAPON_AUG_BLING",aug_eotech_grip_mp:"WEAPON_AUG_BLING",aug_eotech_heartbeat_mp:"WEAPON_AUG_BLING",aug_eotech_mp:"WEAPON_AUG_EOTECH",aug_eotech_silencer_mp:"WEAPON_AUG_BLING",aug_eotech_xmags_mp:"WEAPON_AUG_BLING",aug_fmj_grip_mp:"WEAPON_AUG_BLING",aug_fmj_heartbeat_mp:"WEAPON_AUG_BLING",aug_fmj_mp:"WEAPON_AUG_FMJ",aug_fmj_reflex_mp:"WEAPON_AUG_BLING",aug_fmj_silencer_mp:"WEAPON_AUG_BLING",aug_fmj_thermal_mp:"WEAPON_AUG_BLING",aug_fmj_xmags_mp:"WEAPON_AUG_BLING",aug_grip_heartbeat_mp:"WEAPON_AUG_BLING",aug_grip_mp:"WEAPON_AUG_GRIP",aug_grip_reflex_mp:"WEAPON_AUG_BLING",aug_grip_silencer_mp:"WEAPON_AUG_BLING",aug_grip_thermal_mp:"WEAPON_AUG_BLING",aug_grip_xmags_mp:"WEAPON_AUG_BLING",aug_heartbeat_mp:"WEAPON_AUG_HEARTBEAT",aug_heartbeat_reflex_mp:"WEAPON_AUG_BLING",aug_heartbeat_silencer_mp:"WEAPON_AUG_BLING",aug_heartbeat_thermal_mp:"WEAPON_AUG_BLING",aug_heartbeat_xmags_mp:"WEAPON_AUG_BLING",aug_mp:"WEAPON_AUG",aug_reflex_mp:"WEAPON_AUG_REFLEX",aug_reflex_silencer_mp:"WEAPON_AUG_BLING",aug_reflex_xmags_mp:"WEAPON_AUG_BLING",aug_silencer_mp:"WEAPON_AUG_SILENCER",aug_silencer_thermal_mp:"WEAPON_AUG_BLING",aug_silencer_xmags_mp:"WEAPON_AUG_BLING",aug_thermal_mp:"WEAPON_AUG_THERMAL",aug_thermal_xmags_mp:"WEAPON_AUG_BLING",aug_xmags_mp:"WEAPON_AUG_XMAGS",barrel_mp:"WEAPON_BARREL",barrett_acog_fmj_mp:"WEAPON_BARRETT_BLING",barrett_acog_heartbeat_mp:"WEAPON_BARRETT_BLING",barrett_acog_mp:"WEAPON_BARRETT_ACOG",barrett_acog_silencer_mp:"WEAPON_BARRETT_BLING",barrett_acog_xmags_mp:"WEAPON_BARRETT_BLING",barrett_fmj_heartbeat_mp:"WEAPON_BARRETT_BLING",barrett_fmj_mp:"WEAPON_BARRETT_FMJ",barrett_fmj_silencer_mp:"WEAPON_BARRETT_BLING",barrett_fmj_thermal_mp:"WEAPON_BARRETT_BLING",barrett_fmj_xmags_mp:"WEAPON_BARRETT_BLING",barrett_heartbeat_mp:"WEAPON_BARRETT_HEARTBEAT",barrett_heartbeat_silencer_mp:"WEAPON_BARRETT_BLING",barrett_heartbeat_thermal_mp:"WEAPON_BARRETT_BLING",barrett_heartbeat_xmags_mp:"WEAPON_BARRETT_BLING",barrett_mp:"WEAPON_BARRETT",barrett_silencer_mp:"WEAPON_BARRETT_SILENCER",barrett_silencer_thermal_mp:"WEAPON_BARRETT_BLING",barrett_silencer_xmags_mp:"WEAPON_BARRETT_BLING",barrett_thermal_mp:"WEAPON_BARRETT_THERMAL",barrett_thermal_xmags_mp:"WEAPON_BARRETT_BLING",barrett_xmags_mp:"WEAPON_BARRETT_XMAGS",beretta_akimbo_fmj_mp:"WEAPON_BERETTA_BLING",beretta_akimbo_mp:"WEAPON_BERETTA_AKIMBO",beretta_akimbo_silencer_mp:"WEAPON_BERETTA_BLING",beretta_akimbo_xmags_mp:"WEAPON_BERETTA_BLING",beretta_fmj_mp:"WEAPON_BERETTA_FMJ",beretta_fmj_silencer_mp:"WEAPON_BERETTA_BLING",beretta_fmj_tactical_mp:"WEAPON_BERETTA_BLING",beretta_fmj_xmags_mp:"WEAPON_BERETTA_BLING",beretta_mp:"WEAPON_BERETTA",beretta_silencer_mp:"WEAPON_BERETTA_SILENCER",beretta_silencer_tactical_mp:"WEAPON_BERETTA_BLING",beretta_silencer_xmags_mp:"WEAPON_BERETTA_BLING",beretta_tactical_mp:"WEAPON_BERETTA_TACTICAL",beretta_tactical_xmags_mp:"WEAPON_BERETTA_BLING",beretta_xmags_mp:"WEAPON_BERETTA_XMAGS",beretta393_akimbo_fmj_mp:"WEAPON_BERETTA393_BLING",beretta393_akimbo_mp:"WEAPON_BERETTA393_AKIMBO",beretta393_akimbo_silencer_mp:"WEAPON_BERETTA393_BLING",beretta393_akimbo_xmags_mp:"WEAPON_BERETTA393_BLING",beretta393_eotech_fmj_mp:"WEAPON_BERETTA393_BLING",beretta393_eotech_mp:"WEAPON_BERETTA393_EOTECH",beretta393_eotech_silencer_mp:"WEAPON_BERETTA393_BLING",beretta393_eotech_xmags_mp:"WEAPON_BERETTA393_BLING",beretta393_fmj_mp:"WEAPON_BERETTA393_FMJ",beretta393_fmj_reflex_mp:"WEAPON_BERETTA393_BLING",beretta393_fmj_silencer_mp:"WEAPON_BERETTA393_BLING",beretta393_fmj_xmags_mp:"WEAPON_BERETTA393_BLING",beretta393_mp:"WEAPON_BERETTA393",beretta393_reflex_mp:"WEAPON_BERETTA393_REDDOT",beretta393_reflex_silencer_mp:"WEAPON_BERETTA393_BLING",beretta393_reflex_xmags_mp:"WEAPON_BERETTA393_BLING",beretta393_silencer_mp:"WEAPON_BERETTA393_SILENCER",beretta393_silencer_xmags_mp:"WEAPON_BERETTA393_BLING",beretta393_xmags_mp:"WEAPON_BERETTA393_XMAGS",briefcase_bomb_mp:"WEAPON_BOMB",c4_mp:"WEAPON_C4",cheytac_acog_fmj_mp:"WEAPON_CHEYTAC_BLING",cheytac_acog_heartbeat_mp:"WEAPON_CHEYTAC_BLING",cheytac_acog_mp:"WEAPON_CHEYTAC_ACOG",cheytac_acog_silencer_mp:"WEAPON_CHEYTAC_BLING",cheytac_acog_xmags_mp:"WEAPON_CHEYTAC_BLING",cheytac_fmj_heartbeat_mp:"WEAPON_CHEYTAC_BLING",cheytac_fmj_mp:"WEAPON_CHEYTAC_FMJ",cheytac_fmj_silencer_mp:"WEAPON_CHEYTAC_BLING",cheytac_fmj_thermal_mp:"WEAPON_CHEYTAC_BLING",cheytac_fmj_xmags_mp:"WEAPON_CHEYTAC_BLING",cheytac_heartbeat_mp:"WEAPON_CHEYTAC_HEARTBEAT",cheytac_heartbeat_silencer_mp:"WEAPON_CHEYTAC_BLING",cheytac_heartbeat_thermal_mp:"WEAPON_CHEYTAC_BLING",cheytac_heartbeat_xmags_mp:"WEAPON_CHEYTAC_BLING",cheytac_mp:"WEAPON_CHEYTAC",cheytac_silencer_mp:"WEAPON_CHEYTAC_SILENCER",cheytac_silencer_thermal_mp:"WEAPON_CHEYTAC_BLING",cheytac_silencer_xmags_mp:"WEAPON_CHEYTAC_BLING",cheytac_thermal_mp:"WEAPON_CHEYTAC_THERMAL",cheytac_thermal_xmags_mp:"WEAPON_CHEYTAC_BLING",cheytac_xmags_mp:"WEAPON_CHEYTAC_XMAGS",claymore_mp:"WEAPON_CLAYMORE",cobra_20mm_mp:"WEAPON_HELICOPTER",coltanaconda_akimbo_fmj_mp:"WEAPON_ANACONDA_BLING",coltanaconda_akimbo_mp:"WEAPON_ANACONDA_AKIMBO",coltanaconda_fmj_mp:"WEAPON_ANACONDA_FMJ",coltanaconda_fmj_tactical_mp:"WEAPON_ANACONDA_BLING",coltanaconda_mp:"WEAPON_ANACONDA",coltanaconda_tactical_mp:"WEAPON_ANACONDA_TACTICAL",combat_knife_mp:"WEAPON_COMBAT_KNIFE",concussion_grenade_mp:"WEAPON_CONCUSSION_GRENADE",defaultweapon_mp:"WEAPON_DEFAULTWEAPON",deserteagle_akimbo_fmj_mp:"WEAPON_DESERTEAGLE_BLING",deserteagle_akimbo_mp:"WEAPON_DESERTEAGLE_AKIMBO",deserteagle_fmj_mp:"WEAPON_DESERTEAGLE_FMJ",deserteagle_fmj_tactical_mp:"WEAPON_DESERTEAGLE_BLING",deserteagle_mp:"WEAPON_DESERTEAGLE",deserteagle_tactical_mp:"WEAPON_DESERTEAGLE_TACTICAL",deserteaglegold_akimbo_fmj_mp:"WEAPON_DESERTEAGLEGOLD_BLING",deserteaglegold_akimbo_mp:"WEAPON_DESERTEAGLEGOLD_AKIMBO",deserteaglegold_fmj_mp:"WEAPON_DESERTEAGLEGOLD_FMJ",deserteaglegold_fmj_tactical_mp:"WEAPON_DESERTEAGLEGOLD_BLING",deserteaglegold_mp:"WEAPON_DESERTEAGLEGOLD",deserteaglegold_tactical_mp:"WEAPON_DESERTEAGLEGOLD_TACTICAL",destructible_car:"WEAPON_DESTRUCTIBLE_CAR",dragunov_mp:"WEAPON_DRAGUNOV",fal_acog_fmj_mp:"WEAPON_FAL_BLING",fal_acog_gl_mp:"WEAPON_FAL_BLING",fal_acog_heartbeat_mp:"WEAPON_FAL_BLING",fal_acog_mp:"WEAPON_FAL_ACOG",fal_acog_shotgun_mp:"WEAPON_FAL_BLING",fal_acog_silencer_mp:"WEAPON_FAL_BLING",fal_acog_xmags_mp:"WEAPON_FAL_BLING",fal_eotech_fmj_mp:"WEAPON_FAL_BLING",fal_eotech_gl_mp:"WEAPON_FAL_BLING",fal_eotech_heartbeat_mp:"WEAPON_FAL_BLING",fal_eotech_mp:"WEAPON_FAL_EOTECH",fal_eotech_shotgun_mp:"WEAPON_FAL_BLING",fal_eotech_silencer_mp:"WEAPON_FAL_BLING",fal_eotech_xmags_mp:"WEAPON_FAL_BLING",fal_fmj_gl_mp:"WEAPON_FAL_BLING",fal_fmj_heartbeat_mp:"WEAPON_FAL_BLING",fal_fmj_mp:"WEAPON_FAL_FMJ",fal_fmj_reflex_mp:"WEAPON_FAL_BLING",fal_fmj_shotgun_mp:"WEAPON_FAL_BLING",fal_fmj_silencer_mp:"WEAPON_FAL_BLING",fal_fmj_thermal_mp:"WEAPON_FAL_BLING",fal_fmj_xmags_mp:"WEAPON_FAL_BLING",fal_gl_heartbeat_mp:"WEAPON_FAL_BLING",fal_gl_mp:"WEAPON_FAL_GL",fal_gl_reflex_mp:"WEAPON_FAL_BLING",fal_gl_silencer_mp:"WEAPON_FAL_BLING",fal_gl_thermal_mp:"WEAPON_FAL_BLING",fal_gl_xmags_mp:"WEAPON_FAL_BLING",fal_heartbeat_mp:"WEAPON_FAL_HEARTBEAT",fal_heartbeat_reflex_mp:"WEAPON_FAL_BLING",fal_heartbeat_shotgun_mp:"WEAPON_FAL_BLING",fal_heartbeat_silencer_mp:"WEAPON_FAL_BLING",fal_heartbeat_thermal_mp:"WEAPON_FAL_BLING",fal_heartbeat_xmags_mp:"WEAPON_FAL_BLING",fal_mp:"WEAPON_FAL",fal_reflex_mp:"WEAPON_FAL_REDDOT",fal_reflex_shotgun_mp:"WEAPON_FAL_BLING",fal_reflex_silencer_mp:"WEAPON_FAL_BLING",fal_reflex_xmags_mp:"WEAPON_FAL_BLING",fal_shotgun_attach_mp:"WEAPON_FAL_SHOTGUN",fal_shotgun_mp:"WEAPON_FAL_SHOTGUN",fal_shotgun_silencer_mp:"WEAPON_FAL_BLING",fal_shotgun_thermal_mp:"WEAPON_FAL_BLING",fal_shotgun_xmags_mp:"WEAPON_FAL_BLING",fal_silencer_mp:"WEAPON_FAL_SILENCER",fal_silencer_thermal_mp:"WEAPON_FAL_BLING",fal_silencer_xmags_mp:"WEAPON_FAL_BLING",fal_thermal_mp:"WEAPON_FAL_THERMAL",fal_thermal_xmags_mp:"WEAPON_FAL_BLING",fal_xmags_mp:"WEAPON_FAL_XMAGS",famas_acog_fmj_mp:"WEAPON_FAMAS_BLING",famas_acog_gl_mp:"WEAPON_FAMAS_BLING",famas_acog_heartbeat_mp:"WEAPON_FAMAS_BLING",famas_acog_mp:"WEAPON_FAMAS_ACOG",famas_acog_shotgun_mp:"WEAPON_FAMAS_BLING",famas_acog_silencer_mp:"WEAPON_FAMAS_BLING",famas_acog_xmags_mp:"WEAPON_FAMAS_BLING",famas_eotech_fmj_mp:"WEAPON_FAMAS_BLING",famas_eotech_gl_mp:"WEAPON_FAMAS_BLING",famas_eotech_heartbeat_mp:"WEAPON_FAMAS_BLING",famas_eotech_mp:"WEAPON_FAMAS_EOTECH",famas_eotech_shotgun_mp:"WEAPON_FAMAS_BLING",famas_eotech_silencer_mp:"WEAPON_FAMAS_BLING",famas_eotech_xmags_mp:"WEAPON_FAMAS_BLING",famas_fmj_gl_mp:"WEAPON_FAMAS_BLING",famas_fmj_heartbeat_mp:"WEAPON_FAMAS_BLING",famas_fmj_mp:"WEAPON_FAMAS_FMJ",famas_fmj_reflex_mp:"WEAPON_FAMAS_BLING",famas_fmj_shotgun_mp:"WEAPON_FAMAS_BLING",famas_fmj_silencer_mp:"WEAPON_FAMAS_BLING",famas_fmj_thermal_mp:"WEAPON_FAMAS_BLING",famas_fmj_xmags_mp:"WEAPON_FAMAS_BLING",famas_gl_heartbeat_mp:"WEAPON_FAMAS_BLING",famas_gl_mp:"WEAPON_FAMAS_GL",famas_gl_reflex_mp:"WEAPON_FAMAS_BLING",famas_gl_silencer_mp:"WEAPON_FAMAS_BLING",famas_gl_thermal_mp:"WEAPON_FAMAS_BLING",famas_gl_xmags_mp:"WEAPON_FAMAS_BLING",famas_heartbeat_mp:"WEAPON_FAMAS_HEARTBEAT",famas_heartbeat_reflex_mp:"WEAPON_FAMAS_BLING",famas_heartbeat_shotgun_mp:"WEAPON_FAMAS_BLING",famas_heartbeat_silencer_mp:"WEAPON_FAMAS_BLING",famas_heartbeat_thermal_mp:"WEAPON_FAMAS_BLING",famas_heartbeat_xmags_mp:"WEAPON_FAMAS_BLING",famas_mp:"WEAPON_FAMAS",famas_reflex_mp:"WEAPON_FAMAS_REDDOT",famas_reflex_shotgun_mp:"WEAPON_FAMAS_BLING",famas_reflex_silencer_mp:"WEAPON_FAMAS_BLING",famas_reflex_xmags_mp:"WEAPON_FAMAS_BLING",famas_shotgun_attach_mp:"WEAPON_FAMAS_SHOTGUN",famas_shotgun_mp:"WEAPON_FAMAS_SHOTGUN",famas_shotgun_silencer_mp:"WEAPON_FAMAS_BLING",famas_shotgun_thermal_mp:"WEAPON_FAMAS_BLING",famas_shotgun_xmags_mp:"WEAPON_FAMAS_BLING",famas_silencer_mp:"WEAPON_FAMAS_SILENCER",famas_silencer_thermal_mp:"WEAPON_FAMAS_BLING",famas_silencer_xmags_mp:"WEAPON_FAMAS_BLING",famas_thermal_mp:"WEAPON_FAMAS_THERMAL",famas_thermal_xmags_mp:"WEAPON_FAMAS_BLING",famas_xmags_mp:"WEAPON_FAMAS_XMAGS",flare_mp:"WEAPON_FLARE",flash_grenade_mp:"WEAPON_FLASH_GRENADE",fn2000_acog_fmj_mp:"WEAPON_FN2000_BLING",fn2000_acog_gl_mp:"WEAPON_FN2000_BLING",fn2000_acog_heartbeat_mp:"WEAPON_FN2000_BLING",fn2000_acog_mp:"WEAPON_FN2000_ACOG",fn2000_acog_shotgun_mp:"WEAPON_FN2000_BLING",fn2000_acog_silencer_mp:"WEAPON_FN2000_BLING",fn2000_acog_xmags_mp:"WEAPON_FN2000_BLING",fn2000_eotech_fmj_mp:"WEAPON_FN2000_BLING",fn2000_eotech_gl_mp:"WEAPON_FN2000_BLING",fn2000_eotech_heartbeat_mp:"WEAPON_FN2000_BLING",fn2000_eotech_mp:"WEAPON_FN2000_EOTECH",fn2000_eotech_shotgun_mp:"WEAPON_FN2000_BLING",fn2000_eotech_silencer_mp:"WEAPON_FN2000_BLING",fn2000_eotech_xmags_mp:"WEAPON_FN2000_BLING",fn2000_fmj_gl_mp:"WEAPON_FN2000_BLING",fn2000_fmj_heartbeat_mp:"WEAPON_FN2000_BLING",fn2000_fmj_mp:"WEAPON_FN2000_FMJ",fn2000_fmj_reflex_mp:"WEAPON_FN2000_BLING",fn2000_fmj_shotgun_mp:"WEAPON_FN2000_BLING",fn2000_fmj_silencer_mp:"WEAPON_FN2000_BLING",fn2000_fmj_thermal_mp:"WEAPON_FN2000_BLING",fn2000_fmj_xmags_mp:"WEAPON_FN2000_BLING",fn2000_gl_heartbeat_mp:"WEAPON_FN2000_BLING",fn2000_gl_mp:"WEAPON_FN2000_GL",fn2000_gl_reflex_mp:"WEAPON_FN2000_BLING",fn2000_gl_silencer_mp:"WEAPON_FN2000_BLING",fn2000_gl_thermal_mp:"WEAPON_FN2000_BLING",fn2000_gl_xmags_mp:"WEAPON_FN2000_BLING",fn2000_heartbeat_mp:"WEAPON_FN2000_HEARTBEAT",fn2000_heartbeat_reflex_mp:"WEAPON_FN2000_BLING",fn2000_heartbeat_shotgun_mp:"WEAPON_FN2000_BLING",fn2000_heartbeat_silencer_mp:"WEAPON_FN2000_BLING",fn2000_heartbeat_thermal_mp:"WEAPON_FN2000_BLING",fn2000_heartbeat_xmags_mp:"WEAPON_FN2000_BLING",fn2000_mp:"WEAPON_FN2000",fn2000_reflex_mp:"WEAPON_FN2000_REDDOT",fn2000_reflex_shotgun_mp:"WEAPON_FN2000_BLING",fn2000_reflex_silencer_mp:"WEAPON_FN2000_BLING",fn2000_reflex_xmags_mp:"WEAPON_FN2000_BLING",fn2000_shotgun_attach_mp:"WEAPON_FN2000_SHOTGUN",fn2000_shotgun_mp:"WEAPON_FN2000_SHOTGUN",fn2000_shotgun_silencer_mp:"WEAPON_FN2000_BLING",fn2000_shotgun_thermal_mp:"WEAPON_FN2000_BLING",fn2000_shotgun_xmags_mp:"WEAPON_FN2000_BLING",fn2000_silencer_mp:"WEAPON_FN2000_SILENCER",fn2000_silencer_thermal_mp:"WEAPON_FN2000_BLING",fn2000_silencer_xmags_mp:"WEAPON_FN2000_BLING",fn2000_thermal_mp:"WEAPON_FN2000_THERMAL",fn2000_thermal_xmags_mp:"WEAPON_FN2000_BLING",fn2000_xmags_mp:"WEAPON_FN2000_XMAGS",frag_grenade_mp:"WEAPON_M2FRAGGRENADE",frag_grenade_short_mp:"WEAPON_M2FRAGGRENADE",gl_ak47_mp:"WEAPON_GP25",gl_ak47classic_mp:"WEAPON_GP25",gl_fal_mp:"WEAPON_M203",gl_famas_mp:"WEAPON_M203",gl_fn2000_mp:"WEAPON_M203",gl_m16_mp:"WEAPON_M203",gl_m4_mp:"WEAPON_M203",gl_masada_mp:"WEAPON_M203",gl_mp:"WEAPON_M203",gl_scar_mp:"WEAPON_M203",gl_tavor_mp:"WEAPON_M203",glock_akimbo_fmj_mp:"WEAPON_GLOCK_BLING",glock_akimbo_mp:"WEAPON_GLOCK_AKIMBO",glock_akimbo_silencer_mp:"WEAPON_GLOCK_BLING",glock_akimbo_xmags_mp:"WEAPON_GLOCK_BLING",glock_eotech_fmj_mp:"WEAPON_GLOCK_BLING",glock_eotech_mp:"WEAPON_GLOCK_EOTECH",glock_eotech_silencer_mp:"WEAPON_GLOCK_BLING",glock_eotech_xmags_mp:"WEAPON_GLOCK_BLING",glock_fmj_mp:"WEAPON_GLOCK_FMJ",glock_fmj_reflex_mp:"WEAPON_GLOCK_BLING",glock_fmj_silencer_mp:"WEAPON_GLOCK_BLING",glock_fmj_xmags_mp:"WEAPON_GLOCK_BLING",glock_mp:"WEAPON_GLOCK",glock_reflex_mp:"WEAPON_GLOCK_REDDOT",glock_reflex_silencer_mp:"WEAPON_GLOCK_BLING",glock_reflex_xmags_mp:"WEAPON_GLOCK_BLING",glock_silencer_mp:"WEAPON_GLOCK_SILENCER",glock_silencer_xmags_mp:"WEAPON_GLOCK_BLING",glock_xmags_mp:"WEAPON_GLOCK_XMAGS",javelin_mp:"WEAPON_JAVELIN",kriss_acog_fmj_mp:"WEAPON_KRISS_BLING",kriss_acog_mp:"WEAPON_KRISS_ACOG",kriss_acog_rof_mp:"WEAPON_KRISS_BLING",kriss_acog_silencer_mp:"WEAPON_KRISS_BLING",kriss_acog_xmags_mp:"WEAPON_KRISS_BLING",kriss_akimbo_fmj_mp:"WEAPON_KRISS_BLING",kriss_akimbo_mp:"WEAPON_KRISS_AKIMBO",kriss_akimbo_rof_mp:"WEAPON_KRISS_BLING",kriss_akimbo_silencer_mp:"WEAPON_KRISS_BLING",kriss_akimbo_xmags_mp:"WEAPON_KRISS_BLING",kriss_eotech_fmj_mp:"WEAPON_KRISS_BLING",kriss_eotech_mp:"WEAPON_KRISS_EOTECH",kriss_eotech_rof_mp:"WEAPON_KRISS_BLING",kriss_eotech_silencer_mp:"WEAPON_KRISS_BLING",kriss_eotech_xmags_mp:"WEAPON_KRISS_BLING",kriss_fmj_mp:"WEAPON_KRISS_FMJ",kriss_fmj_reflex_mp:"WEAPON_KRISS_BLING",kriss_fmj_rof_mp:"WEAPON_KRISS_BLING",kriss_fmj_silencer_mp:"WEAPON_KRISS_BLING",kriss_fmj_thermal_mp:"WEAPON_KRISS_BLING",kriss_fmj_xmags_mp:"WEAPON_KRISS_BLING",kriss_mp:"WEAPON_KRISS",kriss_reflex_mp:"WEAPON_KRISS_REDDOT",kriss_reflex_rof_mp:"WEAPON_KRISS_BLING",kriss_reflex_silencer_mp:"WEAPON_KRISS_BLING",kriss_reflex_xmags_mp:"WEAPON_KRISS_BLING",kriss_rof_mp:"WEAPON_KRISS_ROF",kriss_rof_silencer_mp:"WEAPON_KRISS_BLING",kriss_rof_thermal_mp:"WEAPON_KRISS_BLING",kriss_rof_xmags_mp:"WEAPON_KRISS_BLING",kriss_silencer_mp:"WEAPON_KRISS_SILENCER",kriss_silencer_thermal_mp:"WEAPON_KRISS_BLING",kriss_silencer_xmags_mp:"WEAPON_KRISS_BLING",kriss_thermal_mp:"WEAPON_KRISS_THERMAL",kriss_thermal_xmags_mp:"WEAPON_KRISS_BLING",kriss_xmags_mp:"WEAPON_KRISS_XMAGS",m1014_eotech_fmj_mp:"WEAPON_BENELLI_BLING",m1014_eotech_grip_mp:"WEAPON_BENELLI_BLING",m1014_eotech_mp:"WEAPON_BENELLI_EOTECH",m1014_eotech_silencer_mp:"WEAPON_BENELLI_BLING",m1014_eotech_xmags_mp:"WEAPON_BENELLI_BLING",m1014_fmj_grip_mp:"WEAPON_BENELLI_BLING",m1014_fmj_mp:"WEAPON_BENELLI_FMJ",m1014_fmj_reflex_mp:"WEAPON_BENELLI_BLING",m1014_fmj_silencer_mp:"WEAPON_BENELLI_BLING",m1014_fmj_xmags_mp:"WEAPON_BENELLI_BLING",m1014_grip_mp:"WEAPON_BENELLI_GRIP",m1014_grip_reflex_mp:"WEAPON_BENELLI_BLING",m1014_grip_silencer_mp:"WEAPON_BENELLI_BLING",m1014_grip_xmags_mp:"WEAPON_BENELLI_BLING",m1014_mp:"WEAPON_BENELLI",m1014_reflex_mp:"WEAPON_BENELLI_REDDOT",m1014_reflex_silencer_mp:"WEAPON_BENELLI_BLING",m1014_reflex_xmags_mp:"WEAPON_BENELLI_BLING",m1014_silencer_mp:"WEAPON_BENELLI_SILENCER",m1014_silencer_xmags_mp:"WEAPON_BENELLI_BLING",m1014_xmags_mp:"WEAPON_BENELLI_XMAGS",m16_acog_fmj_mp:"WEAPON_M16_BLING",m16_acog_gl_mp:"WEAPON_M16_BLING",m16_acog_heartbeat_mp:"WEAPON_M16_BLING",m16_acog_mp:"WEAPON_M16_ACOG",m16_acog_shotgun_mp:"WEAPON_M16_BLING",m16_acog_silencer_mp:"WEAPON_M16_BLING",m16_acog_xmags_mp:"WEAPON_M16_BLING",m16_eotech_fmj_mp:"WEAPON_M16_BLING",m16_eotech_gl_mp:"WEAPON_M16_BLING",m16_eotech_heartbeat_mp:"WEAPON_M16_BLING",m16_eotech_mp:"WEAPON_M16_EOTECH",m16_eotech_shotgun_mp:"WEAPON_M16_BLING",m16_eotech_silencer_mp:"WEAPON_M16_BLING",m16_eotech_xmags_mp:"WEAPON_M16_BLING",m16_fmj_gl_mp:"WEAPON_M16_BLING",m16_fmj_heartbeat_mp:"WEAPON_M16_BLING",m16_fmj_mp:"WEAPON_M16_FMJ",m16_fmj_reflex_mp:"WEAPON_M16_BLING",m16_fmj_shotgun_mp:"WEAPON_M16_BLING",m16_fmj_silencer_mp:"WEAPON_M16_BLING",m16_fmj_thermal_mp:"WEAPON_M16_BLING",m16_fmj_xmags_mp:"WEAPON_M16_BLING",m16_gl_heartbeat_mp:"WEAPON_M16_BLING",m16_gl_mp:"WEAPON_M16_GL",m16_gl_reflex_mp:"WEAPON_M16_BLING",m16_gl_silencer_mp:"WEAPON_M16_BLING",m16_gl_thermal_mp:"WEAPON_M16_BLING",m16_gl_xmags_mp:"WEAPON_M16_BLING",m16_heartbeat_mp:"WEAPON_M16_HEARTBEAT",m16_heartbeat_reflex_mp:"WEAPON_M16_BLING",m16_heartbeat_shotgun_mp:"WEAPON_M16_BLING",m16_heartbeat_silencer_mp:"WEAPON_M16_BLING",m16_heartbeat_thermal_mp:"WEAPON_M16_BLING",m16_heartbeat_xmags_mp:"WEAPON_M16_BLING",m16_mp:"WEAPON_M16",m16_reflex_mp:"WEAPON_M16_REDDOT",m16_reflex_shotgun_mp:"WEAPON_M16_BLING",m16_reflex_silencer_mp:"WEAPON_M16_BLING",m16_reflex_xmags_mp:"WEAPON_M16_BLING",m16_shotgun_attach_mp:"WEAPON_M16_SHOTGUN",m16_shotgun_mp:"WEAPON_M16_SHOTGUN",m16_shotgun_silencer_mp:"WEAPON_M16_BLING",m16_shotgun_thermal_mp:"WEAPON_M16_BLING",m16_shotgun_xmags_mp:"WEAPON_M16_BLING",m16_silencer_mp:"WEAPON_M16_SILENCER",m16_silencer_thermal_mp:"WEAPON_M16_BLING",m16_silencer_xmags_mp:"WEAPON_M16_BLING",m16_thermal_mp:"WEAPON_M16_THERMAL",m16_thermal_xmags_mp:"WEAPON_M16_BLING",m16_xmags_mp:"WEAPON_M16_XMAGS",m21_acog_fmj_mp:"WEAPON_M21_BLING",m21_acog_heartbeat_mp:"WEAPON_M21_BLING",m21_acog_mp:"WEAPON_M21_ACOG",m21_acog_silencer_mp:"WEAPON_M21_BLING",m21_acog_xmags_mp:"WEAPON_M21_BLING",m21_fmj_heartbeat_mp:"WEAPON_M21_BLING",m21_fmj_mp:"WEAPON_M21_FMJ",m21_fmj_silencer_mp:"WEAPON_M21_BLING",m21_fmj_thermal_mp:"WEAPON_M21_BLING",m21_fmj_xmags_mp:"WEAPON_M21_BLING",m21_heartbeat_mp:"WEAPON_M21_HEARTBEAT",m21_heartbeat_silencer_mp:"WEAPON_M21_BLING",m21_heartbeat_thermal_mp:"WEAPON_M21_BLING",m21_heartbeat_xmags_mp:"WEAPON_M21_BLING",m21_mp:"WEAPON_M21",m21_silencer_mp:"WEAPON_M21_SILENCER",m21_silencer_thermal_mp:"WEAPON_M21_BLING",m21_silencer_xmags_mp:"WEAPON_M21_BLING",m21_thermal_mp:"WEAPON_M21_THERMAL",m21_thermal_xmags_mp:"WEAPON_M21_BLING",m21_xmags_mp:"WEAPON_M21_XMAGS",m240_acog_fmj_mp:"WEAPON_M240_BLING",m240_acog_grip_mp:"WEAPON_M240_BLING",m240_acog_heartbeat_mp:"WEAPON_M240_BLING",m240_acog_mp:"WEAPON_M240_ACOG",m240_acog_silencer_mp:"WEAPON_M240_BLING",m240_acog_xmags_mp:"WEAPON_M240_BLING",m240_eotech_fmj_mp:"WEAPON_M240_BLING",m240_eotech_grip_mp:"WEAPON_M240_BLING",m240_eotech_heartbeat_mp:"WEAPON_M240_BLING",m240_eotech_mp:"WEAPON_M240_EOTECH",m240_eotech_silencer_mp:"WEAPON_M240_BLING",m240_eotech_xmags_mp:"WEAPON_M240_BLING",m240_fmj_grip_mp:"WEAPON_M240_BLING",m240_fmj_heartbeat_mp:"WEAPON_M240_BLING",m240_fmj_mp:"WEAPON_M240_FMJ",m240_fmj_reflex_mp:"WEAPON_M240_BLING",m240_fmj_silencer_mp:"WEAPON_M240_BLING",m240_fmj_thermal_mp:"WEAPON_M240_BLING",m240_fmj_xmags_mp:"WEAPON_M240_BLING",m240_grip_heartbeat_mp:"WEAPON_M240_BLING",m240_grip_mp:"WEAPON_M240_GRIP",m240_grip_reflex_mp:"WEAPON_M240_BLING",m240_grip_silencer_mp:"WEAPON_M240_BLING",m240_grip_thermal_mp:"WEAPON_M240_BLING",m240_grip_xmags_mp:"WEAPON_M240_BLING",m240_heartbeat_mp:"WEAPON_M240_HEARTBEAT",m240_heartbeat_reflex_mp:"WEAPON_M240_BLING",m240_heartbeat_silencer_mp:"WEAPON_M240_BLING",m240_heartbeat_thermal_mp:"WEAPON_M240_BLING",m240_heartbeat_xmags_mp:"WEAPON_M240_BLING",m240_mp:"WEAPON_M240",m240_reflex_mp:"WEAPON_M240_REDDOT",m240_reflex_silencer_mp:"WEAPON_M240_BLING",m240_reflex_xmags_mp:"WEAPON_M240_BLING",m240_silencer_mp:"WEAPON_M240_SILENCER",m240_silencer_thermal_mp:"WEAPON_M240_BLING",m240_silencer_xmags_mp:"WEAPON_M240_BLING",m240_thermal_mp:"WEAPON_M240_THERMAL",m240_thermal_xmags_mp:"WEAPON_M240_BLING",m240_xmags_mp:"WEAPON_M240_XMAGS",m4_acog_fmj_mp:"WEAPON_M4_CARBINE_BLING",m4_acog_gl_mp:"WEAPON_M4_CARBINE_BLING",m4_acog_heartbeat_mp:"WEAPON_M4_CARBINE_BLING",m4_acog_mp:"WEAPON_M4_CARBINE_ACOG",m4_acog_shotgun_mp:"WEAPON_M4_CARBINE_BLING",m4_acog_silencer_mp:"WEAPON_M4_CARBINE_BLING",m4_acog_xmags_mp:"WEAPON_M4_CARBINE_BLING",m4_eotech_fmj_mp:"WEAPON_M4_CARBINE_BLING",m4_eotech_gl_mp:"WEAPON_M4_CARBINE_BLING",m4_eotech_heartbeat_mp:"WEAPON_M4_CARBINE_BLING",m4_eotech_mp:"WEAPON_M4_CARBINE_EOTECH",m4_eotech_shotgun_mp:"WEAPON_M4_CARBINE_BLING",m4_eotech_silencer_mp:"WEAPON_M4_CARBINE_BLING",m4_eotech_xmags_mp:"WEAPON_M4_CARBINE_BLING",m4_fmj_gl_mp:"WEAPON_M4_CARBINE_BLING",m4_fmj_heartbeat_mp:"WEAPON_M4_CARBINE_BLING",m4_fmj_mp:"WEAPON_M4_CARBINE_FMJ",m4_fmj_reflex_mp:"WEAPON_M4_CARBINE_BLING",m4_fmj_shotgun_mp:"WEAPON_M4_CARBINE_BLING",m4_fmj_silencer_mp:"WEAPON_M4_CARBINE_BLING",m4_fmj_thermal_mp:"WEAPON_M4_CARBINE_BLING",m4_fmj_xmags_mp:"WEAPON_M4_CARBINE_BLING",m4_gl_heartbeat_mp:"WEAPON_M4_CARBINE_BLING",m4_gl_mp:"WEAPON_M4_CARBINE_GL",m4_gl_reflex_mp:"WEAPON_M4_CARBINE_BLING",m4_gl_silencer_mp:"WEAPON_M4_CARBINE_BLING",m4_gl_thermal_mp:"WEAPON_M4_CARBINE_BLING",m4_gl_xmags_mp:"WEAPON_M4_CARBINE_BLING",m4_heartbeat_mp:"WEAPON_M4_CARBINE_HEARTBEAT",m4_heartbeat_reflex_mp:"WEAPON_M4_CARBINE_BLING",m4_heartbeat_shotgun_mp:"WEAPON_M4_CARBINE_BLING",m4_heartbeat_silencer_mp:"WEAPON_M4_CARBINE_BLING",m4_heartbeat_thermal_mp:"WEAPON_M4_CARBINE_BLING",m4_heartbeat_xmags_mp:"WEAPON_M4_CARBINE_BLING",m4_mp:"WEAPON_M4_CARBINE",m4_reflex_mp:"WEAPON_M4_CARBINE_REDDOT",m4_reflex_shotgun_mp:"WEAPON_M4_CARBINE_BLING",m4_reflex_silencer_mp:"WEAPON_M4_CARBINE_BLING",m4_reflex_xmags_mp:"WEAPON_M4_CARBINE_BLING",m4_shotgun_attach_mp:"WEAPON_M4_CARBINE_SHOTGUN",m4_shotgun_mp:"WEAPON_M4_CARBINE_SHOTGUN",m4_shotgun_silencer_mp:"WEAPON_M4_CARBINE_BLING",m4_shotgun_thermal_mp:"WEAPON_M4_CARBINE_BLING",m4_shotgun_xmags_mp:"WEAPON_M4_CARBINE_BLING",m4_silencer_mp:"WEAPON_M4_CARBINE_SILENCER",m4_silencer_thermal_mp:"WEAPON_M4_CARBINE_BLING",m4_silencer_xmags_mp:"WEAPON_M4_CARBINE_BLING",m4_thermal_mp:"WEAPON_M4_CARBINE_THERMAL",m4_thermal_xmags_mp:"WEAPON_M4_CARBINE_BLING",m4_xmags_mp:"WEAPON_M4_CARBINE_XMAGS",m40a3:"WEAPON_M40A3",m40a3_mp:"WEAPON_M40A3",m79_mp:"WEAPON_M79",masada_acog_fmj_mp:"WEAPON_MASADA_BLING",masada_acog_gl_mp:"WEAPON_MASADA_BLING",masada_acog_heartbeat_mp:"WEAPON_MASADA_BLING",masada_acog_mp:"WEAPON_MASADA_ACOG",masada_acog_shotgun_mp:"WEAPON_MASADA_BLING",masada_acog_silencer_mp:"WEAPON_MASADA_BLING",masada_acog_xmags_mp:"WEAPON_MASADA_BLING",masada_eotech_fmj_mp:"WEAPON_MASADA_BLING",masada_eotech_gl_mp:"WEAPON_MASADA_BLING",masada_eotech_heartbeat_mp:"WEAPON_MASADA_BLING",masada_eotech_mp:"WEAPON_MASADA_EOTECH",masada_eotech_shotgun_mp:"WEAPON_MASADA_BLING",masada_eotech_silencer_mp:"WEAPON_MASADA_BLING",masada_eotech_xmags_mp:"WEAPON_MASADA_BLING",masada_fmj_gl_mp:"WEAPON_MASADA_BLING",masada_fmj_heartbeat_mp:"WEAPON_MASADA_BLING",masada_fmj_mp:"WEAPON_MASADA_FMJ",masada_fmj_reflex_mp:"WEAPON_MASADA_BLING",masada_fmj_shotgun_mp:"WEAPON_MASADA_BLING",masada_fmj_silencer_mp:"WEAPON_MASADA_BLING",masada_fmj_thermal_mp:"WEAPON_MASADA_BLING",masada_fmj_xmags_mp:"WEAPON_MASADA_BLING",masada_gl_heartbeat_mp:"WEAPON_MASADA_BLING",masada_gl_mp:"WEAPON_MASADA_GL",masada_gl_reflex_mp:"WEAPON_MASADA_BLING",masada_gl_silencer_mp:"WEAPON_MASADA_BLING",masada_gl_thermal_mp:"WEAPON_MASADA_BLING",masada_gl_xmags_mp:"WEAPON_MASADA_BLING",masada_heartbeat_mp:"WEAPON_MASADA_HEARTBEAT",masada_heartbeat_reflex_mp:"WEAPON_MASADA_BLING",masada_heartbeat_shotgun_mp:"WEAPON_MASADA_BLING",masada_heartbeat_silencer_mp:"WEAPON_MASADA_BLING",masada_heartbeat_thermal_mp:"WEAPON_MASADA_BLING",masada_heartbeat_xmags_mp:"WEAPON_MASADA_BLING",masada_mp:"WEAPON_MASADA",masada_reflex_mp:"WEAPON_MASADA_REDDOT",masada_reflex_shotgun_mp:"WEAPON_MASADA_BLING",masada_reflex_silencer_mp:"WEAPON_MASADA_BLING",masada_reflex_xmags_mp:"WEAPON_MASADA_BLING",masada_shotgun_attach_mp:"WEAPON_MASADA_SHOTGUN",masada_shotgun_mp:"WEAPON_MASADA_SHOTGUN",masada_shotgun_silencer_mp:"WEAPON_MASADA_BLING",masada_shotgun_thermal_mp:"WEAPON_MASADA_BLING",masada_shotgun_xmags_mp:"WEAPON_MASADA_BLING",masada_silencer_mp:"WEAPON_MASADA_SILENCER",masada_silencer_thermal_mp:"WEAPON_MASADA_BLING",masada_silencer_xmags_mp:"WEAPON_MASADA_BLING",masada_thermal_mp:"WEAPON_MASADA_THERMAL",masada_thermal_xmags_mp:"WEAPON_MASADA_BLING",masada_xmags_mp:"WEAPON_MASADA_XMAGS",melee_mp:"WEAPON_MELEE",mg4_acog_fmj_mp:"WEAPON_MG4_BLING",mg4_acog_grip_mp:"WEAPON_MG4_BLING",mg4_acog_heartbeat_mp:"WEAPON_MG4_BLING",mg4_acog_mp:"WEAPON_MG4_ACOG",mg4_acog_silencer_mp:"WEAPON_MG4_BLING",mg4_acog_xmags_mp:"WEAPON_MG4_BLING",mg4_eotech_fmj_mp:"WEAPON_MG4_BLING",mg4_eotech_grip_mp:"WEAPON_MG4_BLING",mg4_eotech_heartbeat_mp:"WEAPON_MG4_BLING",mg4_eotech_mp:"WEAPON_MG4_EOTECH",mg4_eotech_silencer_mp:"WEAPON_MG4_BLING",mg4_eotech_xmags_mp:"WEAPON_MG4_BLING",mg4_fmj_grip_mp:"WEAPON_MG4_BLING",mg4_fmj_heartbeat_mp:"WEAPON_MG4_BLING",mg4_fmj_mp:"WEAPON_MG4_FMJ",mg4_fmj_reflex_mp:"WEAPON_MG4_BLING",mg4_fmj_silencer_mp:"WEAPON_MG4_BLING",mg4_fmj_thermal_mp:"WEAPON_MG4_BLING",mg4_fmj_xmags_mp:"WEAPON_MG4_BLING",mg4_grip_heartbeat_mp:"WEAPON_MG4_BLING",mg4_grip_mp:"WEAPON_MG4_GRIP",mg4_grip_reflex_mp:"WEAPON_MG4_BLING",mg4_grip_silencer_mp:"WEAPON_MG4_BLING",mg4_grip_thermal_mp:"WEAPON_MG4_BLING",mg4_grip_xmags_mp:"WEAPON_MG4_BLING",mg4_heartbeat_mp:"WEAPON_MG4_HEARTBEAT",mg4_heartbeat_reflex_mp:"WEAPON_MG4_BLING",mg4_heartbeat_silencer_mp:"WEAPON_MG4_BLING",mg4_heartbeat_thermal_mp:"WEAPON_MG4_BLING",mg4_heartbeat_xmags_mp:"WEAPON_MG4_BLING",mg4_mp:"WEAPON_MG4",mg4_reflex_mp:"WEAPON_MG4_REDDOT",mg4_reflex_silencer_mp:"WEAPON_MG4_BLING",mg4_reflex_xmags_mp:"WEAPON_MG4_BLING",mg4_silencer_mp:"WEAPON_MG4_SILENCER",mg4_silencer_thermal_mp:"WEAPON_MG4_BLING",mg4_silencer_xmags_mp:"WEAPON_MG4_BLING",mg4_thermal_mp:"WEAPON_MG4_THERMAL",mg4_thermal_xmags_mp:"WEAPON_MG4_BLING",mg4_xmags_mp:"WEAPON_MG4_XMAGS",model1887_akimbo_fmj_mp:"WEAPON_MODEL1887_BLING",model1887_akimbo_mp:"WEAPON_MODEL1887_AKIMBO",model1887_fmj_mp:"WEAPON_MODEL1887_FMJ",model1887_mp:"WEAPON_MODEL1887",mp5k_acog_fmj_mp:"WEAPON_MP5K_BLING",mp5k_acog_mp:"WEAPON_MP5K_ACOG",mp5k_acog_rof_mp:"WEAPON_MP5K_BLING",mp5k_acog_silencer_mp:"WEAPON_MP5K_BLING",mp5k_acog_xmags_mp:"WEAPON_MP5K_BLING",mp5k_akimbo_fmj_mp:"WEAPON_MP5K_BLING",mp5k_akimbo_mp:"WEAPON_MP5K_AKIMBO",mp5k_akimbo_rof_mp:"WEAPON_MP5K_BLING",mp5k_akimbo_silencer_mp:"WEAPON_MP5K_BLING",mp5k_akimbo_xmags_mp:"WEAPON_MP5K_BLING",mp5k_eotech_fmj_mp:"WEAPON_MP5K_BLING",mp5k_eotech_mp:"WEAPON_MP5K_EOTECH",mp5k_eotech_rof_mp:"WEAPON_MP5K_BLING",mp5k_eotech_silencer_mp:"WEAPON_MP5K_BLING",mp5k_eotech_xmags_mp:"WEAPON_MP5K_BLING",mp5k_fmj_mp:"WEAPON_MP5K_FMJ",mp5k_fmj_reflex_mp:"WEAPON_MP5K_BLING",mp5k_fmj_rof_mp:"WEAPON_MP5K_BLING",mp5k_fmj_silencer_mp:"WEAPON_MP5K_BLING",mp5k_fmj_thermal_mp:"WEAPON_MP5K_BLING",mp5k_fmj_xmags_mp:"WEAPON_MP5K_BLING",mp5k_mp:"WEAPON_MP5K",mp5k_reflex_mp:"WEAPON_MP5K_REDDOT",mp5k_reflex_rof_mp:"WEAPON_MP5K_BLING",mp5k_reflex_silencer_mp:"WEAPON_MP5K_BLING",mp5k_reflex_xmags_mp:"WEAPON_MP5K_BLING",mp5k_rof_mp:"WEAPON_MP5K_ROF",mp5k_rof_silencer_mp:"WEAPON_MP5K_BLING",mp5k_rof_thermal_mp:"WEAPON_MP5K_BLING",mp5k_rof_xmags_mp:"WEAPON_MP5K_BLING",mp5k_silencer_mp:"WEAPON_MP5K_SILENCER",mp5k_silencer_thermal_mp:"WEAPON_MP5K_BLING",mp5k_silencer_xmags_mp:"WEAPON_MP5K_BLING",mp5k_thermal_mp:"WEAPON_MP5K_THERMAL",mp5k_thermal_xmags_mp:"WEAPON_MP5K_BLING",mp5k_xmags_mp:"WEAPON_MP5K_XMAGS",none:"WEAPON_NONE",oma_healthstation_mp:"WEAPON_HEALTH_STATION",onemanarmy_mp:"WEAPON_ONE_MAN_ARMY",p90_acog_fmj_mp:"WEAPON_P90_BLING",p90_acog_mp:"WEAPON_P90_ACOG",p90_acog_rof_mp:"WEAPON_P90_BLING",p90_acog_silencer_mp:"WEAPON_P90_BLING",p90_acog_xmags_mp:"WEAPON_P90_BLING",p90_akimbo_fmj_mp:"WEAPON_P90_BLING",p90_akimbo_mp:"WEAPON_P90_AKIMBO",p90_akimbo_rof_mp:"WEAPON_P90_BLING",p90_akimbo_silencer_mp:"WEAPON_P90_BLING",p90_akimbo_xmags_mp:"WEAPON_P90_BLING",p90_eotech_fmj_mp:"WEAPON_P90_BLING",p90_eotech_mp:"WEAPON_P90_EOTECH",p90_eotech_rof_mp:"WEAPON_P90_BLING",p90_eotech_silencer_mp:"WEAPON_P90_BLING",p90_eotech_xmags_mp:"WEAPON_P90_BLING",p90_fmj_mp:"WEAPON_P90_FMJ",p90_fmj_reflex_mp:"WEAPON_P90_BLING",p90_fmj_rof_mp:"WEAPON_P90_BLING",p90_fmj_silencer_mp:"WEAPON_P90_BLING",p90_fmj_thermal_mp:"WEAPON_P90_BLING",p90_fmj_xmags_mp:"WEAPON_P90_BLING",p90_mp:"WEAPON_P90",p90_reflex_mp:"WEAPON_P90_REDDOT",p90_reflex_rof_mp:"WEAPON_P90_BLING",p90_reflex_silencer_mp:"WEAPON_P90_BLING",p90_reflex_xmags_mp:"WEAPON_P90_BLING",p90_rof_mp:"WEAPON_P90_ROF",p90_rof_silencer_mp:"WEAPON_P90_BLING",p90_rof_thermal_mp:"WEAPON_P90_BLING",p90_rof_xmags_mp:"WEAPON_P90_BLING",p90_silencer_mp:"WEAPON_P90_SILENCER",p90_silencer_thermal_mp:"WEAPON_P90_BLING",p90_silencer_xmags_mp:"WEAPON_P90_BLING",p90_thermal_mp:"WEAPON_P90_THERMAL",p90_thermal_xmags_mp:"WEAPON_P90_BLING",p90_xmags_mp:"WEAPON_P90_XMAGS",peacekeeper_mp:"WEAPON_PEACEKEEPER",pp2000_akimbo_fmj_mp:"WEAPON_PP2000_BLING",pp2000_akimbo_mp:"WEAPON_PP2000_AKIMBO",pp2000_akimbo_silencer_mp:"WEAPON_PP2000_BLING",pp2000_akimbo_xmags_mp:"WEAPON_PP2000_BLING",pp2000_eotech_fmj_mp:"WEAPON_PP2000_BLING",pp2000_eotech_mp:"WEAPON_PP2000_EOTECH",pp2000_eotech_silencer_mp:"WEAPON_PP2000_BLING",pp2000_eotech_xmags_mp:"WEAPON_PP2000_BLING",pp2000_fmj_mp:"WEAPON_PP2000_FMJ",pp2000_fmj_reflex_mp:"WEAPON_PP2000_BLING",pp2000_fmj_silencer_mp:"WEAPON_PP2000_BLING",pp2000_fmj_xmags_mp:"WEAPON_PP2000_BLING",pp2000_mp:"WEAPON_PP2000",pp2000_reflex_mp:"WEAPON_PP2000_REDDOT",pp2000_reflex_silencer_mp:"WEAPON_PP2000_BLING",pp2000_reflex_xmags_mp:"WEAPON_PP2000_BLING",pp2000_silencer_mp:"WEAPON_PP2000_SILENCER",pp2000_silencer_xmags_mp:"WEAPON_PP2000_BLING",pp2000_xmags_mp:"WEAPON_PP2000_XMAGS",ranger_akimbo_fmj_mp:"WEAPON_RANGER_BLING",ranger_akimbo_mp:"WEAPON_RANGER_AKIMBO",ranger_fmj_mp:"WEAPON_RANGER_FMJ",ranger_mp:"WEAPON_RANGER",remotemissile_projectile_mp:"WEAPON_STINGER",riotshield_mp:"WEAPON_RIOTSHIELD",rpd_acog_fmj_mp:"WEAPON_RPD_BLING",rpd_acog_grip_mp:"WEAPON_RPD_BLING",rpd_acog_heartbeat_mp:"WEAPON_RPD_BLING",rpd_acog_mp:"WEAPON_RPD_ACOG",rpd_acog_silencer_mp:"WEAPON_RPD_BLING",rpd_acog_xmags_mp:"WEAPON_RPD_BLING",rpd_eotech_fmj_mp:"WEAPON_RPD_BLING",rpd_eotech_grip_mp:"WEAPON_RPD_BLING",rpd_eotech_heartbeat_mp:"WEAPON_RPD_BLING",rpd_eotech_mp:"WEAPON_RPD_EOTECH",rpd_eotech_silencer_mp:"WEAPON_RPD_BLING",rpd_eotech_xmags_mp:"WEAPON_RPD_BLING",rpd_fmj_grip_mp:"WEAPON_RPD_BLING",rpd_fmj_heartbeat_mp:"WEAPON_RPD_BLING",rpd_fmj_mp:"WEAPON_RPD_FMJ",rpd_fmj_reflex_mp:"WEAPON_RPD_BLING",rpd_fmj_silencer_mp:"WEAPON_RPD_BLING",rpd_fmj_thermal_mp:"WEAPON_RPD_BLING",rpd_fmj_xmags_mp:"WEAPON_RPD_BLING",rpd_grip_heartbeat_mp:"WEAPON_RPD_BLING",rpd_grip_mp:"WEAPON_RPD_GRIP",rpd_grip_reflex_mp:"WEAPON_RPD_BLING",rpd_grip_silencer_mp:"WEAPON_RPD_BLING",rpd_grip_thermal_mp:"WEAPON_RPD_BLING",rpd_grip_xmags_mp:"WEAPON_RPD_BLING",rpd_heartbeat_mp:"WEAPON_RPD_HEARTBEAT",rpd_heartbeat_reflex_mp:"WEAPON_RPD_BLING",rpd_heartbeat_silencer_mp:"WEAPON_RPD_BLING",rpd_heartbeat_thermal_mp:"WEAPON_RPD_BLING",rpd_heartbeat_xmags_mp:"WEAPON_RPD_BLING",rpd_mp:"WEAPON_RPD",rpd_reflex_mp:"WEAPON_RPD_REDDOT",rpd_reflex_silencer_mp:"WEAPON_RPD_BLING",rpd_reflex_xmags_mp:"WEAPON_RPD_BLING",rpd_silencer_mp:"WEAPON_RPD_SILENCER",rpd_silencer_thermal_mp:"WEAPON_RPD_BLING",rpd_silencer_xmags_mp:"WEAPON_RPD_BLING",rpd_thermal_mp:"WEAPON_RPD_THERMAL",rpd_thermal_xmags_mp:"WEAPON_RPD_BLING",rpd_xmags_mp:"WEAPON_RPD_XMAGS",rpg_mp:"WEAPON_RPG",sa80_acog_fmj_mp:"WEAPON_SA80_BLING",sa80_acog_grip_mp:"WEAPON_SA80_BLING",sa80_acog_heartbeat_mp:"WEAPON_SA80_BLING",sa80_acog_mp:"WEAPON_SA80_ACOG",sa80_acog_silencer_mp:"WEAPON_SA80_BLING",sa80_acog_xmags_mp:"WEAPON_SA80_BLING",sa80_eotech_fmj_mp:"WEAPON_SA80_BLING",sa80_eotech_grip_mp:"WEAPON_SA80_BLING",sa80_eotech_heartbeat_mp:"WEAPON_SA80_BLING",sa80_eotech_mp:"WEAPON_SA80_EOTECH",sa80_eotech_silencer_mp:"WEAPON_SA80_BLING",sa80_eotech_xmags_mp:"WEAPON_SA80_BLING",sa80_fmj_grip_mp:"WEAPON_SA80_BLING",sa80_fmj_heartbeat_mp:"WEAPON_SA80_BLING",sa80_fmj_mp:"WEAPON_SA80_FMJ",sa80_fmj_reflex_mp:"WEAPON_SA80_BLING",sa80_fmj_silencer_mp:"WEAPON_SA80_BLING",sa80_fmj_thermal_mp:"WEAPON_SA80_BLING",sa80_fmj_xmags_mp:"WEAPON_SA80_BLING",sa80_grip_heartbeat_mp:"WEAPON_SA80_BLING",sa80_grip_mp:"WEAPON_SA80_GRIP",sa80_grip_reflex_mp:"WEAPON_SA80_BLING",sa80_grip_silencer_mp:"WEAPON_SA80_BLING",sa80_grip_thermal_mp:"WEAPON_SA80_BLING",sa80_grip_xmags_mp:"WEAPON_SA80_BLING",sa80_heartbeat_mp:"WEAPON_SA80_HEARTBEAT",sa80_heartbeat_reflex_mp:"WEAPON_SA80_BLING",sa80_heartbeat_silencer_mp:"WEAPON_SA80_BLING",sa80_heartbeat_thermal_mp:"WEAPON_SA80_BLING",sa80_heartbeat_xmags_mp:"WEAPON_SA80_BLING",sa80_mp:"WEAPON_SA80",sa80_reflex_mp:"WEAPON_SA80_REDDOT",sa80_reflex_silencer_mp:"WEAPON_SA80_BLING",sa80_reflex_xmags_mp:"WEAPON_SA80_BLING",sa80_silencer_mp:"WEAPON_SA80_SILENCER",sa80_silencer_thermal_mp:"WEAPON_SA80_BLING",sa80_silencer_xmags_mp:"WEAPON_SA80_BLING",sa80_thermal_mp:"WEAPON_SA80_THERMAL",sa80_thermal_xmags_mp:"WEAPON_SA80_BLING",sa80_xmags_mp:"WEAPON_SA80_XMAGS",scar_acog_fmj_mp:"WEAPON_SCAR_BLING",scar_acog_gl_mp:"WEAPON_SCAR_BLING",scar_acog_heartbeat_mp:"WEAPON_SCAR_BLING",scar_acog_mp:"WEAPON_SCAR_ACOG",scar_acog_shotgun_mp:"WEAPON_SCAR_BLING",scar_acog_silencer_mp:"WEAPON_SCAR_BLING",scar_acog_xmags_mp:"WEAPON_SCAR_BLING",scar_eotech_fmj_mp:"WEAPON_SCAR_BLING",scar_eotech_gl_mp:"WEAPON_SCAR_BLING",scar_eotech_heartbeat_mp:"WEAPON_SCAR_BLING",scar_eotech_mp:"WEAPON_SCAR_EOTECH",scar_eotech_shotgun_mp:"WEAPON_SCAR_BLING",scar_eotech_silencer_mp:"WEAPON_SCAR_BLING",scar_eotech_xmags_mp:"WEAPON_SCAR_BLING",scar_fmj_gl_mp:"WEAPON_SCAR_BLING",scar_fmj_heartbeat_mp:"WEAPON_SCAR_BLING",scar_fmj_mp:"WEAPON_SCAR_FMJ",scar_fmj_reflex_mp:"WEAPON_SCAR_BLING",scar_fmj_shotgun_mp:"WEAPON_SCAR_BLING",scar_fmj_silencer_mp:"WEAPON_SCAR_BLING",scar_fmj_thermal_mp:"WEAPON_SCAR_BLING",scar_fmj_xmags_mp:"WEAPON_SCAR_BLING",scar_gl_heartbeat_mp:"WEAPON_SCAR_BLING",scar_gl_mp:"WEAPON_SCAR_GL",scar_gl_reflex_mp:"WEAPON_SCAR_BLING",scar_gl_silencer_mp:"WEAPON_SCAR_BLING",scar_gl_thermal_mp:"WEAPON_SCAR_BLING",scar_gl_xmags_mp:"WEAPON_SCAR_BLING",scar_heartbeat_mp:"WEAPON_SCAR_HEARTBEAT",scar_heartbeat_reflex_mp:"WEAPON_SCAR_BLING",scar_heartbeat_shotgun_mp:"WEAPON_SCAR_BLING",scar_heartbeat_silencer_mp:"WEAPON_SCAR_BLING",scar_heartbeat_thermal_mp:"WEAPON_SCAR_BLING",scar_heartbeat_xmags_mp:"WEAPON_SCAR_BLING",scar_mp:"WEAPON_SCAR",scar_reflex_mp:"WEAPON_SCAR_REDDOT",scar_reflex_shotgun_mp:"WEAPON_SCAR_BLING",scar_reflex_silencer_mp:"WEAPON_SCAR_BLING",scar_reflex_xmags_mp:"WEAPON_SCAR_BLING",scar_shotgun_attach_mp:"WEAPON_SCAR_SHOTGUN",scar_shotgun_mp:"WEAPON_SCAR_SHOTGUN",scar_shotgun_silencer_mp:"WEAPON_SCAR_BLING",scar_shotgun_thermal_mp:"WEAPON_SCAR_BLING",scar_shotgun_xmags_mp:"WEAPON_SCAR_BLING",scar_silencer_mp:"WEAPON_SCAR_SILENCER",scar_silencer_thermal_mp:"WEAPON_SCAR_BLING",scar_silencer_xmags_mp:"WEAPON_SCAR_BLING",scar_thermal_mp:"WEAPON_SCAR_THERMAL",scar_thermal_xmags_mp:"WEAPON_SCAR_BLING",scar_xmags_mp:"WEAPON_SCAR_XMAGS",scavenger_bag_mp:"WEAPON_SCAVENGER_BAG",semtex_mp:"WEAPON_SEMTEX",smoke_grenade_mp:"WEAPON_SMOKE_GRENADE",spas12_eotech_fmj_mp:"WEAPON_SPAS12_BLING",spas12_eotech_grip_mp:"WEAPON_SPAS12_BLING",spas12_eotech_mp:"WEAPON_SPAS12_EOTECH",spas12_eotech_silencer_mp:"WEAPON_SPAS12_BLING",spas12_eotech_xmags_mp:"WEAPON_SPAS12_BLING",spas12_fmj_grip_mp:"WEAPON_SPAS12_BLING",spas12_fmj_mp:"WEAPON_SPAS12_FMJ",spas12_fmj_reflex_mp:"WEAPON_SPAS12_BLING",spas12_fmj_silencer_mp:"WEAPON_SPAS12_BLING",spas12_fmj_xmags_mp:"WEAPON_SPAS12_BLING",spas12_grip_mp:"WEAPON_SPAS12_GRIP",spas12_grip_reflex_mp:"WEAPON_SPAS12_BLING",spas12_grip_silencer_mp:"WEAPON_SPAS12_BLING",spas12_grip_xmags_mp:"WEAPON_SPAS12_BLING",spas12_mp:"WEAPON_SPAS12",spas12_reflex_mp:"WEAPON_SPAS12_REDDOT",spas12_reflex_silencer_mp:"WEAPON_SPAS12_BLING",spas12_reflex_xmags_mp:"WEAPON_SPAS12_BLING",spas12_silencer_mp:"WEAPON_SPAS12_SILENCER",spas12_silencer_xmags_mp:"WEAPON_SPAS12_BLING",spas12_xmags_mp:"WEAPON_SPAS12_XMAGS",stealth_bomb_mp:"WEAPON_CLAYMORE",stinger_mp:"WEAPON_STINGER",striker_eotech_fmj_mp:"WEAPON_STRIKER_BLING",striker_eotech_grip_mp:"WEAPON_STRIKER_BLING",striker_eotech_mp:"WEAPON_STRIKER_EOTECH",striker_eotech_silencer_mp:"WEAPON_STRIKER_BLING",striker_eotech_xmags_mp:"WEAPON_STRIKER_BLING",striker_fmj_grip_mp:"WEAPON_STRIKER_BLING",striker_fmj_mp:"WEAPON_STRIKER_FMJ",striker_fmj_reflex_mp:"WEAPON_STRIKER_BLING",striker_fmj_silencer_mp:"WEAPON_STRIKER_BLING",striker_fmj_xmags_mp:"WEAPON_STRIKER_BLING",striker_grip_mp:"WEAPON_STRIKER_GRIP",striker_grip_reflex_mp:"WEAPON_STRIKER_BLING",striker_grip_silencer_mp:"WEAPON_STRIKER_BLING",striker_grip_xmags_mp:"WEAPON_STRIKER_BLING",striker_mp:"WEAPON_STRIKER",striker_reflex_mp:"WEAPON_STRIKER_REDDOT",striker_reflex_silencer_mp:"WEAPON_STRIKER_BLING",striker_reflex_xmags_mp:"WEAPON_STRIKER_BLING",striker_silencer_mp:"WEAPON_STRIKER_SILENCER",striker_silencer_xmags_mp:"WEAPON_STRIKER_BLING",striker_xmags_mp:"WEAPON_STRIKER_XMAGS",tavor_acog_fmj_mp:"WEAPON_TAVOR_BLING",tavor_acog_gl_mp:"WEAPON_TAVOR_BLING",tavor_acog_heartbeat_mp:"WEAPON_TAVOR_BLING",tavor_acog_mp:"WEAPON_TAVOR_ACOG",tavor_acog_shotgun_mp:"WEAPON_TAVOR_BLING",tavor_acog_silencer_mp:"WEAPON_TAVOR_BLING",tavor_acog_xmags_mp:"WEAPON_TAVOR_BLING",tavor_eotech_fmj_mp:"WEAPON_TAVOR_BLING",tavor_eotech_gl_mp:"WEAPON_TAVOR_BLING",tavor_eotech_heartbeat_mp:"WEAPON_TAVOR_BLING",tavor_eotech_mp:"WEAPON_TAVOR_EOTECH",tavor_eotech_shotgun_mp:"WEAPON_TAVOR_BLING",tavor_eotech_silencer_mp:"WEAPON_TAVOR_BLING",tavor_eotech_xmags_mp:"WEAPON_TAVOR_BLING",tavor_fmj_gl_mp:"WEAPON_TAVOR_BLING",tavor_fmj_heartbeat_mp:"WEAPON_TAVOR_BLING",tavor_fmj_mp:"WEAPON_TAVOR_FMJ",tavor_fmj_reflex_mp:"WEAPON_TAVOR_BLING",tavor_fmj_shotgun_mp:"WEAPON_TAVOR_BLING",tavor_fmj_silencer_mp:"WEAPON_TAVOR_BLING",tavor_fmj_thermal_mp:"WEAPON_TAVOR_BLING",tavor_fmj_xmags_mp:"WEAPON_TAVOR_BLING",tavor_gl_heartbeat_mp:"WEAPON_TAVOR_BLING",tavor_gl_mp:"WEAPON_TAVOR_GL",tavor_gl_reflex_mp:"WEAPON_TAVOR_BLING",tavor_gl_silencer_mp:"WEAPON_TAVOR_BLING",tavor_gl_thermal_mp:"WEAPON_TAVOR_BLING",tavor_gl_xmags_mp:"WEAPON_TAVOR_BLING",tavor_heartbeat_mp:"WEAPON_TAVOR_HEARTBEAT",tavor_heartbeat_reflex_mp:"WEAPON_TAVOR_BLING",tavor_heartbeat_shotgun_mp:"WEAPON_TAVOR_BLING",tavor_heartbeat_silencer_mp:"WEAPON_TAVOR_BLING",tavor_heartbeat_thermal_mp:"WEAPON_TAVOR_BLING",tavor_heartbeat_xmags_mp:"WEAPON_TAVOR_BLING",tavor_mp:"WEAPON_TAVOR",tavor_reflex_mp:"WEAPON_TAVOR_REDDOT",tavor_reflex_shotgun_mp:"WEAPON_TAVOR_BLING",tavor_reflex_silencer_mp:"WEAPON_TAVOR_BLING",tavor_reflex_xmags_mp:"WEAPON_TAVOR_BLING",tavor_shotgun_attach_mp:"WEAPON_TAVOR_SHOTGUN",tavor_shotgun_mp:"WEAPON_TAVOR_SHOTGUN",tavor_shotgun_silencer_mp:"WEAPON_TAVOR_BLING",tavor_shotgun_thermal_mp:"WEAPON_TAVOR_BLING",tavor_shotgun_xmags_mp:"WEAPON_TAVOR_BLING",tavor_silencer_mp:"WEAPON_TAVOR_SILENCER",tavor_silencer_thermal_mp:"WEAPON_TAVOR_BLING",tavor_silencer_xmags_mp:"WEAPON_TAVOR_BLING",tavor_thermal_mp:"WEAPON_TAVOR_THERMAL",tavor_thermal_xmags_mp:"WEAPON_TAVOR_BLING",tavor_xmags_mp:"WEAPON_TAVOR_XMAGS",throwingknife_mp:"WEAPON_THROWING_KNIFE",tmp_akimbo_fmj_mp:"WEAPON_TMP_BLING",tmp_akimbo_mp:"WEAPON_TMP_AKIMBO",tmp_akimbo_silencer_mp:"WEAPON_TMP_BLING",tmp_akimbo_xmags_mp:"WEAPON_TMP_BLING",tmp_eotech_fmj_mp:"WEAPON_TMP_BLING",tmp_eotech_mp:"WEAPON_TMP_EOTECH",tmp_eotech_silencer_mp:"WEAPON_TMP_BLING",tmp_eotech_xmags_mp:"WEAPON_TMP_BLING",tmp_fmj_mp:"WEAPON_TMP_FMJ",tmp_fmj_reflex_mp:"WEAPON_TMP_BLING",tmp_fmj_silencer_mp:"WEAPON_TMP_BLING",tmp_fmj_xmags_mp:"WEAPON_TMP_BLING",tmp_mp:"WEAPON_TMP",tmp_reflex_mp:"WEAPON_TMP_REDDOT",tmp_reflex_silencer_mp:"WEAPON_TMP_BLING",tmp_reflex_xmags_mp:"WEAPON_TMP_BLING",tmp_silencer_mp:"WEAPON_TMP_SILENCER",tmp_silencer_xmags_mp:"WEAPON_TMP_BLING",tmp_xmags_mp:"WEAPON_TMP_XMAGS",turret_minigun_mp:"WEAPON_TURRET_MINIGUN",ump45_acog_fmj_mp:"WEAPON_UMP45_BLING",ump45_acog_mp:"WEAPON_UMP45_ACOG",ump45_acog_rof_mp:"WEAPON_UMP45_BLING",ump45_acog_silencer_mp:"WEAPON_UMP45_BLING",ump45_acog_xmags_mp:"WEAPON_UMP45_BLING",ump45_akimbo_fmj_mp:"WEAPON_UMP45_BLING",ump45_akimbo_mp:"WEAPON_UMP45_AKIMBO",ump45_akimbo_rof_mp:"WEAPON_UMP45_BLING",ump45_akimbo_silencer_mp:"WEAPON_UMP45_BLING",ump45_akimbo_xmags_mp:"WEAPON_UMP45_BLING",ump45_eotech_fmj_mp:"WEAPON_UMP45_BLING",ump45_eotech_mp:"WEAPON_UMP45_EOTECH",ump45_eotech_rof_mp:"WEAPON_UMP45_BLING",ump45_eotech_silencer_mp:"WEAPON_UMP45_BLING",ump45_eotech_xmags_mp:"WEAPON_UMP45_BLING",ump45_fmj_mp:"WEAPON_UMP45_FMJ",ump45_fmj_reflex_mp:"WEAPON_UMP45_BLING",ump45_fmj_rof_mp:"WEAPON_UMP45_BLING",ump45_fmj_silencer_mp:"WEAPON_UMP45_BLING",ump45_fmj_thermal_mp:"WEAPON_UMP45_BLING",ump45_fmj_xmags_mp:"WEAPON_UMP45_BLING",ump45_mp:"WEAPON_UMP45",ump45_reflex_mp:"WEAPON_UMP45_REDDOT",ump45_reflex_rof_mp:"WEAPON_UMP45_BLING",ump45_reflex_silencer_mp:"WEAPON_UMP45_BLING",ump45_reflex_xmags_mp:"WEAPON_UMP45_BLING",ump45_rof_mp:"WEAPON_UMP45_ROF",ump45_rof_silencer_mp:"WEAPON_UMP45_BLING",ump45_rof_thermal_mp:"WEAPON_UMP45_BLING",ump45_rof_xmags_mp:"WEAPON_UMP45_BLING",ump45_silencer_mp:"WEAPON_UMP45_SILENCER",ump45_silencer_thermal_mp:"WEAPON_UMP45_BLING",ump45_silencer_xmags_mp:"WEAPON_UMP45_BLING",ump45_thermal_mp:"WEAPON_UMP45_THERMAL",ump45_thermal_xmags_mp:"WEAPON_UMP45_BLING",ump45_xmags_mp:"WEAPON_UMP45_XMAGS",usp_akimbo_fmj_mp:"WEAPON_USP_BLING",usp_akimbo_mp:"WEAPON_USP_AKIMBO",usp_akimbo_silencer_mp:"WEAPON_USP_BLING",usp_akimbo_xmags_mp:"WEAPON_USP_BLING",usp_fmj_mp:"WEAPON_USP_FMJ",usp_fmj_silencer_mp:"WEAPON_USP_BLING",usp_fmj_tactical_mp:"WEAPON_USP_BLING",usp_fmj_xmags_mp:"WEAPON_USP_BLING",usp_mp:"WEAPON_USP",usp_silencer_mp:"WEAPON_USP_SILENCER",usp_silencer_tactical_mp:"WEAPON_USP_BLING",usp_silencer_xmags_mp:"WEAPON_USP_BLING",usp_tactical_mp:"WEAPON_USP_TACTICAL",usp_tactical_xmags_mp:"WEAPON_USP_BLING",usp_xmags_mp:"WEAPON_USP_XMAGS",uzi_acog_fmj_mp:"WEAPON_UZI_BLING",uzi_acog_mp:"WEAPON_UZI_ACOG",uzi_acog_rof_mp:"WEAPON_UZI_BLING",uzi_acog_silencer_mp:"WEAPON_UZI_BLING",uzi_acog_xmags_mp:"WEAPON_UZI_BLING",uzi_akimbo_fmj_mp:"WEAPON_UZI_BLING",uzi_akimbo_mp:"WEAPON_UZI_AKIMBO",uzi_akimbo_rof_mp:"WEAPON_UZI_BLING",uzi_akimbo_silencer_mp:"WEAPON_UZI_BLING",uzi_akimbo_xmags_mp:"WEAPON_UZI_BLING",uzi_eotech_fmj_mp:"WEAPON_UZI_BLING",uzi_eotech_mp:"WEAPON_UZI_EOTECH",uzi_eotech_rof_mp:"WEAPON_UZI_BLING",uzi_eotech_silencer_mp:"WEAPON_UZI_BLING",uzi_eotech_xmags_mp:"WEAPON_UZI_BLING",uzi_fmj_mp:"WEAPON_UZI_FMJ",uzi_fmj_reflex_mp:"WEAPON_UZI_BLING",uzi_fmj_rof_mp:"WEAPON_UZI_BLING",uzi_fmj_silencer_mp:"WEAPON_UZI_BLING",uzi_fmj_thermal_mp:"WEAPON_UZI_BLING",uzi_fmj_xmags_mp:"WEAPON_UZI_BLING",uzi_mp:"WEAPON_UZI",uzi_reflex_mp:"WEAPON_UZI_REDDOT",uzi_reflex_rof_mp:"WEAPON_UZI_BLING",uzi_reflex_silencer_mp:"WEAPON_UZI_BLING",uzi_reflex_xmags_mp:"WEAPON_UZI_BLING",uzi_rof_mp:"WEAPON_UZI_ROF",uzi_rof_silencer_mp:"WEAPON_UZI_BLING",uzi_rof_thermal_mp:"WEAPON_UZI_BLING",uzi_rof_xmags_mp:"WEAPON_UZI_BLING",uzi_silencer_mp:"WEAPON_UZI_SILENCER",uzi_silencer_thermal_mp:"WEAPON_UZI_BLING",uzi_silencer_xmags_mp:"WEAPON_UZI_BLING",uzi_thermal_mp:"WEAPON_UZI_THERMAL",uzi_thermal_xmags_mp:"WEAPON_UZI_BLING",uzi_xmags_mp:"WEAPON_UZI_XMAGS",wa2000_acog_fmj_mp:"WEAPON_WA2000_BLING",wa2000_acog_heartbeat_mp:"WEAPON_WA2000_BLING",wa2000_acog_mp:"WEAPON_WA2000_ACOG",wa2000_acog_silencer_mp:"WEAPON_WA2000_BLING",wa2000_acog_xmags_mp:"WEAPON_WA2000_BLING",wa2000_fmj_heartbeat_mp:"WEAPON_WA2000_BLING",wa2000_fmj_mp:"WEAPON_WA2000_FMJ",wa2000_fmj_silencer_mp:"WEAPON_WA2000_BLING",wa2000_fmj_thermal_mp:"WEAPON_WA2000_BLING",wa2000_fmj_xmags_mp:"WEAPON_WA2000_BLING",wa2000_heartbeat_mp:"WEAPON_WA2000_HEARTBEAT",wa2000_heartbeat_silencer_mp:"WEAPON_WA2000_BLING",wa2000_heartbeat_thermal_mp:"WEAPON_WA2000_BLING",wa2000_heartbeat_xmags_mp:"WEAPON_WA2000_BLING",wa2000_mp:"WEAPON_WA2000",wa2000_silencer_mp:"WEAPON_WA2000_SILENCER",wa2000_silencer_thermal_mp:"WEAPON_WA2000_BLING",wa2000_silencer_xmags_mp:"WEAPON_WA2000_BLING",wa2000_thermal_mp:"WEAPON_WA2000_THERMAL",wa2000_thermal_xmags_mp:"WEAPON_WA2000_BLING",wa2000_xmags_mp:"WEAPON_WA2000_XMAGS",winchester1200_mp:"WEAPON_WINCHESTER1200"},L_=`REFERENCE           WEAPON_NONE
LANG_ENGLISH        "Unknown Weapon"

REFERENCE           WEAPON_MELEE
LANG_ENGLISH        "Melee Attack"

REFERENCE           WEAPON_COMBAT_KNIFE
LANG_ENGLISH        "Combat Knife"

REFERENCE           WEAPON_BARREL
LANG_ENGLISH        "Explosive Barrel"

REFERENCE           WEAPON_DESTRUCTIBLE_CAR
LANG_ENGLISH        "Destructible Car"

REFERENCE           WEAPON_TURRET_MINIGUN
LANG_ENGLISH        "Mounted Minigun"

REFERENCE           WEAPON_BOMB
LANG_ENGLISH        "Bomb"

REFERENCE           WEAPON_HELICOPTER
LANG_ENGLISH        "Helicopter"

REFERENCE           WEAPON_HEALTH_STATION
LANG_ENGLISH        "Health Station"

ENDMARKER
`,R_=`REFERENCE           EXE_SERVERISFULL
LANG_ENGLISH        "Server is full."

REFERENCE           EXE_KEYWAIT
LANG_ENGLISH        "Press ESCAPE to cancel or BACKSPACE to clear"

REFERENCE           EXE_KEYCHANGE
LANG_ENGLISH        "Press ENTER or CLICK to change"

REFERENCE           EXE_YES
LANG_ENGLISH        "Yes"

REFERENCE           EXE_NO
LANG_ENGLISH        "No"

REFERENCE           EXE_ALL
LANG_ENGLISH        "All"

REFERENCE           EXE_WAITINGFORMASTERSERVERRESPONSE
LANG_ENGLISH        "Waiting for response from Master Server"

REFERENCE           EXE_GETTINGINFOFORSERVERS
LANG_ENGLISH        "Getting info for &&1/&&2 servers (ESC to cancel)"

REFERENCE           EXE_REFRESHTIME
LANG_ENGLISH        "Refresh Time: &&1"

REFERENCE           EXE_CDKEYVALID
LANG_ENGLISH        "Key code appears to be valid."

REFERENCE           EXE_CDKEYINVALID
LANG_ENGLISH        "Key code does not appear to be valid."

REFERENCE           EXE_ERR_NO_LAST_SAVE
LANG_ENGLISH        "The lastsave game seems to have been deleted. Load a different save game from the Load Game menu, or start a new game."

REFERENCE           EXE_FAVORITELISTFULL
LANG_ENGLISH        "Favorite list is full."

REFERENCE           EXE_FAVORITEADDED
LANG_ENGLISH        "Added favorite server."

REFERENCE           EXE_DOWNLOADINGUPDATE
LANG_ENGLISH        "Downloading Update: &&1"

REFERENCE           EXE_CONNECTINGTO
LANG_ENGLISH        "Connecting to &&1"

REFERENCE           EXE_AWAITINGCONNECTION
LANG_ENGLISH        "Awaiting connection...&&1"

REFERENCE           EXE_AWAITINGCHALLENGE
LANG_ENGLISH        "Awaiting challenge...&&1"

REFERENCE           EXE_AWAITINGGAMESTATE
LANG_ENGLISH        "Setting up game"

REFERENCE           EXE_SAYTEAM
LANG_ENGLISH        "say_team"

REFERENCE           EXE_SAY
LANG_ENGLISH        "say"

REFERENCE           EXE_GAMESAVED
LANG_ENGLISH        "Game Saved"

REFERENCE           EXE_PLAYERKICKED
LANG_ENGLISH        "Player kicked."

REFERENCE           EXE_ERR_BANNED_PERM
LANG_ENGLISH        "You are permanently banned from this server."

REFERENCE           EXE_ERR_BANNED_TEMP
LANG_ENGLISH        "You are temporarily banned from this server."

REFERENCE           EXE_PLAYERKICKED_INACTIVE
LANG_ENGLISH        "kicked for inactivity."

REFERENCE           EXE_CANNOTKICKHOSTPLAYER
LANG_ENGLISH        "Cannot kick the host player."

REFERENCE           EXE_SERVERKILLED
LANG_ENGLISH        "Server killed."

REFERENCE           EXE_SERVERQUIT
LANG_ENGLISH        "Server quit"

REFERENCE           EXE_DISCONNECTEDFROMOWNLISTENSERVER
LANG_ENGLISH        "Client told to disconnect from its own listen server."

REFERENCE           EXE_ENDOFGAME
LANG_ENGLISH        "End of Game"

REFERENCE           EXE_SERVERDIDNTHAVECD
LANG_ENGLISH        "Server didn't have CD"

REFERENCE           EXE_SERVERRESTARTTIMEWRAP
LANG_ENGLISH        "Restarting server due to time wrapping"

REFERENCE           EXE_SERVERRESTARTMISC
LANG_ENGLISH        "Restarting server due to &&1 wrapping."

REFERENCE           EXE_SERVERSHUTDOWNMISC
LANG_ENGLISH        "Stopping game due to &&1 wrapping."

REFERENCE           EXE_SERVERSHUTDOWNTIMEWRAP
LANG_ENGLISH        "Stopping game due to time wrapping"

REFERENCE           EXE_INVALIDUPDATESERVERDOWNLOAD
LANG_ENGLISH        "Invalid download from update server"

REFERENCE           EXE_AUTODL_CLIENTDISABLED
LANG_ENGLISH        "Could not download &&1 because autodownloading is disabled on the client.\\n\\nYou will need to get this file elsewhere before you can connect to this server, or set autodownload to Yes in your settings."

REFERENCE           EXE_CANTAUTODLGAMEPAK
LANG_ENGLISH        "Cannot auto-download game IWD file &&1."

REFERENCE           EXE_AUTODL_SERVERDISABLED_PURE
LANG_ENGLISH        "Could not download &&1 because autodownloading is disabled on the server.\\n\\nYou will need to get this file elsewhere before you can connect to this pure server."

REFERENCE           EXE_AUTODL_SERVERDISABLED
LANG_ENGLISH        "Could not download &&1 because autodownloading is disabled on the server.\\n\\nSet autodownload to No in your settings and you might be able to connect if you do have the file."

REFERENCE           EXE_AUTODL_FILENOTONSERVER
LANG_ENGLISH        "File &&1 not found on server for autodownloading."

REFERENCE           EXE_DISCONNECTED
LANG_ENGLISH        "Lost connection to host"

REFERENCE           EXE_UNPURECLIENTDETECTED
LANG_ENGLISH        "Impure client detected. Invalid .IWD files referenced!"

REFERENCE           EXE_LOSTRELIABLECOMMANDS
LANG_ENGLISH        "Lost reliable commands"

REFERENCE           EXE_CANNOTVALIDATEPURECLIENT
LANG_ENGLISH        "Cannot validate pure client!"

REFERENCE           EXE_SERVERCOMMANDOVERFLOW
LANG_ENGLISH        "Server command overflow"

REFERENCE           EXE_TIMEDOUT
LANG_ENGLISH        "Timed out"

REFERENCE           EXE_SERVERMESSAGEOVERFLOW
LANG_ENGLISH        "Server message overflow"

REFERENCE           EXE_LOCAL
LANG_ENGLISH        "Local"

REFERENCE           EXE_INTERNET
LANG_ENGLISH        "Internet"

REFERENCE           EXE_FAVORITES
LANG_ENGLISH        "Favorites"

REFERENCE           EXE_NETSOURCE
LANG_ENGLISH        "Source:     &&1"

REFERENCE           EXE_SERVERFILTER
LANG_ENGLISH        "Filter: &&1"

REFERENCE           EXE_NOSAVEGAMES
LANG_ENGLISH        "(no savegames)"

REFERENCE           EXE_AWAITINGCDKEYAUTH
LANG_ENGLISH        "Awaiting key code authorization"

REFERENCE           EXE_SERVERDISCONNECTREASON
LANG_ENGLISH        "&&1"

REFERENCE           EXE_SERVER_DISCONNECTED
LANG_ENGLISH        "Server Disconnected"

REFERENCE           EXE_ERR_COULDNT_LOAD
LANG_ENGLISH        "Couldn't load &&1"

REFERENCE           EXE_ERR_CORRECT_FOLDER
LANG_ENGLISH        "Make sure Modern Warfare 2 is run from the correct folder."

REFERENCE           EXE_ERR_OUT_OF_MEMORY
LANG_ENGLISH        "Out of memory."

REFERENCE           EXE_ERR_HUNK_ALLOC_FAILED
LANG_ENGLISH        "Hunk data failed to allocate &&1 megs."

REFERENCE           EXE_ERR_COULDNT_LOAD_OPENGL
LANG_ENGLISH        "Could not load OpenGL.  Make sure that you have the latest drivers for your video card from the manufacturer's web site."

REFERENCE           EXE_ERR_COULDNT_REGISTER_WINDOW
LANG_ENGLISH        "Could not register a window class. This is a Microsoft Windows(TM) error. You may need to reboot."

REFERENCE           EXE_ERR_COULDNT_CREATE_WINDOW
LANG_ENGLISH        "Could not create a window. This is a Microsoft Windows(TM) error. You may need to reboot."

REFERENCE           EXE_ERR_GET_NEWEST_DRIVERS
LANG_ENGLISH        "You should install the latest drivers for your video card, being sure to uninstall the old drivers first.  If you already have the latest drivers, you should completely uninstall the drivers and then reinstall them.  This fixes most problems.  If the game still doesn't work, it may be that your video card does not have the minimum features required.  Please check the readme for more information, including a list of supported video cards."

REFERENCE           EXE_ERR_VIDEOCARD_MISSING_FEATURE
LANG_ENGLISH        "Your video card appears to be missing one or more features required to run Modern Warfare 2."

REFERENCE           EXE_ERR_MULTITEX_INIT_FAIL
LANG_ENGLISH        "OpenGL 1.3 multitexture found, but it failed to initialize."

REFERENCE           EXE_ERR_MULTITEX_BAD_MAX
LANG_ENGLISH        "OpenGL 1.3 multitexture found, but it doesn't allow multiple textures."

REFERENCE           EXE_ERR_ARB_MULTITEX_INIT_FAILED
LANG_ENGLISH        "GL_ARB_multitexture found, but it failed to initialize."

REFERENCE           EXE_ERR_ARB_MULTITEX_BAD_MAX
LANG_ENGLISH        "GL_ARB_multitexture found, but it doesn't allow multiple textures."

REFERENCE           EXE_ERR_BAD_WINDOWS_VER
LANG_ENGLISH        "Your version of Microsoft Windows(TM) does not support Modern Warfare 2."

REFERENCE           EXE_ERR_COULDNT_INIT_REFRESH
LANG_ENGLISH        "Couldn't initialize refresh"

REFERENCE           EXE_ERR_JOURNAL_FILE_READ
LANG_ENGLISH        "Error reading from journal file"

REFERENCE           EXE_ERR_JOURNAL_FILE_WRITE
LANG_ENGLISH        "Error writing to journal file"

REFERENCE           EXE_ERR_NOT_FOUND
LANG_ENGLISH        "&&1 not found."

REFERENCE           EXE_ERR_COULDNT_CONFIGURE
LANG_ENGLISH        "Couldn't configure:"

REFERENCE           EXE_ERR_HUNGUSAGE_CORRUPT
LANG_ENGLISH        "hunkusage.dat file is corrupt."

REFERENCE           EXE_ERR_CANT_CREATE
LANG_ENGLISH        "Cannot create &&1."

REFERENCE           EXE_ERR_CANT_WRITE
LANG_ENGLISH        "Cannot write to &&1."

REFERENCE           EXE_ERR_HUNKUSAGE_CANT_WRITE
LANG_ENGLISH        "Cannot write to hunkusage.dat, check disk full."

REFERENCE           EXE_ERR_CLIENT_CMD_OVERFLOW
LANG_ENGLISH        "Client command overflow"

REFERENCE           EXE_ERR_RELIABLE_CYCLED_OUT
LANG_ENGLISH        "A reliable command was cycled out."

REFERENCE           EXE_ERR_NOT_RECEIVED
LANG_ENGLISH        "Requested a command not received."

REFERENCE           EXE_ERR_INVALID_CD_KEY
LANG_ENGLISH        "Key Code is not valid.\\nPlease enter your Key Code in the Multiplayer Options/Enter Key Code menu and then try connecting to the server again."

REFERENCE           EXE_ERR_WRONG_MAP_VERSION_NUM
LANG_ENGLISH        "Map &&1 has the wrong version number."

REFERENCE           EXE_ERR_SHOULD_BE
LANG_ENGLISH        "should be"

REFERENCE           EXE_ERR_BAD_GAME_FOLDER
LANG_ENGLISH        "Invalid game folder"

REFERENCE           EXE_ERR_GAME_FAILED_PURE_CHECK
LANG_ENGLISH        "Game code(&&1) failed Pure Server check"

REFERENCE           EXE_ERR_COULDNT_START_PROCESS
LANG_ENGLISH        "Could not start process: &&1"

REFERENCE           EXE_ERR_COULDNT_OPEN_URL
LANG_ENGLISH        "Could not open url: '&&1'"

REFERENCE           EXE_SERVER_FATAL_CRASHED
LANG_ENGLISH        "Server fatal crashed:"

REFERENCE           EXE_ERR_CDKEY_IN_USE
LANG_ENGLISH        "Key Code in use. Please try reconnecting later."

REFERENCE           EXE_ERR_NOT_A_DEMO_SERVER
LANG_ENGLISH        "Server is not a demo server."

REFERENCE           EXE_SERVER_IS_DIFFERENT_VER
LANG_ENGLISH        "Server is a different version:\\n&&1"

REFERENCE           EXE_BAD_CHALLENGE
LANG_ENGLISH        "No or bad challenge for address."

REFERENCE           EXE_ERR_HIGH_PING_ONLY
LANG_ENGLISH        "Server is for high ping players only."

REFERENCE           EXE_ERR_LOW_PING_ONLY
LANG_ENGLISH        "Server is for low ping players only."

REFERENCE           EXE_MONTH_ABV_JANUARY
LANG_ENGLISH        "Jan"

REFERENCE           EXE_MONTH_ABV_FEBRUARY
LANG_ENGLISH        "Feb"

REFERENCE           EXE_MONTH_ABV_MARCH
LANG_ENGLISH        "Mar"

REFERENCE           EXE_MONTH_ABV_APRIL
LANG_ENGLISH        "Apr"

REFERENCE           EXE_MONTH_ABV_MAY
LANG_ENGLISH        "May"

REFERENCE           EXE_MONTH_ABV_JUN
LANG_ENGLISH        "Jun"

REFERENCE           EXE_MONTH_ABV_JUNE
LANG_ENGLISH        "Jun"

REFERENCE           EXE_MONTH_ABV_JULY
LANG_ENGLISH        "Jul"

REFERENCE           EXE_MONTH_ABV_AUGUST
LANG_ENGLISH        "Aug"

REFERENCE           EXE_MONTH_ABV_SEPTEMBER
LANG_ENGLISH        "Sep"

REFERENCE           EXE_MONTH_ABV_OCTOBER
LANG_ENGLISH        "Oct"

REFERENCE           EXE_MONTH_ABV_NOVEMBER
LANG_ENGLISH        "Nov"

REFERENCE           EXE_MONTH_ABV_DECEMBER
LANG_ENGLISH        "Dec"

REFERENCE           EXE_COD_MULTIPLAYER
LANG_ENGLISH        "Modern Warfare 2 Multiplayer"

REFERENCE           EXE_SV_INFO_SERVERNAME
LANG_ENGLISH        "Server Name"

REFERENCE           EXE_SV_INFO_ADDRESS
LANG_ENGLISH        "IP Address"

REFERENCE           EXE_SV_INFO_GAMENAME
LANG_ENGLISH        "Game Name"

REFERENCE           EXE_SV_INFO_GAMETYPE
LANG_ENGLISH        "Game Type"

REFERENCE           EXE_SV_INFO_MAP
LANG_ENGLISH        "Map"

REFERENCE           EXE_SV_INFO_VERSION
LANG_ENGLISH        "Version"

REFERENCE           EXE_SV_INFO_PROTOCOL
LANG_ENGLISH        "Protocol Version"

REFERENCE           EXE_SV_INFO_NUM
LANG_ENGLISH        "num"

REFERENCE           EXE_SV_INFO_SCORE
LANG_ENGLISH        "score"

REFERENCE           EXE_SV_INFO_PING
LANG_ENGLISH        "ping"

REFERENCE           EXE_SV_INFO_NAME
LANG_ENGLISH        "name"

REFERENCE           EXE_SV_INFO_MAXPING
LANG_ENGLISH        "Max Ping"

REFERENCE           EXE_SV_INFO_MINPING
LANG_ENGLISH        "Min Ping"

REFERENCE           EXE_SV_INFO_MAXRATE
LANG_ENGLISH        "Max Rate"

REFERENCE           EXE_SV_INFO_FLOODPROTECT
LANG_ENGLISH        "Flood Protect"

REFERENCE           EXE_SV_INFO_ALLOWANON
LANG_ENGLISH        "Allow Anonymous"

REFERENCE           EXE_SV_INFO_MAXCLIENTS
LANG_ENGLISH        "Max Clients"

REFERENCE           EXE_SV_INFO_PRIVATECLIENTS
LANG_ENGLISH        "Private Clients"

REFERENCE           EXE_SV_INFO_FRIENDLY_FIRE
LANG_ENGLISH        "Friendly Fire"

REFERENCE           EXE_SV_INFO_MOD
LANG_ENGLISH        "Mod"

REFERENCE           EXE_SV_INFO_KILLCAM
LANG_ENGLISH        "Killcam"

REFERENCE           EXE_GIGABYTE
LANG_ENGLISH        "GB"

REFERENCE           EXE_MEGABYTE
LANG_ENGLISH        "MB"

REFERENCE           EXE_KILOBYTE
LANG_ENGLISH        "KB"

REFERENCE           EXE_BYTES
LANG_ENGLISH        "bytes"

REFERENCE           EXE_HOURS
LANG_ENGLISH        "hr"

REFERENCE           EXE_MINUTES
LANG_ENGLISH        "min"

REFERENCE           EXE_SECONDS
LANG_ENGLISH        "sec"

REFERENCE           EXE_DOWNLOADING
LANG_ENGLISH        "Downloading:"

REFERENCE           EXE_EST_TIME_LEFT
LANG_ENGLISH        "Estimated time left:"

REFERENCE           EXE_TRANS_RATE
LANG_ENGLISH        "Transfer rate:"

REFERENCE           EXE_ESTIMATING
LANG_ENGLISH        "estimating"

REFERENCE           EXE_OF
LANG_ENGLISH        "of"

REFERENCE           EXE_COPIED
LANG_ENGLISH        "copied"

REFERENCE           EXE_BADSERVERADDRESS
LANG_ENGLISH        "Bad server address."

REFERENCE           EXE_ERR_BAD_CDKEY
LANG_ENGLISH        "Bad Key Code."

REFERENCE           EXE_ERR_SERVER_TIMEOUT
LANG_ENGLISH        "Server connection timed out."

REFERENCE           EXE_SV_INFO_PASSWORD
LANG_ENGLISH        "Password Protected"

REFERENCE           EXE_FAVORITEINLIST
LANG_ENGLISH        "This server is already a favorite server."

REFERENCE           EXE_SV_INFO_PURE
LANG_ENGLISH        "Pure Server"

REFERENCE           EXE_FAVORITENAMEEMPTY
LANG_ENGLISH        "Server name is empty."

REFERENCE           EXE_FAVORITEADDRESSEMPTY
LANG_ENGLISH        "Server address is empty."

REFERENCE           EXE_SV_INFO_ANTILAG
LANG_ENGLISH        "Anti Lag"

REFERENCE           EXE_SV_INFO_VOICE
LANG_ENGLISH        "Voice"

REFERENCE           EXE_TRANSMITERROR
LANG_ENGLISH        "Disconnected due to transmission error"

REFERENCE           EXE_CHECKPOINT_REACHED
LANG_ENGLISH        "Checkpoint Reached."

REFERENCE           EXE_HOSTUNREACH
LANG_ENGLISH        "Unable to connect to host"

REFERENCE           EXE_MATCHENDED
LANG_ENGLISH        "The match has ended"

REFERENCE           EXE_LOSTCONNECTION
LANG_ENGLISH        "Network connection lost"

REFERENCE           EXE_UPLOADINGSTATS
LANG_ENGLISH        "Synchronizing game settings"

REFERENCE           EXE_NEEDSTATS
LANG_ENGLISH        "Error synchronizing game settings"

REFERENCE           EXE_SV_INFO_COMPASS_ENEMIES
LANG_ENGLISH        "Compass Enemies"

REFERENCE           EXE_SV_INFO_CLIENT_CONSOLE
LANG_ENGLISH        "Client Console"

REFERENCE           EXE_AWAITINGHOST
LANG_ENGLISH        "Waiting for other players"

REFERENCE           EXE_GAMEISENDING
LANG_ENGLISH        "Join failed - game is about to end"

REFERENCE           EXE_ERR_QPORT
LANG_ENGLISH        "Unable to connect.  Duplicate qport on server."

REFERENCE           EXE_LEFTGAME
LANG_ENGLISH        "left the game"

REFERENCE           EXE_SV_INFO_HARDCORE
LANG_ENGLISH        "Hardcore"

REFERENCE           EXE_MIGRATIONLIMIT
LANG_ENGLISH        "Migration limit reached"

REFERENCE           EXE_MIGRATIONDROPPED
LANG_ENGLISH        "Migration failed. Dropped by host."

REFERENCE           EXE_MIGRATIONABORTED
LANG_ENGLISH        "Host Migration aborted. No good host available."

REFERENCE           EXE_CONFIGSTRINGMISMATCH
LANG_ENGLISH        "Our level fastfile is different from the server!  Aborting connection"

REFERENCE           EXE_DNSFAILURE
LANG_ENGLISH        "DNS failure trying to locate Activision servers.  You will be unable to play online games until you restart."

REFERENCE           EXE_MIGRATION_IN_PROGRESS
LANG_ENGLISH        "Could not join match because host migration was in progress."

REFERENCE           PLATFORM_UI_SELECTBUTTON
LANG_ENGLISH        "^3&&1^7"

REFERENCE           PLATFORM_UI_PRESS_BUTTONSELECTCHOICE
LANG_ENGLISH        "Press ^3&&1^7 to skip."

REFERENCE           PLATFORM_UI_SELECTBUTTON_TOGGLE
LANG_ENGLISH        "Press ^3&&1^7 to toggle."

REFERENCE           PLATFORM_UI_SELECTBUTTON_ENABLE
LANG_ENGLISH        "Press ^3&&1^7 to enable."

REFERENCE           PLATFORM_UI_SELECTBUTTON_DISABLE
LANG_ENGLISH        "Press ^3&&1^7 to disable."

REFERENCE           PLATFORM_UI_SELECTBUTTON_SELECT
LANG_ENGLISH        "Press ^3&&1^7 to select."

REFERENCE           PLATFORM_UI_SELECTBUTTON_DESELECT
LANG_ENGLISH        "Press ^3&&1^7 to deselect."

REFERENCE           PLATFORM_UI_CLEAR_KILLSTREAKS
LANG_ENGLISH        "^3F1 ^0- ^7Clear Killstreaks"

REFERENCE           PLATFORM_UI_CLEAR_ATTACHMENTS
LANG_ENGLISH        "^3F1 ^0- ^7CLEAR ATTACHMENTS"

REFERENCE           PLATFORM_UI_AC130_CHANGE_WEAPON
LANG_ENGLISH        "^3 [{weapnext}] ^7 Change Weapon\\n"

REFERENCE           PLATFORM_UI_AC130_TOGGLE_THERMAL
LANG_ENGLISH        "^3 [{+activate}] ^7 Toggle Thermal"

REFERENCE           PLATFORM_UI_EOG_SUMMARY_PLAY_AGAIN
LANG_ENGLISH        "^3&&1^7 PLAY AGAIN"

REFERENCE           PLATFORM_UI_EOG_SUMMARY_RETURN
LANG_ENGLISH        "^3&&1^7 RETURN TO SPECIAL OPS"

REFERENCE           PLATFORM_UI_PRESS_TO_CONTINUE
LANG_ENGLISH        "Press ^3&&1^7 to continue."

REFERENCE           PLATFORM_UI_CANCEL_RIGHT
LANG_ENGLISH        "Cancel ^3&&1^7"

REFERENCE           PLATFORM_FOLLOWPREVIOUSPLAYER
LANG_ENGLISH        "^3&&1^7 - Previous player"

REFERENCE           PLATFORM_FOLLOWSTOP
LANG_ENGLISH        "^3&&1^7 - Stop following"

REFERENCE           PLATFORM_STANCEHINT_JUMP
LANG_ENGLISH        "Press^3 &&1 ^7to jump"

REFERENCE           PLATFORM_STANCEHINT_STAND
LANG_ENGLISH        "Press^3 &&1 ^7to stand"

REFERENCE           PLATFORM_STANCEHINT_CROUCH
LANG_ENGLISH        "Press^3 &&1 ^7to crouch"

REFERENCE           PLATFORM_STANCEHINT_PRONE
LANG_ENGLISH        "Press^3 &&1 ^7to go prone"

REFERENCE           PLATFORM_SWAPWEAPONS
LANG_ENGLISH        "Press^3 &&1 ^7to swap for"

REFERENCE           PLATFORM_MANTLE
LANG_ENGLISH        "Press^3 &&1 ^7to  "

REFERENCE           PLATFORM_HOLD_BREATH
LANG_ENGLISH        "Hold^3 &&1 ^7to steady"

REFERENCE           PLATFORM_PICKUPNEWWEAPON
LANG_ENGLISH        "Press^3 &&1 ^7to pick up"

REFERENCE           PLATFORM_THROWBACKGRENADE
LANG_ENGLISH        "^3&&1 ^7throw back"

REFERENCE           PLATFORM_USEAION30CAL
LANG_ENGLISH        "Press USE^3 &&1 ^7to commandeer the .30 cal"

REFERENCE           PLATFORM_PRESS_TO_SKIP
LANG_ENGLISH        "Press^3 [{+activate}] ^7to skip"

REFERENCE           PLATFORM_PRESS_TO_SPAWN
LANG_ENGLISH        "Press^3 [{+activate}] ^7to spawn"

REFERENCE           PLATFORM_PRESS_TO_RESPAWN
LANG_ENGLISH        "Press^3 [{+activate}] ^7to respawn"

REFERENCE           PLATFORM_HOLD_TO_USE
LANG_ENGLISH        "Press^3 &&1 ^7to use"

REFERENCE           PLATFORM_HOLD_TO_DROP
LANG_ENGLISH        "Press^3 &&1 ^7to drop"

REFERENCE           PLATFORM_HOLD_TO_PLANT_EXPLOSIVES
LANG_ENGLISH        "Hold^3 &&1 ^7to plant explosives  "

REFERENCE           PLATFORM_HOLD_TO_DEFUSE_EXPLOSIVES
LANG_ENGLISH        "Hold^3 &&1 ^7to defuse explosives  "

REFERENCE           PLATFORM_EOG_PRESS_ESC
LANG_ENGLISH        "Press^3 ESC ^7to^2 Create a Class ^7and more"

REFERENCE           PLATFORM_SAVE_AND_QUIT
LANG_ENGLISH        "Save and Quit"

REFERENCE           PLATFORM_QUIT
LANG_ENGLISH        "Quit"

REFERENCE           PLATFORM_BACK
LANG_ENGLISH        "Back"

REFERENCE           PLATFORM_YES
LANG_ENGLISH        "Yes"

REFERENCE           PLATFORM_NO
LANG_ENGLISH        "No"

REFERENCE           PLATFORM_RELOAD
LANG_ENGLISH        "Reload"

REFERENCE           PLATFORM_LOW_AMMO_NO_RELOAD
LANG_ENGLISH        "Low Ammo"

REFERENCE           PLATFORM_PICK_UP_STOPPING_POWER
LANG_ENGLISH        "Press^3 &&1 ^7to pick up Stopping Power"

REFERENCE           PLATFORM_PICK_UP_JUGGERNAUT
LANG_ENGLISH        "Press^3 &&1 ^7to pick up Juggernaut"

REFERENCE           PLATFORM_PICK_UP_DOUBLE_TAP
LANG_ENGLISH        "Press^3 &&1 ^7to pick up Double Tap"

REFERENCE           PLATFORM_PICK_UP_LAST_STAND
LANG_ENGLISH        "Press^3 &&1 ^7to pick up Last Stand"

REFERENCE           PLATFORM_PICK_UP_MARTYRDOM
LANG_ENGLISH        "Press^3 &&1 ^7to pick up Martyrdom"

REFERENCE           PLATFORM_PICK_UP_SLEIGHT_OF_HAND
LANG_ENGLISH        "Press^3 &&1 ^7to pick up Sleight of Hand"

REFERENCE           PLATFORM_PLAY_ONLINE
LANG_ENGLISH        "Play Online"

REFERENCE           PLATFORM_NOMOTD
LANG_ENGLISH        "Go online to get Modern Warfare 2 news and updates"

REFERENCE           PLATFORM_NOMOTD_MP
LANG_ENGLISH        "Welcome to Modern Warfare 2 multiplayer"

REFERENCE           PLATFORM_FOLLOWNEXTPLAYER
LANG_ENGLISH        "^3&&1^7 - Next player"

REFERENCE           PLATFORM_LOCSEL_DIR_CONTROLS
LANG_ENGLISH        "Hold [Right Mouse] to set direction"

REFERENCE           PLATFORM_LOCSEL_POSITION_CONTROLS
LANG_ENGLISH        "Use the mouse to select a target"

REFERENCE           PLATFORM_PRESS_TO_SET_AIRSTRIKE
LANG_ENGLISH        "Press Fire to set Air Strike location"

REFERENCE           PLATFORM_COWARDS_WAY_OUT
LANG_ENGLISH        "Hold^3 [{+activate}] ^7Coward's way out"

REFERENCE           PLATFORM_DISCONNECTED_FROM_SERVER
LANG_ENGLISH        "Disconnected from server"

REFERENCE           PLATFORM_STATSREADERROR
LANG_ENGLISH        "An error occurred while reading the stats data. Your stats have been reset."

REFERENCE           PLATFORM_DYK_MSG1
LANG_ENGLISH        "Gain XP! You get experience points(XP) for getting kills, completing challenges, and completing matches on Ranked servers."

REFERENCE           PLATFORM_DYK_MSG2
LANG_ENGLISH        "Level up! As you gain XP, you earn promotions, unlockables, and new challenges."

REFERENCE           PLATFORM_DYK_MSG3
LANG_ENGLISH        "Customize your weapon! You can add a camouflage pattern or attachment to your weapons in Create-a-class."

REFERENCE           PLATFORM_DYK_MSG4
LANG_ENGLISH        "Design your own class! Create-a-class lets you choose your weapons and perks, then name the class to your liking."

REFERENCE           PLATFORM_DYK_MSG5
LANG_ENGLISH        "Use teamwork! If you damage an enemy but someone else gets the kill, you are awarded assist points."

REFERENCE           PLATFORM_DYK_MSG6
LANG_ENGLISH        "Get hardcore.  Hardcore modes remove your hud and make weapons even more deadly."

REFERENCE           PLATFORM_DYK_MSG7
LANG_ENGLISH        "Custom games!  Unranked games can play any game mode with custom rules."

REFERENCE           PLATFORM_DYK_MSG8
LANG_ENGLISH        "Challenges are rewarding.  Weapon challenges unlock attachments and camouflage patterns for use in Create-a-class."

REFERENCE           PLATFORM_DYK_MSG9
LANG_ENGLISH        "Get more XP!  You get extra XP bonuses for completing Challenges, located in Rank and Challenges."

REFERENCE           PLATFORM_DYK_MSG10
LANG_ENGLISH        "Listen in... You can hear the enemy team's voice chat with the Eavesdrop perk."

REFERENCE           PLATFORM_DYK_MSG11
LANG_ENGLISH        "Be aware... You can spot enemy explosive devices like claymores and C4 with the Bomb Squad perk."

REFERENCE           PLATFORM_DYK_MSG12
LANG_ENGLISH        "Take a stand!  Pull out your pistol and make that last ditch effort to get some kills before you die with the Last Stand perk."

REFERENCE           PLATFORM_DYK_MSG13
LANG_ENGLISH        "Combine your air support!  Call in an airstrike in combination with a UAV for a pinpoint accurate carpet bomb."

REFERENCE           PLATFORM_DYK_MSG14
LANG_ENGLISH        "Chopper down!  Don't be afraid to fire at enemy choppers with your primary weapon.  It may do less damage than a rocket, but it definitely hurts."

REFERENCE           PLATFORM_DYK_MSG15
LANG_ENGLISH        "Find the enemy!  Calling in a UAV shows enemies on your radar as red dots.  Knowing the enemy position is a big advantage."

REFERENCE           PLATFORM_DYK_MSG17
LANG_ENGLISH        "Defend your flags!  In the Domination game mode, holding marked objectives gives your team points.  The more objectives you hold, the more points you get."

REFERENCE           PLATFORM_DYK_MSG18
LANG_ENGLISH        "Watch those corners!  Be careful playing Search and Destroy - when you die you don't respawn."

REFERENCE           PLATFORM_DYK_MSG19
LANG_ENGLISH        "Escort the bomb!  Protect the bomb carrier in Sabotage.  It takes teamwork to get to the enemy objective."

REFERENCE           PLATFORM_DYK_MSG20
LANG_ENGLISH        "Call in radar!  You can earn radar for you and your team by getting 3 kills in a row without dying."

REFERENCE           PLATFORM_DYK_MSG21
LANG_ENGLISH        "Call in an airstrike!  Get 5 kills in a row without dying and you can call in an air strike on the position of your choice."

REFERENCE           PLATFORM_DYK_MSG22
LANG_ENGLISH        "Call in a chopper!  You can earn helicopter air support by getting 7 kills in a row without dying."

REFERENCE           PLATFORM_DYK_MSG23
LANG_ENGLISH        "Back to basics... The Old School game modes don't have classes.  Everyone starts with the same weapons and must pick up new weapons and perks in the level."

REFERENCE           PLATFORM_DYK_MSG24
LANG_ENGLISH        "Pick your shots!  When you fire a weapon WITHOUT a silencer, you appear as a red dot on your enemies' compass."

REFERENCE           PLATFORM_DYK_MSG25
LANG_ENGLISH        "Get quiet...  Using a silencer doesn't show your shots as a red dot on the enemy compass, but your weapon's range is reduced."

REFERENCE           PLATFORM_DYK_MSG26
LANG_ENGLISH        "Stealth technology.  Using the UAV Jammer perk will prevent you from showing as a red dot on the enemy compass."

REFERENCE           PLATFORM_DYK_MSG27
LANG_ENGLISH        "Grenades from a rifle mounted grenade launcher need to travel before they are armed.  They do damage if they hit your enemy, but only explode at a distance."

REFERENCE           PLATFORM_DYK_MSG28
LANG_ENGLISH        "Create your own game mode!  Start your own server and tweak game mode settings to whatever you like."

REFERENCE           PLATFORM_DYK_MSG29
LANG_ENGLISH        "Dominate with teamwork!  Domination flags capture faster with multiple teammates capturing together."

REFERENCE           PLATFORM_DYK_MSG30
LANG_ENGLISH        "Use your knife!  Melee the enemy with your knife for a fast and humiliating kill."

REFERENCE           PLATFORM_DYK_MSG31
LANG_ENGLISH        "Run faster!  Pressing sprint will allow you to run faster for a short amount of time, but you can't use your weapon."

REFERENCE           PLATFORM_DYK_MSG32
LANG_ENGLISH        "Hold your breath!  Hold your breath with scoped weapons for increased accuracy."

REFERENCE           PLATFORM_DYK_MSG33
LANG_ENGLISH        "Throw back grenades!  Look for the grenade throwback icon when a grenade is near you.  You can throw back the enemy's grenades."

REFERENCE           PLATFORM_DYK_MSG34
LANG_ENGLISH        "Shoot through walls!  Different weapons can fire through many different surfaces with reduced damage."

REFERENCE           PLATFORM_DYK_MSG35
LANG_ENGLISH        "Use your inventory!  Items like grenade launchers, RPGs, claymores, and C4 are stored in your inventory."

REFERENCE           PLATFORM_DYK_MSG36
LANG_ENGLISH        "Explosive shortcut!  Double tap the use key to detonate thrown C4 while using another weapon."

REFERENCE           PLATFORM_NOTSIGNEDINTOPROFILE
LANG_ENGLISH        "You have not chosen a profile yet."

REFERENCE           PLATFORM_UNEXPECTEDDOWNLOADMESSAGE
LANG_ENGLISH        "Unexpected www download message."

REFERENCE           PLATFORM_DOWNLOADDISCONNECTED
LANG_ENGLISH        "Client dropped to download files."

REFERENCE           PLATFORM_PRESS_TO_SAFESPAWN
LANG_ENGLISH        "[{+frag}] Safe Spawn"

REFERENCE           PLATFORM_RESUPPLY
LANG_ENGLISH        "[{+activate}] Resupply"

REFERENCE           PLATFORM_GET_SENTRY
LANG_ENGLISH        "[{+activate}]Sentry"

REFERENCE           PLATFORM_GET_AUTO_SHOT
LANG_ENGLISH        "[{+activate}]Auto_Shot"

REFERENCE           PLATFORM_GET_THUMPER
LANG_ENGLISH        "[{+activate}]Thumper"

REFERENCE           PLATFORM_GET_RANDOM
LANG_ENGLISH        "[{+activate}] Random Item"

REFERENCE           PLATFORM_VEH_BOOST
LANG_ENGLISH        "[Space] Boost"

REFERENCE           PLATFORM_VEH_BRAKE
LANG_ENGLISH        "[S] Reverse"

REFERENCE           PLATFORM_VEH_FIRE
LANG_ENGLISH        "[Left Mouse] Fire"

REFERENCE           PLATFORM_VEH_THROTTLE
LANG_ENGLISH        "[W] Throttle"

REFERENCE           PLATFORM_GET_KIT
LANG_ENGLISH        "[{+activate}] New kit"

REFERENCE           PLATFORM_REVIVE
LANG_ENGLISH        "[{+activate}] Revive player"

REFERENCE           PLATFORM_USEONLINESTATS_TRUE
LANG_ENGLISH        "IwNet Unlocks: On"

REFERENCE           PLATFORM_USEONLINESTATS_FALSE
LANG_ENGLISH        "IwNet Unlocks: Off"

REFERENCE           PLATFORM_FIND_GAME
LANG_ENGLISH        "Find Game"

REFERENCE           PLATFORM_DESC_FIND_GAME
LANG_ENGLISH        "Pick a game mode and quickly join a game online."

REFERENCE           PLATFORM_DESC_FIND_GAME_LOCKED
LANG_ENGLISH        "Only the party host can find games."

REFERENCE           PLATFORM_BACK_CAPS
LANG_ENGLISH        "BACK ^0- ^3ESC^7"

REFERENCE           PLATFORM_DETONATE
LANG_ENGLISH        "Press [{+activate}] to detonate"

REFERENCE           PLATFORM_GET_KILLSTREAK
LANG_ENGLISH        "[{+activate}] Killstreak"

REFERENCE           PLATFORM_USE_BUTTONMOVE_TO_POSITION
LANG_ENGLISH        "Use the mouse to position"

REFERENCE           PLATFORM_USE_BUTTONLOOK_TO_AIM
LANG_ENGLISH        "Hold ^3[Right Mouse]^7 to aim"

REFERENCE           PLATFORM_PRESS_BUTTON_TO_CONFIRM_TARGET
LANG_ENGLISH        "Press ^3[Left Mouse]^7 to confirm target"

REFERENCE           PLATFORM_PLAY_ONLINE_CAPS
LANG_ENGLISH        "PLAY"

REFERENCE           PLATFORM_SYSTEM_LINK_CAPS
LANG_ENGLISH        "LAN PARTY"

REFERENCE           PLATFORM_FIND_GAME_CAPS
LANG_ENGLISH        "FIND GAME"

REFERENCE           PLATFORM_SYSTEM_LINK_TITLE
LANG_ENGLISH        "LAN PARTY"

REFERENCE           PLATFORM_GAME_SUMMARY_CAPS
LANG_ENGLISH        "GAME SUMMARY ^0- ^3F1^7"

REFERENCE           PLATFORM_PREDATOR_MISSILE_AIM
LANG_ENGLISH        "Steer"

REFERENCE           PLATFORM_PREDATOR_MISSILE_BOOST
LANG_ENGLISH        "[{+attack}] Boost"

REFERENCE           PLATFORM_CONTINUE_CAPS
LANG_ENGLISH        "CONTINUE"

REFERENCE           PLATFORM_CLOSE_CAPS
LANG_ENGLISH        "CLOSE"

REFERENCE           PLATFORM_PRESS_TO_COPYCAT
LANG_ENGLISH        "Press^3 [{weapnext}] ^7 Steal their class!"

REFERENCE           PLATFORM_ACCEPT_INVITE
LANG_ENGLISH        "Accept Invite"

REFERENCE           PLATFORM_OFFENSIVE_NO_PANELTY
LANG_ENGLISH        "(You will not be penalized in terms of game completion.)"

REFERENCE           PLATFORM_DYK_IW4_MSG1
LANG_ENGLISH        "Complete Perk challenges to unlock upgraded Perks."

REFERENCE           PLATFORM_DYK_IW4_MSG2
LANG_ENGLISH        "Get Killstreak Rewards by getting consecutive kills without dying."

REFERENCE           PLATFORM_DYK_IW4_MSG3
LANG_ENGLISH        "Use weapon attachments to unlock special weapon attachments."

REFERENCE           PLATFORM_DYK_IW4_MSG4
LANG_ENGLISH        "Some killstreak rewards are controllable but leave you vulnerable on the ground."

REFERENCE           PLATFORM_DYK_IW4_MSG5
LANG_ENGLISH        "Check out all of your Accolades in the Barracks."

REFERENCE           PLATFORM_DYK_IW4_MSG6
LANG_ENGLISH        "Private Matches allow you to play with friends on a LAN or online."

REFERENCE           PLATFORM_DYK_IW4_MSG7
LANG_ENGLISH        "Swap out Frag grenades for Tactical Insertion, Blast Shield, and other equipment."

REFERENCE           PLATFORM_DYK_IW4_MSG8
LANG_ENGLISH        "Deathstreaks give you a boost when things aren't going your way."

REFERENCE           PLATFORM_DYK_IW4_MSG9
LANG_ENGLISH        "Bullets can ricochet off of Riot Shields and kill!"

REFERENCE           PLATFORM_DYK_IW4_MSG10
LANG_ENGLISH        "Edit your Callsign to show off Titles and Emblems you've earned."

REFERENCE           PLATFORM_DYK_IW4_MSG11
LANG_ENGLISH        "Scroll left and right on the Game Summary for more detailed info."

REFERENCE           PLATFORM_DYK_IW4_MSG12
LANG_ENGLISH        "Titles and Emblems you've earned don't reset after entering Prestige Mode."

REFERENCE           PLATFORM_DYK_IW4_MSG13
LANG_ENGLISH        "Shutting down mid-game will cause you to lose your Match Bonus."

REFERENCE           PLATFORM_DYK_IW4_MSG14
LANG_ENGLISH        "Care Package is an airdrop that awards a random killstreak reward or ammo."

REFERENCE           PLATFORM_DYK_IW4_MSG15
LANG_ENGLISH        "Tactical Insertion is a flare that marks where your next respawn will be."

REFERENCE           PLATFORM_DYK_IW4_MSG16
LANG_ENGLISH        "Destroy red flares to prevent an enemy Tactical Insertion."

REFERENCE           PLATFORM_DYK_IW4_MSG17
LANG_ENGLISH        "Semtex will stick to your enemy."

REFERENCE           PLATFORM_DYK_IW4_MSG18
LANG_ENGLISH        "Blast Shield increases your resistance to explosions but limits your view."

REFERENCE           PLATFORM_DYK_IW4_MSG19
LANG_ENGLISH        "Even when your Riot Shield is on your back it blocks bullets."

REFERENCE           PLATFORM_DYK_IW4_MSG20
LANG_ENGLISH        "The Heartbeat Sensor attachment detects enemies that are close by."

REFERENCE           PLATFORM_DYK_IW4_MSG21
LANG_ENGLISH        "The Cold-Blooded perk makes you invisible to thermal vision, UAV, and enemy air support."

REFERENCE           PLATFORM_DYK_IW4_MSG22
LANG_ENGLISH        "Hardline makes killstreak rewards require 1 less kill."

REFERENCE           PLATFORM_DYK_IW4_MSG23
LANG_ENGLISH        "You can crawl while in Last Stand."

REFERENCE           PLATFORM_DYK_IW4_MSG24
LANG_ENGLISH        "Crouch with the Riot Shield to protect your feet."

REFERENCE           PLATFORM_DYK_IW4_MSG25
LANG_ENGLISH        "The Painkiller Deathstreak gives you extra protection when you respawn."

REFERENCE           PLATFORM_DYK_IW4_MSG26
LANG_ENGLISH        "Point your Riot Shield directly at the person shooting you for maximum effectiveness."

REFERENCE           PLATFORM_DYK_IW4_MSG27
LANG_ENGLISH        "Sentry Guns can be temporarily disabled by using Flashbangs or Stun Grenades on them."

REFERENCE           PLATFORM_DYK_IW4_MSG28
LANG_ENGLISH        "The Predator Missile lets you control a missile fired from above."

REFERENCE           PLATFORM_DYK_IW4_MSG29
LANG_ENGLISH        "Crouch with the Riot Shield to cover your feet and get maximum protection."

REFERENCE           PLATFORM_DYK_IW4_MSG30
LANG_ENGLISH        "Killstreak Rewards are unlocked in the order you choose."

REFERENCE           PLATFORM_DYK_IW4_MSG31
LANG_ENGLISH        "3rd Person modes allow you to experience tactical gameplay from an over the shoulder perspective."

REFERENCE           PLATFORM_DYK_IW4_MSG32
LANG_ENGLISH        "The default Classes contain items unlocked at later levels, giving you a preview of things to come."

REFERENCE           PLATFORM_DYK_IW4_MSG33
LANG_ENGLISH        "The Scavenger Perk lets you resupply your loadout by taking it from fallen foes."

REFERENCE           PLATFORM_DYK_IW4_MSG34
LANG_ENGLISH        "Steal your killer's loadout during killcam with the Copycat Deathstreak."

REFERENCE           PLATFORM_DYK_IW4_MSG35
LANG_ENGLISH        "The Tactical Knife attachment for Handguns speeds up your melee."

REFERENCE           PLATFORM_DYK_IW4_MSG36
LANG_ENGLISH        "The Bling Perk allows you to have 2 attachments on your primary weapon."

REFERENCE           PLATFORM_CALL_NUKE
LANG_ENGLISH        "Press and hold ^3&&1^7 for Nuclear Strike."

REFERENCE           PLATFORM_DYK_IW4_MSG37
LANG_ENGLISH        "Survive a Final Stand bleedout and you stand back up."

REFERENCE           PLATFORM_DYK_IW4_MSG38
LANG_ENGLISH        "Killstreak Rewards attained from airdrop crates do not count towards your killstreak count."

REFERENCE           PLATFORM_DYK_IW4_MSG39
LANG_ENGLISH        "Akimbo weapons give you more firepower but restrict your ability to aim down the sight."

REFERENCE           PLATFORM_CHANGE_PROFILE_CAPS
LANG_ENGLISH        "CHANGE PROFILE"

REFERENCE           PLATFORM_UNLOCK_KILLSTREAK
LANG_ENGLISH        "Click to unlock killstreak."

REFERENCE           PLATFORM_VIEW_CHALLENGES
LANG_ENGLISH        "^3F2^0-^7 View Challenges"

REFERENCE           PLATFORM_STEAM_AUTH_DENIED
LANG_ENGLISH        "Steam authorization failed."

REFERENCE           PLATFORM_STEAM_KICK_CHEAT
LANG_ENGLISH        "Cheat detected."

REFERENCE           PLATFORM_STEAM_CONNECT_FAIL
LANG_ENGLISH        "Steam connect failed."

REFERENCE           PLATFORM_VIEW_CHALLENGE_DETAILS
LANG_ENGLISH        "^3F2^0-^7 Challenge Details"

REFERENCE           PLATFORM_STEAM_JOIN_FAIL
LANG_ENGLISH        "Failed to join Steam lobby."

REFERENCE           PLATFORM_JOIN_FRIEND_FAILED
LANG_ENGLISH        "Failed to join friend's game."

REFERENCE           PLATFORM_POPUP_CONNECTION
LANG_ENGLISH        "Connecting to IWNet"

REFERENCE           PLATFORM_STEAM_OFFLINE
LANG_ENGLISH        "Must be signed in to Steam in Online mode to play."

REFERENCE           PLATFORM_STEAM_DISCONNECTED
LANG_ENGLISH        "Disconnected from Steam."

REFERENCE           MP_CANT_CAPTURE_FLAG
LANG_ENGLISH        "You can only capture the flags marked on your compass."

REFERENCE           MP_KILLCAM
LANG_ENGLISH        "KILLCAM"

REFERENCE           MP_ROUNDCAM
LANG_ENGLISH        "ROUNDCAM"

REFERENCE           MP_STARTING_NEW_ROUND
LANG_ENGLISH        "Starting new round..."

REFERENCE           MP_PRESS_ATTACK_TO_SKIP
LANG_ENGLISH        "Press Attack to skip"

REFERENCE           MP_PRESS_USE_TO_SKIP
LANG_ENGLISH        "Press Use to skip"

REFERENCE           MP_PRESS_ATTACK_TO_RESPAWN
LANG_ENGLISH        "Press Attack to respawn"

REFERENCE           MP_PRESS_USE_TO_RESPAWN
LANG_ENGLISH        "Press Use to respawn"

REFERENCE           MP_PRESS_ACTIVATE_TO_RESPAWN
LANG_ENGLISH        "Press ^3[{+activate}]^7 to respawn"

REFERENCE           MP_PRESS_ACTIVATE_TO_SKIP
LANG_ENGLISH        "Press ^3[{+activate}]^7 to skip"

REFERENCE           MP_PRESS_USERELOAD_TO_RESPAWN
LANG_ENGLISH        "Press ^3[{+usereload}]^7 to respawn"

REFERENCE           MP_PRESS_USERELOAD_TO_SKIP
LANG_ENGLISH        "Press ^3[{+usereload}]^7 to skip"

REFERENCE           MP_CONNECTED
LANG_ENGLISH        "&&1 Connected"

REFERENCE           MP_DISCONNECTED
LANG_ENGLISH        "&&1 Disconnected"

REFERENCE           MP_SCORE_LIMIT_REACHED
LANG_ENGLISH        "Score limit reached"

REFERENCE           MP_ROUND_LIMIT_REACHED
LANG_ENGLISH        "Round limit reached"

REFERENCE           MP_TIME_LIMIT_REACHED
LANG_ENGLISH        "Time limit reached"

REFERENCE           MP_WINS
LANG_ENGLISH        "&&1 Wins!"

REFERENCE           MP_TIE
LANG_ENGLISH        "The game is a tie!"

REFERENCE           MP_MATCH_TIE
LANG_ENGLISH        "The match is a tie!"

REFERENCE           MP_FRIENDLY_FIRE_WILL_NOT
LANG_ENGLISH        "Friendly fire will not be tolerated!"

REFERENCE           MP_AUTOBALANCE_NEXT_ROUND
LANG_ENGLISH        "Teams will be auto-balanced next round"

REFERENCE           MP_AUTOBALANCE_SECONDS
LANG_ENGLISH        "Teams will be auto-balanced in &&1 seconds"

REFERENCE           MP_AUTOBALANCE_NOW
LANG_ENGLISH        "Auto-balancing teams"

REFERENCE           MP_VOTE_CALLED
LANG_ENGLISH        "Vote Called:  "

REFERENCE           MP_VOTE_YES
LANG_ENGLISH        "(F1) Yes:  "

REFERENCE           MP_VOTE_NO
LANG_ENGLISH        "(F2)  No:  "

REFERENCE           MP_NEUTRAL
LANG_ENGLISH        "Neutral:  "

REFERENCE           MP_VOTE_MAPRESTART
LANG_ENGLISH        "Map Restart"

REFERENCE           MP_VOTE_NEXTMAP
LANG_ENGLISH        "Next Map"

REFERENCE           MP_PERCENT
LANG_ENGLISH        " - &&1%"

REFERENCE           MP_CALLEDAVOTE
LANG_ENGLISH        "&&1 called a vote."

REFERENCE           MP_VOTECAST
LANG_ENGLISH        "Vote cast."

REFERENCE           MP_VOTEPASSED
LANG_ENGLISH        "Vote passed."

REFERENCE           MP_VOTEFAILED
LANG_ENGLISH        "Vote failed."

REFERENCE           MP_NOSPECTATORCALLVOTE
LANG_ENGLISH        "Not allowed to call a vote as spectator."

REFERENCE           MP_NOSPECTATORVOTE
LANG_ENGLISH        "Not allowed to vote as spectator."

REFERENCE           MP_NOVOTEINPROGRESS
LANG_ENGLISH        "No vote in progress."

REFERENCE           MP_VOTEALREADYINPROGRESS
LANG_ENGLISH        "A vote is already in progress."

REFERENCE           MP_MAXVOTESCALLED
LANG_ENGLISH        "You have called the maximum number of votes."

REFERENCE           MP_INVALIDGAMETYPE
LANG_ENGLISH        "Invalid gametype."

REFERENCE           MP_INVALIDVOTESTRING
LANG_ENGLISH        "Invalid vote string."

REFERENCE           MP_VOTECOMMANDS
LANG_ENGLISH        "Vote commands: map_restart, map_rotate, map <mapname>, g_gametype <typename>, typemap <typename> <mapname>, kick <player>, clientkick <clientnum>, tempBanUser <player>, tempBanClient <clientNum>"

REFERENCE           MP_VOTE_CHANGEMAP
LANG_ENGLISH        "Change Map: &&1"

REFERENCE           MP_VOTE_GAMETYPE
LANG_ENGLISH        "Game Type: &&1"

REFERENCE           MP_VOTE_KICK
LANG_ENGLISH        "Kick Player: &&1"

REFERENCE           MP_VOTE_TEMPBAN
LANG_ENGLISH        "Temporarily Ban Player: &&1"

REFERENCE           MP_THE_SERVER_DOES_NOT_HAVE
LANG_ENGLISH        "The server does not have that map."

REFERENCE           MP_UNKNOWN
LANG_ENGLISH        "Unknown"

REFERENCE           MP_UNKNOWN_PLAYER
LANG_ENGLISH        "Unknown Player"

REFERENCE           MP_X2
LANG_ENGLISH        "x2"

REFERENCE           MP_X3
LANG_ENGLISH        "x3"

REFERENCE           MP_PLUS
LANG_ENGLISH        "+"

REFERENCE           MP_MINUS
LANG_ENGLISH        "-"

REFERENCE           MP_PLUS_AMOUNT
LANG_ENGLISH        "+%s"

REFERENCE           MP_MINUS_AMOUNT
LANG_ENGLISH        "-%s"

REFERENCE           MP_SLASH
LANG_ENGLISH        "/"

REFERENCE           MP_EMPTY
LANG_ENGLISH        "%s"

REFERENCE           MP_TEAMBALANCE_NOTIFICATION_MARINES
LANG_ENGLISH        "You were moved to Marines to balance the teams"

REFERENCE           MP_TEAMBALANCE_NOTIFICATION_SAS
LANG_ENGLISH        "You were moved to SAS to balance the teams"

REFERENCE           MP_TEAMBALANCE_NOTIFICATION_OPFOR
LANG_ENGLISH        "You were moved to OpFor to balance the teams"

REFERENCE           MP_TEAMBALANCE_NOTIFICATION_SPETSNAZ
LANG_ENGLISH        "You were moved to Spetsnaz to balance the teams"

REFERENCE           MP_CANTJOINTEAM
LANG_ENGLISH        "Changing teams would result in an unbalanced number of players on that team."

REFERENCE           MP_CTF_OBJ_TEXT
LANG_ENGLISH        "Gain points by stealing the enemy flag and then touching your flag at your base. First team with &&1 captures wins."

REFERENCE           MP_CTF_OBJ_TEXT_NOSCORE
LANG_ENGLISH        "Gain points by stealing the enemy flag and then touching your flag at your base."

REFERENCE           MP_OBJ_TEXT
LANG_ENGLISH        "Gain points by capturing and defending neutral HQs for 2 minutes or by destroying enemy HQs. First team to &&1 points wins."

REFERENCE           MP_OBJ_TEXT_NOSCORE
LANG_ENGLISH        "Gain points by capturing and defending neutral HQs for 2 minutes or by destroying enemy HQs."

REFERENCE           MP_OBJ_DM_ELIMINATE_OTHERS_SCORE
LANG_ENGLISH        "Gain points by eliminating other players. First player to &&1 points wins."

REFERENCE           MP_OBJ_DM_ELIMINATE_OTHERS
LANG_ENGLISH        "Gain points by eliminating other players."

REFERENCE           MP_OBJ_DM_HINT
LANG_ENGLISH        "Eliminate other players."

REFERENCE           MP_OBJ_WAR_ELIMINATE_ENEMIES_SCORE
LANG_ENGLISH        "Gain points by eliminating enemy players. First team to &&1 points wins."

REFERENCE           MP_OBJ_WAR_ELIMINATE_ENEMIES
LANG_ENGLISH        "Gain points by eliminating enemy players."

REFERENCE           MP_OBJ_WAR_HINT
LANG_ENGLISH        "Eliminate enemy players."

REFERENCE           MP_REINFORCEMENTS
LANG_ENGLISH        "Reinforcements spawn in &&1 seconds"

REFERENCE           MP_REINFORCEMENTS_HUD
LANG_ENGLISH        "Reinforcements: &&1"

REFERENCE           MP_INSTANT
LANG_ENGLISH        "instant"

REFERENCE           MP_LOSING_HQ
LANG_ENGLISH        "Losing HQ!"

REFERENCE           MP_MAXHOLDTIME_MINUTESANDSECONDS
LANG_ENGLISH        "&&1 held the radio for the maximum time of &&2 minutes &&3 seconds!"

REFERENCE           MP_MAXHOLDTIME_MINUTES
LANG_ENGLISH        "&&1 successfully defended the HQ!"

REFERENCE           MP_MAXHOLDTIME_SECONDS
LANG_ENGLISH        "&&1 held the radio for the maximum time of &&2 seconds!"

REFERENCE           MP_MAXHOLDTIME_ALLIES
LANG_ENGLISH        "Allies held the radio for the maximum time of &&1 minutes!"

REFERENCE           MP_MAXHOLDTIME_AXIS
LANG_ENGLISH        "Axis held the radio for the maximum time of &&1 minutes!"

REFERENCE           MP_TIME_TILL_SPAWN
LANG_ENGLISH        "Spawn in "

REFERENCE           MP_RESPAWN_WHEN_RADIO_NEUTRALIZED
LANG_ENGLISH        "Dead until HQ neutralized"

REFERENCE           MP_MATCHSTARTING
LANG_ENGLISH        "Match starting"

REFERENCE           MP_MATCHRESUMING
LANG_ENGLISH        "Match resuming"

REFERENCE           MP_ROUNDDRAW
LANG_ENGLISH        "Round draw"

REFERENCE           MP_ENEMIES_ELIMINATED
LANG_ENGLISH        "Enemies have been eliminated"

REFERENCE           MP_BOMB_DEFUSED
LANG_ENGLISH        "Bomb defused"

REFERENCE           MP_TARGET_DESTROYED
LANG_ENGLISH        "Target destroyed"

REFERENCE           MP_TIME_EXPIRED
LANG_ENGLISH        "Time has expired"

REFERENCE           MP_PLANTING_EXPLOSIVE
LANG_ENGLISH        "Planting..."

REFERENCE           MP_DEFUSING_EXPLOSIVE
LANG_ENGLISH        "Defusing..."

REFERENCE           MP_EXPLOSIVESPLANTED
LANG_ENGLISH        "Explosives planted"

REFERENCE           MP_EXPLOSIVES_PLANTED
LANG_ENGLISH        "The enemy planted the explosives!"

REFERENCE           MP_EXPLOSIVES_PLANTED_BY
LANG_ENGLISH        "&&1 planted the explosives!"

REFERENCE           MP_EXPLOSIVES_DEFUSED_BY
LANG_ENGLISH        "&&1 defused the explosives!"

REFERENCE           MP_EXPLOSIVES_RECOVERED_BY
LANG_ENGLISH        "&&1 recovered the explosives!"

REFERENCE           MP_EXPLOSIVES_DROPPED_BY
LANG_ENGLISH        "&&1 dropped the explosives!"

REFERENCE           MP_EXPLOSIVESDEFUSED
LANG_ENGLISH        "Explosives defused"

REFERENCE           MP_OBJ_ATTACKERS
LANG_ENGLISH        "Destroy target A or B by planting explosives at either location. First team to &&1 points wins."

REFERENCE           MP_OBJ_ATTACKERS_NOSCORE
LANG_ENGLISH        "Destroy target A or B by planting explosives at either location."

REFERENCE           MP_OBJ_DEFENDERS
LANG_ENGLISH        "Protect target A and B from being destroyed. If explosives are planted at either location, defuse them before they explode. First team to &&1 points wins."

REFERENCE           MP_OBJ_DEFENDERS_NOSCORE
LANG_ENGLISH        "Protect target A and B from being destroyed. If explosives are planted at either location, defuse them before they explode."

REFERENCE           MP_ALLIESOBJECTIVEHELD
LANG_ENGLISH        "Marines have held the objective"

REFERENCE           MP_AXISOBJECTIVEHELD
LANG_ENGLISH        "OpFor have held the objective."

REFERENCE           MP_ALLIESOBJECTIVECAPTURED
LANG_ENGLISH        "Marines have captured the objective"

REFERENCE           MP_AXISOBJECTIVECAPTURED
LANG_ENGLISH        "OpFor have captured the objective."

REFERENCE           MP_ALLIES_WIN_MATCH
LANG_ENGLISH        "Marines have won the match!"

REFERENCE           MP_CAPTURING_OBJECTIVE
LANG_ENGLISH        "Capturing objective..."

REFERENCE           MP_ENEMY_CAPTURING_OBJECTIVE
LANG_ENGLISH        "The enemy is capturing the objective!"

REFERENCE           MP_ALLIED_ATTACK
LANG_ENGLISH        "Attack the OpFor-held objective!"

REFERENCE           MP_ALLIED_DEFEND
LANG_ENGLISH        "Defend the objective from OpFor attack!"

REFERENCE           MP_AXIS_ATTACK
LANG_ENGLISH        "Attack the Marines-held objective!"

REFERENCE           MP_AXIS_DEFEND
LANG_ENGLISH        "Defend the objective from the Marines attack!"

REFERENCE           MP_WAITING_FOR_TEAMS
LANG_ENGLISH        "Waiting for teams to be ready..."

REFERENCE           MP_MATCH_STARTING
LANG_ENGLISH        "Match starting"

REFERENCE           MP_MATCH_STARTING_IN
LANG_ENGLISH        "Match begins in: "

REFERENCE           MP_MATCH_RESUMING_IN
LANG_ENGLISH        "Match resumes in: "

REFERENCE           MP_WAITING_MATCH
LANG_ENGLISH        "Waiting for match to begin..."

REFERENCE           MP_IS_PLATOON_LEADER
LANG_ENGLISH        "%s is your team's platoon leader."

REFERENCE           MP_LEFT_PLAYS
LANG_ENGLISH        "Left Plays"

REFERENCE           MP_MIDDLE_PLAYS
LANG_ENGLISH        "Middle Plays"

REFERENCE           MP_RIGHT_PLAYS
LANG_ENGLISH        "Right Plays"

REFERENCE           MP_ALL_PLAYS
LANG_ENGLISH        "All Plays"

REFERENCE           MP_PREV_PLAY
LANG_ENGLISH        "Previous Play"

REFERENCE           MP_NEXT_PLAY
LANG_ENGLISH        "Next Play"

REFERENCE           MP_THIS_PLAY
LANG_ENGLISH        "Pick This Play"

REFERENCE           MP_EDIT_PLAY
LANG_ENGLISH        "Edit Play"

REFERENCE           MP_NEW_PLAY
LANG_ENGLISH        "New Play"

REFERENCE           MP_NEW_LEFT_PLAY
LANG_ENGLISH        "New Left Play"

REFERENCE           MP_NEW_MIDDLE_PLAY
LANG_ENGLISH        "New Middle Play"

REFERENCE           MP_NEW_RIGHT_PLAY
LANG_ENGLISH        "New Right Play"

REFERENCE           MP_CANCEL_NEW_PLAY
LANG_ENGLISH        "Cancel New Play"

REFERENCE           MP_NEXT_SQUAD
LANG_ENGLISH        "Next Squad"

REFERENCE           MP_PREV_SQUAD
LANG_ENGLISH        "Previous Squad"

REFERENCE           MP_ADD_SQUAD
LANG_ENGLISH        "Add Squad"

REFERENCE           MP_DELETE_SQUAD
LANG_ENGLISH        "Delete Squad"

REFERENCE           MP_DELETE_YES
LANG_ENGLISH        "Confirm Delete"

REFERENCE           MP_DELETE_NO
LANG_ENGLISH        "Cancel Delete"

REFERENCE           MP_SAVE_PLAY
LANG_ENGLISH        "Save Play"

REFERENCE           MP_PLACE_WAYPOINTS
LANG_ENGLISH        "Place Waypoints"

REFERENCE           MP_1_PLACE_WAYPOINT
LANG_ENGLISH        "1. Place Move Waypoint"

REFERENCE           MP_2_PLACE_WAYPOINT_RALLY_POINT
LANG_ENGLISH        "2. Place Rally Waypoint"

REFERENCE           MP_2_PLACE_WAYPOINT_DEFEND_POINT
LANG_ENGLISH        "2. Place Defend Waypoint"

REFERENCE           MP_3_DELETE_LAST_WAYPOINT
LANG_ENGLISH        "3. Delete Last Waypoint"

REFERENCE           MP_4_PREV_SQUAD
LANG_ENGLISH        "4. Previous Squad"

REFERENCE           MP_5_NEXT_SQUAD
LANG_ENGLISH        "5. Next Squad"

REFERENCE           MP_6_DISCARD_PLAY_CHANGES
LANG_ENGLISH        "6. Discard Play Changes"

REFERENCE           MP_7_SAVE_PLAY_CHANGES
LANG_ENGLISH        "7. Save Play Changes"

REFERENCE           MP_RETURN_EDITOR
LANG_ENGLISH        "Back to Mission List"

REFERENCE           MP_PLAY_TYPE
LANG_ENGLISH        "Choose Play Type"

REFERENCE           MP_ATTACK_PLAY
LANG_ENGLISH        "Attack Play"

REFERENCE           MP_DEFEND_PLAY
LANG_ENGLISH        "Defend Play"

REFERENCE           MP_TEAM_TYPE
LANG_ENGLISH        "Choose Team Type"

REFERENCE           MP_UPTEAM
LANG_ENGLISH        "Marines"

REFERENCE           MP_DOWNTEAM
LANG_ENGLISH        "OpFor"

REFERENCE           MP_CHOOSE_OBJ
LANG_ENGLISH        "Choose Objective"

REFERENCE           MP_PREV_OBJ
LANG_ENGLISH        "Previous Objective"

REFERENCE           MP_NEXT_OBJ
LANG_ENGLISH        "Next Objective"

REFERENCE           MP_THIS_OBJ
LANG_ENGLISH        "This Objective"

REFERENCE           MP_NO_DEFEND_PLAYS_FOUND
LANG_ENGLISH        "No defensive plays found"

REFERENCE           MP_NO_ATTACK_PLAYS_FOUND
LANG_ENGLISH        "No offensive plays found"

REFERENCE           MP_LEFT_SQUAD
LANG_ENGLISH        "Left Flank"

REFERENCE           MP_MIDDLE_SQUAD
LANG_ENGLISH        "Frontal Attack"

REFERENCE           MP_RIGHT_SQUAD
LANG_ENGLISH        "Right Flank"

REFERENCE           MP_ONE_SQUAD
LANG_ENGLISH        "One Squad"

REFERENCE           MP_TWO_SQUADS
LANG_ENGLISH        "Two Squads"

REFERENCE           MP_THREE_SQUADS
LANG_ENGLISH        "Three Squads"

REFERENCE           MP_LEFT_MIDDLE
LANG_ENGLISH        "Left Middle"

REFERENCE           MP_PINCER
LANG_ENGLISH        "Pincer"

REFERENCE           MP_RIGHT_MIDDLE
LANG_ENGLISH        "Right Middle"

REFERENCE           MP_RALLY_REACHED
LANG_ENGLISH        "Rally Point Reached"

REFERENCE           MP_DEFEND_AREA
LANG_ENGLISH        "Defend This Area"

REFERENCE           MP_BACK
LANG_ENGLISH        "Back"

REFERENCE           MP_CLOSE
LANG_ENGLISH        "Close"

REFERENCE           MP_WAITING_RESUME
LANG_ENGLISH        "Waiting for Players to Resume Match"

REFERENCE           MP_CANT_SWITCH
LANG_ENGLISH        "Can't Switch Teams Until Round Starts"

REFERENCE           MP_JOINED_AUTO
LANG_ENGLISH        "%s Will Be Assigned A Squad At Mission Start"

REFERENCE           MP_YOU_WILL_JOIN_SQUAD_ONE_NEXT_ROUND
LANG_ENGLISH        "You Will Join Squad One Next Round"

REFERENCE           MP_YOU_WILL_JOIN_SQUAD_TWO_NEXT_ROUND
LANG_ENGLISH        "You Will Join Squad Two Next Round"

REFERENCE           MP_YOU_WILL_BE_AUTOASSIGNED_NEXT_ROUND
LANG_ENGLISH        "You Will Be Autoassigned A Squad Next Round"

REFERENCE           MP_JOINED_ONE
LANG_ENGLISH        "%s Joined Squad One"

REFERENCE           MP_JOINED_TWO
LANG_ENGLISH        "%s Joined Squad Two"

REFERENCE           MP_RANK_REQUIRED
LANG_ENGLISH        "That Weapon Requires A Rank Of %s"

REFERENCE           MP_PLAYER_TOGGLE_MUTE
LANG_ENGLISH        "Toggle Mute"

REFERENCE           MP_MUTED
LANG_ENGLISH        "Muted"

REFERENCE           MP_CAPTURE_AND_HOLD_FLAG
LANG_ENGLISH        "Capture and hold the flag to score points. The first player to &&1 points wins."

REFERENCE           MP_CAPTURE_AND_HOLD_FLAG_NOSCORE
LANG_ENGLISH        "Capture and hold the flag to score points."

REFERENCE           MP_ESTABLISH_AND_DEFEND
LANG_ENGLISH        "Establish and defend your Headquarters."

REFERENCE           MP_CAPTURE_THE_ENEMY_FLAG
LANG_ENGLISH        "Capture the enemy flag."

REFERENCE           MP_DESTROY_THE_OBJECTIVE
LANG_ENGLISH        "Destroy the objective."

REFERENCE           MP_DEFEND_THE_OBJECTIVE
LANG_ENGLISH        "Defend the objective."

REFERENCE           MP_ELIMINATE_ENEMIES
LANG_ENGLISH        "Eliminate enemies."

REFERENCE           MP_ELIMINATE_THE_ENEMY
LANG_ENGLISH        "Eliminate the enemy."

REFERENCE           MP_ENEMY_FLAG_CAPTURED
LANG_ENGLISH        "Enemy flag captured!"

REFERENCE           MP_YOUR_FLAG_WAS_CAPTURED
LANG_ENGLISH        "Your flag was captured"

REFERENCE           MP_YOUR_FLAG_WAS_RETURNED
LANG_ENGLISH        "Your flag was returned"

REFERENCE           MP_YOUR_FLAG_WAS_TAKEN
LANG_ENGLISH        "Your flag was taken!"

REFERENCE           MP_ENEMY_FLAG_TAKEN
LANG_ENGLISH        "Enemy flag taken!"

REFERENCE           MP_RADIOS_SPAWN_IN_SECONDS
LANG_ENGLISH        "Radios spawn in &&1 seconds"

REFERENCE           MP_KILL
LANG_ENGLISH        "Kill"

REFERENCE           MP_HEADSHOT
LANG_ENGLISH        "Headshot"

REFERENCE           MP_ASSIST
LANG_ENGLISH        "Assist"

REFERENCE           MP_DEFUSE
LANG_ENGLISH        "Defuse"

REFERENCE           MP_DEFEND
LANG_ENGLISH        "Defend"

REFERENCE           MP_CAPTURE
LANG_ENGLISH        "Capture"

REFERENCE           MP_WIN
LANG_ENGLISH        "Win"

REFERENCE           MP_LOSS
LANG_ENGLISH        "Loss"

REFERENCE           MP_TEAMKILL
LANG_ENGLISH        "Team Kill"

REFERENCE           MP_SUICIDE
LANG_ENGLISH        "Suicide"

REFERENCE           MP_KILL_PREFIX
LANG_ENGLISH        "Kill: "

REFERENCE           MP_HEADSHOT_PREFIX
LANG_ENGLISH        "Headshot: "

REFERENCE           MP_ASSIST_PREFIX
LANG_ENGLISH        "Assist: "

REFERENCE           MP_DEFUSE_PREFIX
LANG_ENGLISH        "Defuse: "

REFERENCE           MP_DEFEND_PREFIX
LANG_ENGLISH        "Defend: "

REFERENCE           MP_CAPTURE_PREFIX
LANG_ENGLISH        "Capture: "

REFERENCE           MP_WIN_PREFIX
LANG_ENGLISH        "Win: "

REFERENCE           MP_LOSS_PREFIX
LANG_ENGLISH        "Loss: "

REFERENCE           MP_TEAMKILL_PREFIX
LANG_ENGLISH        "Team Kill: "

REFERENCE           MP_SUICIDE_PREFIX
LANG_ENGLISH        "Suicide: "

REFERENCE           MP_PTS
LANG_ENGLISH        "pts"

REFERENCE           MP_1ST
LANG_ENGLISH        "1st"

REFERENCE           MP_2ND
LANG_ENGLISH        "2nd"

REFERENCE           MP_3RD
LANG_ENGLISH        "3rd"

REFERENCE           MP_4TH
LANG_ENGLISH        "4th"

REFERENCE           MP_5TH
LANG_ENGLISH        "5th"

REFERENCE           MP_6TH
LANG_ENGLISH        "6th"

REFERENCE           MP_7TH
LANG_ENGLISH        "7th"

REFERENCE           MP_8TH
LANG_ENGLISH        "8th"

REFERENCE           MP_9TH
LANG_ENGLISH        "9th"

REFERENCE           MP_10TH
LANG_ENGLISH        "10th"

REFERENCE           MP_11TH
LANG_ENGLISH        "11th"

REFERENCE           MP_12TH
LANG_ENGLISH        "12th"

REFERENCE           MP_13TH
LANG_ENGLISH        "13th"

REFERENCE           MP_14TH
LANG_ENGLISH        "14th"

REFERENCE           MP_15TH
LANG_ENGLISH        "15th"

REFERENCE           MP_16TH
LANG_ENGLISH        "16th"

REFERENCE           MP_17TH
LANG_ENGLISH        "17th"

REFERENCE           MP_18TH
LANG_ENGLISH        "18th"

REFERENCE           MP_19TH
LANG_ENGLISH        "19th"

REFERENCE           MP_20TH
LANG_ENGLISH        "20th"

REFERENCE           MP_21ST
LANG_ENGLISH        "21st"

REFERENCE           MP_22ND
LANG_ENGLISH        "22nd"

REFERENCE           MP_23RD
LANG_ENGLISH        "23RD"

REFERENCE           MP_24TH
LANG_ENGLISH        "24th"

REFERENCE           MP_ST
LANG_ENGLISH        "st"

REFERENCE           MP_ND
LANG_ENGLISH        "nd"

REFERENCE           MP_RD
LANG_ENGLISH        "rd"

REFERENCE           MP_TH
LANG_ENGLISH        "th"

REFERENCE           MP_BOMB_HAS_BEEN_DROPPED
LANG_ENGLISH        "The bomb has been dropped!"

REFERENCE           MP_YOU_HAVE_RECOVERED_THE_BOMB
LANG_ENGLISH        "You have recovered the bomb."

REFERENCE           MP_ENEMY_HAS_TAKEN_THE_BOMB
LANG_ENGLISH        "The enemy has taken the bomb."

REFERENCE           MP_YOUR_TEAM_HAS_RECOVERED_THE_BOMB
LANG_ENGLISH        "Your team has recovered the bomb."

REFERENCE           MP_BOMB_HAS_BEEN_RECOVERED
LANG_ENGLISH        "The bomb has been recovered."

REFERENCE           MP_CANT_PLANT_WITHOUT_BOMB
LANG_ENGLISH        "You must have the bomb to plant."

REFERENCE           MP_C4_HOLDING_DETONATOR
LANG_ENGLISH        "^1(Holding Detonator)"

REFERENCE           MP_C4_HOLDING_C4
LANG_ENGLISH        "^5(Holding C4)"

REFERENCE           MP_C4_PRESS_TO_SWITCH_TO_C4
LANG_ENGLISH        "(Press Use to switch to C4)"

REFERENCE           MP_C4_PRESS_TO_SWITCH_TO_DETONATOR
LANG_ENGLISH        "(Press Use to switch to Detonator)"

REFERENCE           MP_C4_PRESS_LEFT_TRIGGER_TO_DETONATE
LANG_ENGLISH        "Press left trigger to detonate"

REFERENCE           MP_CLAYMORE_HOLDING_DETONATOR
LANG_ENGLISH        "^1(Holding Detonator)"

REFERENCE           MP_CLAYMORE_HOLDING_CLAYMORE
LANG_ENGLISH        "^5(Holding Claymore)"

REFERENCE           MP_CLAYMORE_PRESS_TO_SWITCH_TO_CLAYMORE
LANG_ENGLISH        "(Press Use to switch to claymore)"

REFERENCE           MP_CLAYMORE_PRESS_TO_SWITCH_TO_DETONATOR
LANG_ENGLISH        "(Press Use to switch to Detonator)"

REFERENCE           MP_PLANTING_CLAYMORE
LANG_ENGLISH        "Planting claymore..."

REFERENCE           MP_CANNOT_PLANT_CLAYMORE
LANG_ENGLISH        "Can't plant claymore here"

REFERENCE           MP_ORIGINALMAPS
LANG_ENGLISH        "Original Maps"

REFERENCE           MP_MISSINGMAP
LANG_ENGLISH        "You do not have this map.  You can get this map by downloading map packs from Xbox Live Marketplace."

REFERENCE           MP_SMALLGAME_SHORT
LANG_ENGLISH        "8 Players"

REFERENCE           MP_BIGGAME_SHORT
LANG_ENGLISH        "16 Players"

REFERENCE           MP_ANYGAMESIZE
LANG_ENGLISH        "Any Size"

REFERENCE           MP_SEARCHING_FOR_LOBBY_OF_TYPE_ORIGINAL
LANG_ENGLISH        "Searching for lobbies running original maps"

REFERENCE           MP_HOST_CHANGING_SETTINGS
LANG_ENGLISH        "Host is changing game settings"

REFERENCE           MP_CAPTURING_FLAG
LANG_ENGLISH        "Capturing Flag"

REFERENCE           MP_RETURNING_FLAG
LANG_ENGLISH        "Returning Flag"

REFERENCE           MP_LOSING_FLAG
LANG_ENGLISH        "Losing Flag!"

REFERENCE           MP_LOSING_LAST_FLAG
LANG_ENGLISH        "Losing last flag!"

REFERENCE           MP_PIPEBOMB_HOLDING_PIPEBOMB
LANG_ENGLISH        "^5(Holding Pipe Bomb)"

REFERENCE           MP_PIPEBOMB_HOLDING_DETONATOR
LANG_ENGLISH        "^1(Holding Detonator)"

REFERENCE           MP_PIPEBOMB_PRESS_TO_SWITCH_TO_PIPEBOMB
LANG_ENGLISH        "(Press Use to switch to Pipe Bomb)"

REFERENCE           MP_PIPEBOMB_PRESS_TO_SWITCH_TO_DETONATOR
LANG_ENGLISH        "(Press Use to switch to Detonator)"

REFERENCE           MP_IED_HOLDING_IED
LANG_ENGLISH        "^5(Holding IED)"

REFERENCE           MP_PLANTING_IED
LANG_ENGLISH        "Planting IED..."

REFERENCE           MP_CANNOT_PLANT_IED
LANG_ENGLISH        "Can't plant IED here"

REFERENCE           MP_ALLIES_WIN_ROUND
LANG_ENGLISH        "Marines win the round"

REFERENCE           MP_TEMP_DRAW
LANG_ENGLISH        "Draw"

REFERENCE           MP_NEWREF
LANG_ENGLISH        "New text"

REFERENCE           MP_IED_PRESS_LEFT_TRIGGER_TO_DETONATE
LANG_ENGLISH        "Press left trigger to detonate"

REFERENCE           MP_CHALLENGE_COMPLETED
LANG_ENGLISH        "Challenge Completed!"

REFERENCE           MP_CHALLENGE_GET_KILLS_WITHOUT_DYING
LANG_ENGLISH        "Get &&1 kills without dying"

REFERENCE           MP_CURRENT_CHALLENGE
LANG_ENGLISH        "Current Challenge:"

REFERENCE           MP_N_REMAINING
LANG_ENGLISH        "(&&1 remaining)"

REFERENCE           MP_YOU_ARE_THE_ONLY_REMAINING_PLAYER
LANG_ENGLISH        "You are the only remaining player on your team."

REFERENCE           MP_BOMB_HAS_BEEN_ABANDONED
LANG_ENGLISH        "The bomb has been abandoned!"

REFERENCE           MP_ORIGINAL_MAPS
LANG_ENGLISH        "Original Maps"

REFERENCE           MP_MAPDIFFERSFROMSERVER
LANG_ENGLISH        "Your map is different from the host's map.  You cannot play on this map with them."

REFERENCE           MP_DOM_CAPTURE_ALL_THE_FLAGS
LANG_ENGLISH        "Touch the flags to capture them. First team to capture every flag wins."

REFERENCE           MP_DOM_CAPTURING_FLAG
LANG_ENGLISH        "Capturing Flag"

REFERENCE           MP_DOM_LOSING_FLAG
LANG_ENGLISH        "Losing Flag!"

REFERENCE           MP_FRIENDLY_FLAG_CAPTURED_BY
LANG_ENGLISH        "&&1 captured your flag!"

REFERENCE           MP_NEUTRAL_FLAG_CAPTURED_BY
LANG_ENGLISH        "&&1 captured a flag!"

REFERENCE           MP_THE_ENEMY
LANG_ENGLISH        "The enemy"

REFERENCE           MP_YOUR_TEAM
LANG_ENGLISH        "Your team"

REFERENCE           MP_DOM_ENEMY_FLAG_CAPTURED
LANG_ENGLISH        "Enemy flag captured"

REFERENCE           MP_DOM_YOUR_FLAG_WAS_CAPTURED
LANG_ENGLISH        "Your flag was captured"

REFERENCE           MP_DOM_NEUTRAL_FLAG_CAPTURED
LANG_ENGLISH        "Flag captured"

REFERENCE           MP_WAR_CAPTURING_ARTILLERY
LANG_ENGLISH        "Capturing artillery"

REFERENCE           MP_WAR_ENEMY_ARTILLERY_CAPTURED
LANG_ENGLISH        "Enemy artillery captured"

REFERENCE           MP_WAR_YOUR_ARTILLERY_CAPTURED
LANG_ENGLISH        "Your artillery was captured"

REFERENCE           MP_WAR_NEUTRAL_ARTILLERY_CAPTURED
LANG_ENGLISH        "Artillery captured"

REFERENCE           MP_WAR_CAPTURING_RADAR
LANG_ENGLISH        "Capturing radar"

REFERENCE           MP_WAR_ENEMY_RADAR_CAPTURED
LANG_ENGLISH        "Enemy radar captured"

REFERENCE           MP_WAR_YOUR_RADAR_CAPTURED
LANG_ENGLISH        "Your radar was captured"

REFERENCE           MP_WAR_NEUTRAL_RADAR_CAPTURED
LANG_ENGLISH        "Radar captured"

REFERENCE           MP_WAR_CAPTURING_ARMOR
LANG_ENGLISH        "Capturing armor"

REFERENCE           MP_WAR_ENEMY_ARMOR_CAPTURED
LANG_ENGLISH        "Enemy armor captured"

REFERENCE           MP_WAR_YOUR_ARMOR_CAPTURED
LANG_ENGLISH        "Your armor was captured"

REFERENCE           MP_WAR_NEUTRAL_ARMOR_CAPTURED
LANG_ENGLISH        "Armor captured"

REFERENCE           MP_WAR_CAPTURING_COPTER
LANG_ENGLISH        "Capturing aerial support"

REFERENCE           MP_WAR_ENEMY_COPTER_CAPTURED
LANG_ENGLISH        "Enemy aerial support captured"

REFERENCE           MP_WAR_YOUR_COPTER_CAPTURED
LANG_ENGLISH        "Your aerial support was captured"

REFERENCE           MP_WAR_NEUTRAL_COPTER_CAPTURED
LANG_ENGLISH        "Aerial support captured"

REFERENCE           MP_WAR_WAITING_FOR_ARTILLERY
LANG_ENGLISH        "Waiting for artillery to be available..."

REFERENCE           MP_WAR_ARTILLERY_INSTRUCTIONS1
LANG_ENGLISH        "Press ATTACK to call in artillery"

REFERENCE           MP_WAR_ARTILLERY_INSTRUCTIONS2
LANG_ENGLISH        "Press USE to cancel"

REFERENCE           MP_WAR_ARTILLERY_INSTRUCTIONS3
LANG_ENGLISH        "Artillery will fall where you are aiming."

REFERENCE           MP_WAR_ARTILLERY_CROSSHAIR
LANG_ENGLISH        "><"

REFERENCE           MP_WAR_ARTILLERY_INBOUND
LANG_ENGLISH        "Artillery strike inbound."

REFERENCE           MP_WAR_ARTILLERY_INBOUND_NEAR_YOUR_POSITION
LANG_ENGLISH        "Artillery strike inbound near your position!"

REFERENCE           MP_WAR_WAITING_FOR_AMMO
LANG_ENGLISH        "Waiting for ammunition to be available..."

REFERENCE           MP_WAR_PRESS_TO_REPLENISH_AMMO
LANG_ENGLISH        "Press USE (...todo...) to replenish ammunition"

REFERENCE           MP_WAR_WAITING_FOR_COPTER_TO_BE_READY_FOR_ORDERS
LANG_ENGLISH        "Waiting for helicopter to be ready for orders..."

REFERENCE           MP_WAR_WAITING_FOR_COPTER_TO_REACH_DESTINATION
LANG_ENGLISH        "Waiting for helicopter to reach its destination..."

REFERENCE           MP_WAR_WAITING_FOR_COPTER_TO_BE_AVAILABLE
LANG_ENGLISH        "Waiting for aerial support to be available..."

REFERENCE           MP_WAR_COPTER_INSTRUCTIONS1
LANG_ENGLISH        "Press ATTACK to send helicopter to this area"

REFERENCE           MP_WAR_COPTER_INSTRUCTIONS2
LANG_ENGLISH        "Press USE to cancel"

REFERENCE           MP_WAR_WAITING_FOR_RADAR
LANG_ENGLISH        "Waiting for UAV Recon to be available..."

REFERENCE           MP_WAR_RADAR_ACQUIRED
LANG_ENGLISH        "UAV Recon called in by &&1 for &&2 seconds"

REFERENCE           MP_WAR_RADAR_ACQUIRED_ENEMY
LANG_ENGLISH        "Enemy acquired UAV Recon for &&1 seconds"

REFERENCE           MP_WAR_RADAR_EXPIRED
LANG_ENGLISH        "UAV Recon expired"

REFERENCE           MP_WAR_RADAR_EXPIRED_ENEMY
LANG_ENGLISH        "Enemy UAV Recon expired"

REFERENCE           MP_THIS_SPAWN_ID
LANG_ENGLISH        "^5This spawn ID: ^3&&1"

REFERENCE           MP_PREVIOUS_SPAWN_ID
LANG_ENGLISH        "^5Previous spawn ID: ^3&&1"

REFERENCE           MP_HOST_ENDED_GAME
LANG_ENGLISH        "Host ended game"

REFERENCE           MP_ENDED_GAME
LANG_ENGLISH        "Ended game"

REFERENCE           MP_ENDED_GAME_MIGRATION_FAILED
LANG_ENGLISH        "Could not migrate host"

REFERENCE           MP_MAPDIFFERSFROMSERVERDEV
LANG_ENGLISH        "Your map is different from the host's map.  You cannot play on this map with them. Your checksum = &&1, Server's == &&2"

REFERENCE           MP_0MIN
LANG_ENGLISH        "0:"

REFERENCE           MP_1MIN
LANG_ENGLISH        "1:"

REFERENCE           MP_2MIN
LANG_ENGLISH        "2:"

REFERENCE           MP_3MIN
LANG_ENGLISH        "3:"

REFERENCE           MP_4MIN
LANG_ENGLISH        "4:"

REFERENCE           MP_5MIN
LANG_ENGLISH        "5:"

REFERENCE           MP_0MIN_0SEC
LANG_ENGLISH        "0:0"

REFERENCE           MP_1MIN_0SEC
LANG_ENGLISH        "1:0"

REFERENCE           MP_2MIN_0SEC
LANG_ENGLISH        "2:0"

REFERENCE           MP_3MIN_0SEC
LANG_ENGLISH        "3:0"

REFERENCE           MP_4MIN_0SEC
LANG_ENGLISH        "4:0"

REFERENCE           MP_5MIN_0SEC
LANG_ENGLISH        "5:0"

REFERENCE           MP_OBJ_SAB_DESTROY_TARGET
LANG_ENGLISH        "Recover the bomb and destroy the enemy hardpoint."

REFERENCE           MP_OBJ_SAB_DESTROY_TARGET_SCORE
LANG_ENGLISH        "Recover the bomb and plant it on the enemy hardpoint.  First team to destroy the hardpoint wins."

REFERENCE           MP_OBJ_DOM_CAPTURE_FLAGS
LANG_ENGLISH        "Capture and hold all of the the flags."

REFERENCE           MP_OBJ_DOM_CAPTURE_FLAGS_SCORE
LANG_ENGLISH        "Destroy target A or B by planting explosives at either location. First team to &&1 points wins."

REFERENCE           MP_OBJ_SD_PLANT_BOMB
LANG_ENGLISH        "Plant explosives on a target and destroy it.  First team to "

REFERENCE           MP_OBJ_SD_PLANT_BOMB_SCORE
LANG_ENGLISH        "Gain points by eliminating enemy players."

REFERENCE           MP_WAR
LANG_ENGLISH        "Team Deathmatch"

REFERENCE           MP_WAR_TIMER
LANG_ENGLISH        "Team Deathmatch - &&1"

REFERENCE           MP_SEARCH_AND_DESTROY
LANG_ENGLISH        "Search and Destroy"

REFERENCE           MP_SEARCH_AND_DESTROY_TIMER
LANG_ENGLISH        "Search and Destroy - &&1"

REFERENCE           MP_SABOTAGE
LANG_ENGLISH        "Sabotage Old"

REFERENCE           MP_SABOTAGE_TIMER
LANG_ENGLISH        "Sabotage - &&1"

REFERENCE           MP_DOMINATION
LANG_ENGLISH        "Capture and Hold"

REFERENCE           MP_DOMINATION_TIMER
LANG_ENGLISH        "Capture and Hold - &&1"

REFERENCE           MP_DEATHMATCH
LANG_ENGLISH        "Free-for-all "

REFERENCE           MP_DEATHMATCH_TIMER
LANG_ENGLISH        "Free-for-all - &&1"

REFERENCE           MP_KING_OF_THE_HILL
LANG_ENGLISH        "King of the Hill"

REFERENCE           MP_USEVEHICLE
LANG_ENGLISH        "Hold use_button to enter vehicle."

REFERENCE           MP_SLASHSCORE
LANG_ENGLISH        "/&&1"

REFERENCE           MP_CHALLENGE
LANG_ENGLISH        "Challenge"

REFERENCE           MP_WAITING_TO_SPAWN
LANG_ENGLISH        "Waiting to respawn"

REFERENCE           MP_SPAWN_NEXT_ROUND
LANG_ENGLISH        "You will respawn next round."

REFERENCE           MP_SABOTAGE_COUNTDOWN
LANG_ENGLISH        "Sabotage"

REFERENCE           MP_SEARCH_AND_DESTROY_CLASSIC
LANG_ENGLISH        "Search and Destroy Old"

REFERENCE           MP_TEAM_HARDPOINT
LANG_ENGLISH        "Team Deathmatch"

REFERENCE           MP_WAR_WAITING_FOR_AIRSTRIKE
LANG_ENGLISH        "Waiting for air strike to be available..."

REFERENCE           MP_WAR_AIRSTRIKE_INBOUND
LANG_ENGLISH        "Airstrike called in by &&1"

REFERENCE           MP_WAR_AIRSTRIKE_INBOUND_NEAR_YOUR_POSITION
LANG_ENGLISH        "Friendly airstrike on your position!"

REFERENCE           MP_WAR_AIRSTRIKE_CROSSHAIR
LANG_ENGLISH        "><"

REFERENCE           MP_WAR_AIRSTRIKE_INSTRUCTIONS1
LANG_ENGLISH        "Press ATTACK to call in air strike"

REFERENCE           MP_WAR_AIRSTRIKE_INSTRUCTIONS2
LANG_ENGLISH        "Press USE to cancel"

REFERENCE           MP_WAR_AIRSTRIKE_INSTRUCTIONS3
LANG_ENGLISH        "Air strike will attack where you are aiming."

REFERENCE           MP_HELICOPTER_INBOUND
LANG_ENGLISH        "Helicopter called in by &&1"

REFERENCE           MP_AC130_INBOUND
LANG_ENGLISH        "AC130 called in by &&1"

REFERENCE           MP_POINTS_TO_WIN
LANG_ENGLISH        "%s points to win."

REFERENCE           MP_MARINES_NAME
LANG_ENGLISH        "Marine Force Recon"

REFERENCE           MP_SAS_NAME
LANG_ENGLISH        "S.A.S"

REFERENCE           MP_OPFOR_NAME
LANG_ENGLISH        "OpFor"

REFERENCE           MP_SPETSNAZ_NAME
LANG_ENGLISH        "Spetsnaz"

REFERENCE           MP_EARNED_AIRSTRIKE
LANG_ENGLISH        "Press [{+actionslot 4}] for AIRSTRIKE."

REFERENCE           MP_EARNED_AIRDROP
LANG_ENGLISH        "Press [{+actionslot 4}] for AIRDROP."

REFERENCE           MP_EARNED_SENTRY_AIRDROP
LANG_ENGLISH        "Press [{+actionslot 4}] for SENTRY AIRDROP."

REFERENCE           MP_EARNED_PREDATOR_AIRDROP
LANG_ENGLISH        "Press [{+actionslot 4}] for PREDATOR AIRDROP."

REFERENCE           MP_EARNED_PRECISION_AIRSTRIKE
LANG_ENGLISH        "Press [{+actionslot 4}] for PRECISION AIRSTRIKE."

REFERENCE           MP_EARNED_STEALTH_AIRSTRIKE
LANG_ENGLISH        "Press [{+actionslot 4}] for STEALTH BOMBER."

REFERENCE           MP_EARNED_HARRIER_AIRSTRIKE
LANG_ENGLISH        "Press [{+actionslot 4}] for HARRIER AIRSTRIKE."

REFERENCE           MP_EARNED_SUPER_AIRSTRIKE
LANG_ENGLISH        "Press [{+actionslot 4}] for SUPER AIRSTRIKE."

REFERENCE           MP_EARNED_UAV
LANG_ENGLISH        "Press [{+actionslot 4}] for UAV."

REFERENCE           MP_EARNED_DOUBLE_UAV
LANG_ENGLISH        "Press [{+actionslot 4}] for ADVANCED UAV."

REFERENCE           MP_EARNED_COUNTER_UAV
LANG_ENGLISH        "Press [{+actionslot 4}] for COUNTER-UAV."

REFERENCE           MP_EARNED_HELICOPTER
LANG_ENGLISH        "Press [{+actionslot 4}] for ATTACK HELICOPTER."

REFERENCE           MP_EARNED_HELICOPTER_MINIGUN
LANG_ENGLISH        "Press [{+actionslot 4}] for CHOPPER GUNNER."

REFERENCE           MP_EARNED_HELICOPTER_MK19
LANG_ENGLISH        "Press [{+actionslot 4}] for HELICOPTER MK19."

REFERENCE           MP_EARNED_HELICOPTER_BLACKBOX
LANG_ENGLISH        "Press [{+actionslot 4}] for HELICOPTER BLACKBOX."

REFERENCE           MP_EARNED_HELICOPTER_FLARES
LANG_ENGLISH        "Press [{+actionslot 4}] for PAVELOW."

REFERENCE           MP_EARNED_AC130
LANG_ENGLISH        "Press [{+actionslot 4}] for AC130."

REFERENCE           MP_EARNED_PREDATOR_MISSILE
LANG_ENGLISH        "Press [{+actionslot 4}] for PREDATOR MISSILE."

REFERENCE           MP_EARNED_NUKE
LANG_ENGLISH        "Press [{+actionslot 4}] for TACTICAL NUKE."

REFERENCE           MP_EARNED_AUTO_SHOTGUN
LANG_ENGLISH        "Press [{+actionslot 4}] for SHOTGUN."

REFERENCE           MP_EARNED_AUTO_SENTRY
LANG_ENGLISH        "Press [{+actionslot 4}] for AUTO-SENTRY."

REFERENCE           MP_EARNED_AUTO_SENTRY_GL
LANG_ENGLISH        "Press [{+actionslot 4}] for AUTO-GRENADE LAUNCHER."

REFERENCE           MP_EARNED_THUMPER
LANG_ENGLISH        "Press [{+actionslot 4}] for THUMPER."

REFERENCE           MP_EARNED_LITTLEBIRD_SUPPORT
LANG_ENGLISH        "Press [{+actionslot 4}] for LITTLEBIRD."

REFERENCE           MP_EARNED_EMP
LANG_ENGLISH        "Press [{+actionslot 4}] for EMP."

REFERENCE           MP_KILLSTREAK_3
LANG_ENGLISH        "3 Kill Streak!"

REFERENCE           MP_KILLSTREAK_5
LANG_ENGLISH        "5 Kill Streak!"

REFERENCE           MP_KILLSTREAK_7
LANG_ENGLISH        "7 Kill Streak!"

REFERENCE           MP_KILLSTREAK_N
LANG_ENGLISH        "&&1 Kill Streak!"

REFERENCE           MP_NULL
LANG_ENGLISH        "%s"

REFERENCE           MP_FLAG_TAKEN_BY
LANG_ENGLISH        "Your flag was taken by &&1!"

REFERENCE           MP_ENEMY_FLAG_TAKEN_BY
LANG_ENGLISH        "Enemy flag was taken by &&1!"

REFERENCE           MP_FLAG_CAPTURED_BY
LANG_ENGLISH        "Your flag was captured by &&1!"

REFERENCE           MP_ENEMY_FLAG_CAPTURED_BY
LANG_ENGLISH        "Enemy flag was captured by &&1!"

REFERENCE           MP_FLAG_RETURNED_BY
LANG_ENGLISH        "Your flag was returned by &&1!"

REFERENCE           MP_FLAG_RETURNED
LANG_ENGLISH        "Your flag was returned!"

REFERENCE           MP_ENEMY_FLAG_RETURNED
LANG_ENGLISH        "Enemy flag was returned!"

REFERENCE           MP_YOUR_FLAG_RETURNING_IN
LANG_ENGLISH        "Your flag returning in "

REFERENCE           MP_ENEMY_FLAG_RETURNING_IN
LANG_ENGLISH        "Enemy flag returning in "

REFERENCE           MP_ENEMY_FLAG_DROPPED_BY
LANG_ENGLISH        "&&1 dropped the enemy flag!"

REFERENCE           MP_FIRSTPLACE_NAME
LANG_ENGLISH        "1st. &&1"

REFERENCE           MP_SECONDPLACE_NAME
LANG_ENGLISH        "2nd. &&1"

REFERENCE           MP_THIRDPLACE_NAME
LANG_ENGLISH        "3rd. &&1"

REFERENCE           MP_DRAW
LANG_ENGLISH        "Draw"

REFERENCE           MP_VICTORY
LANG_ENGLISH        "Victory!"

REFERENCE           MP_DEFEAT
LANG_ENGLISH        "Defeat!"

REFERENCE           MP_ROUND_DRAW
LANG_ENGLISH        "Round Draw"

REFERENCE           MP_ROUND_WIN
LANG_ENGLISH        "Round Win"

REFERENCE           MP_ROUND_LOSS
LANG_ENGLISH        "Round Loss"

REFERENCE           MP_HALFTIME
LANG_ENGLISH        "Halftime"

REFERENCE           MP_OVERTIME
LANG_ENGLISH        "Overtime"

REFERENCE           MP_SWITCHING_SIDES
LANG_ENGLISH        "SWITCHING SIDES"

REFERENCE           MP_MATCH_BONUS_IS
LANG_ENGLISH        "Match Bonus: &&1"

REFERENCE           MP_MARINES_WIN
LANG_ENGLISH        "Marines win!"

REFERENCE           MP_MARINES_WIN_MATCH
LANG_ENGLISH        "Marines have won the match!"

REFERENCE           MP_MARINES_WIN_ROUND
LANG_ENGLISH        "Marines have won the round!"

REFERENCE           MP_MARINES_MISSION_ACCOMPLISHED
LANG_ENGLISH        "Marines mission accomplished"

REFERENCE           MP_MARINES_ELIMINATED
LANG_ENGLISH        "Marines eliminated"

REFERENCE           MP_MARINES_FORFEITED
LANG_ENGLISH        "Marines forfeited"

REFERENCE           MP_MARINES_DESTROYED_TARGET
LANG_ENGLISH        "Marines destroyed target"

REFERENCE           MP_MARINES_DEFENDED_TARGET
LANG_ENGLISH        "Marines defended target"

REFERENCE           MP_SAS_WIN
LANG_ENGLISH        "SAS win!"

REFERENCE           MP_SAS_WIN_MATCH
LANG_ENGLISH        "SAS have won the match!"

REFERENCE           MP_SAS_WIN_ROUND
LANG_ENGLISH        "SAS have won the round!"

REFERENCE           MP_SAS_MISSION_ACCOMPLISHED
LANG_ENGLISH        "SAS mission accomplished"

REFERENCE           MP_SAS_ELIMINATED
LANG_ENGLISH        "SAS eliminated"

REFERENCE           MP_SAS_FORFEITED
LANG_ENGLISH        "SAS forfeited"

REFERENCE           MP_SAS_DESTROYED_TARGET
LANG_ENGLISH        "SAS destroyed target"

REFERENCE           MP_SAS_DEFENDED_TARGET
LANG_ENGLISH        "SAS defended target"

REFERENCE           MP_OPFOR_WIN
LANG_ENGLISH        "OpFor win!"

REFERENCE           MP_OPFOR_WIN_MATCH
LANG_ENGLISH        "OpFor have won the match!"

REFERENCE           MP_OPFOR_WIN_ROUND
LANG_ENGLISH        "OpFor have won the round!"

REFERENCE           MP_OPFOR_MISSION_ACCOMPLISHED
LANG_ENGLISH        "OpFor mission accomplished"

REFERENCE           MP_OPFOR_ELIMINATED
LANG_ENGLISH        "OpFor eliminated"

REFERENCE           MP_OPFOR_FORFEITED
LANG_ENGLISH        "OpFor forfeited"

REFERENCE           MP_OPFOR_DESTROYED_TARGET
LANG_ENGLISH        "OpFor destroyed target"

REFERENCE           MP_OPFOR_DEFENDED_TARGET
LANG_ENGLISH        "OpFor defended target"

REFERENCE           MP_SPETSNAZ_WIN
LANG_ENGLISH        "Spetsnaz win!"

REFERENCE           MP_SPETSNAZ_WIN_MATCH
LANG_ENGLISH        "Spetsnaz have won the match!"

REFERENCE           MP_SPETSNAZ_WIN_ROUND
LANG_ENGLISH        "Spetsnaz have won the round!"

REFERENCE           MP_SPETSNAZ_MISSION_ACCOMPLISHED
LANG_ENGLISH        "Spetsnaz mission accomplished"

REFERENCE           MP_SPETSNAZ_ELIMINATED
LANG_ENGLISH        "Spetsnaz eliminated"

REFERENCE           MP_SPETSNAZ_FORFEITED
LANG_ENGLISH        "Spetsnaz forfeited"

REFERENCE           MP_PLAYERS_FORFEITED
LANG_ENGLISH        "Players forfeited"

REFERENCE           MP_SPETSNAZ_DESTROYED_TARGET
LANG_ENGLISH        "Spetsnaz destroyed target"

REFERENCE           MP_SPETSNAZ_DEFENDED_TARGET
LANG_ENGLISH        "Spetsnaz defended target"

REFERENCE           MP_IWNOTALLOWED
LANG_ENGLISH        "You are not authorized to use the IW clan tag."

REFERENCE           MP_BUILDEXPIRED
LANG_ENGLISH        "This build of Modern Warfare 2 is no longer valid for online play."

REFERENCE           MP_BANNED
LANG_ENGLISH        "You have been banned from Modern Warfare 2."

REFERENCE           MP_AUTH_BANNED
LANG_ENGLISH        "You have been banned from Modern Warfare 2."

REFERENCE           MP_AUTH_NOT_ENTITLED
LANG_ENGLISH        "You are not authorized to play Modern Warfare 2.  Contact Mark Rubin (x8078)."

REFERENCE           MP_AUTH_MISC_ERROR
LANG_ENGLISH        "Modern Warfare 2 is temporarily offline.  Try again in a few minutes."

REFERENCE           MP_BETACLOSED
LANG_ENGLISH        "The Beta for Modern Warfare 2 has now ended."

REFERENCE           MP_RADAR_NOT_AVAILABLE
LANG_ENGLISH        "Radar not available"

REFERENCE           MP_AIRSTRIKE_NOT_AVAILABLE
LANG_ENGLISH        "Airspace is occupied.  Try again soon..."

REFERENCE           MP_HELICOPTER_NOT_AVAILABLE
LANG_ENGLISH        "Airspace is occupied.  Try again soon..."

REFERENCE           MP_AC130_NOT_AVAILABLE
LANG_ENGLISH        "Airspace is occupied.  Try again soon..."

REFERENCE           MP_REMOTEMISSILE_NOT_AVAILABLE
LANG_ENGLISH        "Predator Missile launch not available"

REFERENCE           MP_CONTROL_HQ
LANG_ENGLISH        "Control the HQ location."

REFERENCE           MP_CAPTURE_HQ
LANG_ENGLISH        "Capture the HQ."

REFERENCE           MP_DESTROY_HQ
LANG_ENGLISH        "Destroy the HQ."

REFERENCE           MP_DEFEND_HQ
LANG_ENGLISH        "Defend the HQ."

REFERENCE           MP_HQ_AVAILABLE_IN
LANG_ENGLISH        "HQ online in: &&1"

REFERENCE           MP_HQ_DESPAWN_IN
LANG_ENGLISH        "HQ offline in: &&1"

REFERENCE           MP_HQ_REINFORCEMENTS_IN
LANG_ENGLISH        "Reinforcements in: &&1"

REFERENCE           MP_CAPTURING_HQ
LANG_ENGLISH        "Capturing HQ..."

REFERENCE           MP_DESTROYING_HQ
LANG_ENGLISH        "Destroying HQ..."

REFERENCE           MP_HQ_CAPTURED_BY
LANG_ENGLISH        "HQ captured by &&1!"

REFERENCE           MP_HQ_CAPTURED_BY_ENEMY
LANG_ENGLISH        "The enemy captured the HQ!"

REFERENCE           MP_HQ_DESTROYED_BY
LANG_ENGLISH        "HQ destroyed by &&1!"

REFERENCE           MP_HQ_DESTROYED_BY_ENEMY
LANG_ENGLISH        "The enemy destroyed the HQ!"

REFERENCE           MP_JOINED_MARINES
LANG_ENGLISH        "&&1 Joined Marines"

REFERENCE           MP_JOINED_SAS
LANG_ENGLISH        "&&1 Joined SAS"

REFERENCE           MP_JOINED_OPFOR
LANG_ENGLISH        "&&1 Joined OpFor"

REFERENCE           MP_JOINED_SPETSNAZ
LANG_ENGLISH        "&&1 Joined Spetsnaz"

REFERENCE           MP_CHANGE_CLASS_NEXT_SPAWN
LANG_ENGLISH        "Your class will change the next time you spawn."

REFERENCE           MP_HOST_ENDGAME_RESPONSE
LANG_ENGLISH        "Action unavailable, outcome already in progress."

REFERENCE           MP_NOTIFY_TITLE_MESSAGE
LANG_ENGLISH        "Notify Title Message"

REFERENCE           MP_NOTIFY_TEXT_MESSAGE_AND
LANG_ENGLISH        "Notify text message and info."

REFERENCE           MP_NOTIFY_TEXT_MESSAGE_AND1
LANG_ENGLISH        "Notify text message and info."

REFERENCE           MP_ROUNDEND
LANG_ENGLISH        "Round Over"

REFERENCE           MP_INTERMISSION
LANG_ENGLISH        "Intermission"

REFERENCE           MP_SUDDEN_DEATH
LANG_ENGLISH        "Sudden Death"

REFERENCE           MP_TEAM_SCORED
LANG_ENGLISH        "Your team scored! "

REFERENCE           MP_ENEMY_SCORED
LANG_ENGLISH        "Enemy team scored!"

REFERENCE           MP_HQ_REVEALED
LANG_ENGLISH        "HQ location revealed."

REFERENCE           MP_WAITING_FOR_MORE_PLAYERS
LANG_ENGLISH        "Waiting for more players..."

REFERENCE           MP_WAITING_FOR_PLAYERS
LANG_ENGLISH        "Waiting for players..."

REFERENCE           MP_OPPONENT_FORFEITING_IN
LANG_ENGLISH        "Enemies forfeiting in:"

REFERENCE           MP_NO_RESPAWN
LANG_ENGLISH        "No Respawning"

REFERENCE           MP_WAITING_FOR_HQ
LANG_ENGLISH        "Waiting for HQ to be destroyed..."

REFERENCE           MP_TIE_BREAKER
LANG_ENGLISH        "Tie Breaker"

REFERENCE           MP_MATCHEDPLAYER
LANG_ENGLISH        "Matched Player"

REFERENCE           MP_WAITINGFORPARTYHOST
LANG_ENGLISH        "Waiting for &&1 to return to the party"

REFERENCE           MP_WAITING_TO_SAFESPAWN
LANG_ENGLISH        "Waiting for safe spawn..."

REFERENCE           MP_PRESS_TO_RAPPEL
LANG_ENGLISH        "Press and hold ^3[{+activate}]^7 to rappel"

REFERENCE           MP_MIGRATINGHOSTS
LANG_ENGLISH        "Finding the best host"

REFERENCE           MP_NOGOODHOST
LANG_ENGLISH        "Could not migrate host. For more information \\nsee infinityward.com/hostmigration"

REFERENCE           MP_SEARCHING_FOR_PLAYER
LANG_ENGLISH        "Searching"

REFERENCE           MP_WAR_COUNTER_RADAR_ACQUIRED
LANG_ENGLISH        "Counter-UAV called in by &&1 for &&2 seconds"

REFERENCE           MP_WAR_COUNTER_RADAR_ACQUIRED_ENEMY
LANG_ENGLISH        "Enemy acquired Counter-UAV for &&1 seconds"

REFERENCE           MP_WAR_COUNTER_RADAR_EXPIRED
LANG_ENGLISH        "Counter-UAV expired"

REFERENCE           MP_WAR_COUNTER_RADAR_EXPIRED_ENEMY
LANG_ENGLISH        "Enemy Counter-UAV expired"

REFERENCE           MP_FIRST_BLOOD
LANG_ENGLISH        "First blood wins."

REFERENCE           MP_TEAMS_FORFEITED
LANG_ENGLISH        "Both Teams Forfeited"

REFERENCE           MP_NO_WINNER
LANG_ENGLISH        "No one wins."

REFERENCE           MP_PLUS_DOLLAR
LANG_ENGLISH        "+$"

REFERENCE           MP_MINUS_DOLLAR
LANG_ENGLISH        "-$"

REFERENCE           MP_DOLLAR
LANG_ENGLISH        "$"

REFERENCE           MP_FINAL_KILLCAM
LANG_ENGLISH        "GAME WINNING KILL"

REFERENCE           MP_EARNED_TANK
LANG_ENGLISH        "Press [{+actionslot 4}] for Tank."

REFERENCE           MP_PICKING_NEW_HOST
LANG_ENGLISH        "Picking a new host"

REFERENCE           MP_WAITING_NEW_HOST
LANG_ENGLISH        "Waiting for new host"

REFERENCE           MP_CONNECTING_NEW_HOST
LANG_ENGLISH        "Connecting to new host"

REFERENCE           MP_ROUND_KILLCAM
LANG_ENGLISH        "ROUND WINNING KILL"

REFERENCE           MP_OBITUARY_FRIENDLY
LANG_ENGLISH        "^2] &&1 > &&2"

REFERENCE           MP_OBITUARY_ENEMY
LANG_ENGLISH        "^1] &&1 > &&2"

REFERENCE           MP_OBITUARY_NEUTRAL
LANG_ENGLISH        "] &&1 > &&2"

REFERENCE           MP_US_ARMY_NAME
LANG_ENGLISH        "Army Rangers"

REFERENCE           MP_OPFORCE_COMPOSITE_NAME
LANG_ENGLISH        "OpFor"

REFERENCE           MP_SEALS_UDT_NAME
LANG_ENGLISH        "Navy SEALs"

REFERENCE           MP_SECRET_SERVICE_NAME
LANG_ENGLISH        "Secret Service"

REFERENCE           MP_MILITIA_NAME
LANG_ENGLISH        "Militia"

REFERENCE           MP_TASKFORCE_NAME
LANG_ENGLISH        "Task Force 141"

REFERENCE           MP_OPFORCE_ARCTIC_NAME
LANG_ENGLISH        "OpFor"

REFERENCE           MP_US_ARMY_SHORT_NAME
LANG_ENGLISH        "Rangers"

REFERENCE           MP_OPFORCE_COMPOSITE_SHORT_NAME
LANG_ENGLISH        "OpFor"

REFERENCE           MP_SEALS_UDT_SHORT_NAME
LANG_ENGLISH        "SEALs"

REFERENCE           MP_SECRET_SERVICE_SHORT_NAME
LANG_ENGLISH        "Secret Service"

REFERENCE           MP_MILITIA_SHORT_NAME
LANG_ENGLISH        "Militia"

REFERENCE           MP_TASKFORCE_SHORT_NAME
LANG_ENGLISH        "TF 141"

REFERENCE           MP_OPFORCE_ARCTIC_SHORT_NAME
LANG_ENGLISH        "OpFor"

REFERENCE           MP_DESTROY_TI
LANG_ENGLISH        "Press ^3&&1^7 to smash Tactical Insertion"

REFERENCE           MP_BOMB_B_TIMER
LANG_ENGLISH        "Bomb site B detonation in: "

REFERENCE           MP_BOMB_A_TIMER
LANG_ENGLISH        "Bomb site A detonation in: "

REFERENCE           MP_ELIMINATED_VIP
LANG_ENGLISH        "V.I.P. Eliminated"

REFERENCE           MP_DEFENDED_VIP
LANG_ENGLISH        "V.I.P. Rescued"

REFERENCE           MP_CALLING_EXTRACTION
LANG_ENGLISH        "Calling Extraction"

REFERENCE           MP_EARNED_AIRDROP_MEGA
LANG_ENGLISH        "Press [{+actionslot 4}] for EMERGENCY AIRDROP."

REFERENCE           MP_CAUSED_DEFCON
LANG_ENGLISH        "Emergency Airdrop!"

REFERENCE           MP_PICKUP_TI
LANG_ENGLISH        "Press ^3&&1^7 to pick up Tactical Insertion"

REFERENCE           MP_TACTICAL_NUKE_CALLED
LANG_ENGLISH        "Tactical nuke called in by &&1"

REFERENCE           MP_FRIENDLY_TACTICAL_NUKE
LANG_ENGLISH        "Friendly tactical nuke inbound!"

REFERENCE           MP_TACTICAL_NUKE
LANG_ENGLISH        "Tactical Nuke"

REFERENCE           MP_TARGETS_DESTROYED
LANG_ENGLISH        "Targets Destroyed"

REFERENCE           MP_US_ARMY_ELIMINATED
LANG_ENGLISH        "US Army Eliminated"

REFERENCE           MP_US_ARMY_FORFEITED
LANG_ENGLISH        "US Army Forfeited"

REFERENCE           MP_MILITIA_ELIMINATED
LANG_ENGLISH        "Militia Eliminated"

REFERENCE           MP_MILITIA_FORFEITED
LANG_ENGLISH        "Militia Forfeited"

REFERENCE           MP_TF141_ELIMINATED
LANG_ENGLISH        "TF141 Eliminated"

REFERENCE           MP_TF141_FORFEITED
LANG_ENGLISH        "TF141 Forfeited"

REFERENCE           MP_SEALS_ELIMINATED
LANG_ENGLISH        "SEALs Eliminated"

REFERENCE           MP_SEALS_FORFEITED
LANG_ENGLISH        "SEALs Forfeited"

REFERENCE           MP_CAPTURING_NUKE
LANG_ENGLISH        "Capturing Nuke"

REFERENCE           MP_AMMO_PICKUP
LANG_ENGLISH        "Press and hold ^3[{+activate}]^7 for ammo resupply"

REFERENCE           MP_UAV_PICKUP
LANG_ENGLISH        "Press and hold ^3[{+activate}]^7 for a UAV"

REFERENCE           MP_COUNTER_UAV_PICKUP
LANG_ENGLISH        "Press and hold ^3[{+activate}]^7 for a Counter-UAV"

REFERENCE           MP_SENTRY_PICKUP
LANG_ENGLISH        "Press and hold ^3[{+activate}]^7 for a Sentry Gun"

REFERENCE           MP_PREDATOR_MISSILE_PICKUP
LANG_ENGLISH        "Press and hold ^3[{+activate}]^7 for a Predator Missile"

REFERENCE           MP_PRECISION_AIRSTRIKE_PICKUP
LANG_ENGLISH        "Press and hold ^3[{+activate}]^7 for a Precision Airstrike"

REFERENCE           MP_AIRSTRIKE_PICKUP
LANG_ENGLISH        "Press and hold ^3[{+activate}]^7 for an Airstrike"

REFERENCE           MP_STEALTH_AIRSTRIKE_PICKUP
LANG_ENGLISH        "Press and hold ^3[{+activate}]^7 for a Stealth Bomber"

REFERENCE           MP_HARRIER_AIRSTRIKE_PICKUP
LANG_ENGLISH        "Press and hold ^3[{+activate}]^7 for a Harrier Airstrike"

REFERENCE           MP_HELICOPTER_PICKUP
LANG_ENGLISH        "Press and hold ^3[{+activate}]^7 for an Attack Helicopter"

REFERENCE           MP_HELICOPTER_FLARES_PICKUP
LANG_ENGLISH        "Press and hold ^3[{+activate}]^7 for a Pavelow"

REFERENCE           MP_HELICOPTER_MINIGUN_PICKUP
LANG_ENGLISH        "Press and hold ^3[{+activate}]^7 for a Chopper Gunner"

REFERENCE           MP_AC130_PICKUP
LANG_ENGLISH        "Press and hold ^3[{+activate}]^7 for an AC130"

REFERENCE           MP_EMP_PICKUP
LANG_ENGLISH        "Press and hold ^3[{+activate}]^7 for an EMP"

REFERENCE           MP_NUKE_PICKUP
LANG_ENGLISH        "Press and hold ^3[{+activate}]^7 for a Nuclear Strike"

REFERENCE           MP_GRABBING_FLAG
LANG_ENGLISH        "Grabbing Flag"

REFERENCE           MP_GRABBED_FLAG_FIRST
LANG_ENGLISH        "Grabbed the flag first!"

REFERENCE           MP_BOMB_A_COLON_N_N
LANG_ENGLISH        "A: &&1.&&2"

REFERENCE           MP_BOMB_B_COLON_N_N
LANG_ENGLISH        "B: &&1.&&2"

REFERENCE           MP_CAPTURING_CRATE
LANG_ENGLISH        "Capturing..."

REFERENCE           MP_AIR_SPACE_TOO_CROWDED
LANG_ENGLISH        "Air space too crowded."

REFERENCE           MP_CIVILIAN_AIR_TRAFFIC
LANG_ENGLISH        "Civilian air traffic in area."

REFERENCE           MP_YOU_KILLED
LANG_ENGLISH        "You Killed"

REFERENCE           MP_KILLED_BY
LANG_ENGLISH        "Killed By"

REFERENCE           MP_NUKE_ALREADY_INBOUND
LANG_ENGLISH        "Tactical Nuke already inbound!"

REFERENCE           MP_UNAVILABLE_IN_LASTSTAND
LANG_ENGLISH        "Killstreak cannot be used in Last Stand."

REFERENCE           MP_UNAVAILABLE_WHEN_EMP
LANG_ENGLISH        "Killstreak unavailable during EMP."

REFERENCE           MP_UNAVAILABLE_USING_TURRET
LANG_ENGLISH        "Killstreak unavailable when using turret."

REFERENCE           MP_UNAVAILABLE_WHEN_INCAP
LANG_ENGLISH        "Killstreak unavailable when incapacitated."

REFERENCE           MP_HELI_IN_QUEUE
LANG_ENGLISH        "Your helicopter will arrive when the air space is clear."

REFERENCE           MP_AC130_UNAVAILABLE
LANG_ENGLISH        "AC130 currently unavailable."

REFERENCE           MP_UNAVAILABLE_FOR_N
LANG_ENGLISH        "Killstreak unavailable for &&1 more seconds."

REFERENCE           MP_HQ_REINFORCEMENTS_IN_SPLITSCREEN
LANG_ENGLISH        "Support in: &&1"

REFERENCE           MP_CLAN_BRACES
LANG_ENGLISH        "[&&1]"

REFERENCE           MP_BOMBSITE_IN_USE
LANG_ENGLISH        "This bomb site is currently in use."

REFERENCE           MP_MIGRATION_SENDING
LANG_ENGLISH        "sent &&1% of blocks"

REFERENCE           MP_MIGRATING_SESSION
LANG_ENGLISH        "migrating session"

REFERENCE           MP_MIGRATION_EVALUATING
LANG_ENGLISH        "evaluating clients"

REFERENCE           MP_SECURING_POSITION
LANG_ENGLISH        "Securing Position"

REFERENCE           MP_TARGET_DEFENDED
LANG_ENGLISH        "Target Defended"

REFERENCE           MP_CHALLENGES_COMPLETED
LANG_ENGLISH        "Challenges Completed!"

REFERENCE           MP_TOO_CLOSE_NOFIRE
LANG_ENGLISH        "TOO CLOSE TO TARGET - CANNOT FIRE"

REFERENCE           MP_TOO_CLOSE_NOLOCK
LANG_ENGLISH        "TOO CLOSE FOR LOCK-ON"

REFERENCE           MPUI_RESET_CAC
LANG_ENGLISH        "Reset Class"

REFERENCE           MPUI_BOG
LANG_ENGLISH        "Bog"

REFERENCE           MPUI_SABOTAGE
LANG_ENGLISH        "Sabotage"

REFERENCE           MPUI_SABOTAGE_CUSTOM
LANG_ENGLISH        "Sabotage (Custom)"

REFERENCE           MPUI_DEATHMATCH
LANG_ENGLISH        "Free-for-all"

REFERENCE           MPUI_TEAM_DEATHMATCH
LANG_ENGLISH        "Team Deathmatch"

REFERENCE           MPUI_CAPTURE_THE_FLAG
LANG_ENGLISH        "Capture the Flag"

REFERENCE           MPUI_HEADQUARTERS
LANG_ENGLISH        "Headquarters"

REFERENCE           MPUI_SEARCH_AND_DESTROY
LANG_ENGLISH        "Search and Destroy"

REFERENCE           MPUI_SEARCH_AND_DESTROY_CUSTOM
LANG_ENGLISH        "Search and Destroy (Custom)"

REFERENCE           MPUI_WAR
LANG_ENGLISH        "Team Deathmatch"

REFERENCE           MPUI_DOMINATION
LANG_ENGLISH        "Domination"

REFERENCE           MPUI_KING_OF_THE_HILL
LANG_ENGLISH        "King of the Hill"

REFERENCE           MPUI_ONE_FLAG
LANG_ENGLISH        "One Flag CTF"

REFERENCE           MPUI_ARENA
LANG_ENGLISH        "Arena"

REFERENCE           MPUI_DD
LANG_ENGLISH        "Demolition"

REFERENCE           MPUI_VIP
LANG_ENGLISH        "VIP"

REFERENCE           MPUI_WAR_HARDCORE
LANG_ENGLISH        "Hardcore Team Deathmatch"

REFERENCE           MPUI_DM_HARDCORE
LANG_ENGLISH        "Hardcore Free-for-all"

REFERENCE           MPUI_MAIN_MENU
LANG_ENGLISH        "Main Menu"

REFERENCE           MPUI_TEAM
LANG_ENGLISH        "Team"

REFERENCE           MPUI_WEAPON
LANG_ENGLISH        "Weapon"

REFERENCE           MPUI_VIEW_MAP
LANG_ENGLISH        "View Map"

REFERENCE           MPUI_CALL_VOTE
LANG_ENGLISH        "Call Vote"

REFERENCE           MPUI_AUTOASSIGN
LANG_ENGLISH        "Auto-Assign"

REFERENCE           MPUI_AMERICAN
LANG_ENGLISH        "American"

REFERENCE           MPUI_BRITISH
LANG_ENGLISH        "British"

REFERENCE           MPUI_RUSSIAN
LANG_ENGLISH        "Russian"

REFERENCE           MPUI_MARINES
LANG_ENGLISH        "Marine Force Recon"

REFERENCE           MPUI_SPETSNAZ
LANG_ENGLISH        "Spetsnaz"

REFERENCE           MPUI_OPFOR
LANG_ENGLISH        "OpFor"

REFERENCE           MPUI_SAS
LANG_ENGLISH        "S.A.S."

REFERENCE           MPUI_MARINES_SHORT
LANG_ENGLISH        "Marines"

REFERENCE           MPUI_SPETSNAZ_SHORT
LANG_ENGLISH        "Spetsnaz"

REFERENCE           MPUI_OPFOR_SHORT
LANG_ENGLISH        "OpFor"

REFERENCE           MPUI_SAS_SHORT
LANG_ENGLISH        "S.A.S."

REFERENCE           MPUI_SPECTATE
LANG_ENGLISH        "Spectate"

REFERENCE           MPUI_MP44
LANG_ENGLISH        "MP44"

REFERENCE           MPUI_1_AMERICAN
LANG_ENGLISH        "1. American"

REFERENCE           MPUI_2_AMERICAN
LANG_ENGLISH        "2. American"

REFERENCE           MPUI_1_BRITISH
LANG_ENGLISH        "1. British"

REFERENCE           MPUI_2_BRITISH
LANG_ENGLISH        "2. British"

REFERENCE           MPUI_1_RUSSIAN
LANG_ENGLISH        "1. Russian"

REFERENCE           MPUI_2_RUSSIAN
LANG_ENGLISH        "2. Russian"

REFERENCE           MPUI_1_AUTOASSIGN
LANG_ENGLISH        "1. Auto-Assign"

REFERENCE           MPUI_2_AUTOASSIGN
LANG_ENGLISH        "2. Auto-Assign"

REFERENCE           MPUI_3_AUTOASSIGN
LANG_ENGLISH        "3. Auto-Assign"

REFERENCE           MPUI_2_SPECTATE
LANG_ENGLISH        "2. Spectate"

REFERENCE           MPUI_4_SPECTATE
LANG_ENGLISH        "4. Spectate"

REFERENCE           MPUI_3_CHANGE_MAP
LANG_ENGLISH        "3. Change Map"

REFERENCE           MPUI_CHANGE_GAME_TYPEMAP
LANG_ENGLISH        "Change Game Type/Map"

REFERENCE           MPUI_4_CHANGE_GAME_TYPEMAP
LANG_ENGLISH        "4. Change Game Type/Map"

REFERENCE           MPUI_CHANGE_GAME_TYPE
LANG_ENGLISH        "Change Game Type"

REFERENCE           MPUI_KICK_PLAYER
LANG_ENGLISH        "Kick Player"

REFERENCE           MPUI_5_KICK_PLAYER
LANG_ENGLISH        "5. Kick Player"

REFERENCE           MPUI_OK
LANG_ENGLISH        "Ok"

REFERENCE           MPUI_TEMPORARY_BAN
LANG_ENGLISH        "Temporary Ban"

REFERENCE           MPUI_TEMPORARILY_BAN_PLAYER
LANG_ENGLISH        "Temporarily Ban Player"

REFERENCE           MPUI_NEXT_MAP
LANG_ENGLISH        "Next Map"

REFERENCE           MPUI_2_NEXT_MAP
LANG_ENGLISH        "2. Next Map"

REFERENCE           MPUI_CHANGE_GAMETYPEMAP
LANG_ENGLISH        "Change Gametype/Map"

REFERENCE           MPUI_ON
LANG_ENGLISH        "On"

REFERENCE           MPUI_OFF
LANG_ENGLISH        "Off"

REFERENCE           MPUI_REFLECT
LANG_ENGLISH        "Reflect"

REFERENCE           MPUI_ENABLE_VOTING
LANG_ENGLISH        "Enable Voting"

REFERENCE           MPUI_RECONNECT_LIMIT
LANG_ENGLISH        "Reconnect Limit"

REFERENCE           MPUI_RESTART_MAP
LANG_ENGLISH        "Restart Map"

REFERENCE           MPUI_1_RESTART_MAP
LANG_ENGLISH        "1. Restart Map"

REFERENCE           MPUI_PLAYERSUSING
LANG_ENGLISH        "Players Using:"

REFERENCE           MPUI_CLICK_TO_CONTINUE
LANG_ENGLISH        "Click to Continue"

REFERENCE           MPUI_PRESS_A_TO_CONTINUE
LANG_ENGLISH        "Press (A) to Continue"

REFERENCE           MPUI_PUNKBUSTER
LANG_ENGLISH        "PunkBuster"

REFERENCE           MPUI_ENABLEPUNKBUSTERTOCONNECT
LANG_ENGLISH        "You must enable PunkBuster on the client to connect to a PunkBuster enabled server.\\nEnable PunkBuster and connect?"

REFERENCE           MPUI_SYNCPUNKBUSTERSTARTLISTENSERVER
LANG_ENGLISH        "You must enable PunkBuster on the client before starting a non-dedicated server.\\nEnable PunkBuster and start?"

REFERENCE           MPUI_PUNKBUSTERWITHCOLON
LANG_ENGLISH        "PunkBuster:"

REFERENCE           MPUI_PUNKBUSTERWITHCOLONANDTWOSPACES
LANG_ENGLISH        "PunkBuster:  "

REFERENCE           MPUI_1_CHANGE_WEAPON
LANG_ENGLISH        "1. Change Weapon"

REFERENCE           MPUI_2_CHANGE_TEAM
LANG_ENGLISH        "2. Change Team"

REFERENCE           MPUI_3_MUTE_PLAYERS
LANG_ENGLISH        "3. Mute Players"

REFERENCE           MPUI_4_CALL_VOTE
LANG_ENGLISH        "4. Call Vote"

REFERENCE           MPUI_5_LEAVE_GAME
LANG_ENGLISH        "5. Leave Game"

REFERENCE           MPUI_CHANGE_WEAPON
LANG_ENGLISH        "Change Weapon"

REFERENCE           MPUI_CHANGE_TEAM
LANG_ENGLISH        "Change Team"

REFERENCE           MPUI_LEAVE_GAME
LANG_ENGLISH        "Leave Game"

REFERENCE           MPUI_LEAVE_GAME1
LANG_ENGLISH        "Leave Game?"

REFERENCE           MPUI_THUMBSTICK_LAYOUT
LANG_ENGLISH        "Stick Layout:"

REFERENCE           MPUI_BUTTON_LAYOUT
LANG_ENGLISH        "Button Layout:"

REFERENCE           MPUI_LOOK_SENSITIVITY
LANG_ENGLISH        "Look Sensitivity:"

REFERENCE           MPUI_LOOK_INVERSION
LANG_ENGLISH        "Look Inversion:"

REFERENCE           MPUI_CONTROLLER_VIBRATION
LANG_ENGLISH        "Controller Vibration:"

REFERENCE           MPUI_END_GAME
LANG_ENGLISH        "End Game"

REFERENCE           MPUI_END_GAME1
LANG_ENGLISH        "End Game?"

REFERENCE           MPUI_TEAMS
LANG_ENGLISH        "Teams"

REFERENCE           MPUI_1_YES
LANG_ENGLISH        "1. Yes"

REFERENCE           MPUI_2_NO
LANG_ENGLISH        "2. No"

REFERENCE           MPUI_MUTE_PLAYERS
LANG_ENGLISH        "Mute Players"

REFERENCE           MPUI_ENABLE_VOICE_CHAT
LANG_ENGLISH        "Enable Voice Chat"

REFERENCE           MPUI_DISABLE_VOICE_CHAT
LANG_ENGLISH        "Disable Voice Chat"

REFERENCE           MPUI_SABOTAGE_COUNTDOWN
LANG_ENGLISH        "Gridiron"

REFERENCE           MPUI_SEARCH_AND_DESTROY_MULTI
LANG_ENGLISH        "Search and Destroy"

REFERENCE           MPUI_CRASH
LANG_ENGLISH        "Crash"

REFERENCE           MPUI_FACILITY
LANG_ENGLISH        "Facility"

REFERENCE           MPUI_ARGUN
LANG_ENGLISH        "Argun"

REFERENCE           MPUI_STRIKE
LANG_ENGLISH        "Strike"

REFERENCE           MPUI_BACKLOT
LANG_ENGLISH        "Backlot"

REFERENCE           MPUI_DUSK
LANG_ENGLISH        "Dusk"

REFERENCE           MPUI_CONVOY
LANG_ENGLISH        "Ambush"

REFERENCE           MPUI_CITYSTREETS
LANG_ENGLISH        "District"

REFERENCE           MPUI_PIPELINE
LANG_ENGLISH        "Pipeline"

REFERENCE           MPUI_CELLBLOCK
LANG_ENGLISH        "Cellblock"

REFERENCE           MPUI_MANSION
LANG_ENGLISH        "Mansion"

REFERENCE           MPUI_PALACE
LANG_ENGLISH        "Palace"

REFERENCE           MPUI_SHIPMENT
LANG_ENGLISH        "Shipment"

REFERENCE           MPUI_CHECKPOINT
LANG_ENGLISH        "Karachi"

REFERENCE           MPUI_INVASION
LANG_ENGLISH        "Invasion"

REFERENCE           MPUI_SUBURBIA
LANG_ENGLISH        "Arcadia"

REFERENCE           MPUI_HIGHRISE
LANG_ENGLISH        "Highrise"

REFERENCE           MPUI_TERMINAL
LANG_ENGLISH        "Terminal"

REFERENCE           MPUI_FUEL
LANG_ENGLISH        "Fuel"

REFERENCE           MPUI_TRAILER
LANG_ENGLISH        "Trailer"

REFERENCE           MPUI_FIRINGRANGE
LANG_ENGLISH        "Firing Range"

REFERENCE           MPUI_RUNDOWN
LANG_ENGLISH        "Rundown"

REFERENCE           MPUI_AFGHAN
LANG_ENGLISH        "Afghan"

REFERENCE           MPUI_UNDERPASS
LANG_ENGLISH        "Underpass"

REFERENCE           MPUI_ESTATE
LANG_ENGLISH        "Estate"

REFERENCE           MPUI_RUST
LANG_ENGLISH        "Rust"

REFERENCE           MPUI_SUBBASE
LANG_ENGLISH        "Sub Base"

REFERENCE           MPUI_QUARRY
LANG_ENGLISH        "Quarry"

REFERENCE           MPUI_RAID
LANG_ENGLISH        "Skidrow"

REFERENCE           MPUI_CRIB_BASEMENT
LANG_ENGLISH        "Crib - Basement"

REFERENCE           MPUI_MALL
LANG_ENGLISH        "Mall"

REFERENCE           MPUI_SKIDROW
LANG_ENGLISH        "Skidrow"

REFERENCE           MPUI_BROADCAST
LANG_ENGLISH        "Broadcast"

REFERENCE           MPUI_RIVERWALK
LANG_ENGLISH        "Riverwalk"

REFERENCE           MPUI_FAVELA
LANG_ENGLISH        "Favela"

REFERENCE           MPUI_OILRIG
LANG_ENGLISH        "Oil Rig"

REFERENCE           MPUI_DOWNTOWN_LA
LANG_ENGLISH        "Plaza"

REFERENCE           MPUI_WASTELAND
LANG_ENGLISH        "Wasteland"

REFERENCE           MPUI_VERDICT
LANG_ENGLISH        "Verdict"

REFERENCE           MPUI_VERTIGO
LANG_ENGLISH        "Vertigo"

REFERENCE           MPUI_DERAIL
LANG_ENGLISH        "Derail"

REFERENCE           MPUI_BONEYARD
LANG_ENGLISH        "Scrapyard"

REFERENCE           MPUI_SHIPMENTSS
LANG_ENGLISH        "Shipment(Splitscreen)"

REFERENCE           MPUI_ENDROUND
LANG_ENGLISH        "End Round"

REFERENCE           MPUI_MENU
LANG_ENGLISH        "Menu"

REFERENCE           MPUI_SEARCH_AND_DESTROY_CLASSIC
LANG_ENGLISH        "Search and Destroy"

REFERENCE           MPUI_SABOTAGE_HOTPOTATO
LANG_ENGLISH        "Sabotage"

REFERENCE           MPUI_TEAM_HARDPOINT
LANG_ENGLISH        "Team Deathmatch"

REFERENCE           MPUI_HARDPOINT
LANG_ENGLISH        "Free-for-all"

REFERENCE           MPUI_ROOFTOPS
LANG_ENGLISH        "Rooftops"

REFERENCE           MPUI_OVERGROWN
LANG_ENGLISH        "Overgrown"

REFERENCE           MPUI_OVERGROWN_NIGHT
LANG_ENGLISH        "Overgrown Night"

REFERENCE           MPUI_CITYSTREETS_NIGHT
LANG_ENGLISH        "Citystreets Night"

REFERENCE           MPUI_STRIKE_NIGHT
LANG_ENGLISH        "Strike Night"

REFERENCE           MPUI_HILL
LANG_ENGLISH        "Hill"

REFERENCE           MPUI_CROSSFIRE
LANG_ENGLISH        "Crossfire"

REFERENCE           MPUI_FARM
LANG_ENGLISH        "Downpour"

REFERENCE           MPUI_VACANT
LANG_ENGLISH        "Vacant"

REFERENCE           MPUI_BLOC
LANG_ENGLISH        "Bloc"

REFERENCE           MPUI_CARGOSHIP
LANG_ENGLISH        "Wet Work"

REFERENCE           MPUI_COUNTDOWN
LANG_ENGLISH        "Countdown"

REFERENCE           MPUI_SHOWDOWN
LANG_ENGLISH        "Showdown"

REFERENCE           MPUI_FIND_GAME
LANG_ENGLISH        "Find Game"

REFERENCE           MPUI_PRIVATE_MATCH
LANG_ENGLISH        "Private Match"

REFERENCE           MPUI_CREATE_A_CLASS
LANG_ENGLISH        "Create a Class"

REFERENCE           MPUI_BARRACKS
LANG_ENGLISH        "Barracks"

REFERENCE           MPUI_PARTY_INVITE
LANG_ENGLISH        "Invite"

REFERENCE           MPUI_CREATE_PARTY
LANG_ENGLISH        "Create Party"

REFERENCE           MPUI_GAME_SUMMARY
LANG_ENGLISH        "Game Summary"

REFERENCE           MPUI_N_XP
LANG_ENGLISH        "&&1 XP"

REFERENCE           MPUI_RANK
LANG_ENGLISH        "Rank"

REFERENCE           MPUI_NAME
LANG_ENGLISH        "Name"

REFERENCE           MPUI_X_SLASH_Y
LANG_ENGLISH        "&&1/&&2"

REFERENCE           MPUI_MATCHBONUS
LANG_ENGLISH        "Match Bonus"

REFERENCE           MPUI_SCORE_PRE
LANG_ENGLISH        "Score:"

REFERENCE           MPUI_CHALLENGES_PRE
LANG_ENGLISH        "Challenges:"

REFERENCE           MPUI_MATCHBONUS_PRE
LANG_ENGLISH        "Match Bonus:"

REFERENCE           MPUI_TOTALXP_PRE
LANG_ENGLISH        "Total XP Earned:"

REFERENCE           MPUI_TOTAL_EARNED_PRE
LANG_ENGLISH        "Total Earned:"

REFERENCE           MPUI_XP_EARNED_PRE_N
LANG_ENGLISH        "XP Earned: &&1"

REFERENCE           MPUI_SCORE_PRE_N
LANG_ENGLISH        "Score: &&1"

REFERENCE           MPUI_RANK_PRE
LANG_ENGLISH        "Rank:"

REFERENCE           MPUI_XP_REQUIRED_PRE
LANG_ENGLISH        "XP Required:"

REFERENCE           MPUI_NEXT_RANK_PRE
LANG_ENGLISH        "Next Rank:"

REFERENCE           MPUI_WEAPON_PRE
LANG_ENGLISH        "Weapon:"

REFERENCE           MPUI_PERK_PRE
LANG_ENGLISH        "Perk:"

REFERENCE           MPUI_CHALLENGE_PRE
LANG_ENGLISH        "Contract:"

REFERENCE           MPUI_CAMO_PRE
LANG_ENGLISH        "Camo:"

REFERENCE           MPUI_XP_PRE
LANG_ENGLISH        "XP:"

REFERENCE           MPUI_ATTACHMENT_PRE
LANG_ENGLISH        "Attachment:"

REFERENCE           MPUI_FEATURE_PRE
LANG_ENGLISH        "Feature:"

REFERENCE           MPUI_GAME_SETUP
LANG_ENGLISH        "Game Setup"

REFERENCE           MPUI_SCORE
LANG_ENGLISH        "Score"

REFERENCE           MPUI_LEVEL_N
LANG_ENGLISH        "Lv &&1"

REFERENCE           MPUI_KILLS_PRE
LANG_ENGLISH        "Kills:"

REFERENCE           MPUI_ASSISTS_PRE
LANG_ENGLISH        "Assists:"

REFERENCE           MPUI_STREAK_PRE
LANG_ENGLISH        "Streak:"

REFERENCE           MPUI_DEATHS_PRE
LANG_ENGLISH        "Deaths:"

REFERENCE           MPUI_TIME_PLAYED_PRE
LANG_ENGLISH        "Time Played:"

REFERENCE           MPUI_WINS
LANG_ENGLISH        "Wins"

REFERENCE           MPUI_LOSSES
LANG_ENGLISH        "Losses"

REFERENCE           MPUI_RATIO
LANG_ENGLISH        "Ratio"

REFERENCE           MPUI_ACCURACY
LANG_ENGLISH        "Accuracy"

REFERENCE           MPUI_KILLS
LANG_ENGLISH        "Kills"

REFERENCE           MPUI_PLAYER
LANG_ENGLISH        "Player"

REFERENCE           MPUI_TIME_PLAYED
LANG_ENGLISH        "Time Played"

REFERENCE           MPUI_LEVEL
LANG_ENGLISH        "Level"

REFERENCE           MPUI_MISSES
LANG_ENGLISH        "Misses"

REFERENCE           MPUI_HITS
LANG_ENGLISH        "Hits"

REFERENCE           MPUI_FRIENDS
LANG_ENGLISH        "Friends"

REFERENCE           MPUI_SCORE_GLOBAL
LANG_ENGLISH        "Score (Global)"

REFERENCE           MPUI_SCORE_FRIENDS
LANG_ENGLISH        "Score (Friends)"

REFERENCE           MPUI_KILLS_GLOBAL
LANG_ENGLISH        "Kills (Global)"

REFERENCE           MPUI_KILLS_FRIENDS
LANG_ENGLISH        "Kills (Friends)"

REFERENCE           MPUI_ACCURACY_GLOBAL
LANG_ENGLISH        "Accuracy (Global)"

REFERENCE           MPUI_ACCURACY_FRIENDS
LANG_ENGLISH        "Accuracy (Friends)"

REFERENCE           MPUI_WINS_GLOBAL
LANG_ENGLISH        "Wins (Global)"

REFERENCE           MPUI_WINS_FRIENDS
LANG_ENGLISH        "Wins (Friends)"

REFERENCE           MPUI_CLAN_TAG
LANG_ENGLISH        "Clan Tag"

REFERENCE           MPUI_CLAN_TAG_CAPS
LANG_ENGLISH        "CLAN TAG"

REFERENCE           MPUI_PRESTIGE_MODE
LANG_ENGLISH        "Prestige Mode"

REFERENCE           MPUI_PRESTIGE_MODE_CAPS
LANG_ENGLISH        "PRESTIGE MODE"

REFERENCE           MPUI_YOUR_CLASSES
LANG_ENGLISH        "Aliases"

REFERENCE           MPUI_PERK1
LANG_ENGLISH        "Perk 1"

REFERENCE           MPUI_PERK2
LANG_ENGLISH        "Perk 2"

REFERENCE           MPUI_PERK3
LANG_ENGLISH        "Perk 3"

REFERENCE           MPUI_RENAME
LANG_ENGLISH        "Alias"

REFERENCE           MPUI_PRIMARY_WEAPON
LANG_ENGLISH        "Primary Weapon"

REFERENCE           MPUI_SECONDARY_WEAPON
LANG_ENGLISH        "Secondary Weapon"

REFERENCE           MPUI_SIDE_ARM
LANG_ENGLISH        "Side Arm"

REFERENCE           MPUI_OFFHAND_GRENADE
LANG_ENGLISH        "Offhand Grenade"

REFERENCE           MPUI_TIME_LIMIT_PRE
LANG_ENGLISH        "Time Limit:"

REFERENCE           MPUI_ROUND_LENGTH_PRE
LANG_ENGLISH        "Round Length:"

REFERENCE           MPUI_SCORE_LIMIT_PRE
LANG_ENGLISH        "Score Limit:"

REFERENCE           MPUI_SPECTATING_PRE
LANG_ENGLISH        "Spectating:"

REFERENCE           MPUI_KILLCAM_PRE
LANG_ENGLISH        "Allow Killcam:"

REFERENCE           MPUI_FORCE_RESPAWN_PRE
LANG_ENGLISH        "Force Respawn:"

REFERENCE           MPUI_FRIENDY_FIRE_PRE
LANG_ENGLISH        "Friendly Fire:"

REFERENCE           MPUI_NUMLIVES_PRE
LANG_ENGLISH        "Number of Lives:"

REFERENCE           MPUI_RESPAWN_DELAY_PRE
LANG_ENGLISH        "Respawn Delay:"

REFERENCE           MPUI_MAX_HEALTH_PRE
LANG_ENGLISH        "Max Health:"

REFERENCE           MPUI_HEALTH_REGEN_PRE
LANG_ENGLISH        "Health Regeneration:"

REFERENCE           MPUI_SPRINT_PRE
LANG_ENGLISH        "Allow Sprint:"

REFERENCE           MPUI_HEADSHOTS_PRE
LANG_ENGLISH        "Headshots:"

REFERENCE           MPUI_HEADSHOTS_ONLY_PRE
LANG_ENGLISH        "Headshots Only:"

REFERENCE           MPUI_PERKS_PRE
LANG_ENGLISH        "Allow Perks:"

REFERENCE           MPUI_OLDSCHOOL_PRE
LANG_ENGLISH        "Old School Mode:"

REFERENCE           MPUI_HARDCORE_PRE
LANG_ENGLISH        "Hardcore Mode:"

REFERENCE           MPUI_BOMB_TIMER_PRE
LANG_ENGLISH        "Bomb Timer:"

REFERENCE           MPUI_PLANT_TIME_PRE
LANG_ENGLISH        "Bomb Plant Time:"

REFERENCE           MPUI_DEFUSE_PRE
LANG_ENGLISH        "Bomb Defuse Time:"

REFERENCE           MPUI_MULTIBOMB_PRE
LANG_ENGLISH        "Multi-Bomb Mode:"

REFERENCE           MPUI_HOT_POTATO_PRE
LANG_ENGLISH        "Hot Potato Mode:"

REFERENCE           MPUI_ROUND_LIMIT_PRE
LANG_ENGLISH        "Number of Rounds:"

REFERENCE           MPUI_ROUND_SWITCH_PRE
LANG_ENGLISH        "Round Switch:"

REFERENCE           MPUI_CHANGE_RULES
LANG_ENGLISH        "Change Rules"

REFERENCE           MPUI_MOTD
LANG_ENGLISH        "Message of the Day"

REFERENCE           MPUI_PLAYER_OPTIONS
LANG_ENGLISH        "Player Options"

REFERENCE           MPUI_YES
LANG_ENGLISH        "Yes"

REFERENCE           MPUI_NO
LANG_ENGLISH        "No"

REFERENCE           MPUI_CHALLENGES
LANG_ENGLISH        "Challenges"

REFERENCE           MPUI_CHALLENGES_CAPS
LANG_ENGLISH        "CHALLENGES"

REFERENCE           MPUI_DESC_FIND_GAME
LANG_ENGLISH        "Pick a game mode and quickly join a game online."

REFERENCE           MPUI_DESC_FIND_GAME_LOCKED
LANG_ENGLISH        "Only the party host can find games."

REFERENCE           MPUI_DESC_PRIVATE_MATCH
LANG_ENGLISH        "Host a custom game where you can play with your friends."

REFERENCE           MPUI_DESC_PRIVATE_MATCH_LOCKED
LANG_ENGLISH        "Only the party host can start a private match."

REFERENCE           MPUI_DESC_CREATE_A_CLASS_LOCKED
LANG_ENGLISH        "Unlocked at Lance Corporal (Lv4)."

REFERENCE           MPUI_DESC_CREATE_A_CLASS
LANG_ENGLISH        "Create your own custom classes."

REFERENCE           MPUI_DESC_BARRACKS
LANG_ENGLISH        "Challenges, Accolades, and Leaderboards."

REFERENCE           MPUI_DESC_PARTY_INVITE
LANG_ENGLISH        "Invite friends to your party."

REFERENCE           MPUI_DESC_PLAYER_OPTIONS
LANG_ENGLISH        "Open player options menu."

REFERENCE           MPUI_DESC_GAME_SETUP
LANG_ENGLISH        "Change map, game type and rules."

REFERENCE           MPUI_DESC_GAME_SETUP_LOCKED
LANG_ENGLISH        "Only the lobby host can change the game options."

REFERENCE           MPUI_DESC_CHANGE_GAMETYPE
LANG_ENGLISH        "Choose a different Game Mode."

REFERENCE           MPUI_DESC_CHANGE_RULES
LANG_ENGLISH        "Edit the rules for this match."

REFERENCE           MPUI_PRIVATE_MATCH_LOBBY
LANG_ENGLISH        "PRIVATE MATCH"

REFERENCE           MPUI_PUBLIC_MATCH_LOBBY
LANG_ENGLISH        "PUBLIC MATCH LOBBY"

REFERENCE           MPUI_UNLOCKXP
LANG_ENGLISH        "Unlocked at &&1 (Lv&&2)"

REFERENCE           MPUI_MAXPARTYSIZE
LANG_ENGLISH        "Maximum party size of &&1"

REFERENCE           MPUI_MINPARTYSIZE
LANG_ENGLISH        "Minimum party size of &&1"

REFERENCE           MPUI_NOPUNKBUSTER
LANG_ENGLISH        "Unable to initialize Punkbuster.  Punkbuster is disabled."

REFERENCE           MPUI_NONE
LANG_ENGLISH        "None"

REFERENCE           MPUI_PRESTIGE
LANG_ENGLISH        "Prestige"

REFERENCE           MPUI_CALLVOTE
LANG_ENGLISH        "CALL VOTE"

REFERENCE           MPUI_VOTE
LANG_ENGLISH        "Vote"

REFERENCE           MPUI_END_GAME2
LANG_ENGLISH        "End Game?"

REFERENCE           MPUI_PRIMARY_WEAPON1
LANG_ENGLISH        "Primary Weapon"

REFERENCE           MPUI_SPECTATOR
LANG_ENGLISH        "Spectator"

REFERENCE           MPUI_CHOOSE_CLASS
LANG_ENGLISH        "Choose Class"

REFERENCE           MPUI_CHANGE_GAME_MODE
LANG_ENGLISH        "Change Game Mode"

REFERENCE           MPUI_GAME_RULES
LANG_ENGLISH        "Game Rules"

REFERENCE           MPUI_JOININPROGRESS_ALLOWED
LANG_ENGLISH        "Join-in-progress: Allowed"

REFERENCE           MPUI_JOININPROGRESS_NOT_ALLOWED
LANG_ENGLISH        "Join-in-progress: Not Allowed"

REFERENCE           MPUI_SIDE_ARM1
LANG_ENGLISH        "Side Arm"

REFERENCE           MPUI_SPECIAL_GRENADE
LANG_ENGLISH        "Offhand"

REFERENCE           MPUI_PERK_1
LANG_ENGLISH        "Perk 1"

REFERENCE           MPUI_PERK_2
LANG_ENGLISH        "Perk 2"

REFERENCE           MPUI_PERK_3
LANG_ENGLISH        "Perk 3"

REFERENCE           MPUI_NO_ATTACHMENT
LANG_ENGLISH        "No Attachment"

REFERENCE           MPUI_ACOG_SCOPE
LANG_ENGLISH        "ACOG Scope"

REFERENCE           MPUI_RED_DOT_SIGHT
LANG_ENGLISH        "Red Dot Sight"

REFERENCE           MPUI_SILENCER
LANG_ENGLISH        "Silencer"

REFERENCE           MPUI_GRENADE_LAUNCHER
LANG_ENGLISH        "Grenade Launcher"

REFERENCE           MPUI_DESERT
LANG_ENGLISH        "Desert"

REFERENCE           MPUI_WOODLAND
LANG_ENGLISH        "Woodland"

REFERENCE           MPUI_DIGITAL
LANG_ENGLISH        "Digital"

REFERENCE           MPUI_RED_TIGER
LANG_ENGLISH        "Red Tiger"

REFERENCE           MPUI_BLUE_TIGER
LANG_ENGLISH        "Blue Tiger"

REFERENCE           MPUI_GOLDEN
LANG_ENGLISH        "Golden"

REFERENCE           MPUI_PRESTIGE1
LANG_ENGLISH        "Prestige"

REFERENCE           MPUI_ASSAULT_RIFLES
LANG_ENGLISH        "Assault Rifles"

REFERENCE           MPUI_SUB_MACHINE_GUNS
LANG_ENGLISH        "Sub Machine Guns"

REFERENCE           MPUI_LIGHT_MACHINE_GUNS
LANG_ENGLISH        "Light Machine Guns"

REFERENCE           MPUI_SHOTGUNS
LANG_ENGLISH        "Shotguns"

REFERENCE           MPUI_SNIPER_RIFLES
LANG_ENGLISH        "Sniper Rifles"

REFERENCE           MPUI_RENAME_CLASS
LANG_ENGLISH        "Rename Class"

REFERENCE           MPUI_CHOOSE_TEAM
LANG_ENGLISH        "CHOOSE TEAM"

REFERENCE           MPUI_DESC_PRIVATE_JIP
LANG_ENGLISH        "Toggle to allow friends to join session in progress."

REFERENCE           MPUI_PISTOL
LANG_ENGLISH        "Pistol"

REFERENCE           MPUI_SNIPER_RIFLE
LANG_ENGLISH        "Sniper Rifle"

REFERENCE           MPUI_ASSAULT_RIFLE
LANG_ENGLISH        "Assault Rifle"

REFERENCE           MPUI_SUB_MACHINE_GUN
LANG_ENGLISH        "Sub Machine Gun"

REFERENCE           MPUI_SHOTGUN
LANG_ENGLISH        "Shotgun"

REFERENCE           MPUI_LIGHT_MACHINE_GUN
LANG_ENGLISH        "Light Machine Gun"

REFERENCE           MPUI_UNLOCKED
LANG_ENGLISH        "You have unlocked..."

REFERENCE           MPUI_NEW_CHALLENGES
LANG_ENGLISH        "New Challenges"

REFERENCE           MPUI_NEW_CHALLENGES_DESC
LANG_ENGLISH        "New challenges are available."

REFERENCE           MPUI_DESC_LEADERBOARDS
LANG_ENGLISH        "Compare stats with your friends and the world."

REFERENCE           MPUI_DESC_CHALLENGES
LANG_ENGLISH        "Complete challenges to gain XP and unlock items."

REFERENCE           MPUI_DESC_CHALLENGES2
LANG_ENGLISH        "Unlocked at Lance Corporal I (Lv5)."

REFERENCE           MPUI_DESC_CLANTAG
LANG_ENGLISH        "Set your Clan Tag."

REFERENCE           MPUI_DESC_CLANTAG2
LANG_ENGLISH        "Unlocked at Lance Corporal II (Lv6)."

REFERENCE           MPUI_DESC_PRESTIGE
LANG_ENGLISH        "Continue your advancement."

REFERENCE           MPUI_DESC_PRESTIGE2
LANG_ENGLISH        "Unlocked after Commander (Lv70)."

REFERENCE           MPUI_DESC_LEADERBOARD_WINS
LANG_ENGLISH        "Compare your win/loss record to your friends and the world."

REFERENCE           MPUI_DESC_LEADERBOARD_KILLS
LANG_ENGLISH        "See your total kills, deaths, k/d ratio, and best kill streak."

REFERENCE           MPUI_DESC_LEADERBOARD_ACCURACY
LANG_ENGLISH        "Find out how well you're doing with your shot placement."

REFERENCE           MPUI_GRIP
LANG_ENGLISH        "Grip"

REFERENCE           MPUI_END_GAME_WARNING
LANG_ENGLISH        "Are you sure you wish to end the session for all players?"

REFERENCE           MPUI_CHOOSE_CLASS_CAP
LANG_ENGLISH        "CHOOSE CLASS"

REFERENCE           MPUI_CUSTOM_CLASSES
LANG_ENGLISH        "Custom Classes"

REFERENCE           MPUI_DEFAULT_CLASSES
LANG_ENGLISH        "Default Classes"

REFERENCE           MPUI_PERKS_AND_INVENTORY
LANG_ENGLISH        "Perks"

REFERENCE           MPUI_CREATE_A_CLASS_CAP
LANG_ENGLISH        "CREATE A CLASS"

REFERENCE           MPUI_VOTE_TO_SKIP
LANG_ENGLISH        "Vote to Skip"

REFERENCE           MPUI_DESC_VOTE_TO_SKIP
LANG_ENGLISH        "Vote to skip this map."

REFERENCE           MPUI_VOTE_CAST
LANG_ENGLISH        "Vote Cast"

REFERENCE           MPUI_LAST_STAND
LANG_ENGLISH        "Last Stand!"

REFERENCE           MPUI_FINAL_STAND
LANG_ENGLISH        "Final Stand!"

REFERENCE           MPUI_DESC_MAP_SUBURBIA
LANG_ENGLISH        "<Description Needed>"

REFERENCE           MPUI_DESC_MAP_CRIB_BASEMENT
LANG_ENGLISH        "<Description Needed>"

REFERENCE           MPUI_DESC_MAP_HIGHRISE
LANG_ENGLISH        "Rooftop skyscraper.  Hectic Domination games."

REFERENCE           MPUI_DESC_MAP_TERMINAL
LANG_ENGLISH        "Medium-sized airport.  Great for all game modes."

REFERENCE           MPUI_DESC_MAP_RUNDOWN
LANG_ENGLISH        "Village in Brazil.  Fight from all angles."

REFERENCE           MPUI_DESC_MAP_SUBBASE
LANG_ENGLISH        "Snowy submarine base.  Great vertical gameplay."

REFERENCE           MPUI_DESC_MAP_UNDERPASS
LANG_ENGLISH        "Rainy underpass.  Good balance of medium to long range fighting."

REFERENCE           MPUI_DESC_MAP_QUARRY
LANG_ENGLISH        "Medium-sized quarry.  Intense Capture the Flag matches."

REFERENCE           MPUI_DESC_MAP_NIGHTSHIFT
LANG_ENGLISH        "Urban city fighting.  In and out of apartments close range engagements."

REFERENCE           MPUI_DESC_MAP_RIVERWALK
LANG_ENGLISH        "<Description Needed>"

REFERENCE           MPUI_DESC_MAP_FAVELA
LANG_ENGLISH        "Alleyways of Brazil.  Great for all game modes and all sizes."

REFERENCE           MPUI_DESC_MAP_OILRIG
LANG_ENGLISH        "<Description Needed>"

REFERENCE           MPUI_DESC_MAP_DOWNTOWN_LA
LANG_ENGLISH        "<Description Needed>"

REFERENCE           MPUI_DESC_MAP_BRECOURT
LANG_ENGLISH        "Chernobyl in the open.  Great for snipers and long range firefights."

REFERENCE           MPUI_DESC_MAP_VERDICT
LANG_ENGLISH        "<Description Needed>"

REFERENCE           MPUI_DESC_MAP_VERTIGO
LANG_ENGLISH        "<Description Needed>"

REFERENCE           MPUI_DESC_MAP_DERAIL
LANG_ENGLISH        "Trainwreck in a large snowy area.  Epic large battles.\\n"

REFERENCE           MPUI_DESC_MAP_BONEYARD
LANG_ENGLISH        "Small airplane graveyard.  Great for any number of players."

REFERENCE           MPUI_DESC_MAP_INVASION
LANG_ENGLISH        "City in the desert.  Classic street to street firefights."

REFERENCE           MPUI_DESC_MAP_CHECKPOINT
LANG_ENGLISH        "Ravaged desert town.  Tactical street fights abound."

REFERENCE           MPUI_DESC_MAP_MALL
LANG_ENGLISH        "<Description Needed>"

REFERENCE           MPUI_DESC_MAP_SKIDROW
LANG_ENGLISH        "<Description Needed>"

REFERENCE           MPUI_DESC_MAP_FUEL
LANG_ENGLISH        "<Description Needed>"

REFERENCE           MPUI_DESC_MAP_TRAILER
LANG_ENGLISH        "<Description Needed>"

REFERENCE           MPUI_DESC_MAP_FIRINGRANGE
LANG_ENGLISH        "<Description Needed>"

REFERENCE           MPUI_DESC_MAP_AFGHAN
LANG_ENGLISH        "Medium sized open desert.  Intense Demolition battles."

REFERENCE           MPUI_DESC_MAP_ESTATE
LANG_ENGLISH        "Cabin in the woods.  Fight for control of the cabin."

REFERENCE           MPUI_DESC_MAP_RUST
LANG_ENGLISH        "Tiny desert sandstorm.  Fast-paced action on a small map."

REFERENCE           MPUI_DESC_MAP_BACKLOT
LANG_ENGLISH        "Medium sized construction site.  Great level for any mode."

REFERENCE           MPUI_DESC_MAP_BLOC
LANG_ENGLISH        "Large Russian apartment bloc.  Intense Domination matches."

REFERENCE           MPUI_DESC_MAP_BOG
LANG_ENGLISH        "Small desert bog.  Open level, excellent for smaller groups."

REFERENCE           MPUI_DESC_MAP_CARGOSHIP
LANG_ENGLISH        "Medium-large cargoship.  Fast-paced Search and Destroy matches."

REFERENCE           MPUI_DESC_MAP_CITYSTREETS
LANG_ENGLISH        "Large urban town with a market in the middle.  Great for team games."

REFERENCE           MPUI_DESC_MAP_CONVOY
LANG_ENGLISH        "Large desert town.  Excels in Sabotage matches."

REFERENCE           MPUI_DESC_MAP_COUNTDOWN
LANG_ENGLISH        "Open launch pad.  Huge sight lines and dangerous maneuvering."

REFERENCE           MPUI_DESC_MAP_CRASH
LANG_ENGLISH        "Downed Sea Knight in a desert town.  Fantastic team games."

REFERENCE           MPUI_DESC_MAP_CROSSFIRE
LANG_ENGLISH        "Small desert town.  Intense interior fighting and strong firefights."

REFERENCE           MPUI_DESC_MAP_FARM
LANG_ENGLISH        "Big rainy Russian farm.  Excellent for Sabotage matches."

REFERENCE           MPUI_DESC_MAP_OVERGROWN
LANG_ENGLISH        "Large overgrown rural Russian area. Sniper ghillie suits make for good cover..."

REFERENCE           MPUI_DESC_PIPELINE
LANG_ENGLISH        "Russian trainyard. Excellent team games."

REFERENCE           MPUI_DESC_MAP_SHIPMENT
LANG_ENGLISH        "Tiny Russian shipyard.  Fast paced action with no hiding."

REFERENCE           MPUI_DESC_MAP_SHOWDOWN
LANG_ENGLISH        "Small desert arena.  Great fast gameplay for small numbers of players."

REFERENCE           MPUI_DESC_MAP_STRIKE
LANG_ENGLISH        "Large urban desert town.  Excellent team games."

REFERENCE           MPUI_DESC_MAP_VACANT
LANG_ENGLISH        "Deserted Russian office.  Intense interior fighting."

REFERENCE           MPUI_DESC_MAP_BROADCAST
LANG_ENGLISH        "TV Station."

REFERENCE           MPUI_DESC_MAP_PIPELINE
LANG_ENGLISH        "Russian trainyard.  Excellent team games."

REFERENCE           MPUI_RULES_PLAYER_OPTIONS
LANG_ENGLISH        "Player Options"

REFERENCE           MPUI_RULES_GAMEPLAY_OPTIONS
LANG_ENGLISH        "Gameplay Options"

REFERENCE           MPUI_RULES_TEAM_OPTIONS
LANG_ENGLISH        "Team Options"

REFERENCE           MPUI_GAME_RULES_CAP
LANG_ENGLISH        "GAME RULES"

REFERENCE           MPUI_RULES_ITEM_2LIVES
LANG_ENGLISH        "2 Lives"

REFERENCE           MPUI_RULES_ITEM_LIFE
LANG_ENGLISH        "1 Life"

REFERENCE           MPUI_RULES_UNLIMITED
LANG_ENGLISH        "Unlimited"

REFERENCE           MPUI_RULES_NUMBER_OF_LIVES
LANG_ENGLISH        "Number of Lives:"

REFERENCE           MPUI_RULES_RESPAWN_DELAY
LANG_ENGLISH        "Respawn Delay:"

REFERENCE           MPUI_RULES_NONE
LANG_ENGLISH        "None"

REFERENCE           MPUI_RULES_5SECONDS
LANG_ENGLISH        "5 Seconds"

REFERENCE           MPUI_RULES_MAX_HEALTH
LANG_ENGLISH        "Max Health:"

REFERENCE           MPUI_RULES_MINISCULE
LANG_ENGLISH        "Miniscule"

REFERENCE           MPUI_RULES_HALF
LANG_ENGLISH        "Half"

REFERENCE           MPUI_RULES_NORMAL
LANG_ENGLISH        "Normal"

REFERENCE           MPUI_RULES_DOUBLE
LANG_ENGLISH        "Double"

REFERENCE           MPUI_RULES_HEALTH_REGEN
LANG_ENGLISH        "Health Regeneration:"

REFERENCE           MPUI_RULES_ALLOW_SPRINT
LANG_ENGLISH        "Allow Sprint:"

REFERENCE           MPUI_RULES_SLOW
LANG_ENGLISH        "Slow"

REFERENCE           MPUI_RULES_SPECTATING
LANG_ENGLISH        "Spectating:"

REFERENCE           MPUI_RULES_ITEM_3LIVES
LANG_ENGLISH        "3 Lives"

REFERENCE           MPUI_RULES_ITEM_5LIVES
LANG_ENGLISH        "5 Lives"

REFERENCE           MPUI_RULES_ITEM_9LIVES
LANG_ENGLISH        "9 Lives"

REFERENCE           MPUI_RULES_10SECONDS
LANG_ENGLISH        "10 Seconds"

REFERENCE           MPUI_RULES_15SECONDS
LANG_ENGLISH        "15 Seconds"

REFERENCE           MPUI_RULES_30SECONDS
LANG_ENGLISH        "30 Seconds"

REFERENCE           MPUI_RULES_TEAM_ONLY
LANG_ENGLISH        "Team Only"

REFERENCE           MPUI_RULES_FREE
LANG_ENGLISH        "Free"

REFERENCE           MPUI_RULES_PLAYERS_ONLY
LANG_ENGLISH        "Players Only"

REFERENCE           MPUI_RULES_RADAR_ALWAYS_ON
LANG_ENGLISH        "Radar Always On:"

REFERENCE           MPUI_RULE_ALLOW_KILLCAM
LANG_ENGLISH        "Allow KillCam:"

REFERENCE           MPUI_RULES_KILLCAM
LANG_ENGLISH        "KillCam:"

REFERENCE           MPUI_RULES_FORCE_RESPAWN
LANG_ENGLISH        "Force Respawn:"

REFERENCE           MPUI_RULES_FRIENDLY_FIRE
LANG_ENGLISH        "Friendly Fire:"

REFERENCE           MPUI_RULES_REFLECT
LANG_ENGLISH        "Reflect"

REFERENCE           MPUI_RULES_SHARED
LANG_ENGLISH        "Shared"

REFERENCE           MPUI_RULES_HEADSHOTS_ONLY
LANG_ENGLISH        "Headshots Only:"

REFERENCE           MPUI_RULES_ALLOW_PERKS
LANG_ENGLISH        "Allow Perks:"

REFERENCE           MPUI_RULES_PERKS
LANG_ENGLISH        "Perks:"

REFERENCE           MPUI_RULES_OLDSCHOOL
LANG_ENGLISH        "Old School Mode:"

REFERENCE           MPUI_RULES_HARDCORE
LANG_ENGLISH        "Hardcore Mode:"

REFERENCE           MPUI_RULES_AIRSUPPORT
LANG_ENGLISH        "Allow Air Support:"

REFERENCE           MPUI_RULES_KILLSTREAK_REWARDS
LANG_ENGLISH        "Killstreak Rewards:"

REFERENCE           MPUI_RULES_TIME_LIMIT
LANG_ENGLISH        "Time Limit:"

REFERENCE           MPUI_RULES_5MINUTES
LANG_ENGLISH        "5 Minutes"

REFERENCE           MPUI_RULES_10MINUTES
LANG_ENGLISH        "10 Minutes"

REFERENCE           MPUI_RULES_15MINUTES
LANG_ENGLISH        "15 Minutes"

REFERENCE           MPUI_RULES_20MINUTES
LANG_ENGLISH        "20 Minutes"

REFERENCE           MPUI_RULES_30MINUTES
LANG_ENGLISH        "30 Minutes"

REFERENCE           MPUI_RULES_SCORE_LIMIT
LANG_ENGLISH        "Score Limit:"

REFERENCE           MPUI_RULES_3POINTS
LANG_ENGLISH        "3 Points"

REFERENCE           MPUI_RULES_5POINTS
LANG_ENGLISH        "5 Points"

REFERENCE           MPUI_RULES_10POINTS
LANG_ENGLISH        "10 Points"

REFERENCE           MPUI_RULES_20POINTS
LANG_ENGLISH        "20 Points"

REFERENCE           MPUI_RULES_30POINTS
LANG_ENGLISH        "30 Points"

REFERENCE           MPUI_RULES_100POINTS
LANG_ENGLISH        "100 Points"

REFERENCE           MPUI_RULES_200POINTS
LANG_ENGLISH        "200 Points"

REFERENCE           MPUI_RULES_300POINTS
LANG_ENGLISH        "300 Points"

REFERENCE           MPUI_RULES_500POINTS
LANG_ENGLISH        "500 Points"

REFERENCE           MPUI_RULES_700POINTS
LANG_ENGLISH        "700 Points"

REFERENCE           MPUI_RULES_1000POINTS
LANG_ENGLISH        "1000 Points"

REFERENCE           MPUI_RULES_50POINTS
LANG_ENGLISH        "50 Points"

REFERENCE           MPUI_RULES_750POINTS
LANG_ENGLISH        "750 Points"

REFERENCE           MPUI_RULES_250POINTS
LANG_ENGLISH        "250 Points"

REFERENCE           MPUI_RULES_1500POINTS
LANG_ENGLISH        "1500 Points"

REFERENCE           MPUI_RULES_HQ_HOLD_TIME
LANG_ENGLISH        "HQ Lifetime:"

REFERENCE           MPUI_RULES_3MINUTES
LANG_ENGLISH        "3 Minutes"

REFERENCE           MPUI_RULES_2MINUTES
LANG_ENGLISH        "2 Minutes"

REFERENCE           MPUI_RULES_1_5MINUTES
LANG_ENGLISH        "1.5 Minutes"

REFERENCE           MPUI_RULES_1MINUTE
LANG_ENGLISH        "1 Minute"

REFERENCE           MPUI_RULES_HQ_RESPAWN_DELAY
LANG_ENGLISH        "HQ Activate Delay:"

REFERENCE           MPUI_RULES_INSTANT
LANG_ENGLISH        "Instant"

REFERENCE           MPUI_RULES_CLASSIC_HQ
LANG_ENGLISH        "Classic HQ Mode:"

REFERENCE           MPUI_RULES_45SECONDS
LANG_ENGLISH        "45 Seconds"

REFERENCE           MPUI_RULES_BOMB_TIMER
LANG_ENGLISH        "Bomb Timer:"

REFERENCE           MPUI_RULES_PLANT_TIME
LANG_ENGLISH        "Plant Time:"

REFERENCE           MPUI_RULES_1SECOND
LANG_ENGLISH        "1 Second"

REFERENCE           MPUI_RULES_2_5SECONDS
LANG_ENGLISH        "2.5 Seconds"

REFERENCE           MPUI_RULES_7_5SECONDS
LANG_ENGLISH        "7.5 Seconds"

REFERENCE           MPUI_RULES_DEFUSE_TIME
LANG_ENGLISH        "Defuse Time:"

REFERENCE           MPUI_RULES_HOT_POTATO
LANG_ENGLISH        "Hot Potato:"

REFERENCE           MPUI_RULES_ROUND_LIMIT
LANG_ENGLISH        "Round Limit:"

REFERENCE           MPUI_RULES_1ROUND
LANG_ENGLISH        "1 Round"

REFERENCE           MPUI_RULES_2ROUNDS
LANG_ENGLISH        "2 Rounds"

REFERENCE           MPUI_RULES_4ROUNDS
LANG_ENGLISH        "4 Rounds"

REFERENCE           MPUI_RULES_6ROUNDS
LANG_ENGLISH        "6 Rounds"

REFERENCE           MPUI_RULES_8ROUNDS
LANG_ENGLISH        "8 Rounds"

REFERENCE           MPUI_RULES_ROUND_SWITCH
LANG_ENGLISH        "Round Switch:"

REFERENCE           MPUI_RULES_NEVER
LANG_ENGLISH        "Never"

REFERENCE           MPUI_RULES_EVERY_ROUND
LANG_ENGLISH        "Every Round"

REFERENCE           MPUI_RULES_EVERY_2ROUNDS
LANG_ENGLISH        "Every 2 Rounds"

REFERENCE           MPUI_RULES_EVERY_3ROUNDS
LANG_ENGLISH        "Every 3 Rounds"

REFERENCE           MPUI_RULES_EVERY_4ROUNDS
LANG_ENGLISH        "Every 4 Rounds"

REFERENCE           MPUI_RULES_ROUND_LENGTH
LANG_ENGLISH        "Round Length:"

REFERENCE           MPUI_RULES_2_5MINUTES
LANG_ENGLISH        "2.5 Minutes"

REFERENCE           MPUI_RULES_8MINUTES
LANG_ENGLISH        "8 Minutes"

REFERENCE           MPUI_RULES_MULTI_BOMB
LANG_ENGLISH        "Multi Bomb:"

REFERENCE           MPUI_RULES_150POINTS
LANG_ENGLISH        "150 Points"

REFERENCE           MPUI_RULES_FAST
LANG_ENGLISH        "Fast"

REFERENCE           MPUI_BARRACKS_CAP
LANG_ENGLISH        "BARRACKS"

REFERENCE           MPUI_RECOMMENDEDPLAYERS
LANG_ENGLISH        "Recommended Max Players: &&1"

REFERENCE           MPUI_RULES_WAVE_DELAY
LANG_ENGLISH        "Wave Spawn Delay:"

REFERENCE           MPUI_RULES_1POINT
LANG_ENGLISH        "1 Point"

REFERENCE           MPUI_RULES_4POINTS
LANG_ENGLISH        "4 Points"

REFERENCE           MPUI_RULES_8POINTS
LANG_ENGLISH        "8 Points"

REFERENCE           MPUI_RULES_12POINTS
LANG_ENGLISH        "12 Points"

REFERENCE           MPUI_RULES_24POINTS
LANG_ENGLISH        "24 Points"

REFERENCE           MPUI_RULES_SHARE_BOMB_TIMER
LANG_ENGLISH        "Shared Bomb Timer:"

REFERENCE           MPUI_DESC_INVITE_FRIENDS_FULL
LANG_ENGLISH        "Lobby is full."

REFERENCE           MPUI_MUTEPLAYERS
LANG_ENGLISH        "MUTE PLAYERS"

REFERENCE           MPUI_RULES_2POINTS
LANG_ENGLISH        "2 Points"

REFERENCE           MPUI_FIND_MATCH
LANG_ENGLISH        "Find Match"

REFERENCE           MPUI_MAIL_NEW
LANG_ENGLISH        "New"

REFERENCE           MPUI_MAIL_SUBJECT
LANG_ENGLISH        "Subject:"

REFERENCE           MPUI_MAIL_FROM
LANG_ENGLISH        "From:"

REFERENCE           MPUI_MAIL_RECEIVED
LANG_ENGLISH        "Received:"

REFERENCE           MPUI_MAIL_SUBJECT_INCOMING_LOOT
LANG_ENGLISH        "Get ready for some loot"

REFERENCE           MPUI_MAIL_SUBJECT_LOOT_ARRIVED
LANG_ENGLISH        "Here's your loot"

REFERENCE           MPUI_MAIL_CONTACT_PRICE
LANG_ENGLISH        "Cpt. Price"

REFERENCE           MPUI_MAIL_BODY_INCOMING_LOOT
LANG_ENGLISH        "I'm sending you some loot. It should get there in 5 to 20 minutes. It's gonna be awesome, so don't stop playing the game until you get it."

REFERENCE           MPUI_MAIL_BODY_LOOT_ARRIVED
LANG_ENGLISH        "Here's the loot I promised you! Isn't it great? You should go use it right now!"

REFERENCE           MPUI_DATE_AND_TIME
LANG_ENGLISH        "&&5:&&7 &&6 &&1 &&2, &&3"

REFERENCE           MPUI_AM
LANG_ENGLISH        "AM"

REFERENCE           MPUI_PM
LANG_ENGLISH        "PM"

REFERENCE           MPUI_JANUARY
LANG_ENGLISH        "January"

REFERENCE           MPUI_FEBRUARY
LANG_ENGLISH        "February"

REFERENCE           MPUI_MARCH
LANG_ENGLISH        "March"

REFERENCE           MPUI_APRIL
LANG_ENGLISH        "April"

REFERENCE           MPUI_MAY
LANG_ENGLISH        "May"

REFERENCE           MPUI_JUNE
LANG_ENGLISH        "June"

REFERENCE           MPUI_JULY
LANG_ENGLISH        "July"

REFERENCE           MPUI_AUGUST
LANG_ENGLISH        "August"

REFERENCE           MPUI_SEPTEMBER
LANG_ENGLISH        "September"

REFERENCE           MPUI_OCTOBER
LANG_ENGLISH        "October"

REFERENCE           MPUI_NOVEMBER
LANG_ENGLISH        "November"

REFERENCE           MPUI_DECEMBER
LANG_ENGLISH        "December"

REFERENCE           MPUI_MONEY
LANG_ENGLISH        "$&&1"

REFERENCE           MPUI_WEAPON_ATTACHMENT
LANG_ENGLISH        "&&1 &&2"

REFERENCE           MPUI_WEAPON_CAMO
LANG_ENGLISH        "&&1 &&2 Camo"

REFERENCE           MPUI_PERK_DESC
LANG_ENGLISH        "&&1 Perk"

REFERENCE           MPUI_FOLLOWUP_IN_MINUTES
LANG_ENGLISH        "Followup in &&1 minute(s)"

REFERENCE           MPUI_FOLLOWUP_RECEIVED
LANG_ENGLISH        "Followup received"

REFERENCE           MPUI_MAIL_CONTACT_DMITRI
LANG_ENGLISH        "Dmitri Volkov"

REFERENCE           MPUI_MAIL_SUBJECT_TOO
LANG_ENGLISH        "Target of oppurtunity eliminated!"

REFERENCE           MPUI_MAIL_BODY_WEAPON_TOO
LANG_ENGLISH        "You've eliminated a known target that we'd been looking for for some time.  We'll be sending you something useful as payment."

REFERENCE           MPUI_MAIL_SUBJECT_WEAPON_ARRIVED
LANG_ENGLISH        "Enjoy your new hardware!"

REFERENCE           MPUI_MAIL_BODY_WEAPON_ARRIVED
LANG_ENGLISH        "We hope this bad boy helps you out in the fight against the enemy.  Give 'em hell for us."

REFERENCE           MPUI_MAIL_BODY_PERK_TOO
LANG_ENGLISH        "You've eliminated a known target that we'd been looking for for some time.  We'll be sending you a new weapon as payment."

REFERENCE           MPUI_MAIL_SUBJECT_PERK_ARRIVED
LANG_ENGLISH        "New field manual declassified."

REFERENCE           MPUI_MAIL_BODY_PERK_ARRIVED
LANG_ENGLISH        "You've received clearence for the field opperations manual.  Use what you've learned wisely."

REFERENCE           MPUI_MAIL_SUBJECT_INCOMING_ATTACHMENT
LANG_ENGLISH        "Something new is on the way."

REFERENCE           MPUI_MAIL_BODY_INCOMING_ATTACHMENT
LANG_ENGLISH        "I've sent you a little something for your troubles; it should be arriving shortly.  Enjoy."

REFERENCE           MPUI_MAIL_SUBJECT_ATTACHMENT_ARRIVED
LANG_ENGLISH        "Hope you get some use out of this"

REFERENCE           MPUI_MAIL_BODY_ATTACHMENT_ARRIVED
LANG_ENGLISH        "Here's a handy attachment for your weapon.\\n\\nP.S. I miss you so bad it hurts."

REFERENCE           MPUI_MAIL_SUBJECT_CAMO_ARRIVED
LANG_ENGLISH        "Enjoy your new camo!"

REFERENCE           MPUI_MAIL_BODY_CAMO_ARRIVED
LANG_ENGLISH        "Here's a little something to spice up the look of your weapon."

REFERENCE           MPUI_MAIL_CONTACT_STRICKLAND
LANG_ENGLISH        "Col. Strickland"

REFERENCE           MPUI_MAIL_SUBJECT_INCOMING_SUPPORT
LANG_ENGLISH        "You've earned it."

REFERENCE           MPUI_MAIL_BODY_INCOMING_SUPPORT
LANG_ENGLISH        "I'm working on authorization to get you some new air support.  Stay tuned."

REFERENCE           MPUI_MAIL_SUBJECT_SUPPORT_ARRIVED
LANG_ENGLISH        "Your authorization came through."

REFERENCE           MPUI_MAIL_BODY_SUPPORT_ARRIVED
LANG_ENGLISH        "I got the authorization for some new air support.  Get out there and win one for us!"

REFERENCE           MPUI_LOTTERY_TICKET_NORMAL
LANG_ENGLISH        "Lottery Ticket"

REFERENCE           MPUI_LOTTERY_TICKET_SUPER
LANG_ENGLISH        "Super Lottery Ticket"

REFERENCE           MPUI_LOTTERY_TICKET_MEGA
LANG_ENGLISH        "MEGA LOTTERY TICKET!"

REFERENCE           MPUI_YOU_HAVE_UNLOCKED
LANG_ENGLISH        "You have unlocked:"

REFERENCE           MPUI_PERK_4
LANG_ENGLISH        "Gambit"

REFERENCE           MPUI_ROCKETS
LANG_ENGLISH        "Launchers"

REFERENCE           MPUI_EXPLOSIVES
LANG_ENGLISH        "Explosives"

REFERENCE           MPUI_GRENADES
LANG_ENGLISH        "Special Grenades"

REFERENCE           MPUI_AKIMBO
LANG_ENGLISH        "Akimbo"

REFERENCE           MPUI_THERMAL
LANG_ENGLISH        "Thermal"

REFERENCE           MPUI_DESC_JOIN_GAME
LANG_ENGLISH        "Browse available games."

REFERENCE           MPUI_DESC_CREATE_GAME
LANG_ENGLISH        "Create a new game."

REFERENCE           MPUI_DESC_SELECT_SAVE_DEVICE
LANG_ENGLISH        "Select a save device for your multiplayer progress."

REFERENCE           MPUI_DESC_SELECT_OFFLINE_PROFILE
LANG_ENGLISH        "Select an offline profile to store your multiplayer progress."

REFERENCE           MPUI_USEONLINESTATS_TRUE
LANG_ENGLISH        "XBOX LIVE UNLOCKS: ON"

REFERENCE           MPUI_USEONLINESTATS_FALSE
LANG_ENGLISH        "XBOX LIVE UNLOCKS: OFF"

REFERENCE           MPUI_ONLINE_STATS_WARNING
LANG_ENGLISH        "Warning: Players will not earn any XP when using online custom classes while offline."

REFERENCE           MPUI_USE_ONLINE_STATS
LANG_ENGLISH        "Use Online Unlocks?"

REFERENCE           MPUI_DESC_USEONLINESTATS
LANG_ENGLISH        "Toggle to allow usage of online unlocks and progress."

REFERENCE           MPUI_HEARTBEAT
LANG_ENGLISH        "Heartbeat Sensor"

REFERENCE           MPUI_SKILL
LANG_ENGLISH        "Skill"

REFERENCE           MPUI_MU
LANG_ENGLISH        "Mu"

REFERENCE           MPUI_SIGMA
LANG_ENGLISH        "Sigma"

REFERENCE           MPUI_GAMES_PLAYED
LANG_ENGLISH        "Games Played"

REFERENCE           MPUI_PLAYLIST0
LANG_ENGLISH        "Playlist 0"

REFERENCE           MPUI_PLAYLIST1
LANG_ENGLISH        "Playlist 1"

REFERENCE           MPUI_PLAYLIST2
LANG_ENGLISH        "Playlist 2"

REFERENCE           MPUI_PLAYLIST3
LANG_ENGLISH        "Playlist 3"

REFERENCE           MPUI_PLAYLIST4
LANG_ENGLISH        "Playlist 4"

REFERENCE           MPUI_PLAYLIST5
LANG_ENGLISH        "Playlist 5"

REFERENCE           MPUI_PLAYLIST6
LANG_ENGLISH        "Playlist 6"

REFERENCE           MPUI_PLAYLIST7
LANG_ENGLISH        "Playlist 7"

REFERENCE           MPUI_PLAYLIST8
LANG_ENGLISH        "Playlist 8"

REFERENCE           MPUI_PLAYLIST9
LANG_ENGLISH        "Playlist 9"

REFERENCE           MPUI_PLAYLIST10
LANG_ENGLISH        "Playlist 10"

REFERENCE           MPUI_PLAYLIST11
LANG_ENGLISH        "Playlist 11"

REFERENCE           MPUI_PLAYLIST12
LANG_ENGLISH        "Playlist 12"

REFERENCE           MPUI_PLAYLIST13
LANG_ENGLISH        "Playlist 13"

REFERENCE           MPUI_PLAYLIST14
LANG_ENGLISH        "Playlist 14"

REFERENCE           MPUI_PLAYLIST15
LANG_ENGLISH        "Playlist 15"

REFERENCE           MPUI_PLAYLIST16
LANG_ENGLISH        "Playlist 16"

REFERENCE           MPUI_PLAYLIST17
LANG_ENGLISH        "Playlist 17"

REFERENCE           MPUI_PLAYLIST18
LANG_ENGLISH        "Playlist 18"

REFERENCE           MPUI_PLAYLIST19
LANG_ENGLISH        "Playlist 19"

REFERENCE           MPUI_PLAYLIST20
LANG_ENGLISH        "Playlist 20"

REFERENCE           MPUI_PLAYLIST21
LANG_ENGLISH        "Playlist 21"

REFERENCE           MPUI_PRIMARY
LANG_ENGLISH        "Primary"

REFERENCE           MPUI_SECONDARY
LANG_ENGLISH        "Secondary"

REFERENCE           MPUI_HANDGUNS
LANG_ENGLISH        "Handguns"

REFERENCE           MPUI_EQUIPMENT
LANG_ENGLISH        "Equipment"

REFERENCE           MPUI_RIOTSHIELD
LANG_ENGLISH        "Riot Shield"

REFERENCE           MPUI_UPGRADE
LANG_ENGLISH        "Upgrade"

REFERENCE           MPUI_KILLSTREAKS
LANG_ENGLISH        "Killstreaks"

REFERENCE           MPUI_DEATHSTREAK
LANG_ENGLISH        "Deathstreak"

REFERENCE           MPUI_ULTIMATE
LANG_ENGLISH        "Ultimate"

REFERENCE           MPUI_ADDITIONAL
LANG_ENGLISH        "Air Superiority"

REFERENCE           MPUI_LOCKAIR
LANG_ENGLISH        "Vehicle Lock-on"

REFERENCE           MPUI_BOOM
LANG_ENGLISH        "Sonic Boom"

REFERENCE           MPUI_FMJ
LANG_ENGLISH        "FMJ"

REFERENCE           MPUI_ROF
LANG_ENGLISH        "Rapid Fire"

REFERENCE           MPUI_XMAGS
LANG_ENGLISH        "Extended Mags"

REFERENCE           MPUI_LOCKGROUND
LANG_ENGLISH        "Lock Ground"

REFERENCE           MPUI_KILLS_REQ
LANG_ENGLISH        "Requires &&1 Kills"

REFERENCE           MPUI_DEATHS_REQ
LANG_ENGLISH        "Requires &&1 Deaths"

REFERENCE           MPUI_ARCTIC
LANG_ENGLISH        "Arctic"

REFERENCE           MPUI_RED_URBAN
LANG_ENGLISH        "Urban"

REFERENCE           MPUI_ORANGE_FALL
LANG_ENGLISH        "Fall"

REFERENCE           MPUI_MACHINE_PISTOLS
LANG_ENGLISH        "Machine Pistols"

REFERENCE           MPUI_C4_DEATH
LANG_ENGLISH        "Dead Man's Hand"

REFERENCE           MPUI_DOWNLOADEZPATCH
LANG_ENGLISH        "There is an update available for Modern Warfare 2.  The update will now be downloaded."

REFERENCE           MPUI_DOWNLOADPLAYLIST
LANG_ENGLISH        "There is a playlist update available.  The playlist update will now be downloaded."

REFERENCE           MPUI_RULES_DIEHARD
LANG_ENGLISH        "Diehard Mode: "

REFERENCE           MPUI_UNSTOPPABLE
LANG_ENGLISH        "Unstoppable"

REFERENCE           MPUI_LONGEST_KILLSTREAK
LANG_ENGLISH        "Longest killstreak"

REFERENCE           MPUI_SHARPSHOOTER
LANG_ENGLISH        "Sharpshooter"

REFERENCE           MPUI_MOST_HEADSHOTS
LANG_ENGLISH        "Most headshots"

REFERENCE           MPUI_PUNISHER
LANG_ENGLISH        "Steamroller"

REFERENCE           MPUI_MOST_DAMAGE_DEALT
LANG_ENGLISH        "Most damage dealt"

REFERENCE           MPUI_SURVIVOR
LANG_ENGLISH        "Survivor"

REFERENCE           MPUI_LEAST_DAMAGE_TAKEN
LANG_ENGLISH        "Least damage taken"

REFERENCE           MPUI_SWITCHBLADE
LANG_ENGLISH        "Switchblade"

REFERENCE           MPUI_MOST_KNIFE_KILLS
LANG_ENGLISH        "Most knife kills"

REFERENCE           MPUI_WINGMAN
LANG_ENGLISH        "Wingman"

REFERENCE           MPUI_MOST_ASSISTS
LANG_ENGLISH        "Most assists"

REFERENCE           MPUI_HARD_BOILED
LANG_ENGLISH        "Hard Boiled"

REFERENCE           MPUI_MOST_PISTOL_KILLS
LANG_ENGLISH        "Most pistol kills"

REFERENCE           MPUI_GRENADIER
LANG_ENGLISH        "Grenadier"

REFERENCE           MPUI_MOST_GRENADE_KILLS
LANG_ENGLISH        "Most grenade kills"

REFERENCE           MPUI_DEVASTATION
LANG_ENGLISH        "Devastation"

REFERENCE           MPUI_HIGHEST_MULTIKILL
LANG_ENGLISH        "Highest multikill"

REFERENCE           MPUI_CLUTCH_PLAYER
LANG_ENGLISH        "Clutch Player"

REFERENCE           MPUI_MATCH_WINNING_KILL
LANG_ENGLISH        "Match winning kill"

REFERENCE           MPUI_JUGGERNAUT
LANG_ENGLISH        "Juggernaut"

REFERENCE           MPUI_FEWEST_DEATHS
LANG_ENGLISH        "Fewest deaths"

REFERENCE           MPUI_THE_FEARED
LANG_ENGLISH        "The Feared"

REFERENCE           MPUI_MOST_KILLS
LANG_ENGLISH        "Most kills"

REFERENCE           MPUI_RECON_EXPERT
LANG_ENGLISH        "Pathfinder"

REFERENCE           MPUI_MOST_UAVS
LANG_ENGLISH        "Most UAVs"

REFERENCE           MPUI_TOP_GUN
LANG_ENGLISH        "Top Gun"

REFERENCE           MPUI_MOST_AIRSTRIKES
LANG_ENGLISH        "Most airstrikes"

REFERENCE           MPUI_AIRWOLF
LANG_ENGLISH        "Air Ops"

REFERENCE           MPUI_MOST_HELICOPTERS
LANG_ENGLISH        "Most helicopters"

REFERENCE           MPUI_MVP
LANG_ENGLISH        "MVP"

REFERENCE           MPUI_MOST_KILLSFEWEST_DEATHS
LANG_ENGLISH        "Most kills/Fewest deaths"

REFERENCE           MPUI_OVERKILL
LANG_ENGLISH        "Overkill"

REFERENCE           MPUI_MOST_KILLSMOST_HEADSHOTS
LANG_ENGLISH        "Most kills/Most headshots"

REFERENCE           MPUI_ACCIDENT_PRONE
LANG_ENGLISH        "Accident Prone"

REFERENCE           MPUI_MOST_SUICIDES
LANG_ENGLISH        "Most suicides"

REFERENCE           MPUI_FLANKER
LANG_ENGLISH        "Flanker"

REFERENCE           MPUI_MOST_KILLS_FROM_BEHIND
LANG_ENGLISH        "Most kills from behind"

REFERENCE           MPUI_BLINDSIDED
LANG_ENGLISH        "Blindsided"

REFERENCE           MPUI_MOST_DEATHS_FROM_BEHIND
LANG_ENGLISH        "Most deaths from behind"

REFERENCE           MPUI_FRAGGER
LANG_ENGLISH        "Fragger"

REFERENCE           MPUI_MOST_FRAG_GRENADE_KILLS
LANG_ENGLISH        "Most frag grenade kills"

REFERENCE           MPUI_C4_KILLER
LANG_ENGLISH        "C4 Killer"

REFERENCE           MPUI_MOST_C4_KILLS
LANG_ENGLISH        "Most C4 kills"

REFERENCE           MPUI_SEMTEX_KILLER
LANG_ENGLISH        "Semtex Pro"

REFERENCE           MPUI_MOST_SEMTEX_KILLS
LANG_ENGLISH        "Most semtex kills"

REFERENCE           MPUI_AMBUSHER
LANG_ENGLISH        "Ambusher"

REFERENCE           MPUI_MOST_CLAYMORE_KILLS
LANG_ENGLISH        "Most claymore kills"

REFERENCE           MPUI_KNIFE_MASTER
LANG_ENGLISH        "Butcher"

REFERENCE           MPUI_MOST_THROWING_KNIFE_KILLS
LANG_ENGLISH        "Most throwing knife kills"

REFERENCE           MPUI_SMG_SPECIALIST
LANG_ENGLISH        "CQB"

REFERENCE           MPUI_MOST_SMG_KILLS
LANG_ENGLISH        "Most SMG Kills"

REFERENCE           MPUI_RIFLE_SPECIALIST
LANG_ENGLISH        "AR Specialist"

REFERENCE           MPUI_MOST_ASSAULT_RIFLE_KILLS
LANG_ENGLISH        "Most assault rifle kills"

REFERENCE           MPUI_ROCKET_MAN
LANG_ENGLISH        "Explosivo"

REFERENCE           MPUI_MOST_ROCKET_KILLS
LANG_ENGLISH        "Most rocket kills"

REFERENCE           MPUI_SHOTGUN_SPECIALIST
LANG_ENGLISH        "Buckshot"

REFERENCE           MPUI_MOST_SHOTGUN_KILLS
LANG_ENGLISH        "Most shotgun kills"

REFERENCE           MPUI_RAMBO
LANG_ENGLISH        "7.62mm"

REFERENCE           MPUI_MOST_LMG_KILLS
LANG_ENGLISH        "Most LMG Kills"

REFERENCE           MPUI_SNIPER
LANG_ENGLISH        "Sniper"

REFERENCE           MPUI_MOST_SNIPER_KILLS
LANG_ENGLISH        "Most sniper kills"

REFERENCE           MPUI_EXECUTIONER
LANG_ENGLISH        "Executioner"

REFERENCE           MPUI_MOST_PISTOL_HEADSHOTS
LANG_ENGLISH        "Most pistol headshots"

REFERENCE           MPUI_SMG_SHARPSHOOTER
LANG_ENGLISH        "SMG Expert"

REFERENCE           MPUI_MOST_SMG_HEADSHOTS
LANG_ENGLISH        "Most SMG headshots"

REFERENCE           MPUI_RIFLE_SHARPSHOOTER
LANG_ENGLISH        "AR Expert"

REFERENCE           MPUI_MOST_ASSAULT_RIFLE_HEADSHOTS
LANG_ENGLISH        "Most assault rifle headshots"

REFERENCE           MPUI_SHOTGUN_SURGEON
LANG_ENGLISH        "Boomstick"

REFERENCE           MPUI_MOST_SHOTGUN_HEADSHOTS
LANG_ENGLISH        "Most shotgun headshots"

REFERENCE           MPUI_LMG_SHARPSHOOTER
LANG_ENGLISH        "LMG Expert"

REFERENCE           MPUI_MOST_LMG_HEADSHOTS
LANG_ENGLISH        "Most LMG headshots"

REFERENCE           MPUI_DEAD_AIM
LANG_ENGLISH        "Dead Aim"

REFERENCE           MPUI_MOST_SNIPER_HEADSHOTS
LANG_ENGLISH        "Most sniper headshots"

REFERENCE           MPUI_SURVIVALIST
LANG_ENGLISH        "Survivalist"

REFERENCE           MPUI_MOST_EQUIPMENT_KILLS
LANG_ENGLISH        "Most equipment kills"

REFERENCE           MPUI_BLINDFIRE
LANG_ENGLISH        "Blindfire"

REFERENCE           MPUI_MOST_BULLET_PENETRATION
LANG_ENGLISH        "Most bullet penetration kills"

REFERENCE           MPUI_EYE_FOR_AN_EYE
LANG_ENGLISH        "Vengeful"

REFERENCE           MPUI_MOST_PAYBACKS
LANG_ENGLISH        "Most paybacks"

REFERENCE           MPUI_AVENGER
LANG_ENGLISH        "Avenger"

REFERENCE           MPUI_MOST_AVENGER_KILLS
LANG_ENGLISH        "Most avenger kills"

REFERENCE           MPUI_RESCUER
LANG_ENGLISH        "Rescuer"

REFERENCE           MPUI_MOST_RESCUES
LANG_ENGLISH        "Most rescues"

REFERENCE           MPUI_MARKSMAN
LANG_ENGLISH        "Marksman"

REFERENCE           MPUI_MOST_LONGSHOTS
LANG_ENGLISH        "Most longshots"

REFERENCE           MPUI_UPRISER
LANG_ENGLISH        "Upriser"

REFERENCE           MPUI_MOST_KILLS_OF_HIGHER
LANG_ENGLISH        "Most kills of higher rank"

REFERENCE           MPUI_HAIRTRIGGER
LANG_ENGLISH        "Hairtrigger"

REFERENCE           MPUI_MOST_ADS_KILLS
LANG_ENGLISH        "Most ADS kills"

REFERENCE           MPUI_SPRAYER
LANG_ENGLISH        "Sprayer"

REFERENCE           MPUI_MOST_HIPFIRE_KILLS
LANG_ENGLISH        "Most hipfire kills"

REFERENCE           MPUI_REVENGE
LANG_ENGLISH        "Revenge"

REFERENCE           MPUI_MOST_LAST_STAND_KILLS
LANG_ENGLISH        "Most last stand kills"

REFERENCE           MPUI_MOST_EXECUTION_KILLS
LANG_ENGLISH        "Most execution kills"

REFERENCE           MPUI_NEWB_KILLER
LANG_ENGLISH        "Alpha Male"

REFERENCE           MPUI_MOST_KILLS_OF_LOWER_RANK
LANG_ENGLISH        "Most kills of lower rank"

REFERENCE           MPUI_LOANER
LANG_ENGLISH        "Loaner"

REFERENCE           MPUI_MOST_KILLS_WITH_ENEMY
LANG_ENGLISH        "Most kills with enemy weapons"

REFERENCE           MPUI_CLAY_PIGEON
LANG_ENGLISH        "Clay Pigeon"

REFERENCE           MPUI_MOST_DEATHS_BY_SHOTGUN
LANG_ENGLISH        "Most deaths by shotgun"

REFERENCE           MPUI_TERMINAL1
LANG_ENGLISH        "Terminal"

REFERENCE           MPUI_SHORTEST_LIFE
LANG_ENGLISH        "Shortest life"

REFERENCE           MPUI_MOST_KILLSLONGEST_KILLSTREAK
LANG_ENGLISH        "Most kills/Longest killstreak"

REFERENCE           MPUI_HIGHLANDER
LANG_ENGLISH        "The Show"

REFERENCE           MPUI_10_KILLSNO_DEATHS
LANG_ENGLISH        "10 kills/No deaths"

REFERENCE           MPUI_SUPERNATURAL
LANG_ENGLISH        "Supernatural"

REFERENCE           MPUI_KILLDEATH_RATIO_OVER
LANG_ENGLISH        "Kill/Death ratio over 10"

REFERENCE           MPUI_ODD_MAN_OUT
LANG_ENGLISH        "Warming Up"

REFERENCE           MPUI_SIXTH_SENSE
LANG_ENGLISH        "6th Sense"

REFERENCE           MPUI_NO_DEATHS_FROM_BEHIND
LANG_ENGLISH        "No deaths from behind"

REFERENCE           MPUI_DEAD_MAN_WALKING
LANG_ENGLISH        "Deathrow"

REFERENCE           MPUI_LONGEST_DEATHSTREAK
LANG_ENGLISH        "Longest deathstreak"

REFERENCE           MPUI_GENOCIDAL
LANG_ENGLISH        "Genocidal"

REFERENCE           MPUI_MOST_MULTIKILLS
LANG_ENGLISH        "Most multikills"

REFERENCE           MPUI_DESTROYER
LANG_ENGLISH        "Destroyer"

REFERENCE           MPUI_KILLED_EVERY_MEMBER_OF
LANG_ENGLISH        "Killed entire enemy team"

REFERENCE           MPUI_DECIMATOR
LANG_ENGLISH        "Decimator"

REFERENCE           MPUI_KILLED_EVERY_MEMBER_OF1
LANG_ENGLISH        "Killed entire enemy team without dying"

REFERENCE           MPUI_NOMAD
LANG_ENGLISH        "Nomad"

REFERENCE           MPUI_LONGEST_DISTANCE_TRAVELED
LANG_ENGLISH        "Longest distance traveled"

REFERENCE           MPUI_RUNNER
LANG_ENGLISH        "Runner"

REFERENCE           MPUI_MOST_TIME_SPENT_SPRINTING
LANG_ENGLISH        "Most time spent sprinting"

REFERENCE           MPUI_HUNCHBACK
LANG_ENGLISH        "Sneaker"

REFERENCE           MPUI_MOST_TIME_SPENT_CROUCHED
LANG_ENGLISH        "Most time spent crouched"

REFERENCE           MPUI_GRASSY_KNOLL
LANG_ENGLISH        "Grassy Knoll"

REFERENCE           MPUI_MOST_TIME_SPENT_PRONE
LANG_ENGLISH        "Most time spent prone"

REFERENCE           MPUI_COMEBACK_KID
LANG_ENGLISH        "Rally"

REFERENCE           MPUI_MOST_COMEBACKS
LANG_ENGLISH        "Most comebacks"

REFERENCE           MPUI_LIFER
LANG_ENGLISH        "Lifer"

REFERENCE           MPUI_LONGEST_LIFE
LANG_ENGLISH        "Longest life"

REFERENCE           MPUI_COUCH_POTATO
LANG_ENGLISH        "Spy Game"

REFERENCE           MPUI_MOST_TIME_WATCHING_KILLCAMS
LANG_ENGLISH        "Most time watching killcams"

REFERENCE           MPUI_HYPERACTIVE
LANG_ENGLISH        "Starter"

REFERENCE           MPUI_MOST_KILLCAMS_SKIPPED
LANG_ENGLISH        "Most killcams skipped"

REFERENCE           MPUI_LOCK_AND_LOAD
LANG_ENGLISH        "Lock & Load"

REFERENCE           MPUI_MOST_RELOADS
LANG_ENGLISH        "Most reloads"

REFERENCE           MPUI_INDECISIVE
LANG_ENGLISH        "Weapon Rack"

REFERENCE           MPUI_MOST_WEAPON_SWAPS
LANG_ENGLISH        "Most weapon swaps"

REFERENCE           MPUI_TRIGGER_HAPPY
LANG_ENGLISH        "Trigger Happy"

REFERENCE           MPUI_MOST_SHOTS_FIRED
LANG_ENGLISH        "Most shots fired"

REFERENCE           MPUI_CAMPER
LANG_ENGLISH        "Lockdown"

REFERENCE           MPUI_MOST_TIME_SPENT_IN_ONE
LANG_ENGLISH        "Most time spent in one place"

REFERENCE           MPUI_SCOUTMASTER
LANG_ENGLISH        "Statuesque"

REFERENCE           MPUI_MOST_CAMPING_KILLS
LANG_ENGLISH        "Most stationary kills"

REFERENCE           MPUI_HIFI
LANG_ENGLISH        "High Command"

REFERENCE           MPUI_HIGHEST_AVERAGE_ALTITUDE
LANG_ENGLISH        "Highest average altitude"

REFERENCE           MPUI_LOFI
LANG_ENGLISH        "Low Profile"

REFERENCE           MPUI_LOWEST_AVERAGE_ALTITUDE
LANG_ENGLISH        "Lowest average altitude"

REFERENCE           MPUI_HIJACKER
LANG_ENGLISH        "Hijacker"

REFERENCE           MPUI_MOST_STOLEN_KILLS
LANG_ENGLISH        "Most stolen kills"

REFERENCE           MPUI_POTENTIAL_HAZARD
LANG_ENGLISH        "Nearsighted"

REFERENCE           MPUI_MOST_FRIENDLIES_SHOT
LANG_ENGLISH        "Most friendlies shot"

REFERENCE           MPUI_FREQUENT_CUSTOMER
LANG_ENGLISH        "Grudge Match"

REFERENCE           MPUI_MOST_KILLS_OF_SAME_PLAYER
LANG_ENGLISH        "Most kills of same player"

REFERENCE           MPUI_ARSENAL
LANG_ENGLISH        "Arsenal"

REFERENCE           MPUI_MOST_WEAPONS_USED
LANG_ENGLISH        "Most weapons used"

REFERENCE           MPUI_UNDERCOVER
LANG_ENGLISH        "Undercover"

REFERENCE           MPUI_MOST_TIME_CLOSER_TO_ENEMIES
LANG_ENGLISH        "Most time near enemies"

REFERENCE           MPUI_JACK_OF_ALL_TRADES
LANG_ENGLISH        "Evolver"

REFERENCE           MPUI_MOST_CLASSES_CHANGED
LANG_ENGLISH        "Most classes changed"

REFERENCE           MPUI_SPAWN_BLOCKER
LANG_ENGLISH        "Lights Out"

REFERENCE           MPUI_MOST_TACTICAL_INSERTIONS
LANG_ENGLISH        "Most tactical insertions prevented"

REFERENCE           MPUI_SHELL_SHOCKED
LANG_ENGLISH        "Shell Shocked"

REFERENCE           MPUI_MOST_EXPLOSIONS_SURVIVED
LANG_ENGLISH        "Most explosions survived"

REFERENCE           MPUI_THICK_SKINNED
LANG_ENGLISH        "Unbreakable"

REFERENCE           MPUI_MOST_BULLETS_DEFLECTED
LANG_ENGLISH        "Most bullets deflected"

REFERENCE           MPUI_BLINDER
LANG_ENGLISH        "Blinder"

REFERENCE           MPUI_MOST_FLASHBANG_HITS
LANG_ENGLISH        "Most flashbang hits"

REFERENCE           MPUI_STUNNER
LANG_ENGLISH        "Stunner"

REFERENCE           MPUI_MOST_STUN_GRENADE_HITS
LANG_ENGLISH        "Most stun grenade hits"

REFERENCE           MPUI_MAGNIFIER
LANG_ENGLISH        "Magnifier"

REFERENCE           MPUI_MOST_SCOPED_KILLS
LANG_ENGLISH        "Most scoped kills"

REFERENCE           MPUI_THERMAL_KILLER
LANG_ENGLISH        "White Hot"

REFERENCE           MPUI_MOST_THERMAL_KILLS
LANG_ENGLISH        "Most thermal kills"

REFERENCE           MPUI_TERMINATOR
LANG_ENGLISH        "Exterminator"

REFERENCE           MPUI_MOST_THUMPER_KILLS
LANG_ENGLISH        "Most thumper kills"

REFERENCE           MPUI_COMBAT_EFFECTIVE
LANG_ENGLISH        "Immortal"

REFERENCE           MPUI_HIGHEST_KILLDEATH_RATIO
LANG_ENGLISH        "Highest kill/death ratio"

REFERENCE           MPUI_AFK
LANG_ENGLISH        "AFK"

REFERENCE           MPUI_NO_KILLSNO_DEATHS
LANG_ENGLISH        "No kills/No deaths"

REFERENCE           MPUI_PARTICIPANT
LANG_ENGLISH        "Participant"

REFERENCE           MPUI_NO_KILLSATLEAST_1_DEATH
LANG_ENGLISH        "No kills/At least 1 death"

REFERENCE           MPUI_CROWD_CONTROL
LANG_ENGLISH        "Crowd Control"

REFERENCE           MPUI_MOST_RIOT_SHIELD_KILLS
LANG_ENGLISH        "Most riot shield kills"

REFERENCE           MPUI_PROTESTER
LANG_ENGLISH        "Protester"

REFERENCE           MPUI_MOST_DEATHS_BY_RIOT_SHIELD
LANG_ENGLISH        "Most deaths by riot shield"

REFERENCE           MPUI_HOT_POTATO
LANG_ENGLISH        "Hot Potato"

REFERENCE           MPUI_MOST_GRENADES_THROWN
LANG_ENGLISH        "Most grenades thrown back"

REFERENCE           MPUI_UNNAMED
LANG_ENGLISH        "[unnamed]"

REFERENCE           MPUI_DOMINATOR
LANG_ENGLISH        "Dominator"

REFERENCE           MPUI_MOST_BOMBS_PLANTED
LANG_ENGLISH        "Most bombs planted"

REFERENCE           MPUI_MOST_BOMBS_DEFUSED
LANG_ENGLISH        "Most bombs defused"

REFERENCE           MPUI_MOST_TARGETS_DESTROYED
LANG_ENGLISH        "Most targets destroyed"

REFERENCE           MPUI_MOST_BOMB_CARRIER_KILLS
LANG_ENGLISH        "Most bomb carrier kills"

REFERENCE           MPUI_MOST_KILLS_AS_BOMB_CARRIER
LANG_ENGLISH        "Most kills as bomb carrier"

REFERENCE           MPUI_MOST_BOMBS_CARRIED
LANG_ENGLISH        "Most bombs carried"

REFERENCE           MPUI_MOST_POINTS_CAPTURED
LANG_ENGLISH        "Most points captured"

REFERENCE           MPUI_MOST_HQS_CAPTURED
LANG_ENGLISH        "Most HQs captured"

REFERENCE           MPUI_MOST_HQS_DESTROYED
LANG_ENGLISH        "Most HQs destroyed"

REFERENCE           MPUI_MOST_FLAGS_CAPTURED
LANG_ENGLISH        "Most flags captured"

REFERENCE           MPUI_MOST_FLAGS_RETURNED
LANG_ENGLISH        "Most flags returned"

REFERENCE           MPUI_MOST_FLAGS_CARRIED
LANG_ENGLISH        "Most flags carried"

REFERENCE           MPUI_MOST_FLAG_CARRIER_KILLS
LANG_ENGLISH        "Most flag carrier kills"

REFERENCE           MPUI_MOST_KILLS_AS_FLAG_CARRIER
LANG_ENGLISH        "Most kills as flag carrier"

REFERENCE           MPUI_KILLSTREAK_REWARDS
LANG_ENGLISH        "Killstreak Rewards"

REFERENCE           MPUI_DESC_KILLSTREAK_REWARDS
LANG_ENGLISH        "Choose your rewards for getting killstreaks."

REFERENCE           MPUI_RULES_CAMERA
LANG_ENGLISH        "3rd Person:"

REFERENCE           MPUI_PLAYERCARD
LANG_ENGLISH        "Callsign & Killstreaks"

REFERENCE           MPUI_PLAYERCARD_TITLE
LANG_ENGLISH        "Title"

REFERENCE           MPUI_PLAYERCARD_ICON
LANG_ENGLISH        "Emblem"

REFERENCE           MPUI_DESC_PLAYERCARD_TITLE
LANG_ENGLISH        "Choose your Title."

REFERENCE           MPUI_DESC_PLAYERCARD_ICON
LANG_ENGLISH        "Choose your Emblem."

REFERENCE           MPUI_DESC_PLAYERCARD
LANG_ENGLISH        "Set your Title, Emblem, and Killstreak Rewards."

REFERENCE           MPUI_UNLOCKED_BY_CHALLENGE
LANG_ENGLISH        "Unlocked by challenge."

REFERENCE           MPUI_PROJECTILE
LANG_ENGLISH        "Launcher"

REFERENCE           MPUI_CLASSIFIED
LANG_ENGLISH        "Classified"

REFERENCE           MPUI_BLING_PRIMARY
LANG_ENGLISH        "Additional primary weapon attachment."

REFERENCE           MPUI_BLING_SECONDARY
LANG_ENGLISH        "Additional secondary weapon attachment."

REFERENCE           MPUI_EOTECH
LANG_ENGLISH        "Holographic Sight"

REFERENCE           MPUI_EXPLOSIVES_EXPERT
LANG_ENGLISH        "Bomb Expert"

REFERENCE           MPUI_DEFUSAL_EXPERT
LANG_ENGLISH        "Defuser"

REFERENCE           MPUI_BOMB_NEUTRALIZER
LANG_ENGLISH        "Bomb Blocker"

REFERENCE           MPUI_DOUBLE_THREAT
LANG_ENGLISH        "Double Threat"

REFERENCE           MPUI_BOMB_THREAT
LANG_ENGLISH        "Bomb Threat"

REFERENCE           MPUI_BOMB_RUNNER
LANG_ENGLISH        "Bomb Runner"

REFERENCE           MPUI_HQ_CAPTURER
LANG_ENGLISH        "HQ Capturer"

REFERENCE           MPUI_HQ_DESTROYER
LANG_ENGLISH        "HQ Destroyer"

REFERENCE           MPUI_FLAG_CAPTURER
LANG_ENGLISH        "Flag Capturer"

REFERENCE           MPUI_FLAG_RETURNER
LANG_ENGLISH        "Flag Returner"

REFERENCE           MPUI_FLAG_RUNNER
LANG_ENGLISH        "Flag Runner"

REFERENCE           MPUI_FLAG_NEUTRALIZER
LANG_ENGLISH        "Flag Blocker"

REFERENCE           MPUI_NONE_SPARED
LANG_ENGLISH        "None Spared"

REFERENCE           MPUI_CHALLENGE_CAP
LANG_ENGLISH        "CHALLENGES"

REFERENCE           MPUI_RECORDS_CAP
LANG_ENGLISH        "RECORDS"

REFERENCE           MPUI_WINNING_CAPS
LANG_ENGLISH        "WINNING"

REFERENCE           MPUI_LOSING_CAPS
LANG_ENGLISH        "LOSING"

REFERENCE           MPUI_TIED_CAPS
LANG_ENGLISH        "TIE"

REFERENCE           MPUI_FIRST_HALF
LANG_ENGLISH        "1st Half"

REFERENCE           MPUI_SECOND_HALF
LANG_ENGLISH        "2nd Half"

REFERENCE           MPUI_CTF
LANG_ENGLISH        "Capture the Flag"

REFERENCE           MPUI_CTF_CAPS
LANG_ENGLISH        "CAPTURE THE FLAG"

REFERENCE           MPUI_ONE_FLAG_CAPS
LANG_ENGLISH        "ONE FLAG CTF"

REFERENCE           MPUI_ARENA_CAPS
LANG_ENGLISH        "ARENA"

REFERENCE           MPUI_DEATHMATCH_CAPS
LANG_ENGLISH        "FREE-FOR-ALL"

REFERENCE           MPUI_TEAM_DEATHMATCH_CAPS
LANG_ENGLISH        "TEAM DEATHMATCH"

REFERENCE           MPUI_SEARCH_AND_DESTROY_CAPS
LANG_ENGLISH        "SEARCH AND DESTROY"

REFERENCE           MPUI_SABOTAGE_CAPS
LANG_ENGLISH        "SABOTAGE"

REFERENCE           MPUI_DOMINATION_CAPS
LANG_ENGLISH        "DOMINATION"

REFERENCE           MPUI_HEADQUARTERS_CAPS
LANG_ENGLISH        "HEADQUARTERS"

REFERENCE           MPUI_DD_CAPS
LANG_ENGLISH        "DEMOLITION"

REFERENCE           MPUI_DONE_SELECTING
LANG_ENGLISH        "DONE"

REFERENCE           MPUI_DESC_DONE_SELECTING
LANG_ENGLISH        "Open camoflauge selection menu."

REFERENCE           MPUI_ATTACHMENT_INCOMPATIBLE
LANG_ENGLISH        "Cannot be used with: &&1"

REFERENCE           MPUI_ATTACHMENTS_FULL
LANG_ENGLISH        "2 attachments selected."

REFERENCE           MPUI_CRASH_CAPS
LANG_ENGLISH        "CRASH"

REFERENCE           MPUI_SHIPMENT_CAPS
LANG_ENGLISH        "SHIPMENT"

REFERENCE           MPUI_INVASION_CAPS
LANG_ENGLISH        "INVASION"

REFERENCE           MPUI_HIGHRISE_CAPS
LANG_ENGLISH        "HIGHRISE"

REFERENCE           MPUI_CHECKPOINT_CAPS
LANG_ENGLISH        "CHECKPOINT"

REFERENCE           MPUI_VERTIGO_CAPS
LANG_ENGLISH        "VERTIGO"

REFERENCE           MPUI_RAID_CAPS
LANG_ENGLISH        "RAID"

REFERENCE           MPUI_FAVELA_CAPS
LANG_ENGLISH        "FAVELA"

REFERENCE           MPUI_QUARRY_CAPS
LANG_ENGLISH        "QUARRY"

REFERENCE           MPUI_TRAILER_CAPS
LANG_ENGLISH        "TRAILER"

REFERENCE           MPUI_OILRIG_CAPS
LANG_ENGLISH        "OIL RIG"

REFERENCE           MPUI_WASTELAND_CAPS
LANG_ENGLISH        "WASTELAND"

REFERENCE           MPUI_DERAIL_CAPS
LANG_ENGLISH        "DERAIL"

REFERENCE           MPUI_SUBBASE_CAPS
LANG_ENGLISH        "SUB BASE"

REFERENCE           MPUI_UNDERPASS_CAPS
LANG_ENGLISH        "UNDERPASS"

REFERENCE           MPUI_ESTATE_CAPS
LANG_ENGLISH        "ESTATE"

REFERENCE           MPUI_RUNDOWN_CAPS
LANG_ENGLISH        "RUNDOWN"

REFERENCE           MPUI_BONEYARD_CAPS
LANG_ENGLISH        "BONEYARD"

REFERENCE           MPUI_AFGHAN_CAPS
LANG_ENGLISH        "AFGHAN"

REFERENCE           MPUI_TERMINAL_CAPS
LANG_ENGLISH        "TERMINAL"

REFERENCE           MPUI_FUEL_CAPS
LANG_ENGLISH        "FUEL"

REFERENCE           MPUI_RUST_CAPS
LANG_ENGLISH        "RUST"

REFERENCE           MPUI_WHITEHOUSE_CAPS
LANG_ENGLISH        "WHITEHOUSE"

REFERENCE           MPUI_FIRINGRANGE_CAPS
LANG_ENGLISH        "FIRING RANGE"

REFERENCE           MPUI_UNLOCKS_ATTACHMENT
LANG_ENGLISH        "Unlocks Attachment: &&1"

REFERENCE           MPUI_UNLOCKS_CAMO
LANG_ENGLISH        "Unlocks Camo: &&1"

REFERENCE           MPUI_DONE_CAPS
LANG_ENGLISH        "DONE"

REFERENCE           MPUI_REWARD_XP
LANG_ENGLISH        "Reward XP: &&1"

REFERENCE           MPUI_SCORE_CAPS
LANG_ENGLISH        "SCORE"

REFERENCE           MPUI_KILLS_CAPS
LANG_ENGLISH        "KILLS"

REFERENCE           MPUI_ACCURACY_CAPS
LANG_ENGLISH        "ACCURACY"

REFERENCE           MPUI_WINS_CAPS
LANG_ENGLISH        "WINS"

REFERENCE           MPUI_N_X2
LANG_ENGLISH        "&&1 x2"

REFERENCE           MPUI_N_X1
LANG_ENGLISH        "&&1 x1"

REFERENCE           MPUI_N_XN
LANG_ENGLISH        "&&1 x&&2"

REFERENCE           MPUI_UNLOCKED_BY_CHALLENGE_N
LANG_ENGLISH        "Unlocked by Challenge:\\n&&1"

REFERENCE           MPUI_UNLOCKED_BY_CHALLENGE_PRE
LANG_ENGLISH        "Unlocked by Challenge:"

REFERENCE           MPUI_TACTICAL
LANG_ENGLISH        "Tactical Knife"

REFERENCE           MPUI_HIGHLIGHTS_CAPS
LANG_ENGLISH        "ACCOLADES"

REFERENCE           MPUI_RECORD
LANG_ENGLISH        "Record"

REFERENCE           MPUI_MATCH_BEST
LANG_ENGLISH        "Match Best"

REFERENCE           MPUI_TIMES_WON
LANG_ENGLISH        "Times Won"

REFERENCE           MPUI_NO_HIGHLIGHTS
LANG_ENGLISH        "Just getting started."

REFERENCE           MPUI_RULES_2500POINTS
LANG_ENGLISH        "2500 Points"

REFERENCE           MPUI_RULES_5000POINTS
LANG_ENGLISH        "5000 Points"

REFERENCE           MPUI_RULES_6000POINTS
LANG_ENGLISH        "6000 Points"

REFERENCE           MPUI_RULES_7500POINTS
LANG_ENGLISH        "7500 Points"

REFERENCE           MPUI_RULES_10000POINTS
LANG_ENGLISH        "10000 Points"

REFERENCE           MPUI_RULES_15000POINTS
LANG_ENGLISH        "15000 Points"

REFERENCE           MPUI_RULES_3000POINTS
LANG_ENGLISH        "3000 Points"

REFERENCE           MPUI_RULES_7000POINTS
LANG_ENGLISH        "7000 Points"

REFERENCE           MPUI_DESC_MAP_GULAG
LANG_ENGLISH        "Night time jail fight.  Large scale russian prison fighting."

REFERENCE           MPUI_GULAG
LANG_ENGLISH        "Gulag"

REFERENCE           MPUI_DESC_KILLSTREAK_REWARDS_LOCKED
LANG_ENGLISH        "Choose your rewards for getting killstreaks starting at Lv(10)."

REFERENCE           MPUI_ENABLED_NO_BLEED
LANG_ENGLISH        "Unlimited"

REFERENCE           MPUI_ENABLED_BLEED
LANG_ENGLISH        "Timed"

REFERENCE           MPUI_BOMBPLANTED
LANG_ENGLISH        "X 1"

REFERENCE           MPUI_BOMBSPLANTED
LANG_ENGLISH        "X 2"

REFERENCE           MPUI_GTNW
LANG_ENGLISH        "Global Thermonuclear War"

REFERENCE           MPUI_GTNW_CAPS
LANG_ENGLISH        "GLOBAL THERMONUCLEAR WAR"

REFERENCE           MPUI_UNLOCKS_NEW_ICON
LANG_ENGLISH        "Unlocks: New Emblem"

REFERENCE           MPUI_UNLOCKS_NEW_TITLE
LANG_ENGLISH        "Unlocks: New Title"

REFERENCE           MPUI_YOUR_TOP_HL
LANG_ENGLISH        "YOUR TOP ACCOLADES"

REFERENCE           MPUI_YOUR_TOP_3_HL
LANG_ENGLISH        "YOUR TOP 3 ACCOLADES"

REFERENCE           MPUI_YOUR_TOP_3_HL_N
LANG_ENGLISH        "YOUR TOP 3 ACCOLADES (&&1 total)"

REFERENCE           MPUI_DEFAULT_CLASSES1
LANG_ENGLISH        "Default Classes..."

REFERENCE           MPUI_CUSTOM_CLASSES1
LANG_ENGLISH        "Custom Classes..."

REFERENCE           MPUI_X_SLASH_Y_XP
LANG_ENGLISH        "&&1/&&2 XP"

REFERENCE           MPUI_UNLOCKS_ATTACHMENTS
LANG_ENGLISH        "Unlocks Attachments:"

REFERENCE           MPUI_UNLOCKS_ATTACHMENT_SINGLE
LANG_ENGLISH        "Unlocks Attachment:"

REFERENCE           MPUI_UNLOCKS_CAMOS
LANG_ENGLISH        "Unlocks Camos:"

REFERENCE           MPUI_I
LANG_ENGLISH        "I: "

REFERENCE           MPUI_II
LANG_ENGLISH        "II: "

REFERENCE           MPUI_III
LANG_ENGLISH        "III: "

REFERENCE           MPUI_IV
LANG_ENGLISH        "IV: "

REFERENCE           MPUI_V
LANG_ENGLISH        "V: "

REFERENCE           MPUI_VI
LANG_ENGLISH        "VI: "

REFERENCE           MPUI_VII
LANG_ENGLISH        "VII: "

REFERENCE           MPUI_VIII
LANG_ENGLISH        "VIII: "

REFERENCE           MPUI_IX
LANG_ENGLISH        "IX: "

REFERENCE           MPUI_X
LANG_ENGLISH        "X: "

REFERENCE           MPUI_PERK_UNLOCKS_CAPS
LANG_ENGLISH        "PERK UNLOCKS"

REFERENCE           MPUI_WINS_PRE
LANG_ENGLISH        "Wins:"

REFERENCE           MPUI_LOSSES_PRE
LANG_ENGLISH        "Losses:"

REFERENCE           MPUI_WINSTREAK_PRE
LANG_ENGLISH        "Win Streak:"

REFERENCE           MPUI_TIES_PRE
LANG_ENGLISH        "Ties:"

REFERENCE           MPUI_NEW_TITLE
LANG_ENGLISH        "New Title!"

REFERENCE           MPUI_NEW_TITLES
LANG_ENGLISH        "New Titles!"

REFERENCE           MPUI_NEW_TITLES_DESC
LANG_ENGLISH        "New titles are available for your Callsign!"

REFERENCE           MPUI_NEW_ICON
LANG_ENGLISH        "New Emblem!"

REFERENCE           MPUI_NEW_ICONS
LANG_ENGLISH        "New Emblems!"

REFERENCE           MPUI_NEW_ICONS_DESC
LANG_ENGLISH        "New emblems are available for your Callsign!"

REFERENCE           MPUI_CHANGING_KIT
LANG_ENGLISH        "Changing Kit..."

REFERENCE           MPUI_REVIVING
LANG_ENGLISH        "Reviving..."

REFERENCE           MPUI_BEING_REVIVED
LANG_ENGLISH        "Being revived..."

REFERENCE           MPUI_DESC_HIGHLIGHTS
LANG_ENGLISH        "Your match bests."

REFERENCE           MPUI_N_KILLSTREAK
LANG_ENGLISH        "&&1 Killstreak"

REFERENCE           MPUI_N_KILLS
LANG_ENGLISH        "&&1 Kills"

REFERENCE           MPUI_N_UNLOCKS_REMAINING
LANG_ENGLISH        "&&1 unlocks remaining."

REFERENCE           MPUI_UNLOCKS_REMAINING_RED
LANG_ENGLISH        "^1&&1^7 unlocks remaining."

REFERENCE           MPUI_UNLOCKS_REMAINING_GREEN
LANG_ENGLISH        "^2&&1^7 unlocks remaining."

REFERENCE           MPUI_KILLSTREAK_ALREADY_UNLOCKED
LANG_ENGLISH        "Killstreak already unlocked."

REFERENCE           MPUI_UNLOCK_KILLSTREAKS
LANG_ENGLISH        "Unlock Killstreaks"

REFERENCE           MPUI_3_KILLSTREAKS_SELECTED
LANG_ENGLISH        "3 killstreaks already selected."

REFERENCE           MPUI_N_KILLSTREAK_ALREADY_SELECTED
LANG_ENGLISH        "&&1 killstreak already selected."

REFERENCE           MPUI_X_N
LANG_ENGLISH        "x&&1"

REFERENCE           MPUI_PAGE_N_SLASH_N
LANG_ENGLISH        "Page &&1/&&2"

REFERENCE           MPUI_UNLOCK_KILLSTREAK
LANG_ENGLISH        "Unlock Killstreak?"

REFERENCE           MPUI_NEXT_PRE
LANG_ENGLISH        "Next:"

REFERENCE           MPUI_UNLOCK_IN_N_LEVELS
LANG_ENGLISH        "Next unlock in &&1 levels"

REFERENCE           MPUI_UNLOCK_IN_1_LEVEL
LANG_ENGLISH        "Next unlock in 1 level"

REFERENCE           MPUI_UNLOCK_AVAILABLE
LANG_ENGLISH        "1 unlock available!"

REFERENCE           MPUI_UNLOCKS_AVAILABLE
LANG_ENGLISH        "New unlocks available!"

REFERENCE           MPUI_UNLOCK_REMAINING_RED
LANG_ENGLISH        "^1&&1^7 unlock remaining."

REFERENCE           MPUI_EXIT_CAS_TITLE
LANG_ENGLISH        "You're not done yet!"

REFERENCE           MPUI_EXIT_CAS_DESC
LANG_ENGLISH        "You haven't selected all 3 killstreaks."

REFERENCE           MPUI_SAVE_AND_EXIT
LANG_ENGLISH        "Save and Exit"

REFERENCE           MPUI_EXIT_WITHOUT_SAVE
LANG_ENGLISH        "Exit Without Saving"

REFERENCE           MPUI_FINISH_SELECTING
LANG_ENGLISH        "Finish Selecting"

REFERENCE           MPUI_KILLSTREAK_INCOMPATIBLE
LANG_ENGLISH        "Cannot be used with: &&1"

REFERENCE           MPUI_UNLOCK_REMAINING
LANG_ENGLISH        "1 unlock remaining."

REFERENCE           MPUI_N_UNLOCKS_AVAILABLE
LANG_ENGLISH        "&&1 unlocks available!"

REFERENCE           MPUI_1_UNLOCK_AVAILABLE
LANG_ENGLISH        "1 unlock available!"

REFERENCE           MPUI_N_SLASH_N_UNLOCKED
LANG_ENGLISH        "&&1/&&2 Unlocked"

REFERENCE           MPUI_N_SLASH_N_SELECTED
LANG_ENGLISH        "&&1/&&2 Selected"

REFERENCE           MPUI_DESC_PLAYERCARD_LIVE
LANG_ENGLISH        "Set your Title, Emblem, Name, and Killstreak Rewards."

REFERENCE           MPUI_NEWSFEED_IS
LANG_ENGLISH        "is"

REFERENCE           MPUI_SUMMARY
LANG_ENGLISH        "Summary"

REFERENCE           MPUI_DAMAGE
LANG_ENGLISH        "Damage"

REFERENCE           MPUI_RANGE
LANG_ENGLISH        "Range"

REFERENCE           MPUI_FIRE_RATE
LANG_ENGLISH        "Fire Rate"

REFERENCE           MPUI_MOBILITY
LANG_ENGLISH        "Mobility"

REFERENCE           MPUI_REPLACES_SECONDARY
LANG_ENGLISH        "Replaces Secondary"

REFERENCE           MPUI_ACCOLADES
LANG_ENGLISH        "Accolades"

REFERENCE           MPUI_PROGRESS
LANG_ENGLISH        "Progress"

REFERENCE           MPUI_ASSISTS
LANG_ENGLISH        "Assists"

REFERENCE           MPUI_WEAPON_UNLOCKS
LANG_ENGLISH        "Weapon Unlocks"

REFERENCE           MPUI_FEATURE_UNLOCKS
LANG_ENGLISH        "Feature Unlocks"

REFERENCE           MPUI_PERK_UNLOCKS
LANG_ENGLISH        "Perk Unlocks"

REFERENCE           MPUI_RULES_ADD_TIME
LANG_ENGLISH        "Extra Time:"

REFERENCE           MPUI_RULES_PRO_MODE
LANG_ENGLISH        "Pro Mode:"

REFERENCE           MPUI_SMOKING_GUN
LANG_ENGLISH        "Smoking Gun"

REFERENCE           MPUI_PLAYER_NAME_CAPS
LANG_ENGLISH        "PLAYER NAME"

REFERENCE           GAME_OBJECTIVESUPDATED
LANG_ENGLISH        "Objectives Updated."

REFERENCE           GAME_OBJECTIVECOMPLETED
LANG_ENGLISH        "Objective Completed."

REFERENCE           GAME_OBJECTIVEFAILED
LANG_ENGLISH        "Objective Failed."

REFERENCE           GAME_MISSIONFAILED
LANG_ENGLISH        "Mission Failed"

REFERENCE           GAME_CANT_GET_GRENADE_WEAP_MESSAGE
LANG_ENGLISH        "You must have the grenades selected to pickup a different type of grenades."

REFERENCE           GAME_CANT_GET_PISTOL_WEAP_MESSAGE
LANG_ENGLISH        "You must have the pistol selected to pickup a different pistol."

REFERENCE           GAME_CANT_GET_SMOKER_WEAP_MESSAGE
LANG_ENGLISH        "You must have the smoke grenades selected to pickup a different type of smoke grenades."

REFERENCE           GAME_PICKUP_AMMO
LANG_ENGLISH        "Got &&1 ammo."

REFERENCE           GAME_PICKUP_CANTCARRYMOREAMMO
LANG_ENGLISH        "&&1 ammo full."

REFERENCE           GAME_DIFFICULTY_MEDIUM
LANG_ENGLISH        "Difficulty: Regular"

REFERENCE           GAME_DIFFICULTY_HARD
LANG_ENGLISH        "Difficulty: Hardened"

REFERENCE           GAME_DIFFICULTY_FU
LANG_ENGLISH        "Difficulty: Veteran"

REFERENCE           GAME_DIFFICULTY_UNKNOWN
LANG_ENGLISH        "Difficulty: Unknown"

REFERENCE           GAME_HEALTH
LANG_ENGLISH        "Health"

REFERENCE           GAME_LEVELTIME
LANG_ENGLISH        "Level Time"

REFERENCE           GAME_BADCLIENTSLOT
LANG_ENGLISH        "Bad client slot:"

REFERENCE           GAME_CLIENTNOTACTIVE
LANG_ENGLISH        "Client &&1 is not active"

REFERENCE           GAME_USERNOTONSERVER
LANG_ENGLISH        "User &&1 is not on the server."

REFERENCE           GAME_CALLEDAVOTE
LANG_ENGLISH        "&&1 called a vote."

REFERENCE           GAME_CLIENTNOTONSERVER
LANG_ENGLISH        "Client not on server."

REFERENCE           GAME_COMPLAINTFILEDAGAINST
LANG_ENGLISH        "Complaint filed against you. (&&1 until kicked)"

REFERENCE           GAME_WARNING
LANG_ENGLISH        "WARNING"

REFERENCE           GAME_KICKEDFROMCOMPLAINTS
LANG_ENGLISH        "kicked after too many complaints."

REFERENCE           GAME_NOVOTEINPROGRESS
LANG_ENGLISH        "No vote in progress."

REFERENCE           GAME_VOTEALREADYCAST
LANG_ENGLISH        "Vote already cast."

REFERENCE           GAME_NOSPECTATORVOTE
LANG_ENGLISH        "Not allowed to vote as spectator."

REFERENCE           GAME_VOTECAST
LANG_ENGLISH        "Vote cast."

REFERENCE           GAME_VOTINGNOTENABLED
LANG_ENGLISH        "Voting not enabled on this server."

REFERENCE           GAME_VOTINGNOTENOUGHPLAYERS
LANG_ENGLISH        "There are not enough players to call a vote."

REFERENCE           GAME_VOTEALREADYINPROGRESS
LANG_ENGLISH        "A vote is already in progress."

REFERENCE           GAME_MAXVOTESCALLED
LANG_ENGLISH        "You have called the maximum number of votes."

REFERENCE           GAME_NOSPECTATORCALLVOTE
LANG_ENGLISH        "Not allowed to call a vote as spectator."

REFERENCE           GAME_INVALIDVOTESTRING
LANG_ENGLISH        "Invalid vote string."

REFERENCE           GAME_VOTECOMMANDSARE
LANG_ENGLISH        "Vote commands are:"

REFERENCE           GAME_INVALIDGAMETYPE
LANG_ENGLISH        "Invalid gametype."

REFERENCE           GAME_NEXTMAPNOTSET
LANG_ENGLISH        "nextmap not set."

REFERENCE           GAME_CHEATSNOTENABLED
LANG_ENGLISH        "Cheats are not enabled on this server."

REFERENCE           GAME_MUSTBEALIVECOMMAND
LANG_ENGLISH        "You must be alive to use this command."

REFERENCE           GAME_USAGE
LANG_ENGLISH        "usage"

REFERENCE           GAME_CHANGEDTO
LANG_ENGLISH        "changed to"

REFERENCE           GAME_SERVER
LANG_ENGLISH        "Server"

REFERENCE           GAME_VOICECHATIGNORED
LANG_ENGLISH        "VoiceChat ignored"

REFERENCE           GAME_SPAMPROTECT
LANG_ENGLISH        "Spam Protection"

REFERENCE           GAME_GC_HOLDYOURPOSITION
LANG_ENGLISH        "Hold your position."

REFERENCE           GAME_GC_HOLDTHISPOSITION
LANG_ENGLISH        "Hold this position."

REFERENCE           GAME_GC_COMEHERE
LANG_ENGLISH        "Come here."

REFERENCE           GAME_GC_COVERME
LANG_ENGLISH        "Cover me."

REFERENCE           GAME_GC_GUARDLOCATION
LANG_ENGLISH        "Guard location."

REFERENCE           GAME_GC_SEARCHDESTROY
LANG_ENGLISH        "Search and destroy."

REFERENCE           GAME_GC_REPORT
LANG_ENGLISH        "Report."

REFERENCE           GAME_UNKNOWNCLIENTCOMMAND
LANG_ENGLISH        "Unknown cmd &&1"

REFERENCE           GAME_GODMODE_ON
LANG_ENGLISH        "godmode ON"

REFERENCE           GAME_GODMODE_OFF
LANG_ENGLISH        "godmode OFF"

REFERENCE           GAME_DEMI_GODMODE_ON
LANG_ENGLISH        "demigod mode ON"

REFERENCE           GAME_DEMI_GODMODE_OFF
LANG_ENGLISH        "demigod mode OFF"

REFERENCE           GAME_NOTARGETON
LANG_ENGLISH        "notarget ON"

REFERENCE           GAME_NOTARGETOFF
LANG_ENGLISH        "notarget OFF"

REFERENCE           GAME_NOCLIPON
LANG_ENGLISH        "noclip ON"

REFERENCE           GAME_NOCLIPOFF
LANG_ENGLISH        "noclip OFF"

REFERENCE           GAME_UFOON
LANG_ENGLISH        "ufomode ON"

REFERENCE           GAME_UFOOFF
LANG_ENGLISH        "ufomode OFF"

REFERENCE           GAME_VOTEFAILED
LANG_ENGLISH        "Vote failed."

REFERENCE           GAME_VOTEPASSED
LANG_ENGLISH        "Vote passed."

REFERENCE           GAME_OPFOR
LANG_ENGLISH        "Opposition"

REFERENCE           GAME_MARINES
LANG_ENGLISH        "Marines"

REFERENCE           GAME_PICKUP_CLIPONLY_AMMO
LANG_ENGLISH        "Got &&1 ammo"

REFERENCE           GAME_VOTE_GAMETYPE
LANG_ENGLISH        "Game Type: "

REFERENCE           GAME_VOTE_MAPRESTART
LANG_ENGLISH        "Map Restart"

REFERENCE           GAME_VOTE_MAP
LANG_ENGLISH        "Map: "

REFERENCE           GAME_VOTE_NEXTMAP
LANG_ENGLISH        "Next Map"

REFERENCE           GAME_VOTE_KICK
LANG_ENGLISH        "Kick Player: &&1"

REFERENCE           GAME_ERR_SAVEGAME_BAD
LANG_ENGLISH        "Savegame is out-of-date or corrupt."

REFERENCE           GAME_TYPEMAP_NOCHANGE
LANG_ENGLISH        "Vote would not change Game Type or Map."

REFERENCE           GAME_SPECTATOR
LANG_ENGLISH        "Spectator"

REFERENCE           GAME_DEAD
LANG_ENGLISH        "Dead"

REFERENCE           GAME_SAVE_INSUFFICIENT_FREE_DISK
LANG_ENGLISH        "Insufficient free disk space.\\n\\nPlease free at least 5mb of free space on game drive."

REFERENCE           GAME_INACTIVEDROPWARNING
LANG_ENGLISH        "Warning: You are about to be kicked due to inactivity."

REFERENCE           GAME_DROPPEDFORINACTIVITY
LANG_ENGLISH        "Kicked from server due to inactivity."

REFERENCE           GAME_INVALIDPASSWORD
LANG_ENGLISH        "Invalid Password."

REFERENCE           GAME_INVALIDSERVER
LANG_ENGLISH        "Invalid Server."

REFERENCE           GAME_SAVE_UNABLE_TO_ACCESS_DEVICE
LANG_ENGLISH        "Unable to access save device. Please make sure that you have a valid User Profile(Xbox live acount. Use\\"Tools\\" in the Xenon Launcher)."

REFERENCE           GAME_GET_TO_COVER
LANG_ENGLISH        "You are Hurt. Get to Cover!"

REFERENCE           GAME_SAVE_DESCRIPTION
LANG_ENGLISH        "Modern Warfare 2 Save Game"

REFERENCE           GAME_SAVE_UNABLE_TO_READ_FROM_DEVICE
LANG_ENGLISH        "Unable to read from memory device. Please check that the device is inserted correctly."

REFERENCE           GAME_STAND_BLOCKED
LANG_ENGLISH        "Can't Stand Here"

REFERENCE           GAME_CROUCH_BLOCKED
LANG_ENGLISH        "Can't Crouch Here"

REFERENCE           GAME_CUSTOM_GAMEMODE
LANG_ENGLISH        "Modern Warfare 2 Custom Game Mode"

REFERENCE           GAME_MPON
LANG_ENGLISH        "Model Previewer On"

REFERENCE           GAME_MPOFF
LANG_ENGLISH        "Model Previewer Off"

REFERENCE           GAME_OFFLINE_STATS
LANG_ENGLISH        "Multiplayer Progress for \\"&&1\\""

REFERENCE           GAME_ONLINE_UPDATE_DESCRIPTION
LANG_ENGLISH        "Modern Warfare 2 Online Update"

REFERENCE           GAME_CROUCH_BLOCKED_WEAPON
LANG_ENGLISH        "Can't Crouch To Use This Weapon Here."

REFERENCE           GAME_STAND_BLOCKED_WEAPON
LANG_ENGLISH        "Can't Stand To Use This Weapon Here."

REFERENCE           KEY_OR
LANG_ENGLISH        "or"

REFERENCE           KEY_UNBOUND
LANG_ENGLISH        "Unbound"

REFERENCE           KEY_TAB
LANG_ENGLISH        "Tab"

REFERENCE           KEY_ENTER
LANG_ENGLISH        "Enter"

REFERENCE           KEY_ESCAPE
LANG_ENGLISH        "Escape"

REFERENCE           KEY_SPACE
LANG_ENGLISH        "Space"

REFERENCE           KEY_BACKSPACE
LANG_ENGLISH        "Backspace"

REFERENCE           KEY_UPARROW
LANG_ENGLISH        "Up Arrow"

REFERENCE           KEY_DOWNARROW
LANG_ENGLISH        "Down Arrow"

REFERENCE           KEY_LEFTARROW
LANG_ENGLISH        "Left Arrow"

REFERENCE           KEY_RIGHTARROW
LANG_ENGLISH        "Right Arrow"

REFERENCE           KEY_ALT
LANG_ENGLISH        "Alt"

REFERENCE           KEY_CTRL
LANG_ENGLISH        "Ctrl"

REFERENCE           KEY_SHIFT
LANG_ENGLISH        "Shift"

REFERENCE           KEY_CAPSLOCK
LANG_ENGLISH        "Caps Lock"

REFERENCE           KEY_INS
LANG_ENGLISH        "Ins"

REFERENCE           KEY_DEL
LANG_ENGLISH        "Del"

REFERENCE           KEY_PGDN
LANG_ENGLISH        "Page Down"

REFERENCE           KEY_PGUP
LANG_ENGLISH        "Page Up"

REFERENCE           KEY_HOME
LANG_ENGLISH        "Home"

REFERENCE           KEY_END
LANG_ENGLISH        "End"

REFERENCE           KEY_MOUSE1
LANG_ENGLISH        "Left Mouse"

REFERENCE           KEY_MOUSE2
LANG_ENGLISH        "Right Mouse"

REFERENCE           KEY_MOUSE3
LANG_ENGLISH        "Middle Mouse"

REFERENCE           KEY_MOUSE4
LANG_ENGLISH        "Mouse 4"

REFERENCE           KEY_MOUSE5
LANG_ENGLISH        "Mouse 5"

REFERENCE           KEY_MWHEELUP
LANG_ENGLISH        "Wheel Up"

REFERENCE           KEY_MWHEELDOWN
LANG_ENGLISH        "Wheel Down"

REFERENCE           KEY_JOY1
LANG_ENGLISH        "Joystick 1"

REFERENCE           KEY_JOY2
LANG_ENGLISH        "Joystick 2"

REFERENCE           KEY_JOY3
LANG_ENGLISH        "Joystick 3"

REFERENCE           KEY_JOY4
LANG_ENGLISH        "Joystick 4"

REFERENCE           KEY_JOY5
LANG_ENGLISH        "Joystick 5"

REFERENCE           KEY_JOY6
LANG_ENGLISH        "Joystick 6"

REFERENCE           KEY_JOY7
LANG_ENGLISH        "Joystick 7"

REFERENCE           KEY_JOY8
LANG_ENGLISH        "Joystick 8"

REFERENCE           KEY_JOY9
LANG_ENGLISH        "Joystick 9"

REFERENCE           KEY_JOY10
LANG_ENGLISH        "Joystick 10"

REFERENCE           KEY_JOY11
LANG_ENGLISH        "Joystick 11"

REFERENCE           KEY_JOY12
LANG_ENGLISH        "Joystick 12"

REFERENCE           KEY_JOY13
LANG_ENGLISH        "Joystick 13"

REFERENCE           KEY_JOY14
LANG_ENGLISH        "Joystick 14"

REFERENCE           KEY_JOY15
LANG_ENGLISH        "Joystick 15"

REFERENCE           KEY_JOY16
LANG_ENGLISH        "Joystick 16"

REFERENCE           KEY_JOY17
LANG_ENGLISH        "Joystick 17"

REFERENCE           KEY_JOY18
LANG_ENGLISH        "Joystick 18"

REFERENCE           KEY_JOY19
LANG_ENGLISH        "Joystick 19"

REFERENCE           KEY_JOY20
LANG_ENGLISH        "Joystick 20"

REFERENCE           KEY_JOY21
LANG_ENGLISH        "Joystick 21"

REFERENCE           KEY_JOY22
LANG_ENGLISH        "Joystick 22"

REFERENCE           KEY_JOY23
LANG_ENGLISH        "Joystick 23"

REFERENCE           KEY_JOY24
LANG_ENGLISH        "Joystick 24"

REFERENCE           KEY_JOY25
LANG_ENGLISH        "Joystick 25"

REFERENCE           KEY_JOY26
LANG_ENGLISH        "Joystick 26"

REFERENCE           KEY_JOY27
LANG_ENGLISH        "Joystick 27"

REFERENCE           KEY_JOY28
LANG_ENGLISH        "Joystick 28"

REFERENCE           KEY_JOY29
LANG_ENGLISH        "Joystick 29"

REFERENCE           KEY_JOY30
LANG_ENGLISH        "Joystick 30"

REFERENCE           KEY_JOY31
LANG_ENGLISH        "Joystick 31"

REFERENCE           KEY_JOY32
LANG_ENGLISH        "Joystick 32"

REFERENCE           KEY_AUX1
LANG_ENGLISH        "Auxiliary 1"

REFERENCE           KEY_AUX2
LANG_ENGLISH        "Auxiliary 2"

REFERENCE           KEY_AUX3
LANG_ENGLISH        "Auxiliary 3"

REFERENCE           KEY_AUX4
LANG_ENGLISH        "Auxiliary 4"

REFERENCE           KEY_AUX5
LANG_ENGLISH        "Auxiliary 5"

REFERENCE           KEY_AUX6
LANG_ENGLISH        "Auxiliary 6"

REFERENCE           KEY_AUX7
LANG_ENGLISH        "Auxiliary 7"

REFERENCE           KEY_AUX8
LANG_ENGLISH        "Auxiliary 8"

REFERENCE           KEY_AUX9
LANG_ENGLISH        "Auxiliary 9"

REFERENCE           KEY_AUX10
LANG_ENGLISH        "Auxiliary 10"

REFERENCE           KEY_AUX11
LANG_ENGLISH        "Auxiliary 11"

REFERENCE           KEY_AUX12
LANG_ENGLISH        "Auxiliary 12"

REFERENCE           KEY_AUX13
LANG_ENGLISH        "Auxiliary 13"

REFERENCE           KEY_AUX14
LANG_ENGLISH        "Auxiliary 14"

REFERENCE           KEY_AUX15
LANG_ENGLISH        "Auxiliary 15"

REFERENCE           KEY_AUX16
LANG_ENGLISH        "Auxiliary 16"

REFERENCE           KEY_F1
LANG_ENGLISH        "F1"

REFERENCE           KEY_F2
LANG_ENGLISH        "F2"

REFERENCE           KEY_F3
LANG_ENGLISH        "F3"

REFERENCE           KEY_F4
LANG_ENGLISH        "F4"

REFERENCE           KEY_F5
LANG_ENGLISH        "F5"

REFERENCE           KEY_F6
LANG_ENGLISH        "F6"

REFERENCE           KEY_F7
LANG_ENGLISH        "F7"

REFERENCE           KEY_F8
LANG_ENGLISH        "F8"

REFERENCE           KEY_F9
LANG_ENGLISH        "F9"

REFERENCE           KEY_F10
LANG_ENGLISH        "F10"

REFERENCE           KEY_F11
LANG_ENGLISH        "F11"

REFERENCE           KEY_F12
LANG_ENGLISH        "F12"

REFERENCE           KEY_KP_HOME
LANG_ENGLISH        "KP Home"

REFERENCE           KEY_KP_UPARROW
LANG_ENGLISH        "KP Up Arrow"

REFERENCE           KEY_KP_PGUP
LANG_ENGLISH        "KP Page Up"

REFERENCE           KEY_KP_LEFTARROW
LANG_ENGLISH        "KP Left Arrow"

REFERENCE           KEY_KP_5
LANG_ENGLISH        "KP 5"

REFERENCE           KEY_KP_RIGHTARROW
LANG_ENGLISH        "KP Right Arrow"

REFERENCE           KEY_KP_END
LANG_ENGLISH        "KP End"

REFERENCE           KEY_KP_DOWNARROW
LANG_ENGLISH        "KP Down Arrow"

REFERENCE           KEY_KP_PGDN
LANG_ENGLISH        "KP Page Down"

REFERENCE           KEY_KP_ENTER
LANG_ENGLISH        "KP Enter"

REFERENCE           KEY_KP_INS
LANG_ENGLISH        "KP Ins"

REFERENCE           KEY_KP_DEL
LANG_ENGLISH        "KP Del"

REFERENCE           KEY_KP_SLASH
LANG_ENGLISH        "KP Slash"

REFERENCE           KEY_KP_MINUS
LANG_ENGLISH        "KP Minus"

REFERENCE           KEY_KP_PLUS
LANG_ENGLISH        "KP Plus"

REFERENCE           KEY_KP_NUMLOCK
LANG_ENGLISH        "Num Lock"

REFERENCE           KEY_KP_STAR
LANG_ENGLISH        "KP Star"

REFERENCE           KEY_KP_EQUALS
LANG_ENGLISH        "KP Equals"

REFERENCE           KEY_PAUSE
LANG_ENGLISH        "Pause"

REFERENCE           KEY_SEMICOLON
LANG_ENGLISH        "Semicolon"

REFERENCE           KEY_COMMAND
LANG_ENGLISH        "Command"

REFERENCE           KEY_USE
LANG_ENGLISH        "use"

REFERENCE           MESSAGEBOX_LOW_DESKTOP_COLOR_DEPTH
LANG_ENGLISH        "Low Desktop Color Depth"

REFERENCE           MESSAGEBOX_IT_IS_HIGHLY_UNLIKELY
LANG_ENGLISH        "It is highly unlikely that a correct windowed display can be initialized with the current desktop display depth. Select 'OK' to try anyway. Press 'Cancel' if you wish to quit."

REFERENCE           MESSAGEBOX_LOW_MEMORY
LANG_ENGLISH        "Low Memory"

REFERENCE           MESSAGEBOX_IT_LOOKS_LIKE_YOU_ARE
LANG_ENGLISH        "It looks like you are low on virtual memory. This can cause the game to run slowly and it may stop completely. It is highly recommended that you close some programs before running Modern Warfare 2. Do you want to run Modern Warfare 2 anyway?"

REFERENCE           MESSAGEBOX_RECOMMENDED_SETTINGS
LANG_ENGLISH        "Recommended Settings Updated"

REFERENCE           MESSAGEBOX_THE_RECOMMENDED_SETTINGS
LANG_ENGLISH        "The recommended settings have been updated since the last time you ran Modern Warfare 2. Would you like the game to configure itself optimally with these new settings? This is recommended for most people. It will change your system settings but not your controls."

REFERENCE           MESSAGEBOX_HARDWARE_CHANGE_DETECTED
LANG_ENGLISH        "Hardware Change Detected"

REFERENCE           MESSAGEBOX_YOUR_COMPUTER_APPEARS
LANG_ENGLISH        "Your computer appears to have changed since the last time you ran Modern Warfare 2. Would you like the game to configure itself optimally for your new hardware? This is recommended for most people. It will change your system settings but not your controls."

REFERENCE           MESSAGEBOX_FILE_WRITE_ERROR
LANG_ENGLISH        "File Write Error"

REFERENCE           MESSAGEBOX_CALL_OF_DUTY_COULDNT
LANG_ENGLISH        "Modern Warfare 2 couldn't write a file. The hard drive is probably full."

REFERENCE           MESSAGEBOX_IMPROPER_QUIT_DETECTED
LANG_ENGLISH        "Improper Quit Detected"

REFERENCE           MESSAGEBOX_IT_APPEARS_THAT_CALL
LANG_ENGLISH        "It appears that Modern Warfare 2 did not quit properly the last time it ran. Do you want to run the game in safe mode? This is recommended for most people. It will change your system settings but not your controls."

REFERENCE           MINEFIELDS_MINEDIED
LANG_ENGLISH        "You stepped into a Minefield and died.\\nWatch out for the Red and White Minefield Signs!"

REFERENCE           MINEFIELDS_MINEDIED_TANK
LANG_ENGLISH        "You drove into a Minefield and died.\\nWatch out for the Red and White Minefield Signs!"

REFERENCE           OBJECTIVES_WAR
LANG_ENGLISH        "Gain points by eliminating enemy players."

REFERENCE           OBJECTIVES_WAR_SCORE
LANG_ENGLISH        "Gain points by eliminating enemy players.  First team to &&1 wins."

REFERENCE           OBJECTIVES_WAR_HINT
LANG_ENGLISH        "Eliminate enemy players."

REFERENCE           OBJECTIVES_SD_ATTACKER
LANG_ENGLISH        "Destroy target A or B by planting explosives at it's location."

REFERENCE           OBJECTIVES_SD_ATTACKER_SCORE
LANG_ENGLISH        "Destroy target A or B by planting explosives at it's location.  Prevent the explosives from being defused once they have been planted.  First team to &&1 wins."

REFERENCE           OBJECTIVES_SD_ATTACKER_HINT
LANG_ENGLISH        "Destroy target A or B."

REFERENCE           OBJECTIVES_SD_DEFENDER
LANG_ENGLISH        "Protect the targets from being destroyed."

REFERENCE           OBJECTIVES_SD_DEFENDER_SCORE
LANG_ENGLISH        "Protect the targets from being destroyed. If explosives are planted at either location, defuse them before they explode. First team to &&1 wins."

REFERENCE           OBJECTIVES_SD_DEFENDER_HINT
LANG_ENGLISH        "Protect targets A and B."

REFERENCE           OBJECTIVES_SAB
LANG_ENGLISH        "Recover the explosives and plant them at the enemy target, while protecting your own."

REFERENCE           OBJECTIVES_SAB_SCORE
LANG_ENGLISH        "Recover the explosives and plant them at the enemy target, while protecting your own. First team to &&1 wins."

REFERENCE           OBJECTIVES_SAB_HINT
LANG_ENGLISH        "Destroy the enemy target."

REFERENCE           OBJECTIVES_DOM
LANG_ENGLISH        "Capture and defend the flags."

REFERENCE           OBJECTIVES_DOM_SCORE
LANG_ENGLISH        "Capture and defend the flags.  First team to &&1 wins."

REFERENCE           OBJECTIVES_DOM_HINT
LANG_ENGLISH        "Capture the flags and defend them."

REFERENCE           OBJECTIVES_DM
LANG_ENGLISH        "Gain points by eliminating other players."

REFERENCE           OBJECTIVES_DM_SCORE
LANG_ENGLISH        "Gain points by eliminating other players.  First player to &&1 points wins."

REFERENCE           OBJECTIVES_DM_HINT
LANG_ENGLISH        "Eliminate other players."

REFERENCE           OBJECTIVES_KOTH
LANG_ENGLISH        "Gain points by holding the headquarters."

REFERENCE           OBJECTIVES_KOTH_SCORE
LANG_ENGLISH        "Gain points by holding the headquarters.  First team to &&1 points wins."

REFERENCE           OBJECTIVES_KOTH_HINT
LANG_ENGLISH        "Hold the headquarters."

REFERENCE           OBJECTIVES_CTF
LANG_ENGLISH        "Gain points by stealing the enemy flag and then touching your flag at your base."

REFERENCE           OBJECTIVES_CTF_SCORE
LANG_ENGLISH        "Gain points by stealing the enemy flag and then touching your flag at your base. First team with &&1 captures wins."

REFERENCE           OBJECTIVES_CTF_HINT
LANG_ENGLISH        "Capture the enemy flag."

REFERENCE           OBJECTIVES_ONE_FLAG_ATTACKER
LANG_ENGLISH        "Gain points by stealing the enemy flag and then touching the beacon at your base."

REFERENCE           OBJECTIVES_ONE_FLAG_DEFENDER
LANG_ENGLISH        "Protect the flag from being captured."

REFERENCE           OBJECTIVES_ONE_FLAG_ATTACKER_SCORE
LANG_ENGLISH        "Gain points by stealing the enemy flag and then touching the beacon at your base. First team with &&1 captures wins."

REFERENCE           OBJECTIVES_ONE_FLAG_DEFENDER_SCORE
LANG_ENGLISH        "Protect the flag from being captured. First team with &&1 captures wins."

REFERENCE           OBJECTIVES_ONE_FLAG_ATTACKER_HINT
LANG_ENGLISH        "Capture the enemy flag."

REFERENCE           OBJECTIVES_ONE_FLAG_DEFENDER_HINT
LANG_ENGLISH        "Defend the flag."

REFERENCE           OBJECTIVES_DD_ATTACKER_HINT
LANG_ENGLISH        "Destroy targets A and B."

REFERENCE           OBJECTIVES_DD_DEFENDER_HINT
LANG_ENGLISH        "Protect targets A and B."

REFERENCE           OBJECTIVES_DD_ATTACKER
LANG_ENGLISH        "Destroy both targets by planting explosives at both A and B."

REFERENCE           OBJECTIVES_DD_DEFENDER
LANG_ENGLISH        "Protect targets A and B from being destroyed."

REFERENCE           OBJECTIVES_DD_DEFENDER_SCORE
LANG_ENGLISH        "Protect the targets from being destroyed. If explosives are planted at either location, defuse them before they explode."

REFERENCE           OBJECTIVES_DD_ATTACKER_SCORE
LANG_ENGLISH        "Destroy targets A and B by planting explosives at their location.  Prevent the explosives from being defused once they have been planted."

REFERENCE           OBJECTIVES_VIP
LANG_ENGLISH        "VIP mode"

REFERENCE           OBJECTIVES_VIP_ATTACKER_HINT
LANG_ENGLISH        "Kill the VIP and keep him from reaching the extraction zone."

REFERENCE           OBJECTIVES_VIP_DEFENDER_HINT
LANG_ENGLISH        "Defend the VIP and help him reach the extraction zone."

REFERENCE           OBJECTIVES_VIP_ATTACKER
LANG_ENGLISH        "Kill the VIP and keep him from reaching the extraction zone."

REFERENCE           OBJECTIVES_VIP_DEFENDER
LANG_ENGLISH        "Defend the VIP and help him reach the extraction zone."

REFERENCE           OBJECTIVES_VIP_DEFENDER_SCORE
LANG_ENGLISH        "Protect the VIP and assist his extraction. When the VIP reaches the extraction zone defend him until extraction is complete."

REFERENCE           OBJECTIVES_VIP_ATTACKER_SCORE
LANG_ENGLISH        "Kill the VIP and any defenders.  Prevent the VIP from being extracted from battle."

REFERENCE           OBJECTIVES_ARENA
LANG_ENGLISH        "Team elimination with a twist"

REFERENCE           OBJECTIVES_ARENA_HINT
LANG_ENGLISH        "Eliminate the enemy or capture the flag"

REFERENCE           OBJECTIVES_ARENA_SCORE
LANG_ENGLISH        "Eliminate the enemy or capture the flag. The flag will spawn when a team is down to one player."

REFERENCE           OBJECTIVES_GTNW
LANG_ENGLISH        "Be the first team to capture the Nuclear Strike crate to win."

REFERENCE           OBJECTIVES_FLAG_HOME
LANG_ENGLISH        "AT BASE"

REFERENCE           OBJECTIVES_FLAG_NAME
LANG_ENGLISH        "&&1"

REFERENCE           OBJECTIVES_FLAG_AWAY
LANG_ENGLISH        "AWAY"

REFERENCE           OBJECTIVES_GTNW_SCORE
LANG_ENGLISH        "Be the first team to capture the Nuclear Strike crate to win. First team to &&1 capture wins."

REFERENCE           OBJECTIVES_GTNW_HINT
LANG_ENGLISH        "Capture the nuke."

REFERENCE           OBJECTIVES_GRAB_FLAG
LANG_ENGLISH        "First to grab the flag wins!"

REFERENCE           OBJECTIVES_GRAB_FLAG_SCORE
LANG_ENGLISH        "First team to grab the enemy flag wins!"

REFERENCE           OBJECTIVES_GRAB_FLAG_HINT
LANG_ENGLISH        "Grab the enemy flag."

REFERENCE           OBJECTIVES_OVERTIME_CTF
LANG_ENGLISH        "Be the first team to grab the enemy flag to win."

REFERENCE           WEAPON_MP44
LANG_ENGLISH        "MP44"

REFERENCE           WEAPON_M2FRAGGRENADE
LANG_ENGLISH        "M2 Frag Grenade"

REFERENCE           WEAPON_MK1_FRAG_GRENADE
LANG_ENGLISH        "MK1 Frag Grenade"

REFERENCE           WEAPON_HOLDPIN
LANG_ENGLISH        "Hold-Pin"

REFERENCE           WEAPON_COOKOFF
LANG_ENGLISH        "Cook-Off"

REFERENCE           WEAPON_FRAGGRENADE
LANG_ENGLISH        "Frag"

REFERENCE           WEAPON_SMOKEGRENADE
LANG_ENGLISH        "Smoke"

REFERENCE           WEAPON_DEFAULTWEAPON
LANG_ENGLISH        "Default Weapon"

REFERENCE           WEAPON_NO_AMMO
LANG_ENGLISH        "No Ammo"

REFERENCE           WEAPON_NO_WEAPON_AMMO
LANG_ENGLISH        "No &&1 Ammo Remaining"

REFERENCE           WEAPON_NO_WEAPON_AMMO_MP
LANG_ENGLISH        "No Equipment Available"

REFERENCE           WEAPON_NO_FRAG_GRENADE
LANG_ENGLISH        "No Frag Grenades Remaining"

REFERENCE           WEAPON_NO_SPECIAL_GRENADE
LANG_ENGLISH        "No Special Grenades Remaining"

REFERENCE           WEAPON_FREERUNNER
LANG_ENGLISH        "No Weapon Available"

REFERENCE           WEAPON_LOCATION_SELECTOR
LANG_ENGLISH        "Select a location"

REFERENCE           WEAPON_C4
LANG_ENGLISH        "C4"

REFERENCE           WEAPON_C4_DETONATOR
LANG_ENGLISH        "C4 Detonator"

REFERENCE           WEAPON_CLAYMORE
LANG_ENGLISH        "Claymore"

REFERENCE           WEAPON_CLAYMORE_DETONATOR
LANG_ENGLISH        "Claymore Detonator"

REFERENCE           WEAPON_RPG_LAUNCHER
LANG_ENGLISH        "RPG Launcher"

REFERENCE           WEAPON_SMOKE_GRENADE
LANG_ENGLISH        "Smoke Grenade"

REFERENCE           WEAPON_FLASH_GRENADE
LANG_ENGLISH        "Flash Grenade"

REFERENCE           WEAPON_CONCUSSION_GRENADE
LANG_ENGLISH        "Stun Grenade"

REFERENCE           WEAPON_THROWING_KNIFE
LANG_ENGLISH        "Throwing Knife"

REFERENCE           WEAPON_RAPPEL_KNIFE
LANG_ENGLISH        "Knife"

REFERENCE           WEAPON_RPG
LANG_ENGLISH        "RPG-7"

REFERENCE           WEAPON_RPG_X2
LANG_ENGLISH        "RPG-7 x 2"

REFERENCE           WEAPON_AT4
LANG_ENGLISH        "AT4"

REFERENCE           WEAPON_MP5_SILENCER
LANG_ENGLISH        "MP5KSD"

REFERENCE           WEAPON_MP5
LANG_ENGLISH        "MP5K"

REFERENCE           WEAPON_MAC10
LANG_ENGLISH        "Mac-10"

REFERENCE           WEAPON_P90
LANG_ENGLISH        "P90"

REFERENCE           WEAPON_P90_SILENCER
LANG_ENGLISH        "P90 Silenced"

REFERENCE           WEAPON_P90_ACOG
LANG_ENGLISH        "P90 ACOG Sight"

REFERENCE           WEAPON_P90_REDDOT
LANG_ENGLISH        "P90 Red Dot Sight"

REFERENCE           WEAPON_M16
LANG_ENGLISH        "M16A4"

REFERENCE           WEAPON_M203
LANG_ENGLISH        "M203"

REFERENCE           WEAPON_G36C
LANG_ENGLISH        "G36C"

REFERENCE           WEAPON_M14
LANG_ENGLISH        "M14"

REFERENCE           WEAPON_M40A3
LANG_ENGLISH        "M40A3"

REFERENCE           WEAPON_BARRETT
LANG_ENGLISH        "Barrett .50cal"

REFERENCE           WEAPON_WINCHESTER1200
LANG_ENGLISH        "W1200"

REFERENCE           WEAPON_M1014
LANG_ENGLISH        "M1014"

REFERENCE           WEAPON_M1014_EOTECH
LANG_ENGLISH        "M1014 Holographic"

REFERENCE           WEAPON_M4M203
LANG_ENGLISH        "M4A1 Grenadier"

REFERENCE           WEAPON_M4
LANG_ENGLISH        "M4A1"

REFERENCE           WEAPON_M4_SILENCER
LANG_ENGLISH        "M4A1 Suppressed"

REFERENCE           WEAPON_M4M203_SILENCER
LANG_ENGLISH        "M4A1 SOPMOD"

REFERENCE           WEAPON_M4M203_ACOG
LANG_ENGLISH        "M4A1 Grenadier w/ ACOG Sight"

REFERENCE           WEAPON_M4M203_REFLEX
LANG_ENGLISH        "M4A1 Grenadier w/ Red Dot Sight"

REFERENCE           WEAPON_M4M203_EOTECH
LANG_ENGLISH        "M4A1 Grenadier w/ Holographic"

REFERENCE           WEAPON_SAW
LANG_ENGLISH        "M249 SAW"

REFERENCE           WEAPON_M60E4
LANG_ENGLISH        "M60E4"

REFERENCE           WEAPON_M240
LANG_ENGLISH        "M240"

REFERENCE           WEAPON_M240_REDDOT
LANG_ENGLISH        "M240 Red Dot Sight"

REFERENCE           WEAPON_M240_SILENCER
LANG_ENGLISH        "M240 Silenced"

REFERENCE           WEAPON_M240_EOTECH
LANG_ENGLISH        "M240 Holographic"

REFERENCE           WEAPON_M240_ACOG
LANG_ENGLISH        "M240 ACOG Sight"

REFERENCE           WEAPON_M240_THERMAL
LANG_ENGLISH        "M240 Thermal Sight"

REFERENCE           WEAPON_M240_HEARTBEAT
LANG_ENGLISH        "M240 Heartbeat"

REFERENCE           WEAPON_M240_BLING
LANG_ENGLISH        "M240 Bling"

REFERENCE           WEAPON_SKORPION
LANG_ENGLISH        "Skorpion"

REFERENCE           WEAPON_MINI_UZI
LANG_ENGLISH        "Mini-Uzi"

REFERENCE           WEAPON_UZI
LANG_ENGLISH        "Mini-Uzi"

REFERENCE           WEAPON_AK47
LANG_ENGLISH        "AK-47"

REFERENCE           WEAPON_AK47_GP25
LANG_ENGLISH        "AK-47 Grenadier"

REFERENCE           WEAPON_GP25
LANG_ENGLISH        "GP-25"

REFERENCE           WEAPON_G3
LANG_ENGLISH        "G3"

REFERENCE           WEAPON_DRAGUNOV
LANG_ENGLISH        "Dragunov"

REFERENCE           WEAPON_REMINGTON700
LANG_ENGLISH        "R700"

REFERENCE           WEAPON_AW50
LANG_ENGLISH        "AW-50"

REFERENCE           WEAPON_AK74U
LANG_ENGLISH        "AK-74u"

REFERENCE           WEAPON_RPD
LANG_ENGLISH        "RPD"

REFERENCE           WEAPON_BERETTA
LANG_ENGLISH        "M9"

REFERENCE           WEAPON_DESERTEAGLE
LANG_ENGLISH        "Desert Eagle"

REFERENCE           WEAPON_COLT1911
LANG_ENGLISH        "M1911 .45"

REFERENCE           WEAPON_COLT45
LANG_ENGLISH        "M1911 .45"

REFERENCE           WEAPON_AG36
LANG_ENGLISH        "AG36"

REFERENCE           WEAPON_HK79
LANG_ENGLISH        "HK79"

REFERENCE           WEAPON_EGLM
LANG_ENGLISH        "FN EGLM"

REFERENCE           WEAPON_SMGS
LANG_ENGLISH        "Sub Machine Guns"

REFERENCE           WEAPON_ASSAULTRIFLES
LANG_ENGLISH        "Assault Rifles"

REFERENCE           WEAPON_SHOTGUNS
LANG_ENGLISH        "Shotguns"

REFERENCE           WEAPON_SNIPERRIFLES
LANG_ENGLISH        "Sniper Rifles"

REFERENCE           WEAPON_JAVELIN
LANG_ENGLISH        "Javelin"

REFERENCE           WEAPON_STINGER
LANG_ENGLISH        "Stinger"

REFERENCE           WEAPON_TARGET_TOO_CLOSE
LANG_ENGLISH        "Too Close to Target"

REFERENCE           WEAPON_LOCKON_REQUIRED
LANG_ENGLISH        "Lock-On Required"

REFERENCE           WEAPON_M21_SILENCER
LANG_ENGLISH        "M21 EBR Silenced"

REFERENCE           WEAPON_M21
LANG_ENGLISH        "M21 EBR"

REFERENCE           WEAPON_M21_SOCOM
LANG_ENGLISH        "M21 EBR"

REFERENCE           WEAPON_TARGET_NOT_ENOUGH_CLEARANCE
LANG_ENGLISH        "Not Enough Room To Fire"

REFERENCE           WEAPON_M4_CARBINE
LANG_ENGLISH        "M4A1"

REFERENCE           WEAPON_DESERTEAGLEGOLD
LANG_ENGLISH        "Gold Desert Eagle"

REFERENCE           WEAPON_NO_ATTACHMENT
LANG_ENGLISH        "No Attachment"

REFERENCE           WEAPON_SILENCER
LANG_ENGLISH        "Silencer"

REFERENCE           WEAPON_REDDOT
LANG_ENGLISH        "Red Dot Sight"

REFERENCE           WEAPON_ACOG
LANG_ENGLISH        "ACOG Scope"

REFERENCE           WEAPON_GRENADE_LAUNCHER
LANG_ENGLISH        "Grenade Launcher"

REFERENCE           WEAPON_NO_CAMO
LANG_ENGLISH        "No Camo"

REFERENCE           WEAPON_DESERT_CAMO
LANG_ENGLISH        "Desert"

REFERENCE           WEAPON_WOODLAND_CAMO
LANG_ENGLISH        "Woodland"

REFERENCE           WEAPON_DIGITAL_CAMO
LANG_ENGLISH        "Digital"

REFERENCE           WEAPON_RED_TIGER_CAMO
LANG_ENGLISH        "Red Tiger"

REFERENCE           WEAPON_BLUE_TIGER_CAMO
LANG_ENGLISH        "Blue Tiger"

REFERENCE           WEAPON_GOLDEN_CAMO
LANG_ENGLISH        "Golden"

REFERENCE           WEAPON_PRESTIGE_CAMO
LANG_ENGLISH        "Prestige"

REFERENCE           WEAPON_BINOCULARS
LANG_ENGLISH        "Binoculars"

REFERENCE           WEAPON_ANM8_SMOKE_GRENADE
LANG_ENGLISH        "ANM8 Smoke Grenade"

REFERENCE           WEAPON_UZI_SILENCER
LANG_ENGLISH        "Mini-Uzi Silenced"

REFERENCE           WEAPON_GRIP
LANG_ENGLISH        "Grip"

REFERENCE           WEAPON_STUN_GRENADE
LANG_ENGLISH        "Stun Grenade"

REFERENCE           WEAPON_M16A4_GRENADIER
LANG_ENGLISH        "M16A4 Grenadier"

REFERENCE           WEAPON_AK47_ACOG
LANG_ENGLISH        "AK-47 ACOG Sight"

REFERENCE           WEAPON_AK47_SILENCER
LANG_ENGLISH        "AK-47 Silenced"

REFERENCE           WEAPON_AK47_SHOTGUN
LANG_ENGLISH        "AK-47 w/ Shotgun"

REFERENCE           WEAPON_AK47_REDDOT
LANG_ENGLISH        "AK-47 Red Dot Sight"

REFERENCE           WEAPON_AK47_FMJ
LANG_ENGLISH        "AK-47 FMJ"

REFERENCE           WEAPON_SENTRY_GUN
LANG_ENGLISH        "Sentry Gun"

REFERENCE           WEAPON_SENTRY_MINIGUN
LANG_ENGLISH        "Sentry MiniGun"

REFERENCE           WEAPON_KRISS
LANG_ENGLISH        "Vector"

REFERENCE           WEAPON_KRISS_ACOG
LANG_ENGLISH        "Vector ACOG Sight"

REFERENCE           WEAPON_KRISS_ACOG_SILENCER
LANG_ENGLISH        "Vector Silenced ACOG Sight"

REFERENCE           WEAPON_G3_ACOG
LANG_ENGLISH        "G3 ACOG Sight"

REFERENCE           WEAPON_G3_SILENCER
LANG_ENGLISH        "G3 Silenced"

REFERENCE           WEAPON_G3_REDDOT
LANG_ENGLISH        "G3 Red Dot Sight"

REFERENCE           WEAPON_G3_GL
LANG_ENGLISH        "G3 Grenade Launcher"

REFERENCE           WEAPON_G36C_ACOG
LANG_ENGLISH        "G36C ACOG Sight"

REFERENCE           WEAPON_G36C_SILENCER
LANG_ENGLISH        "G36C Silenced"

REFERENCE           WEAPON_G36C_REDDOT
LANG_ENGLISH        "G36C Red Dot Sight"

REFERENCE           WEAPON_G36C_GL
LANG_ENGLISH        "G36C Grenade Launcher"

REFERENCE           WEAPON_AK74U_ACOG
LANG_ENGLISH        "AK-74u ACOG Sight"

REFERENCE           WEAPON_AK74U_SILENCER
LANG_ENGLISH        "AK-74u Silenced"

REFERENCE           WEAPON_AK74U_REDDOT
LANG_ENGLISH        "AK-74u Red Dot Sight"

REFERENCE           WEAPON_RPD_ACOG
LANG_ENGLISH        "RPD ACOG Sight"

REFERENCE           WEAPON_RPD_GRIP
LANG_ENGLISH        "RPD Foregrip"

REFERENCE           WEAPON_RPD_REDDOT
LANG_ENGLISH        "RPD Red Dot Sight"

REFERENCE           WEAPON_REMINGTON700_ACOG
LANG_ENGLISH        "R700 ACOG Sight"

REFERENCE           WEAPON_AW50_ACOG
LANG_ENGLISH        "AW-50 ACOG Sight"

REFERENCE           WEAPON_BARRETT_ACOG
LANG_ENGLISH        "Barrett .50cal ACOG"

REFERENCE           WEAPON_BERETTA_SILENCER
LANG_ENGLISH        "M9 Silenced"

REFERENCE           WEAPON_COLT1911_SILENCER
LANG_ENGLISH        "M1911 .45 Silenced"

REFERENCE           WEAPON_DRAGUNOV_ACOG
LANG_ENGLISH        "Dragunov ACOG Sight"

REFERENCE           WEAPON_BENELLI_GRIP
LANG_ENGLISH        "M1014 Foregrip"

REFERENCE           WEAPON_BENELLI_REDDOT
LANG_ENGLISH        "M1014 Red Dot Sight"

REFERENCE           WEAPON_BENELLI
LANG_ENGLISH        "M1014"

REFERENCE           WEAPON_M14_ACOG
LANG_ENGLISH        "M14 ACOG Sight"

REFERENCE           WEAPON_M14_GL
LANG_ENGLISH        "M14 Grenade Launcher"

REFERENCE           WEAPON_M14_SILENCER
LANG_ENGLISH        "M14 Silencer"

REFERENCE           WEAPON_M14_REDDOT
LANG_ENGLISH        "M14 Red Dot Sight"

REFERENCE           WEAPON_M16_REDDOT
LANG_ENGLISH        "M16A4 Red Dot Sight"

REFERENCE           WEAPON_M16_GL
LANG_ENGLISH        "M16A4 Grenade Launcher"

REFERENCE           WEAPON_M16_SILENCER
LANG_ENGLISH        "M16A4 Silenced"

REFERENCE           WEAPON_M16_ACOG
LANG_ENGLISH        "M16A4 ACOG Sight"

REFERENCE           WEAPON_M4_CARBINE_ACOG
LANG_ENGLISH        "M4 ACOG Sight"

REFERENCE           WEAPON_M4_CARBINE_REDDOT
LANG_ENGLISH        "M4A1 Red Dot Sight"

REFERENCE           WEAPON_M4_CARBINE_SILENCER
LANG_ENGLISH        "M4A1 Silenced"

REFERENCE           WEAPON_M4_CARBINE_GL
LANG_ENGLISH        "M4A1 Grenade Launcher"

REFERENCE           WEAPON_M40A3_ACOG
LANG_ENGLISH        "M40A3 ACOG Sight"

REFERENCE           WEAPON_M60E4_ACOG
LANG_ENGLISH        "M60E4 ACOG Sight"

REFERENCE           WEAPON_M60E4_GRIP
LANG_ENGLISH        "M60E4 Foregrip"

REFERENCE           WEAPON_M60E4_REDDOT
LANG_ENGLISH        "M60E4 Red Dot Sight"

REFERENCE           WEAPON_MP5_ACOG
LANG_ENGLISH        "MP5K ACOG Sight"

REFERENCE           WEAPON_MP5_GRIP
LANG_ENGLISH        "MP5K Foregrip"

REFERENCE           WEAPON_MP5_REDDOT
LANG_ENGLISH        "MP5K Red Dot Sight"

REFERENCE           WEAPON_MP5_EOTECH
LANG_ENGLISH        "MP5K Holographic"

REFERENCE           WEAPON_MP5_SILENCED
LANG_ENGLISH        "MP5K Silenced"

REFERENCE           WEAPON_MP5_SILENCED_REDDOT
LANG_ENGLISH        "MP5K Silenced Red Dot"

REFERENCE           WEAPON_M21_ACOG
LANG_ENGLISH        "M21 EBR ACOG Sight"

REFERENCE           WEAPON_SAW_ACOG
LANG_ENGLISH        "M249 SAW ACOG"

REFERENCE           WEAPON_SAW_GRIP
LANG_ENGLISH        "M249 SAW Foregrip"

REFERENCE           WEAPON_SAW_REDDOT
LANG_ENGLISH        "M249 SAW Red Dot"

REFERENCE           WEAPON_SKORPION_ACOG
LANG_ENGLISH        "Skorpion ACOG Sight"

REFERENCE           WEAPON_SKORPION_REDDOT
LANG_ENGLISH        "Skorpion Red Dot Sight"

REFERENCE           WEAPON_SKORPION_SILENCER
LANG_ENGLISH        "Skorpion Silenced"

REFERENCE           WEAPON_UZI_ACOG
LANG_ENGLISH        "Mini-Uzi ACOG Sight"

REFERENCE           WEAPON_UZI_REDDOT
LANG_ENGLISH        "Mini-Uzi Red Dot Sight"

REFERENCE           WEAPON_USP
LANG_ENGLISH        "USP .45"

REFERENCE           WEAPON_USP_SCRIPTED
LANG_ENGLISH        "USP .45"

REFERENCE           WEAPON_USP_SILENCER
LANG_ENGLISH        "USP .45 Silenced"

REFERENCE           WEAPON_WINCHESTER1200_GRIP
LANG_ENGLISH        "W1200 Foregrip"

REFERENCE           WEAPON_WINCHESTER1200_REDDOT
LANG_ENGLISH        "W1200 Red Dot Sight"

REFERENCE           WEAPON_RANGER
LANG_ENGLISH        "Ranger"

REFERENCE           WEAPON_UMP45
LANG_ENGLISH        "UMP45"

REFERENCE           WEAPON_UMP45_BURST
LANG_ENGLISH        "UMP45 (Burst)"

REFERENCE           WEAPON_FN2000
LANG_ENGLISH        "F2000"

REFERENCE           WEAPON_FN2000_REDDOT
LANG_ENGLISH        "F2000 Red Dot Sight"

REFERENCE           WEAPON_FN2000_SCOPE
LANG_ENGLISH        "F2000 Scope"

REFERENCE           WEAPON_FN2000_SHOTGUN
LANG_ENGLISH        "F2000 w/ Shotgun"

REFERENCE           WEAPON_FN2000_ACOG
LANG_ENGLISH        "F2000 ACOG Sight"

REFERENCE           WEAPON_FN2000_THERMAL
LANG_ENGLISH        "F2000 Thermal Sight"

REFERENCE           WEAPON_FN2000_SILENCER
LANG_ENGLISH        "F2000 Silenced"

REFERENCE           WEAPON_FN2000_GL
LANG_ENGLISH        "F2000 Grenade Launcher"

REFERENCE           WEAPON_ANACONDA
LANG_ENGLISH        ".44 Magnum"

REFERENCE           WEAPON_M79
LANG_ENGLISH        "Thumper"

REFERENCE           WEAPON_BARRETT_USE
LANG_ENGLISH        "Press and hold^3 &&1 ^7to use the M82 .50 Caliber Sniper Rifle"

REFERENCE           WEAPON_PRESS_FORWARDS_OR_BACKWARDS
LANG_ENGLISH        "Press forward to zoom"

REFERENCE           WEAPON_STRIKER
LANG_ENGLISH        "Striker"

REFERENCE           WEAPON_CHEYTAC
LANG_ENGLISH        "Intervention"

REFERENCE           WEAPON_M4M203_MOTION_TRACKER
LANG_ENGLISH        "M4 Carbine Heartbeat Sensor"

REFERENCE           WEAPON_ANACONDA_SILENCER
LANG_ENGLISH        ".44 Magnum Silenced"

REFERENCE           WEAPON_UMP45_ACOG
LANG_ENGLISH        "UMP45 ACOG Sight"

REFERENCE           WEAPON_UMP45_REDDOT
LANG_ENGLISH        "UMP45 Red Dot Sight"

REFERENCE           WEAPON_UMP45_SILENCER
LANG_ENGLISH        "UMP45 Silenced"

REFERENCE           WEAPON_KRISS_SILENCER
LANG_ENGLISH        "Vector Silenced"

REFERENCE           WEAPON_KRISS_REDDOT
LANG_ENGLISH        "Vector Red Dot Sight"

REFERENCE           WEAPON_STRIKER_GRIP
LANG_ENGLISH        "Striker Foregrip"

REFERENCE           WEAPON_STRIKER_REFLEX
LANG_ENGLISH        "Striker Red Dot Sight"

REFERENCE           WEAPON_STRIKER_REDDOT
LANG_ENGLISH        "Striker Red Dot Sight"

REFERENCE           WEAPON_STRIKER_EOTECH
LANG_ENGLISH        "Striker Holographic"

REFERENCE           WEAPON_CHEYTAC_ACOG
LANG_ENGLISH        "Intervention ACOG Sight"

REFERENCE           WEAPON_CHEYTAC_THERMAL
LANG_ENGLISH        "Intervention Thermal Sight"

REFERENCE           WEAPON_CHEYTAC_SILENCER
LANG_ENGLISH        "Intervention Silenced"

REFERENCE           WEAPON_MASADA
LANG_ENGLISH        "ACR"

REFERENCE           WEAPON_MASADA_GL_ACOG
LANG_ENGLISH        "ACR Grenadier ACOG Sight"

REFERENCE           WEAPON_MASADA_ACOG
LANG_ENGLISH        "ACR ACOG Sight"

REFERENCE           WEAPON_MASADA_THERMAL
LANG_ENGLISH        "ACR Thermal Sight"

REFERENCE           WEAPON_MASADA_SILENCER
LANG_ENGLISH        "ACR Silenced"

REFERENCE           WEAPON_MASADA_REDDOT
LANG_ENGLISH        "ACR Red Dot Sight"

REFERENCE           WEAPON_MASADA_SILENCER_OFF
LANG_ENGLISH        "Silenced ACR with Heartbeat Sensor"

REFERENCE           WEAPON_MASADA_SILENCER_ON
LANG_ENGLISH        "Silenced ACR with Heartbeat Sensor"

REFERENCE           WEAPON_MASADA_HEARTBEAT
LANG_ENGLISH        "ACR Heartbeat Sensor"

REFERENCE           WEAPON_ICE_AXE
LANG_ENGLISH        "Ice Picks"

REFERENCE           WEAPON_AA12SP
LANG_ENGLISH        "AA-12 Shotgun"

REFERENCE           WEAPON_AA12SP_EOTECH
LANG_ENGLISH        "AA-12 Shotgun Holographic"

REFERENCE           WEAPON_AA12SP_HB
LANG_ENGLISH        "AA-12 Shotgun w/ Heartbeat Sensor"

REFERENCE           WEAPON_AA12SP_HB_SILENCER
LANG_ENGLISH        "AA-12 Shotgun Heartbeat & Silenced"

REFERENCE           WEAPON_AA12SP_REDDOT
LANG_ENGLISH        "AA-12 Shotgun Red Dot Sight"

REFERENCE           WEAPON_AA12SP_SILENCER
LANG_ENGLISH        "AA-12 Shotgun Silenced"

REFERENCE           WEAPON_AA12
LANG_ENGLISH        "AA-12"

REFERENCE           WEAPON_CLAYMORE_PICKUP
LANG_ENGLISH        "Press and hold^3 &&1 ^7to pickup Claymore Mines"

REFERENCE           WEAPON_CACHE_USE_HINT
LANG_ENGLISH        "Press ^3 &&1 ^7to refill your ammo"

REFERENCE           WEAPON_FAMAS
LANG_ENGLISH        "FAMAS"

REFERENCE           WEAPON_FAMAS_ACOG
LANG_ENGLISH        "FAMAS ACOG Sight"

REFERENCE           WEAPON_FAMAS_SILENCER
LANG_ENGLISH        "FAMAS Silenced"

REFERENCE           WEAPON_FAMAS_REDDOT
LANG_ENGLISH        "FAMAS Red Dot Sight"

REFERENCE           WEAPON_FAMAS_SHOTGUN
LANG_ENGLISH        "FAMAS w/ Shotgun"

REFERENCE           WEAPON_GLOCK
LANG_ENGLISH        "G18"

REFERENCE           WEAPON_SCAR
LANG_ENGLISH        "SCAR-H"

REFERENCE           WEAPON_SCAR_SILENCER
LANG_ENGLISH        "SCAR-H Silenced"

REFERENCE           WEAPON_SCAR_REFLEX_SHOTGUN
LANG_ENGLISH        "SCAR-H Red Dot Sight w/ Shotgun"

REFERENCE           WEAPON_SCAR_REFLEX
LANG_ENGLISH        "SCAR-H Red Dot Sight"

REFERENCE           WEAPON_SCAR_REDDOT
LANG_ENGLISH        "SCAR-H Red Dot Sight"

REFERENCE           WEAPON_SCAR_THERMAL
LANG_ENGLISH        "SCAR-H Thermal Sight"

REFERENCE           WEAPON_SCAR_THERMAL_SILENCER
LANG_ENGLISH        "SCAR-H Silenced Thermal Sight"

REFERENCE           WEAPON_SCAR_ACOG
LANG_ENGLISH        "SCAR-H ACOG Sight"

REFERENCE           WEAPON_SCAR_EOTECH
LANG_ENGLISH        "SCAR-H Holographic"

REFERENCE           WEAPON_SCAR_GL
LANG_ENGLISH        "SCAR-H Grenade Launcher"

REFERENCE           WEAPON_SCAR_HEARTBEAT
LANG_ENGLISH        "SCAR-H Heartbeat Sensor"

REFERENCE           WEAPON_SCAR_SHOTGUN
LANG_ENGLISH        "SCAR-H w/ Shotgun"

REFERENCE           WEAPON_SCAR_BLING
LANG_ENGLISH        "SCAR-H Bling"

REFERENCE           WEAPON_SCAR_ROF
LANG_ENGLISH        "SCAR-H Rapid Fire"

REFERENCE           WEAPON_SCAR_XMAGS
LANG_ENGLISH        "SCAR-H Extended Mags"

REFERENCE           WEAPON_SCAR_FMJ
LANG_ENGLISH        "SCAR-H FMJ"

REFERENCE           WEAPON_SCAR_GRIP
LANG_ENGLISH        "SCAR-H Foregrip"

REFERENCE           WEAPON_FAL_ACOG
LANG_ENGLISH        "FAL ACOG Sight"

REFERENCE           WEAPON_FAL_REDDOT
LANG_ENGLISH        "FAL Red Dot Sight"

REFERENCE           WEAPON_FAL_SHOTGUN
LANG_ENGLISH        "FAL w/ Shotgun"

REFERENCE           WEAPON_SA80
LANG_ENGLISH        "L86 LSW"

REFERENCE           WEAPON_SA80_SCOPE
LANG_ENGLISH        "L86 LSW Scoped"

REFERENCE           WEAPON_TAVOR
LANG_ENGLISH        "TAR-21"

REFERENCE           WEAPON_TAVOR_EOTECH
LANG_ENGLISH        "TAR-21 Holographic"

REFERENCE           WEAPON_TAVOR_ACOG
LANG_ENGLISH        "TAR-21 ACOG Sight"

REFERENCE           WEAPON_TAVOR_THERMAL
LANG_ENGLISH        "TAR-21 Thermal Sight"

REFERENCE           WEAPON_TMP_AKIMBO
LANG_ENGLISH        "TMP Akimbo"

REFERENCE           WEAPON_PP2000
LANG_ENGLISH        "PP2000"

REFERENCE           WEAPON_PP2000_SILENCER
LANG_ENGLISH        "PP2000 Silenced"

REFERENCE           WEAPON_PP2000_REDDOT
LANG_ENGLISH        "PP2000 Red Dot Sight"

REFERENCE           WEAPON_PP2000_THERMAL
LANG_ENGLISH        "PP2000 Thermal Sight"

REFERENCE           WEAPON_RIOTSHIELD
LANG_ENGLISH        "Riot Shield"

REFERENCE           WEAPON_MODEL1887
LANG_ENGLISH        "Model 1887"

REFERENCE           WEAPON_AIRDROP_MARKER
LANG_ENGLISH        "Care Package Marker"

REFERENCE           WEAPON_FRAG_GRENADE
LANG_ENGLISH        "Frag Grenade"

REFERENCE           WEAPON_MG4
LANG_ENGLISH        "MG4"

REFERENCE           WEAPON_G36_LMG
LANG_ENGLISH        "G36 LMG"

REFERENCE           WEAPON_AUG_HBAR
LANG_ENGLISH        "AUG HBAR"

REFERENCE           WEAPON_AUG_SCOPE
LANG_ENGLISH        "AUG HBAR Scoped"

REFERENCE           WEAPON_AUG_REFLEX
LANG_ENGLISH        "AUG HBAR Red Dot Sight"

REFERENCE           WEAPON_AUG_SILENCER
LANG_ENGLISH        "AUG HBAR Silenced"

REFERENCE           WEAPON_AUG
LANG_ENGLISH        "AUG HBAR"

REFERENCE           WEAPON_AUG_BLING
LANG_ENGLISH        "AUG HBAR Bling"

REFERENCE           WEAPON_FAMAS_THERMAL
LANG_ENGLISH        "FAMAS Thermal Sight"

REFERENCE           WEAPON_TAVOR_SILENCER
LANG_ENGLISH        "TAR-21 Silenced"

REFERENCE           WEAPON_KRISS_GRIP
LANG_ENGLISH        "Vector Foregrip"

REFERENCE           WEAPON_TMP
LANG_ENGLISH        "TMP"

REFERENCE           WEAPON_TMP_REDDOT
LANG_ENGLISH        "TMP Red Dot Sight"

REFERENCE           WEAPON_FAL
LANG_ENGLISH        "FAL"

REFERENCE           WEAPON_M14EBR
LANG_ENGLISH        "M14 EBR"

REFERENCE           WEAPON_M14EBR_SCOPED
LANG_ENGLISH        "M14 EBR Scoped"

REFERENCE           WEAPON_M14EBR_THERMAL
LANG_ENGLISH        "M14 EBR Thermal"

REFERENCE           WEAPON_M14EBR_SCOPED_SILENCED
LANG_ENGLISH        "M14 EBR Scoped Silenced"

REFERENCE           WEAPON_WA2000
LANG_ENGLISH        "WA2000"

REFERENCE           WEAPON_WA2000_HEARTBEAT
LANG_ENGLISH        "WA2000 Heartbeat"

REFERENCE           WEAPON_WA2000_THERMAL
LANG_ENGLISH        "WA2000 Thermal Sight"

REFERENCE           WEAPON_SEMTEX
LANG_ENGLISH        "SEMTEX"

REFERENCE           WEAPON_BERETTA393
LANG_ENGLISH        "M93 Raffica"

REFERENCE           WEAPON_M4_CARBINE_FMJ
LANG_ENGLISH        "M4A1 FMJ"

REFERENCE           WEAPON_M4_CARBINE_XMAGS
LANG_ENGLISH        "M4A1 Extended Mags"

REFERENCE           WEAPON_M4_CARBINE_ROF
LANG_ENGLISH        "M4A1 Rapid Fire"

REFERENCE           WEAPON_FN2000_FMJ
LANG_ENGLISH        "F2000 FMJ"

REFERENCE           WEAPON_FN2000_ROF
LANG_ENGLISH        "F2000 Rapid Fire"

REFERENCE           WEAPON_FN2000_XMAGS
LANG_ENGLISH        "F2000 Extended Mags"

REFERENCE           WEAPON_MASADA_XMAGS
LANG_ENGLISH        "ACR Extended Mags"

REFERENCE           WEAPON_MASADA_GL_EOTECH
LANG_ENGLISH        "ACR Grenadier Holographic"

REFERENCE           WEAPON_MASADA_FMJ
LANG_ENGLISH        "ACR FMJ"

REFERENCE           WEAPON_MASADA_SHOTGUN
LANG_ENGLISH        "ACR w/ Shotgun"

REFERENCE           WEAPON_M16_FMJ
LANG_ENGLISH        "M16A4 FMJ"

REFERENCE           WEAPON_M16_ROF
LANG_ENGLISH        "M16A4 Rapid Fire"

REFERENCE           WEAPON_M16_XMAGS
LANG_ENGLISH        "M16A4 Extended Mags"

REFERENCE           WEAPON_TAVOR_REDDOT
LANG_ENGLISH        "TAR-21 Red Dot Sight"

REFERENCE           WEAPON_TAVOR_MARS
LANG_ENGLISH        "TAR-21 Mars Sight"

REFERENCE           WEAPON_TAVOR_FMJ
LANG_ENGLISH        "TAR-21 FMJ"

REFERENCE           WEAPON_TAVOR_ROF
LANG_ENGLISH        "TAR-21 Rapid Fire"

REFERENCE           WEAPON_TAVOR_XMAGS
LANG_ENGLISH        "TAR-21 Extended Mags"

REFERENCE           WEAPON_TAVOR_HEARTBEAT
LANG_ENGLISH        "TAR-21 Heartbeat Sensor"

REFERENCE           WEAPON_FAMAS_FMJ
LANG_ENGLISH        "FAMAS FMJ"

REFERENCE           WEAPON_FAMAS_ROF
LANG_ENGLISH        "FAMAS Rapid Fire"

REFERENCE           WEAPON_FAMAS_XMAGS
LANG_ENGLISH        "FAMAS Extended Mags"

REFERENCE           WEAPON_FAL_FMJ
LANG_ENGLISH        "FAL FMJ"

REFERENCE           WEAPON_FAL_ROF
LANG_ENGLISH        "FAL Rapid Fire"

REFERENCE           WEAPON_FAL_XMAGS
LANG_ENGLISH        "FAL Extended Mags"

REFERENCE           WEAPON_SA80_ACOG
LANG_ENGLISH        "L86 LSW ACOG Sight"

REFERENCE           WEAPON_SA80_GRIP
LANG_ENGLISH        "L86 LSW Foregrip"

REFERENCE           WEAPON_SA80_SILENCER
LANG_ENGLISH        "L86 LSW Silenced"

REFERENCE           WEAPON_SA80_FMJ
LANG_ENGLISH        "L86 LSW FMJ"

REFERENCE           WEAPON_SA80_ROF
LANG_ENGLISH        "L86 LSW Rapid Fire"

REFERENCE           WEAPON_SA80_XMAGS
LANG_ENGLISH        "L86 LSW Extended Mags"

REFERENCE           WEAPON_RPD_FMJ
LANG_ENGLISH        "RPD FMJ"

REFERENCE           WEAPON_RPD_ROF
LANG_ENGLISH        "RPD Rapid Fire"

REFERENCE           WEAPON_RPD_XMAGS
LANG_ENGLISH        "RPD Extended Mags"

REFERENCE           WEAPON_PP2000_AKIMBO
LANG_ENGLISH        "PP-2000 Akimbo"

REFERENCE           WEAPON_PP2000_FMJ
LANG_ENGLISH        "PP2000 FMJ"

REFERENCE           WEAPON_PP2000_ROF
LANG_ENGLISH        "PP2000 Rapid Fire"

REFERENCE           WEAPON_PP2000_XMAGS
LANG_ENGLISH        "PP2000 Extended Mags"

REFERENCE           WEAPON_PP2000_EOTECH
LANG_ENGLISH        "PP2000 Holographic"

REFERENCE           WEAPON_KRISS_FMJ
LANG_ENGLISH        "Vector FMJ"

REFERENCE           WEAPON_KRISS_ROF
LANG_ENGLISH        "Vector Rapid Fire"

REFERENCE           WEAPON_KRISS_XMAGS
LANG_ENGLISH        "Vector Extended Mags"

REFERENCE           WEAPON_MP5K_FMJ
LANG_ENGLISH        "MP5K FMJ"

REFERENCE           WEAPON_MP5K_ROF
LANG_ENGLISH        "MP5K Rapid Fire"

REFERENCE           WEAPON_MP5K_XMAGS
LANG_ENGLISH        "MP5K Extended Mags"

REFERENCE           WEAPON_MP5K
LANG_ENGLISH        "MP5K"

REFERENCE           WEAPON_MP5K_SILENCER
LANG_ENGLISH        "MP5K Silenced"

REFERENCE           WEAPON_MP5K_REDDOT
LANG_ENGLISH        "MP5K Red Dot Sight"

REFERENCE           WEAPON_MP5K_GRIP
LANG_ENGLISH        "MP5K Foregrip"

REFERENCE           WEAPON_P90_FMJ
LANG_ENGLISH        "P90 FMJ"

REFERENCE           WEAPON_P90_ROF
LANG_ENGLISH        "P90 Rapid Fire"

REFERENCE           WEAPON_P90_XMAGS
LANG_ENGLISH        "P90 Extended Mags"

REFERENCE           WEAPON_P90_HEARTBEAT
LANG_ENGLISH        "P90 Heartbeat"

REFERENCE           WEAPON_TMP_SILENCER
LANG_ENGLISH        "TMP Silenced"

REFERENCE           WEAPON_TMP_FMJ
LANG_ENGLISH        "TMP FMJ"

REFERENCE           WEAPON_TMP_ROF
LANG_ENGLISH        "TMP Rapid Fire"

REFERENCE           WEAPON_TMP_XMAGS
LANG_ENGLISH        "TMP Extended Mags"

REFERENCE           WEAPON_TMP_EOTECH
LANG_ENGLISH        "TMP Holographic"

REFERENCE           WEAPON_UMP45_FMJ
LANG_ENGLISH        "UMP45 FMJ"

REFERENCE           WEAPON_UMP45_ROF
LANG_ENGLISH        "UMP45 Rapid Fire"

REFERENCE           WEAPON_UMP45_XMAGS
LANG_ENGLISH        "UMP45 Extended Mags"

REFERENCE           WEAPON_UZI_FMJ
LANG_ENGLISH        "Mini-Uzi FMJ"

REFERENCE           WEAPON_UZI_ROF
LANG_ENGLISH        "Mini-Uzi Rapid Fire"

REFERENCE           WEAPON_UZI_XMAGS
LANG_ENGLISH        "Mini-Uzi Extended Mags"

REFERENCE           WEAPON_UMP45_HEARTBEAT
LANG_ENGLISH        "UMP45 Heartbeat"

REFERENCE           WEAPON_STRIKER_SILENCER
LANG_ENGLISH        "Striker Silenced"

REFERENCE           WEAPON_AA12_HB
LANG_ENGLISH        "AA-12 Heartbeat Sensor"

REFERENCE           WEAPON_AA12_EOTECH
LANG_ENGLISH        "AA-12 Holographic"

REFERENCE           WEAPON_AA12_REDDOT
LANG_ENGLISH        "AA-12 Red Dot Sight"

REFERENCE           WEAPON_AA12_GRIP
LANG_ENGLISH        "AA-12 Foregrip"

REFERENCE           WEAPON_AA12_SILENCER
LANG_ENGLISH        "AA-12 Silenced"

REFERENCE           WEAPON_BENELLI_SILENCER
LANG_ENGLISH        "M1014 Silenced"

REFERENCE           WEAPON_MODEL1887_AKIMBO
LANG_ENGLISH        "Model 1887 Akimbo"

REFERENCE           WEAPON_RANGER_AKIMBO
LANG_ENGLISH        "Ranger Akimbo"

REFERENCE           WEAPON_ANACONDA_AKIMBO
LANG_ENGLISH        ".44 Magnum Akimbo"

REFERENCE           WEAPON_ANACONDA_FMJ
LANG_ENGLISH        ".44 Magnum FMJ"

REFERENCE           WEAPON_ANACONDA_XMAGS
LANG_ENGLISH        ".44 Magnum Extended Mags"

REFERENCE           WEAPON_GLOCK_SILENCER
LANG_ENGLISH        "G18 Silenced"

REFERENCE           WEAPON_GLOCK_FMJ
LANG_ENGLISH        "G18 FMJ"

REFERENCE           WEAPON_GLOCK_XMAGS
LANG_ENGLISH        "G18 Extended Mags"

REFERENCE           WEAPON_BERETTA393_SILENCER
LANG_ENGLISH        "M93 Raffica Silenced"

REFERENCE           WEAPON_BERETTA393_FMJ
LANG_ENGLISH        "M93 Raffica FMJ"

REFERENCE           WEAPON_BERETTA393_XMAGS
LANG_ENGLISH        "M93 Raffica Extended Mags"

REFERENCE           WEAPON_DESERTEAGLE_AKIMBO
LANG_ENGLISH        "Desert Eagle Akimbo"

REFERENCE           WEAPON_DESERTEAGLE_FMJ
LANG_ENGLISH        "Desert Eagle FMJ"

REFERENCE           WEAPON_DESERTEAGLE_XMAGS
LANG_ENGLISH        "Desert Eagle Extended Mags"

REFERENCE           WEAPON_RANGER_FMJ
LANG_ENGLISH        "Ranger FMJ"

REFERENCE           WEAPON_STRIKER_FMJ
LANG_ENGLISH        "Striker FMJ"

REFERENCE           WEAPON_BENELLI_FMJ
LANG_ENGLISH        "M1014 FMJ"

REFERENCE           WEAPON_BENELLI_XMAGS
LANG_ENGLISH        "M1014 Extended Mags"

REFERENCE           WEAPON_MODEL1887_FMJ
LANG_ENGLISH        "Model 1887 FMJ"

REFERENCE           WEAPON_MODEL1887_XMAGS
LANG_ENGLISH        "Model 1887 Extended Mags"

REFERENCE           WEAPON_AA12_FMJ
LANG_ENGLISH        "AA-12 FMJ"

REFERENCE           WEAPON_AA12_XMAGS
LANG_ENGLISH        "AA-12 Extended Mags"

REFERENCE           WEAPON_RPG_BOOM
LANG_ENGLISH        "RPG-7 Sonic Boom"

REFERENCE           WEAPON_RPG_LOCKAIR
LANG_ENGLISH        "RPG-7 Lock-on"

REFERENCE           WEAPON_STINGER_LOCKAIR
LANG_ENGLISH        "Stinger Lock-on"

REFERENCE           WEAPON_STINGER_BOOM
LANG_ENGLISH        "Stinger Sonic Boom"

REFERENCE           WEAPON_AT4_BOOM
LANG_ENGLISH        "AT4 Sonic Boom"

REFERENCE           WEAPON_AT4_LOCKAIR
LANG_ENGLISH        "AT4-HS"

REFERENCE           WEAPON_JAVELIN_BOOM
LANG_ENGLISH        "Javelin Sonic Boom"

REFERENCE           WEAPON_JAVELIN_LOCKAIR
LANG_ENGLISH        "Javelin Lock-on"

REFERENCE           WEAPON_M79_BOOM
LANG_ENGLISH        "Thumper Sonic Boom"

REFERENCE           WEAPON_BARRETT_HEARTBEAT
LANG_ENGLISH        "Barrett .50cal Heartbeat"

REFERENCE           WEAPON_BARRETT_FMJ
LANG_ENGLISH        "Barrett .50cal FMJ"

REFERENCE           WEAPON_BARRETT_XMAGS
LANG_ENGLISH        "Barrett .50cal Extended Mags"

REFERENCE           WEAPON_M21_FMJ
LANG_ENGLISH        "M21 EBR FMJ"

REFERENCE           WEAPON_M21_THERMAL
LANG_ENGLISH        "M21 EBR Thermal"

REFERENCE           WEAPON_M21_XMAGS
LANG_ENGLISH        "M21 EBR Extended Mags"

REFERENCE           WEAPON_CHEYTAC_BLING
LANG_ENGLISH        "Intervention Bling"

REFERENCE           WEAPON_M21_BLING
LANG_ENGLISH        "M21 EBR Bling"

REFERENCE           WEAPON_BARRETT_BLING
LANG_ENGLISH        "Barrett .50cal Bling"

REFERENCE           WEAPON_FN2000_BLING
LANG_ENGLISH        "F2000 Bling"

REFERENCE           WEAPON_MASADA_BLING
LANG_ENGLISH        "ACR Bling"

REFERENCE           WEAPON_AK47_BLING
LANG_ENGLISH        "AK-47 Bling"

REFERENCE           WEAPON_M4_CARBINE_BLING
LANG_ENGLISH        "M4A1 Bling"

REFERENCE           WEAPON_FAL_BLING
LANG_ENGLISH        "FAL Bling"

REFERENCE           WEAPON_FAMAS_BLING
LANG_ENGLISH        "FAMAS Bling"

REFERENCE           WEAPON_TAVOR_BLING
LANG_ENGLISH        "TAR-21 Bling"

REFERENCE           WEAPON_M16_BLING
LANG_ENGLISH        "M16A4 Bling"

REFERENCE           WEAPON_RPD_BLING
LANG_ENGLISH        "RPD Bling"

REFERENCE           WEAPON_SA80_BLING
LANG_ENGLISH        "L86 LSW Bling"

REFERENCE           WEAPON_PP2000_BLING
LANG_ENGLISH        "PP2000 Bling"

REFERENCE           WEAPON_TMP_BLING
LANG_ENGLISH        "TMP Bling"

REFERENCE           WEAPON_P90_BLING
LANG_ENGLISH        "P90 Bling"

REFERENCE           WEAPON_UZI_BLING
LANG_ENGLISH        "Mini-Uzi Bling"

REFERENCE           WEAPON_KRISS_BLING
LANG_ENGLISH        "Vector Bling"

REFERENCE           WEAPON_UMP45_BLING
LANG_ENGLISH        "UMP45 Bling"

REFERENCE           WEAPON_RANGER_BLING
LANG_ENGLISH        "Ranger Bling"

REFERENCE           WEAPON_STRIKER_BLING
LANG_ENGLISH        "Striker Bling"

REFERENCE           WEAPON_BENELLI_BLING
LANG_ENGLISH        "M1014 Bling"

REFERENCE           WEAPON_MODEL1887_BLING
LANG_ENGLISH        "Model 1887 Bling"

REFERENCE           WEAPON_AA12_BLING
LANG_ENGLISH        "AA-12 Bling"

REFERENCE           WEAPON_ANACONDA_BLING
LANG_ENGLISH        ".44 Magnum Bling"

REFERENCE           WEAPON_GLOCK_BLING
LANG_ENGLISH        "G18 Bling"

REFERENCE           WEAPON_BERETTA393_BLING
LANG_ENGLISH        "M93 Raffica Bling"

REFERENCE           WEAPON_DESERTEAGLE_BLING
LANG_ENGLISH        "Desert Eagle Bling"

REFERENCE           WEAPON_RPG_BLING
LANG_ENGLISH        "RPG-7 Bling"

REFERENCE           WEAPON_AT4_BLING
LANG_ENGLISH        "AT4 Bling"

REFERENCE           WEAPON_STINGER_BLING
LANG_ENGLISH        "Stinger Bling"

REFERENCE           WEAPON_JAVELIN_BLING
LANG_ENGLISH        "Javelin Bling"

REFERENCE           WEAPON_M79_BLING
LANG_ENGLISH        "Thumper Bling"

REFERENCE           WEAPON_MG4_GRIP
LANG_ENGLISH        "MG4 Foregrip"

REFERENCE           WEAPON_MG4_REFLEX
LANG_ENGLISH        "MG4 Red Dot Sight"

REFERENCE           WEAPON_MG4_ACOG
LANG_ENGLISH        "MG4 ACOG Sight"

REFERENCE           WEAPON_MG4_THERMAL
LANG_ENGLISH        "MG4 Thermal Sight"

REFERENCE           WEAPON_MG4_XMAGS
LANG_ENGLISH        "MG4 Extended Mags"

REFERENCE           WEAPON_MG4_FMJ
LANG_ENGLISH        "MG4 Explosive Rounds"

REFERENCE           WEAPON_MG4_ROF
LANG_ENGLISH        "MG4 Rapid Fire"

REFERENCE           WEAPON_MP5K_BLING
LANG_ENGLISH        "MP5K Bling"

REFERENCE           WEAPON_AK47_XMAGS
LANG_ENGLISH        "AK-47 Extended Mags"

REFERENCE           WEAPON_AK47_ROF
LANG_ENGLISH        "AK-47 Rapid Fire"

REFERENCE           WEAPON_ONE_MAN_ARMY
LANG_ENGLISH        "One Man Army"

REFERENCE           WEAPON_AK47_EOTECH
LANG_ENGLISH        "AK-47 Holographic"

REFERENCE           WEAPON_AK47_THERMAL
LANG_ENGLISH        "AK-47 Thermal Sight"

REFERENCE           WEAPON_AK47_HEARTBEAT
LANG_ENGLISH        "AK-47 Heartbeat Sensor"

REFERENCE           WEAPON_FN2000_EOTECH
LANG_ENGLISH        "F2000 Holographic"

REFERENCE           WEAPON_FN2000_HEARTBEAT
LANG_ENGLISH        "F2000 Heartbeat Sensor"

REFERENCE           WEAPON_MASADA_EOTECH
LANG_ENGLISH        "ACR Holographic"

REFERENCE           WEAPON_MASADA_GL
LANG_ENGLISH        "ACR Grenade Launcher"

REFERENCE           WEAPON_M4_CARBINE_EOTECH
LANG_ENGLISH        "M4A1 Holographic"

REFERENCE           WEAPON_M4_CARBINE_HEARTBEAT
LANG_ENGLISH        "M4A1 Heartbeat Sensor"

REFERENCE           WEAPON_M4_CARBINE_SHOTGUN
LANG_ENGLISH        "M4A1 w/ Shotgun"

REFERENCE           WEAPON_M4_CARBINE_THERMAL
LANG_ENGLISH        "M4A1 Thermal Sight"

REFERENCE           WEAPON_FAL_EOTECH
LANG_ENGLISH        "FAL Holographic"

REFERENCE           WEAPON_FAL_GL
LANG_ENGLISH        "FAL Grenade Laucher"

REFERENCE           WEAPON_FAL_HEARTBEAT
LANG_ENGLISH        "FAL Heartbeat Sensor"

REFERENCE           WEAPON_FAL_SILENCER
LANG_ENGLISH        "FAL Silenced"

REFERENCE           WEAPON_FAL_THERMAL
LANG_ENGLISH        "FAL Thermal Sight"

REFERENCE           WEAPON_FAMAS_EOTECH
LANG_ENGLISH        "FAMAS Holographic"

REFERENCE           WEAPON_FAMAS_GL
LANG_ENGLISH        "FAMAS Grenade Launcher"

REFERENCE           WEAPON_FAMAS_HEARTBEAT
LANG_ENGLISH        "FAMAS Heartbeat Sensor"

REFERENCE           WEAPON_TAVOR_GL
LANG_ENGLISH        "TAR-21 Grenade Launcher"

REFERENCE           WEAPON_TAVOR_SHOTGUN
LANG_ENGLISH        "TAR-21 w/ Shotgun"

REFERENCE           WEAPON_M16_EOTECH
LANG_ENGLISH        "M16A4 Holographic"

REFERENCE           WEAPON_M16_HEARTBEAT
LANG_ENGLISH        "M16A4 Heartbeat Sensor"

REFERENCE           WEAPON_M16_SHOTGUN
LANG_ENGLISH        "M16A4 w/ Shotgun"

REFERENCE           WEAPON_M16_THERMAL
LANG_ENGLISH        "M16A4 Thermal Sight"

REFERENCE           WEAPON_P90_AKIMBO
LANG_ENGLISH        "P90 Akimbo"

REFERENCE           WEAPON_P90_EOTECH
LANG_ENGLISH        "P90 Holographic"

REFERENCE           WEAPON_P90_THERMAL
LANG_ENGLISH        "P90 Thermal Sight"

REFERENCE           WEAPON_UZI_AKIMBO
LANG_ENGLISH        "Mini-Uzi Akimbo"

REFERENCE           WEAPON_UZI_EOTECH
LANG_ENGLISH        "Mini-Uzi Holographic"

REFERENCE           WEAPON_UZI_THERMAL
LANG_ENGLISH        "Mini-Uzi Thermal Sight"

REFERENCE           WEAPON_MP5K_AKIMBO
LANG_ENGLISH        "MP5K Akimbo"

REFERENCE           WEAPON_MP5K_ACOG
LANG_ENGLISH        "MP5K ACOG Sight"

REFERENCE           WEAPON_MP5K_EOTECH
LANG_ENGLISH        "MP5K Holographic"

REFERENCE           WEAPON_MP5K_THERMAL
LANG_ENGLISH        "MP5K Thermal Sight"

REFERENCE           WEAPON_KRISS_AKIMBO
LANG_ENGLISH        "Vector Akimbo"

REFERENCE           WEAPON_KRISS_EOTECH
LANG_ENGLISH        "Vector Holographic"

REFERENCE           WEAPON_KRISS_THERMAL
LANG_ENGLISH        "Vector Thermal Sight"

REFERENCE           WEAPON_UMP45_AKIMBO
LANG_ENGLISH        "UMP45 Akimbo"

REFERENCE           WEAPON_UMP45_EOTECH
LANG_ENGLISH        "UMP45 Holographic"

REFERENCE           WEAPON_UMP45_THERMAL
LANG_ENGLISH        "UMP45 Thermal Sight"

REFERENCE           WEAPON_SPAS12
LANG_ENGLISH        "SPAS-12"

REFERENCE           WEAPON_SPAS12_BLING
LANG_ENGLISH        "SPAS-12 Bling"

REFERENCE           WEAPON_SPAS12_REDDOT
LANG_ENGLISH        "SPAS-12 Red Dot Sight"

REFERENCE           WEAPON_SPAS12_EOTECH
LANG_ENGLISH        "SPAS-12 Holographic"

REFERENCE           WEAPON_SPAS12_SILENCER
LANG_ENGLISH        "SPAS-12 Silencer"

REFERENCE           WEAPON_SPAS12_HEARTBEAT_SENSOR
LANG_ENGLISH        "SPAS-12 Heartbeat"

REFERENCE           WEAPON_M79_X2
LANG_ENGLISH        "Thumper x 2"

REFERENCE           WEAPON_CAMO
LANG_ENGLISH        "&&1 - Camo"

REFERENCE           WEAPON_UPGRADE
LANG_ENGLISH        "&&1 - &&2"

REFERENCE           WEAPON_AIRDROP_SENTRY_MARKER
LANG_ENGLISH        "Sentry Airdrop Marker"

REFERENCE           WEAPON_AIRDROP_MEGA_MARKER
LANG_ENGLISH        "Emergency Airdrop Marker"

REFERENCE           WEAPON_WA2000_ACOG
LANG_ENGLISH        "WA2000 ACOG Sight"

REFERENCE           WEAPON_WA2000_FMJ
LANG_ENGLISH        "WA2000 FMJ"

REFERENCE           WEAPON_WA2000_SILENCER
LANG_ENGLISH        "WA2000 Silenced"

REFERENCE           WEAPON_WA2000_XMAGS
LANG_ENGLISH        "WA2000 Extended Mags"

REFERENCE           WEAPON_AUG_EOTECH
LANG_ENGLISH        "AUG HBAR Holographic"

REFERENCE           WEAPON_AUG_ACOG
LANG_ENGLISH        "AUG HBAR ACOG Sight"

REFERENCE           WEAPON_AUG_FMJ
LANG_ENGLISH        "AUG HBAR FMJ"

REFERENCE           WEAPON_AUG_GRIP
LANG_ENGLISH        "AUG HBAR Foregrip"

REFERENCE           WEAPON_AUG_HEARTBEAT
LANG_ENGLISH        "AUG HBAR Heartbeat Sensor"

REFERENCE           WEAPON_AUG_THERMAL
LANG_ENGLISH        "AUG HBAR Thermal Sight"

REFERENCE           WEAPON_AUG_XMAGS
LANG_ENGLISH        "AUG HBAR Extended Mags"

REFERENCE           WEAPON_M240_FMJ
LANG_ENGLISH        "M240 FMJ"

REFERENCE           WEAPON_M240_XMAGS
LANG_ENGLISH        "M240 Extended Mags"

REFERENCE           WEAPON_MG4_HEARTBEAT
LANG_ENGLISH        "MG4 Heartbeat Sensor"

REFERENCE           WEAPON_SA80_EOTECH
LANG_ENGLISH        "L86 LSW Holographic"

REFERENCE           WEAPON_SA80_REDDOT
LANG_ENGLISH        "L86 LSW Red Dot Sight"

REFERENCE           WEAPON_SA80_THERMAL
LANG_ENGLISH        "L86 LSW Thermal Sight"

REFERENCE           WEAPON_BERETTA_AKIMBO
LANG_ENGLISH        "M9 Akimbo"

REFERENCE           WEAPON_BERETTA_FMJ
LANG_ENGLISH        "M9 FMJ"

REFERENCE           WEAPON_BERETTA_TACTICAL
LANG_ENGLISH        "M9 Tactical Knife"

REFERENCE           WEAPON_BERETTA_XMAGS
LANG_ENGLISH        "M9 Extended Mags"

REFERENCE           WEAPON_BERETTA393_AKIMBO
LANG_ENGLISH        "M93 Raffica Akimbo"

REFERENCE           WEAPON_BERETTA_BLING
LANG_ENGLISH        "M9 Bling"

REFERENCE           WEAPON_BERETTA393_EOTECH
LANG_ENGLISH        "M93 Raffica Holographic"

REFERENCE           WEAPON_BERETTA393_REDDOT
LANG_ENGLISH        "M93 Raffica Red Dot Sight"

REFERENCE           WEAPON_ANACONDA_TACTICAL
LANG_ENGLISH        ".44 Magnum Tactical Knife"

REFERENCE           WEAPON_DESERTEAGLE_TACTICAL
LANG_ENGLISH        "Desert Eagle Tactical Knife"

REFERENCE           WEAPON_GLOCK_AKIMBO
LANG_ENGLISH        "G18 Akimbo"

REFERENCE           WEAPON_GLOCK_EOTECH
LANG_ENGLISH        "G18 Holographic"

REFERENCE           WEAPON_GLOCK_REDDOT
LANG_ENGLISH        "G18 Red Dot Sight"

REFERENCE           WEAPON_USP_AKIMBO
LANG_ENGLISH        "USP .45 Akimbo"

REFERENCE           WEAPON_USP_FMJ
LANG_ENGLISH        "USP .45 FMJ"

REFERENCE           WEAPON_USP_TACTICAL
LANG_ENGLISH        "USP .45 Tactical Knife"

REFERENCE           WEAPON_USP_BLING
LANG_ENGLISH        "USP .45 Bling"

REFERENCE           WEAPON_USP_XMAGS
LANG_ENGLISH        "USP .45 Extended Mags"

REFERENCE           WEAPON_BENELLI_EOTECH
LANG_ENGLISH        "M1014 Holographic"

REFERENCE           WEAPON_SPAS12_FMJ
LANG_ENGLISH        "SPAS-12 FMJ"

REFERENCE           WEAPON_SPAS12_GRIP
LANG_ENGLISH        "SPAS-12 Foregrip"

REFERENCE           WEAPON_SPAS12_XMAGS
LANG_ENGLISH        "SPAS-12 Extended Mags"

REFERENCE           WEAPON_STRIKER_XMAGS
LANG_ENGLISH        "Striker Extended Mags"

REFERENCE           WEAPON_BARRETT_SILENCER
LANG_ENGLISH        "Barrett .50cal Silenced"

REFERENCE           WEAPON_CHEYTAC_HEARTBEAT
LANG_ENGLISH        "Intervention Heartbeat Sensor"

REFERENCE           WEAPON_M21_HEARTBEAT
LANG_ENGLISH        "M21 EBR Heartbeat Sensor"

REFERENCE           WEAPON_BARRETT_THERMAL
LANG_ENGLISH        "Barrett .50cal Thermal Sight"

REFERENCE           WEAPON_WA2000_BLING
LANG_ENGLISH        "WA2000 Bling"

REFERENCE           WEAPON_CHEYTAC_FMJ
LANG_ENGLISH        "Intervention FMJ"

REFERENCE           WEAPON_CHEYTAC_XMAGS
LANG_ENGLISH        "Intervention Extended Mags"

REFERENCE           WEAPON_RPD_EOTECH
LANG_ENGLISH        "RPD Holographic"

REFERENCE           WEAPON_RPD_HEARTBEAT
LANG_ENGLISH        "RPD Heartbeat Sensor"

REFERENCE           WEAPON_RPD_SILENCER
LANG_ENGLISH        "RPD Silenced"

REFERENCE           WEAPON_RPD_THERMAL
LANG_ENGLISH        "RPD Thermal Sight"

REFERENCE           WEAPON_SA80_HEARTBEAT
LANG_ENGLISH        "L86 LSW Heartbeat Sensor"

REFERENCE           WEAPON_MG4_EOTECH
LANG_ENGLISH        "MG4 Holographic"

REFERENCE           WEAPON_MG4_REDDOT
LANG_ENGLISH        "MG4 Red Dot Sight"

REFERENCE           WEAPON_MG4_SILENCER
LANG_ENGLISH        "MG4 Silenced"

REFERENCE           WEAPON_MG4_BLING
LANG_ENGLISH        "MG4 Bling"

REFERENCE           WEAPON_M240_GRIP
LANG_ENGLISH        "M240 Foregrip"

REFERENCE           WEAPON_FLARE
LANG_ENGLISH        "Tactical Insertion"

REFERENCE           WEAPON_SCAVENGER_BAG
LANG_ENGLISH        "Scavenger"

REFERENCE           WEAPON_AA12_HB_SILENCER
LANG_ENGLISH        "AA-12 Shotgun Heartbeat & Silenced"

REFERENCE           CLASS_CLASS
LANG_ENGLISH        "Class"

REFERENCE           CLASS_CLASS1
LANG_ENGLISH        "Grenadier"

REFERENCE           CLASS_CLASS2
LANG_ENGLISH        "First Recon"

REFERENCE           CLASS_CLASS3
LANG_ENGLISH        "Overwatch"

REFERENCE           CLASS_CLASS4
LANG_ENGLISH        "Scout Sniper"

REFERENCE           CLASS_CLASS5
LANG_ENGLISH        "Riot Control"

REFERENCE           CLASS_DEFAULT_ASSAULT
LANG_ENGLISH        "Default Assault"

REFERENCE           CLASS_DEFAULT_SPECOPS
LANG_ENGLISH        "Default Spec Ops"

REFERENCE           CLASS_DEFAULT_HEAVYGUNNER
LANG_ENGLISH        "Default Heavy Gunner"

REFERENCE           CLASS_DEFAULT_DEMOLITIONS
LANG_ENGLISH        "Default Sniper"

REFERENCE           CLASS_DEFAULT_SNIPER
LANG_ENGLISH        "Default Shield"

REFERENCE           CLASS_MARINES_CLASSES
LANG_ENGLISH        "MARINES CLASSES"

REFERENCE           CLASS_OPFOR_CLASSES
LANG_ENGLISH        "OPPOSITION CLASSES"

REFERENCE           CLASS_SAS_CLASSES
LANG_ENGLISH        "SAS CLASSES"

REFERENCE           CLASS_SPETSNAZ_CLASSES
LANG_ENGLISH        "SPETSNAZ CLASSES"

REFERENCE           CLASS_GRENADIER
LANG_ENGLISH        "Grenadier"

REFERENCE           CLASS_CUSTOM1
LANG_ENGLISH        "My Assault"

REFERENCE           CLASS_CUSTOM2
LANG_ENGLISH        "My Spec Ops"

REFERENCE           CLASS_CUSTOM3
LANG_ENGLISH        "My Heavy Gunner"

REFERENCE           CLASS_CUSTOM5
LANG_ENGLISH        "My Sniper"

REFERENCE           CLASS_CUSTOM4
LANG_ENGLISH        "My Demolitions"

REFERENCE           CLASS_SLOT1
LANG_ENGLISH        "Custom Class 1"

REFERENCE           CLASS_SLOT2
LANG_ENGLISH        "Custom Class 2"

REFERENCE           CLASS_SLOT3
LANG_ENGLISH        "Custom Class 3"

REFERENCE           CLASS_SLOT4
LANG_ENGLISH        "Custom Class 4"

REFERENCE           CLASS_SLOT5
LANG_ENGLISH        "Custom Class 5"

REFERENCE           CLASS_OFFLINE_CLASS1
LANG_ENGLISH        "Grenadier"

REFERENCE           CLASS_OFFLINE_CLASS2
LANG_ENGLISH        "Ghost"

REFERENCE           CLASS_OFFLINE_CLASS3
LANG_ENGLISH        "Survivalist"

REFERENCE           CLASS_OFFLINE_CLASS4
LANG_ENGLISH        "Pointman"

REFERENCE           CLASS_OFFLINE_CLASS5
LANG_ENGLISH        "Marksman"

REFERENCE           CLASS_OFFLINE_CLASS6
LANG_ENGLISH        "Warfighter"

REFERENCE           CLASS_OFFLINE_CLASS7
LANG_ENGLISH        "Close Quarters"

REFERENCE           CLASS_OFFLINE_CLASS8
LANG_ENGLISH        "Overwatch"

REFERENCE           CLASS_OFFLINE_CLASS9
LANG_ENGLISH        "Defender"

REFERENCE           CLASS_OFFLINE_CLASS10
LANG_ENGLISH        "Sharpshooter"

REFERENCE           CLASS_CLASS6
LANG_ENGLISH        "Commando"

REFERENCE           CLASS_CLASS7
LANG_ENGLISH        "First Recon"

REFERENCE           CLASS_CLASS8
LANG_ENGLISH        "Defender"

REFERENCE           CLASS_CLASS9
LANG_ENGLISH        "Sharpshooter"

REFERENCE           CLASS_CLASS10
LANG_ENGLISH        "Crowd Control"

REFERENCE           CLASS_CLASS11
LANG_ENGLISH        "Charger"

REFERENCE           CLASS_NEWREF
LANG_ENGLISH        "New text"

REFERENCE           CLASS_CLASS12
LANG_ENGLISH        "Scout"

REFERENCE           CLASS_CLASS13
LANG_ENGLISH        "Overwatch"

REFERENCE           CLASS_CLASS14
LANG_ENGLISH        "Raider"

REFERENCE           CLASS_CLASS15
LANG_ENGLISH        "Cleaner"

REFERENCE           CLASS_SLOT6
LANG_ENGLISH        "Custom Class 6"

REFERENCE           CLASS_SLOT7
LANG_ENGLISH        "Custom Class 7"

REFERENCE           CLASS_SLOT8
LANG_ENGLISH        "Custom Class 8"

REFERENCE           CLASS_SLOT9
LANG_ENGLISH        "Custom Class 9"

REFERENCE           CLASS_SLOT10
LANG_ENGLISH        "Custom Class 10"

REFERENCE           RANK_NEWRANK
LANG_ENGLISH        "You have achieved a new rank:"

REFERENCE           RANK_PROMOTED
LANG_ENGLISH        "You've been promoted!"

REFERENCE           RANK_PLAYER_WAS_PROMOTED
LANG_ENGLISH        "&&1 was promoted to &&2!"

REFERENCE           RANK_PLAYER_WAS_PROMOTED_N
LANG_ENGLISH        "&&1 was promoted to &&2 &&3!"

REFERENCE           RANK_REC
LANG_ENGLISH        "Rec."

REFERENCE           RANK_REC_FULL
LANG_ENGLISH        "Recruit"

REFERENCE           RANK_PVT
LANG_ENGLISH        "Pvt."

REFERENCE           RANK_PVT_FULL
LANG_ENGLISH        "Private"

REFERENCE           RANK_PFC
LANG_ENGLISH        "PFC."

REFERENCE           RANK_PFC_FULL
LANG_ENGLISH        "Private First Class"

REFERENCE           RANK_LCPL
LANG_ENGLISH        "LCpl."

REFERENCE           RANK_LCPL_FULL
LANG_ENGLISH        "Lance Corporal"

REFERENCE           RANK_CPL
LANG_ENGLISH        "Cpl."

REFERENCE           RANK_CPL_FULL
LANG_ENGLISH        "Corporal"

REFERENCE           RANK_SGT
LANG_ENGLISH        "Sgt."

REFERENCE           RANK_SGT_FULL
LANG_ENGLISH        "Sergeant"

REFERENCE           RANK_SSGT
LANG_ENGLISH        "SSgt."

REFERENCE           RANK_SSGT_FULL
LANG_ENGLISH        "Staff Sergeant"

REFERENCE           RANK_GYSGT
LANG_ENGLISH        "GySgt."

REFERENCE           RANK_GYSGT_FULL
LANG_ENGLISH        "Gunnery Sergeant"

REFERENCE           RANK_MSGT
LANG_ENGLISH        "MSgt."

REFERENCE           RANK_MSGT_FULL
LANG_ENGLISH        "Master Sergeant"

REFERENCE           RANK_MGYSGT
LANG_ENGLISH        "MGySgt."

REFERENCE           RANK_MGYSGT_FULL
LANG_ENGLISH        "Master Gunnery Sergeant"

REFERENCE           RANK_2NDLT
LANG_ENGLISH        "2ndLt."

REFERENCE           RANK_2NDLT_FULL
LANG_ENGLISH        "2nd Lieutenant"

REFERENCE           RANK_1STLT
LANG_ENGLISH        "1stLt."

REFERENCE           RANK_1STLT_FULL
LANG_ENGLISH        "1st Lieutenant"

REFERENCE           RANK_CAPT
LANG_ENGLISH        "Capt."

REFERENCE           RANK_CAPT_FULL
LANG_ENGLISH        "Captain"

REFERENCE           RANK_MAJ
LANG_ENGLISH        "Maj."

REFERENCE           RANK_MAJ_FULL
LANG_ENGLISH        "Major"

REFERENCE           RANK_LTCOL
LANG_ENGLISH        "LtCol."

REFERENCE           RANK_LTCOL_FULL
LANG_ENGLISH        "Lieutenant Colonel"

REFERENCE           RANK_COL
LANG_ENGLISH        "Col."

REFERENCE           RANK_COL_FULL
LANG_ENGLISH        "Colonel"

REFERENCE           RANK_BGEN
LANG_ENGLISH        "BGen."

REFERENCE           RANK_BGEN_FULL
LANG_ENGLISH        "Brigadier General"

REFERENCE           RANK_MAJGEN
LANG_ENGLISH        "MajGen."

REFERENCE           RANK_MAJGEN_FULL
LANG_ENGLISH        "Major General"

REFERENCE           RANK_LTGEN
LANG_ENGLISH        "LtGen."

REFERENCE           RANK_LTGEN_FULL
LANG_ENGLISH        "Lieutenant General"

REFERENCE           RANK_GEN
LANG_ENGLISH        "Gen."

REFERENCE           RANK_GEN_FULL
LANG_ENGLISH        "General"

REFERENCE           RANK_COMM
LANG_ENGLISH        "Comm."

REFERENCE           RANK_COMM_FULL
LANG_ENGLISH        "Commander"

REFERENCE           RANK_1STLT_FULL2
LANG_ENGLISH        "1st Lieutenant I"

REFERENCE           RANK_1STLT_FULL3
LANG_ENGLISH        "1st Lieutenant II"

REFERENCE           RANK_2NDLT_FULL2
LANG_ENGLISH        "2nd Lieutenant I"

REFERENCE           RANK_2NDLT_FULL3
LANG_ENGLISH        "2nd Lieutenant II"

REFERENCE           RANK_BGEN_FULL2
LANG_ENGLISH        "Brigadier General I"

REFERENCE           RANK_BGEN_FULL3
LANG_ENGLISH        "Brigadier General II"

REFERENCE           RANK_CAPT_FULL2
LANG_ENGLISH        "Captain I"

REFERENCE           RANK_CAPT_FULL3
LANG_ENGLISH        "Captain II"

REFERENCE           RANK_COL_FULL2
LANG_ENGLISH        "Colonel I"

REFERENCE           RANK_COL_FULL3
LANG_ENGLISH        "Colonel II"

REFERENCE           RANK_COMM_FULL2
LANG_ENGLISH        "Commander I"

REFERENCE           RANK_COMM_FULL3
LANG_ENGLISH        "Commander II"

REFERENCE           RANK_CPL_FULL2
LANG_ENGLISH        "Corporal I"

REFERENCE           RANK_CPL_FULL3
LANG_ENGLISH        "Corporal II"

REFERENCE           RANK_GEN_FULL2
LANG_ENGLISH        "General I"

REFERENCE           RANK_GEN_FULL3
LANG_ENGLISH        "General II"

REFERENCE           RANK_GYSGT_FULL2
LANG_ENGLISH        "Gunnery Sergeant I"

REFERENCE           RANK_GYSGT_FULL3
LANG_ENGLISH        "Gunnery Sergeant II"

REFERENCE           RANK_LCPL_FULL2
LANG_ENGLISH        "Lance Corporal I"

REFERENCE           RANK_LCPL_FULL3
LANG_ENGLISH        "Lance Corporal II"

REFERENCE           RANK_LTCOL_FULL2
LANG_ENGLISH        "Lieutenant Colonel I"

REFERENCE           RANK_DELETE
LANG_ENGLISH        "DELETE ME"

REFERENCE           RANK_NEWREF
LANG_ENGLISH        "New text"

REFERENCE           RANK_LTCOL_FULL3
LANG_ENGLISH        "Lieutenant Colonel II"

REFERENCE           RANK_MAJ_FULL2
LANG_ENGLISH        "Major I"

REFERENCE           RANK_MAJ_FULL3
LANG_ENGLISH        "Major II"

REFERENCE           RANK_MAJGEN_FULL2
LANG_ENGLISH        "Major General I"

REFERENCE           RANK_MAJGEN_FULL3
LANG_ENGLISH        "Major General II"

REFERENCE           RANK_MGYSGT_FULL2
LANG_ENGLISH        "Master Gunnery Sergeant I"

REFERENCE           RANK_MGYSGT_FULL3
LANG_ENGLISH        "Master Gunnery Sergeant II"

REFERENCE           RANK_MSGT_FULL2
LANG_ENGLISH        "Master Sergeant I"

REFERENCE           RANK_MSGT_FULL3
LANG_ENGLISH        "Master Sergeant II"

REFERENCE           RANK_PFC_FULL2
LANG_ENGLISH        "Private First Class I"

REFERENCE           RANK_PFC_FULL3
LANG_ENGLISH        "Private First Class II"

REFERENCE           RANK_PVT_FULL2
LANG_ENGLISH        "Private I"

REFERENCE           RANK_PVT_FULL3
LANG_ENGLISH        "Private II"

REFERENCE           RANK_REC_FULL2
LANG_ENGLISH        "Recruit I"

REFERENCE           RANK_REC_FULL3
LANG_ENGLISH        "Recruit II"

REFERENCE           RANK_SGT_FULL2
LANG_ENGLISH        "Sergeant I"

REFERENCE           RANK_SGT_FULL3
LANG_ENGLISH        "Sergeant II"

REFERENCE           RANK_SSGT_FULL2
LANG_ENGLISH        "Staff Sergeant I"

REFERENCE           RANK_SSGT_FULL3
LANG_ENGLISH        "Staff Sergeant II"

REFERENCE           RANK_LTGEN_FULL2
LANG_ENGLISH        "Lieutenant General I"

REFERENCE           RANK_LTGEN_FULL3
LANG_ENGLISH        "Lieutenant General II"

REFERENCE           RANK_KILL_STREAK_N
LANG_ENGLISH        "&&1 has a killstreak of &&2!"

REFERENCE           RANK_PVT_FULL_N
LANG_ENGLISH        "Private &&1"

REFERENCE           RANK_PFC_FULL_N
LANG_ENGLISH        "Private First Class &&1"

REFERENCE           RANK_LCPL_FULL_N
LANG_ENGLISH        "Lance Corporal &&1"

REFERENCE           RANK_CPL_FULL_N
LANG_ENGLISH        "Corporal &&1"

REFERENCE           RANK_SGT_FULL_N
LANG_ENGLISH        "Sergeant &&1"

REFERENCE           RANK_SSGT_FULL_N
LANG_ENGLISH        "Staff Sergeant &&1"

REFERENCE           RANK_GYSGT_FULL_N
LANG_ENGLISH        "Gunnery Sergeant &&1"

REFERENCE           RANK_MSGT_FULL_N
LANG_ENGLISH        "Master Sergeant &&1"

REFERENCE           RANK_MGYSGT_FULL_N
LANG_ENGLISH        "Master Gunnery Sergeant &&1"

REFERENCE           RANK_2NDLT_FULL_N
LANG_ENGLISH        "2nd Lieutenant &&1"

REFERENCE           RANK_1STLT_FULL_N
LANG_ENGLISH        "1st Lieutenant &&1"

REFERENCE           RANK_CAPT_FULL_N
LANG_ENGLISH        "Captain &&1"

REFERENCE           RANK_MAJ_FULL_N
LANG_ENGLISH        "Major &&1"

REFERENCE           RANK_LTCOL_FULL_N
LANG_ENGLISH        "Lieutenant Colonel &&1"

REFERENCE           RANK_COL_FULL_N
LANG_ENGLISH        "Colonel &&1"

REFERENCE           RANK_BGEN_FULL_N
LANG_ENGLISH        "Brigadier General &&1"

REFERENCE           RANK_MAJGEN_FULL_N
LANG_ENGLISH        "Major General &&1"

REFERENCE           RANK_LTGEN_FULL_N
LANG_ENGLISH        "Lieutenant General &&1"

REFERENCE           RANK_GEN_FULL_N
LANG_ENGLISH        "General &&1"

REFERENCE           RANK_ROMANI
LANG_ENGLISH        "I"

REFERENCE           RANK_ROMANII
LANG_ENGLISH        "II"

REFERENCE           RANK_GAME_SUMMARY
LANG_ENGLISH        "Game Summary"

REFERENCE           RANK_MATCHBONUS
LANG_ENGLISH        "Match Bonus"

REFERENCE           RANK_SCORE_PRE
LANG_ENGLISH        "Score:"

REFERENCE           RANK_CHALLENGES_PRE
LANG_ENGLISH        "Challenge Completed:"

REFERENCE           RANK_MATCHBONUS_PRE
LANG_ENGLISH        "Match Bonus:"

REFERENCE           RANK_TOTALXP_PRE
LANG_ENGLISH        "Total XP Earned:"

REFERENCE           RANK_RANK_PRE
LANG_ENGLISH        "Rank:"

REFERENCE           RANK_XP_REQUIRED_PRE
LANG_ENGLISH        "XP Required:"

REFERENCE           RANK_NEXT_RANK_PRE
LANG_ENGLISH        "Next Rank:"

REFERENCE           RANK_SGTMAJ
LANG_ENGLISH        "SgtMaj."

REFERENCE           RANK_SGTMAJ_FULL
LANG_ENGLISH        "Sergeant Major"

REFERENCE           RANK_SGTMAJ_FULL2
LANG_ENGLISH        "Sergeant Major I"

REFERENCE           RANK_SGTMAJ_FULL3
LANG_ENGLISH        "Sergeant Major II"

REFERENCE           RANK_SGTMAJ_FULL_N
LANG_ENGLISH        "Sergeant Major &&1"

REFERENCE           RANK_COMM_FULL_N
LANG_ENGLISH        "Commander &&1"

REFERENCE           RANK_SPC
LANG_ENGLISH        "Spc."

REFERENCE           RANK_SPC_FULL
LANG_ENGLISH        "Specialist"

REFERENCE           RANK_SPC_FULL2
LANG_ENGLISH        "Specialist I"

REFERENCE           RANK_SPC_FULL3
LANG_ENGLISH        "Specialist II"

REFERENCE           RANK_SPC_FULL_N
LANG_ENGLISH        "Specialist &&1"

REFERENCE           RANK_SFC
LANG_ENGLISH        "SFC."

REFERENCE           RANK_SFC_FULL
LANG_ENGLISH        "Sergeant First Class"

REFERENCE           RANK_SFC_FULL2
LANG_ENGLISH        "Sergeant First Class I"

REFERENCE           RANK_SFC_FULL3
LANG_ENGLISH        "Sergeant First Class II"

REFERENCE           RANK_SFC_FULL_N
LANG_ENGLISH        "Sergeant First Class &&1"

REFERENCE           RANK_1STSGT
LANG_ENGLISH        "1stSgt."

REFERENCE           RANK_1STSGT_FULL
LANG_ENGLISH        "First Sergeant"

REFERENCE           RANK_1STSGT_FULL2
LANG_ENGLISH        "First Sergeant I"

REFERENCE           RANK_1STSGT_FULL3
LANG_ENGLISH        "First Sergeant II"

REFERENCE           RANK_1STSGT_FULL_N
LANG_ENGLISH        "First Sergeant &&1"

REFERENCE           RANK_CSM
LANG_ENGLISH        "CSM."

REFERENCE           RANK_CSM_FULL
LANG_ENGLISH        "Command Sergeant Major"

REFERENCE           RANK_CSM_FULL2
LANG_ENGLISH        "Command Sergeant Major I"

REFERENCE           RANK_CSM_FULL3
LANG_ENGLISH        "Command Sergeant Major II"

REFERENCE           RANK_CSM_FULL_N
LANG_ENGLISH        "Command Sergeant Major &&1"

REFERENCE           RANK_CSM_FULL4
LANG_ENGLISH        "Command Sergeant Major III"

REFERENCE           RANK_GEN_FULL4
LANG_ENGLISH        "General III"

REFERENCE           RANK_LTGEN_FULL4
LANG_ENGLISH        "Lieutenant General III"

REFERENCE           RANK_MAJGEN_FULL4
LANG_ENGLISH        "Major General III"

REFERENCE           RANK_BGEN_FULL4
LANG_ENGLISH        "Brigadier General III"

REFERENCE           RANK_COL_FULL4
LANG_ENGLISH        "Colonel III"

REFERENCE           RANK_LTCOL_FULL4
LANG_ENGLISH        "Lieutenant Colonel III"

REFERENCE           RANK_MAJ_FULL4
LANG_ENGLISH        "Major III"

REFERENCE           RANK_CAPT_FULL4
LANG_ENGLISH        "Captain III"

REFERENCE           RANK_1STLT_FULL4
LANG_ENGLISH        "1st Lieutenant III"

REFERENCE           RANK_2NDLT_FULL4
LANG_ENGLISH        "2nd Lieutenant III"

REFERENCE           RANK_ROMANIII
LANG_ENGLISH        "III"

REFERENCE           PERKS_EXTREME_CONDITIONING
LANG_ENGLISH        "Extreme Conditioning"

REFERENCE           PERKS_STOPPING_POWER
LANG_ENGLISH        "Stopping Power"

REFERENCE           PERKS_BOMB_SQUAD
LANG_ENGLISH        "SitRep"

REFERENCE           PERKS_SONIC_BOOM
LANG_ENGLISH        "Sonic Boom"

REFERENCE           PERKS_LAST_STAND
LANG_ENGLISH        "Last Stand"

REFERENCE           PERKS_MARTYRDOM
LANG_ENGLISH        "Martyrdom"

REFERENCE           PERKS_DEEP_IMPACT
LANG_ENGLISH        "Deep Impact"

REFERENCE           PERKS_STEADY_AIM
LANG_ENGLISH        "Steady Aim"

REFERENCE           PERKS_SLEIGHT_OF_HAND
LANG_ENGLISH        "Sleight of Hand"

REFERENCE           PERKS_BANDOLIER
LANG_ENGLISH        "Bandolier"

REFERENCE           PERKS_OVERKILL
LANG_ENGLISH        "Overkill"

REFERENCE           PERKS_JUGGERNAUT
LANG_ENGLISH        "Juggernaut"

REFERENCE           PERKS_FRAG_X_3
LANG_ENGLISH        "Frag x 3"

REFERENCE           PERKS_SPECIAL_GRENADES_X_3
LANG_ENGLISH        "Special Grenades x 3"

REFERENCE           PERKS_C4_X_2
LANG_ENGLISH        "C4 x 2"

REFERENCE           PERKS_DEAD_SILENCE
LANG_ENGLISH        "Ninja"

REFERENCE           PERKS_IRON_LUNGS
LANG_ENGLISH        "Iron Lungs"

REFERENCE           PERKS_UAV_JAMMER
LANG_ENGLISH        "UAV Jammer"

REFERENCE           PERKS_EAVESDROP
LANG_ENGLISH        "Eavesdrop"

REFERENCE           PERKS_CLAYMORE_X_2
LANG_ENGLISH        "Claymore x 2"

REFERENCE           PERKS_RPG7_X_2
LANG_ENGLISH        "RPG-7 x 2"

REFERENCE           PERKS_NONE
LANG_ENGLISH        "None"

REFERENCE           PERKS_GRENADE_LAUNCHER
LANG_ENGLISH        "Grenade Launcher"

REFERENCE           PERKS_GRIP
LANG_ENGLISH        "Grip"

REFERENCE           PERKS_ATTACHMENT
LANG_ENGLISH        "Attachment"

REFERENCE           PERKS_SEMIAUTOMATIC_WITH_A
LANG_ENGLISH        "Semi-automatic with a high capacity.  Effective at close range."

REFERENCE           PERKS_SEMIAUTOMATIC_WITH_MEDIUM
LANG_ENGLISH        "Semi-automatic with medium capacity and power.  Effective at close range."

REFERENCE           PERKS_SEMIAUTOMATIC_WITH_MEDIUM1
LANG_ENGLISH        "Semi-automatic with medium capacity and power.  Effective at close range."

REFERENCE           PERKS_SEMIAUTOMATIC_WITH_HIGH
LANG_ENGLISH        "Semi-automatic with high power.  Effective at close range."

REFERENCE           PERKS_GOLD_PLATED_SEMIAUTOMATIC
LANG_ENGLISH        "Gold plated semi-automatic with high power.  Effective at close range."

REFERENCE           PERKS_FULLY_AUTOMATIC_WITH
LANG_ENGLISH        "Fully automatic with good accuracy.  Effective at close to medium range."

REFERENCE           PERKS_FULLY_AUTOMATIC_WITH1
LANG_ENGLISH        "Fully automatic with a high rate of fire.  Effective at close range."

REFERENCE           PERKS_FULLY_AUTOMATIC_WITH2
LANG_ENGLISH        "Fully automatic with a high rate of fire.  Effective at close to medium range."

REFERENCE           PERKS_FULLY_AUTOMATIC_WITH3
LANG_ENGLISH        "Fully automatic with high power.  Effective at close to medium range."

REFERENCE           PERKS_FULLY_AUTOMATIC_WITH4
LANG_ENGLISH        "Fully automatic with a high capacity.  Effective at close to medium range."

REFERENCE           PERKS_FULLY_AUTOMATIC_WITH5
LANG_ENGLISH        "Fully automatic with high power.  Effective at medium range."

REFERENCE           PERKS_SINGLEFIRE_WITH_HIGH
LANG_ENGLISH        "Single-fire with high power.  Effective at medium to long range."

REFERENCE           PERKS_FULLY_AUTOMATIC_WITH6
LANG_ENGLISH        "Fully automatic with good accuracy.  Effective at medium range."

REFERENCE           PERKS_SINGLEFIRE_WITH_A_HIGH
LANG_ENGLISH        "Single-fire with a high capacity.  Effective at medium to long range."

REFERENCE           PERKS_FULLY_AUTOMATIC_WITH7
LANG_ENGLISH        "Fully automatic with a high rate of fire.  Effective at medium range."

REFERENCE           PERKS_SEMIAUTOMATIC_WITH_THREE
LANG_ENGLISH        "Semi-automatic with three round burst fire.  Effective at medium to long range."

REFERENCE           PERKS_FULLY_AUTOMATIC_WITH8
LANG_ENGLISH        "Fully automatic with low recoil.  Effective at medium range."

REFERENCE           PERKS_GRENADE_LAUNCHER_ATTACHMENT
LANG_ENGLISH        "Undermounted grenade launcher."

REFERENCE           PERKS_PORTABLE_SHOULDERLAUNCHED
LANG_ENGLISH        "Portable shoulder-launched rocket propelled grenade.  Causes a large explosive blast on impact."

REFERENCE           PERKS_SEMIAUTOMATIC_SNIPER
LANG_ENGLISH        "Semi-automatic sniper rifle.  Effective at long range."

REFERENCE           PERKS_BOLTACTION_SNIPER_RIFLE
LANG_ENGLISH        "Bolt-action sniper rifle.  Effective at long range."

REFERENCE           PERKS_SEMIAUTOMATIC_SNIPER1
LANG_ENGLISH        "Semi-automatic sniper rifle.  Effective at long range."

REFERENCE           PERKS_BOLTACTION_SNIPER_RIFLE1
LANG_ENGLISH        "Bolt-action sniper rifle.  Effective at long range."

REFERENCE           PERKS_SEMIAUTOMATIC_SNIPER2
LANG_ENGLISH        "Semi-automatic sniper rifle.  Effective at long range."

REFERENCE           PERKS_SEMIAUTOMATIC_COMBAT
LANG_ENGLISH        "Semi-automatic combat shotgun.  Effective at close range."

REFERENCE           PERKS_PUMP_ACTION_SHOTGUN_EFFECTIVE
LANG_ENGLISH        "Pump action shotgun.  Effective at close range."

REFERENCE           PERKS_FULLY_AUTOMATIC_WITH9
LANG_ENGLISH        "Fully automatic with good power and quick fire rate.  Effective at medium to long range."

REFERENCE           PERKS_FULLY_AUTOMATIC_WITH10
LANG_ENGLISH        "Fully automatic with a high rate of fire.  Effective at medium to long range."

REFERENCE           PERKS_FULLY_AUTOMATIC_WITH11
LANG_ENGLISH        "Fully automatic with high power.  Effective at medium to long range."

REFERENCE           PERKS_CHARGE_OF_PLASTIC_EXPLOSIVES
LANG_ENGLISH        "Charge of plastic explosives, set off manually with a detonator."

REFERENCE           PERKS_DIRECTIONAL_ANTIPERSONNEL
LANG_ENGLISH        "Directional anti-personnel mine, set off by an enemy entering its proximity."

REFERENCE           PERKS_ANTIPERSONNEL_DEVICE
LANG_ENGLISH        "Anti-personnel device that destroys the target with a burst of flying shrapnel."

REFERENCE           PERKS_DEVICE_THAT_BLINDS_AND
LANG_ENGLISH        "Blinds and deafens target."

REFERENCE           PERKS_DEVICE_THAT_CREATES_A
LANG_ENGLISH        "Smoke screen."

REFERENCE           PERKS_DEVICE_THAT_DISORIENTS
LANG_ENGLISH        "Disorients and slows targets."

REFERENCE           PERKS_HEAR_VOICE_CHAT_OF_NEARBY
LANG_ENGLISH        "Hear voice chat of nearby enemies."

REFERENCE           PERKS_UNDETECTABLE_ON_ENEMY
LANG_ENGLISH        "Invisible to enemy UAVs."

REFERENCE           PERKS_LONGER_BREATH_FOR_STEADIER
LANG_ENGLISH        "+Longer hold breath duration."

REFERENCE           PERKS_MAKE_LESS_SOUND_WHEN
LANG_ENGLISH        "+Your footsteps are silent."

REFERENCE           PERKS_SPRINT_FOR_LONGER_DISTANCES
LANG_ENGLISH        "Sprint for longer distances."

REFERENCE           PERKS_HIGHER_EXPLOSIVE_WEAPON
LANG_ENGLISH        "Increased explosive weapon damage."

REFERENCE           PERKS_ABILITY_TO_SEEK_OUT_ENEMY
LANG_ENGLISH        "Detect enemy explosives and tactical insertions."

REFERENCE           PERKS_PULL_OUT_YOUR_PISTOL
LANG_ENGLISH        "Pull out your pistol before dying."

REFERENCE           PERKS_DROP_A_LIVE_GRENADE_WHEN
LANG_ENGLISH        "Drop a live grenade just after dying."

REFERENCE           PERKS_INCREASED_BULLET_DAMAGE
LANG_ENGLISH        "Increased bullet damage."

REFERENCE           PERKS_DEEPER_BULLET_PENETRATION
LANG_ENGLISH        "Deeper bullet penetration."

REFERENCE           PERKS_INCREASED_HIPFIRE_ACCURACY
LANG_ENGLISH        "Increased hip fire accuracy."

REFERENCE           PERKS_INCREASED_RATE_OF_FIRE
LANG_ENGLISH        "Increased rate of fire."

REFERENCE           PERKS_FASTER_RELOADING
LANG_ENGLISH        "Faster reloading."

REFERENCE           PERKS_EXTRA_AMMUNITION_MAGAZINES
LANG_ENGLISH        "+Extra mags."

REFERENCE           PERKS_CARRY_TWO_PRIMARY_WEAPONS
LANG_ENGLISH        "Carry two primary weapons, no pistol."

REFERENCE           PERKS_INCREASED_HEALTH
LANG_ENGLISH        "Increased health."

REFERENCE           PERKS_3_FRAG_GRENADES
LANG_ENGLISH        "3 Frag grenades."

REFERENCE           PERKS_3_SPECIAL_GRENADES_NO
LANG_ENGLISH        "3 special grenades. No smoke."

REFERENCE           PERKS_REMOTE_DETONATION_EXPLOSIVE
LANG_ENGLISH        "Remote detonation explosive."

REFERENCE           PERKS_TRIP_ACTIVATED_EXPLOSIVE
LANG_ENGLISH        "Proximity activated explosive mine."

REFERENCE           PERKS_ROCKET_LAUNCHER_WITH
LANG_ENGLISH        "Rocket Launcher with 2 rockets."

REFERENCE           PERKS_GRENADE_LAUNCHER_ATTACHMENT1
LANG_ENGLISH        "Grenade launcher attachment."

REFERENCE           PERKS_GRIP_ATTACHMENT_
LANG_ENGLISH        "Grip attachment.\\n"

REFERENCE           PERKS_WEAPON_ATTACHMENT
LANG_ENGLISH        "Weapon attachment."

REFERENCE           PERKS_SHARPSHOOTER
LANG_ENGLISH        "Scout Sniper"

REFERENCE           PERKS_CROWD_CONTROL
LANG_ENGLISH        "Riot Control"

REFERENCE           PERKS_CREATE_A_CLASS
LANG_ENGLISH        "Create a Class"

REFERENCE           PERKS_KILLSTREAK_REWARDS
LANG_ENGLISH        "Killstreak Rewards"

REFERENCE           PERKS_CHALLENGES
LANG_ENGLISH        "Challenges"

REFERENCE           PERKS_HARDCORE_GAMETYPES
LANG_ENGLISH        "Hardcore Gametypes"

REFERENCE           PERKS_OLDSCHOOL_GAMETYPES
LANG_ENGLISH        "Oldschool Gametypes"

REFERENCE           PERKS_CLAN_TAG
LANG_ENGLISH        "Clan Tags"

REFERENCE           PERKS_FRAG_1
LANG_ENGLISH        "Frag / &&1 x 1"

REFERENCE           PERKS_WEAPON_FLASH_GRENADE
LANG_ENGLISH        "Flash x 2"

REFERENCE           PERKS_WEAPON_SMOKE_GRENADE
LANG_ENGLISH        "Smoke x 1"

REFERENCE           PERKS_WEAPON_STUN_GRENADE
LANG_ENGLISH        "Stun x 2"

REFERENCE           PERKS__X_1
LANG_ENGLISH        "&&1 x 1"

REFERENCE           PERKS_GRENADES_COMBO1
LANG_ENGLISH        "Frag / &&1 x 1"

REFERENCE           PERKS_FRAG_X_1
LANG_ENGLISH        "Frag"

REFERENCE           PERKS_3X_WEAPON_FLASH_GRENADE
LANG_ENGLISH        "Flash x 3"

REFERENCE           PERKS_3X_WEAPON_SMOKE_GRENADE
LANG_ENGLISH        "Smoke x 3"

REFERENCE           PERKS_3X_WEAPON_STUN_GRENADE
LANG_ENGLISH        "Stun x 3"

REFERENCE           PERKS_OPTION_NOT_AVAILABLE
LANG_ENGLISH        "Option not available when Smoke Grenade is equiped in Special Grenade Option."

REFERENCE           PERKS_NO_ATTACHMENT
LANG_ENGLISH        "No attachment"

REFERENCE           PERKS_ENHANCED_ZOOM_ACOG_SCOPE
LANG_ENGLISH        "Enhanced zoom ACOG scope."

REFERENCE           PERKS_REPLACE_THE_IRON_SIGHTS
LANG_ENGLISH        "Precision sight."

REFERENCE           PERKS_INVISIBLE_ON_GPS_WHEN
LANG_ENGLISH        "Invisible on radar when firing."

REFERENCE           PERKS_VERTICAL_FOREGRIP_FOR
LANG_ENGLISH        "Vertical foregrip for reduced recoil."

REFERENCE           PERKS_GRENADE_LAUNCHER_ATTACHMENT2
LANG_ENGLISH        "Undermounted grenade launcher."

REFERENCE           PERKS_STANDARD_FINISH
LANG_ENGLISH        "Standard finish."

REFERENCE           PERKS_TAN_DESERT_CAMOUFLAGE
LANG_ENGLISH        "Tan desert camouflage finish."

REFERENCE           PERKS_GREEN_WOODLAND_CAMOUFLAGE
LANG_ENGLISH        "Green woodland camouflage finish."

REFERENCE           PERKS_BLACK_AND_WHITE_MARPAT
LANG_ENGLISH        "Black and white marpat camouflage finish."

REFERENCE           PERKS_RED_TIGER_STRIPE_CAMOUFLAGE
LANG_ENGLISH        "Red tiger stripe camouflage finish."

REFERENCE           PERKS_BLUE_TIGER_STRIPE_CAMOUFLAGE
LANG_ENGLISH        "Blue tiger stripe camouflage finish."

REFERENCE           PERKS_BLING
LANG_ENGLISH        "Bling"

REFERENCE           PERKS_GO_GET_SOME_SUN
LANG_ENGLISH        "Go get some sun."

REFERENCE           PERKS_COMPLETE_THE_MARKSMAN
LANG_ENGLISH        "Complete the Marksman challenge for this weapon."

REFERENCE           PERKS_COMPLETE_THE_EXPERT_CHALLENGE
LANG_ENGLISH        "Complete the Expert challenge for this weapon."

REFERENCE           PERKS_UNLOCK_EVERYTHING_IN
LANG_ENGLISH        "Complete all challenges for every weapon in this weapon category."

REFERENCE           PERKS_ALL_PLAY_AND_NO_WORK
LANG_ENGLISH        "All play and no work makes Jack a dull boy..."

REFERENCE           PERKS_SMOKE_SELECTION_WARNING
LANG_ENGLISH        "Option not available when Special Grenades x3 is selected in Perk 1."

REFERENCE           PERKS_UNLOCKED_AT_LV1
LANG_ENGLISH        "Unlocked at Private (Lv1)."

REFERENCE           PERKS_UNLOCKED_AT_LV2
LANG_ENGLISH        "Unlocked at Private I (Lv2)."

REFERENCE           PERKS_UNLOCKED_AT_LV3
LANG_ENGLISH        "Unlocked at Private II (Lv3)."

REFERENCE           PERKS_UNLOCKED_AT_LV4
LANG_ENGLISH        "Unlocked at Private First Class (Lv4)."

REFERENCE           PERKS_UNLOCKED_AT_LV5
LANG_ENGLISH        "Unlocked at Private First Class I (Lv5)."

REFERENCE           PERKS_UNLOCKED_AT_LV6
LANG_ENGLISH        "Unlocked at Private First Class II (Lv6)."

REFERENCE           PERKS_UNLOCKED_AT_LV7
LANG_ENGLISH        "Unlocked at Specialist (Lv7)."

REFERENCE           PERKS_UNLOCKED_AT_LV8
LANG_ENGLISH        "Unlocked at Specialist I (Lv8)."

REFERENCE           PERKS_UNLOCKED_AT_LV9
LANG_ENGLISH        "Unlocked at Specialist II (Lv9)."

REFERENCE           PERKS_UNLOCKED_AT_LV10
LANG_ENGLISH        "Unlocked at Corporal (Lv10)."

REFERENCE           PERKS_UNLOCKED_AT_LV11
LANG_ENGLISH        "Unlocked at Corporal I (Lv11)."

REFERENCE           PERKS_UNLOCKED_AT_LV12
LANG_ENGLISH        "Unlocked at Corporal II (Lv12)."

REFERENCE           PERKS_UNLOCKED_AT_LV13
LANG_ENGLISH        "Unlocked at Sergeant (Lv13)."

REFERENCE           PERKS_UNLOCKED_AT_LV14
LANG_ENGLISH        "Unlocked at Sergeant I (Lv14)."

REFERENCE           PERKS_UNLOCKED_AT_LV15
LANG_ENGLISH        "Unlocked at Sergeant II (Lv15)."

REFERENCE           PERKS_UNLOCKED_AT_LV16
LANG_ENGLISH        "Unlocked at Staff Sergeant (Lv16)."

REFERENCE           PERKS_UNLOCKED_AT_LV17
LANG_ENGLISH        "Unlocked at Staff Sergeant I (Lv17)."

REFERENCE           PERKS_UNLOCKED_AT_LV18
LANG_ENGLISH        "Unlocked at Staff Sergeant II (Lv18)."

REFERENCE           PERKS_UNLOCKED_AT_LV19
LANG_ENGLISH        "Unlocked at Sergeant First Class (Lv19)."

REFERENCE           PERKS_UNLOCKED_AT_LV20
LANG_ENGLISH        "Unlocked at Sergeant First Class I (Lv20)."

REFERENCE           PERKS_UNLOCKED_AT_LV21
LANG_ENGLISH        "Unlocked at Sergeant First Class II (Lv21)."

REFERENCE           PERKS_UNLOCKED_AT_LV22
LANG_ENGLISH        "Unlocked at Master Sergeant (Lv22)."

REFERENCE           PERKS_UNLOCKED_AT_LV23
LANG_ENGLISH        "Unlocked at Master Sergeant I (Lv23)."

REFERENCE           PERKS_UNLOCKED_AT_LV24
LANG_ENGLISH        "Unlocked at Master Sergeant II (Lv24)."

REFERENCE           PERKS_UNLOCKED_AT_LV25
LANG_ENGLISH        "Unlocked at First Sergeant (Lv25)."

REFERENCE           PERKS_UNLOCKED_AT_LV26
LANG_ENGLISH        "Unlocked at First Sergeant I (Lv26)."

REFERENCE           PERKS_UNLOCKED_AT_LV27
LANG_ENGLISH        "Unlocked at First Sergeant II (Lv27)."

REFERENCE           PERKS_UNLOCKED_AT_LV28
LANG_ENGLISH        "Unlocked at Sergeant Major (Lv28)."

REFERENCE           PERKS_UNLOCKED_AT_LV29
LANG_ENGLISH        "Unlocked at Sergeant Major I (Lv29)."

REFERENCE           PERKS_UNLOCKED_AT_LV30
LANG_ENGLISH        "Unlocked at Sergeant Major II (Lv30)."

REFERENCE           PERKS_UNLOCKED_AT_LV31
LANG_ENGLISH        "Unlocked at Command Sergeant Major (Lv31)."

REFERENCE           PERKS_UNLOCKED_AT_LV32
LANG_ENGLISH        "Unlocked at Command Sergeant Major I (Lv32)."

REFERENCE           PERKS_UNLOCKED_AT_LV33
LANG_ENGLISH        "Unlocked at Command Sergeant Major II (Lv33)."

REFERENCE           PERKS_UNLOCKED_AT_LV34
LANG_ENGLISH        "Unlocked at 2nd Lieutenant (Lv34)."

REFERENCE           PERKS_UNLOCKED_AT_LV35
LANG_ENGLISH        "Unlocked at 2nd Lieutenant I (Lv35)."

REFERENCE           PERKS_UNLOCKED_AT_LV36
LANG_ENGLISH        "Unlocked at 2nd Lieutenant II (Lv36)."

REFERENCE           PERKS_UNLOCKED_AT_LV37
LANG_ENGLISH        "Unlocked at 2nd Lieutenant III (Lv37)."

REFERENCE           PERKS_UNLOCKED_AT_LV38
LANG_ENGLISH        "Unlocked at 1st Lieutenant (Lv38)."

REFERENCE           PERKS_UNLOCKED_AT_LV39
LANG_ENGLISH        "Unlocked at 1st Lieutenant I (Lv39)."

REFERENCE           PERKS_UNLOCKED_AT_LV40
LANG_ENGLISH        "Unlocked at 1st Lieutenant II (Lv40)."

REFERENCE           PERKS_UNLOCKED_AT_LV41
LANG_ENGLISH        "Unlocked at Captain (Lv41)."

REFERENCE           PERKS_UNLOCKED_AT_LV42
LANG_ENGLISH        "Unlocked at Captain I (Lv42)."

REFERENCE           PERKS_UNLOCKED_AT_LV43
LANG_ENGLISH        "Unlocked at Captain II (Lv43)."

REFERENCE           PERKS_UNLOCKED_AT_LV44
LANG_ENGLISH        "Unlocked at Major (Lv44)."

REFERENCE           PERKS_UNLOCKED_AT_LV45
LANG_ENGLISH        "Unlocked at Major I (Lv45)."

REFERENCE           PERKS_UNLOCKED_AT_LV46
LANG_ENGLISH        "Unlocked at Major II (Lv46)."

REFERENCE           PERKS_UNLOCKED_AT_LV47
LANG_ENGLISH        "Unlocked at Lieutenant Colonel (Lv47)."

REFERENCE           PERKS_UNLOCKED_AT_LV48
LANG_ENGLISH        "Unlocked at Lieutenant Colonel I (Lv48)."

REFERENCE           PERKS_UNLOCKED_AT_LV49
LANG_ENGLISH        "Unlocked at Lieutenant Colonel II (Lv49)."

REFERENCE           PERKS_UNLOCKED_AT_LV50
LANG_ENGLISH        "Unlocked at Colonel (Lv50)."

REFERENCE           PERKS_UNLOCKED_AT_LV51
LANG_ENGLISH        "Unlocked at Colonel I (Lv51)."

REFERENCE           PERKS_UNLOCKED_AT_LV52
LANG_ENGLISH        "Unlocked at Colonel II (Lv52)."

REFERENCE           PERKS_UNLOCKED_AT_LV53
LANG_ENGLISH        "Unlocked at Colonel III (Lv53)."

REFERENCE           PERKS_UNLOCKED_AT_LV54
LANG_ENGLISH        "Unlocked at Brigadier General (Lv54)."

REFERENCE           PERKS_UNLOCKED_AT_LV55
LANG_ENGLISH        "Unlocked at Brigadier General I (Lv55)."

REFERENCE           PERKS_UNLOCKED_AT_LV56
LANG_ENGLISH        "Unlocked at Brigadier General II (Lv56)."

REFERENCE           PERKS_UNLOCKED_AT_LV57
LANG_ENGLISH        "Unlocked at Brigadier General III (Lv57)."

REFERENCE           PERKS_UNLOCKED_AT_LV58
LANG_ENGLISH        "Unlocked at Major General (Lv58)."

REFERENCE           PERKS_UNLOCKED_AT_LV59
LANG_ENGLISH        "Unlocked at Major General I (Lv59)."

REFERENCE           PERKS_UNLOCKED_AT_LV60
LANG_ENGLISH        "Unlocked at Major General II (Lv60)."

REFERENCE           PERKS_UNLOCKED_AT_LV61
LANG_ENGLISH        "Unlocked at Major General III (Lv61)."

REFERENCE           PERKS_UNLOCKED_AT_LV62
LANG_ENGLISH        "Unlocked at Lieutenant General (Lv62)."

REFERENCE           PERKS_UNLOCKED_AT_LV63
LANG_ENGLISH        "Unlocked at Lieutenant General I (Lv63)."

REFERENCE           PERKS_UNLOCKED_AT_LV64
LANG_ENGLISH        "Unlocked at Lieutenant General II (Lv64)."

REFERENCE           PERKS_UNLOCKED_AT_LV65
LANG_ENGLISH        "Unlocked at Lieutenant General III (Lv65)."

REFERENCE           PERKS_UNLOCKED_AT_LV66
LANG_ENGLISH        "Unlocked at General (Lv66)."

REFERENCE           PERKS_UNLOCKED_AT_LV67
LANG_ENGLISH        "Unlocked at General I (Lv67)."

REFERENCE           PERKS_UNLOCKED_AT_LV68
LANG_ENGLISH        "Unlocked at General II (Lv68)."

REFERENCE           PERKS_UNLOCKED_AT_LV69
LANG_ENGLISH        "Unlocked at General III (Lv69)."

REFERENCE           PERKS_UNLOCKED_AT_LV70
LANG_ENGLISH        "Unlocked at Commander (Lv70)."

REFERENCE           PERKS_UNLOCKED_AT_NONE
LANG_ENGLISH        "Unlocked by unknown means."

REFERENCE           PERKS_SMARTARROW_DESC
LANG_ENGLISH        "Like C4 with a camera."

REFERENCE           PERKS_SMARTARROW
LANG_ENGLISH        "Smart Arrow"

REFERENCE           PERKS_SENTRY_MINIGUN
LANG_ENGLISH        "Sentry Minigun"

REFERENCE           PERKS_DESC_SENTRY_MINIGUN
LANG_ENGLISH        "2 killstreak to call in a portable sentry gun."

REFERENCE           PERKS_HELICOPTER_MINIGUN
LANG_ENGLISH        "Helicopter Minigun"

REFERENCE           PERKS_DESC_HELICOPTER_MINIGUN
LANG_ENGLISH        "5 killstreak for chopper minigun."

REFERENCE           PERKS_AT4
LANG_ENGLISH        "AT4 x 1"

REFERENCE           PERKS_M79
LANG_ENGLISH        "M79 x 2"

REFERENCE           PERKS_DESC_M79
LANG_ENGLISH        "A Single shot shoulder-fired 40mm grenade launcher"

REFERENCE           PERKS_AA12
LANG_ENGLISH        "A low recoil fully automatic combat shotgun. Effective at close range."

REFERENCE           PERKS_HIGHLY_ACCURATE_ROCKET_LAUNCHER
LANG_ENGLISH        "Fast, accurate rocket launcher."

REFERENCE           PERKS_DEDICATED_GRENADE_LAUNCHER
LANG_ENGLISH        "Dedicated grenade launcher."

REFERENCE           PERKS_MAGNUM_REVOLVER
LANG_ENGLISH        ".44 Magnum revolver with a six-round cylinder."

REFERENCE           PERKS_DEVICE_THAT_DISABLES
LANG_ENGLISH        "Device that disables enemy electronics temporarily."

REFERENCE           PERKS_FRAG_1_WEAPON_EMP_GRENADE
LANG_ENGLISH        "Frag / EMP x 1"

REFERENCE           PERKS_3X_WEAPON_EMP_GRENADE
LANG_ENGLISH        "EMP x 3"

REFERENCE           PERKS_BLASTSHIELD
LANG_ENGLISH        "Blast Shield"

REFERENCE           PERKS_DESC_BLASTSHIELD
LANG_ENGLISH        "Increased explosive resistance."

REFERENCE           PERKS_BURSTFIRE
LANG_ENGLISH        "Mozambique"

REFERENCE           PERKS_DESC_BURSTFIRE
LANG_ENGLISH        "3 round burst mode."

REFERENCE           PERKS_MARATHON
LANG_ENGLISH        "Marathon"

REFERENCE           PERKS_DESC_MARATHON
LANG_ENGLISH        "Unlimited sprint."

REFERENCE           PERKS_LIGHTWEIGHT
LANG_ENGLISH        "Lightweight"

REFERENCE           PERKS_DESC_LIGHTWEIGHT
LANG_ENGLISH        "Move faster."

REFERENCE           PERKS_DESC_SHIELD
LANG_ENGLISH        "A protective shield."

REFERENCE           PERKS_SHIELD
LANG_ENGLISH        "Riot Shield"

REFERENCE           PERKS_SHIELD_NO_PRONE
LANG_ENGLISH        "Riot Shield unavailable while prone."

REFERENCE           PERKS_DESC_SIEGE
LANG_ENGLISH        "Immobile but greater accuracy."

REFERENCE           PERKS_SIEGE
LANG_ENGLISH        "Siege"

REFERENCE           PERKS_DESC_FREEFALL
LANG_ENGLISH        "+No falling damage."

REFERENCE           PERKS_FREEFALL
LANG_ENGLISH        "Free Fall"

REFERENCE           PERKS_DESC_FMJ
LANG_ENGLISH        "Increased bullet penetration."

REFERENCE           PERKS_FMJ
LANG_ENGLISH        "Explosive Rounds"

REFERENCE           PERKS_DESC_NINJA
LANG_ENGLISH        "+Delay enemy Claymore explosions."

REFERENCE           PERKS_NINJA
LANG_ENGLISH        "Ninja"

REFERENCE           PERKS_DESC_FINALSTAND
LANG_ENGLISH        "Get back up after being wounded."

REFERENCE           PERKS_FINALSTAND
LANG_ENGLISH        "Final Stand"

REFERENCE           PERKS_DOUBLEBARREL_DESC
LANG_ENGLISH        "Double barrel sawed-off shotgun.  Each barrel fires independently.  Very effective at close range."

REFERENCE           PERKS_UPGRADE_DEADSILENCE
LANG_ENGLISH        "+Silent Footsteps"

REFERENCE           PERKS_FEIGNDEATH
LANG_ENGLISH        "Feign Death"

REFERENCE           PERKS_SHELLSHOCK
LANG_ENGLISH        "Shellshock"

REFERENCE           PERKS_DESC_SHELLSHOCK
LANG_ENGLISH        "A riot shield on your back."

REFERENCE           PERKS_FASTMANTLE
LANG_ENGLISH        "Freerunner"

REFERENCE           PERKS_DESC_FASTMANTLE
LANG_ENGLISH        "+Climb obstacles faster."

REFERENCE           PERKS_EXPLOSIVEBULLETS
LANG_ENGLISH        "Explosive Rounds"

REFERENCE           PERKS_DESC_EXPLOSIVEBULLETS
LANG_ENGLISH        "Bullets explode on impact."

REFERENCE           PERKS_LOCALJAMMER
LANG_ENGLISH        "Scrambler"

REFERENCE           PERKS_DESC_LOCALJAMMER
LANG_ENGLISH        "Jam enemy radar near you."

REFERENCE           PERKS_THERMAL
LANG_ENGLISH        "Thermal Vision"

REFERENCE           PERKS_DESC_THERMAL
LANG_ENGLISH        "Enemies glow white hot."

REFERENCE           PERKS_JUMPDIVE
LANG_ENGLISH        "Dive"

REFERENCE           PERKS_DESC_JUMPDIVE
LANG_ENGLISH        "Jump to dodge bullets."

REFERENCE           PERKS_BLACKBOX
LANG_ENGLISH        "Blackbox"

REFERENCE           PERKS_DESC_BLACKBOX
LANG_ENGLISH        "Longer killstreak duration."

REFERENCE           PERKS_STEELNERVES
LANG_ENGLISH        "Steel Nerves"

REFERENCE           PERKS_DESC_STEELNERVES
LANG_ENGLISH        "Improves marksmanship."

REFERENCE           PERKS_QUICKDRAW
LANG_ENGLISH        "Quickdraw"

REFERENCE           PERKS_DESC_QUICKDRAW
LANG_ENGLISH        "+Faster aiming."

REFERENCE           PERKS_ENDGAME
LANG_ENGLISH        "Painkiller"

REFERENCE           PERKS_DESC_ENDGAME
LANG_ENGLISH        "Big burst of health before you die."

REFERENCE           PERKS_FLASHGRENADE
LANG_ENGLISH        "Flash Grenade x 3"

REFERENCE           PERKS_DESC_FLASHGRENADE
LANG_ENGLISH        "Blinds and deafens targets."

REFERENCE           PERKS_CONCUSSIONGRENADE
LANG_ENGLISH        "Stun Grenade x 3"

REFERENCE           PERKS_DESC_CONCUSSIONGRENADE
LANG_ENGLISH        "Disorients and slows targets.\\n"

REFERENCE           PERKS_SMOKEGRENADE
LANG_ENGLISH        "Smoke Grenade x 2"

REFERENCE           PERKS_DESC_SMOKEGRENADE
LANG_ENGLISH        "Smoke screen."

REFERENCE           PERKS_EMPGRENADE
LANG_ENGLISH        "EMP Grenade"

REFERENCE           PERKS_SCAVENGER
LANG_ENGLISH        "Scavenger"

REFERENCE           PERKS_DESC_SCAVENGER
LANG_ENGLISH        "Resupply from dead enemies."

REFERENCE           PERKS_DESC_EMPGRENADE
LANG_ENGLISH        "Utilize the grenades of KIA."

REFERENCE           PERKS_SITREP
LANG_ENGLISH        "SitRep"

REFERENCE           PERKS_DESC_SITREP
LANG_ENGLISH        "Enhanced view of explosive devices."

REFERENCE           PERKS_AMPLIFY
LANG_ENGLISH        "Amplify"

REFERENCE           PERKS_DESC_AMPLIFY
LANG_ENGLISH        "Enhanced hearing of enemy footsteps."

REFERENCE           PERKS_EXTENDEDMAGS
LANG_ENGLISH        "Extended Mags"

REFERENCE           PERKS_DESC_EXTENDEDMAGS
LANG_ENGLISH        "More ammo per magazine."

REFERENCE           PERKS_SABOTEUR
LANG_ENGLISH        "Saboteur"

REFERENCE           PERKS_DESC_SABOTEUR
LANG_ENGLISH        "Quickly complete objectives."

REFERENCE           PERKS_COLDBLOODED
LANG_ENGLISH        "Cold-Blooded"

REFERENCE           PERKS_DESC_COLDBLOODED
LANG_ENGLISH        "Undetectable by UAV, air support, sentries, and thermal."

REFERENCE           PERKS_HEARTBREAKER
LANG_ENGLISH        "Heart-Breaker"

REFERENCE           PERKS_DESC_HEARTBREAKER
LANG_ENGLISH        "Invisible to heartbeat sensors."

REFERENCE           PERKS_EXTENDEDMELEE
LANG_ENGLISH        "Commando"

REFERENCE           PERKS_DESC_EXTENDEDMELEE
LANG_ENGLISH        "Increased melee distance."

REFERENCE           PERKS_SELECTIVEHEARING
LANG_ENGLISH        "Selective Hearing"

REFERENCE           PERKS_DESC_SELECTIVEHEARING
LANG_ENGLISH        "+Louder enemy footsteps."

REFERENCE           PERKS_FREERUNNER
LANG_ENGLISH        "Freerunner"

REFERENCE           PERKS_DESC_FREERUNNER
LANG_ENGLISH        "Auto climb quickly? NEEDS DESC"

REFERENCE           PERKS_AUTOMANTLE
LANG_ENGLISH        "Auto-Mantle"

REFERENCE           PERKS_DESC_AUTOMANTLE
LANG_ENGLISH        "Auto-climb OMG NEEDS DESC."

REFERENCE           PERKS_FASTSPRINTRECOVERY
LANG_ENGLISH        "Fast Sprint Recovery"

REFERENCE           PERKS_DESC_FASTSPRINTRECOVERY
LANG_ENGLISH        "+Quick aim after sprinting."

REFERENCE           PERKS_CHALLENGER
LANG_ENGLISH        "Challenger"

REFERENCE           PERKS_DESC_CHALLENGER
LANG_ENGLISH        "Easy death but extra experience."

REFERENCE           PERKS_REARVIEW
LANG_ENGLISH        "Rearview"

REFERENCE           PERKS_DESC_REARVIEW
LANG_ENGLISH        "Minimap is replaced with rear view."

REFERENCE           PERKS_TACTICALINSERTION
LANG_ENGLISH        "Tactical Insertion"

REFERENCE           PERKS_DESC_TACTICALINSERTION
LANG_ENGLISH        "Choose where to respawn."

REFERENCE           PERKS_STINGER
LANG_ENGLISH        "Stinger x 1"

REFERENCE           PERKS_DESC_STINGER
LANG_ENGLISH        "A portable homing surface to air missile."

REFERENCE           PERKS_AKIMBO
LANG_ENGLISH        "Akimbo"

REFERENCE           PERKS_DESC_AKIMBO
LANG_ENGLISH        "Hip fire two weapons."

REFERENCE           PERKS_JAVELIN
LANG_ENGLISH        "Javelin x 1"

REFERENCE           PERKS_DESC_JAVELIN
LANG_ENGLISH        "Rocket launcher with lock-on."

REFERENCE           PERKS_GLOCK
LANG_ENGLISH        "Fully automatic with fast fire rate. Effective at close range."

REFERENCE           PERKS_DESC_SHOTGUN
LANG_ENGLISH        "Undermounted shotgun attachment"

REFERENCE           PERKS_SHOTGUN
LANG_ENGLISH        "Shotgun"

REFERENCE           PERKS_NEWREF
LANG_ENGLISH        "New text"

REFERENCE           PERKS_HARDLINE
LANG_ENGLISH        "Hardline"

REFERENCE           PERKS_DESC_HARDLINE
LANG_ENGLISH        "Killstreaks require 1 less kill."

REFERENCE           PERKS_DESC_BLING
LANG_ENGLISH        "2 primary weapon attachments."

REFERENCE           PERKS_PREDATOR_MISSILE
LANG_ENGLISH        "Predator Missile"

REFERENCE           PERKS_DESC_PREDATOR_MISSILE
LANG_ENGLISH        "4 killstreak for guided missle."

REFERENCE           PERKS_AC130
LANG_ENGLISH        "AC130"

REFERENCE           PERKS_DESC_AC130
LANG_ENGLISH        "7 killstreak for an AC130."

REFERENCE           PERKS_CAREPACKAGE
LANG_ENGLISH        "Care Package"

REFERENCE           PERKS_DESC_CAREPACKAGE
LANG_ENGLISH        "2 killstreak for airdropped supplies."

REFERENCE           PERKS_ONEMANARMY
LANG_ENGLISH        "One Man Army"

REFERENCE           PERKS_DESC_ONEMANARMY
LANG_ENGLISH        "Swap classes at any time."

REFERENCE           PERKS_TANK
LANG_ENGLISH        "6 killstreak for armor support."

REFERENCE           PERKS_PRECISION_AIRSTRIKE
LANG_ENGLISH        "Precision Airstrike"

REFERENCE           PERKS_DESC_PRECISION_AIRSTRIKE
LANG_ENGLISH        "6 killstreak for harrier supported airstrike."

REFERENCE           PERKS_LITTLEBIRD_SUPPORT
LANG_ENGLISH        "OH-6 combat support"

REFERENCE           PERKS_DESC_LITTLEBIRD_SUPPORT
LANG_ENGLISH        "2 killstreak for littlebird support."

REFERENCE           PERKS_DESC_FRAG_X1
LANG_ENGLISH        "Cookable frag grenades."

REFERENCE           PERKS_SEMTEX
LANG_ENGLISH        "Semtex"

REFERENCE           PERKS_DESC_SEMTEX
LANG_ENGLISH        "Timed sticky explosives."

REFERENCE           PERKS_KNIFETHROW
LANG_ENGLISH        "Throwing Knife"

REFERENCE           PERKS_DESC_KNIFETHROW
LANG_ENGLISH        "Throw it and pick it back up."

REFERENCE           PERKS_COMMANDO
LANG_ENGLISH        "Commando"

REFERENCE           PERKS_DESC_COMMANDO
LANG_ENGLISH        "Increased melee distance."

REFERENCE           PERKS_RIOT_SHIELD
LANG_ENGLISH        "Bullet resistant."

REFERENCE           PERKS_MODEL1887
LANG_ENGLISH        "Model 1887"

REFERENCE           PERKS_DESC_MODEL1887
LANG_ENGLISH        "Lever action repeating action shotgun."

REFERENCE           PERKS_FASTSNIPE
LANG_ENGLISH        "Fast Snipe Recovery"

REFERENCE           PERKS_DESC_FASTSNIPE
LANG_ENGLISH        "Quickly steady aim after scoped shots."

REFERENCE           PERKS_IMPROVEDEXTRABREATH
LANG_ENGLISH        "Improved Iron Lungs"

REFERENCE           PERKS_DESC_IMPROVEDEXTRABREATH
LANG_ENGLISH        "Even longer breath for steadier sniper shots."

REFERENCE           PERKS_LAST_STAND_PRIMARY
LANG_ENGLISH        "Primary Stand"

REFERENCE           PERKS_DESC_LAST_STAND_PRIMARY
LANG_ENGLISH        "Use any weapon in Last Stand."

REFERENCE           PERKS_SECONDARY_BLING
LANG_ENGLISH        "Secondary Bling"

REFERENCE           PERKS_DESC_SECONDARY_BLING
LANG_ENGLISH        "+2 secondary weapon attachments."

REFERENCE           PERKS_SPYGAME
LANG_ENGLISH        "Spy Game"

REFERENCE           PERKS_DESC_SPYGAME
LANG_ENGLISH        "+No red crosshair or name when targetted."

REFERENCE           PERKS_SPYGAME2
LANG_ENGLISH        "Spy Game Upgrade"

REFERENCE           PERKS_DESC_SPYGAME2
LANG_ENGLISH        "Enemy crosshairs don't turn red for you."

REFERENCE           PERKS_C4
LANG_ENGLISH        "C4"

REFERENCE           PERKS_CLAYMORE
LANG_ENGLISH        "Claymore"

REFERENCE           PERKS_FRAG_X_2
LANG_ENGLISH        "Frag x 2"

REFERENCE           PERKS_LOCKAIR
LANG_ENGLISH        "Air Vehicle Lockon"

REFERENCE           PERKS_DESC_LOCKAIR
LANG_ENGLISH        "Lock-on to enemy vehicles"

REFERENCE           PERKS_DESC_BOOM
LANG_ENGLISH        "Increased explosion radius"

REFERENCE           PERKS_DESC_ROF
LANG_ENGLISH        "Increased fire rate."

REFERENCE           PERKS_DESC_XMAGS
LANG_ENGLISH        "Extended magazines."

REFERENCE           PERKS_ARCTIC
LANG_ENGLISH        "Arctic camouflage finish."

REFERENCE           PERKS_DIGITAL
LANG_ENGLISH        "Digital camouflage finish."

REFERENCE           PERKS_RED_URBAN
LANG_ENGLISH        "Red urban camouflage finish."

REFERENCE           PERKS_ORANGE_FALL
LANG_ENGLISH        "Orange fall camouflage finish."

REFERENCE           PERKS_GOLDEN
LANG_ENGLISH        "Gold plated finish."

REFERENCE           PERKS_DESC_HEARTBEAT
LANG_ENGLISH        "Track enemy locations."

REFERENCE           PERKS_COMBATHIGH
LANG_ENGLISH        "Pain Killer"

REFERENCE           PERKS_DESC_COMBATHIGH
LANG_ENGLISH        "Big health boost when you spawn.  "

REFERENCE           PERKS_DESC_C4DEATH
LANG_ENGLISH        "Pull out C4 before death."

REFERENCE           PERKS_C4DEATH
LANG_ENGLISH        "Dead Man's Hand"

REFERENCE           PERKS_DESC_SHARPSHOOTER
LANG_ENGLISH        "Play as the Scout Sniper Class."

REFERENCE           PERKS_DESC_CROWD_CONTROL
LANG_ENGLISH        "Play as the Riot Control Class."

REFERENCE           PERKS_DESC_CREATE_A_CLASS
LANG_ENGLISH        "Create and customize your own character classes."

REFERENCE           PERKS_DESC_KILLSTREAK_REWARDS
LANG_ENGLISH        "Create and customize your killstreak rewards."

REFERENCE           PERKS_DESC_CHALLENGES
LANG_ENGLISH        "Complete Challenges to gain experience and unlock a variety of items."

REFERENCE           PERKS_DESC_CLAN_TAGS
LANG_ENGLISH        "Clan tags are now available."

REFERENCE           PERKS_UNLOCKED_BY_CHALLENGE
LANG_ENGLISH        "Unlocked by challenge."

REFERENCE           PERKS_PAINKILLER
LANG_ENGLISH        "Painkiller"

REFERENCE           PERKS_AR_FULLAUTO
LANG_ENGLISH        "Fully automatic, all purpose weapon."

REFERENCE           PERKS_AR_THREEROUND
LANG_ENGLISH        "3 round burst."

REFERENCE           PERKS_AR_SEMIAUTO
LANG_ENGLISH        "Semi-automatic (single fire)"

REFERENCE           PERKS_UPGRADE_AMPLIFY
LANG_ENGLISH        "+Louder Enemy Footsteps"

REFERENCE           PERKS_UPGRADE_QUICKDRAW
LANG_ENGLISH        "+Faster ADS"

REFERENCE           PERKS_UPGRADE_BANDOLIER
LANG_ENGLISH        "+Extra Mags"

REFERENCE           PERKS_UPGRADE_FASTSPRINTRECOVERY
LANG_ENGLISH        "+Quick Aim After Sprinting"

REFERENCE           PERKS_UPGRADE_HEARTBREAKER
LANG_ENGLISH        "+Undetectable Heartbeat"

REFERENCE           PERKS_UPGRADE_STEADY_AIM2
LANG_ENGLISH        "+Even Steadier Aim"

REFERENCE           PERKS_UPGRADE_SECONDARY_BLING
LANG_ENGLISH        "+2 Secondary Attachments"

REFERENCE           PERKS_UPGRADE_UAVJAMMER
LANG_ENGLISH        "+Undetectable On Radar"

REFERENCE           PERKS_UPGRADE_FASTMANTLE
LANG_ENGLISH        "+Climb Faster"

REFERENCE           PERKS_UPGRADE_ARMOR_DAMAGE
LANG_ENGLISH        "+Extra Damage Vs. Vehicles"

REFERENCE           PERKS_UPGRADE_ROLLOVER
LANG_ENGLISH        "+Earlier Deathstreaks"

REFERENCE           PERKS_UPGRADE_QUICKCHANGE
LANG_ENGLISH        "+Faster Class Swap"

REFERENCE           PERKS_UPGRADE_PRIMARYDEATH
LANG_ENGLISH        "+Primary Weapon"

REFERENCE           PERKS_UPGRADE_FASTSNIPE
LANG_ENGLISH        "+Faster Recovery"

REFERENCE           PERKS_UPGRADE_SPYGAME2
LANG_ENGLISH        "+No Red Name or Crosshair"

REFERENCE           PERKS_UPGRADE_SPECIALGRENADE
LANG_ENGLISH        "+Extra Special Grenade"

REFERENCE           PERKS_UPGRADE_FLASHGRENADE
LANG_ENGLISH        "+Extra Flash Grenade"

REFERENCE           PERKS_UPGRADE_STUNGRENADE
LANG_ENGLISH        "+Extra Stun Grenade"

REFERENCE           PERKS_UPGRADE_SMOKEGRENADE
LANG_ENGLISH        "+Extra Smoke Grenade"

REFERENCE           PERKS_UPGRADE_NINJA
LANG_ENGLISH        "+Delay Claymores"

REFERENCE           PERKS_UPGRADE_FASTMELEERECOVER
LANG_ENGLISH        "+Faster Melee Recovery"

REFERENCE           PERKS_UPGRADE_LAST_STAND_OFFHAND
LANG_ENGLISH        "+Use Equipment"

REFERENCE           PERKS_DESC_EOTECH
LANG_ENGLISH        "Holographic sight."

REFERENCE           PERKS_DESC_SPAS12
LANG_ENGLISH        "A semi-automatic combat shotgun. Effective at close range."

REFERENCE           PERKS_DESC_ARMOR_DAMAGE
LANG_ENGLISH        "+Extra damage vs. enemy vehicles."

REFERENCE           PERKS_DESC_QUICKCHANGE
LANG_ENGLISH        "+Swap classes faster."

REFERENCE           PERKS_DESC_ROLLOVER
LANG_ENGLISH        "+Deathstreaks require 1 less death."

REFERENCE           PERKS_LONGSPECIALGRENADES
LANG_ENGLISH        "Shell Shock"

REFERENCE           PERKS_DESC_STEADY_AIM2
LANG_ENGLISH        "hip fire accuracy further increased."

REFERENCE           PERKS_DESC_FASTMELEERECOVER
LANG_ENGLISH        "Quickly recover after melee."

REFERENCE           PERKS_LMG
LANG_ENGLISH        "Fully automatic, large magazines."

REFERENCE           PERKS_SMG
LANG_ENGLISH        "Fully automatic, close range."

REFERENCE           PERKS_SNIPER_BOLT
LANG_ENGLISH        "Bolt action."

REFERENCE           PERKS_SNIPER_SEMIAUTO
LANG_ENGLISH        "Semi-automatic (single fire)"

REFERENCE           PERKS_MPISTOL_FULLAUTO
LANG_ENGLISH        "Fully automatic, close range."

REFERENCE           PERKS_MPISTOL_BURST
LANG_ENGLISH        "3 round burst, close range."

REFERENCE           PERKS_SHOTGUN_SEMIAUTO
LANG_ENGLISH        "Semi-automatic (single fire)"

REFERENCE           PERKS_SHOTGUN_PUMP
LANG_ENGLISH        "Pump action."

REFERENCE           PERKS_SHOTGUN_FULLAUTO
LANG_ENGLISH        "Fully automatic, low ammo."

REFERENCE           PERKS_SHOTGUN_DOUBLE
LANG_ENGLISH        "Double barrel."

REFERENCE           PERKS_SHOTGUN_LEVER
LANG_ENGLISH        "Lever-action."

REFERENCE           PERKS_PISTOL_SEMIAUTO
LANG_ENGLISH        "Semi-automatic (single fire)"

REFERENCE           PERKS_PISTOL_REVOLVER
LANG_ENGLISH        "Revolver."

REFERENCE           PERKS_LAUNCHER_GL
LANG_ENGLISH        "Grenade Launcher."

REFERENCE           PERKS_LAUNCHER_ROCKET
LANG_ENGLISH        "Fires unguided rockets."

REFERENCE           PERKS_LAUNCHER_JAVELIN
LANG_ENGLISH        "Location and vehicle lock-on."

REFERENCE           PERKS_LAUNCHER_STINGER
LANG_ENGLISH        "Vehicle lock-on only."

REFERENCE           PERKS_LAUNCHER_AT4
LANG_ENGLISH        "Free fire or vehicle lock-on."

REFERENCE           PERKS_UPGRADE_IRONLUNGS
LANG_ENGLISH        "+Longer Hold Breath"

REFERENCE           PERKS_UPRGRADE_MARATHON
LANG_ENGLISH        "+Unlimited Sprint"

REFERENCE           PERKS_UPGRADE
LANG_ENGLISH        "&&1 Upgrade"

REFERENCE           PERKS_SLEIGHT_OF_HAND_PRO
LANG_ENGLISH        "Sleight of Hand Pro"

REFERENCE           PERKS_LOCALJAMMER_PRO
LANG_ENGLISH        "Scrambler Pro"

REFERENCE           PERKS_MARATHON_PRO
LANG_ENGLISH        "Marathon Pro"

REFERENCE           PERKS_SCAVENGER_PRO
LANG_ENGLISH        "Scavenger Pro"

REFERENCE           PERKS_STOPPING_POWER_PRO
LANG_ENGLISH        "Stopping Power Pro"

REFERENCE           PERKS_COLDBLOODED_PRO
LANG_ENGLISH        "Cold-Blooded Pro"

REFERENCE           PERKS_LIGHTWEIGHT_PRO
LANG_ENGLISH        "Lightweight Pro"

REFERENCE           PERKS_HARDLINE_PRO
LANG_ENGLISH        "Hardline Pro"

REFERENCE           PERKS_BLING_PRO
LANG_ENGLISH        "Bling Pro"

REFERENCE           PERKS_ONEMANARMY_PRO
LANG_ENGLISH        "One Man Army Pro"

REFERENCE           PERKS_EXTENDEDMELEE_PRO
LANG_ENGLISH        "Commando Pro"

REFERENCE           PERKS_LAST_STAND_PRO
LANG_ENGLISH        "Last Stand Pro"

REFERENCE           PERKS_SONIC_BOOM_PRO
LANG_ENGLISH        "Sonic Boom Pro"

REFERENCE           PERKS_BOMB_SQUAD_PRO
LANG_ENGLISH        "SitRep Pro"

REFERENCE           PERKS_DEAD_SILENCE_PRO
LANG_ENGLISH        "Ninja Pro"

REFERENCE           PERKS_STEADY_AIM_PRO
LANG_ENGLISH        "Steady Aim Pro"

REFERENCE           PERKS_DESC_TACTICAL
LANG_ENGLISH        "Faster melee attack"

REFERENCE           PERKS_COPYCAT
LANG_ENGLISH        "Copycat"

REFERENCE           PERKS_DESC_COPYCAT
LANG_ENGLISH        "Steal your killer's class in killcam."

REFERENCE           PERKS_DESC_LAST_STAND_OFFHAND
LANG_ENGLISH        "+Use equipment in last stand."

REFERENCE           PERKS_DANGERCLOSE_PRO
LANG_ENGLISH        "Danger Close Pro"

REFERENCE           PERKS_DESC_DANGERCLOSE
LANG_ENGLISH        "+Extra air support damage."

REFERENCE           PERKS_DANGERCLOSE
LANG_ENGLISH        "Danger Close"

REFERENCE           PERKS_UPGRADE_DANGERCLOSE
LANG_ENGLISH        "+Extra Air Support Damage"

REFERENCE           PERKS_UPGRADE_SONICBOOM
LANG_ENGLISH        "+Extra explosive weapon damage"

REFERENCE           PERKS_RAPID_FIRE
LANG_ENGLISH        "Rapid Fire"

REFERENCE           PERKS_DEATHS_WITHOUT_KILL
LANG_ENGLISH        " (&&1 deaths without a kill)"

REFERENCE           PERKS_SMG_RAPID
LANG_ENGLISH        "Fully automatic, high fire rate."

REFERENCE           PERKS_SMG_AMMO
LANG_ENGLISH        "Fully automatic, large magazines."

REFERENCE           PERKS_SMG_DAMAGE
LANG_ENGLISH        "Fully automatic, powerful."

REFERENCE           PERKS_LMG_RAPID
LANG_ENGLISH        "Fully automatic, high fire rate."

REFERENCE           PERKS_LMG_AUG
LANG_ENGLISH        "Fully automatic, high accuracy and damage."

REFERENCE           PERKS_GHILLIE_ARCTIC
LANG_ENGLISH        "Arctic Ghillie"

REFERENCE           PERKS_DESC_GHILLIE_ARCTIC
LANG_ENGLISH        "You will now be camouflaged when sniping in snowy environments."

REFERENCE           PERKS_DESC_GHILLIE_DESERT
LANG_ENGLISH        "You will now be camouflaged when sniping in desert environments."

REFERENCE           PERKS_DESC_GHILLIE_URBAN
LANG_ENGLISH        "You will now be camouflaged when sniping in urban environments."

REFERENCE           PERKS_GHILLIE_URBAN
LANG_ENGLISH        "Urban Ghillie"

REFERENCE           PERKS_GHILLIE_DESERT
LANG_ENGLISH        "Desert Ghillie"

REFERENCE           KILLSTREAKS_UAV
LANG_ENGLISH        "UAV"

REFERENCE           KILLSTREAKS_UAV_DESC
LANG_ENGLISH        "Shows enemies on the minimap."

REFERENCE           KILLSTREAKS_AIRSTRIKE
LANG_ENGLISH        "Airstrike"

REFERENCE           KILLSTREAKS_AIRSTRIKE_DESC
LANG_ENGLISH        "Call in an air strike on selected position."

REFERENCE           KILLSTREAKS_HELICOPTER
LANG_ENGLISH        "Attack Helicopter"

REFERENCE           KILLSTREAKS_HELICOPTER_DESC
LANG_ENGLISH        "Call in a support helicopter."

REFERENCE           KILLSTREAKS_AC130
LANG_ENGLISH        "AC130"

REFERENCE           KILLSTREAKS_AC130_DESC
LANG_ENGLISH        "Be the gunner of an AC130."

REFERENCE           KILLSTREAKS_PREDATOR_MISSILE
LANG_ENGLISH        "Predator Missile"

REFERENCE           KILLSTREAKS_PREDATOR_MISSILE_DESC
LANG_ENGLISH        "Remote control missile."

REFERENCE           KILLSTREAKS_HELICOPTER_MINIGUN
LANG_ENGLISH        "Chopper Gunner"

REFERENCE           KILLSTREAKS_HELICOPTER_MINIGUN_DESC
LANG_ENGLISH        "Be the gunner of an attack helicopter."

REFERENCE           KILLSTREAKS_HELICOPTER_MK19
LANG_ENGLISH        "Helicopter Gunner"

REFERENCE           KILLSTREAKS_HELICOPTER_MK19_DESC
LANG_ENGLISH        "Remote control of a helicopter GL."

REFERENCE           KILLSTREAKS_DOUBLE_UAV
LANG_ENGLISH        "Advanced UAV"

REFERENCE           KILLSTREAKS_DOUBLE_UAV_DESC
LANG_ENGLISH        "UAV with faster sweep time."

REFERENCE           KILLSTREAKS_PRECISION_AIRSTRIKE
LANG_ENGLISH        "Precision Airstrike"

REFERENCE           KILLSTREAKS_PRECISION_AIRSTRIKE_DESC
LANG_ENGLISH        "Call in a directional airstrike."

REFERENCE           KILLSTREAKS_AIRDROP
LANG_ENGLISH        "Care Package"

REFERENCE           KILLSTREAKS_AIRDROP_DESC
LANG_ENGLISH        "Airdrop a random killstreak or ammo."

REFERENCE           KILLSTREAKS_AIRDROP_SENTRY
LANG_ENGLISH        "Sentry Gun"

REFERENCE           KILLSTREAKS_AIRDROP_SENTRY_DESC
LANG_ENGLISH        "Airdrop a placeable Sentry Gun."

REFERENCE           KILLSTREAKS_AIRDROP_PREDATOR
LANG_ENGLISH        "Care Package (Predator)"

REFERENCE           KILLSTREAKS_AIRDROP_PREDATOR_DESC
LANG_ENGLISH        "Drops a single use predator missile."

REFERENCE           KILLSTREAKS_HARRIER_AIRSTRIKE
LANG_ENGLISH        "Harrier Strike"

REFERENCE           KILLSTREAKS_HARRIER_AIRSTRIKE_DESC
LANG_ENGLISH        "Airstrike with a hovering Harrier.\\n"

REFERENCE           KILLSTREAKS_STEALTH_AIRSTRIKE
LANG_ENGLISH        "Stealth Bomber"

REFERENCE           KILLSTREAKS_STEALTH_AIRSTRIKE_DESC
LANG_ENGLISH        "Airstrike undetectable on enemy maps."

REFERENCE           KILLSTREAKS_SUPER_AIRSTRIKE
LANG_ENGLISH        "Super Airstrike"

REFERENCE           KILLSTREAKS_SUPER_AIRSTRIKE_DESC
LANG_ENGLISH        "Airstrike with some extra kick."

REFERENCE           KILLSTREAKS_HELICOPTER_BLACKBOX
LANG_ENGLISH        "Helicopter Blackbox"

REFERENCE           KILLSTREAKS_HELICOPTER_BLACKBOX_DESC
LANG_ENGLISH        "Longer lasting helicopter."

REFERENCE           KILLSTREAKS_HELICOPTER_FLARES
LANG_ENGLISH        "Defensive Helicopter"

REFERENCE           KILLSTREAKS_HELICOPTER_FLARES_DESC
LANG_ENGLISH        "Helicopter with flares."

REFERENCE           KILLSTREAKS_EMP
LANG_ENGLISH        "EMP"

REFERENCE           KILLSTREAKS_EMP_DESC
LANG_ENGLISH        "Temporarily disables enemy electronics."

REFERENCE           KILLSTREAKS_TANK
LANG_ENGLISH        "Tank"

REFERENCE           KILLSTREAKS_TANK_DESC
LANG_ENGLISH        "A tank."

REFERENCE           KILLSTREAKS_COUNTER_UAV
LANG_ENGLISH        "Counter-UAV"

REFERENCE           KILLSTREAKS_COUNTER_UAV_DESC
LANG_ENGLISH        "Temporarily disables enemy radar."

REFERENCE           KILLSTREAKS_PAVELOW
LANG_ENGLISH        "Pave Low"

REFERENCE           KILLSTREAKS_PAVELOW_DESC
LANG_ENGLISH        "Heavily armored assault helicopter."

REFERENCE           KILLSTREAKS_NONE
LANG_ENGLISH        "None"

REFERENCE           KILLSTREAKS_NONE_DESC
LANG_ENGLISH        "No kill streak selected."

REFERENCE           KILLSTREAKS_AIRDROP_MEGA
LANG_ENGLISH        "Emergency Airdrop"

REFERENCE           KILLSTREAKS_AIRDROP_MEGA_DESC
LANG_ENGLISH        "Airdrop 4 random killstreaks or ammo."

REFERENCE           KILLSTREAKS_EARNED_AIRDROP_MEGA
LANG_ENGLISH        "Press [{+actionslot 4}] for EMERGENCY AIRDROP.\\n"

REFERENCE           KILLSTREAKS_TACTICAL_NUKE
LANG_ENGLISH        "Tactical Nuke"

REFERENCE           KILLSTREAKS_TACTICAL_NUKE_DESC
LANG_ENGLISH        "End the game with a bang."

REFERENCE           KILLSTREAKS_SENTRY
LANG_ENGLISH        "Sentry Gun"

REFERENCE           SPLASHES_HEADSHOT
LANG_ENGLISH        "Headshot!"

REFERENCE           SPLASHES_HEADSHOT_DESC
LANG_ENGLISH        "^3+&&1"

REFERENCE           SPLASHES_ASSISTEDSUICIDE
LANG_ENGLISH        "Assisted Suicide!"

REFERENCE           SPLASHES_ASSISTEDSUICIDE_DESC
LANG_ENGLISH        "You have assisted the suicide of an enemy. ^3+&&1"

REFERENCE           SPLASHES_LONGSHOT
LANG_ENGLISH        "Longshot!"

REFERENCE           SPLASHES_LONGSHOT_DESC
LANG_ENGLISH        "Nice kill from a distance! (^3+&&1^7)"

REFERENCE           SPLASHES_EXECUTION
LANG_ENGLISH        "Execution!"

REFERENCE           SPLASHES_EXECUTION_DESC
LANG_ENGLISH        "^3+&&1"

REFERENCE           SPLASHES_AVENGER
LANG_ENGLISH        "Avenger!"

REFERENCE           SPLASHES_AVENGER_DESC
LANG_ENGLISH        "You've avenged a team-mate. (^3+&&1^7)"

REFERENCE           SPLASHES_DEFENDER
LANG_ENGLISH        "Rescuer!"

REFERENCE           SPLASHES_DEFENDER_DESC
LANG_ENGLISH        "You've rescued a team-mate. (^3+&&1^7)"

REFERENCE           SPLASHES_POSTHUMOUS
LANG_ENGLISH        "Afterlife!"

REFERENCE           SPLASHES_POSTHUMOUS_DESC
LANG_ENGLISH        "You killed an enemy after you died. (^3+&&1^7)"

REFERENCE           SPLASHES_REVENGE
LANG_ENGLISH        "Payback!"

REFERENCE           SPLASHES_REVENGE_DESC
LANG_ENGLISH        "You've taken revenge. (^3+&&1^7)"

REFERENCE           SPLASHES_DOUBLEKILL
LANG_ENGLISH        "Double Kill!"

REFERENCE           SPLASHES_DOUBLEKILL_DESC
LANG_ENGLISH        "^3+&&1"

REFERENCE           SPLASHES_TRIPLEKILL
LANG_ENGLISH        "Triple Kill!"

REFERENCE           SPLASHES_TRIPLEKILL_DESC
LANG_ENGLISH        "^3+&&1"

REFERENCE           SPLASHES_MULTIKILL
LANG_ENGLISH        "Multi-Kill!"

REFERENCE           SPLASHES_MULTIKILL_DESC
LANG_ENGLISH        "^3+&&1"

REFERENCE           SPLASHES_FIRSTBLOOD
LANG_ENGLISH        "First Blood!"

REFERENCE           SPLASHES_FIRSTBLOOD_DESC
LANG_ENGLISH        "You got the first kill. (^3+&&1^7)"

REFERENCE           SPLASHES_BUZZKILL
LANG_ENGLISH        "Buzzkill!"

REFERENCE           SPLASHES_BUZZKILL_DESC
LANG_ENGLISH        "Stopped enemy short of a killstreak. (^3+&&1^7)"

REFERENCE           SPLASHES_COMEBACK
LANG_ENGLISH        "Comeback!"

REFERENCE           SPLASHES_COMEBACK_DESC
LANG_ENGLISH        "You've recovered from a streak of deaths. (^3+&&1^7)"

REFERENCE           SPLASHES_FLAGRETURN
LANG_ENGLISH        "Flag Return!"

REFERENCE           SPLASHES_FLAGRETURN_DESC
LANG_ENGLISH        "^3+&&1"

REFERENCE           SPLASHES_FLAGPICKUP
LANG_ENGLISH        "Flag Runner!"

REFERENCE           SPLASHES_FLAGPICKUP_DESC
LANG_ENGLISH        "^3+&&1"

REFERENCE           SPLASHES_CAPTURE
LANG_ENGLISH        "Position Secure!"

REFERENCE           SPLASHES_CAPTURE_DESC
LANG_ENGLISH        "You've taken an objective. (^3+&&1^7)"

REFERENCE           SPLASHES_DEFEND
LANG_ENGLISH        "Defense!"

REFERENCE           SPLASHES_DEFEND_DESC
LANG_ENGLISH        "You defended the objective. (^3+&&1^7)"

REFERENCE           SPLASHES_ASSAULT
LANG_ENGLISH        "Offense!"

REFERENCE           SPLASHES_ASSAULT_DESC
LANG_ENGLISH        "You killed a defender. (^3+&&1^7)"

REFERENCE           SPLASHES_PLANT
LANG_ENGLISH        "Saboteur!"

REFERENCE           SPLASHES_PLANT_DESC
LANG_ENGLISH        "You planted the bomb. (^3+&&1^7)"

REFERENCE           SPLASHES_DEFUSE
LANG_ENGLISH        "Hero!"

REFERENCE           SPLASHES_DEFUSE_DESC
LANG_ENGLISH        "You defused the bomb. (^3+&&1^7)"

REFERENCE           SPLASHES_SAB_OVERTIME
LANG_ENGLISH        "Overtime!"

REFERENCE           SPLASHES_SAB_OVERTIME_DESC
LANG_ENGLISH        "The base nearest to the bomb will be destroyed."

REFERENCE           SPLASHES_MARTYRDOM_DESC
LANG_ENGLISH        "You'll drop a live grenade upon death."

REFERENCE           SPLASHES_FINALSTAND_DESC
LANG_ENGLISH        "You'll get a second chance when you're down."

REFERENCE           SPLASHES_ENDGAME_DESC
LANG_ENGLISH        "You've got extra health for the next few seconds."

REFERENCE           SPLASHES_C4DEATH_DESC
LANG_ENGLISH        "Pull out C4 before you die."

REFERENCE           SPLASHES_KNIFETHROW_DESC
LANG_ENGLISH        "You killed an enemy with a throwing knife."

REFERENCE           SPLASHES_KNIFETHROW
LANG_ENGLISH        "Bullseye!"

REFERENCE           SPLASHES_HIJACKER_DESC
LANG_ENGLISH        "You captured an enemy supply crate."

REFERENCE           SPLASHES_HIJACKER
LANG_ENGLISH        "Hijacker!"

REFERENCE           SPLASHES_HIJACKED
LANG_ENGLISH        "&&1 captured your supply crate."

REFERENCE           SPLASHES_DEFCON_LOWER
LANG_ENGLISH        "DEFCON Lowered!"

REFERENCE           SPLASHES_DEFCON_RAISE
LANG_ENGLISH        "DEFCON Raised"

REFERENCE           SPLASHES_DEFCON_LOWER_DESC
LANG_ENGLISH        "Killstreaks upgraded!"

REFERENCE           SPLASHES_DEFCON_RAISE_DESC
LANG_ENGLISH        "Killstreaks downgraded."

REFERENCE           SPLASHES_DEFCON_5
LANG_ENGLISH        "DEFCON 5"

REFERENCE           SPLASHES_DEFCON_4
LANG_ENGLISH        "DEFCON 4"

REFERENCE           SPLASHES_DEFCON_3
LANG_ENGLISH        "DEFCON 3"

REFERENCE           SPLASHES_DEFCON_2
LANG_ENGLISH        "DEFCON 2"

REFERENCE           SPLASHES_DEFCON_1
LANG_ENGLISH        "DEFCON 1"

REFERENCE           SPLASHES_DEFCON_5_DESC
LANG_ENGLISH        "DEFCON 5"

REFERENCE           SPLASHES_DEFCON_4_DESC
LANG_ENGLISH        "Match starting!"

REFERENCE           SPLASHES_DEFCON_3_DESC
LANG_ENGLISH        "Emergency airdrop incoming!"

REFERENCE           SPLASHES_DEFCON_2_DESC
LANG_ENGLISH        "Killstreaks rollover!"

REFERENCE           SPLASHES_DEFCON_1_DESC
LANG_ENGLISH        "Double points for objectives!"

REFERENCE           SPLASHES_COMBATHIGH_DESC
LANG_ENGLISH        "Increased health for a short time."

REFERENCE           SPLASHES_RESTED
LANG_ENGLISH        "Daily XP Boost!"

REFERENCE           SPLASHES_RESTED_DESC
LANG_ENGLISH        "Earning your daily bonus XP!"

REFERENCE           SPLASHES_RESTED_DONE
LANG_ENGLISH        "Daily XP Boost Done."

REFERENCE           SPLASHES_RESTED_DONE_DESC
LANG_ENGLISH        "Bonus XP acquired."

REFERENCE           SPLASHES_VIP
LANG_ENGLISH        "You are the VIP"

REFERENCE           SPLASHES_STUCK_SEMTEX
LANG_ENGLISH        "Stuck!"

REFERENCE           SPLASHES_STUCK_SEMTEX_DESC
LANG_ENGLISH        "You stuck an enemy with Semtex!"

REFERENCE           SPLASHES_HEROIC
LANG_ENGLISH        "Heroic!"

REFERENCE           SPLASHES_HEROIC_DESC
LANG_ENGLISH        "You captured an objective in last stand!"

REFERENCE           SPLASHES_DENIED
LANG_ENGLISH        "Denied!"

REFERENCE           SPLASHES_DENIED_DESC
LANG_ENGLISH        "You destroyed an enemy tactical insertion!"

REFERENCE           SPLASHES_DESTROYED_INSERTION
LANG_ENGLISH        "Blocked your TI!"

REFERENCE           SPLASHES_HIJACKED_EMERGENCY_AIRDROP
LANG_ENGLISH        "Took your crate!"

REFERENCE           SPLASHES_REVIVER_DESC
LANG_ENGLISH        "You revived a fallen teamate."

REFERENCE           SPLASHES_REVIVER
LANG_ENGLISH        "Reviver!"

REFERENCE           SPLASHES_GIVEAWAY_SENTRY
LANG_ENGLISH        "...took a Sentry Gun"

REFERENCE           SPLASHES_GIVEAWAY_AIRDROP
LANG_ENGLISH        "... took an airdropped Killstreak."

REFERENCE           SPLASHES_SEMTEX_STUCK
LANG_ENGLISH        "Stuck you with Semtex"

REFERENCE           SPLASHES_ONE_SHOT_KILL
LANG_ENGLISH        "One Shot Kill"

REFERENCE           SPLASHES_ONE_SHOT_KILL_DESC
LANG_ENGLISH        "One shot... one kill"

REFERENCE           SPLASHES_NINJA_DEFUSE
LANG_ENGLISH        "Ninja Defuse"

REFERENCE           SPLASHES_NINJA_DEFUSE_DESC
LANG_ENGLISH        "Sneaky sneaky..."

REFERENCE           SPLASHES_COPYCAT_DESC
LANG_ENGLISH        "Steal your killer's class during killcam."

REFERENCE           SPLASHES_COPIED
LANG_ENGLISH        "Copied class!"

REFERENCE           SPLASHES_REVIVED
LANG_ENGLISH        "Revived You"

REFERENCE           SPLASHES_LAST_TEAM_MEMBER_ALIVE
LANG_ENGLISH        "Last Alive!"

REFERENCE           SPLASHES_LAST_ENEMY_ALIVE
LANG_ENGLISH        "Last Alive!"

REFERENCE           SPLASHES_SHIELDASSIST
LANG_ENGLISH        "Crowd Control!"

REFERENCE           SPLASHES_SHIELDASSIST_DESC
LANG_ENGLISH        "You make an excellent distraction."

REFERENCE           SPLASHES_DESTROYED_HELICOPTER
LANG_ENGLISH        "Destroyed Helicopter!"

REFERENCE           SPLASHES_DESTROYED_PAVELOW
LANG_ENGLISH        "Destroyed Pavelow!"

REFERENCE           SPLASHES_DESTROYED_UAV
LANG_ENGLISH        "Destroyed UAV!"

REFERENCE           SPLASHES_DESTROYED_HARRIER
LANG_ENGLISH        "Destroyed Harrier!"

REFERENCE           SPLASHES_DESTROYED_AC130
LANG_ENGLISH        "Destroyed AC130!"

REFERENCE           SPLASHES_DESTROYED_MINIGUNNER
LANG_ENGLISH        "Destroyed Gunship!"

REFERENCE           SPLASHES_FLAG_RETURN
LANG_ENGLISH        "Returned Flag!"

REFERENCE           SPLASHES_FLAG_CAPTURE
LANG_ENGLISH        "Captured Flag!"

REFERENCE           SPLASHES_FLAG_PICKUP_FRIENDLY
LANG_ENGLISH        "Took Your Flag!"

REFERENCE           SPLASHES_FLAG_PICKUP_ENEMY
LANG_ENGLISH        "Took Enemy Flag!"

REFERENCE           SPLASHES_FLAG_PICKUP
LANG_ENGLISH        "Took the Flag!"

REFERENCE           SPLASHES_CAPTURED_NUKE
LANG_ENGLISH        "Nuke Captured!"

REFERENCE           SPLASHES_DESC_CAPTURED_NUKE
LANG_ENGLISH        "You've captured the nuke."

REFERENCE           SPLASHES_UNLOCKED_EXTENDED_MAGS
LANG_ENGLISH        "Extended Mags unlocked!"

REFERENCE           SPLASHES_UNLOCKED_HEARTBEAT
LANG_ENGLISH        "Heartbeat Sensor unlocked!"

REFERENCE           SPLASHES_UNLOCKED_AKIMBO
LANG_ENGLISH        "Akimbo unlocked!"

REFERENCE           SPLASHES_UNLOCKED_THERMAL
LANG_ENGLISH        "Thermal Scope unlocked!"

REFERENCE           SPLASHES_UNLOCKED_EOTECH
LANG_ENGLISH        "Holographic Sight unlocked!"

REFERENCE           SPLASHES_UNLOCKED_SHOTGUN
LANG_ENGLISH        "Shotgun unlocked!"

REFERENCE           SPLASHES_GRABBED_THE_FLAG
LANG_ENGLISH        "Grabbed the flag!"

REFERENCE           SPLASHES_HIJACKED_SENTRY
LANG_ENGLISH        "Took Your Sentry!"

REFERENCE           SPLASHES_HIJACKED_AIRDROP
LANG_ENGLISH        "Took Your Crate!"

REFERENCE           SPLASHES_BOMB_PLANTED
LANG_ENGLISH        "Planted Bomb!"

REFERENCE           SPLASHES_BOMB_DEFUSED
LANG_ENGLISH        "Defused Bomb!"

REFERENCE           SPLASHES_TIMEADDED
LANG_ENGLISH        "Time Added!"

REFERENCE           SPLASHES_GTNW_OVERTIME
LANG_ENGLISH        "Sudden Death!"

REFERENCE           SPLASHES_GTNW_OVERTIME_DESC
LANG_ENGLISH        "No respawning."

REFERENCE           SPLASHES_DESTROYED_OBJECTIVE
LANG_ENGLISH        "Destroyed Objective!"

REFERENCE           SPLASHES_SAVED_OBJECTIVE
LANG_ENGLISH        "Saved Objective!"

REFERENCE           SPLASHES_CAPTURED_HQ
LANG_ENGLISH        "Captured HQ!"

REFERENCE           SPLASHES_DESTROYED_HQ
LANG_ENGLISH        "Destroyed HQ!"

REFERENCE           SPLASHES_BOMB_TAKEN
LANG_ENGLISH        "Took Bomb!"

REFERENCE           SPLASHES_BOMB_DROPPED
LANG_ENGLISH        "Dropped Bomb!"

REFERENCE           SPLASHES_KILLED_CARRIER
LANG_ENGLISH        "Killed Bomb Carrier!"

REFERENCE           SPLASHES_SHAREPACKAGE
LANG_ENGLISH        "Share Package!"

REFERENCE           SPLASHES_SHAREPACKAGE_DESC
LANG_ENGLISH        "A teammate saved your Care Package from the enemy! (^3+&&1^7)"

REFERENCE           SPLASHES_DESTROYED_COUNTER_UAV
LANG_ENGLISH        "Restored UAV!"

REFERENCE           SPLASHES_FLAGS_CAPTURE
LANG_ENGLISH        "Captured a Flag!"

REFERENCE           SPLASHES_FLAG_ASSAULT
LANG_ENGLISH        "Flag Assault!"

REFERENCE           SPLASHES_FLAG_DEFEND
LANG_ENGLISH        "Flag Defend!"

REFERENCE           SPLASHES_FLAG_ASSAULT_DESC
LANG_ENGLISH        "You killed a flag defender. (^3+&&1^7)"

REFERENCE           SPLASHES_FLAG_DEFEND_DESC
LANG_ENGLISH        "You defended the flag. (^3+&&1^7)"

REFERENCE           SPLASHES_FLAG_CAPTURED
LANG_ENGLISH        "Flag Captured!"

REFERENCE           SPLASHES_FLAG_CAPTURED_DESC
LANG_ENGLISH        "You've captured the enemy flag. (^3+&&1^7)"

REFERENCE           SPLASHES_SECURED_POSITION
LANG_ENGLISH        "Secured Position!"

REFERENCE           SPLASHES_SECURED_POSITION_A
LANG_ENGLISH        "Secured A!"

REFERENCE           SPLASHES_SECURED_POSITION_B
LANG_ENGLISH        "Secured B!"

REFERENCE           SPLASHES_SECURED_POSITION_C
LANG_ENGLISH        "Secured C!"

REFERENCE           SPLASHES_TIME_ADDED
LANG_ENGLISH        "Time Extension!"

REFERENCE           SPLASHES_TIME_ADDED_DESC
LANG_ENGLISH        "Bomb site destroyed. Game time extended."

REFERENCE           CHALLENGE_ASSAULT
LANG_ENGLISH        "Assault"

REFERENCE           CHALLENGE_SMG
LANG_ENGLISH        "SMG"

REFERENCE           CHALLENGE_LMG
LANG_ENGLISH        "LMG"

REFERENCE           CHALLENGE_SHOTGUN
LANG_ENGLISH        "Shotgun"

REFERENCE           CHALLENGE_SNIPER
LANG_ENGLISH        "Sniper"

REFERENCE           CHALLENGE_BOOT_CAMP
LANG_ENGLISH        "Boot Camp"

REFERENCE           CHALLENGE_OPERATIONS
LANG_ENGLISH        "Operations"

REFERENCE           CHALLENGE_KILLER
LANG_ENGLISH        "Killer"

REFERENCE           CHALLENGE_HUMILIATION
LANG_ENGLISH        "Humiliation"

REFERENCE           CHALLENGE_ELITE
LANG_ENGLISH        "Elite"

REFERENCE           CHALLENGE_BOOT_CAMP_CHALLENGES
LANG_ENGLISH        "Boot Camp challenges"

REFERENCE           CHALLENGE_OPERATIONS_CHALLENGES
LANG_ENGLISH        "Individuals play the game, but teams beat the odds."

REFERENCE           CHALLENGE_KILLER_CHALLENGES
LANG_ENGLISH        "Killer challenges"

REFERENCE           CHALLENGE_HUMILIATION_CHALLENGES
LANG_ENGLISH        "Terminate with extreme prejudice."

REFERENCE           CHALLENGE_ELITE_CHALLENGES
LANG_ENGLISH        "An amateur practices until he can get it right, a professional practices until he can't get it wrong."

REFERENCE           CHALLENGE_FLYSWATTER
LANG_ENGLISH        "Flyswatter"

REFERENCE           CHALLENGE_GOODBYE
LANG_ENGLISH        "Goodbye"

REFERENCE           CHALLENGE_BASE_JUMP
LANG_ENGLISH        "Base Jump"

REFERENCE           CHALLENGE_KILL_3_ENEMIES_WITHOUT
LANG_ENGLISH        "Call in a UAV."

REFERENCE           CHALLENGE_KILL_5_ENEMIES_WITHOUT
LANG_ENGLISH        "Call in an airstrike."

REFERENCE           CHALLENGE_KILL_7_ENEMIES_WITHOUT
LANG_ENGLISH        "Call in a chopper."

REFERENCE           CHALLENGE_SHOOT_DOWN_AN_ENEMY_HELICOPTER
LANG_ENGLISH        "Shoot down an enemy helicopter."

REFERENCE           CHALLENGE_FALL_30_FEET_OR_MORE
LANG_ENGLISH        "Fall 30 feet or more to your death."

REFERENCE           CHALLENGE_FALL_15_FEET_OR_MORE
LANG_ENGLISH        "Fall 15 feet or more and survive."

REFERENCE           CHALLENGE_MVP_TEAM_DEATHMATCH
LANG_ENGLISH        "MVP Team Deathmatch"

REFERENCE           CHALLENGE_MVP_TEAM_HARDCORE
LANG_ENGLISH        "MVP Team Hardcore"

REFERENCE           CHALLENGE_BOMB_DOWN
LANG_ENGLISH        "Bomb Down"

REFERENCE           CHALLENGE_BOMB_DEFENDER
LANG_ENGLISH        "Bomb Defender"

REFERENCE           CHALLENGE_BOMB_PLANTER
LANG_ENGLISH        "Bomb Prevention"

REFERENCE           CHALLENGE_DEFUSER
LANG_ENGLISH        "Defuser"

REFERENCE           CHALLENGE_LAST_MAN_STANDING
LANG_ENGLISH        "Last Man Standing"

REFERENCE           CHALLENGE_PLAY_TEAM_DEATHMATCH
LANG_ENGLISH        "Play Team Deathmatch and get the top score overall."

REFERENCE           CHALLENGE_WIN_A_TEAM_HARDCORE_MATCH
LANG_ENGLISH        "Win a Team Hardcore match with the top score."

REFERENCE           CHALLENGE_KILL_THE_BOMB_CARRIER
LANG_ENGLISH        "Kill a bomb carrier in Sabotage or Search and Destroy."

REFERENCE           CHALLENGE_KILL_A_BOMB_DEFUSER_IN
LANG_ENGLISH        "Kill &&1 enemies while they are defusing a bomb."

REFERENCE           CHALLENGE_KILL_A_BOMB_PLANTER_IN
LANG_ENGLISH        "Kill &&1 enemies while they are planting a bomb."

REFERENCE           CHALLENGE_DEFUSE_A_BOMB_IN_SABOTAGE
LANG_ENGLISH        "Defuse &&1 bombs."

REFERENCE           CHALLENGE_BE_THE_LAST_MAN_STANDING
LANG_ENGLISH        "Be the last man standing in Search and Destroy."

REFERENCE           CHALLENGE_CLAYMORE_SHOT
LANG_ENGLISH        "Claymore Shot"

REFERENCE           CHALLENGE_ASSAULT_EXPERT
LANG_ENGLISH        "Assault Expert"

REFERENCE           CHALLENGE_SMG_EXPERT
LANG_ENGLISH        "SMG Expert"

REFERENCE           CHALLENGE_LMG_EXPERT
LANG_ENGLISH        "LMG Expert"

REFERENCE           CHALLENGE_LAST_STAND_VETERAN
LANG_ENGLISH        "Last Stand Veteran"

REFERENCE           CHALLENGE_MASTER_CHEF
LANG_ENGLISH        "Master Chef"

REFERENCE           CHALLENGE_AIRSTRIKE_VETERAN
LANG_ENGLISH        "Airstrike Veteran"

REFERENCE           CHALLENGE_CHOPPER_VETERAN
LANG_ENGLISH        "Chopper Veteran"

REFERENCE           CHALLENGE_STUN_VETERAN
LANG_ENGLISH        "Stun Veteran"

REFERENCE           CHALLENGE_MARTYRDOM_VETERAN
LANG_ENGLISH        "Martyrdom Veteran"

REFERENCE           CHALLENGE_STEALTH
LANG_ENGLISH        "Stealth"

REFERENCE           CHALLENGE_INVISIBLE
LANG_ENGLISH        "Invisible"

REFERENCE           CHALLENGE_COUNTERCLAYMORE
LANG_ENGLISH        "Counter-Claymore"

REFERENCE           CHALLENGE_COUNTERC4
LANG_ENGLISH        "Counter-C4"

REFERENCE           CHALLENGE_MULTIRPG
LANG_ENGLISH        "Multi-RPG"

REFERENCE           CHALLENGE_CLAY_MORE
LANG_ENGLISH        "Clay More"

REFERENCE           CHALLENGE_KILL_5_ENEMIES_BY_USING
LANG_ENGLISH        "Kill &&1 enemies with claymores."

REFERENCE           CHALLENGE_KILL_N_ENEMIES_WITH_A1
LANG_ENGLISH        "Kill &&1 enemies with a headshot while using an assault rifle."

REFERENCE           CHALLENGE_KILL_25_ENEMIES_WITH
LANG_ENGLISH        "Kill 25 enemies with a headshot while using an assault rifle. (Phase 2 of 3)"

REFERENCE           CHALLENGE_KILL_50_ENEMIES_WITH
LANG_ENGLISH        "Kill 50 enemies with a headshot while using an assault rifle. (Phase 3 of 3)"

REFERENCE           CHALLENGE_KILL_N_ENEMIES_WITH_HEADSHOTS
LANG_ENGLISH        "Kill &&1 enemies with headshots while using a submachine gun."

REFERENCE           CHALLENGE_KILL_N_ENEMIES_WITH_HEADSHOTS1
LANG_ENGLISH        "Kill &&1 enemies with headshots while using a light machine gun."

REFERENCE           CHALLENGE_KILL_N_ENEMY_WHILE_USING
LANG_ENGLISH        "Kill &&1 enemies while using the Last Stand perk."

REFERENCE           CHALLENGE_KILL_N_ENEMIES_WITH_COOKED
LANG_ENGLISH        "Kill &&1 enemies with cooked grenades."

REFERENCE           CHALLENGE_KILL_N_ENEMIES_BY_CALLING
LANG_ENGLISH        "Kill &&1 enemies by calling in airstrikes."

REFERENCE           CHALLENGE_KILL_N_ENEMIES_BY_CALLING1
LANG_ENGLISH        "Kill &&1 enemies by calling in helicopters."

REFERENCE           CHALLENGE_KILL_N_ENEMIES_STILL
LANG_ENGLISH        "Kill &&1 enemies still dazed by a stun grenade."

REFERENCE           CHALLENGE_KILL_2_OR_MORE_ENEMIES
LANG_ENGLISH        "Kill 2 or more enemies with a single RPG shot, &&1 times."

REFERENCE           CHALLENGE_KILL_N_ENEMY_WITH_A_DROPPED
LANG_ENGLISH        "Kill &&1 enemies with a dropped grenade from the Martyrdom Deathstreak."

REFERENCE           CHALLENGE_KILL_2_OR_MORE_ENEMIES1
LANG_ENGLISH        "Kill 2 or more enemies with a single claymore, &&1 times."

REFERENCE           CHALLENGE_KILL_N_ENEMIES_BY_SHOOTING
LANG_ENGLISH        "Kill &&1 enemies by shooting a claymore."

REFERENCE           CHALLENGE_KILL_N_ENEMIES_BY_SHOOTING1
LANG_ENGLISH        "Kill &&1 enemies by shooting C4."

REFERENCE           CHALLENGE_AIRBORNE
LANG_ENGLISH        "Airborne"

REFERENCE           CHALLENGE_MULTIFRAG
LANG_ENGLISH        "Multi-frag"

REFERENCE           CHALLENGE_CARPET_BOMB
LANG_ENGLISH        "Carpet Bomb"

REFERENCE           CHALLENGE_MG_MASTER
LANG_ENGLISH        "MG Master"

REFERENCE           CHALLENGE_SLASHER
LANG_ENGLISH        "Slasher"

REFERENCE           CHALLENGE_MULTIC4
LANG_ENGLISH        "Multi-C4"

REFERENCE           CHALLENGE_HOT_POTATO
LANG_ENGLISH        "Hot Potato"

REFERENCE           CHALLENGE_CAR_BOMB
LANG_ENGLISH        "Car Bomb"

REFERENCE           CHALLENGE_BACKSTABBER
LANG_ENGLISH        "Backstabber"

REFERENCE           CHALLENGE_SLOW_BUT_SURE
LANG_ENGLISH        "Slow But Sure"

REFERENCE           CHALLENGE_FLASHBANG_VETERAN
LANG_ENGLISH        "Flashbang Veteran"

REFERENCE           CHALLENGE_MISERY_LOVES_COMPANY
LANG_ENGLISH        "Misery Loves Company"

REFERENCE           CHALLENGE_OUCH
LANG_ENGLISH        "Ouch"

REFERENCE           CHALLENGE_RIVAL
LANG_ENGLISH        "Rival"

REFERENCE           CHALLENGE_CRUELTY
LANG_ENGLISH        "Cruelty"

REFERENCE           CHALLENGE_THINK_FAST
LANG_ENGLISH        "Think Fast"

REFERENCE           CHALLENGE_THINK_FAST_STUN
LANG_ENGLISH        "Think Fast Stun"

REFERENCE           CHALLENGE_THINK_FAST_FLASH
LANG_ENGLISH        "Think Fast Flash"

REFERENCE           CHALLENGE_RETURN_TO_SENDER
LANG_ENGLISH        "Return To Sender"

REFERENCE           CHALLENGE_BLINDFIRE
LANG_ENGLISH        "Blindfire"

REFERENCE           CHALLENGE_GET_A_2_KILL_STREAK_WHILE
LANG_ENGLISH        "Get a 2 kill streak with bullets while in mid-air."

REFERENCE           CHALLENGE_KILL_2_OR_MORE_ENEMIES2
LANG_ENGLISH        "Kill 2 or more enemies with a single frag grenade, &&1 times."

REFERENCE           CHALLENGE_KILL_5_ENEMIES_WITH_A3
LANG_ENGLISH        "Kill 5 enemies with a single airstrike."

REFERENCE           CHALLENGE_GET_A_5_KILL_STREAK_WHILE
LANG_ENGLISH        "Get a 5 kill streak while on a mounted machine gun."

REFERENCE           CHALLENGE_GET_A_3_MELEE_KILL_STREAK
LANG_ENGLISH        "Get a 3 melee kill streak without dying."

REFERENCE           CHALLENGE_KILL_2_OR_MORE_ENEMIES3
LANG_ENGLISH        "Kill 2 or more enemies with a single C4 pack, &&1 times."

REFERENCE           CHALLENGE_KILL_N_ENEMIES_WITH_THROWN
LANG_ENGLISH        "Kill &&1 enemies with thrown back grenades."

REFERENCE           CHALLENGE_KILL_5_ENEMIES_WITH_THROWN
LANG_ENGLISH        "Kill 5 enemies with thrown back grenades. (Phase 2 of 3)"

REFERENCE           CHALLENGE_KILL_15_ENEMIES_WITH2
LANG_ENGLISH        "Kill &&1 enemies with thrown back grenades."

REFERENCE           CHALLENGE_KILL_1_ENEMY_BY_DESTROYING
LANG_ENGLISH        "Destroy a car."

REFERENCE           CHALLENGE_STAB_AN_ENEMY_IN_THE
LANG_ENGLISH        "Stab an enemy in the back with your knife."

REFERENCE           CHALLENGE_KILL_1_ENEMY_WHILE_BEING
LANG_ENGLISH        "Kill 1 enemy while being stunned by a stun grenade."

REFERENCE           CHALLENGE_KILL_N_ENEMIES_DAZED
LANG_ENGLISH        "Kill &&1 enemies dazed by a flashbang."

REFERENCE           CHALLENGE_KILL_10_ENEMIES_DAZED
LANG_ENGLISH        "Kill &&1 enemies dazed by a flashbang."

REFERENCE           CHALLENGE_KILL_YOURSELF_AND_1_ENEMY
LANG_ENGLISH        "Kill yourself and 1 enemy by cooking a grenade without throwing it."

REFERENCE           CHALLENGE_KILL_N_ENEMIES_WITH_A_RIFLEMOUNTED
LANG_ENGLISH        "Kill an enemy with a rifle-mounted grenade launcher without detonation. (Direct impact)"

REFERENCE           CHALLENGE_KILL_THE_SAME_ENEMY_5
LANG_ENGLISH        "Kill the same enemy 5 times in a single match."

REFERENCE           CHALLENGE_KILL_AN_ENEMY_PICK_UP
LANG_ENGLISH        "Kill an enemy, pick up his weapon, then kill him again with his own weapon."

REFERENCE           CHALLENGE_FINISH_AN_ENEMY_OFF_BY
LANG_ENGLISH        "Finish an enemy off by hitting them with a frag grenade. (Direct impact)"

REFERENCE           CHALLENGE_FINISH_AN_ENEMY_OFF_BY1
LANG_ENGLISH        "Finish an enemy off by hitting them with a stun grenade. (Direct impact)"

REFERENCE           CHALLENGE_FINISH_AN_ENEMY_OFF_BY2
LANG_ENGLISH        "Finish an enemy off by hitting them with a flashbang. (Direct impact)"

REFERENCE           CHALLENGE_KILL_AN_ENEMY_BY_SHOOTING
LANG_ENGLISH        "Kill 1 enemy by shooting their own explosive."

REFERENCE           CHALLENGE_KILL_AN_ENEMY_WHILE_YOU
LANG_ENGLISH        "Kill an enemy while you are still dazed by a flashbang."

REFERENCE           CHALLENGE_THE_BRINK
LANG_ENGLISH        "The Brink"

REFERENCE           CHALLENGE_COLLATERAL_DAMAGE
LANG_ENGLISH        "Collateral Damage"

REFERENCE           CHALLENGE_THE_EDGE
LANG_ENGLISH        "The Edge"

REFERENCE           CHALLENGE_FLAWLESS
LANG_ENGLISH        "Flawless"

REFERENCE           CHALLENGE_TANGO_DOWN
LANG_ENGLISH        "Tango Down"

REFERENCE           CHALLENGE_HARD_LANDING
LANG_ENGLISH        "Hard Landing"

REFERENCE           CHALLENGE_EXTREME_CRUELTY
LANG_ENGLISH        "Extreme Cruelty"

REFERENCE           CHALLENGE_FAST_SWAP
LANG_ENGLISH        "Fast Swap"

REFERENCE           CHALLENGE_STAR_PLAYER
LANG_ENGLISH        "Star Player"

REFERENCE           CHALLENGE_HOW_THE_
LANG_ENGLISH        "How the ?"

REFERENCE           CHALLENGE_DOMINOS
LANG_ENGLISH        "Dominos"

REFERENCE           CHALLENGE_NO_SECRETS
LANG_ENGLISH        "No Secrets"

REFERENCE           CHALLENGE_AFTERBURNER
LANG_ENGLISH        "Afterburner"

REFERENCE           CHALLENGE_AIR_SUPERIORITY
LANG_ENGLISH        "Air Superiority"

REFERENCE           CHALLENGE_FEARLESS
LANG_ENGLISH        "Fearless"

REFERENCE           CHALLENGE_COUNTERMVP
LANG_ENGLISH        "Counter-MVP"

REFERENCE           CHALLENGE_INVINCIBLE
LANG_ENGLISH        "Invincible"

REFERENCE           CHALLENGE_SURVIVALIST
LANG_ENGLISH        "Survivalist"

REFERENCE           CHALLENGE_GET_A_3_OR_MORE_KILL
LANG_ENGLISH        "Get a 3 or more kill streak while near death.  (Screen flashing red)"

REFERENCE           CHALLENGE_KILL_2_OR_MORE_ENEMIES4
LANG_ENGLISH        "Kill 2 or more enemies with a single sniper rifle bullet."

REFERENCE           CHALLENGE_GET_THE_MATCH_WINNING_KILL_N_TIMES
LANG_ENGLISH        "Get the match winning kill &&1 time(s)."

REFERENCE           CHALLENGE_GET_THE_LAST_KILL_IN1
LANG_ENGLISH        "Get the last kill in a match 5 times. (Phase 2 of 3)"

REFERENCE           CHALLENGE_GET_THE_LAST_KILL_IN2
LANG_ENGLISH        "Get the last kill in a match 10 times. (Phase 3 of 3)"

REFERENCE           CHALLENGE_PLAY_AN_ENTIRE_FULLLENGTH
LANG_ENGLISH        "Play an entire full-length match without dying."

REFERENCE           CHALLENGE_KILL_EVERY_MEMBER_OF
LANG_ENGLISH        "Kill every member of the enemy team. (4 enemy minimum)"

REFERENCE           CHALLENGE_KILL_AN_ENEMY_THAT_IS
LANG_ENGLISH        "Kill an enemy that is in mid-air."

REFERENCE           CHALLENGE_KILL_EVERY_MEMBER_OF1
LANG_ENGLISH        "Kill every member of the enemy team (at least 4 enemies) without dying."

REFERENCE           CHALLENGE_HURT_AN_ENEMY_WITH_A
LANG_ENGLISH        "Hurt an enemy with a primary weapon, then finish them off with a pistol."

REFERENCE           CHALLENGE_PLAY_AN_ENTIRE_MATCH
LANG_ENGLISH        "Play an entire match of any game type with a 5:1 kill / death ratio."

REFERENCE           CHALLENGE_KILL_AN_ENEMY_BY_USING
LANG_ENGLISH        "Kill an enemy by using bullet penetration to shoot an explosive device through a wall."

REFERENCE           CHALLENGE_KILL_AN_ENEMY_BY_SETTING
LANG_ENGLISH        "Kill an enemy by setting off chain reactions of explosives."

REFERENCE           CHALLENGE_CALL_IN_A_UAV_3_TIMES
LANG_ENGLISH        "Call in a UAV 3 times in a single match."

REFERENCE           CHALLENGE_CALL_IN_AN_AIRSTRIKE
LANG_ENGLISH        "Call in an airstrike 2 times in a single match.\\n"

REFERENCE           CHALLENGE_CALL_IN_A_HELICOPTER
LANG_ENGLISH        "Call in a helicopter 2 times in a single match."

REFERENCE           CHALLENGE_KILL_10_ENEMIES_IN_A
LANG_ENGLISH        "Kill 10 enemies in a single match without dying."

REFERENCE           CHALLENGE_KILL_THE_1_PLAYER_ON
LANG_ENGLISH        "Kill the #1 player on the enemy team 10 times in a single match."

REFERENCE           CHALLENGE_GET_5_HEALTH_REGENERATIONS
LANG_ENGLISH        "Get 5 health regenerations from enemy damage in a row, without dying."

REFERENCE           CHALLENGE_SURVIVE_FOR_5_CONSECUTIVE
LANG_ENGLISH        "Survive for 5 consecutive minutes."

REFERENCE           CHALLENGE_KILL_N_ENEMY_WITH_SHIELD
LANG_ENGLISH        "Kill &&1 enemies with the shield melee attack."

REFERENCE           CHALLENGE_SHIELD_VETERAN
LANG_ENGLISH        "Shield Veteran"

REFERENCE           CHALLENGE_BACKSMASHER
LANG_ENGLISH        "Back-Smasher"

REFERENCE           CHALLENGE_CRUSH_AN_ENEMY
LANG_ENGLISH        "Crush an enemy from behind."

REFERENCE           CHALLENGE_GET_A_3_SHIELD_KILL_STREAK
LANG_ENGLISH        "Get a 3 kill streak with the Riot Shield without dying."

REFERENCE           CHALLENGE_HANDGUN
LANG_ENGLISH        "Handgun"

REFERENCE           CHALLENGE_MACHINEPISTOL
LANG_ENGLISH        "Machine Pistol"

REFERENCE           CHALLENGE_LAUNCHER
LANG_ENGLISH        "Launcher"

REFERENCE           CHALLENGE_HANDGUN_CHALLENGES
LANG_ENGLISH        "Handgun challenges"

REFERENCE           CHALLENGE_MACHINEPISTOL_CHALLENGES
LANG_ENGLISH        "Machine Pistol challenges"

REFERENCE           CHALLENGE_LAUNCHER_CHALLENGES
LANG_ENGLISH        "Launcher challenges"

REFERENCE           CHALLENGE_GET_10_MULTIKILLS_WITH
LANG_ENGLISH        "Get 10 Multi-Kills with this weapon."

REFERENCE           CHALLENGE_GET_25_MULTIKILLS_WITH
LANG_ENGLISH        "Get 25 Multi-Kills with this weapon."

REFERENCE           CHALLENGE_GET_75_MULTIKILLS_WITH
LANG_ENGLISH        "Get 75 Multi-Kills with this weapon."

REFERENCE           CHALLENGE_GET_150_MULTIKILLS_WITH
LANG_ENGLISH        "Get 150 Multi-Kills with this weapon."

REFERENCE           CHALLENGE_GET_250_MULTIKILLS_WITH
LANG_ENGLISH        "Get 250 Multi-Kills with this weapon."

REFERENCE           CHALLENGE_GET_400_MULTIKILLS_WITH
LANG_ENGLISH        "Get 400 Multi-Kills with this weapon."

REFERENCE           CHALLENGE_GET_500_MULTIKILLS_WITH
LANG_ENGLISH        "Get 500 Multi-Kills with this weapon."

REFERENCE           CHALLENGE_GET_1000_MULTIKILLS_WITH
LANG_ENGLISH        "Get 1,000 Multi-Kills with this weapon."

REFERENCE           CHALLENGE_GET_10000_MULTIKILLS_WITH
LANG_ENGLISH        "Get 10,000 Multi-Kills with this weapon."

REFERENCE           CHALLENGE_BULLETACCURACY_PRO
LANG_ENGLISH        "Steady Aim Pro"

REFERENCE           CHALLENGE_GET_N_HIPFIRE_KILLS
LANG_ENGLISH        "Get &&1 hipfire kills using Steady Aim."

REFERENCE           CHALLENGE_EXTENDEDMELEE_PRO
LANG_ENGLISH        "Commando Pro"

REFERENCE           CHALLENGE_GET_N_MELEE_KILLS
LANG_ENGLISH        "Get &&1 melee kills using Commando."

REFERENCE           CHALLENGE_MARATHON_PRO
LANG_ENGLISH        "Marathon Pro"

REFERENCE           CHALLENGE_RUN_N_MILES
LANG_ENGLISH        "Run &&1 miles using Marathon."

REFERENCE           CHALLENGE_SPYGAME_PRO
LANG_ENGLISH        "Spy Game Pro"

REFERENCE           CHALLENGE_IRONLUNGS_PRO
LANG_ENGLISH        "Iron Lungs Pro"

REFERENCE           CHALLENGE_ONEMANARMY_PRO
LANG_ENGLISH        "One Man Army Pro"

REFERENCE           CHALLENGE_GET_N_KILLS_OMA
LANG_ENGLISH        "Get &&1 kills using One Man Army."

REFERENCE           CHALLENGE_COLDBLOODED_PRO
LANG_ENGLISH        "Cold-Blooded Pro"

REFERENCE           CHALLENGE_DEADSILENCE_PRO
LANG_ENGLISH        "Ninja Pro"

REFERENCE           CHALLENGE_GET_N_CLOSE_DS_KILLS
LANG_ENGLISH        "Get &&1 close range kills using Ninja."

REFERENCE           CHALLENGE_UAVJAMMER_PRO
LANG_ENGLISH        "UAV Jammer Pro"

REFERENCE           CHALLENGE_SCAVENGER_PRO
LANG_ENGLISH        "Scavenger Pro"

REFERENCE           CHALLENGE_PICKUP_N_SCAVENGER_PACKS
LANG_ENGLISH        "Resupply &&1 times while using Scavenger."

REFERENCE           CHALLENGE_LASTSTAND_PRO
LANG_ENGLISH        "Last Stand Pro"

REFERENCE           CHALLENGE_GET_N_LASTSTAND_KILLS
LANG_ENGLISH        "Get &&1 kills while in Last Stand."

REFERENCE           CHALLENGE_STOPPINGPOWER_PRO
LANG_ENGLISH        "Stopping Power Pro"

REFERENCE           CHALLENGE_GET_N_SP_KILLS
LANG_ENGLISH        "Get &&1 kills using Stopping Power."

REFERENCE           CHALLENGE_BLING_PRO
LANG_ENGLISH        "Bling Pro"

REFERENCE           CHALLENGE_GET_N_BLING_KILLS
LANG_ENGLISH        "Get &&1 kills using a weapon with 2 attachments."

REFERENCE           CHALLENGE_LIGHTWEIGHT_PRO
LANG_ENGLISH        "Lightweight Pro"

REFERENCE           CHALLENGE_SPRINT_N_MILES
LANG_ENGLISH        "Sprint &&1 miles using Lightweight."

REFERENCE           CHALLENGE_HARDLINE_PRO
LANG_ENGLISH        "Hardline Pro"

REFERENCE           CHALLENGE_GET_N_KILLSTREAKS
LANG_ENGLISH        "Get &&1 killstreaks while using Hardline. (2 kills in a row)"

REFERENCE           CHALLENGE_KILL_N_KILLSTREAKS
LANG_ENGLISH        "Destroy &&1 enemy killstreak rewards using Cold-Blooded."

REFERENCE           CHALLENGE_SLEIGHTOFHAND_PRO
LANG_ENGLISH        "Sleight of Hand Pro"

REFERENCE           CHALLENGE_GET_N_SOH_KILLS
LANG_ENGLISH        "Get &&1 kills using Sleight of Hand."

REFERENCE           CHALLENGE_SCRAMBLER_PRO
LANG_ENGLISH        "Scrambler Pro"

REFERENCE           CHALLENGE_GET_N_CLOSE_SC_KILLS
LANG_ENGLISH        "Get &&1 close range kills using Scrambler."

REFERENCE           CHALLENGE_DETECTEXPLOSIVES_PRO
LANG_ENGLISH        "SitRep Pro"

REFERENCE           CHALLENGE_GET_N_DE_KILLS
LANG_ENGLISH        "Destroy &&1 enemy devices while using SitRep."

REFERENCE           CHALLENGE_EXPLOSIVEDAMAGE_PRO
LANG_ENGLISH        "Sonic Boom Pro"

REFERENCE           CHALLENGE_GET_N_EXPLOSIVE_KILLS
LANG_ENGLISH        "Get &&1 kills with any explosive while using Sonic Boom."

REFERENCE           CHALLENGE_PERKS
LANG_ENGLISH        "Perks"

REFERENCE           CHALLENGE_PERK_CHALLENGES
LANG_ENGLISH        "Upgrade your perks by completing these challenges."

REFERENCE           CHALLENGE_SMASHER
LANG_ENGLISH        "Smasher"

REFERENCE           CHALLENGE_THEWATCHMAN
LANG_ENGLISH        "The Watchman"

REFERENCE           CHALLENGE_DESC_THEWATCHMAN
LANG_ENGLISH        "Call in &&1 UAVs."

REFERENCE           CHALLENGE_THESUPPLIER
LANG_ENGLISH        "The Supplier"

REFERENCE           CHALLENGE_DESC_THESUPPLIER
LANG_ENGLISH        "Refill your ammo with Care Package 50 times."

REFERENCE           CHALLENGE_SUNBLOCK
LANG_ENGLISH        "Sunblock"

REFERENCE           CHALLENGE_DESC_SUNBLOCK
LANG_ENGLISH        "Counter the enemy's UAV 3 times in a single match."

REFERENCE           CHALLENGE_PREDATOR
LANG_ENGLISH        "Predator"

REFERENCE           CHALLENGE_DESC_PREDATOR
LANG_ENGLISH        "Get &&1 kills with a Predator Missile."

REFERENCE           CHALLENGE_CARPETBOMBER
LANG_ENGLISH        "Carpet bomber"

REFERENCE           CHALLENGE_DESC_CARPETBOMBER
LANG_ENGLISH        "Get &&1 kills with a Precision Airstrike."

REFERENCE           CHALLENGE_LOOKNOHANDS
LANG_ENGLISH        "Look! No hands!"

REFERENCE           CHALLENGE_DESC_LOOKNOHANDS
LANG_ENGLISH        "Get &&1 kills with a Sentry Gun."

REFERENCE           CHALLENGE_YOUREFIRED
LANG_ENGLISH        "You're Fired"

REFERENCE           CHALLENGE_DESC_YOUREFIRED
LANG_ENGLISH        "Get &&1 kills with a Harrier."

REFERENCE           CHALLENGE_COBRACOMMANDER
LANG_ENGLISH        "Cobra Commander"

REFERENCE           CHALLENGE_DESC_COBRACOMMANDER
LANG_ENGLISH        "Get &&1 kills as a Chopper Gunner."

REFERENCE           CHALLENGE_THECHOPPER
LANG_ENGLISH        "The Chopper"

REFERENCE           CHALLENGE_DESC_THECHOPPER
LANG_ENGLISH        "Get &&1 kills with the Attack Helicopter."

REFERENCE           CHALLENGE_THESPIRIT
LANG_ENGLISH        "The Spirit"

REFERENCE           CHALLENGE_DESC_THESPIRIT
LANG_ENGLISH        "Get &&1 kills with a Stealth Bomber."

REFERENCE           CHALLENGE_SPECTRE
LANG_ENGLISH        "Spectre"

REFERENCE           CHALLENGE_DESC_SPECTRE
LANG_ENGLISH        "Get &&1 kills with an AC-130."

REFERENCE           CHALLENGE_JOLLYGREENGIANT
LANG_ENGLISH        "Jolly Green Giant"

REFERENCE           CHALLENGE_DESC_JOLLYGREENGIANT
LANG_ENGLISH        "Get &&1 kills with a Pave Low."

REFERENCE           CHALLENGE_SHOCKWAVE
LANG_ENGLISH        "Shockwave"

REFERENCE           CHALLENGE_DESC_SHOCKWAVE
LANG_ENGLISH        "EMP the enemy team 5 times."

REFERENCE           CHALLENGE_WARGAMER
LANG_ENGLISH        "Wargamer"

REFERENCE           CHALLENGE_DESC_WARGAMER
LANG_ENGLISH        "Nuke the enemy."

REFERENCE           CHALLENGE_THELONER
LANG_ENGLISH        "The Loner"

REFERENCE           CHALLENGE_DESC_THELONER
LANG_ENGLISH        "Get a 10 killstreak with 0 killstreaks selected."

REFERENCE           CHALLENGE_HIJACKER
LANG_ENGLISH        "Hijacker"

REFERENCE           CHALLENGE_DESC_HIJACKER
LANG_ENGLISH        "Hijack &&1 crates."

REFERENCE           CHALLENGE_MARTYR
LANG_ENGLISH        "Martyr"

REFERENCE           CHALLENGE_DESC_MARTYR
LANG_ENGLISH        "Get 1 kill with a Martyrdom deathstreak."

REFERENCE           CHALLENGE_LIVINGDEAD
LANG_ENGLISH        "Living Dead"

REFERENCE           CHALLENGE_DESC_LIVINGDEAD
LANG_ENGLISH        "Survive Final Stand."

REFERENCE           CHALLENGE_CLICKCLICKBOOM
LANG_ENGLISH        "Click Click Boom"

REFERENCE           CHALLENGE_DESC_CLICKCLICKBOOM
LANG_ENGLISH        "Get 1 kill with C4 while in Last Stand."

REFERENCE           CHALLENGE_THENUMB
LANG_ENGLISH        "The Numb"

REFERENCE           CHALLENGE_DESC_THENUMB
LANG_ENGLISH        "Take enough damage that would normally kill you with Painkiller active."

REFERENCE           CHALLENGE_WOPR
LANG_ENGLISH        "Ultimate Sacrifice"

REFERENCE           CHALLENGE_DESC_WOPR
LANG_ENGLISH        "Nuke the enemy while your team is losing."

REFERENCE           CHALLENGE_ENEMYOFTHESTATE
LANG_ENGLISH        "Enemy of the State"

REFERENCE           CHALLENGE_DESC_ENEMYOFTHESTATE
LANG_ENGLISH        "Kill 3 enemies while you are the only surviving member of your team."

REFERENCE           CHALLENGE_THEDENIER
LANG_ENGLISH        "The Denier"

REFERENCE           CHALLENGE_DESC_THEDENIER
LANG_ENGLISH        "Kill an enemy before they earn a 10 or higher killstreak reward."

REFERENCE           CHALLENGE_DICTATOR
LANG_ENGLISH        "Dictator"

REFERENCE           CHALLENGE_DESC_DICTATOR
LANG_ENGLISH        "Change the DEFCON 3 times in one game."

REFERENCE           CHALLENGE_MACH5
LANG_ENGLISH        "Mach 5"

REFERENCE           CHALLENGE_DESC_MACH5
LANG_ENGLISH        "Change the DEFCON in the first minute of a game."

REFERENCE           CHALLENGE_NEWJACK
LANG_ENGLISH        "New Jack"

REFERENCE           CHALLENGE_DESC_NEWJACK
LANG_ENGLISH        "Hijack 10 Emergency Drops."

REFERENCE           CHALLENGE_DARKBRINGER
LANG_ENGLISH        "Darkbringer"

REFERENCE           CHALLENGE_DESC_DARKBRINGER
LANG_ENGLISH        "Prevent 25 Tactical Insertions."

REFERENCE           CHALLENGE_TACTICALDELETION
LANG_ENGLISH        "Tactical Deletion"

REFERENCE           CHALLENGE_DESC_TACTICALDELETION
LANG_ENGLISH        "Kill 25 players that spawn using Tactical Insertion."

REFERENCE           CHALLENGE_JACKINTHEBOX
LANG_ENGLISH        "Jack-in-the-Box"

REFERENCE           CHALLENGE_DESC_JACKINTHEBOX
LANG_ENGLISH        "Kill an enemy within 5 seconds of tactically inserting, &&1 times."

REFERENCE           CHALLENGE_MASTERBLASTER
LANG_ENGLISH        "Solid Steel"

REFERENCE           CHALLENGE_DESC_MASTERBLASTER
LANG_ENGLISH        "Survive &&1 explosions while using Blast Shield."

REFERENCE           CHALLENGE_BULLSEYE
LANG_ENGLISH        "Plastered"

REFERENCE           CHALLENGE_DESC_BULLSEYE
LANG_ENGLISH        "Stick &&1 players with a Semtex grenade."

REFERENCE           CHALLENGE_CARNIE
LANG_ENGLISH        "Carnie"

REFERENCE           CHALLENGE_DESC_CARNIE
LANG_ENGLISH        "Kill &&1 players with a Throwing Knife."

REFERENCE           CHALLENGE_BASELINE
LANG_ENGLISH        "Baseline"

REFERENCE           CHALLENGE_DESC_BASELINE
LANG_ENGLISH        "Get 1 kill with every default class primary and secondary weapon."

REFERENCE           CHALLENGE_6FEARS7
LANG_ENGLISH        "6 Fears 7"

REFERENCE           CHALLENGE_DESC_6FEARS7
LANG_ENGLISH        "Get a 7-8-9 killstreak."

REFERENCE           CHALLENGE_KILLSTREAK
LANG_ENGLISH        "Killstreak"

REFERENCE           CHALLENGE_KILLSTREAK_CHALLENGES
LANG_ENGLISH        "There is no such thing as too much firepower."

REFERENCE           CHALLENGE_EQUIPMENT
LANG_ENGLISH        "Equipment"

REFERENCE           CHALLENGE_EQUIPMENT_CHALLENGES
LANG_ENGLISH        "If you can't remember, the claymore is pointed toward you."

REFERENCE           CHALLENGE_DEFCON
LANG_ENGLISH        "Defcon"

REFERENCE           CHALLENGE_DEFCON_CHALLENGES
LANG_ENGLISH        "DEFCON Challenges"

REFERENCE           CHALLENGE_GET_N_ASSISTS
LANG_ENGLISH        "Get &&1 assists."

REFERENCE           CHALLENGE_KILL_N_ENEMY_THROUGH
LANG_ENGLISH        "Kill &&1 enemies through a surface using bullet penetration."

REFERENCE           CHALLENGE_BLOW_UP_N_CARS
LANG_ENGLISH        "Blow up &&1 cars."

REFERENCE           CHALLENGE_CALL_IN_A_UAV_N_TIMES
LANG_ENGLISH        "Call in a UAV &&1 times."

REFERENCE           CHALLENGE_DESTROY_N_ENEMY_EXPLOSIVES
LANG_ENGLISH        "Destroy &&1 enemy equipment."

REFERENCE           CHALLENGE_KILL_N_ENEMY_WITH_THE
LANG_ENGLISH        "Kill &&1 enemies with the knife melee attack."

REFERENCE           CHALLENGE_FREEFORALL_VICTOR
LANG_ENGLISH        "Free-for-all Victor"

REFERENCE           CHALLENGE_TEAM_PLAYER
LANG_ENGLISH        "Team Player"

REFERENCE           CHALLENGE_SD_VICTOR
LANG_ENGLISH        "Search And Destroy Victor"

REFERENCE           CHALLENGE_MARKSMAN_1
LANG_ENGLISH        ": Marksman I"

REFERENCE           CHALLENGE_MARKSMAN_2
LANG_ENGLISH        ": Marksman II"

REFERENCE           CHALLENGE_MARKSMAN_3
LANG_ENGLISH        ": Marksman III"

REFERENCE           CHALLENGE_MARKSMAN_4
LANG_ENGLISH        ": Marksman IV"

REFERENCE           CHALLENGE_MARKSMAN_5
LANG_ENGLISH        ": Marksman V"

REFERENCE           CHALLENGE_MARKSMAN_6
LANG_ENGLISH        ": Marksman VI"

REFERENCE           CHALLENGE_MARKSMAN_7
LANG_ENGLISH        ": Marksman VII"

REFERENCE           CHALLENGE_MARKSMAN_8
LANG_ENGLISH        ": Marksman VIII"

REFERENCE           CHALLENGE_MARKSMAN_9
LANG_ENGLISH        ": Marksman IX"

REFERENCE           CHALLENGE_MARKSMAN_10
LANG_ENGLISH        ": Marksman X"

REFERENCE           CHALLENGE_EXPERT_1
LANG_ENGLISH        ": Expert I"

REFERENCE           CHALLENGE_EXPERT_2
LANG_ENGLISH        ": Expert II"

REFERENCE           CHALLENGE_EXPERT_3
LANG_ENGLISH        ": Expert III"

REFERENCE           CHALLENGE_EXPERT_4
LANG_ENGLISH        ": Expert IV"

REFERENCE           CHALLENGE_EXPERT_5
LANG_ENGLISH        ": Expert V"

REFERENCE           CHALLENGE_EXPERT_6
LANG_ENGLISH        ": Expert VI"

REFERENCE           CHALLENGE_EXPERT_7
LANG_ENGLISH        ": Expert VII"

REFERENCE           CHALLENGE_EXPERT_8
LANG_ENGLISH        ": Expert VIII"

REFERENCE           CHALLENGE_EXPERT_9
LANG_ENGLISH        ": Expert IX"

REFERENCE           CHALLENGE_EXPERT_10
LANG_ENGLISH        ": Expert X"

REFERENCE           CHALLENGE_LEVEL_1
LANG_ENGLISH        ": I"

REFERENCE           CHALLENGE_LEVEL_2
LANG_ENGLISH        ": II"

REFERENCE           CHALLENGE_LEVEL_3
LANG_ENGLISH        ": III"

REFERENCE           CHALLENGE_LEVEL_4
LANG_ENGLISH        ": IV"

REFERENCE           CHALLENGE_LEVEL_5
LANG_ENGLISH        ": V"

REFERENCE           CHALLENGE_LEVEL_6
LANG_ENGLISH        ": VI"

REFERENCE           CHALLENGE_LEVEL_7
LANG_ENGLISH        ": VII"

REFERENCE           CHALLENGE_LEVEL_8
LANG_ENGLISH        ": VIII"

REFERENCE           CHALLENGE_LEVEL_9
LANG_ENGLISH        ": IX"

REFERENCE           CHALLENGE_LEVEL_10
LANG_ENGLISH        ": X"

REFERENCE           CHALLENGE_GET_N_KILLS
LANG_ENGLISH        "Get &&1 kills with this weapon."

REFERENCE           CHALLENGE_GET_N_HEADSHOTS
LANG_ENGLISH        "Get &&1 headshots with this weapon."

REFERENCE           CHALLENGE_GET_ALL_ATTACHMENTS
LANG_ENGLISH        "Unlock all this weapon's attachments."

REFERENCE           CHALLENGE_GET_N_KILLS_REFLEX
LANG_ENGLISH        "Get &&1 kills while looking through the Red Dot Sight attached to this weapon."

REFERENCE           CHALLENGE_GET_N_KILLS_ACOG
LANG_ENGLISH        "Get &&1 kills while looking through the ACOG Sight attached to this weapon."

REFERENCE           CHALLENGE_GET_N_KILLS_FMJ
LANG_ENGLISH        "Get &&1 bullet penetration kills with FMJ attached to this weapon."

REFERENCE           CHALLENGE_GET_N_KILLS_SILENCER
LANG_ENGLISH        "Get &&1 kills with the Silencer attached to this weapon."

REFERENCE           CHALLENGE_GET_N_KILLS_GL
LANG_ENGLISH        "Get &&1 kills with the attached Grenade Launcher."

REFERENCE           CHALLENGE_GET_N_KILLS_RAPIDFIRE
LANG_ENGLISH        "Get &&1 kills with Rapid Fire attached to this weapon."

REFERENCE           CHALLENGE_ATTACHMENT_SILENCER_1
LANG_ENGLISH        ": Heartbeat Sensor"

REFERENCE           CHALLENGE_ATTACHMENT_REFLEX_1
LANG_ENGLISH        ": Holographic Sight"

REFERENCE           CHALLENGE_ATTACHMENT_ACOG_1
LANG_ENGLISH        ": Thermal Scope"

REFERENCE           CHALLENGE_ATTACHMENT_FMJ_1
LANG_ENGLISH        ": Extended Mags"

REFERENCE           CHALLENGE_ATTACHMENT_RAPIDFIRE_1
LANG_ENGLISH        ": Akimbo"

REFERENCE           CHALLENGE_ATTACHMENT_GL_1
LANG_ENGLISH        ": Shotgun"

REFERENCE           CHALLENGE_AK47_MASTERY
LANG_ENGLISH        "AK-47: Mastery"

REFERENCE           CHALLENGE_AUG_MASTERY
LANG_ENGLISH        "AUG HBAR: Mastery"

REFERENCE           CHALLENGE_RPD_MASTERY
LANG_ENGLISH        "RPD: Mastery"

REFERENCE           CHALLENGE_MG4_MASTERY
LANG_ENGLISH        "MG4: Mastery"

REFERENCE           CHALLENGE_M240_MASTERY
LANG_ENGLISH        "M240: Mastery"

REFERENCE           CHALLENGE_AA12_MASTERY
LANG_ENGLISH        "AA12: Mastery"

REFERENCE           CHALLENGE_BARRETT_MASTERY
LANG_ENGLISH        "Barrett .50cal: Mastery"

REFERENCE           CHALLENGE_BERETTA393_MASTERY
LANG_ENGLISH        "Beretta393: Mastery"

REFERENCE           CHALLENGE_BERETTA_MASTERY
LANG_ENGLISH        "Beretta: Mastery"

REFERENCE           CHALLENGE_CHEYTAC_MASTERY
LANG_ENGLISH        "Intervention: Mastery"

REFERENCE           CHALLENGE_COLTANACONDA_MASTERY
LANG_ENGLISH        "Magnum: Mastery"

REFERENCE           CHALLENGE_DESERTEAGLE_MASTERY
LANG_ENGLISH        "Desert: Eagle Mastery"

REFERENCE           CHALLENGE_FAL_MASTERY
LANG_ENGLISH        "FAL: Mastery"

REFERENCE           CHALLENGE_FAMAS_MASTERY
LANG_ENGLISH        "FAMAS: Mastery"

REFERENCE           CHALLENGE_FN2000_MASTERY
LANG_ENGLISH        "F2000: Mastery"

REFERENCE           CHALLENGE_KRISS_MASTERY
LANG_ENGLISH        "Vector: Mastery"

REFERENCE           CHALLENGE_M4_MASTERY
LANG_ENGLISH        "M4A1: Mastery"

REFERENCE           CHALLENGE_M16_MASTERY
LANG_ENGLISH        "M16A4: Mastery"

REFERENCE           CHALLENGE_M21_MASTERY
LANG_ENGLISH        "M21-EBR: Mastery"

REFERENCE           CHALLENGE_M1014_MASTERY
LANG_ENGLISH        "M1014: Mastery"

REFERENCE           CHALLENGE_UZI_MASTERY
LANG_ENGLISH        "Mini-Uzi: Mastery"

REFERENCE           CHALLENGE_MP5K_MASTERY
LANG_ENGLISH        "MP5K: Mastery"

REFERENCE           CHALLENGE_UMP45_MASTERY
LANG_ENGLISH        "UMP45: Mastery"

REFERENCE           CHALLENGE_MASADA_MASTERY
LANG_ENGLISH        "ACR: Mastery"

REFERENCE           CHALLENGE_P90_MASTERY
LANG_ENGLISH        "P90: Mastery"

REFERENCE           CHALLENGE_TAVOR_MASTERY
LANG_ENGLISH        "TAR-21: Mastery"

REFERENCE           CHALLENGE_SCAR_MASTERY
LANG_ENGLISH        "SCAR-H: Mastery"

REFERENCE           CHALLENGE_CROUCH_SHOT
LANG_ENGLISH        "Crouch Shot"

REFERENCE           CHALLENGE_PRONE_SHOT
LANG_ENGLISH        "Prone Shot"

REFERENCE           CHALLENGE_GRENADE_KILL
LANG_ENGLISH        "Grenade Kill"

REFERENCE           CHALLENGE_POINT_GUARD
LANG_ENGLISH        "Point Guard"

REFERENCE           CHALLENGE_XRAY_VISION
LANG_ENGLISH        "X-Ray Vision"

REFERENCE           CHALLENGE_VANDALISM
LANG_ENGLISH        "Vandalism"

REFERENCE           CHALLENGE_EXPOSED
LANG_ENGLISH        "Exposed"

REFERENCE           CHALLENGE_BACKDRAFT
LANG_ENGLISH        "Backdraft"

REFERENCE           CHALLENGE_KNIFE_VETERAN
LANG_ENGLISH        "Knife Veteran"

REFERENCE           CHALLENGE_KILL_N_ENEMIES_WHILE_CROUCHING
LANG_ENGLISH        "Kill &&1 enemies while you are crouching."

REFERENCE           CHALLENGE_KILL_N_ENEMIES_WHILE1
LANG_ENGLISH        "Kill &&1 enemies while you are prone."

REFERENCE           CHALLENGE_KILL_N_ENEMIES_WITH_A_GRENADE
LANG_ENGLISH        "Kill &&1 enemies with grenades."

REFERENCE           CHALLENGE_KILL_N_ENEMIES_SILENCED
LANG_ENGLISH        "Kill &&1 enemies while using a silenced weapon."

REFERENCE           CHALLENGE_KILL_N_ENEMIES_WHILE_PRONE
LANG_ENGLISH        "Kill &&1 enemies while you are prone."

REFERENCE           CHALLENGE_HARDCORE_TEAM_PLAYER
LANG_ENGLISH        "Hardcore Team Player"

REFERENCE           CHALLENGE_SABOTAGE_VICTOR
LANG_ENGLISH        "Sabotage Victor"

REFERENCE           CHALLENGE_WIN_N_HARDCORE_TEAM_DEATHMATCH
LANG_ENGLISH        "Win &&1 Hardcore Team Deathmatch game(s)."

REFERENCE           CHALLENGE_WIN_N_SABOTAGE_MATCHES
LANG_ENGLISH        "Win &&1 Sabotage matches."

REFERENCE           CHALLENGE_WIN_N_SEARCH_AND_DESTROY
LANG_ENGLISH        "Win &&1 Search And Destroy matches."

REFERENCE           CHALLENGE_WIN_N_TEAM_DEATHMATCH
LANG_ENGLISH        "Win &&1 Team Deathmatch matches."

REFERENCE           CHALLENGE_PLACE_IN_THE_TOP_3_IN
LANG_ENGLISH        "Place first, second or third in &&1 Free-for-all matches."

REFERENCE           CHALLENGE_PROGRESS_X_OF_Y
LANG_ENGLISH        "Progress: &&1/&&2"

REFERENCE           CHALLENGE_COMPLETE
LANG_ENGLISH        "Challenge Completed!"

REFERENCE           CHALLENGE_MARKSMAN
LANG_ENGLISH        ": Marksman I"

REFERENCE           CHALLENGE_EXPERT
LANG_ENGLISH        ": Expert I"

REFERENCE           CHALLENGE_HEADS_UP
LANG_ENGLISH        "Heads Up!"

REFERENCE           CHALLENGE_DESC_HEADS_UP
LANG_ENGLISH        "Kill an enemy by dropping a crate on them."

REFERENCE           CHALLENGE_ITS_PERSONAL
LANG_ENGLISH        "It's Personal!"

REFERENCE           CHALLENGE_DESC_ITS_PERSONAL
LANG_ENGLISH        "Hurt an enemy then finish them with a Throwing Knife."

REFERENCE           CHALLENGE_SNIPE_N_WHILE_PRONE
LANG_ENGLISH        "Snipe &&1 enemies while prone."

REFERENCE           CHALLENGE_GET_N_KILLS_ROF
LANG_ENGLISH        "Get &&1 kills using the Rapid Fire attachment."

REFERENCE           CHALLENGE_ROF
LANG_ENGLISH        "Rapid Fire Pro"

REFERENCE           CHALLENGE_GET_N_KS_EXPLOSIVE_KILLS
LANG_ENGLISH        "Get &&1 kills with explosives while using Danger Close."

REFERENCE           CHALLENGE_DANGERCLOSE_PRO
LANG_ENGLISH        "Danger Close Pro"

REFERENCE           CHALLENGE_SA80_MASTERY
LANG_ENGLISH        "L86 LSW: Mastery"

REFERENCE           CHALLENGE_WA2000_MASTERY
LANG_ENGLISH        "WA2000 Mastery"

REFERENCE           CHALLENGE_OMNICIDE
LANG_ENGLISH        "Omnicide!"

REFERENCE           CHALLENGE_DESC_OMNICIDE
LANG_ENGLISH        "Kill the entire enemy team within 10 seconds."

REFERENCE           CHALLENGE_MONEYSHOT
LANG_ENGLISH        "Money Shot!"

REFERENCE           CHALLENGE_DESC_MONEYSHOT
LANG_ENGLISH        "Get a payback in the game winning killcam."

REFERENCE           CHALLENGE_THEHARDERTHEYFALL
LANG_ENGLISH        "...The Harder They Fall"

REFERENCE           CHALLENGE_DESC_THEHARDERTHEYFALL
LANG_ENGLISH        "Kill the top player 5 times in a row."

REFERENCE           CHALLENGE_BOTHBARRELS
LANG_ENGLISH        "Both Barrels"

REFERENCE           CHALLENGE_DESC_BOTHBARRELS
LANG_ENGLISH        "Kill an enemy with the Ranger by firing both barrels at the same time."

REFERENCE           CHALLENGE_THEBIGGERTHEYARE
LANG_ENGLISH        "The Bigger they are..."

REFERENCE           CHALLENGE_DESC_THEBIGGERTHEYARE
LANG_ENGLISH        "Kill the top player 3 times in a row."

REFERENCE           CHALLENGE_COLOROFMONEY
LANG_ENGLISH        "Color Of Money"

REFERENCE           CHALLENGE_DESC_COLOROFMONEY
LANG_ENGLISH        "Get Payback &&1 times with headshots."

REFERENCE           CHALLENGE_BANGFORBUCK
LANG_ENGLISH        "Bang for your Buck"

REFERENCE           CHALLENGE_DESC_BANGFORBUCK
LANG_ENGLISH        "Get Payback &&1 times with Frag Grenades."

REFERENCE           CHALLENGE_WARGASM
LANG_ENGLISH        "Wargasm"

REFERENCE           CHALLENGE_DESC_WARGASM
LANG_ENGLISH        "Get all 3 of your killstreak rewards within 20 seconds."

REFERENCE           CHALLENGE_TIMEISMONEY
LANG_ENGLISH        "Time Is Money"

REFERENCE           CHALLENGE_DESC_TIMEISMONEY
LANG_ENGLISH        "Get Payback &&1 times with Semtex."

REFERENCE           CHALLENGE_NO
LANG_ENGLISH        "Martyrdoh!"

REFERENCE           CHALLENGE_DESC_NO
LANG_ENGLISH        "Kill an enemy cooking a Frag Grenade."

REFERENCE           CHALLENGE_RENAISSANCE
LANG_ENGLISH        "Renaissance Man"

REFERENCE           CHALLENGE_DESC_RENAISSANCE
LANG_ENGLISH        "Kill 3 different people with 3 different weapons in one life."

REFERENCE           CHALLENGE_OVERDRAFT
LANG_ENGLISH        "Overdraft"

REFERENCE           CHALLENGE_DESC_OVERDRAFT
LANG_ENGLISH        "Get a Payback that sticks to the victim."

REFERENCE           CHALLENGE_SURVIVOR
LANG_ENGLISH        "The Survivor"

REFERENCE           CHALLENGE_DESC_SURVIVOR
LANG_ENGLISH        "Get a knife kill when all of your ammo is empty."

REFERENCE           CHALLENGE_BOOT_CAMP_CAPS
LANG_ENGLISH        "BOOT CAMP"

REFERENCE           CHALLENGE_OPERATIONS_CAPS
LANG_ENGLISH        "OPERATIONS"

REFERENCE           CHALLENGE_KILLER_CAPS
LANG_ENGLISH        "KILLER"

REFERENCE           CHALLENGE_HUMILIATION_CAPS
LANG_ENGLISH        "HUMILIATION"

REFERENCE           CHALLENGE_ELITE_CAPS
LANG_ENGLISH        "ELITE"

REFERENCE           CHALLENGE_PERKS_CAPS
LANG_ENGLISH        "PERKS"

REFERENCE           CHALLENGE_KILLSTREAK_CAPS
LANG_ENGLISH        "KILLSTREAK"

REFERENCE           CHALLENGE_EQUIPMENT_CAPS
LANG_ENGLISH        "EQUIPMENT"

REFERENCE           CHALLENGE_UAVS
LANG_ENGLISH        "Radar Inbound"

REFERENCE           CHALLENGE_AIRSTRIKES
LANG_ENGLISH        "Airstrike Inbound"

REFERENCE           CHALLENGE_HELICOPTERS
LANG_ENGLISH        "Helicopter Inbound"

REFERENCE           CHALLENGE_AIRDROPS
LANG_ENGLISH        "Airdrop Inbound"

REFERENCE           CHALLENGE_DESC_UAV
LANG_ENGLISH        "Call in &&1 UAVs."

REFERENCE           CHALLENGE_DESC_AIRDROP
LANG_ENGLISH        "Call in &&1 Care Packages."

REFERENCE           CHALLENGE_DESC_COUNTER_UAV
LANG_ENGLISH        "Call in &&1 Counter-UAVs."

REFERENCE           CHALLENGE_DESC_SENTRY
LANG_ENGLISH        "Call in &&1 Sentry Guns."

REFERENCE           CHALLENGE_DESC_PREDATOR_MISSILE
LANG_ENGLISH        "Call in &&1 Predator Missiles."

REFERENCE           CHALLENGE_DESC_PRECISION_AIRSTRIKE
LANG_ENGLISH        "Call in &&1 Precision Airstrikes."

REFERENCE           CHALLENGE_DESC_HARRIER_AIRSTRIKE
LANG_ENGLISH        "Call in &&1 Harrier strikes."

REFERENCE           CHALLENGE_DESC_HELICOPTER
LANG_ENGLISH        "Call in &&1 Attack Helicopters."

REFERENCE           CHALLENGE_DESC_AIRDROP_MEGA
LANG_ENGLISH        "Call in &&1 Emergency Airdrops."

REFERENCE           CHALLENGE_DESC_HELICOPTER_FLARES
LANG_ENGLISH        "Call in &&1 Pave Lows."

REFERENCE           CHALLENGE_DESC_STEALTH_AIRSTRIKE
LANG_ENGLISH        "Call in &&1 Stealth Bombers."

REFERENCE           CHALLENGE_DESC_HELICOPTER_MINIGUN
LANG_ENGLISH        "Call in &&1 Chopper Gunners."

REFERENCE           CHALLENGE_DESC_AC130
LANG_ENGLISH        "Call in &&1 AC130s."

REFERENCE           CHALLENGE_DESC_EMP
LANG_ENGLISH        "Call in &&1 EMPs."

REFERENCE           CHALLENGE_DESC_NUKE
LANG_ENGLISH        "Call in &&1 Nukes."

REFERENCE           CHALLENGE_DESC_UAVS
LANG_ENGLISH        "Call in &&1 UAVs or Counter-UAVs."

REFERENCE           CHALLENGE_DESC_AIRSTRIKES
LANG_ENGLISH        "Call in &&1 Precision, Stealth or Harrier airstrikes."

REFERENCE           CHALLENGE_DESC_HELICOPTERS
LANG_ENGLISH        "Call in &&1 armed helicopters."

REFERENCE           CHALLENGE_DESC_AIRDROPS
LANG_ENGLISH        "Call in &&1 total airdrop crates using Care Package, Sentry Gun, and Emergency Airdrop."

REFERENCE           CHALLENGE_CLOSER
LANG_ENGLISH        "The Closer"

REFERENCE           CHALLENGE_DESC_CLOSER
LANG_ENGLISH        "Be the killer in &&1 Game Winning Killcams."

REFERENCE           CHALLENGE_LAST_RESORT
LANG_ENGLISH        "Last Resort"

REFERENCE           CHALLENGE_DESC_LAST_RESORT
LANG_ENGLISH        "Get a Last Stand or Final Stand kill in Game Winning Killcam."

REFERENCE           CHALLENGE_UNBELIEVABLE
LANG_ENGLISH        "Unbelievable"

REFERENCE           CHALLENGE_DESC_UNBELIEVABLE
LANG_ENGLISH        "Get a Throwing Knife kill in Game Winning Killcam."

REFERENCE           CHALLENGE_DESC_OWNED
LANG_ENGLISH        "Get a Riot Shield melee kill in Game Winning Killcam."

REFERENCE           CHALLENGE_OWNED
LANG_ENGLISH        "Owned"

REFERENCE           CHALLENGE_DRONEKILLER
LANG_ENGLISH        "Dronekiller"

REFERENCE           CHALLENGE_DESC_DRONEKILLER
LANG_ENGLISH        "Get a Predator Missile kill in the Game Winning Killcam."

REFERENCE           CHALLENGE_DROPPINCRATES
LANG_ENGLISH        "Droppin' Crates"

REFERENCE           CHALLENGE_DESC_DROPPINCRATES
LANG_ENGLISH        "Get a Game Winning Killcam by dropping a crate on the enemy."

REFERENCE           CHALLENGE_STICKMAN
LANG_ENGLISH        "Stickman"

REFERENCE           CHALLENGE_DESC_STICKMAN
LANG_ENGLISH        "Stick a Semtex to the enemy in a Game Winning Killcam."

REFERENCE           CHALLENGE_DIDYOUSEETHAT
LANG_ENGLISH        "Did you see that?"

REFERENCE           CHALLENGE_DESC_DIDYOUSEETHAT
LANG_ENGLISH        "Kill someone with a Throwing Knife while flashed or stunned."

REFERENCE           CHALLENGE_GROUPHUG
LANG_ENGLISH        "Group Hug"

REFERENCE           CHALLENGE_DESC_GROUPHUG
LANG_ENGLISH        "Kill multiple enemies with a Semtex stuck to one of them."

REFERENCE           CHALLENGE_ROBINHOOD
LANG_ENGLISH        "Robin Hood"

REFERENCE           CHALLENGE_DESC_ROBINHOOD
LANG_ENGLISH        "Get Payback &&1 times while in Last Stand."

REFERENCE           CHALLENGE_IDENTITYTHEFT
LANG_ENGLISH        "Identity Thief"

REFERENCE           CHALLENGE_DESC_IDENTITYTHEFT
LANG_ENGLISH        "Get a Payback with the killer's Copycat Class."

REFERENCE           CHALLENGE_ATM
LANG_ENGLISH        "ATM"

REFERENCE           CHALLENGE_DESC_ATM
LANG_ENGLISH        "Get a Payback with a Throwing Knife."

REFERENCE           CHALLENGE_IAMRICH
LANG_ENGLISH        "I'm Rich!"

REFERENCE           CHALLENGE_DESC_IAMRICH
LANG_ENGLISH        "Get Payback &&1 times with C4."

REFERENCE           CHALLENGE_BREAKBANK
LANG_ENGLISH        "Break the Bank"

REFERENCE           CHALLENGE_DESC_BREAKBANK
LANG_ENGLISH        "Get a Payback with a Claymore."

REFERENCE           CHALLENGE_DESC_SMOOTHCRIMINAL
LANG_ENGLISH        "Steal an enemy's Care Package."

REFERENCE           CHALLENGE_SMOOTHCRIMINAL
LANG_ENGLISH        "Smooth Criminal"

REFERENCE           CHALLENGE_POOLSHARK
LANG_ENGLISH        "Pool Shark"

REFERENCE           CHALLENGE_DESC_POOLSHARK
LANG_ENGLISH        "Steal an enemy's Emergency Airdrop crate."

REFERENCE           CHALLENGE_ABSENTEE
LANG_ENGLISH        "Absentee Killer"

REFERENCE           CHALLENGE_DESC_ABSENTEE
LANG_ENGLISH        "Get a Game Winning Killcam with a Sentry Gun."

REFERENCE           CHALLENGE_TRUELIES
LANG_ENGLISH        "True Liar"

REFERENCE           CHALLENGE_DESC_TRUELIES
LANG_ENGLISH        "Get a Game Winning Killcam with a Harrier."

REFERENCE           CHALLENGE_FINISHINGTOUCH
LANG_ENGLISH        "Finishing Touch"

REFERENCE           CHALLENGE_DESC_FINISHINGTOUCH
LANG_ENGLISH        "Get a Game Winning Killcam with a Precision Airstrike."

REFERENCE           CHALLENGE_TECHNOKILLER
LANG_ENGLISH        "Techno Killer"

REFERENCE           CHALLENGE_DESC_TECHNOKILLER
LANG_ENGLISH        "Get a Game Winning Killcam with a Stealth Bomber."

REFERENCE           CHALLENGE_TRANSFORMER
LANG_ENGLISH        "Transformer"

REFERENCE           CHALLENGE_DESC_TRANSFORMER
LANG_ENGLISH        "Get a Game Winning Killcam with a Pave Low."

REFERENCE           CHALLENGE_OG
LANG_ENGLISH        "OG"

REFERENCE           CHALLENGE_DESC_OG
LANG_ENGLISH        "Get a Game Winning Killcam with an Attack Helicopter."

REFERENCE           CHALLENGE_HIDEF
LANG_ENGLISH        "Hi Def"

REFERENCE           CHALLENGE_DESC_HIDEF
LANG_ENGLISH        "Get a Game Winning Killcam with a Chopper Gunner."

REFERENCE           CHALLENGE_DEATHFROMABOVE
LANG_ENGLISH        "Death From Above"

REFERENCE           CHALLENGE_DESC_DEATHFROMABOVE
LANG_ENGLISH        "Get a Game Winning Killcam with an AC130."

REFERENCE           CHALLENGE_SIDEKICK
LANG_ENGLISH        "Sidekick"

REFERENCE           CHALLENGE_DESC_SIDEKICK
LANG_ENGLISH        "Get 3 kills in one life with your secondary weapon."

REFERENCE           CHALLENGE_NBK
LANG_ENGLISH        "NBK"

REFERENCE           CHALLENGE_DESC_NBK
LANG_ENGLISH        "Get 3 longshots in one life."

REFERENCE           CHALLENGE_SURGICAL_ASSAULT
LANG_ENGLISH        "The Surgical"

REFERENCE           CHALLENGE_DESC_SURGICAL_ASSAULT
LANG_ENGLISH        "Fire an entire Assault Rifle magazine into your enemies without missing."

REFERENCE           CHALLENGE_SURGICAL_SMG
LANG_ENGLISH        "Mach 5"

REFERENCE           CHALLENGE_DESC_SURGICAL_SMG
LANG_ENGLISH        "Fire an entire SMG magazine into your enemies without missing.\\n"

REFERENCE           CHALLENGE_SURGICAL_LMG
LANG_ENGLISH        "Dictator"

REFERENCE           CHALLENGE_DESC_SURGICAL_LMG
LANG_ENGLISH        "Fire an entire LMG magazine into your enemies without missing."

REFERENCE           CHALLENGE_SURGICAL_SNIPER
LANG_ENGLISH        "Perfectionist"

REFERENCE           CHALLENGE_DESC_SURGICAL_SNIPER
LANG_ENGLISH        "Fire an entire Sniper magazine into your enemies without missing."

REFERENCE           CHALLENGE_NEVERFORGET
LANG_ENGLISH        "Never Forget"

REFERENCE           CHALLENGE_DESC_NEVERFORGET
LANG_ENGLISH        "Get hurt by an enemy but survive and backstab them."

REFERENCE           CHALLENGE_TURTLEPOWER
LANG_ENGLISH        "Turtle Power"

REFERENCE           CHALLENGE_DESC_TURTLEPOWER
LANG_ENGLISH        "Kill 3 enemies with a Riot Shield bash without dying."

REFERENCE           CHALLENGE_RESOURCEFUL
LANG_ENGLISH        "The Resourceful"

REFERENCE           CHALLENGE_DESC_RESOURCEFUL
LANG_ENGLISH        "Kill an enemy by sticking Semtex to a teammate."

REFERENCE           CHALLENGE_ALLPRO
LANG_ENGLISH        "All Pro"

REFERENCE           CHALLENGE_DESC_ALLPRO
LANG_ENGLISH        "Headshot 2+ enemies with 1 bullet."

REFERENCE           CHALLENGE_RADIATIONSICKNESS
LANG_ENGLISH        "Radiation Sickness"

REFERENCE           CHALLENGE_DESC_RADIATIONSICKNESS
LANG_ENGLISH        "Get Nuked by an enemy"

REFERENCE           CHALLENGE_INFECTED
LANG_ENGLISH        "Infected"

REFERENCE           CHALLENGE_DESC_INFECTED
LANG_ENGLISH        "Killed by an infected..."

REFERENCE           CHALLENGE_PLAGUE
LANG_ENGLISH        "STD"

REFERENCE           CHALLENGE_DESC_PLAGUE
LANG_ENGLISH        "Transmission complete."

REFERENCE           CHALLENGE_C4SHOT
LANG_ENGLISH        "C4 Shot"

REFERENCE           CHALLENGE_DESC_C4SHOT
LANG_ENGLISH        "Kill &&1 enemies by using C4."

REFERENCE           CHALLENGE_PRECISION
LANG_ENGLISH        "Precision"

REFERENCE           CHALLENGE_PRECISION_CAPS
LANG_ENGLISH        "PRECISION"

REFERENCE           CHALLENGE_PRIMARY_WEAPONS_CAPS
LANG_ENGLISH        "PRIMARY WEAPONS"

REFERENCE           CHALLENGE_SECONDARY_WEAPONS_CAPS
LANG_ENGLISH        "SECONDARY WEAPONS"

REFERENCE           CHALLENGE_REVENGE_CAPS
LANG_ENGLISH        "PAYBACK"

REFERENCE           CHALLENGE_FINAL_KILLCAM_CAPS
LANG_ENGLISH        "FINISHING MOVES"

REFERENCE           CHALLENGE_CRABMEAT
LANG_ENGLISH        "Crab Meat"

REFERENCE           CHALLENGE_DESC_CRABMEAT
LANG_ENGLISH        "Kill 10 enemies with a single killstreak."

REFERENCE           CHALLENGE_DESC_CAR_BOMB
LANG_ENGLISH        "Kill &&1 enemies by destroying cars."

REFERENCE           CHALLENGE_RED_CARPET
LANG_ENGLISH        "Red Carpet"

REFERENCE           CHALLENGE_DESC_RED_CARPET
LANG_ENGLISH        "Kill 6 enemies with a single Stealth Bomber."

REFERENCE           CHALLENGE_SABOTEUR
LANG_ENGLISH        "Saboteur"

REFERENCE           CHALLENGE_DESC_SABOTEUR
LANG_ENGLISH        "Plant &&1 bombs."

REFERENCE           CHALLENGE_UAV
LANG_ENGLISH        "Exposed"

REFERENCE           CHALLENGE_AIRDROP_MEGA
LANG_ENGLISH        "Special Delivery"

REFERENCE           CHALLENGE_EMP
LANG_ENGLISH        "Blackout"

REFERENCE           CHALLENGE_COUNTER_UAV
LANG_ENGLISH        "Interference"

REFERENCE           CHALLENGE_AIRDROP
LANG_ENGLISH        "Air Mail"

REFERENCE           CHALLENGE_SENTRY
LANG_ENGLISH        "Sentry Veteran"

REFERENCE           CHALLENGE_PREDATOR_MISSILE
LANG_ENGLISH        "Air to Ground"

REFERENCE           CHALLENGE_PRECISION_AIRSTRIKE
LANG_ENGLISH        "Airstrike Veteran"

REFERENCE           CHALLENGE_HARRIER_AIRSTRIKE
LANG_ENGLISH        "Vertical Takeoff"

REFERENCE           CHALLENGE_HELICOPTER
LANG_ENGLISH        "Attack Helicopter Veteran"

REFERENCE           CHALLENGE_HELICOPTER_FLARES
LANG_ENGLISH        "21 Ton Giant"

REFERENCE           CHALLENGE_STEALTH_AIRSTRIKE
LANG_ENGLISH        "Stealth Bomber Veteran"

REFERENCE           CHALLENGE_HELICOPTER_MINIGUN
LANG_ENGLISH        "Chopper Gunner Veteran"

REFERENCE           CHALLENGE_AC130
LANG_ENGLISH        "AC130 Veteran"

REFERENCE           CHALLENGE_NUKE
LANG_ENGLISH        "End Game"

REFERENCE           CHALLENGE_REAPER
LANG_ENGLISH        "Grim Reaper"

REFERENCE           CHALLENGE_DESC_REAPER
LANG_ENGLISH        "Kill 5 enemies with a single Predator Missile."

REFERENCE           CHALLENGE_GHILLIE
LANG_ENGLISH        "Ghillie in the Mist"

REFERENCE           CHALLENGE_DESC_GHILLIE
LANG_ENGLISH        "Get &&1 one-shot kills with sniper rifles."

REFERENCE           CHALLENGE_SHIELD_DAMAGE
LANG_ENGLISH        "Sponge"

REFERENCE           CHALLENGE_DESC_SHIELD_DAMAGE
LANG_ENGLISH        "Absorb &&1 damage with your Riot Shield."

REFERENCE           CHALLENGE_SHIELD_BULLET
LANG_ENGLISH        "Bullet Proof"

REFERENCE           CHALLENGE_DESC_SHIELD_BULLET
LANG_ENGLISH        "Deflect &&1 bullets with your Riot Shield."

REFERENCE           CHALLENGE_SHIELD_EXPLOSIVE
LANG_ENGLISH        "Unbreakable"

REFERENCE           CHALLENGE_DESC_SHIELD_EXPLOSIVE
LANG_ENGLISH        "Deflect &&1 explosions with your Riot Shield."

REFERENCE           CHALLENGE_INTIMIDATION
LANG_ENGLISH        "Intimidation"

REFERENCE           CHALLENGE_INTIMIDATION_CAPS
LANG_ENGLISH        "INTIMIDATION"

REFERENCE           CHALLENGE_SECRET_CAPS
LANG_ENGLISH        "Secret (DEV ONLY)"

REFERENCE           CHALLENGE_PRESTIGE_MARKSMAN_1
LANG_ENGLISH        ": Veteran I"

REFERENCE           CHALLENGE_PRESTIGE_MARKSMAN_2
LANG_ENGLISH        ": Veteran II"

REFERENCE           CHALLENGE_PRESTIGE_MARKSMAN_3
LANG_ENGLISH        ": Veteran III"

REFERENCE           CHALLENGE_PRESTIGE_MARKSMAN_4
LANG_ENGLISH        ": Veteran IV"

REFERENCE           CHALLENGE_PRESTIGE_MARKSMAN_5
LANG_ENGLISH        ": Veteran V"

REFERENCE           CHALLENGE_PRESTIGE_MARKSMAN_6
LANG_ENGLISH        ": Veteran VI"

REFERENCE           CHALLENGE_PRESTIGE_MARKSMAN_7
LANG_ENGLISH        ": Veteran VII"

REFERENCE           CHALLENGE_PRESTIGE_MARKSMAN_8
LANG_ENGLISH        ": Veteran VIII"

REFERENCE           CHALLENGE_PRESTIGE_MARKSMAN_9
LANG_ENGLISH        ": Veteran IX"

REFERENCE           CHALLENGE_PRESTIGE_MARKSMAN_10
LANG_ENGLISH        ": Veteran X"

REFERENCE           CHALLENGE_PRESTIGE_EXPERT_1
LANG_ENGLISH        ": Master I"

REFERENCE           CHALLENGE_PRESTIGE_EXPERT_2
LANG_ENGLISH        ": Master II"

REFERENCE           CHALLENGE_PRESTIGE_EXPERT_3
LANG_ENGLISH        ": Master III"

REFERENCE           CHALLENGE_PRESTIGE_EXPERT_4
LANG_ENGLISH        ": Master IV"

REFERENCE           CHALLENGE_PRESTIGE_EXPERT_5
LANG_ENGLISH        ": Master V"

REFERENCE           CHALLENGE_PRESTIGE_EXPERT_6
LANG_ENGLISH        ": Master VI"

REFERENCE           CHALLENGE_PRESTIGE_EXPERT_7
LANG_ENGLISH        ": Master VII"

REFERENCE           CHALLENGE_PRESTIGE_EXPERT_8
LANG_ENGLISH        ": Master VIII"

REFERENCE           CHALLENGE_PRESTIGE_EXPERT_9
LANG_ENGLISH        ": Master IX"

REFERENCE           CHALLENGE_PRESTIGE_EXPERT_10
LANG_ENGLISH        ": Master X"

REFERENCE           CHALLENGE_BLANK_0
LANG_ENGLISH        " "

REFERENCE           CHALLENGE_BLANK_1
LANG_ENGLISH        " "

REFERENCE           CHALLENGE_BLANK_2
LANG_ENGLISH        " "

REFERENCE           CHALLENGE_BLANK_3
LANG_ENGLISH        " "

REFERENCE           CHALLENGE_BLANK_4
LANG_ENGLISH        " "

REFERENCE           CHALLENGE_BLANK_5
LANG_ENGLISH        " "

REFERENCE           CHALLENGE_BLANK_6
LANG_ENGLISH        " "

REFERENCE           CHALLENGE_BLANK_7
LANG_ENGLISH        " "

REFERENCE           CHALLENGE_BLANK_8
LANG_ENGLISH        " "

REFERENCE           CHALLENGE_BLANK_9
LANG_ENGLISH        " "

REFERENCE           CHALLENGE_BLANK_10
LANG_ENGLISH        " "

REFERENCE           CHALLENGE_PRESTIGE_CAPS
LANG_ENGLISH        "PRESTIGE"

REFERENCE           CHALLENGE_PRESTIGE_CHALLENGES
LANG_ENGLISH        "The difficult we do immediately. The impossible takes a little while longer."

REFERENCE           CHALLENGE_AVENGER
LANG_ENGLISH        "...with a Vengance."

REFERENCE           CHALLENGE_DESC_AVENGER
LANG_ENGLISH        "Avenge a fallen teammate."

REFERENCE           CHALLENGE_BASIC_CAPS
LANG_ENGLISH        "BASIC TRAINING"

REFERENCE           CHALLENGE_BASIC_CHALLENGES
LANG_ENGLISH        "When in doubt, empty the magazine."

REFERENCE           CHALLENGE_INTIMIDATION_CHALLENGES
LANG_ENGLISH        "When you can't lead by example; Intimidate."

REFERENCE           CHALLENGE_SECONDARY_WEAPONS_HINT
LANG_ENGLISH        "Use secondary weapons to unlock attachments, titles, and emblems."

REFERENCE           CHALLENGE_PRIMARY_WEAPONS_HINT
LANG_ENGLISH        "Use primary weapons to unlock attachments, titles, and emblems."

REFERENCE           CHALLENGE_SECRET_CHALLENGES
LANG_ENGLISH        "All the secret challenges"

REFERENCE           CHALLENGE_REVENGE_CHALLENGES
LANG_ENGLISH        "Revenge is like a ghost."

REFERENCE           CHALLENGE_FINAL_KILLCAM_CHALLENGES
LANG_ENGLISH        "Push to test ... Release to detonate."

REFERENCE           CHALLENGE_PRECISION_CHALLENGES
LANG_ENGLISH        "Tracers work both ways."

REFERENCE           CHALLENGE_GET_N_MULTIKILLS
LANG_ENGLISH        "Get &&1 Multi-Kills with this weapon."

REFERENCE           CHALLENGE_KILL_N_HELICOPTERS
LANG_ENGLISH        "Shoot down &&1 helicopters with this weapon."

REFERENCE           PLAYERCARDS_TITLE_SHARE_PACKAGE
LANG_ENGLISH        "Share Package"

REFERENCE           PLAYERCARDS_TITLE_REMOTEVIEWER
LANG_ENGLISH        "Remote Viewer"

REFERENCE           PLAYERCARDS_TITLE_DISH_THE_ROCK
LANG_ENGLISH        "Dish the Rock"

REFERENCE           PLAYERCARDS_TITLE_SHOT_DOWN
LANG_ENGLISH        "Shot Down"

REFERENCE           PLAYERCARDS_TITLE_ACCIDENT_PRONE
LANG_ENGLISH        "Accident Prone"

REFERENCE           PLAYERCARDS_TITLE_LOW_PROFILE
LANG_ENGLISH        "Low Profile"

REFERENCE           PLAYERCARDS_TITLE_BOW_DOWN
LANG_ENGLISH        "Bow Down"

REFERENCE           PLAYERCARDS_TITLE_TEST
LANG_ENGLISH        "Sample Title"

REFERENCE           PLAYERCARDS_TITLE_FEARED
LANG_ENGLISH        "The Feared"

REFERENCE           PLAYERCARDS_TITLE_FLAMING
LANG_ENGLISH        "The Flaming"

REFERENCE           PLAYERCARDS_TITLE_GHOST
LANG_ENGLISH        "The Ghost"

REFERENCE           PLAYERCARDS_TITLE_STABALOT
LANG_ENGLISH        "Sir Stabalot"

REFERENCE           PLAYERCARDS_TITLE_PYRO
LANG_ENGLISH        "Pyromaniac"

REFERENCE           PLAYERCARDS_TITLE_GRUNT
LANG_ENGLISH        "Grunt"

REFERENCE           PLAYERCARDS_TITLE_UNTOUCHABLE
LANG_ENGLISH        "Untouchable"

REFERENCE           PLAYERCARDS_TITLE_BULLET_MAGNET
LANG_ENGLISH        "Bullet Magnet"

REFERENCE           PLAYERCARDS_TITLE_JUGGERNAUT
LANG_ENGLISH        "Juggernaut"

REFERENCE           PLAYERCARDS_TITLE_WATCHMAN
LANG_ENGLISH        "The Watchman"

REFERENCE           PLAYERCARDS_TITLE_SUPPLIER
LANG_ENGLISH        "The Supplier"

REFERENCE           PLAYERCARDS_TITLE_SUNBLOCK
LANG_ENGLISH        "Sunblock"

REFERENCE           PLAYERCARDS_TITLE_PREDATOR
LANG_ENGLISH        "Predator"

REFERENCE           PLAYERCARDS_TITLE_CARPET
LANG_ENGLISH        "Carpet Bomber"

REFERENCE           PLAYERCARDS_TITLE_NOHANDS
LANG_ENGLISH        "Look! No Hands!"

REFERENCE           PLAYERCARDS_TITLE_LONE_WOLF
LANG_ENGLISH        "Lone Wolf"

REFERENCE           PLAYERCARDS_TITLE_CALLOFDUTY
LANG_ENGLISH        "Call of Duty"

REFERENCE           PLAYERCARDS_TITLE_TANGO_DOWN
LANG_ENGLISH        "Tango Down"

REFERENCE           PLAYERCARDS_TITLE_BOMBSHELL
LANG_ENGLISH        "Bombshell"

REFERENCE           PLAYERCARDS_TITLE_PUSHING_DAISY
LANG_ENGLISH        "Pushin' Daisies"

REFERENCE           PLAYERCARDS_TITLE_DRIFTER
LANG_ENGLISH        "Drifter"

REFERENCE           PLAYERCARDS_TITLE_FIRED
LANG_ENGLISH        "Fired!"

REFERENCE           PLAYERCARDS_TITLE_COBRACOMMANDER
LANG_ENGLISH        "Sky Commander"

REFERENCE           PLAYERCARDS_TITLE_CHOPPER
LANG_ENGLISH        "The Chopper"

REFERENCE           PLAYERCARDS_TITLE_SPIRIT
LANG_ENGLISH        "Pyrotechnical"

REFERENCE           PLAYERCARDS_TITLE_SPECTRE
LANG_ENGLISH        "Spectre"

REFERENCE           PLAYERCARDS_TITLE_JOLLYGREEN
LANG_ENGLISH        "The Dragon"

REFERENCE           PLAYERCARDS_TITLE_SHOCKWAVE
LANG_ENGLISH        "Shockwave"

REFERENCE           PLAYERCARDS_TITLE_WARGAMER
LANG_ENGLISH        "Wargamer"

REFERENCE           PLAYERCARDS_TITLE_LONER
LANG_ENGLISH        "The Loner"

REFERENCE           PLAYERCARDS_TITLE_6FEARS7
LANG_ENGLISH        "6fears7"

REFERENCE           PLAYERCARDS_TITLE_HIJACKER
LANG_ENGLISH        "Hijacker"

REFERENCE           PLAYERCARDS_TITLE_HEADSUP
LANG_ENGLISH        "Heads Up!"

REFERENCE           PLAYERCARDS_TITLE_MARTYR
LANG_ENGLISH        "Martyr"

REFERENCE           PLAYERCARDS_TITLE_LIVINGDEAD
LANG_ENGLISH        "Living Dead"

REFERENCE           PLAYERCARDS_TITLE_CLICKCLICK
LANG_ENGLISH        "Click Click Boom"

REFERENCE           PLAYERCARDS_TITLE_NUMB
LANG_ENGLISH        "The Numb"

REFERENCE           PLAYERCARDS_TITLE_WOPR
LANG_ENGLISH        "MOAB"

REFERENCE           PLAYERCARDS_TITLE_ENEMYOF
LANG_ENGLISH        "Enemy of the State"

REFERENCE           PLAYERCARDS_TITLE_DENIER
LANG_ENGLISH        "The Denier"

REFERENCE           PLAYERCARDS_TITLE_DICTATOR
LANG_ENGLISH        "Dictator"

REFERENCE           PLAYERCARDS_TITLE_MACH5
LANG_ENGLISH        "Mach 5"

REFERENCE           PLAYERCARDS_TITLE_NEWJACK
LANG_ENGLISH        "New Jack"

REFERENCE           PLAYERCARDS_TITLE_DARKBRINGER
LANG_ENGLISH        "Darkbringer"

REFERENCE           PLAYERCARDS_TITLE_TACDEL
LANG_ENGLISH        "TacDel"

REFERENCE           PLAYERCARDS_TITLE_JACKINTHEBOX
LANG_ENGLISH        "Jack-in-the-Box"

REFERENCE           PLAYERCARDS_TITLE_MASTERBLASTER
LANG_ENGLISH        "Solid Steel"

REFERENCE           PLAYERCARDS_TITLE_BULLSEYE
LANG_ENGLISH        "Bullseye"

REFERENCE           PLAYERCARDS_TITLE_CARNIE
LANG_ENGLISH        "Carnie"

REFERENCE           PLAYERCARDS_TITLE_CLOSER
LANG_ENGLISH        "The Closer"

REFERENCE           PLAYERCARDS_TITLE_FINISHER
LANG_ENGLISH        "The Finisher"

REFERENCE           PLAYERCARDS_TITLE_UNBELIEVABLE
LANG_ENGLISH        "Unbelievable"

REFERENCE           PLAYERCARDS_TITLE_STICKMAN
LANG_ENGLISH        "Stickman"

REFERENCE           PLAYERCARDS_TITLE_OWNED
LANG_ENGLISH        "owned."

REFERENCE           PLAYERCARDS_TITLE_DRONEKILLER
LANG_ENGLISH        "Dronekiller"

REFERENCE           PLAYERCARDS_TITLE_DROPPINCRATES
LANG_ENGLISH        "Droppin' Crates"

REFERENCE           PLAYERCARDS_TITLE_LASTRESORT
LANG_ENGLISH        "Last Resort"

REFERENCE           PLAYERCARDS_TITLE_BASELINE
LANG_ENGLISH        "Baseline"

REFERENCE           PLAYERCARDS_TITLE_FOTM
LANG_ENGLISH        "FOTM"

REFERENCE           PLAYERCARDS_TITLE_POOLSHARK
LANG_ENGLISH        "Pool Shark"

REFERENCE           PLAYERCARDS_TITLE_SIDEPOCKET
LANG_ENGLISH        "Side Pocket"

REFERENCE           PLAYERCARDS_TITLE_ITSPERSONAL
LANG_ENGLISH        "It's Personal"

REFERENCE           PLAYERCARDS_TITLE_SMOOTHCRIM
LANG_ENGLISH        "Smooth Criminal"

REFERENCE           PLAYERCARDS_TITLE_FNG
LANG_ENGLISH        "FNG"

REFERENCE           PLAYERCARDS_TITLE_PATRIOT
LANG_ENGLISH        "Patriot"

REFERENCE           PLAYERCARDS_TITLE_GREATWHITE
LANG_ENGLISH        "Great White North"

REFERENCE           PLAYERCARDS_TITLE_CONTINENTAL
LANG_ENGLISH        "Continental"

REFERENCE           PLAYERCARDS_TITLE_PROFESSIONAL
LANG_ENGLISH        "The Professional"

REFERENCE           PLAYERCARDS_TITLE_NEUTRAL
LANG_ENGLISH        "Neutral"

REFERENCE           PLAYERCARDS_TITLE_RISINGSUN
LANG_ENGLISH        "Rising Sun"

REFERENCE           PLAYERCARDS_TITLE_REDEEMER
LANG_ENGLISH        "The Redeemer"

REFERENCE           PLAYERCARDS_TITLE_CONQUERER
LANG_ENGLISH        "The Conquerer"

REFERENCE           PLAYERCARDS_TITLE_TERMINATOR
LANG_ENGLISH        "The Exterminator"

REFERENCE           PLAYERCARDS_TITLE_ULTRANATIONALIST
LANG_ENGLISH        "Ultranationalist"

REFERENCE           PLAYERCARDS_TITLE_BAKED
LANG_ENGLISH        "I'm So Baked..."

REFERENCE           PLAYERCARDS_TITLE_FLYSWATTER
LANG_ENGLISH        "Flyswatter"

REFERENCE           PLAYERCARDS_TITLE_UNDEAD
LANG_ENGLISH        "The Undead"

REFERENCE           PLAYERCARDS_TITLE_BRAINS
LANG_ENGLISH        "Want Brains..."

REFERENCE           PLAYERCARDS_TITLE_JOINTOPS
LANG_ENGLISH        "Joint Ops"

REFERENCE           PLAYERCARDS_TITLE_TASKFORCE420
LANG_ENGLISH        "Task Force 420"

REFERENCE           PLAYERCARDS_TITLE_BLUNTFORCE
LANG_ENGLISH        "Blunt Force"

REFERENCE           PLAYERCARDS_TITLE_CRACKINSKULLS
LANG_ENGLISH        "Crackin' Skulls"

REFERENCE           PLAYERCARDS_TITLE_HEADHUNTER
LANG_ENGLISH        "Headhunter"

REFERENCE           PLAYERCARDS_TITLE_MERCILESS
LANG_ENGLISH        "The Merciless"

REFERENCE           PLAYERCARDS_TITLE_UNICORNPRINCESS
LANG_ENGLISH        "Unicorn Princess"

REFERENCE           PLAYERCARDS_TITLE_SPARKLEMAGIC
LANG_ENGLISH        "Sparkle Magic"

REFERENCE           PLAYERCARDS_TITLE_SKYCAPTAIN
LANG_ENGLISH        "Airborne"

REFERENCE           PLAYERCARDS_TITLE_MADBOMBER
LANG_ENGLISH        "The Mad Bomber"

REFERENCE           PLAYERCARDS_TITLE_GEARHEAD
LANG_ENGLISH        "Gear Head"

REFERENCE           PLAYERCARDS_TITLE_KEEPSONTICKIN
LANG_ENGLISH        "Keeps on Tickin'"

REFERENCE           PLAYERCARDS_TITLE_HALFBAKED
LANG_ENGLISH        "So Baked"

REFERENCE           PLAYERCARDS_TITLE_SIRSMOKEALOT
LANG_ENGLISH        "Sir Smoke-a-Lot"

REFERENCE           PLAYERCARDS_TITLE_HIGHCOMMAND
LANG_ENGLISH        "High Command"

REFERENCE           PLAYERCARDS_TITLE_MYLILPWNY
LANG_ENGLISH        "My Li'l Pwny"

REFERENCE           PLAYERCARDS_TITLE_AVENGER
LANG_ENGLISH        "The Avenger"

REFERENCE           PLAYERCARDS_TITLE_HEARTBREAKER
LANG_ENGLISH        "Heartbreaker"

REFERENCE           PLAYERCARDS_TITLE_SUBMIT_TO_AUTHORITY
LANG_ENGLISH        "Submit to Authority"

REFERENCE           PLAYERCARDS_TITLE_DESTROYER
LANG_ENGLISH        "Destroyer"

REFERENCE           PLAYERCARDS_TITLE_GET_REAL
LANG_ENGLISH        "Get Real"

REFERENCE           PLAYERCARDS_TITLE_INTERGALACTIC_PLANETARY
LANG_ENGLISH        "Intergalactic"

REFERENCE           PLAYERCARDS_TITLE_ITS_SABOTAGE
LANG_ENGLISH        "It's Sabotage!"

REFERENCE           PLAYERCARDS_TITLE_K_FACTOR
LANG_ENGLISH        "K Factor"

REFERENCE           PLAYERCARDS_TITLE_PREEMPTIVE_STRIKE
LANG_ENGLISH        "Preemptive Strike"

REFERENCE           PLAYERCARDS_TITLE_THA_BOMB
LANG_ENGLISH        "Tha Bomb"

REFERENCE           PLAYERCARDS_TITLE_HOTSHOT
LANG_ENGLISH        "Hot Shot"

REFERENCE           PLAYERCARDS_TITLE_SURVIVOR
LANG_ENGLISH        "Survivor"

REFERENCE           PLAYERCARDS_TITLE_OVERWATCH
LANG_ENGLISH        "Overwatch"

REFERENCE           PLAYERCARDS_TITLE_VOYEUR
LANG_ENGLISH        "Voyeur"

REFERENCE           PLAYERCARDS_TITLE_DZ_CLEAR
LANG_ENGLISH        "DZ Clear"

REFERENCE           PLAYERCARDS_TITLE_COMPANION_CRATE
LANG_ENGLISH        "Companion Crate"

REFERENCE           PLAYERCARDS_TITLE_GIVIN_STATIC
LANG_ENGLISH        "Givin' Static"

REFERENCE           PLAYERCARDS_TITLE_SIGINT
LANG_ENGLISH        "SIGINT"

REFERENCE           PLAYERCARDS_TITLE_FIRE_AND_FORGET
LANG_ENGLISH        "Fire and Forget"

REFERENCE           PLAYERCARDS_TITLE_DEATH_FROM_ABOVE
LANG_ENGLISH        "Death From Above"

REFERENCE           PLAYERCARDS_TITLE_GHOST_RIDER
LANG_ENGLISH        "Ghostrider"

REFERENCE           PLAYERCARDS_TITLE_BROKEN_ARROW
LANG_ENGLISH        "Broken Arrow"

REFERENCE           PLAYERCARDS_TITLE_TIME_ON_TARGET
LANG_ENGLISH        "Time on Target"

REFERENCE           PLAYERCARDS_TITLE_STRAIGHT_UP
LANG_ENGLISH        "Straight Up"

REFERENCE           PLAYERCARDS_TITLE_JUMP_JET
LANG_ENGLISH        "Jump Jet"

REFERENCE           PLAYERCARDS_TITLE_STEEL_REIGN
LANG_ENGLISH        "Reign Down"

REFERENCE           PLAYERCARDS_TITLE_SQUAWK_BOX
LANG_ENGLISH        "Squawk Box"

REFERENCE           PLAYERCARDS_TITLE_WHY_SO_SERIOUS
LANG_ENGLISH        "Why So Serious?"

REFERENCE           PLAYERCARDS_TITLE_END_OF_LINE
LANG_ENGLISH        "End of Line"

REFERENCE           PLAYERCARDS_TITLE_BAND_OF_BROTHERS
LANG_ENGLISH        "Blood Brothers"

REFERENCE           PLAYERCARDS_TITLE_TEAM_PLAYER
LANG_ENGLISH        "Team Player"

REFERENCE           PLAYERCARDS_TITLE_BLACKOUT
LANG_ENGLISH        "Flying Tank"

REFERENCE           PLAYERCARDS_TITLE_GRIM_REAPER
LANG_ENGLISH        "The Grim Reaper"

REFERENCE           PLAYERCARDS_TITLE_GETTOTHECHOPPA
LANG_ENGLISH        "Get to the Choppa!"

REFERENCE           PLAYERCARDS_TITLE_RAINOFFIRE
LANG_ENGLISH        "Rain of Fire"

REFERENCE           PLAYERCARDS_TITLE_CHICK_MAGNET
LANG_ENGLISH        "Chick Magnet"

REFERENCE           PLAYERCARDS_TITLE_OMNIPOTENT
LANG_ENGLISH        "Omnipotent"

REFERENCE           PLAYERCARDS_TITLE_ROLLING_THUNDER
LANG_ENGLISH        "Rolling Thunder"

REFERENCE           PLAYERCARDS_TITLE_AIRWOLF
LANG_ENGLISH        "Eyes Above"

REFERENCE           PLAYERCARDS_TITLE_FULL_THROTTLE
LANG_ENGLISH        "Full Throttle"

REFERENCE           PLAYERCARDS_TITLE_CHARITYCASE
LANG_ENGLISH        "Charity Case"

REFERENCE           PLAYERCARDS_TITLE_GAMBLER
LANG_ENGLISH        "Pro Gambler"

REFERENCE           PLAYERCARDS_TITLE_PINEAPPLE_EXPRESS
LANG_ENGLISH        "Pineapple Express"

REFERENCE           PLAYERCARDS_TITLE_FRAG_OUT
LANG_ENGLISH        "Frag Out!"

REFERENCE           PLAYERCARDS_TITLE_CATCH_SHRAPNEL
LANG_ENGLISH        "Catch Shrapnel"

REFERENCE           PLAYERCARDS_TITLE_MASTERMIND
LANG_ENGLISH        "Mastermind"

REFERENCE           PLAYERCARDS_TITLE_COPPERFIELD
LANG_ENGLISH        "Ta-Da!"

REFERENCE           PLAYERCARDS_TITLE_CLOAKANDDAGGER
LANG_ENGLISH        "Cloak and Dagger"

REFERENCE           PLAYERCARDS_TITLE_TAKE_A_STAB
LANG_ENGLISH        "Take a Stab"

REFERENCE           PLAYERCARDS_TITLE_STUCKONYOU
LANG_ENGLISH        "Stuck on You"

REFERENCE           PLAYERCARDS_TITLE_C4ANDAFTER
LANG_ENGLISH        "C4 and After"

REFERENCE           PLAYERCARDS_TITLE_PLASTICMAN
LANG_ENGLISH        "Plastique"

REFERENCE           PLAYERCARDS_TITLE_PLANE_WHISPERER
LANG_ENGLISH        "Plane Whisperer"

REFERENCE           PLAYERCARDS_TITLE_STARFISH_PRIME
LANG_ENGLISH        "Starfish Prime"

REFERENCE           PLAYERCARDS_TITLE_SILENT_KNIGHT
LANG_ENGLISH        "Silence"

REFERENCE           PLAYERCARDS_TITLE_NOTINTHEFACE
LANG_ENGLISH        "Not in the face!"

REFERENCE           PLAYERCARDS_TITLE_HEADSTRONG
LANG_ENGLISH        "Headstrong"

REFERENCE           PLAYERCARDS_TITLE_CRACKINSKULLS1
LANG_ENGLISH        "Crackin' Skulls"

REFERENCE           PLAYERCARDS_TITLE_HEADRUSH
LANG_ENGLISH        "Headrush"

REFERENCE           PLAYERCARDS_TITLE_HEADMOVE
LANG_ENGLISH        "Head! Move!"

REFERENCE           PLAYERCARDS_TITLE_BOOMHEADSHOT
LANG_ENGLISH        "BOOM!  Headshot."

REFERENCE           PLAYERCARDS_TITLE_NBK
LANG_ENGLISH        "NBK"

REFERENCE           PLAYERCARDS_TITLE_ALLPRO
LANG_ENGLISH        "All Pro"

REFERENCE           PLAYERCARDS_TITLE_BIGBADABOOM
LANG_ENGLISH        "Big Bada Boom"

REFERENCE           PLAYERCARDS_TITLE_BOOMBOOMPOW
LANG_ENGLISH        "Boom Boom"

REFERENCE           PLAYERCARDS_TITLE_GENOCIDAL
LANG_ENGLISH        "Kill for Good"

REFERENCE           PLAYERCARDS_TITLE_CLAYMORE
LANG_ENGLISH        "Clay More"

REFERENCE           PLAYERCARDS_TITLE_AMBUSH
LANG_ENGLISH        "Ambush!"

REFERENCE           PLAYERCARDS_TITLE_PINPULLER
LANG_ENGLISH        "Pin Puller"

REFERENCE           PLAYERCARDS_TITLE_BOOYAH
LANG_ENGLISH        "Booyah!"

REFERENCE           PLAYERCARDS_TITLE_ANARCHIST
LANG_ENGLISH        "The Anarchist"

REFERENCE           PLAYERCARDS_TITLE_1BULLET2KILLS
LANG_ENGLISH        "1bullet2kills"

REFERENCE           PLAYERCARDS_TITLE_HIGHLANDER
LANG_ENGLISH        "Highlander"

REFERENCE           PLAYERCARDS_TITLE_STREAKER
LANG_ENGLISH        "Streaker"

REFERENCE           PLAYERCARDS_TITLE_ENEMYBENEFITS
LANG_ENGLISH        "Enemy With Benefits"

REFERENCE           PLAYERCARDS_TITLE_FACEOFF
LANG_ENGLISH        "Faceoff"

REFERENCE           PLAYERCARDS_TITLE_WIREFU
LANG_ENGLISH        "Wire Fu"

REFERENCE           PLAYERCARDS_TITLE_HARDTARGET
LANG_ENGLISH        "Hard Target"

REFERENCE           PLAYERCARDS_TITLE_EXPLOSIVE_ORDINANCE
LANG_ENGLISH        "Explosive Ordinance"

REFERENCE           PLAYERCARDS_TITLE_PUBLIC_ENEMY
LANG_ENGLISH        "Public Enemy"

REFERENCE           PLAYERCARDS_TITLE_HARDCORE_ONLY
LANG_ENGLISH        "Hardcore Only"

REFERENCE           PLAYERCARDS_TITLE_POPOFF
LANG_ENGLISH        "Pop Off"

REFERENCE           PLAYERCARDS_TITLE_SURGICAL
LANG_ENGLISH        "Surgical"

REFERENCE           PLAYERCARDS_TITLE_PARTINGGIFT
LANG_ENGLISH        "Parting Gift"

REFERENCE           PLAYERCARDS_TITLE_EXTRA_CRISPY
LANG_ENGLISH        "3xt4 cr1zby"

REFERENCE           PLAYERCARDS_TITLE_PERFECTIONIST
LANG_ENGLISH        "Perfectionist"

REFERENCE           PLAYERCARDS_TITLE_PHILANTHROPIST
LANG_ENGLISH        "Philanthropist"

REFERENCE           PLAYERCARDS_TITLE_CUTTINCLASS
LANG_ENGLISH        "Cuttin' Class"

REFERENCE           PLAYERCARDS_TITLE_ABSENTEEKILLER
LANG_ENGLISH        "Absentee Killer"

REFERENCE           PLAYERCARDS_TITLE_FINISHINGTOUCH
LANG_ENGLISH        "Finishing Touch"

REFERENCE           PLAYERCARDS_TITLE_TRUELIAR
LANG_ENGLISH        "True Liar"

REFERENCE           PLAYERCARDS_TITLE_OG
LANG_ENGLISH        "OG"

REFERENCE           PLAYERCARDS_TITLE_TRANSFORMER
LANG_ENGLISH        "Transformer"

REFERENCE           PLAYERCARDS_TITLE_TECHNOKILLER
LANG_ENGLISH        "Techno Killer"

REFERENCE           PLAYERCARDS_TITLE_HIDEF
LANG_ENGLISH        "Hi Def"

REFERENCE           PLAYERCARDS_TITLE_THEEDGE
LANG_ENGLISH        "The Edge"

REFERENCE           PLAYERCARDS_TITLE_TANGODOWN
LANG_ENGLISH        "Tango Down"

REFERENCE           PLAYERCARDS_TITLE_ANGELOFDEATH
LANG_ENGLISH        "Angel of Death"

REFERENCE           PLAYERCARDS_TITLE_TAGYOUREIT
LANG_ENGLISH        "Tag! You're it!"

REFERENCE           PLAYERCARDS_TITLE_BOILERMAKER
LANG_ENGLISH        "Boilermaker"

REFERENCE           PLAYERCARDS_TITLE_BACKSTABBER
LANG_ENGLISH        "Backstabber"

REFERENCE           PLAYERCARDS_TITLE_STUNGUN
LANG_ENGLISH        "Stun Gun"

REFERENCE           PLAYERCARDS_TITLE_HEART
LANG_ENGLISH        "<3"

REFERENCE           PLAYERCARDS_TITLE_NOOBTUBER
LANG_ENGLISH        "Noob Tuber"

REFERENCE           PLAYERCARDS_TITLE_RIVAL
LANG_ENGLISH        "Rival"

REFERENCE           PLAYERCARDS_TITLE_OMFG
LANG_ENGLISH        "OMFG"

REFERENCE           PLAYERCARDS_TITLE_THINKFAST
LANG_ENGLISH        "Think Fast!"

REFERENCE           PLAYERCARDS_TITLE_CONCUSSIVEBARRAGE
LANG_ENGLISH        "Concussive Barrage"

REFERENCE           PLAYERCARDS_TITLE_LIGHTSOUT
LANG_ENGLISH        "Lights Out!"

REFERENCE           PLAYERCARDS_TITLE_BACKFIRE
LANG_ENGLISH        "Backfire"

REFERENCE           PLAYERCARDS_TITLE_BLINDFIRE
LANG_ENGLISH        "Blindfire"

REFERENCE           PLAYERCARDS_TITLE_DUCKHUNTER
LANG_ENGLISH        "Skeet Shooter"

REFERENCE           PLAYERCARDS_TITLE_OMNICIDE
LANG_ENGLISH        "Omnicide"

REFERENCE           PLAYERCARDS_TITLE_MVPASSASSIN
LANG_ENGLISH        "MVP Assassin"

REFERENCE           PLAYERCARDS_TITLE_DEVASTATOR
LANG_ENGLISH        "Devastator"

REFERENCE           PLAYERCARDS_TITLE_MONEYSHOT
LANG_ENGLISH        "Money Shot!"

REFERENCE           PLAYERCARDS_TITLE_BLOODMONEY
LANG_ENGLISH        "Blood Money"

REFERENCE           PLAYERCARDS_TITLE_ROBINHOOD
LANG_ENGLISH        "Robin Hood"

REFERENCE           PLAYERCARDS_TITLE_RAINMAKER
LANG_ENGLISH        "Rainmaker"

REFERENCE           PLAYERCARDS_TITLE_MADMAN
LANG_ENGLISH        "Mad Man"

REFERENCE           PLAYERCARDS_TITLE_IDTHIEF
LANG_ENGLISH        "ID Thief"

REFERENCE           PLAYERCARDS_TITLE_TIMEISMONEY
LANG_ENGLISH        "Time is Money"

REFERENCE           PLAYERCARDS_TITLE_QUICKDRAW
LANG_ENGLISH        "Quickdraw"

REFERENCE           PLAYERCARDS_TITLE_CLAYBACK
LANG_ENGLISH        "Dishes are Done"

REFERENCE           PLAYERCARDS_TITLE_IMRICH
LANG_ENGLISH        "I'm Rich!"

REFERENCE           PLAYERCARDS_TITLE_FLATLINER
LANG_ENGLISH        "Flatliner"

REFERENCE           PLAYERCARDS_TITLE_MASTADON
LANG_ENGLISH        "The Mastodon"

REFERENCE           PLAYERCARDS_TITLE_HOWTHE
LANG_ENGLISH        "How the?"

REFERENCE           PLAYERCARDS_TITLE_DOMINOFX
LANG_ENGLISH        "The Domino Effect"

REFERENCE           PLAYERCARDS_TITLE_INVINCIBLE
LANG_ENGLISH        "The Invincible"

REFERENCE           PLAYERCARDS_TITLE_BAM
LANG_ENGLISH        "BAM!"

REFERENCE           PLAYERCARDS_TITLE_LIVELONG
LANG_ENGLISH        "Live Long..."

REFERENCE           PLAYERCARDS_TITLE_REVERSALOFFORTUNE
LANG_ENGLISH        "Reversal of Fortune"

REFERENCE           PLAYERCARDS_TITLE_CLAYPIGEON
LANG_ENGLISH        "Clay Pigeon"

REFERENCE           PLAYERCARDS_TITLE_ICEMAN
LANG_ENGLISH        "I.C.E. Man"

REFERENCE           PLAYERCARDS_TITLE_HIREDGUN
LANG_ENGLISH        "Hired Gun"

REFERENCE           PLAYERCARDS_TITLE_FRIENDSWITH
LANG_ENGLISH        "Friends With Benefits"

REFERENCE           PLAYERCARDS_TITLE_ALLYOURBASE
LANG_ENGLISH        "All Your Base"

REFERENCE           PLAYERCARDS_TITLE_LEGEND
LANG_ENGLISH        "The Legend"

REFERENCE           PLAYERCARDS_TITLE_EVILDEAD
LANG_ENGLISH        "Mmmmm Brains..."

REFERENCE           PLAYERCARDS_TITLE_BIGGERTHEYARE
LANG_ENGLISH        "The Bigger They Are..."

REFERENCE           PLAYERCARDS_TITLE_HARDERTHEYFALL
LANG_ENGLISH        "...The Harder They Fall."

REFERENCE           PLAYERCARDS_TITLE_EPIC
LANG_ENGLISH        "Epic"

REFERENCE           PLAYERCARDS_TITLE_GLOBALTHERMO
LANG_ENGLISH        "Global Thermonuclear War"

REFERENCE           PLAYERCARDS_TITLE_CARPETBOMBER
LANG_ENGLISH        "Carpet Bomber"

REFERENCE           PLAYERCARDS_TITLE_BOMBSAWAY
LANG_ENGLISH        "Bomb's Away!"

REFERENCE           PLAYERCARDS_TITLE_SBD
LANG_ENGLISH        "SBD"

REFERENCE           PLAYERCARDS_TITLE_BIGBROTHER
LANG_ENGLISH        "Big Brother"

REFERENCE           PLAYERCARDS_TITLE_UAVRAYS
LANG_ENGLISH        "UAV Rays"

REFERENCE           PLAYERCARDS_TITLE_AFTERBURNER
LANG_ENGLISH        "Afterburner"

REFERENCE           PLAYERCARDS_TITLE_TOPGUN
LANG_ENGLISH        "Top Gun"

REFERENCE           PLAYERCARDS_TITLE_GATTRIGGER
LANG_ENGLISH        "Gat Trigger"

REFERENCE           PLAYERCARDS_TITLE_THERIPPER
LANG_ENGLISH        "The Ripper"

REFERENCE           PLAYERCARDS_TITLE_TRACKSTAR
LANG_ENGLISH        "Trackstar"

REFERENCE           PLAYERCARDS_TITLE_DECATHLETE
LANG_ENGLISH        "Decathlete"

REFERENCE           PLAYERCARDS_TITLE_SURESHOT
LANG_ENGLISH        "Sureshot"

REFERENCE           PLAYERCARDS_TITLE_NERVESOFSTEEL
LANG_ENGLISH        "Nerves of Steel"

REFERENCE           PLAYERCARDS_TITLE_NINJA
LANG_ENGLISH        "Ninja"

REFERENCE           PLAYERCARDS_TITLE_SPYGAME
LANG_ENGLISH        "Spy Game"

REFERENCE           PLAYERCARDS_TITLE_DISRUPTOR
LANG_ENGLISH        "Disruptor"

REFERENCE           PLAYERCARDS_TITLE_EXTREME
LANG_ENGLISH        "To the Extreme"

REFERENCE           PLAYERCARDS_TITLE_IRONLUNGS
LANG_ENGLISH        "Iron Lungs"

REFERENCE           PLAYERCARDS_TITLE_2FAST
LANG_ENGLISH        "2fast"

REFERENCE           PLAYERCARDS_TITLE_DOUBLEDOWN
LANG_ENGLISH        "Double Down"

REFERENCE           PLAYERCARDS_TITLE_BLINGBLING
LANG_ENGLISH        "Bling Bling"

REFERENCE           PLAYERCARDS_TITLE_HIGHCALIBER
LANG_ENGLISH        "High Caliber"

REFERENCE           PLAYERCARDS_TITLE_DEADLINE
LANG_ENGLISH        "Deadline"

REFERENCE           PLAYERCARDS_TITLE_CLOSESUPPORT
LANG_ENGLISH        "Close Support"

REFERENCE           PLAYERCARDS_TITLE_SPEEDDEMON
LANG_ENGLISH        "Speed Demon"

REFERENCE           PLAYERCARDS_TITLE_ARMYOF1
LANG_ENGLISH        "Army of 1"

REFERENCE           PLAYERCARDS_TITLE_UAVJAMMER
LANG_ENGLISH        "UAV Jammer"

REFERENCE           PLAYERCARDS_TITLE_ARTOFSTEALTH
LANG_ENGLISH        "Art of Stealth"

REFERENCE           PLAYERCARDS_TITLE_HAIRTRIGGER
LANG_ENGLISH        "Hair Trigger"

REFERENCE           PLAYERCARDS_TITLE_1INCHPUNCH
LANG_ENGLISH        "One Inch Punch"

REFERENCE           PLAYERCARDS_TITLE_ARMEDANDDANGEROUS
LANG_ENGLISH        "Armed and Dangerous"

REFERENCE           PLAYERCARDS_TITLE_BITETHEBULLET
LANG_ENGLISH        "Bite the Bullet"

REFERENCE           PLAYERCARDS_TITLE_READYFIRE
LANG_ENGLISH        "Ready. Aim. Fire!"

REFERENCE           PLAYERCARDS_TITLE_PATHFINDER
LANG_ENGLISH        "Pathfinder"

REFERENCE           PLAYERCARDS_TITLE_EARLYDETECTION
LANG_ENGLISH        "Early Detection"

REFERENCE           PLAYERCARDS_TITLE_INVISIBLE
LANG_ENGLISH        "Invisible"

REFERENCE           PLAYERCARDS_TITLE_COUNTERINTEL
LANG_ENGLISH        "Counterintelligence"

REFERENCE           PLAYERCARDS_TITLE_QUICKCHANGE
LANG_ENGLISH        "Quick Change Artist"

REFERENCE           PLAYERCARDS_TITLE_FULLARSENAL
LANG_ENGLISH        "Full Arsenal"

REFERENCE           PLAYERCARDS_TITLE_SILENTSTRIKE
LANG_ENGLISH        "Silent Strike"

REFERENCE           PLAYERCARDS_TITLE_EXCALIBUR
LANG_ENGLISH        "Excalibur"

REFERENCE           PLAYERCARDS_TITLE_IMPALER
LANG_ENGLISH        "Impaler"

REFERENCE           PLAYERCARDS_TITLE_RELOADED
LANG_ENGLISH        "Reloaded"

REFERENCE           PLAYERCARDS_TITLE_BANDOLIER
LANG_ENGLISH        "Bandolier"

REFERENCE           PLAYERCARDS_TITLE_VULTURE
LANG_ENGLISH        "Vulture"

REFERENCE           PLAYERCARDS_TITLE_SONICBOOM
LANG_ENGLISH        "Sonic Boom"

REFERENCE           PLAYERCARDS_TITLE_DANGERCLOSE
LANG_ENGLISH        "Danger Close"

REFERENCE           PLAYERCARDS_TITLE_FULLFORCE
LANG_ENGLISH        "Full Force"

REFERENCE           PLAYERCARDS_TITLE_DEADMANSWITCH
LANG_ENGLISH        "Dead Man's Switch"

REFERENCE           PLAYERCARDS_TITLE_DYINGBREATH
LANG_ENGLISH        "Dying Breath"

REFERENCE           PLAYERCARDS_TITLE_HARDTOKILL
LANG_ENGLISH        "Hard to Kill"

REFERENCE           PLAYERCARDS_TITLE_AMPLIFIER
LANG_ENGLISH        "Amplifier"

REFERENCE           PLAYERCARDS_TITLE_EOD
LANG_ENGLISH        "EOD"

REFERENCE           PLAYERCARDS_TITLE_XRAYVISION
LANG_ENGLISH        "X-Ray Vision"

REFERENCE           PLAYERCARDS_TITLE_WARGASM
LANG_ENGLISH        "Wargasm"

REFERENCE           PLAYERCARDS_TITLE_DOUBLEAGENT
LANG_ENGLISH        "Double Agent"

REFERENCE           PLAYERCARDS_TITLE_FREERUNNER
LANG_ENGLISH        "Freerunner"

REFERENCE           PLAYERCARDS_TITLE_TOXICAVENGER
LANG_ENGLISH        "Toxic"

REFERENCE           PLAYERCARDS_TITLE_INFECTED
LANG_ENGLISH        "Infected"

REFERENCE           PLAYERCARDS_TITLE_PLAGUE
LANG_ENGLISH        "STD"

REFERENCE           PLAYERCARDS_TITLE_KLEPTO
LANG_ENGLISH        "Kleptomaniac"

REFERENCE           PLAYERCARDS_TITLE_BEHINDENEMY
LANG_ENGLISH        "Behind Enemy Lines"

REFERENCE           PLAYERCARDS_TITLE_COMFORTABLYNUMB
LANG_ENGLISH        "Completely Numb"

REFERENCE           PLAYERCARDS_TITLE_SIDEKICK
LANG_ENGLISH        "Sidekick"

REFERENCE           PLAYERCARDS_TITLE_BOUNTYHUNTER
LANG_ENGLISH        "Bounty Hunter"

REFERENCE           PLAYERCARDS_TITLE_NO
LANG_ENGLISH        "No."

REFERENCE           PLAYERCARDS_TITLE_HANDSFREE
LANG_ENGLISH        "Hands Free"

REFERENCE           PLAYERCARDS_TITLE_CLUSTERBOMB
LANG_ENGLISH        "Cluster Bomb"

REFERENCE           PLAYERCARDS_TITLE_REJECTED
LANG_ENGLISH        "Rejected"

REFERENCE           PLAYERCARDS_TITLE_LASTSTANDMASTER
LANG_ENGLISH        "The Stand"

REFERENCE           PLAYERCARDS_TITLE_COBRAKAI
LANG_ENGLISH        "Cobra Strike"

REFERENCE           PLAYERCARDS_TITLE_GODHAND
LANG_ENGLISH        "Godhand"

REFERENCE           PLAYERCARDS_TITLE_BLADEMASTER
LANG_ENGLISH        "Blademaster"

REFERENCE           PLAYERCARDS_TITLE_SILENCERMASTER
LANG_ENGLISH        "The Silent"

REFERENCE           PLAYERCARDS_TITLE_FLASHMASTER
LANG_ENGLISH        "The Flash"

REFERENCE           PLAYERCARDS_TITLE_STUNMASTER
LANG_ENGLISH        "The Stunner"

REFERENCE           PLAYERCARDS_TITLE_AUTOMATOR
LANG_ENGLISH        "The Automator"

REFERENCE           PLAYERCARDS_TITLE_BLADEVET
LANG_ENGLISH        "Blade Veteran"

REFERENCE           PLAYERCARDS_TITLE_LASTSTANDVET
LANG_ENGLISH        "Stand Veteran"

REFERENCE           PLAYERCARDS_TITLE_SILENCERVET
LANG_ENGLISH        "Silent Veteran"

REFERENCE           PLAYERCARDS_TITLE_FLASHVET
LANG_ENGLISH        "Flash Veteran"

REFERENCE           PLAYERCARDS_TITLE_STUNVET
LANG_ENGLISH        "Stunner Veteran"

REFERENCE           PLAYERCARDS_TITLE_COLDSTEEL
LANG_ENGLISH        "Cold Steel"

REFERENCE           PLAYERCARDS_TITLE_SHOTOVER
LANG_ENGLISH        "Shot Over"

REFERENCE           PLAYERCARDS_TITLE_STRINGFELLOW
LANG_ENGLISH        "Direct Connect"

REFERENCE           PLAYERCARDS_TITLE_DOCTOR
LANG_ENGLISH        "My name is..."

REFERENCE           PLAYERCARDS_TITLE_INCISER
LANG_ENGLISH        "The Inciser"

REFERENCE           PLAYERCARDS_TITLE_PHOENIXRISING
LANG_ENGLISH        "Phoenix Rising"

REFERENCE           PLAYERCARDS_TITLE_SHOCKANDAWE
LANG_ENGLISH        "Shock and Awe"

REFERENCE           PLAYERCARDS_TITLE_FLASHER
LANG_ENGLISH        "The Flasher"

REFERENCE           PLAYERCARDS_TITLE_UNSEEN
LANG_ENGLISH        "The Unseen"

REFERENCE           PLAYERCARDS_TITLE_SSDD
LANG_ENGLISH        "S.S.D.D."

REFERENCE           PLAYERCARDS_TITLE_SPECIALIST
LANG_ENGLISH        "The Specialist"

REFERENCE           PLAYERCARDS_TITLE_PRESTIGE1
LANG_ENGLISH        "The Prestige"

REFERENCE           PLAYERCARDS_TITLE_PRESTIGE2
LANG_ENGLISH        "Round 2"

REFERENCE           PLAYERCARDS_TITLE_PRESTIGE3
LANG_ENGLISH        "Third Time Charm"

REFERENCE           PLAYERCARDS_TITLE_PRESTIGE4
LANG_ENGLISH        "4 the Record"

REFERENCE           PLAYERCARDS_TITLE_PRESTIGE5
LANG_ENGLISH        "Five Sided Fistagon"

REFERENCE           PLAYERCARDS_TITLE_PRESTIGE6
LANG_ENGLISH        "6 Feet Under"

REFERENCE           PLAYERCARDS_TITLE_PRESTIGE7
LANG_ENGLISH        "Lucky 7"

REFERENCE           PLAYERCARDS_TITLE_PRESTIGE8
LANG_ENGLISH        "Hard Eight"

REFERENCE           PLAYERCARDS_TITLE_PRESTIGE9
LANG_ENGLISH        "9 Lives"

REFERENCE           PLAYERCARDS_TITLE_PRESTIGE10
LANG_ENGLISH        "Prestige 10"

REFERENCE           PLAYERCARDS_TITLE_20
LANG_ENGLISH        "Sgt."

REFERENCE           PLAYERCARDS_TITLE_50
LANG_ENGLISH        "Maj."

REFERENCE           PLAYERCARDS_TITLE_30A
LANG_ENGLISH        "30 Something"

REFERENCE           PLAYERCARDS_TITLE_40
LANG_ENGLISH        "1st Lt."

REFERENCE           PLAYERCARDS_TITLE_60
LANG_ENGLISH        "Gen."

REFERENCE           PLAYERCARDS_TITLE_70
LANG_ENGLISH        "Commander"

REFERENCE           PLAYERCARDS_TITLE_20A
LANG_ENGLISH        "Sarge"

REFERENCE           PLAYERCARDS_TITLE_40A
LANG_ENGLISH        "High Command"

REFERENCE           PLAYERCARDS_TITLE_50A
LANG_ENGLISH        "a Major Pain"

REFERENCE           PLAYERCARDS_TITLE_60A
LANG_ENGLISH        "Schooled"

REFERENCE           PLAYERCARDS_TITLE_SUPPRESSOR
LANG_ENGLISH        "Suppressor"

REFERENCE           PLAYERCARDS_TITLE_30
LANG_ENGLISH        "1st Sgt."

REFERENCE           PLAYERCARDS_TITLE_GRASSYKNOLL
LANG_ENGLISH        "Grassy Knoll"

REFERENCE           PLAYERCARDS_TITLE_GHILLIEMIST
LANG_ENGLISH        "Ghillie in the Mist"

REFERENCE           PLAYERCARDS_TITLE_BLUNTTRAUMA
LANG_ENGLISH        "Blunt Trauma"

REFERENCE           PLAYERCARDS_TITLE_SMASHHIT
LANG_ENGLISH        "Smash Hit"

REFERENCE           PLAYERCARDS_TITLE_PROTECTANDSERVE
LANG_ENGLISH        "Protect and Serve"

REFERENCE           PLAYERCARDS_TITLE_UNBREAKABLE
LANG_ENGLISH        "Unbreakable"

REFERENCE           PLAYERCARDS_TITLE_BULLETPROOF
LANG_ENGLISH        "Bulletproof"

REFERENCE           PLAYERCARDS_TITLE_REZERO
LANG_ENGLISH        "Re-Zero"

REFERENCE           PLAYERCARDS_TITLE_BACKSMASHER
LANG_ENGLISH        "Backsmasher"

REFERENCE           NETWORK_OPEN
LANG_ENGLISH        "Open"

REFERENCE           NETWORK_MODERATE
LANG_ENGLISH        "Moderate"

REFERENCE           NETWORK_STRICT
LANG_ENGLISH        "Strict"

REFERENCE           NETWORK_YOURNATTYPE
LANG_ENGLISH        "Your NAT Type:"

REFERENCE           NETWORK_MODERATEPARTYWARNING
LANG_ENGLISH        "Your NAT type is Moderate.  This means players may have trouble connecting to you and joining your party."

REFERENCE           NETWORK_STRICTPARTYWARNING
LANG_ENGLISH        "Your NAT type is Strict.  This means it is hard for other players to connect to you - so if you invite people they may not make it into your party.  "

REFERENCE           NETWORK_MODERATELOBBYWARNING
LANG_ENGLISH        "Your NAT type is Moderate.  This means players may have trouble connecting to you and joining your Private Match lobby."

REFERENCE           NETWORK_STRICTLOBBYWARNING
LANG_ENGLISH        "Your NAT type is Strict.  This means it is hard for other players to connect to you - so if you invite people they may not make it into your Private Match lobby.  "

REFERENCE           MENU_PASSWORD2
LANG_ENGLISH        "Reenter Password:"

REFERENCE           MENU_YES
LANG_ENGLISH        "Yes"

REFERENCE           MENU_MULTIPLAYER
LANG_ENGLISH        "Multiplayer"

REFERENCE           MENU_QUIT
LANG_ENGLISH        "Quit"

REFERENCE           MENU_OPTIONS
LANG_ENGLISH        "Options"

REFERENCE           MENU_SAVELOADGAME
LANG_ENGLISH        "Save/Load Game"

REFERENCE           MENU_LOADGAME
LANG_ENGLISH        "Load Game"

REFERENCE           MENU_NEWGAME
LANG_ENGLISH        "New Game"

REFERENCE           MENU_TRAINING
LANG_ENGLISH        "Training"

REFERENCE           MENU_RESUMEGAME
LANG_ENGLISH        "Resume Game"

REFERENCE           MENU_BACKTOGAME
LANG_ENGLISH        "Back To Game"

REFERENCE           MENU_CURRENTLYINAGAME
LANG_ENGLISH        "You are currently in a game"

REFERENCE           MENU_DOYOUWISHTOCONTINUE
LANG_ENGLISH        "Do you wish to continue?"

REFERENCE           MENU_CHOOSESKILLLEVEL
LANG_ENGLISH        "Choose Your Skill Level"

REFERENCE           MENU_REGULAR
LANG_ENGLISH        "Regular"

REFERENCE           MENU_HARDENED
LANG_ENGLISH        "Hardened"

REFERENCE           MENU_VETERAN
LANG_ENGLISH        "Veteran"

REFERENCE           MENU_BACK
LANG_ENGLISH        "Back"

REFERENCE           MENU_STARTTRAINING
LANG_ENGLISH        "Start training?"

REFERENCE           MENU_SWITCHTOMULTIPLAYER
LANG_ENGLISH        "Switch to Multiplayer?"

REFERENCE           MENU_NO
LANG_ENGLISH        "No"

REFERENCE           MENU_SAVEGAMELIST
LANG_ENGLISH        "Save Game List"

REFERENCE           MENU_SHOWAUTOSAVES
LANG_ENGLISH        "Show Auto Saves"

REFERENCE           MENU_SHOWMANUALSAVES
LANG_ENGLISH        "Show Manual Saves"

REFERENCE           MENU_NAME
LANG_ENGLISH        "Name"

REFERENCE           MENU_DATE
LANG_ENGLISH        "Date"

REFERENCE           MENU_SAVEAS
LANG_ENGLISH        "Save As:"

REFERENCE           MENU_DELETE
LANG_ENGLISH        "Delete"

REFERENCE           MENU_LOAD
LANG_ENGLISH        "Load"

REFERENCE           MENU_SAVE
LANG_ENGLISH        "Save"

REFERENCE           MENU_DEL_SEL_SAVEGAME
LANG_ENGLISH        "Delete selected save game?"

REFERENCE           MENU_OVERWRITE_EXISTING_FILE
LANG_ENGLISH        "Overwrite existing file?"

REFERENCE           MENU_OK
LANG_ENGLISH        "OK"

REFERENCE           MENU_YOU_MUST_SPECIFY_A_FILENAME
LANG_ENGLISH        "You must specify a filename!"

REFERENCE           MENU_ARE_YOU_SURE_QUIT
LANG_ENGLISH        "Are you sure you want to quit?"

REFERENCE           MENU_CONTROLS
LANG_ENGLISH        "Controls"

REFERENCE           MENU_CONTROLS_CAPS
LANG_ENGLISH        "CONTROLS"

REFERENCE           MENU_LOOK
LANG_ENGLISH        "Look"

REFERENCE           MENU_MOVE
LANG_ENGLISH        "Move"

REFERENCE           MENU_SHOOT
LANG_ENGLISH        "Shoot..."

REFERENCE           MENU_SAVE_INTERACT
LANG_ENGLISH        "Save/Interact"

REFERENCE           MENU_CONTROL_DEFAULTS
LANG_ENGLISH        "Control Defaults"

REFERENCE           MENU_SYSTEM
LANG_ENGLISH        "System"

REFERENCE           MENU_GRAPHICS
LANG_ENGLISH        "Graphics"

REFERENCE           MENU_SOUND
LANG_ENGLISH        "Sound"

REFERENCE           MENU_PERFORMANCE
LANG_ENGLISH        "Performance"

REFERENCE           MENU_DRIVERINFO
LANG_ENGLISH        "Driver Info"

REFERENCE           MENU_RESET_SYSTEM_DEFAULTS
LANG_ENGLISH        "Optimal Video and Audio"

REFERENCE           MENU_CREDITS
LANG_ENGLISH        "Credits"

REFERENCE           MENU_RESET_TO_DEFAULTS
LANG_ENGLISH        "Reset to Default"

REFERENCE           MENU_THIS_WILL_RESTORE_ALL_SETTINGS
LANG_ENGLISH        "Each setting will be restored"

REFERENCE           MENU_TO_THEIR_DEFAULT_VALUE
LANG_ENGLISH        "to its default value."

REFERENCE           MENU_ARE_YOU_SURE
LANG_ENGLISH        "Are you sure?"

REFERENCE           MENU_YOUR_CONTROLS_ARE_NOW_SET
LANG_ENGLISH        "Your controls are now set"

REFERENCE           MENU_TO_THEIR_ORIGINAL_DEFAULT_VALUES
LANG_ENGLISH        "to their original default values."

REFERENCE           MENU_CLOSE
LANG_ENGLISH        "Close"

REFERENCE           MENU_OPTIONS_SYSTEM
LANG_ENGLISH        "Options - System"

REFERENCE           MENU_SET_RECOMMENDED
LANG_ENGLISH        "Set Recommended"

REFERENCE           MENU_QUALITY
LANG_ENGLISH        "Quality"

REFERENCE           MENU_QUALITY_RECOMMENDED
LANG_ENGLISH        "Quality:  Recommended"

REFERENCE           MENU_VIDEO_MODE
LANG_ENGLISH        "Resolution"

REFERENCE           MENU_COLOR_DEPTH
LANG_ENGLISH        "Color Depth"

REFERENCE           MENU_FULLSCREEN
LANG_ENGLISH        "Full Screen"

REFERENCE           MENU_GEOMETRIC_DETAIL
LANG_ENGLISH        "Geometric Detail"

REFERENCE           MENU_CHARACTER_TEXTURES
LANG_ENGLISH        "Character Textures"

REFERENCE           MENU_GENERAL_TEXTURES
LANG_ENGLISH        "General Textures"

REFERENCE           MENU_TEXTURE_FILTER
LANG_ENGLISH        "Texture Filter"

REFERENCE           MENU_TEXTURE_QUALITY
LANG_ENGLISH        "Texture Quality"

REFERENCE           MENU_NVIDIA_DISTANCE_FOG
LANG_ENGLISH        "Nvidia Distance Fog"

REFERENCE           MENU_BRIGHTNESS
LANG_ENGLISH        "Brightness"

REFERENCE           MENU_LANGUAGE
LANG_ENGLISH        "Language"

REFERENCE           MENU_APPLY_LANGUAGE_CHANGE
LANG_ENGLISH        "Apply Language Change"

REFERENCE           MENU_APPLY
LANG_ENGLISH        "Apply"

REFERENCE           MENU_APPLY_CAPS
LANG_ENGLISH        "APPLY"

REFERENCE           MENU_YOUR_SETTINGS_ARE_NOW_SET
LANG_ENGLISH        "Your settings are now set"

REFERENCE           MENU_OPTIONS_CONTROLS
LANG_ENGLISH        "Options - Controls"

REFERENCE           MENU_LOOK_UP
LANG_ENGLISH        "Look Up"

REFERENCE           MENU_LOOK_DOWN
LANG_ENGLISH        "Look Down"

REFERENCE           MENU_MOUSE_LOOK
LANG_ENGLISH        "Mouse Look"

REFERENCE           MENU_CENTER_VIEW
LANG_ENGLISH        "Center View"

REFERENCE           MENU_FREE_LOOK
LANG_ENGLISH        "Free Look"

REFERENCE           MENU_INVERT_MOUSE
LANG_ENGLISH        "Invert Mouse"

REFERENCE           MENU_SMOOTH_MOUSE
LANG_ENGLISH        "Smooth Mouse"

REFERENCE           MENU_MOUSE_SENSITIVITY
LANG_ENGLISH        "Mouse Sensitivity"

REFERENCE           MENU_SHOW_OBJECTIVES_SCORES
LANG_ENGLISH        "Show Objectives/Scores"

REFERENCE           MENU_USE
LANG_ENGLISH        "Use"

REFERENCE           MENU_QUICK_SAVE
LANG_ENGLISH        "Quick Save"

REFERENCE           MENU_QUICK_LOAD
LANG_ENGLISH        "Quick Load"

REFERENCE           MENU_SCREENSHOT
LANG_ENGLISH        "Screenshot"

REFERENCE           MENU_FORWARD
LANG_ENGLISH        "Forward"

REFERENCE           MENU_BACKPEDAL
LANG_ENGLISH        "Backpedal"

REFERENCE           MENU_MOVE_LEFT
LANG_ENGLISH        "Move Left"

REFERENCE           MENU_MOVE_RIGHT
LANG_ENGLISH        "Move Right"

REFERENCE           MENU_LEAN_LEFT
LANG_ENGLISH        "Lean Left"

REFERENCE           MENU_LEAN_RIGHT
LANG_ENGLISH        "Lean Right"

REFERENCE           MENU_STAND
LANG_ENGLISH        "Stand"

REFERENCE           MENU_CROUCH
LANG_ENGLISH        "Crouch"

REFERENCE           MENU_PRONE
LANG_ENGLISH        "Prone"

REFERENCE           MENU_JUMP_STANCE_UP
LANG_ENGLISH        "Jump/Stance Up"

REFERENCE           MENU_STANCE_DOWN
LANG_ENGLISH        "Stance Down"

REFERENCE           MENU_STANCE_UP
LANG_ENGLISH        "Stance Up"

REFERENCE           MENU_TOGGLE_CROUCH
LANG_ENGLISH        "Toggle Crouch"

REFERENCE           MENU_TOGGLE_PRONE
LANG_ENGLISH        "Toggle Prone"

REFERENCE           MENU_HOLD_DOWN_CROUCH
LANG_ENGLISH        "Hold Crouch"

REFERENCE           MENU_HOLD_DOWN_PRONE
LANG_ENGLISH        "Hold Prone"

REFERENCE           MENU_TURN_LEFT
LANG_ENGLISH        "Turn Left"

REFERENCE           MENU_TURN_RIGHT
LANG_ENGLISH        "Turn Right"

REFERENCE           MENU_STRAFE
LANG_ENGLISH        "Hold Strafe"

REFERENCE           MENU_WALL_MARKS
LANG_ENGLISH        "Wall Marks"

REFERENCE           MENU_EJECTING_BRASS
LANG_ENGLISH        "Ejecting Brass"

REFERENCE           MENU_DYNAMIC_LIGHTS
LANG_ENGLISH        "Dynamic Lights"

REFERENCE           MENU_LOW_QUALITY_SKY
LANG_ENGLISH        "Low Quality Sky"

REFERENCE           MENU_SYNC_EVERY_FRAME
LANG_ENGLISH        "Sync Every Frame"

REFERENCE           MENU_NVIDIA_FOG_TYPE
LANG_ENGLISH        "Nvidia fog type"

REFERENCE           MENU_ATTACK
LANG_ENGLISH        "Attack"

REFERENCE           MENU_TOGGLE_AIM_DOWN_THE_SIGHT
LANG_ENGLISH        "Toggle Aim Down the Sight"

REFERENCE           MENU_AIM_DOWN_THE_SIGHT
LANG_ENGLISH        "Aim Down the Sight"

REFERENCE           MENU_MELEE_ATTACK
LANG_ENGLISH        "Melee"

REFERENCE           MENU_RELOAD_WEAPON
LANG_ENGLISH        "Reload"

REFERENCE           MENU_TOGGLE_SEMIAUTOMATIC
LANG_ENGLISH        "Toggle Semi-Automatic "

REFERENCE           MENU_SELECT_FIRST_WEAPON
LANG_ENGLISH        "Select First Weapon"

REFERENCE           MENU_SELECT_SECOND_WEAPON
LANG_ENGLISH        "Select Second Weapon"

REFERENCE           MENU_SELECT_PISTOL
LANG_ENGLISH        "Select Pistol"

REFERENCE           MENU_SELECT_GRENADE
LANG_ENGLISH        "Select Grenade"

REFERENCE           MENU_NEXT_WEAPON
LANG_ENGLISH        "Next Weapon"

REFERENCE           MENU_PREVIOUS_WEAPON
LANG_ENGLISH        "Previous Weapon"

REFERENCE           MENU_LAST_WEAPON_USED
LANG_ENGLISH        "Last Weapon Used"

REFERENCE           MENU_EFFECTS_VOLUME
LANG_ENGLISH        "Effects Volume"

REFERENCE           MENU_MUSIC_VOLUME
LANG_ENGLISH        "Music Volume"

REFERENCE           MENU_SOUND_QUALITY
LANG_ENGLISH        "Sound Quality"

REFERENCE           MENU_SPEAKER_CONFIG
LANG_ENGLISH        "Speaker Config"

REFERENCE           MENU_THIS_WILL_APPLY_SOUND
LANG_ENGLISH        "This will apply sound"

REFERENCE           MENU_SETTINGS_AND_RETURN
LANG_ENGLISH        "settings and return"

REFERENCE           MENU_TO_THE_MAIN_MENU
LANG_ENGLISH        "to the Main Menu."

REFERENCE           MENU_NOTICE
LANG_ENGLISH        "Notice"

REFERENCE           MENU_ERROR
LANG_ENGLISH        "Error"

REFERENCE           MENU_EXIT
LANG_ENGLISH        "Exit"

REFERENCE           MENU_THIS_WILL_APPLY_VIDEO
LANG_ENGLISH        "This will apply video"

REFERENCE           MENU_RESTART_LEVEL
LANG_ENGLISH        "Restart Level"

REFERENCE           MENU_RESTART_MISSION
LANG_ENGLISH        "Restart Mission"

REFERENCE           MENU_LOAD_LAST_SAVE
LANG_ENGLISH        "Load Last Save"

REFERENCE           MENU_MAIN_MENU
LANG_ENGLISH        "Main Menu"

REFERENCE           MENU_MAIN_MENU_CAPS
LANG_ENGLISH        "MAIN MENU"

REFERENCE           MENU_CLICK_TO_START_THE_MISSION
LANG_ENGLISH        "Click to Start the Mission"

REFERENCE           MENU_NEXT_LEVEL
LANG_ENGLISH        "Next Level"

REFERENCE           MENU_THIS_WILL_SET
LANG_ENGLISH        "This will set"

REFERENCE           MENU_RECOMMENDED_VIDEO_SETTINGS
LANG_ENGLISH        "recommended video settings"

REFERENCE           MENU_AND_RETURN_TO_THE_MAIN_MENU
LANG_ENGLISH        "and return to the Main Menu."

REFERENCE           MENU_JOIN_AN_INTERNET_GAME
LANG_ENGLISH        "Join an Internet Game"

REFERENCE           MENU_JOIN_A_LAN_GAME
LANG_ENGLISH        "Join a LAN Game"

REFERENCE           MENU_DISCONNECT
LANG_ENGLISH        "Disconnect"

REFERENCE           MENU_START_NEW_SERVER
LANG_ENGLISH        "Start New Server"

REFERENCE           MENU_MULTIPLAYER_OPTIONS
LANG_ENGLISH        "Multiplayer Options"

REFERENCE           MENU_MODS
LANG_ENGLISH        "Mods"

REFERENCE           MENU_MODSWITHCOLON
LANG_ENGLISH        "Mods:"

REFERENCE           MENU_SINGLE_PLAYER
LANG_ENGLISH        "Single Player"

REFERENCE           MENU_CLICK_FOR_AUTOUPDATE
LANG_ENGLISH        "Click for Auto-Update"

REFERENCE           MENU_SWITCH_TO_SINGLE_PLAYER
LANG_ENGLISH        "Switch to Main Menu?"

REFERENCE           MENU_DOWNLOAD_AUTOUPDATE_PATCH
LANG_ENGLISH        "Download Auto-Update Patch?"

REFERENCE           MENU_VERSION_INSTALLED
LANG_ENGLISH        "Version Installed:"

REFERENCE           MENU_VERSION_AVAILABLE
LANG_ENGLISH        "Version Available:"

REFERENCE           MENU_CDKEY
LANG_ENGLISH        "CD KEY"

REFERENCE           MENU_ENTER_YOUR_ENCRYPTION_KEY_IN_THE_FIELD_BELOW
LANG_ENGLISH        "Enter your encryption key in the field below."

REFERENCE           MENU_KEY
LANG_ENGLISH        "Key:"

REFERENCE           MENU_CANCEL
LANG_ENGLISH        "Cancel"

REFERENCE           MENU_VERIFY
LANG_ENGLISH        "Verify"

REFERENCE           MENU_NEW_FAVORITE
LANG_ENGLISH        "New Favorite"

REFERENCE           MENU_NAME1
LANG_ENGLISH        "Name: "

REFERENCE           MENU_IP_ADDRESS
LANG_ENGLISH        "IP Address: "

REFERENCE           MENU_FILTER_SERVERS
LANG_ENGLISH        "Filter Servers"

REFERENCE           MENU_VIEW_EMPTY
LANG_ENGLISH        "View Empty:"

REFERENCE           MENU_VIEW_FULL
LANG_ENGLISH        "View Full:"

REFERENCE           MENU_FRIENDLY_FIRE
LANG_ENGLISH        "Friendly Fire:  "

REFERENCE           MENU_SHOW_MAX_LIVES
LANG_ENGLISH        "Show Max Lives:"

REFERENCE           MENU_SHOW_TOURNEY
LANG_ENGLISH        "Show Tourney:"

REFERENCE           MENU_TYPE
LANG_ENGLISH        "Type:"

REFERENCE           MENU_SERVER NAME
LANG_ENGLISH        "Server Name"

REFERENCE           MENU_MAP_NAME
LANG_ENGLISH        "Map Name"

REFERENCE           MENU_NUMPLAYERS
LANG_ENGLISH        "#Players"

REFERENCE           MENU_PING
LANG_ENGLISH        "Ping"

REFERENCE           MENU_GET_NEW_LIST
LANG_ENGLISH        "Get New List"

REFERENCE           MENU_REFRESH_LIST
LANG_ENGLISH        "Refresh List"

REFERENCE           MENU_PASSWORD
LANG_ENGLISH        "Password"

REFERENCE           MENU_ADD_TO_FAVORITES
LANG_ENGLISH        "Add To Favorites"

REFERENCE           MENU_DEL_FAVORITE
LANG_ENGLISH        "Del. Favorite"

REFERENCE           MENU_SERVER_INFO
LANG_ENGLISH        "Server Info"

REFERENCE           MENU_FIND_FRIEND
LANG_ENGLISH        "Find Friend"

REFERENCE           MENU_ACCEPT
LANG_ENGLISH        "Accept"

REFERENCE           MENU_CONNECTION_TYPE
LANG_ENGLISH        "Connection Type:"

REFERENCE           MENU_LAUNCH
LANG_ENGLISH        "Launch"

REFERENCE           MENU_SELECT_MOD_NAME_TO_LAUNCH
LANG_ENGLISH        "Select MOD name to Launch"

REFERENCE           MENU_JOIN_SERVER
LANG_ENGLISH        "Join Server"

REFERENCE           MENU_CREATE_SERVER
LANG_ENGLISH        "Create Server"

REFERENCE           MENU_ENTER CD-KEY
LANG_ENGLISH        "Enter CD-Key"

REFERENCE           MENU_SHOW_SCORES
LANG_ENGLISH        "Show Scores:"

REFERENCE           MENU_CHAT
LANG_ENGLISH        "Chat"

REFERENCE           MENU_TEAM_CHAT
LANG_ENGLISH        "Team Chat"

REFERENCE           MENU_QUICK_CHAT
LANG_ENGLISH        "Quick Chat"

REFERENCE           MENU_SHOW_COMPASS
LANG_ENGLISH        "Show Compass:"

REFERENCE           MENU_TEAM_OVERLAY
LANG_ENGLISH        "Team Overlay:"

REFERENCE           MENU_CHAT_ICON_TIME
LANG_ENGLISH        "Chat Icon Time:"

REFERENCE           MENU_NET_DATA_RATE
LANG_ENGLISH        "Net Data Rate:"

REFERENCE           MENU_PLAYER_NAME
LANG_ENGLISH        "Player Name"

REFERENCE           MENU_REFRESH
LANG_ENGLISH        "Refresh"

REFERENCE           MENU_CONTINUE
LANG_ENGLISH        "Continue"

REFERENCE           MENU_HIGHQUALITY
LANG_ENGLISH        "High Quality"

REFERENCE           MENU_NORMAL
LANG_ENGLISH        "Normal"

REFERENCE           MENU_FAST
LANG_ENGLISH        "Fast"

REFERENCE           MENU_FASTEST
LANG_ENGLISH        "Fastest"

REFERENCE           MENU_CUSTOM
LANG_ENGLISH        "Custom"

REFERENCE           MENU_INTERACT
LANG_ENGLISH        "Interact"

REFERENCE           MENU_SET_DEFAULT_CONTROLS
LANG_ENGLISH        "Restore Defaults"

REFERENCE           MENU_STANDJUMP
LANG_ENGLISH        "Stand/Jump"

REFERENCE           MENU_GO_TO_CROUCH
LANG_ENGLISH        "Go to Crouch"

REFERENCE           MENU_GO_TO_PRONE
LANG_ENGLISH        "Go to Prone"

REFERENCE           MENU_LOAD_SELECTED_GAME
LANG_ENGLISH        "Load selected game?"

REFERENCE           MENU_DEL_SEL_FAVORITE
LANG_ENGLISH        "Delete selected favorite from list?"

REFERENCE           MENU_VOTE_YES
LANG_ENGLISH        "Vote Yes"

REFERENCE           MENU_VOTE_NO
LANG_ENGLISH        "Vote No"

REFERENCE           MENU_CHANGE_RATE_OF_FIRE
LANG_ENGLISH        "Change Rate of Fire"

REFERENCE           MENU_DRAW_HUD
LANG_ENGLISH        "Draw HUD"

REFERENCE           MENU_DRAW_CROSSHAIR
LANG_ENGLISH        "Draw Crosshair"

REFERENCE           MENU_QUICK_REFRESH
LANG_ENGLISH        "Quick Refresh"

REFERENCE           MENU_WORLD_DYNAMIC_LIGHT_QUALITY
LANG_ENGLISH        "World Dynamic Light Quality"

REFERENCE           MENU_SHOW_BLOOD
LANG_ENGLISH        "Show Blood"

REFERENCE           MENU_THIS_WILL_APPLY_THE
LANG_ENGLISH        "This will apply the"

REFERENCE           MENU_LANGUAGE_CHANGE_AND_RETURN
LANG_ENGLISH        "language change and return"

REFERENCE           MENU_640480
LANG_ENGLISH        "640*480"

REFERENCE           MENU_800600
LANG_ENGLISH        "800*600"

REFERENCE           MENU_1024768
LANG_ENGLISH        "1024*768"

REFERENCE           MENU_1152864
LANG_ENGLISH        "1152*864"

REFERENCE           MENU_12801024
LANG_ENGLISH        "1280*1024"

REFERENCE           MENU_16001200
LANG_ENGLISH        "1600*1200"

REFERENCE           MENU_20481536
LANG_ENGLISH        "2048*1536"

REFERENCE           MENU_LOW
LANG_ENGLISH        "Low"

REFERENCE           MENU_HIGH
LANG_ENGLISH        "High"

REFERENCE           MENU_EXTRA
LANG_ENGLISH        "Extra"

REFERENCE           MENU_BILINEAR
LANG_ENGLISH        "Bilinear"

REFERENCE           MENU_TRILINEAR
LANG_ENGLISH        "Trilinear"

REFERENCE           MENU_ANISOTROPIC
LANG_ENGLISH        "Anisotropic"

REFERENCE           MENU_DEFAULT
LANG_ENGLISH        "Default"

REFERENCE           MENU_16BIT
LANG_ENGLISH        "16 bit"

REFERENCE           MENU_32BIT
LANG_ENGLISH        "32 bit"

REFERENCE           MENU_ENGLISH
LANG_ENGLISH        "English"

REFERENCE           MENU_FRENCH
LANG_ENGLISH        "French"

REFERENCE           MENU_GERMAN
LANG_ENGLISH        "German"

REFERENCE           MENU_ITALIAN
LANG_ENGLISH        "Italian"

REFERENCE           MENU_SPANISH
LANG_ENGLISH        "Spanish"

REFERENCE           MENU_BRITISH
LANG_ENGLISH        "British"

REFERENCE           MENU_RUSSIAN
LANG_ENGLISH        "Russian"

REFERENCE           MENU_KOREAN
LANG_ENGLISH        "Korean"

REFERENCE           MENU_TAIWANESE
LANG_ENGLISH        "Taiwanese"

REFERENCE           MENU_JAPANESE
LANG_ENGLISH        "Japanese"

REFERENCE           MENU_CHINESE
LANG_ENGLISH        "Chinese"

REFERENCE           MENU_THAI
LANG_ENGLISH        "Thai"

REFERENCE           MENU_ON
LANG_ENGLISH        "On"

REFERENCE           MENU_OFF
LANG_ENGLISH        "Off"

REFERENCE           MENU_EVERYTHING
LANG_ENGLISH        "Everything"

REFERENCE           MENU_MODELS_ONLY
LANG_ENGLISH        "Models Only"

REFERENCE           MENU_NONE
LANG_ENGLISH        "None"

REFERENCE           MENU_NICEST
LANG_ENGLISH        "Nicest"

REFERENCE           MENU_NV_RADIAL
LANG_ENGLISH        "NV Radial"

REFERENCE           MENU_NV_PLANE
LANG_ENGLISH        "NV Plane"

REFERENCE           MENU_11KHZ__
LANG_ENGLISH        "11khz (Low Quality, Least Memory)"

REFERENCE           MENU_22KHZ__
LANG_ENGLISH        "22khz (Normal Quality, Medium Memory)"

REFERENCE           MENU_44KHZ__
LANG_ENGLISH        "44khz (High Quality, Most Memory)"

REFERENCE           MENU_WINDOWS_DEFAULT
LANG_ENGLISH        "Windows Default"

REFERENCE           MENU_MONO
LANG_ENGLISH        "Mono"

REFERENCE           MENU_STEREO
LANG_ENGLISH        "Stereo"

REFERENCE           MENU_FOUR_SPEAKERS
LANG_ENGLISH        "4 Speakers"

REFERENCE           MENU_FIVE_ONE_SPEAKERS
LANG_ENGLISH        "5.1 Speakers"

REFERENCE           MENU_GAME_TYPE_SETTINGS
LANG_ENGLISH        "Game Mode Settings"

REFERENCE           MENU_SERVER_SETTINGS
LANG_ENGLISH        "Server Settings"

REFERENCE           MENU_GAME_TYPE
LANG_ENGLISH        "Game Mode:  "

REFERENCE           MENU_SERVER_NAME
LANG_ENGLISH        "Server Name:  "

REFERENCE           MENU_DEDICATED
LANG_ENGLISH        "Dedicated:  "

REFERENCE           MENU_PURE
LANG_ENGLISH        "Pure:  "

REFERENCE           MENU_MAXIMUM_PLAYERS
LANG_ENGLISH        "Maximum Players:  "

REFERENCE           MENU_MINIMUM_PING
LANG_ENGLISH        "Minimum Ping:  "

REFERENCE           MENU_MAXIMUM_PING
LANG_ENGLISH        "Maximum Ping:  "

REFERENCE           MENU_MAXIMUM_RATE
LANG_ENGLISH        "Maximum Rate:  "

REFERENCE           MENU_PASSWORD1
LANG_ENGLISH        "Password:  "

REFERENCE           MENU_BOTH
LANG_ENGLISH        "Both"

REFERENCE           MENU_288K
LANG_ENGLISH        "<=28.8k"

REFERENCE           MENU_336K
LANG_ENGLISH        "33.6k"

REFERENCE           MENU_56K
LANG_ENGLISH        "56k"

REFERENCE           MENU_ISDN
LANG_ENGLISH        "ISDN"

REFERENCE           MENU_LAN_CABLE_XDSL
LANG_ENGLISH        "LAN/Cable/DSL"

REFERENCE           MENU_SCORE_LIMIT_PLAYER_POINTS
LANG_ENGLISH        "Score Limit (player points):  "

REFERENCE           MENU_SCORE_LIMIT_TEAM_POINTS
LANG_ENGLISH        "Score Limit (team points):  "

REFERENCE           MENU_TIME_LIMIT
LANG_ENGLISH        "Time Limit (minutes):  "

REFERENCE           MENU_FORCE_RESPAWNING
LANG_ENGLISH        "Force Respawning:  "

REFERENCE           MENU_FRIENDLY_INDICATORS
LANG_ENGLISH        "Friendly Indicators:  "

REFERENCE           MENU_CARRIER_INDICATOR
LANG_ENGLISH        "Carrier Indicator:  "

REFERENCE           MENU_GRACE_PERIOD
LANG_ENGLISH        "Grace Period (seconds):  "

REFERENCE           MENU_ROUND_LENGTH
LANG_ENGLISH        "Round Length (minutes):  "

REFERENCE           MENU_ROUND_LIMIT
LANG_ENGLISH        "Round Limit (rounds):  "

REFERENCE           MENU_TO_THE_GAME
LANG_ENGLISH        "to the game."

REFERENCE           MENU_NUMBER_OF_CORPSES
LANG_ENGLISH        "Number of Corpses"

REFERENCE           MENU_TINY
LANG_ENGLISH        "Tiny"

REFERENCE           MENU_SMALL
LANG_ENGLISH        "Small"

REFERENCE           MENU_MEDIUM
LANG_ENGLISH        "Medium"

REFERENCE           MENU_LARGE
LANG_ENGLISH        "Large"

REFERENCE           MENU_INSANE
LANG_ENGLISH        "Insane"

REFERENCE           MENU_SETTINGS_WILL_BE_REAPPLIED
LANG_ENGLISH        "Settings will be applied"

REFERENCE           MENU_NEXT_TIME_THE_SERVER
LANG_ENGLISH        "next time the game"

REFERENCE           MENU_IS_STARTED
LANG_ENGLISH        "is started."

REFERENCE           MENU_JOIN
LANG_ENGLISH        "Join"

REFERENCE           MENU_ALL_CURRENT_PROGRESS_WILL_BE_LOST
LANG_ENGLISH        "All current progress will be lost."

REFERENCE           MENU_PLAY_DEMO_LEVEL
LANG_ENGLISH        "Play Demo Level"

REFERENCE           MENU_ENABLE_CONSOLE
LANG_ENGLISH        "Enable Console"

REFERENCE           MENU_SUBTITLES
LANG_ENGLISH        "Subtitles"

REFERENCE           MENU_LOD
LANG_ENGLISH        "LOD:  "

REFERENCE           MENU_AGGRESSIVE
LANG_ENGLISH        "Aggressive"

REFERENCE           MENU_JOIN_A_GAME
LANG_ENGLISH        "Join a Game"

REFERENCE           MENU_RESUMEGAME_Q
LANG_ENGLISH        "Resume Game?"

REFERENCE           MENU_CONNECTION
LANG_ENGLISH        "Connection"

REFERENCE           MENU_TYPE1
LANG_ENGLISH        "Type"

REFERENCE           MENU_RESET_TO
LANG_ENGLISH        "Reset to"

REFERENCE           MENU_TO_ITS_OPTIMAL_VALUE
LANG_ENGLISH        "to its optimal value."

REFERENCE           MENU_RESTART_LEVEL_Q
LANG_ENGLISH        "Restart Level?"

REFERENCE           MENU_START
LANG_ENGLISH        "Start"

REFERENCE           MENU_LAN
LANG_ENGLISH        "LAN"

REFERENCE           MENU_INTERNET
LANG_ENGLISH        "Internet"

REFERENCE           MENU_LEVEL_OF_DETAIL
LANG_ENGLISH        "Level of Detail:  "

REFERENCE           MENU_ADD_SELECTED_SERVER_TO_FAVORITES
LANG_ENGLISH        "Add selected server to favorites?"

REFERENCE           MENU_REFLECT
LANG_ENGLISH        "Reflect"

REFERENCE           MENU_SHARED
LANG_ENGLISH        "Shared"

REFERENCE           MENU_KILLCAM
LANG_ENGLISH        "Killcam:  "

REFERENCE           MENU_ALLOW_VOTING
LANG_ENGLISH        "Allow Voting:  "

REFERENCE           MENU_AUTO_UPDATE
LANG_ENGLISH        "Auto-Update"

REFERENCE           MENU_ALLOW_SNIPER_RIFLES
LANG_ENGLISH        "Allow Sniper Rifles:  "

REFERENCE           MENU_VIEW_PASSWORD
LANG_ENGLISH        "With Password:"

REFERENCE           MENU_VIEW_NOPASSWORD
LANG_ENGLISH        "Without Password:"

REFERENCE           MENU_VIEW_PURE
LANG_ENGLISH        "Pure Servers only:"

REFERENCE           MENU_VIEW_FRIENDLY_FIRE
LANG_ENGLISH        "Friendly Fire:"

REFERENCE           MENU_VIEW_KILLCAM
LANG_ENGLISH        "Killcam:"

REFERENCE           MENU_ALL
LANG_ENGLISH        "All"

REFERENCE           MENU_MASTER_VOLUME
LANG_ENGLISH        "Volume"

REFERENCE           MENU_VOLUME
LANG_ENGLISH        "Game Volume"

REFERENCE           MENU_MODEL_DETAIL
LANG_ENGLISH        "Model Detail"

REFERENCE           MENU_MINIMUM
LANG_ENGLISH        "Minimum"

REFERENCE           MENU_UNLIMITED
LANG_ENGLISH        "Unlimited"

REFERENCE           MENU_MAXIMUM
LANG_ENGLISH        "Maximum"

REFERENCE           MENU_POLISH
LANG_ENGLISH        "Polish"

REFERENCE           MENU_SAFE
LANG_ENGLISH        "Safe"

REFERENCE           MENU_SAFE_MODE
LANG_ENGLISH        "Safe Mode"

REFERENCE           MENU_DEDICATEDONLY
LANG_ENGLISH        "Dedicated Only:"

REFERENCE           MENU_AUTOBALANCE_TEAMS
LANG_ENGLISH        "Auto-Balance Teams:  "

REFERENCE           MENU_ALLOW_ENEMY_SPECTATING
LANG_ENGLISH        "Allow Enemy Spectating:  "

REFERENCE           MENU_ALLOW_FREE_SPECTATING
LANG_ENGLISH        "Allow Free Spectating:  "

REFERENCE           MENU_ALLOW_DOWNLOAD
LANG_ENGLISH        "Allow Downloading"

REFERENCE           MENU_PRESS_START
LANG_ENGLISH        "Press START button"

REFERENCE           MENU_SPLIT_SCREEN
LANG_ENGLISH        "Split Screen"

REFERENCE           MENU_SPLIT_SCREEN_OFFLINE
LANG_ENGLISH        "Split Screen Offline"

REFERENCE           MENU_START_GAME
LANG_ENGLISH        "Start Game"

REFERENCE           MENU_JOIN_GAME
LANG_ENGLISH        "Join Game"

REFERENCE           MENU_CYCLE_ITEMS
LANG_ENGLISH        "Cycle Items:  "

REFERENCE           MENU_USE_ITEM
LANG_ENGLISH        "Use Item:  "

REFERENCE           MENU_HOLD_BREATH
LANG_ENGLISH        "Hold Breath"

REFERENCE           MENU_MELEE_BREATH
LANG_ENGLISH        "Melee/Hold Breath"

REFERENCE           MENU_VOICECHAT
LANG_ENGLISH        "Voice Chat"

REFERENCE           MENU_VOICECHAT_RECORD_LEVEL
LANG_ENGLISH        "Record Level"

REFERENCE           MENU_VOICECHAT_LEVEL_ADJUST
LANG_ENGLISH        "Level Adjust"

REFERENCE           MENU_VOICECHAT_LEVEL_INDICATOR
LANG_ENGLISH        "Level Indicator"

REFERENCE           MENU_MULTIPLAYER_OPTIONS_HEADING
LANG_ENGLISH        "Multiplayer Options"

REFERENCE           MENU_VOICE
LANG_ENGLISH        "Voice"

REFERENCE           MENU_VOICE_CHAT_BUTTON
LANG_ENGLISH        "Voice Chat"

REFERENCE           MENU_VOICE_CHAT_ENABLE
LANG_ENGLISH        "Voice Chat:"

REFERENCE           MENU_CAMPAIGN
LANG_ENGLISH        "Campaign"

REFERENCE           MENU_LOOK_SENSITIVITY
LANG_ENGLISH        "Sensitivity"

REFERENCE           MENU_VERY_HIGH
LANG_ENGLISH        "Very High"

REFERENCE           MENU_LOOK_INVERSION
LANG_ENGLISH        "Look Inversion"

REFERENCE           MENU_ENABLED
LANG_ENGLISH        "Enabled"

REFERENCE           MENU_ENABLED_DEFAULT
LANG_ENGLISH        "Enabled (Default)"

REFERENCE           MENU_DISABLED
LANG_ENGLISH        "Disabled"

REFERENCE           MENU_DISABLED_DEFAULT
LANG_ENGLISH        "Disabled (Default)"

REFERENCE           MENU_CONTROLLER_VIBRATION
LANG_ENGLISH        "Vibration"

REFERENCE           MENU_THUMBSTICK_LAYOUT
LANG_ENGLISH        "Stick Layout"

REFERENCE           MENU_CLASSIC
LANG_ENGLISH        "Classic"

REFERENCE           MENU_LEFTY
LANG_ENGLISH        "Lefty"

REFERENCE           MENU_DIVER
LANG_ENGLISH        "Diver"

REFERENCE           MENU_BUTTON_LAYOUT
LANG_ENGLISH        "Button Layout"

REFERENCE           MENU_SOUTHPAW
LANG_ENGLISH        "Southpaw"

REFERENCE           MENU_LEGACY
LANG_ENGLISH        "Legacy"

REFERENCE           MENU_LEGACY_SOUTHPAW
LANG_ENGLISH        "Legacy Southpaw"

REFERENCE           MENU_LEGACY_ALT
LANG_ENGLISH        "Legacy Flipped"

REFERENCE           MENU_SYSTEM_LINK
LANG_ENGLISH        "System Link"

REFERENCE           MENU_JOIN_GAME1
LANG_ENGLISH        "Join Game"

REFERENCE           MENU_CREATE_GAME
LANG_ENGLISH        "Create Game"

REFERENCE           MENU_SELECT_NEXT_MISSION
LANG_ENGLISH        "Select Next Mission"

REFERENCE           MENU_COMPLETED
LANG_ENGLISH        "Completed"

REFERENCE           MENU_LOCKED
LANG_ENGLISH        "Locked"

REFERENCE           MENU_UNLOCK
LANG_ENGLISH        "Unlock"

REFERENCE           MENU_RESET
LANG_ENGLISH        "Reset"

REFERENCE           MENU_LOAD_MISSION
LANG_ENGLISH        "Load Mission?"

REFERENCE           MENU_STATUS
LANG_ENGLISH        "Status:"

REFERENCE           MENU_NOT_STARTED
LANG_ENGLISH        "Not Started"

REFERENCE           MENU_IN_PROGRESS
LANG_ENGLISH        "In Progress"

REFERENCE           MENU_COMPLETED_REGULAR
LANG_ENGLISH        "Completed Regular"

REFERENCE           MENU_COMPLETED_HARDENED
LANG_ENGLISH        "Completed Hardened"

REFERENCE           MENU_COMPLETED_VETERAN
LANG_ENGLISH        "Completed Veteran"

REFERENCE           MENU_ASPECT_RATIO
LANG_ENGLISH        "Aspect Ratio"

REFERENCE           MENU_TEXTURE_RESOLUTION
LANG_ENGLISH        "Texture Resolution"

REFERENCE           MENU_NORMAL_MAP_RESOLUTION
LANG_ENGLISH        "Normal Map Resolution"

REFERENCE           MENU_SPECULAR_MAP_RESOLUTION
LANG_ENGLISH        "Specular Map Resolution"

REFERENCE           MENU_VERY_LOW
LANG_ENGLISH        "Very Low"

REFERENCE           MENU_AUTO
LANG_ENGLISH        "Auto"

REFERENCE           MENU_STANDARD_4_3
LANG_ENGLISH        "Standard 4:3"

REFERENCE           MENU_WIDE_16_9
LANG_ENGLISH        "Wide 16:9"

REFERENCE           MENU_WIDE_16_10
LANG_ENGLISH        "Wide 16:10"

REFERENCE           MENU_MENU_COULDNT_BE_FOUND
LANG_ENGLISH        "Menu couldn't be found!"

REFERENCE           MENU_STANCE_UP_JUMP
LANG_ENGLISH        "Stance Up/Jump"

REFERENCE           MENU_USE_RELOAD
LANG_ENGLISH        "Use/Reload"

REFERENCE           MENU_SWITCH_WEAPON
LANG_ENGLISH        "Switch Weapon"

REFERENCE           MENU_THROW_GRENADE
LANG_ENGLISH        "Throw Grenade"

REFERENCE           MENU_CHANGE_GRENADE_TYPE
LANG_ENGLISH        "Change Grenade Type"

REFERENCE           MENU_AIM_DOWN_SIGHT
LANG_ENGLISH        "Aim Down Sight"

REFERENCE           MENU_FIRE_WEAPON
LANG_ENGLISH        "Fire Weapon"

REFERENCE           MENU_OBJECTIVES_MENU
LANG_ENGLISH        "Objectives/Menu"

REFERENCE           MENU_CHANGE_DIFFICULTY
LANG_ENGLISH        "Change Difficulty"

REFERENCE           MENU_RIGHT
LANG_ENGLISH        "Right"

REFERENCE           MENU_MOVE_FORWARD
LANG_ENGLISH        "Move Forward"

REFERENCE           MENU_ROTATE_LEFT_RIGHT
LANG_ENGLISH        "Rotate Left/Right"

REFERENCE           MENU_MOVE_BACK
LANG_ENGLISH        "Move Back"

REFERENCE           MENU_STRAFE_LEFT_RIGHT
LANG_ENGLISH        "Strafe Left/Right"

REFERENCE           MENU_WAITING_FOR_MORE_PLAYERS
LANG_ENGLISH        "We need to find &&1 more players"

REFERENCE           MENU_WAITING_FOR_MORE_PLAYERS1
LANG_ENGLISH        "Waiting for more players"

REFERENCE           MENU_MATCH_BEGINNING_IN
LANG_ENGLISH        "Match beginning in"

REFERENCE           MENU_XBOX_LIVE
LANG_ENGLISH        "Xbox LIVE"

REFERENCE           MENU_XBOX_LIVE_LOBBY
LANG_ENGLISH        "Xbox LIVE Lobby"

REFERENCE           MENU_QUICK_MATCH_STANDARD
LANG_ENGLISH        "Quick Match: Standard"

REFERENCE           MENU_PLAY_A_QUICK_MATCH_WHICH_WILL_NOT_AFFECT_YOUR_RANK
LANG_ENGLISH        "Play a Quick Match which will not affect your Rank"

REFERENCE           MENU_QUICK_MATCH_RANKED
LANG_ENGLISH        "Quick Match: Ranked"

REFERENCE           MENU_PLAY_A_QUICK_MATCH_WHICH_WILL_AFFECT_YOUR_RANK
LANG_ENGLISH        "Play a Quick Match which will affect your Rank"

REFERENCE           MENU_CUSTOM_MATCH_STANDARD
LANG_ENGLISH        "Custom Match: Standard"

REFERENCE           MENU_PLAY_A_CUSTOM_MATCH_WHICH_WILL_NOT_AFFECT_YOUR_RANK
LANG_ENGLISH        "Play a Custom Match which will not affect your Rank"

REFERENCE           MENU_CUSTOM_MATCH_RANKED
LANG_ENGLISH        "Custom Match: Ranked"

REFERENCE           MENU_PLAY_A_CUSTOM_MATCH_WHICH_WILL_AFFECT_YOUR_RANK
LANG_ENGLISH        "Play a Custom Match which will affect your Rank"

REFERENCE           MENU_TIME_LIMIT1
LANG_ENGLISH        "Time Limit"

REFERENCE           MENU_2_MINUTES
LANG_ENGLISH        "2 Minutes"

REFERENCE           MENU_3_MINUTES
LANG_ENGLISH        "3 Minutes"

REFERENCE           MENU_4_MINUTES
LANG_ENGLISH        "4 Minutes"

REFERENCE           MENU_4_MINUTES_DEFAULT
LANG_ENGLISH        "4 Minutes (Default)"

REFERENCE           MENU_5_MINUTES
LANG_ENGLISH        "5 Minutes"

REFERENCE           MENU_10_MINUTES
LANG_ENGLISH        "10 Minutes"

REFERENCE           MENU_15_MINUTES
LANG_ENGLISH        "15 Minutes"

REFERENCE           MENU_15_MINUTES_DEFAULT
LANG_ENGLISH        "15 Minutes (Default)"

REFERENCE           MENU_30_MINUTES
LANG_ENGLISH        "30 Minutes"

REFERENCE           MENU_30_MINUTES_DEFAULT
LANG_ENGLISH        "30 Minutes (Default)"

REFERENCE           MENU_45_MINUTES
LANG_ENGLISH        "45 Minutes"

REFERENCE           MENU_1_HOUR
LANG_ENGLISH        "1 Hour"

REFERENCE           MENU_SCORE_LIMIT
LANG_ENGLISH        "Score Limit"

REFERENCE           MENU_5_POINTS
LANG_ENGLISH        "5 Points"

REFERENCE           MENU_5_POINTS_DEFAULT
LANG_ENGLISH        "5 Points (Default)"

REFERENCE           MENU_10_POINTS
LANG_ENGLISH        "10 Points"

REFERENCE           MENU_10_POINTS_DEFAULT
LANG_ENGLISH        "10 Points (Default)"

REFERENCE           MENU_15_POINTS
LANG_ENGLISH        "15 Points"

REFERENCE           MENU_20_POINTS
LANG_ENGLISH        "20 Points"

REFERENCE           MENU_25_POINTS
LANG_ENGLISH        "25 Points"

REFERENCE           MENU_25_POINTS_DEFAULT
LANG_ENGLISH        "25 Points (Default)"

REFERENCE           MENU_30_POINTS
LANG_ENGLISH        "30 Points"

REFERENCE           MENU_50_POINTS
LANG_ENGLISH        "50 Points"

REFERENCE           MENU_50_POINTS_DEFAULT
LANG_ENGLISH        "50 Points (Default)"

REFERENCE           MENU_100_POINTS
LANG_ENGLISH        "100 Points"

REFERENCE           MENU_100_POINTS_DEFAULT
LANG_ENGLISH        "100 Points (Default)"

REFERENCE           MENU_200_POINTS
LANG_ENGLISH        "200 Points"

REFERENCE           MENU_300_POINTS
LANG_ENGLISH        "300 Points"

REFERENCE           MENU_300_POINTS_DEFAULT
LANG_ENGLISH        "300 Points (Default)"

REFERENCE           MENU_400_POINTS
LANG_ENGLISH        "400 Points"

REFERENCE           MENU_400_POINTS_DEFAULT
LANG_ENGLISH        "400 Points (Default)"

REFERENCE           MENU_450_POINTS
LANG_ENGLISH        "450 Points"

REFERENCE           MENU_450_POINTS_DEFAULT
LANG_ENGLISH        "450 Points (Default)"

REFERENCE           MENU_600_POINTS
LANG_ENGLISH        "600 Points"

REFERENCE           MENU_600_POINTS_DEFAULT
LANG_ENGLISH        "600 Points (Default)"

REFERENCE           MENU_800_POINTS
LANG_ENGLISH        "800 Points"

REFERENCE           MENU_1000_POINTS
LANG_ENGLISH        "1000 Points"

REFERENCE           MENU_SIGN_IN
LANG_ENGLISH        "Sign In"

REFERENCE           MENU_QUICK_OPTIONS
LANG_ENGLISH        "Quick Options"

REFERENCE           MENU_5_ROUNDS
LANG_ENGLISH        "5 Rounds"

REFERENCE           MENU_10_ROUNDS
LANG_ENGLISH        "10 Rounds"

REFERENCE           MENU_15_ROUNDS
LANG_ENGLISH        "15 Rounds"

REFERENCE           MENU_20_ROUNDS
LANG_ENGLISH        "20 Rounds"

REFERENCE           MENU_ROUND_LENGTH1
LANG_ENGLISH        "Round Length"

REFERENCE           MENU_ROUND_LIMIT1
LANG_ENGLISH        "Round Limit"

REFERENCE           MENU_PLAYERS
LANG_ENGLISH        "Players"

REFERENCE           MENU_MODIFIERS
LANG_ENGLISH        "Modifiers"

REFERENCE           MENU_MAPS
LANG_ENGLISH        "Maps"

REFERENCE           MENU_RANDOM
LANG_ENGLISH        "Random"

REFERENCE           MENU_GAME_TYPES
LANG_ENGLISH        "Game Modes"

REFERENCE           MENU_A_GAME_TYPE_WILL_BE_SELECTED_AT_RANDOM
LANG_ENGLISH        "A game type will be selected at random."

REFERENCE           MENU_DEATHMATCH
LANG_ENGLISH        "Deathmatch"

REFERENCE           MENU_YOU_ARE_ALL_ALONE_ELIMINATE_EVERYONE_ELSE
LANG_ENGLISH        "You are all alone.  Eliminate everyone else."

REFERENCE           MENU_TEAM_DEATHMATCH
LANG_ENGLISH        "Team Deathmatch"

REFERENCE           MENU_CAPTURE_THE_FLAG
LANG_ENGLISH        "Capture the Flag"

REFERENCE           MENU_CTF_DESC
LANG_ENGLISH        "Get the enemy team's flag, bring it to your base, and capture it by touching your flag while it's at your base."

REFERENCE           MENU_HEADQUARTERS
LANG_ENGLISH        "Headquarters"

REFERENCE           MENU_HQ_DESC
LANG_ENGLISH        "Teams race to set up a radio and defend it for points.  If the enemy team sets up a radio, you must destroy it."

REFERENCE           MENU_SEARCH_AND_DESTROY
LANG_ENGLISH        "Search and Destroy"

REFERENCE           MENU_CUSTOM_MATCH
LANG_ENGLISH        "Custom Match"

REFERENCE           MENU_START_GAME_LOBBY
LANG_ENGLISH        "Start Game Lobby"

REFERENCE           MENU_CHANGE_GAME_TYPE
LANG_ENGLISH        "Change Game Type"

REFERENCE           MENU_GAME_SETUP
LANG_ENGLISH        "Game Setup"

REFERENCE           MENU_LOCATION
LANG_ENGLISH        "Location:"

REFERENCE           MENU_APPLY_SETTINGS
LANG_ENGLISH        "Apply Settings?"

REFERENCE           MENU_SETTINGS_WILL_BE_APPLIED_NEXT_TIME
LANG_ENGLISH        "Settings will be applied next time"

REFERENCE           MENU_THE_SERVER_IS_STARTED
LANG_ENGLISH        "the game is started."

REFERENCE           MENU_VOICE_CHAT_WILL_BE_DISABLED_BECAUSE
LANG_ENGLISH        "Voice chat will be disabled because"

REFERENCE           MENU_YOUR_NETWORK_SETTINGS
LANG_ENGLISH        "your network settings"

REFERENCE           MENU_ARE_TOO_LOW_TO_SUPPORT_VOICE_CHAT
LANG_ENGLISH        "are too low to support voice chat."

REFERENCE           MENU_VOICE_CHAT
LANG_ENGLISH        "Voice Chat"

REFERENCE           MENU_CHANGE_WEAPON
LANG_ENGLISH        "Change Weapon"

REFERENCE           MENU_APPLY_LANGUAGE_SETTINGS
LANG_ENGLISH        "Apply Language Settings?"

REFERENCE           MENU_MISSION_01_02
LANG_ENGLISH        "Demolition"

REFERENCE           MENU_MISSION_01_02_DESC
LANG_ENGLISH        "Repel the enemy assault and demolish their hardpoint."

REFERENCE           MENU_SELECT_LEVEL
LANG_ENGLISH        "Select Level"

REFERENCE           MENU_VETERAN_DESC
LANG_ENGLISH        "You will not survive."

REFERENCE           MENU_SKILLED_DESC
LANG_ENGLISH        "Your abilities in combat"

REFERENCE           MENU_HARDENED_DESC
LANG_ENGLISH        "Your skills will be strained."

REFERENCE           MENU_AIM_DOWN_THE_SIGHT_AUTOAIM
LANG_ENGLISH        "Autoaim when Aiming Down the Sight"

REFERENCE           MENU_DIFFICULTY_REGULAR
LANG_ENGLISH        "Difficulty: Regular"

REFERENCE           MENU_DIFFICULTY_HARDENED
LANG_ENGLISH        "Difficulty: Hardened"

REFERENCE           MENU_DIFFICULTY_VETERAN
LANG_ENGLISH        "Difficulty: Veteran"

REFERENCE           MENU_SKILLED_DESC_2
LANG_ENGLISH        "will be tested."

REFERENCE           MENU_HARDENED_DESC_2
LANG_ENGLISH        "to the breaking point."

REFERENCE           MENU_REGULAR_DESC_3
LANG_ENGLISH        "For players who are new to"

REFERENCE           MENU_REGULAR_DESC_4
LANG_ENGLISH        "first person action games."

REFERENCE           MENU_MISSION_SELECT
LANG_ENGLISH        "Mission Select"

REFERENCE           MENU_WEAPON_MENU
LANG_ENGLISH        "Weapon Menu"

REFERENCE           MENU_NUMBER_OF_DYNAMIC_LIGHTS
LANG_ENGLISH        "Number of Dynamic Lights"

REFERENCE           MENU_RED
LANG_ENGLISH        "Red"

REFERENCE           MENU_ENABLE_CROSSHAIR
LANG_ENGLISH        "Enable Crosshair"

REFERENCE           MENU_CROSSHAIR_COLOR
LANG_ENGLISH        "Crosshair Color"

REFERENCE           MENU_AUTOMATIC
LANG_ENGLISH        "Automatic"

REFERENCE           MENU_MANUAL
LANG_ENGLISH        "Manual"

REFERENCE           MENU_MISSION_SELECT_MENU
LANG_ENGLISH        "Mission Select Menu"

REFERENCE           MENU_NEXT_MISSION
LANG_ENGLISH        "Next Mission"

REFERENCE           MENU_CONTINUE_MISSION
LANG_ENGLISH        "Continue Mission"

REFERENCE           MENU_PROFILE_WARNING
LANG_ENGLISH        "You are not signed in to a profile. If you do not sign in you will be unable to save your progress. Do you wish to continue?"

REFERENCE           MENU_QUIT_WARNING
LANG_ENGLISH        "Are you sure you want to quit?"

REFERENCE           MENU_WARNING
LANG_ENGLISH        "Warning"

REFERENCE           MENU_CAPTURE_LIMIT
LANG_ENGLISH        "Capture Limit:  "

REFERENCE           MENU_CONTINUE_RESTART
LANG_ENGLISH        "Continue restart?"

REFERENCE           MENU_RESTART_TEXT_1
LANG_ENGLISH        "If you restart now, you will lose "

REFERENCE           MENU_RESTART_TEXT_2
LANG_ENGLISH        "any progress that you have made "

REFERENCE           MENU_RESTART_TEXT_3
LANG_ENGLISH        "in this mission."

REFERENCE           MENU_CONTINUE_SAVING
LANG_ENGLISH        "Continue saving?"

REFERENCE           MENU_SAVEQUIT_TEXT_1
LANG_ENGLISH        "If you save now, "

REFERENCE           MENU_SAVEQUIT_TEXT_2
LANG_ENGLISH        "you will lose any progress "

REFERENCE           MENU_SAVEQUIT_TEXT_3
LANG_ENGLISH        "since your last checkpoint. "

REFERENCE           MENU_CROSSHAIR
LANG_ENGLISH        "Crosshair"

REFERENCE           MENU_SCORE_LIMIT1
LANG_ENGLISH        "Score Limit:"

REFERENCE           MENU_TIME_LIMIT2
LANG_ENGLISH        "Time Limit:"

REFERENCE           MENU_ROUND_LIMIT2
LANG_ENGLISH        "Round Limit:"

REFERENCE           MENU_ROUND_LENGTH2
LANG_ENGLISH        "Round Length:"

REFERENCE           MENU_REFLECTED_DAMAGE
LANG_ENGLISH        "Reflected Damage"

REFERENCE           MENU_SHARED_DAMAGE
LANG_ENGLISH        "Shared Damage"

REFERENCE           MENU_SERVER_INFORMATION
LANG_ENGLISH        "Server Information"

REFERENCE           MENU_SAVE_ERROR_MP
LANG_ENGLISH        "Progress Won't Be Saved"

REFERENCE           MENU_NO_SAVE_DEVICE_WARNING_MP
LANG_ENGLISH        "You must select a save device to save your progress!"

REFERENCE           MENU_RETURN_SELECT_SAVE_DEVICE_MP
LANG_ENGLISH        "Select Save Device"

REFERENCE           MENU_RESUMEGAME_NOSAVE_MP
LANG_ENGLISH        "Continue Without Saving"

REFERENCE           MENU_SELECT_SAVE_DEVICE
LANG_ENGLISH        "Select Save Device"

REFERENCE           MENU_RESELECT_SAVE_DEVICE
LANG_ENGLISH        "Re-Select Save Device"

REFERENCE           MENU_SAVE_ERROR
LANG_ENGLISH        "Unable to Write to Default Save Device"

REFERENCE           MENU_SAVE_ERROR_NOW_OKAY
LANG_ENGLISH        "Save Device Selected"

REFERENCE           MENU_EXTRA_LOW
LANG_ENGLISH        "Extra Low"

REFERENCE           MENU_RETRY_SAVE
LANG_ENGLISH        "Retry Save"

REFERENCE           MENU_QUIT_NO_SAVE
LANG_ENGLISH        "Quit Without Saving"

REFERENCE           MENU_RESUMEGAME_NOSAVE
LANG_ENGLISH        "Resume Without Saving"

REFERENCE           MENU_FIND_GAME
LANG_ENGLISH        "Find Game"

REFERENCE           MENU_SCOREBOARD
LANG_ENGLISH        "Scoreboard"

REFERENCE           MENU_EASY
LANG_ENGLISH        "Easy"

REFERENCE           MENU_COMPLETED_CHEAT
LANG_ENGLISH        "Cheat Unlocked"

REFERENCE           MENU_HOST_NAME
LANG_ENGLISH        "Host"

REFERENCE           MENU_WAITING_FOR_PLAYERS_TO_BE_READY
LANG_ENGLISH        "Need &&1 players to be ready"

REFERENCE           MENU_WAITING_FOR_PLAYER_TO_BE_READY
LANG_ENGLISH        "Need 1 more player to be ready"

REFERENCE           MENU_MATCH_WILL_BEGIN
LANG_ENGLISH        "The match is about to begin"

REFERENCE           MENU_SEARCHING_FOR_LOBBY
LANG_ENGLISH        "Searching for available games"

REFERENCE           MENU_ZFEATHER_SMOKE
LANG_ENGLISH        "Soften Smoke Edges"

REFERENCE           MENU_WORLD_ONLY
LANG_ENGLISH        "World Only"

REFERENCE           MENU_TM
LANG_ENGLISH        "TM"

REFERENCE           MENU_R_CIRCLE
LANG_ENGLISH        "\uFFFD"

REFERENCE           MENU_PLAYER_SELECT
LANG_ENGLISH        "Player Select"

REFERENCE           MENU_NEW
LANG_ENGLISH        "New"

REFERENCE           MENU_NEW_PLAYER_NAME
LANG_ENGLISH        "New Player Name"

REFERENCE           MENU_DELETE_PROFILE
LANG_ENGLISH        "Delete selected profile?"

REFERENCE           MENU_A_PROFILE_WITH_THE_SAME_NAME_ALREADY_EXISTS
LANG_ENGLISH        "A profile with the same name already exists"

REFERENCE           MENU_PROFILE_CREATE_TOO_MANY
LANG_ENGLISH        "There are no free profile slots.\\n\\nRemove an old profile first."

REFERENCE           MENU_PROFILE_CREATION_FAILED
LANG_ENGLISH        "Profile creation failed.\\n\\nMake sure the disk isn't full and\\nthat you have file write privileges.\\n"

REFERENCE           MENU_PROFILE_DELETION_FAILED
LANG_ENGLISH        "Profile deletion failed.\\n\\nThere may be some read-only files,\\nor you may not have file write privileges.\\n"

REFERENCE           MENU_THROW_SMOKE_GRENADE
LANG_ENGLISH        "Throw Smoke Grenade"

REFERENCE           MENU_THROW_FRAG_GRENADE
LANG_ENGLISH        "Throw Frag Grenade"

REFERENCE           MENU_LOADING_DOTS
LANG_ENGLISH        "Loading..."

REFERENCE           MENU_CONNECTION_COLON
LANG_ENGLISH        "Connection:  "

REFERENCE           MENU_RANKING
LANG_ENGLISH        "Ranking:"

REFERENCE           MENU_QUIT_TEXT_1
LANG_ENGLISH        "If you quit now, you will lose "

REFERENCE           MENU_CONTINUE_QUIT
LANG_ENGLISH        "Quit Game?"

REFERENCE           MENU_RETURN
LANG_ENGLISH        "Return to game"

REFERENCE           MENU_FIND_RANKED_GAME
LANG_ENGLISH        "Find Ranked Game"

REFERENCE           MENU_FIND_STANDARD_GAME
LANG_ENGLISH        "Find Standard Game"

REFERENCE           MENU_UNRANKED_DESCRIPTION
LANG_ENGLISH        "Find an unranked match in which you can invite friends."

REFERENCE           MENU_RANKED_DESCRIPTION
LANG_ENGLISH        "Find a ranked match for competitive play. Friends can not be invited to ranked matches."

REFERENCE           MENU_SELECT_GAMETYPE
LANG_ENGLISH        "Select the game type to play."

REFERENCE           MENU_SPECIAL_FEATURES
LANG_ENGLISH        "Cheats"

REFERENCE           MENU_MELEE_STEADY
LANG_ENGLISH        "Melee/Steady Sniper Rifle"

REFERENCE           MENU_STEADY_SNIPER_RIFLE
LANG_ENGLISH        "Steady Sniper Rifle"

REFERENCE           MENU_GAME_OPTIONS
LANG_ENGLISH        "Game Options"

REFERENCE           MENU_CREATE_PLAYER_PROFILE
LANG_ENGLISH        "Create Player Profile"

REFERENCE           MENU_ANTIALIASING
LANG_ENGLISH        "Anti-aliasing"

REFERENCE           MENU_2X
LANG_ENGLISH        "2x"

REFERENCE           MENU_4X
LANG_ENGLISH        "4x"

REFERENCE           MENU_OPTIMIZE_FOR_DUAL_VIDEO_CARDS
LANG_ENGLISH        "Dual Video Cards"

REFERENCE           MENU_CLICK_TO_CONTINUE
LANG_ENGLISH        "Click to Continue"

REFERENCE           MENU_NEED_PLAYER_PROFILE
LANG_ENGLISH        "You need a player profile to play Modern Warfare 2."

REFERENCE           MENU_SELECT_PROFILE
LANG_ENGLISH        "Select Profile"

REFERENCE           MENU_KEY_CODE
LANG_ENGLISH        "Key Code"

REFERENCE           MENU_ENTER_KEY_CODE
LANG_ENGLISH        "Enter Key Code"

REFERENCE           MENU_ENTER_YOUR_KEY_CODE_IN_THE_FIELD_BELOW
LANG_ENGLISH        "Enter your key code in the field below."

REFERENCE           MENU_11KHZ
LANG_ENGLISH        "11KHZ (Low)"

REFERENCE           MENU_22KHZ
LANG_ENGLISH        "22KHZ (Medium)"

REFERENCE           MENU_44KHZ
LANG_ENGLISH        "44KHZ (High)"

REFERENCE           MENU_CANT_SWITCH_PROFILES_INGAME
LANG_ENGLISH        "Cannot switch player profiles while in game."

REFERENCE           MENU_QUIT_CURRENT_GAME
LANG_ENGLISH        "Quit Current Game?"

REFERENCE           MENU_CANT_CHANGE_SETTINGS_WHILE_DEAD
LANG_ENGLISH        "Can't change settings while dead"

REFERENCE           MENU_PROGRESS_WILL_BE_LOST
LANG_ENGLISH        "Loading a level will cause you to lose your progress in a level you have not yet completed."

REFERENCE           MENU_CONGRATULATIONS
LANG_ENGLISH        "Congratulations"

REFERENCE           MENU_FIND_STANDARD_MATCH
LANG_ENGLISH        "Find Standard Match"

REFERENCE           MENU_FIND_RANKED_MATCH
LANG_ENGLISH        "Find Ranked Match"

REFERENCE           MENU_CAN_NOT_CHANGE_SETTINGS
LANG_ENGLISH        "Can not change settings"

REFERENCE           MENU_WHILE_RUNNING_A_SERVER
LANG_ENGLISH        "while running a server."

REFERENCE           MENU_SHADOWS
LANG_ENGLISH        "Shadows"

REFERENCE           MENU_SCREEN_REFRESH_RATE
LANG_ENGLISH        "Screen Refresh Rate"

REFERENCE           MENU_EXTRAS
LANG_ENGLISH        "Extras"

REFERENCE           MENU_CROUCH_PRONE
LANG_ENGLISH        "Crouch/Prone"

REFERENCE           MENU_JUMP
LANG_ENGLISH        "Jump"

REFERENCE           MENU_RENDERING_METHOD_PREFERENCE
LANG_ENGLISH        "Shader Version"

REFERENCE           MENU_DIRECTX_9
LANG_ENGLISH        "DirectX\uFFFD 9"

REFERENCE           MENU_GRAPHICS_WARNING
LANG_ENGLISH        "We recommend using \\"Optimal Video and Audio.\\"  Manually changing settings could result in poor performance."

REFERENCE           MENU_INGAME_DIFFICULTY_CHANGING
LANG_ENGLISH        "Changing difficulty will restart the current level."

REFERENCE           MENU_DESCRIPTION_PLAYERMATCH
LANG_ENGLISH        "Play for fun with people who share similar profiles."

REFERENCE           MENU_DESCRIPTION_RANKEDMATCH
LANG_ENGLISH        "Play competitive matches to improve your TrueSkill\uFFFD rankings."

REFERENCE           MENU_DESCRIPTION_QUICKMATCH
LANG_ENGLISH        "Get into a game quickly. Game settings are chosen randomly."

REFERENCE           MENU_DESCRIPTION_CUSTOMMATCH
LANG_ENGLISH        "Find a session with the game settings you specify."

REFERENCE           MENU_SELECT_GAME_TYPE
LANG_ENGLISH        "Select Game Type"

REFERENCE           MENU_SELECT_MATCH_TYPE
LANG_ENGLISH        "Select Match Type"

REFERENCE           MENU_PLAYER_MATCH
LANG_ENGLISH        "Player Match"

REFERENCE           MENU_RANKED_MATCH
LANG_ENGLISH        "Ranked Match"

REFERENCE           MENU_QUICK_MATCH
LANG_ENGLISH        "Quick Match"

REFERENCE           MENU_SPECTATOR_MODE
LANG_ENGLISH        "Spectator Mode"

REFERENCE           MENU_GAME_EXPERIENCE_MAY_CHANGE
LANG_ENGLISH        "Online interactions not rated by the ESRB."

REFERENCE           MENU_MAP_PREFERENCES
LANG_ENGLISH        "Set Location Preferences"

REFERENCE           MENU_SET_MAP_PREFERENCES
LANG_ENGLISH        "Set your preferences for what locations you like to play"

REFERENCE           MENU_TEXTURE_SETTINGS
LANG_ENGLISH        "Texture Settings"

REFERENCE           MENU_ARSENAL
LANG_ENGLISH        "Arsenal"

REFERENCE           MENU_APPEARANCE
LANG_ENGLISH        "Appearance"

REFERENCE           MENU_STATS
LANG_ENGLISH        "Stats"

REFERENCE           MENU_STATS_CAPS
LANG_ENGLISH        "STATS"

REFERENCE           MENU_CHALLENGES
LANG_ENGLISH        "Challenges"

REFERENCE           MENU_LOBBYPLAYERCOUNT
LANG_ENGLISH        "&&1/&&2 PLAYERS"

REFERENCE           MENU_WAITING_FOR_1_MORE_PLAYER
LANG_ENGLISH        "Waiting for 1 more player"

REFERENCE           MENU_PRIVATE_MATCH
LANG_ENGLISH        "Private Match"

REFERENCE           MENU_CREATE_PARTY
LANG_ENGLISH        "Create Party"

REFERENCE           MENU_CQB_TEST
LANG_ENGLISH        "CQB Test"

REFERENCE           MENU_MARKSMAN
LANG_ENGLISH        "Marksman"

REFERENCE           MENU_TRAINING1
LANG_ENGLISH        "Training"

REFERENCE           MENU_AUTOAIM
LANG_ENGLISH        "Auto-aim"

REFERENCE           MENU_SAVE_DEVICE
LANG_ENGLISH        "Save Device"

REFERENCE           MENU_1ST_PASS
LANG_ENGLISH        "1st pass"

REFERENCE           MENU_100_INITIAL_GEO
LANG_ENGLISH        "100% initial geo"

REFERENCE           MENU_40_INITIAL_GEO
LANG_ENGLISH        "40% initial geo"

REFERENCE           MENU_25_SCRIPTED
LANG_ENGLISH        "25% scripted"

REFERENCE           MENU_PROTOTYPE_LEVEL_30_SCRIPTED
LANG_ENGLISH        "Prototype Level, 30% scripted"

REFERENCE           MENU_10_SCRIPTED
LANG_ENGLISH        "10% scripted"

REFERENCE           MENU_35_INITIAL_GEO
LANG_ENGLISH        "35% initial geo"

REFERENCE           MENU_5_SCRIPTED
LANG_ENGLISH        "5% scripted"

REFERENCE           MENU_30
LANG_ENGLISH        "30%"

REFERENCE           MENU_INITIAL_GEO_IN_PROGRESS
LANG_ENGLISH        "Initial geo in progress"

REFERENCE           MENU_SPRINT
LANG_ENGLISH        "Sprint"

REFERENCE           MENU_ONLINE_STATS
LANG_ENGLISH        "Online Stats"

REFERENCE           MENU_EXPERIMENTAL
LANG_ENGLISH        "Experimental"

REFERENCE           MENU_CUSTOMMODE_KEYBOARD
LANG_ENGLISH        "Name your custom game mode"

REFERENCE           MENU_CUSTOMCLASS_KEYBOARD
LANG_ENGLISH        "Name your custom class"

REFERENCE           MENU_SETTINGS
LANG_ENGLISH        "Settings"

REFERENCE           MENU_MAP
LANG_ENGLISH        "Map"

REFERENCE           MENU_GAME_TYPE1
LANG_ENGLISH        "Game Mode"

REFERENCE           MENU_CREATEAMODE
LANG_ENGLISH        "Create-a-Mode"

REFERENCE           MENU_PLACEHOLDER
LANG_ENGLISH        "PLACEHOLDER"

REFERENCE           MENU_PARTY
LANG_ENGLISH        "PARTY"

REFERENCE           MENU_PARTYRECONNECT
LANG_ENGLISH        "Reconnecting to party..."

REFERENCE           MENU_KILLS
LANG_ENGLISH        "Kills"

REFERENCE           MENU_DEATHS
LANG_ENGLISH        "Deaths"

REFERENCE           MENU_KDRATIO
LANG_ENGLISH        "Kill/Death"

REFERENCE           MENU_STREAK
LANG_ENGLISH        "Streak"

REFERENCE           MENU_WINS
LANG_ENGLISH        "Wins"

REFERENCE           MENU_LOSSES
LANG_ENGLISH        "Losses"

REFERENCE           MENU_WLRATIO
LANG_ENGLISH        "Win/Loss"

REFERENCE           MENU_HITS
LANG_ENGLISH        "Hits"

REFERENCE           MENU_MISSES
LANG_ENGLISH        "Misses"

REFERENCE           MENU_ACCURACY
LANG_ENGLISH        "Accuracy"

REFERENCE           MENU_TIME_PLAYED
LANG_ENGLISH        "Time Played"

REFERENCE           MENU_EXPERIENCE
LANG_ENGLISH        "Experience"

REFERENCE           MENU_RATIO
LANG_ENGLISH        "Ratio"

REFERENCE           MENU_PARTYPLAYERCOUNT
LANG_ENGLISH        "&&1 player(s) in &&2's party."

REFERENCE           MENU_AIM_ASSIST
LANG_ENGLISH        "Aim Assist"

REFERENCE           MENU_PLAYER
LANG_ENGLISH        "Player"

REFERENCE           MENU_RANK
LANG_ENGLISH        "Rank"

REFERENCE           MENU_TESTINGBANDWIDTH
LANG_ENGLISH        "Testing matches: &&1.&&2% - &&3/&&4 good games"

REFERENCE           MENU_JOININGLOBBY
LANG_ENGLISH        "Trying to join game &&1/&&2"

REFERENCE           MENU_OFFENSIVETEXT
LANG_ENGLISH        "Text prohibited due to profanity."

REFERENCE           MENU_BIND_KEY_PENDING
LANG_ENGLISH        "???"

REFERENCE           MENU_APPLYING_CHANGES
LANG_ENGLISH        "Applying Changes..."

REFERENCE           MENU_MAKING_TEAMS
LANG_ENGLISH        "Making balanced teams"

REFERENCE           MENU_WAITING_FOR_MORE_PLAYERS_TEAMS
LANG_ENGLISH        "Finding more players to balance teams"

REFERENCE           MENU_INTERMISSION
LANG_ENGLISH        "Intermission"

REFERENCE           MENU_RESETCUSTOMCLASSES
LANG_ENGLISH        "Your rank and unlocked items have been reset."

REFERENCE           MENU_LEVEL
LANG_ENGLISH        "Level"

REFERENCE           MENU_WAITING_FOR_HOST
LANG_ENGLISH        "Waiting for the host"

REFERENCE           MENU_INVALIDCHARS
LANG_ENGLISH        "Text is blank or contains illegal characters."

REFERENCE           MENU_MAPVETOSTATUS
LANG_ENGLISH        "&&1 vote to skip - &&2 needed"

REFERENCE           MENU_VOTESKIPCONFIRM
LANG_ENGLISH        "Vote to skip?"

REFERENCE           MENU_MAPVOTEPASSED
LANG_ENGLISH        "Vote passed!"

REFERENCE           MENU_MAPVETOSTATUSPLURAL
LANG_ENGLISH        "&&1 votes to skip - &&2 needed"

REFERENCE           MENU_SAVING
LANG_ENGLISH        "Saving..."

REFERENCE           MENU_SPRINT_HOLD_BREATH
LANG_ENGLISH        "Sprint/Hold Breath"

REFERENCE           MENU_COMBAT
LANG_ENGLISH        "Combat"

REFERENCE           MENU_ACTION_INVENTORY
LANG_ENGLISH        "Grenade Launcher/Inventory"

REFERENCE           MENU_MY_ASSAULT
LANG_ENGLISH        "My Assault"

REFERENCE           MENU_MY_SPECOPS
LANG_ENGLISH        "My Spec Ops"

REFERENCE           MENU_MY_HEAVYGUNNER
LANG_ENGLISH        "My Heavy Gunner"

REFERENCE           MENU_MY_DEMOLITIONS
LANG_ENGLISH        "My Demolitions"

REFERENCE           MENU_MY_SNIPER
LANG_ENGLISH        "My Sniper"

REFERENCE           MENU_TEXTURE_MIPMAPS
LANG_ENGLISH        "Texture Filtering"

REFERENCE           MENU_TEXTURE_ANISOTROPY
LANG_ENGLISH        "Anisotropic Filtering"

REFERENCE           MENU_MULTIPLAYER_CONTROLS
LANG_ENGLISH        "Multiplayer Controls"

REFERENCE           MENU_LOBBY
LANG_ENGLISH        "LOBBY"

REFERENCE           MENU_LEAVEMPGAMEWARNING
LANG_ENGLISH        "If you accept this invite, you will quit your current game lobby.  Accept invitation?"

REFERENCE           MENU_LEAVEMPGAMEWARNINGPARTYHOST
LANG_ENGLISH        "If you join another session, you will disband your party.  Disband party?"

REFERENCE           MENU_ACCEPTINVITETITLE
LANG_ENGLISH        "Leave Party?"

REFERENCE           MENU_LEAVEPARTYWARNING
LANG_ENGLISH        "If you join another session, you will leave your party.  Leave party?"

REFERENCE           MENU_CONFIRMINVITE
LANG_ENGLISH        "Leave Party"

REFERENCE           MENU_SPLIT_SCREEN_SIGNIN
LANG_ENGLISH        "SPLIT SCREEN SIGN IN"

REFERENCE           MENU_SPLIT_SCREEN_SETUP
LANG_ENGLISH        "SPLIT SCREEN SETUP"

REFERENCE           MENU_PLAYER1
LANG_ENGLISH        "Player 1"

REFERENCE           MENU_PLAYER2
LANG_ENGLISH        "Player 2"

REFERENCE           MENU_PLAYER3
LANG_ENGLISH        "Player 3"

REFERENCE           MENU_PLAYER4
LANG_ENGLISH        "Player 4"

REFERENCE           MENU_SPECULAR_MAP
LANG_ENGLISH        "Specular Map"

REFERENCE           MENU_THROW_SPECIAL_GRENADE
LANG_ENGLISH        "Throw Special Grenade"

REFERENCE           MENU_STAYINPARTY
LANG_ENGLISH        "Stay In This Party"

REFERENCE           MENU_VOICECHATCOLON
LANG_ENGLISH        "Voice Chat:  "

REFERENCE           MENU_CHEATS
LANG_ENGLISH        "CHEATS"

REFERENCE           MENU_NOT_USED
LANG_ENGLISH        "Not Used"

REFERENCE           MENU_CHEAT_POINTS
LANG_ENGLISH        "You have collected &&1 piece(s) of enemy intel."

REFERENCE           MENU_NO_SAVE_DEVICE_WARNING
LANG_ENGLISH        "No save device selected; \\nyou will not be able to save your game progress."

REFERENCE           MENU_NO_SAVE_DEVICE_WARNING_NOW_OKAY
LANG_ENGLISH        "You are now able to save your game progress."

REFERENCE           MENU_CHEATS_LOWCASE
LANG_ENGLISH        "Cheats"

REFERENCE           MENU_DIFFICULTY_COMPLETED
LANG_ENGLISH        "Difficulty Completed:"

REFERENCE           MENU_SP_AFTERMATH_DESC
LANG_ENGLISH        "..."

REFERENCE           MENU_SP_AIRPLANE_DESC
LANG_ENGLISH        "???"

REFERENCE           MENU_SP_JEEPRIDE_DESC
LANG_ENGLISH        "Get the hell out of there!"

REFERENCE           MENU_OPTIONS_UPPER_CASE
LANG_ENGLISH        "OPTIONS"

REFERENCE           MENU_INVENTORY
LANG_ENGLISH        "Inventory"

REFERENCE           MENU_FRIENDS_CAP
LANG_ENGLISH        "FRIENDS"

REFERENCE           MENU_CONTROLLER_DISCONNECTED
LANG_ENGLISH        "Please reconnect your controller."

REFERENCE           MENU_AUTOASSIGN
LANG_ENGLISH        "Auto-Assign"

REFERENCE           MENU_SPECTATOR
LANG_ENGLISH        "Spectator"

REFERENCE           MENU_END_GAME
LANG_ENGLISH        "End Game"

REFERENCE           MENU_PRIMARY_ATTRIBUTES
LANG_ENGLISH        "Primary Attributes"

REFERENCE           MENU_ACCURACY1
LANG_ENGLISH        "Accuracy:"

REFERENCE           MENU_DAMAGE
LANG_ENGLISH        "Damage:"

REFERENCE           MENU_RANGE
LANG_ENGLISH        "Range:"

REFERENCE           MENU_FIRE_RATE
LANG_ENGLISH        "Fire Rate:"

REFERENCE           MENU_MOBILITY
LANG_ENGLISH        "Mobility:"

REFERENCE           MENU_KILL_EVERYONE_FIRST_PLAYER
LANG_ENGLISH        "Kill everyone. First player to reach the score limit ends the game, the top 3 players win."

REFERENCE           MENU_KILL_PLAYERS_ON_THE_OPPOSING
LANG_ENGLISH        "Kill players on the opposing team. The first team to reach the score limit wins!"

REFERENCE           MENU_TEAMS_TAKE_TURNS_DEFENDING
LANG_ENGLISH        "Teams take turns defending and destroying an objective.  "

REFERENCE           MENU_ARENA
LANG_ENGLISH        "Win the match by eliminating the opposing team or capturing the center point."

REFERENCE           MENU_ARENA_DESC
LANG_ENGLISH        "ARENA."

REFERENCE           MENU_DD
LANG_ENGLISH        "Teams alternate in attacking and defending two bomb sites, both of which must be destroyed by the attacking team equipped with bombs.  "

REFERENCE           MENU_DD_DESC
LANG_ENGLISH        "Demolition"

REFERENCE           MENU_VIP
LANG_ENGLISH        "Take turns escorting the VIP to the extraction zone."

REFERENCE           MENU_VIP_DESC
LANG_ENGLISH        "VIP"

REFERENCE           MENU_1_BOMB_IN_THE_CENTER
LANG_ENGLISH        "1 bomb in the center of the map.  Grab it and destroy the enemy objective!"

REFERENCE           MENU_CAPTURE_AND_HOLD_THE
LANG_ENGLISH        "Capture and hold the designated positions to gain points."

REFERENCE           MENU_GET_THE_ENEMY_FLAG_AND
LANG_ENGLISH        "Get the enemy flag and return it to yours to capture it."

REFERENCE           MENU_CAPTURE_THE_HEADQUARTERS
LANG_ENGLISH        "Capture the headquarters and defend it from the enemy."

REFERENCE           MENU_TEAMS_TAKE_TURNS_CAPTURING
LANG_ENGLISH        "Teams take turns defending and capturing an objective."

REFERENCE           MENU_CHECK_HOW_YOUR_SCORE
LANG_ENGLISH        "Check how your score stacks up against your friends and the world."

REFERENCE           MENU_LEAVE_GAME
LANG_ENGLISH        "Leave Game"

REFERENCE           MENU_BRIGHTNESS1
LANG_ENGLISH        "Brightness..."

REFERENCE           MENU_TACTICAL
LANG_ENGLISH        "Tactical"

REFERENCE           MENU_RENAME
LANG_ENGLISH        "Rename"

REFERENCE           MENU_RESET_TO_DEFAULT
LANG_ENGLISH        "Reset to Default"

REFERENCE           MENU_XP_REWARD
LANG_ENGLISH        "XP Reward:"

REFERENCE           MENU_LOWER_DIFFICULTY
LANG_ENGLISH        "Lower Difficulty"

REFERENCE           MENU_LOWER_DIFFICULTY_1_0
LANG_ENGLISH        "Lower the difficulty from Regular to Recruit for all missions?"

REFERENCE           MENU_LOWER_DIFFICULTY_2_1
LANG_ENGLISH        "Lower the difficulty from Hardened to Regular for all missions?"

REFERENCE           MENU_LOWER_DIFFICULTY_3_2
LANG_ENGLISH        "Lower the difficulty from Veteran to Hardened for all missions?"

REFERENCE           MENU_INVITE_FRIENDS
LANG_ENGLISH        "Invite Friends"

REFERENCE           MENU_MISSIONS_CAP
LANG_ENGLISH        "MISSIONS"

REFERENCE           MENU_PROLOGUE
LANG_ENGLISH        "Prologue"

REFERENCE           MENU_ACT_I
LANG_ENGLISH        "Act I"

REFERENCE           MENU_ACT_II
LANG_ENGLISH        "Act II"

REFERENCE           MENU_ACT_III
LANG_ENGLISH        "Act III"

REFERENCE           MENU_EPILOGUE
LANG_ENGLISH        "Epilogue"

REFERENCE           MENU_SPECIAL_OPS
LANG_ENGLISH        "Special Ops"

REFERENCE           MENU_DEV
LANG_ENGLISH        "Dev. only"

REFERENCE           MENU_SAVEDATA_CORRUPTED
LANG_ENGLISH        "Unable to resume current level because save data is corrupted. Please restart the level from \\"Mission Select\\"."

REFERENCE           MENU_SAVE_CORRUPTED
LANG_ENGLISH        "Save Corrupted"

REFERENCE           MENU_WARNING_CHECKPOINT_RESET
LANG_ENGLISH        "This will overwrite your current mission's progress.  Do you wish to continue?"

REFERENCE           MENU_WARNING_CHECKPOINT_RESET2
LANG_ENGLISH        "If you continue, the progress in your \\nlast mission will be overwritten."

REFERENCE           MENU_DOWNLOADING_GAME_SETTINGS
LANG_ENGLISH        "DOWNLOADING GAME SETTINGS"

REFERENCE           MENU_RECONNECTING_TO_PARTY
LANG_ENGLISH        "WAITING FOR PARTY LEADER"

REFERENCE           MENU_PRESTIGE_RESET_WARNING1
LANG_ENGLISH        "Trade all of your accomplishments for a bit of prestige.  In addition to your new prestige rank icon, you'll gain access to some new titles, emblems and challenges.\\n\\nOther players will see your new prestige rank icon in the lobby, leaderboards, and game."

REFERENCE           MENU_PRESTIGE_RESET_TITLE1
LANG_ENGLISH        "Do it all again?"

REFERENCE           MENU_PRESTIGE_RESET_TITLE2
LANG_ENGLISH        "More Info"

REFERENCE           MENU_PRESTIGE_ENTER
LANG_ENGLISH        "Enter Prestige"

REFERENCE           MENU_PRESTIGE_RESET_WARNING2
LANG_ENGLISH        "Prestige has a price: Everything you've unlocked including weapons, experience and challenges will be reset; you'll have to rank up again to reacquire them.\\n\\nOnly your Leaderboard rankings, titles, emblems, clan tag and play lists will be unaffected."

REFERENCE           MENU_PRESTIGE_RESET_WARNING3
LANG_ENGLISH        "There's no going back..."

REFERENCE           MENU_PRESTIGE_RESET_TITLE3
LANG_ENGLISH        "Last Chance..."

REFERENCE           MENU_CHEATS_WARNING
LANG_ENGLISH        "You can't earn achievements while cheats are enabled."

REFERENCE           MENU_CHEATS_NAME2
LANG_ENGLISH        "Photo-Negative"

REFERENCE           MENU_CHEATS_NAME3
LANG_ENGLISH        "Super Contrast"

REFERENCE           MENU_CHEATS_NAME4
LANG_ENGLISH        "Ragtime Warfare"

REFERENCE           MENU_CHEATS_NAME5
LANG_ENGLISH        "Cluster Bombs"

REFERENCE           MENU_CHEATS_NAME6
LANG_ENGLISH        "A Bad Year"

REFERENCE           MENU_CHEATS_NAME7
LANG_ENGLISH        "Slow-Mo Ability"

REFERENCE           MENU_CHEATS_NAME8
LANG_ENGLISH        "Infinite Ammo"

REFERENCE           MENU_CHEATS_UNLOCK1
LANG_ENGLISH        "Find 2 pieces of enemy intel to unlock."

REFERENCE           MENU_CHEATS_UNLOCK2
LANG_ENGLISH        "Find 4 pieces of enemy intel to unlock."

REFERENCE           MENU_CHEATS_UNLOCK3
LANG_ENGLISH        "Find 6 pieces of enemy intel to unlock."

REFERENCE           MENU_CHEATS_UNLOCK4
LANG_ENGLISH        "Find 8 pieces of enemy intel to unlock."

REFERENCE           MENU_CHEATS_UNLOCK5
LANG_ENGLISH        "Find 10 pieces of enemy intel to unlock."

REFERENCE           MENU_CHEATS_UNLOCK6
LANG_ENGLISH        "Find 15 pieces of enemy intel to unlock."

REFERENCE           MENU_CHEATS_UNLOCK7
LANG_ENGLISH        "Find 20 pieces of enemy intel to unlock."

REFERENCE           MENU_CHEATS_UNLOCK8
LANG_ENGLISH        "Find 30 pieces of enemy intel to unlock."

REFERENCE           MENU_CHEATS_DESC1
LANG_ENGLISH        "For that arthouse feel."

REFERENCE           MENU_CHEATS_DESC2
LANG_ENGLISH        "Reprints not available."

REFERENCE           MENU_CHEATS_DESC3
LANG_ENGLISH        "Try combos of this and the other two color cheats for different effects."

REFERENCE           MENU_CHEATS_DESC4
LANG_ENGLISH        "Activates secret protocol Ragtime Warfare."

REFERENCE           MENU_CHEATS_DESC5
LANG_ENGLISH        "Throw a frag grenade and enjoy the show."

REFERENCE           MENU_CHEATS_DESC6
LANG_ENGLISH        "Shoot some enemies, see what happens."

REFERENCE           MENU_CHEATS_DESC7
LANG_ENGLISH        "Melee to turn on/off."

REFERENCE           MENU_CHEATS_DESC8
LANG_ENGLISH        "No reloading, no worries."

REFERENCE           MENU_CHEATS_HOWTO
LANG_ENGLISH        "To unlock cheats, you must complete the game at least once in any difficulty."

REFERENCE           MENU_WARNING_AUTOSAVE
LANG_ENGLISH        "This game saves data automatically at certain points. Do not switch off the\\npower when the HDD access indicator is flashing."

REFERENCE           MENU_READING_SAVE_DEVICE
LANG_ENGLISH        "READING SAVE DEVICE"

REFERENCE           MENU_MESSAGE_OF_THE_DAY
LANG_ENGLISH        "Infinity Ward Intel"

REFERENCE           MENU_BRIGHTNESS_DESC1
LANG_ENGLISH        "Move the slider to adjust the brightness of your screen."

REFERENCE           MENU_BRIGHTNESS_DESC2
LANG_ENGLISH        "Only the text in the two lower boxes should be visible."

REFERENCE           MENU_BRIGHTNESS_NOT_VISIBLE
LANG_ENGLISH        "Not Visible"

REFERENCE           MENU_BRIGHTNESS_BARELY_VISIBLE
LANG_ENGLISH        "Barely Visible"

REFERENCE           MENU_BRIGHTNESS_EASILY_VISIBLE
LANG_ENGLISH        "Easily Visible"

REFERENCE           MENU_BRIGHTNESS_CAP
LANG_ENGLISH        "BRIGHTNESS"

REFERENCE           MENU_CONTROLS_CAP
LANG_ENGLISH        "CONTROLS"

REFERENCE           MENU_STICK_LAYOUT_CAP
LANG_ENGLISH        "STICK LAYOUT"

REFERENCE           MENU_BUTTON_LAYOUT_CAP
LANG_ENGLISH        "BUTTON LAYOUT"

REFERENCE           MENU_SENSITIVITY_CAP
LANG_ENGLISH        "SENSITIVITY"

REFERENCE           MENU_INTEL
LANG_ENGLISH        "INTEL"

REFERENCE           MENU_LEAVE_GAME_AND_PARTY
LANG_ENGLISH        "Leave game and party?"

REFERENCE           MENU_LEAVE_GAME_RANKED1
LANG_ENGLISH        "Warning: Leaving the game early will"

REFERENCE           MENU_LEAVE_GAME_RANKED2
LANG_ENGLISH        "forfeit your match bonus and will count"

REFERENCE           MENU_LEAVE_GAME_RANKED3
LANG_ENGLISH        "as a loss."

REFERENCE           MENU_SCORE_TIED
LANG_ENGLISH        "Tied &&1 - &&2"

REFERENCE           MENU_SCORE_LOSING
LANG_ENGLISH        "Losing &&1 - &&2"

REFERENCE           MENU_SCORE_WINNING
LANG_ENGLISH        "Winning &&1 - &&2"

REFERENCE           MENU_CUSTOM_CLASS_RESET_WARNING
LANG_ENGLISH        "This will override your current settings for this class. Would you like to proceed?"

REFERENCE           MENU_PAUSED_CAP
LANG_ENGLISH        "PAUSED"

REFERENCE           MENU_PUBLIC_PLAYLISTS
LANG_ENGLISH        "Public Playlists"

REFERENCE           MENU_CHALLENGES_CAP
LANG_ENGLISH        "CHALLENGES"

REFERENCE           MENU_RANK_AND_CHALLENGES_CAP
LANG_ENGLISH        "RANK & CHALLENGES"

REFERENCE           MENU_CHOOSE_MAP_CAP
LANG_ENGLISH        "CHOOSE MAP"

REFERENCE           MENU_CHOOSE_GAME_MODE_CAP
LANG_ENGLISH        "CHOOSE GAME MODE"

REFERENCE           MENU_SYSTEM_LINK_SETUP
LANG_ENGLISH        "SYSTEM LINK SETUP"

REFERENCE           MENU_FREE_FOR_ALL
LANG_ENGLISH        "Free for All"

REFERENCE           MENU_RESUME_CREDITS
LANG_ENGLISH        "Resume Credits"

REFERENCE           MENU_PRESS_START_TO_SKIP
LANG_ENGLISH        "Press START button to skip"

REFERENCE           MENU_DEFAULT_ALT
LANG_ENGLISH        "Default Flipped"

REFERENCE           MENU_LEFTY_ALT
LANG_ENGLISH        "Lefty Flipped"

REFERENCE           MENU_TACTICAL_ALT
LANG_ENGLISH        "Tactical Flipped"

REFERENCE           MENU_GOTO_NEXT
LANG_ENGLISH        ">>>"

REFERENCE           MENU_SENSITIVITY_CUSTOM_CAP
LANG_ENGLISH        "SENSITIVITY CUSTOM"

REFERENCE           MENU_CUSTOM_N
LANG_ENGLISH        "Custom (&&1)"

REFERENCE           MENU_SENSITIVITY_LOW_N
LANG_ENGLISH        "(Low) &&1"

REFERENCE           MENU_SENSITIVITY_MEDIUM_N
LANG_ENGLISH        "(Medium) &&1"

REFERENCE           MENU_SENSITIVITY_HIGH_N
LANG_ENGLISH        "(High) &&1"

REFERENCE           MENU_SENSITIVITY_VERY_HIGH_N
LANG_ENGLISH        "(Very High) &&1"

REFERENCE           MENU_SENSITIVITY_INSANE_N
LANG_ENGLISH        "(Insane) &&1"

REFERENCE           MENU_RANK_AND_CHALLENGES
LANG_ENGLISH        "Rank & Challenges"

REFERENCE           MENU_JOIN_SERVER_CAP
LANG_ENGLISH        "JOIN SERVER"

REFERENCE           MENU_LEADERBOARDS_CAP
LANG_ENGLISH        "LEADERBOARDS"

REFERENCE           MENU_WINS_GLOBAL_CAP
LANG_ENGLISH        "LEADERBOARD - WINS (GLOBAL)"

REFERENCE           MENU_WINS_FRIENDS_CAP
LANG_ENGLISH        "LEADERBOARD - WINS (FRIENDS)"

REFERENCE           MENU_KILLS_GLOBAL_CAP
LANG_ENGLISH        "LEADERBOARD - KILLS (GLOBAL)"

REFERENCE           MENU_KILLS_FRIENDS_CAP
LANG_ENGLISH        "LEADERBOARD - KILLS (FRIENDS)"

REFERENCE           MENU_SCORE_GLOBAL_CAP
LANG_ENGLISH        "LEADERBOARD - SCORE (GLOBAL)"

REFERENCE           MENU_SCORE_FRIENDS_CAP
LANG_ENGLISH        "LEADERBOARD - SCORE (FRIENDS)"

REFERENCE           MENU_ACCURACY_GLOBAL_CAP
LANG_ENGLISH        "LEADERBOARD - ACCURACY (GLOBAL)"

REFERENCE           MENU_ACCURACY_FRIENDS_CAP
LANG_ENGLISH        "LEADERBOARD - ACCURACY (FRIENDS)"

REFERENCE           MENU_CHEAT_ENABLED
LANG_ENGLISH        "Cheat Enabled"

REFERENCE           MENU_MOVE_FORWARD_BACK
LANG_ENGLISH        "Move\\nForward/Back"

REFERENCE           MENU_LOOK_UP_DOWN
LANG_ENGLISH        "Look\\nUp/Down"

REFERENCE           MENU_ARCADEMODE
LANG_ENGLISH        "Arcade Mode"

REFERENCE           MENU_ARCADE_FULL
LANG_ENGLISH        "Full Challenge"

REFERENCE           MENU_ARCADE_SINGLE
LANG_ENGLISH        "Mission Challenge"

REFERENCE           MENU_SELECT_ARCADEMODE
LANG_ENGLISH        "Choose Arcade Mode"

REFERENCE           MENU_ARCADE_UNLOCK_DESC
LANG_ENGLISH        "Complete the game to unlock Arcade Mode"

REFERENCE           MENU_RECRUIT
LANG_ENGLISH        "Recruit"

REFERENCE           MENU_DIFFICULTY_WARNING
LANG_ENGLISH        "The difficulty you have selected is not recommended. Do you wish to continue?"

REFERENCE           MENU_DIFFICULTY_WARNING_EASIER
LANG_ENGLISH        "The difficulty you have selected is easier than what was recommended. Do you wish to continue?"

REFERENCE           MENU_SELECT_DIFFICULTY
LANG_ENGLISH        "Select Difficulty"

REFERENCE           MENU_QUIT_WARNING_ARCADE
LANG_ENGLISH        "If you quit you will lose current level progress."

REFERENCE           MENU_CHEAT_POINTS_LEVEL
LANG_ENGLISH        "You have found &&1 of &&2 enemy intel items in this mission."

REFERENCE           MENU_ARCADE_SCORE
LANG_ENGLISH        "Best Arcade Score: &&1"

REFERENCE           MENU_VOICE_VOLUME
LANG_ENGLISH        "Voice Volume"

REFERENCE           MENU_ARCADE_FULL_DESC
LANG_ENGLISH        "Earn points by quickly playing through the\\ngame in order. Best score: &&1"

REFERENCE           MENU_ARCADE_SINGLE_DESC
LANG_ENGLISH        "Try to earn the highest score\\nin a mission of your choice."

REFERENCE           MENU_ARCADE_LBSCORE
LANG_ENGLISH        "Score"

REFERENCE           MENU_SP_UNLOCK_DESC
LANG_ENGLISH        "Cheats are available from the in-game pause menu.\\nArcade Mode is available from the main menu."

REFERENCE           MENU_SP_UNLOCK_TITLE
LANG_ENGLISH        "Congratulations!"

REFERENCE           MENU_SP_UNLOCK_INFO
LANG_ENGLISH        "You have unlocked Arcade Mode and Cheats."

REFERENCE           MENU_TRIAL_GLOBAL_CAP
LANG_ENGLISH        "TIME TRIAL :: GLOBAL"

REFERENCE           MENU_TRIAL_FRIENDS_CAP
LANG_ENGLISH        "TIME TRIAL :: FRIENDS"

REFERENCE           MENU_ARCADE_GLOBAL_CAP
LANG_ENGLISH        "ARCADE :: GLOBAL"

REFERENCE           MENU_ARCADE_FRIENDS_CAP
LANG_ENGLISH        "ARCADE :: FRIENDS"

REFERENCE           MENU_LEADERBOARD_TIME_TRIAL
LANG_ENGLISH        "Time Trial"

REFERENCE           MENU_TRY_AGAIN
LANG_ENGLISH        "Try Again"

REFERENCE           MENU_TRY_AGAIN_DESC
LANG_ENGLISH        "Restart the time trial."

REFERENCE           MENU_PLAYERMATCH_PLAYLISTS
LANG_ENGLISH        "Player Match Playlists"

REFERENCE           MENU_DOF
LANG_ENGLISH        "Depth of Field"

REFERENCE           MENU_GLOW
LANG_ENGLISH        "Glow"

REFERENCE           MENU_SOUND_EQ
LANG_ENGLISH        "EQ Filter"

REFERENCE           MENU_BULLET_IMPACTS
LANG_ENGLISH        "Bullet Impacts"

REFERENCE           MENU_RAGDOLL
LANG_ENGLISH        "Ragdoll"

REFERENCE           MENU_UNTIL_MATCH_BEGIN
LANG_ENGLISH        "Until match begins."

REFERENCE           MENU_WATER_DETAIL
LANG_ENGLISH        "Water Detail"

REFERENCE           MENU_NIGHT_VISION
LANG_ENGLISH        "Night Vision"

REFERENCE           MENU_CHANGE_STANCE
LANG_ENGLISH        "Change Stance"

REFERENCE           MENU_SPRINT_STEADY_SNIPER_RIFLE
LANG_ENGLISH        "Sprint/Steady Sniper Rifle"

REFERENCE           MENU_AIR_SUPPORT
LANG_ENGLISH        "Air Support"

REFERENCE           MENU_EQUIPMENT
LANG_ENGLISH        "Equipment"

REFERENCE           MENU_EQUIPMENT_SECONDARY
LANG_ENGLISH        "Secondary Equipment"

REFERENCE           MENU_WEAPON_ATTACHMENT
LANG_ENGLISH        "Weapon Attachment"

REFERENCE           MENU_RESTORE_DEFAULTS
LANG_ENGLISH        "Restore Optimal Video and Audio settings?"

REFERENCE           MENU_RESTORE_EACH_SETTING
LANG_ENGLISH        "Reset controls back to default settings?"

REFERENCE           MENU_SETTINGS_RESET
LANG_ENGLISH        "Your control settings have been reset."

REFERENCE           MENU_LAUNCH_WITHOUT_MODS
LANG_ENGLISH        "Launch without Mods"

REFERENCE           MENU_SCORE_TIED_WITH
LANG_ENGLISH        "Tied with &&1 of &&2 points."

REFERENCE           MENU_SCORE_LOSING_WITH
LANG_ENGLISH        "Losing with &&1 of &&2 points."

REFERENCE           MENU_SCORE_WINNING_WITH
LANG_ENGLISH        "Winning with &&1 of &&2 points."

REFERENCE           MENU_100PERCENT
LANG_ENGLISH        "100%"

REFERENCE           MENU_DEV_COOP
LANG_ENGLISH        "Co-op Dev. only"

REFERENCE           MENU_COOP
LANG_ENGLISH        "Co-op Missions"

REFERENCE           MENU_SELECT_DIFFICULTY_PLAYER_1
LANG_ENGLISH        "Select Difficulty for Player 1"

REFERENCE           MENU_SELECT_DIFFICULTY_PLAYER_2
LANG_ENGLISH        "Select Difficulty for Player 2"

REFERENCE           MENU_COOP_GAME_SETUP
LANG_ENGLISH        "Game Setup"

REFERENCE           MENU_HUD_MARGIN_HORIZONTAL
LANG_ENGLISH        "Horizontal Margin"

REFERENCE           MENU_HUD_MARGIN_VERTICAL
LANG_ENGLISH        "Vertical Margin"

REFERENCE           MENU_SWITCH_CHARACTER
LANG_ENGLISH        "Switch Character"

REFERENCE           MENU_TOP_PLAYER
LANG_ENGLISH        "Top Player"

REFERENCE           MENU_BOTTOM_PLAYER
LANG_ENGLISH        "Bottom Player"

REFERENCE           MENU_PLAYER_AC130
LANG_ENGLISH        "AC130"

REFERENCE           MENU_PLAYER_INFANTRY
LANG_ENGLISH        "Infantry"

REFERENCE           MENU_PLAYER_READY
LANG_ENGLISH        "Ready"

REFERENCE           MENU_COOPERATIVE
LANG_ENGLISH        "Split Screen"

REFERENCE           MENU_GAMESKILL_EASY
LANG_ENGLISH        "For players who are new to first person action game."

REFERENCE           MENU_GAMESKILL_NORMAL
LANG_ENGLISH        "Your abilities in combat will be tested."

REFERENCE           MENU_ONE_FLAG
LANG_ENGLISH        "One Flag CTF"

REFERENCE           MENU_NETWORK_COOP
LANG_ENGLISH        "Online"

REFERENCE           MENU_LOAD_OFFLINE_PROFILE
LANG_ENGLISH        "Offline Profile"

REFERENCE           MENU_CREATE_NEW_OFFLINE_PROFILE
LANG_ENGLISH        "Create New"

REFERENCE           MENU_LOAD_EXISTING_OFFLINE_PROFILE
LANG_ENGLISH        "Load"

REFERENCE           MENU_DELETE_OFFLINE_PROFILE
LANG_ENGLISH        "Browse and delete data"

REFERENCE           MENU_NO_OFFLINE_PROFILE_WARNING
LANG_ENGLISH        "Select an offline profile\\nto save your progress."

REFERENCE           MENU_N_OF_N
LANG_ENGLISH        "&&1 of &&2"

REFERENCE           MENU_WINNING
LANG_ENGLISH        "Winning"

REFERENCE           MENU_LOSING
LANG_ENGLISH        "Losing"

REFERENCE           MENU_TIED
LANG_ENGLISH        "Tied"

REFERENCE           MENU_SEARCHING_FOR_OPPONENTS
LANG_ENGLISH        "Searching for opponents"

REFERENCE           MENU_GAME_BEGINNING
LANG_ENGLISH        "Launching"

REFERENCE           MENU_LAST_CHECKPOINT
LANG_ENGLISH        "Last Checkpoint"

REFERENCE           MENU_WAITING
LANG_ENGLISH        "Waiting"

REFERENCE           MENU_HOST_MIGRATION
LANG_ENGLISH        "HOST MIGRATION"

REFERENCE           MENU_THUMBSTICK_LAYOUT_CAPS
LANG_ENGLISH        "STICK LAYOUT"

REFERENCE           MENU_BUTTON_LAYOUT_CAPS
LANG_ENGLISH        "BUTTON LAYOUT"

REFERENCE           MENU_LOOK_SENSITIVITY_CAPS
LANG_ENGLISH        "SENSITIVITY"

REFERENCE           MENU_LOOK_INVERSION_CAPS
LANG_ENGLISH        "LOOK INVERSION"

REFERENCE           MENU_CONTROLLER_VIBRATION_CAPS
LANG_ENGLISH        "VIBRATION"

REFERENCE           MENU_HUD_MARGIN_HORIZONTAL_CAPS
LANG_ENGLISH        "HORIZONTAL MARGIN"

REFERENCE           MENU_HUD_MARGIN_VERTICAL_CAPS
LANG_ENGLISH        "VERTICAL MARGIN"

REFERENCE           MENU_VOLUME_CAPS
LANG_ENGLISH        "GAME VOLUME"

REFERENCE           MENU_VOICE_VOLUME_CAPS
LANG_ENGLISH        "VOICE VOLUME"

REFERENCE           MENU_BRIGHTNESS_CAPS
LANG_ENGLISH        "BRIGHTNESS"

REFERENCE           MENU_JOIN_GAME_CAPS
LANG_ENGLISH        "JOIN GAME"

REFERENCE           MENU_CREATE_GAME_CAPS
LANG_ENGLISH        "CREATE GAME"

REFERENCE           MENU_PLAYERCARD_CAPS
LANG_ENGLISH        "CALLSIGN & KILLSTREAKS"

REFERENCE           MENU_CREATE_A_CLASS_CAPS
LANG_ENGLISH        "CREATE A CLASS"

REFERENCE           MENU_BARRACKS_CAPS
LANG_ENGLISH        "BARRACKS"

REFERENCE           MENU_START_GAME_CAPS
LANG_ENGLISH        "START GAME"

REFERENCE           MENU_GAME_SETUP_CAPS
LANG_ENGLISH        "GAME SETUP"

REFERENCE           MENU_INVITE_CAPS
LANG_ENGLISH        "INVITE"

REFERENCE           MENU_CHANGE_MAP_CAPS
LANG_ENGLISH        "CHANGE MAP"

REFERENCE           MENU_CHANGE_GAME_MODE_CAPS
LANG_ENGLISH        "CHANGE GAME MODE"

REFERENCE           MENU_CHANGE_GAME_RULES_CAPS
LANG_ENGLISH        "GAME RULES"

REFERENCE           MENU_TITLE_CAPS
LANG_ENGLISH        "TITLE"

REFERENCE           MENU_EMBLEM_CAPS
LANG_ENGLISH        "EMBLEM"

REFERENCE           MENU_KILLSTREAK_REWARDS_CAPS
LANG_ENGLISH        "KILLSTREAK REWARDS"

REFERENCE           MENU_PRIVATE_MATCH_CAPS
LANG_ENGLISH        "PRIVATE MATCH"

REFERENCE           MENU_SPLITSCREEN_CAPS
LANG_ENGLISH        "SPLIT SCREEN"

REFERENCE           MENU_OPTIONS_CAPS
LANG_ENGLISH        "OPTIONS"

REFERENCE           MENU_SINGLE_PLAYER_CAPS
LANG_ENGLISH        "SINGLE PLAYER"

REFERENCE           MENU_YOUR_CLASSES_CAPS
LANG_ENGLISH        "CUSTOM CLASSES"

REFERENCE           MENU_PRIMARY_CAPS
LANG_ENGLISH        "PRIMARY"

REFERENCE           MENU_SECONDARY_CAPS
LANG_ENGLISH        "SECONDARY"

REFERENCE           MENU_PRIMARY_WEAPONS
LANG_ENGLISH        "Primary Weapons"

REFERENCE           MENU_SECONDARY_WEAPONS
LANG_ENGLISH        "Secondary Weapons"

REFERENCE           MENU_SPECIAL_GRENADE_CAPS
LANG_ENGLISH        "SPECIAL GRENADE"

REFERENCE           MENU_PERK1_CAPS
LANG_ENGLISH        "PERK 1"

REFERENCE           MENU_PERK2_CAPS
LANG_ENGLISH        "PERK 2"

REFERENCE           MENU_PERK3_CAPS
LANG_ENGLISH        "PERK 3"

REFERENCE           MENU_DEATHSTREAK_CAPS
LANG_ENGLISH        "DEATH STREAK"

REFERENCE           MENU_RENAME_CAPS
LANG_ENGLISH        "RENAME"

REFERENCE           MENU_RESET_CLASS_CAPS
LANG_ENGLISH        "RESET CLASS"

REFERENCE           MENU_PLUS
LANG_ENGLISH        "+&&1"

REFERENCE           MENU_ASSAULT_RIFLES_CAPS
LANG_ENGLISH        "ASSAULT RIFLES"

REFERENCE           MENU_SMGS_CAPS
LANG_ENGLISH        "SUB MACHINE GUNS"

REFERENCE           MENU_LMGS_CAPS
LANG_ENGLISH        "LIGHT MACHINE GUNS"

REFERENCE           MENU_SNIPER_RIFLES_CAPS
LANG_ENGLISH        "SNIPER RIFLES"

REFERENCE           MENU_RIOT_SHIELD_CAPS
LANG_ENGLISH        "RIOT SHIELD"

REFERENCE           MENU_MACHINE_PISTOLS_CAPS
LANG_ENGLISH        "MACHINE PISTOLS"

REFERENCE           MENU_SHOTGUNS_CAPS
LANG_ENGLISH        "SHOTGUNS"

REFERENCE           MENU_HANDGUNS_CAPS
LANG_ENGLISH        "HANDGUNS"

REFERENCE           MENU_ROCKETS_CAPS
LANG_ENGLISH        "LAUNCHERS"

REFERENCE           MENU_WEAPON_CLASS_CAPS
LANG_ENGLISH        "WEAPON CLASS"

REFERENCE           MENU_WEAPONS_CAPS
LANG_ENGLISH        "WEAPONS"

REFERENCE           MENU_ATTACHMENTS_CAPS
LANG_ENGLISH        "ATTACHMENTS"

REFERENCE           MENU_CAMO_CAPS
LANG_ENGLISH        "CAMOUFLAGE"

REFERENCE           MENU_WEAPON_CLASSES_CAPS
LANG_ENGLISH        "WEAPON CLASSES"

REFERENCE           MENU_UPGRADE_CAPS
LANG_ENGLISH        "UPGRADE"

REFERENCE           MENU_START_MATCH
LANG_ENGLISH        "Start Match"

REFERENCE           MENU_START_MATCH_CAPS
LANG_ENGLISH        "START MATCH"

REFERENCE           MENU_DESC_START_MATCH
LANG_ENGLISH        "Start the match."

REFERENCE           MENU_CHANGE_MAP
LANG_ENGLISH        "Change Map"

REFERENCE           MENU_DESC_START_MATCH_LOCKED
LANG_ENGLISH        "Only the lobby host can start the match."

REFERENCE           MENU_DESC_CHANGE_MAP
LANG_ENGLISH        "Choose a different map."

REFERENCE           MENU_DESC_INVITE_FRIENDS
LANG_ENGLISH        "Invite friends to your game."

REFERENCE           MENU_INVITE_FRIEND
LANG_ENGLISH        "Invite A Friend"

REFERENCE           MENU_DESC_INVITE_FRIEND
LANG_ENGLISH        "Invite a friend to your game."

REFERENCE           MENU_BOOTCAMP_CAPS
LANG_ENGLISH        "BOOTCAMP"

REFERENCE           MENU_BLING_PRIMARY_DESC
LANG_ENGLISH        "Extra primary weapon attachment."

REFERENCE           MENU_BLING_SECONDARY_DESC
LANG_ENGLISH        "Extra secondary weapon attachment."

REFERENCE           MENU_CIA_CAPS
LANG_ENGLISH        "CIA"

REFERENCE           MENU_KILLER_CAPS
LANG_ENGLISH        "KILLER"

REFERENCE           MENU_HUMILIATION_CAPS
LANG_ENGLISH        "HUMILIATION"

REFERENCE           MENU_ELITE_CAPS
LANG_ENGLISH        "ELITE"

REFERENCE           MENU_PERKS_CAPS
LANG_ENGLISH        "PERKS"

REFERENCE           MENU_KILLSTREAK_CAPS
LANG_ENGLISH        "KILLSTREAK"

REFERENCE           MENU_DEFCON_CAPS
LANG_ENGLISH        "DEFCON"

REFERENCE           MENU_EQUIPMENT_CAPS
LANG_ENGLISH        "EQUIPMENT"

REFERENCE           MENU_IWNET_LOGIN
LANG_ENGLISH        "Log Into IW.net"

REFERENCE           MENU_IWNET_USERNAME
LANG_ENGLISH        "Username: "

REFERENCE           MENU_LOGIN
LANG_ENGLISH        "Log In"

REFERENCE           MENU_CONNECTING
LANG_ENGLISH        "Connecting..."

REFERENCE           MENU_CREATING
LANG_ENGLISH        "Creating Account..."

REFERENCE           MENU_IWNET_CREATE_IWNET_ACCOUNT
LANG_ENGLISH        "Create an IW.net Account"

REFERENCE           MENU_IWNET_CREATE
LANG_ENGLISH        "Create Account"

REFERENCE           MENU_IWNET_EMAIL
LANG_ENGLISH        "Email: "

REFERENCE           MENU_IWNET_NAME_TAKEN
LANG_ENGLISH        "That account name is already taken."

REFERENCE           MENU_IWNET_NAME_ILLEGAL
LANG_ENGLISH        "That account name is invalid, please try another one."

REFERENCE           MENU_IWNET_CREATION_FAILED
LANG_ENGLISH        "Failed to create account."

REFERENCE           MENU_IWNET_MUSTLOGIN
LANG_ENGLISH        "You must log into a valid IW.net account to proceed."

REFERENCE           MENU_IWNET_LOGIN_SUCCESS
LANG_ENGLISH        "You are now logged in."

REFERENCE           MENU_IWNET_LOGIN_TIMEOUT
LANG_ENGLISH        "No response was received from the IW.net servers.  Please try again soon."

REFERENCE           MENU_IWNET_LOGIN_ERROR
LANG_ENGLISH        "There was a problem communicating with the IW.net servers."

REFERENCE           MENU_IWNET_LOGIN_BADPASSWORD
LANG_ENGLISH        "The password supplied for this account was incorrect."

REFERENCE           MENU_IWNET_LOGIN_UNKNOWNUSER
LANG_ENGLISH        "That username is not recognized."

REFERENCE           MENU_IWNET_LOGIN_NOTENTITLED
LANG_ENGLISH        "That account is not able to log in to Modern Warfare 2."

REFERENCE           MENU_IWNET_LOGIN_BANNED
LANG_ENGLISH        "This account has been banned."

REFERENCE           MENU_IWNET_CREATE_SUCCESS
LANG_ENGLISH        "Your account has been created successfully."

REFERENCE           MENU_IWNET_CREATE_NAMETAKEN
LANG_ENGLISH        "That username already exists."

REFERENCE           MENU_IWNET_CREATE_BADNAME
LANG_ENGLISH        "That name is not allowed."

REFERENCE           MENU_IWNET_CREATE_ERROR
LANG_ENGLISH        "There was an error while trying to create your account.  Please try again soon."

REFERENCE           MENU_VOTE_TO_SKIP_CAPS
LANG_ENGLISH        "VOTE TO SKIP"

REFERENCE           MENU_MAP_PRE
LANG_ENGLISH        "MAP: "

REFERENCE           MENU_GAMETYPE_PRE
LANG_ENGLISH        "GAMETYPE: "

REFERENCE           MENU_SPECOP_SELECT_AC130_PILOT
LANG_ENGLISH        "Select AC130 Pilot"

REFERENCE           MENU_COOP_ONLY_CHALLENGE
LANG_ENGLISH        "This Special Operation requires two players."

REFERENCE           MENU_LOWER_DIFFICULTY_1_0_BUTTON
LANG_ENGLISH        "Lower to Recruit"

REFERENCE           MENU_LOWER_DIFFICULTY_2_1_BUTTON
LANG_ENGLISH        "Lower to Regular"

REFERENCE           MENU_LOWER_DIFFICULTY_3_2_BUTTON
LANG_ENGLISH        "Lower to Hardened"

REFERENCE           MENU_CORRUPT_STATS_WARNING_OFFLINE
LANG_ENGLISH        "Your data is corrupt, or the save device isn't inserted correctly.\\n\\nYou must reset your rank and unlocks to continue."

REFERENCE           MENU_CORRUPT_STATS_WARNING_ONLINE
LANG_ENGLISH        "Your data is corrupt, or didn't download properly.\\n\\nYou must reset your rank and unlocks to continue."

REFERENCE           MENU_STATS_WRONG_VERSION_WARNING
LANG_ENGLISH        "Your data is from an old version of the game.\\n\\nYou must reset your rank and unlocks to continue."

REFERENCE           MENU_STATS_RESET_YES
LANG_ENGLISH        "Reset Rank"

REFERENCE           MENU_STATS_RESET_NO
LANG_ENGLISH        "Cancel"

REFERENCE           MENU_PLAYERCARD
LANG_ENGLISH        "SELECT YOUR..."

REFERENCE           MENU_PLAYERCARD_DESC
LANG_ENGLISH        "Personal stats"

REFERENCE           MENU_PLAYERCARD_TITLES
LANG_ENGLISH        "Titles"

REFERENCE           MENU_PLAYERCARD_ICONS
LANG_ENGLISH        "Emblems"

REFERENCE           MENU_PLAYERCARD_TITLES_DESC
LANG_ENGLISH        "Choose your title."

REFERENCE           MENU_PLAYERCARD_ICONS_DESC
LANG_ENGLISH        "Choose your emblem."

REFERENCE           MENU_KILLSTREAK_REWARD
LANG_ENGLISH        "Killstreak Reward"

REFERENCE           MENU_KILLSTREAK_REWARD_DESC
LANG_ENGLISH        "New killstreak rewards are available."

REFERENCE           MENU_IWNET_LOGIN_BADPARAMS
LANG_ENGLISH        "You must supply a username and password."

REFERENCE           MENU_IWNET_CREATE_BADEMAIL
LANG_ENGLISH        "You must provide a valid email address."

REFERENCE           MENU_IWNET_CREATE_PASSWORD_MISMATCH
LANG_ENGLISH        "Both password fields must match."

REFERENCE           MENU_IWNET_CREATE_NOUSER
LANG_ENGLISH        "You must supply a username."

REFERENCE           MENU_IWNET_CREATE_NOPASSWORD
LANG_ENGLISH        "You must supply a password."

REFERENCE           MENU_IWNET_CREATE_SHORT_USER
LANG_ENGLISH        "Your username must be at least 3 characters long."

REFERENCE           MENU_IWNET_CREATE_SHORT_PASSWORD
LANG_ENGLISH        "Your password must be at least 4 characters long."

REFERENCE           MENU_CHOOSE_TEAM_CAPS
LANG_ENGLISH        "CHOOSE TEAM"

REFERENCE           MENU_IWNET_CREATE_BADCDKEY
LANG_ENGLISH        "You must enter a valid CD Key."

REFERENCE           MENU_IWNET_CREATE_KEYUSED
LANG_ENGLISH        "This CD Key has already been used."

REFERENCE           MENU_IWNET_CDKEY
LANG_ENGLISH        "CD Key:"

REFERENCE           MENU_MERGEDLOBBIES
LANG_ENGLISH        "Lobbies merged successfully"

REFERENCE           MENU_MERGINGLOBBIES
LANG_ENGLISH        "Trying to merge our lobby with another"

REFERENCE           MENU_SEARCHINGFORGAMES_50MS
LANG_ENGLISH        "Finding games - 50ms ping"

REFERENCE           MENU_DUMMY
LANG_ENGLISH        "dummy"

REFERENCE           MENU_DUMMY_DESC
LANG_ENGLISH        "dummy"

REFERENCE           MENU_NOSEARCHRESULTS
LANG_ENGLISH        "No games found"

REFERENCE           MENU_SEARCHRESULTCOUNT
LANG_ENGLISH        "&&1 potential games found"

REFERENCE           MENU_SEARCHINGFORGAMES_100MS
LANG_ENGLISH        "Finding games - 100ms ping"

REFERENCE           MENU_SEARCHINGFORGAMES_150MS
LANG_ENGLISH        "Finding games - 150ms ping"

REFERENCE           MENU_SEARCHINGFORGAMES_200MS
LANG_ENGLISH        "Finding games - 200ms ping"

REFERENCE           MENU_SEARCHINGFORGAMES_250MS
LANG_ENGLISH        "Finding games - 250ms ping"

REFERENCE           MENU_SEARCHINGFORGAMES_300MS
LANG_ENGLISH        "Finding games - 300ms ping"

REFERENCE           MENU_SEARCHINGFORGAMES_350MS
LANG_ENGLISH        "Finding games - 350ms ping"

REFERENCE           MENU_NEWPASSWORD
LANG_ENGLISH        "New Password:"

REFERENCE           MENU_ACCOUNT
LANG_ENGLISH        "Account Settings"

REFERENCE           MENU_IWNET_RESET
LANG_ENGLISH        "Reset Password"

REFERENCE           MENU_IWNET_ACCOUNT_SETTINGS
LANG_ENGLISH        "Modern Warfare 2 Account Settings"

REFERENCE           MENU_IWNET_CHANGE_PASSWORD
LANG_ENGLISH        "Change Password"

REFERENCE           MENU_IWNET_CHANGE_EMAIL
LANG_ENGLISH        "Change Email Address"

REFERENCE           MENU_IWNET_RESET_PASSWORD
LANG_ENGLISH        "Reset Account Password"

REFERENCE           MENU_IWNET_ACCOUNT_CDKEY
LANG_ENGLISH        "Please enter the original CD Key used to create this account."

REFERENCE           MENU_DONE
LANG_ENGLISH        "Done"

REFERENCE           MENU_IWNET_RESET_PASSWORD_CONFIRM
LANG_ENGLISH        "Select OK to reset your password.  Your new password will be sent to the current email address associated with the account."

REFERENCE           MENU_IWNET_RP_SUCCESS
LANG_ENGLISH        "Your password has been reset.  Please check the email address associated with your account for an email containing your new password."

REFERENCE           MENU_IWNET_RP_NOUSER
LANG_ENGLISH        "No account name was specified."

REFERENCE           MENU_IWNET_RP_BADKEY
LANG_ENGLISH        "The CD Key provided was not valid."

REFERENCE           MENU_IWNET_RP_WRONGKEY
LANG_ENGLISH        "The CD Key provided was not the one originally used to create this account."

REFERENCE           MENU_IWNET_RP_TOOSOON
LANG_ENGLISH        "This account has already had its password reset recently.  Please wait a few minutes and try again."

REFERENCE           MENU_IWNET_UNKNOWN
LANG_ENGLISH        "The requested action failed for an unknown reason.  Please wait a few minutes and try again."

REFERENCE           MENU_IWNET_CP_SUCCESS
LANG_ENGLISH        "Your password has been changed."

REFERENCE           MENU_IWNET_NOTLOGGEDIN
LANG_ENGLISH        "You are not currently signed into your Modern Warfare 2 account.  Please sign in and try again."

REFERENCE           MENU_IWNET_CE_SUCCESS
LANG_ENGLISH        "Your email address has been changed."

REFERENCE           MENU_IWNET_CE_BADEMAIL
LANG_ENGLISH        "Please provide a valid email address."

REFERENCE           MENU_RESUMEGAME_CAPS
LANG_ENGLISH        "RESUME GAME"

REFERENCE           MENU_NEWGAME_CAPS
LANG_ENGLISH        "NEW GAME"

REFERENCE           MENU_MISSION_SELECT_CAPS
LANG_ENGLISH        "MISSION SELECT"

REFERENCE           MENU_SPECIAL_OPS_CAPS
LANG_ENGLISH        "SPECIAL OPS"

REFERENCE           MENU_MULTIPLAYER_CAPS
LANG_ENGLISH        "MULTIPLAYER"

REFERENCE           MENU_AIM_ASSIST_CAPS
LANG_ENGLISH        "AIM ASSIST"

REFERENCE           MENU_SUBTITLES_CAPS
LANG_ENGLISH        "SUBTITLES"

REFERENCE           MENU_RECRUIT_CAPS
LANG_ENGLISH        "RECRUIT"

REFERENCE           MENU_HARDENED_CAPS
LANG_ENGLISH        "HARDENED"

REFERENCE           MENU_REGULAR_CAPS
LANG_ENGLISH        "REGULAR"

REFERENCE           MENU_VETERAN_CAPS
LANG_ENGLISH        "VETERAN"

REFERENCE           MENU_YES_CAPS
LANG_ENGLISH        "YES"

REFERENCE           MENU_NO_CAPS
LANG_ENGLISH        "NO"

REFERENCE           MENU_TRY_AGAIN_CAPS
LANG_ENGLISH        "TRY AGAIN"

REFERENCE           MENU_SELECT_DIFFICULTY_PERSONAL
LANG_ENGLISH        "Difficulty"

REFERENCE           MENU_DESC_SET_DIFFICULTY_PLAYER
LANG_ENGLISH        "Set this player's difficulty."

REFERENCE           MENU_GTNW_DESC
LANG_ENGLISH        "Global Thermonuclear War"

REFERENCE           MENU_GAME_SELECTION_CAPS
LANG_ENGLISH        "GAME SELECTION"

REFERENCE           MENU_POPUP_PLAYLISTS
LANG_ENGLISH        "Fetching Playlists"

REFERENCE           MENU_POPUP_STATS
LANG_ENGLISH        "Updating Rank and Unlocks"

REFERENCE           MENU_POPUP_CONNECTION
LANG_ENGLISH        "Connecting to Matchmaking Server"

REFERENCE           MENU_POPUP_ACCEPTINVITE
LANG_ENGLISH        "Joining game session, attempt #&&1"

REFERENCE           MENU_POPUP_COMPLETE
LANG_ENGLISH        "Complete."

REFERENCE           MENU_USE_EQUIPMENT
LANG_ENGLISH        "Use Equipment"

REFERENCE           MENU_NOMAD
LANG_ENGLISH        "N0M4D"

REFERENCE           MENU_NOMAD_ALT
LANG_ENGLISH        "N0M4D Flipped"

REFERENCE           MENU_MORE
LANG_ENGLISH        "More..."

REFERENCE           MENU_SAB_DANGER
LANG_ENGLISH        "Losing Ground"

REFERENCE           MENU_SAB_NEUTRAL
LANG_ENGLISH        "Neutral"

REFERENCE           MENU_SAB_SAFE
LANG_ENGLISH        "Gaining Ground"

REFERENCE           MENU_CONTESTED
LANG_ENGLISH        "contested"

REFERENCE           MENU_DESC_CAS_WELCOME
LANG_ENGLISH        "Choose your 3 killstreaks!"

REFERENCE           MENU_NO_SIGNIN_WARNING_MP
LANG_ENGLISH        "Guests do not save progress.  Sign in to retain your stats!"

REFERENCE           MENU_RETURN_SIGNIN_MP
LANG_ENGLISH        "Return to Sign In Menu"

REFERENCE           MENU_PLEASE_WAIT
LANG_ENGLISH        "Please Wait"

REFERENCE           MENU_ONLINE_STATUS
LANG_ENGLISH        "Online Status"

REFERENCE           MENU_DOWNLOADING
LANG_ENGLISH        "DOWNLOADING..."

REFERENCE           MENU_UPLOADING_STATS
LANG_ENGLISH        "Uploading Stats"

REFERENCE           MENU_UNABLE_TO_APPLY
LANG_ENGLISH        "Unable to apply settings while connected to a server."

REFERENCE           MENU_QUIT_CAPS
LANG_ENGLISH        "QUIT"

REFERENCE           MENU_MOVEMENT
LANG_ENGLISH        "Movement"

REFERENCE           MENU_ACTIONS
LANG_ENGLISH        "Actions"

REFERENCE           MENU_RESTORE_DEFAULT_CONTROLS
LANG_ENGLISH        "Reset Controls"

REFERENCE           MENU_BRIGHTNESS_HINT_PC
LANG_ENGLISH        "Brightness adjustment has no effect when playing in a window."

REFERENCE           MENU_HOLD_AIM_DOWN_SIGHT
LANG_ENGLISH        "Hold Aim Down the Sight"

REFERENCE           MENU_FRAG_EQUIPMENT
LANG_ENGLISH        "Throw Frag/Use Equipment"

REFERENCE           MENU_INVENTORY_KILLSTREAK
LANG_ENGLISH        "Inventory/Killstreak Reward"

REFERENCE           MENU_SECONDARY_INVENTORY
LANG_ENGLISH        "Secondary Inventory"

REFERENCE           MENU_NVG_WATCH
LANG_ENGLISH        "Night Vision/Stopwatch"

REFERENCE           MENU_HOLD_MOUSE_LOOK
LANG_ENGLISH        "Hold Mouse Look"

REFERENCE           MENU_TEXT_CHAT
LANG_ENGLISH        "Text Chat"

REFERENCE           MENU_TEXT_TEAM_CHAT
LANG_ENGLISH        "Text Team Chat"

REFERENCE           MENU_OPTIONAL
LANG_ENGLISH        "Optional"

REFERENCE           MENU_ADVANCED_VIDEO
LANG_ENGLISH        "Advanced Video"

REFERENCE           MENU_VIDEO
LANG_ENGLISH        "Video"

REFERENCE           MENU_AUDIO
LANG_ENGLISH        "Audio"

REFERENCE           MENU_MUTE_ALL
LANG_ENGLISH        "Mute All"

REFERENCE           MENU_SP_ACT_I_CAPS
LANG_ENGLISH        "ACT I"

REFERENCE           MENU_SP_ACT_II_CAPS
LANG_ENGLISH        "ACT II"

REFERENCE           MENU_SP_ACT_III_CAPS
LANG_ENGLISH        "ACT III"

REFERENCE           MENU_SP_MUSEUM_CAPS
LANG_ENGLISH        "MUSEUM"

REFERENCE           MENU_SP_SP_TRAINER
LANG_ENGLISH        "S.S.D.D."

REFERENCE           MENU_SP_SP_TRAINER_DESC
LANG_ENGLISH        "Demonstrate proper fire control for the local trainees."

REFERENCE           MENU_SP_SP_INVASION_DESC
LANG_ENGLISH        "Locate and protect codename Raptor during the beginning of the invasion."

REFERENCE           MENU_SP_SP_FAVELA_ESCAPE
LANG_ENGLISH        "The Hornet's Nest"

REFERENCE           MENU_SP_SP_FAVELA_ESCAPE_DESC
LANG_ENGLISH        "Escape the favela."

REFERENCE           MENU_SP_SP_ARCADIA
LANG_ENGLISH        "Exodus"

REFERENCE           MENU_SP_SP_ARCADIA_DESC
LANG_ENGLISH        "Assist in the evacuation of civilians and key personnel in the suburbs."

REFERENCE           MENU_SP_SP_OILRIG
LANG_ENGLISH        "The Only Easy Day... Was Yesterday"

REFERENCE           MENU_SP_SP_OILRIG_DESC
LANG_ENGLISH        "Board the oilrig, rescue the hostages, and clear the route to the gulag."

REFERENCE           MENU_SP_SP_DCEMP_DESC
LANG_ENGLISH        "Get to Whiskey Hotel."

REFERENCE           MENU_SP_SP_DC_WHITEHOUSE_DESC
LANG_ENGLISH        "Retake Whiskey Hotel."

REFERENCE           MENU_SP_SP_ROADKILL
LANG_ENGLISH        "Team Player"

REFERENCE           MENU_SP_SP_ROADKILL_DESC
LANG_ENGLISH        "Search and destroy enemy forces in Afghanistan."

REFERENCE           MENU_SP_SP_CLIFFHANGER
LANG_ENGLISH        "Cliffhanger"

REFERENCE           MENU_SP_SP_CLIFFHANGER_DESC
LANG_ENGLISH        "Locate and retrieve the ACS module from a crashed satellite."

REFERENCE           MENU_SP_SP_AIRPORT
LANG_ENGLISH        "No Russian"

REFERENCE           MENU_SP_SP_AIRPORT_DESC
LANG_ENGLISH        "Earn Makarov's trust."

REFERENCE           MENU_SP_SP_FAVELA_DESC
LANG_ENGLISH        "Find and capture arms-dealer Alejandro Rojas, hiding somewhere in the favela."

REFERENCE           MENU_SP_SP_FAVELA
LANG_ENGLISH        "Takedown"

REFERENCE           MENU_SP_SP_INVASION
LANG_ENGLISH        "Wolverines!"

REFERENCE           MENU_SP_SP_GULAG
LANG_ENGLISH        "The Gulag"

REFERENCE           MENU_SP_SP_GULAG_DESC
LANG_ENGLISH        "Rescue Prisoner #627."

REFERENCE           MENU_SP_SP_DCBURNING
LANG_ENGLISH        "Of Their Own Accord"

REFERENCE           MENU_SP_SP_DCBURNING_DESC
LANG_ENGLISH        "Protect the evacuation site at the Washington Monument."

REFERENCE           MENU_SP_SP_CONTINGENCY
LANG_ENGLISH        "Contingency"

REFERENCE           MENU_SP_SP_CONTINGENCY_DESC
LANG_ENGLISH        "Help Captain Price reach the Russian submarine."

REFERENCE           MENU_SP_SP_DCEMP
LANG_ENGLISH        "Second Sun"

REFERENCE           MENU_SP_SP_DC_WHITEHOUSE
LANG_ENGLISH        "Whiskey Hotel"

REFERENCE           MENU_SP_SP_ESTATE_DESC
LANG_ENGLISH        "Find and kill Makarov at his safe house on the Georgian-Russian border."

REFERENCE           MENU_SP_SP_ESTATE
LANG_ENGLISH        "Loose Ends"

REFERENCE           MENU_SP_SP_BONEYARD
LANG_ENGLISH        "The Enemy of My Enemy"

REFERENCE           MENU_SP_SP_BONEYARD_DESC
LANG_ENGLISH        "Escape from General Shepherd's trap in the boneyard."

REFERENCE           MENU_SP_SP_AF_CHASE
LANG_ENGLISH        "Endgame"

REFERENCE           MENU_SP_SP_AF_CHASE_DESC
LANG_ENGLISH        "Kill General Shepherd."

REFERENCE           MENU_SP_SP_AF_CAVES_DESC
LANG_ENGLISH        "Search the Afghan cave network for General Shepherd."

REFERENCE           MENU_SP_SP_AF_CAVES
LANG_ENGLISH        "Just Like Old Times"

REFERENCE           MENU_SP_PROFILE_WARNING
LANG_ENGLISH        "You are not signed in to a profile. \\nDo you wish to sign in?"

REFERENCE           MENU_SP_PROFILE_WARNING_SP
LANG_ENGLISH        "You are not signed in to a profile. \\nYou will not be able to save your progress. \\nDo you wish to sign in?"

REFERENCE           MENU_SP_TWO_PLAYER_SPLIT_SCREEN
LANG_ENGLISH        "Two Player Split Screen"

REFERENCE           MENU_SP_TWO_PLAYER_SPLIT_SCREEN_CAPS
LANG_ENGLISH        "TWO PLAYER SPLIT SCREEN"

REFERENCE           MENU_SP_TWO_PLAYER_ONLINE
LANG_ENGLISH        "Two Player Online"

REFERENCE           MENU_SP_TWO_PLAYER_ONLINE_CAPS
LANG_ENGLISH        "TWO PLAYER ONLINE"

REFERENCE           MENU_SP_WAITING_FOR_HOST
LANG_ENGLISH        "Waiting for host to start..."

REFERENCE           MENU_SP_NEED_ONE_MORE_PLAYER
LANG_ENGLISH        "Need one more player..."

REFERENCE           MENU_SP_SELECT_YOUR_DIFF
LANG_ENGLISH        "Select your difficulty."

REFERENCE           MENU_SP_TYPE_ASSAULT
LANG_ENGLISH        "Assault"

REFERENCE           MENU_SP_TYPE_KILLSPREE
LANG_ENGLISH        "Elimination"

REFERENCE           MENU_SP_TYPE_ESCORT
LANG_ENGLISH        "Escort"

REFERENCE           MENU_SP_TYPE_WAVE_DEFENSE
LANG_ENGLISH        "Wave Defense"

REFERENCE           MENU_SP_TYPE_TIME_ASSAULT
LANG_ENGLISH        "Timed Assault"

REFERENCE           MENU_SP_TYPE_STEALTH
LANG_ENGLISH        "Stealth"

REFERENCE           MENU_SP_TYPE_ASSAULT_DEFEND
LANG_ENGLISH        "Assault & Defend"

REFERENCE           MENU_SP_TYPE_VEHICLE_KILLSPREE
LANG_ENGLISH        "Vehicle Killspree"

REFERENCE           MENU_SP_TYPE_DRIVING
LANG_ENGLISH        "Driving"

REFERENCE           MENU_SP_TYPE_TIMED_ESCORT
LANG_ENGLISH        "Timed Escort"

REFERENCE           MENU_SP_NOTE_SLOW_MO_BREACH
LANG_ENGLISH        "Slow-mo Breach"

REFERENCE           MENU_SP_NOTE_TWO_PLAYERS_REQUIRED
LANG_ENGLISH        "Two Players Required"

REFERENCE           MENU_SP_NOTE_CIVILIAN
LANG_ENGLISH        "Civilians"

REFERENCE           MENU_SP_NOTE_EXPLOSIVES_KNIVES_ONLY
LANG_ENGLISH        "Explosives & Knives Only"

REFERENCE           MENU_SP_COMPLETION
LANG_ENGLISH        "completion"

REFERENCE           MENU_SP_OPPOSITION_FORCE
LANG_ENGLISH        "Est. Opposition:"

REFERENCE           MENU_SP_LEVEL_TYPE
LANG_ENGLISH        "Classification: "

REFERENCE           MENU_SP_LEVEL_AVG_TIME
LANG_ENGLISH        "Est. Completion Time: "

REFERENCE           MENU_SP_LEVEL_YOUR_BEST_TIME
LANG_ENGLISH        "Your Best Time: "

REFERENCE           MENU_SP_TYPE_TIMED_DRIVING
LANG_ENGLISH        "Timed Driving"

REFERENCE           MENU_SP_SPECIAL_OPS_CAPS
LANG_ENGLISH        "SPECIAL OPS"

REFERENCE           MENU_SP_DESC_SINGLEPLAYER
LANG_ENGLISH        "Pick up the story where Modern Warfare\uFFFD ended and continue the single player experience."

REFERENCE           MENU_SP_DESC_MULTIPLAYER
LANG_ENGLISH        "Rank up, unlock new weapons, perks, killstreaks, and much more online and locally."

REFERENCE           MENU_SP_DESC_SPECIALOPS
LANG_ENGLISH        "Collect all 69 stars alone or with a friend in a variety of custom challenging missions."

REFERENCE           MENU_SP_STORY_CAPS
LANG_ENGLISH        "STORY"

REFERENCE           MENU_SP_SOLO_PLAY_CAPS
LANG_ENGLISH        "SOLO PLAY"

REFERENCE           MENU_SP_TOTAL_PROGRESS
LANG_ENGLISH        "TOTAL PROGRESS: "

REFERENCE           MENU_SP_DIFF_RANKING_0
LANG_ENGLISH        "None"

REFERENCE           MENU_SP_DIFF_RANKING_1
LANG_ENGLISH        "Minimal"

REFERENCE           MENU_SP_DIFF_RANKING_2
LANG_ENGLISH        "Light"

REFERENCE           MENU_SP_DIFF_RANKING_3
LANG_ENGLISH        "Medium"

REFERENCE           MENU_SP_DIFF_RANKING_4
LANG_ENGLISH        "Heavy"

REFERENCE           MENU_SP_DIFF_RANKING_5
LANG_ENGLISH        "Massive"

REFERENCE           MENU_SP_LEAVELOBBY
LANG_ENGLISH        "Leave Lobby?"

REFERENCE           MENU_SP_ARE_YOU_ABSOLUTELY_SURE
LANG_ENGLISH        "Are you absolutely sure?"

REFERENCE           MENU_SP_VETERAN_IS_EXTREMELY_DIFFICULT
LANG_ENGLISH        "Veteran is extremely difficult, are you certain you want to play at Veteran Difficulty?"

REFERENCE           MENU_SP_IW_BEST_TIME
LANG_ENGLISH        "IW Best Time: "

REFERENCE           MENU_SP_SELECT_SAVE_DEVICE_CAPS
LANG_ENGLISH        "SELECT SAVE DEVICE"

REFERENCE           MENU_SP_MARGIN_HORIZONTAL_DESC
LANG_ENGLISH        "Move the slider to adjust the horizontal margin."

REFERENCE           MENU_SP_MARGIN_VERTICAL_DESC
LANG_ENGLISH        "Move the slider to adjust the vertical margin."

REFERENCE           MENU_SP_STARS_EARNED
LANG_ENGLISH        "Stars Earned!"

REFERENCE           MENU_SP_NEW_BESTTIME
LANG_ENGLISH        "New Best Time!"

REFERENCE           MENU_SP_NEXT_UNLOCK
LANG_ENGLISH        "NEXT UNLOCK: "

REFERENCE           MENU_SP_TIME_PLAYED
LANG_ENGLISH        "TIME PLAYED"

REFERENCE           MENU_SP_PERCENTAGE_COMPLETED
LANG_ENGLISH        "PERCENTAGE COMPLETED"

REFERENCE           MENU_SP_NA_FOR_THIS_OP
LANG_ENGLISH        "Not available for this Operation."

REFERENCE           MENU_SP_START_OP
LANG_ENGLISH        "Start Op"

REFERENCE           MENU_SP_START_OP_DESC
LANG_ENGLISH        "Start the Operation."

REFERENCE           MENU_SP_CHANGE_OP
LANG_ENGLISH        "Change Op"

REFERENCE           MENU_SP_CHANGE_OP_DESC
LANG_ENGLISH        "Choose a different Operation."

REFERENCE           MENU_SP_FRIEND_LOCK_GROUP_DESC
LANG_ENGLISH        "Partner has not unlocked this group."

REFERENCE           MENU_SP_FRIEND_LOCK_OP_DESC
LANG_ENGLISH        "Partner has not unlocked this Op and will not earn any Stars for completing it."

REFERENCE           MENU_SP_YOU_LOCK_OP_DESC
LANG_ENGLISH        "You have not unlocked this Op and will not earn any Stars for completing it."

REFERENCE           MENU_SP_DIFFERENT_DIFF
LANG_ENGLISH        "Different difficulties selected."

REFERENCE           MENU_SP_MAX_REWARD
LANG_ENGLISH        "Max reward: "

REFERENCE           MENU_SP_FRIEND_UNLOCK_GROUP_HAS
LANG_ENGLISH        "Has: &&1"

REFERENCE           MENU_SP_FRIEND_UNLOCK_GROUP_REQ
LANG_ENGLISH        "Requires: &&1"

REFERENCE           MENU_SP_RECOMMENDATION
LANG_ENGLISH        "We strongly recommend you play Campaign first."

REFERENCE           MENU_SP_PLAY_STORY
LANG_ENGLISH        "Play Story"

REFERENCE           MENU_SP_CONTINUE_TO_SPECIAL_OPS
LANG_ENGLISH        "Continue to Special Ops"

REFERENCE           MENU_SP_CONTINUE_TO_MULTIPLAYER
LANG_ENGLISH        "Continue to Multiplayer"

REFERENCE           MENU_SP_FOR_THE_RECORD
LANG_ENGLISH        "\\"For the Record\\""

REFERENCE           MENU_SP_CHOOSE_A_DIFFERENT_OP
LANG_ENGLISH        "Choose a different Op"

REFERENCE           MENU_SP_NO_STARS_FOR_LOCKED_OP
LANG_ENGLISH        "No Stars rewarded since you don't have this Op unlocked."

REFERENCE           MENU_SP_NOT_SIGNED_IN
LANG_ENGLISH        "Not signed in"

REFERENCE           MENU_SP_LAST_CHECKPOINT_CONFIRMATION
LANG_ENGLISH        "Return to the last checkpoint?"

REFERENCE           MENU_SP_STAT_GAME_PROGRESSION
LANG_ENGLISH        "Game Progression:"

REFERENCE           MENU_SP_STAT_HARDENED_PROGRESS
LANG_ENGLISH        "Hardened Progress:"

REFERENCE           MENU_SP_STAT_VETERAN_PROGRESS
LANG_ENGLISH        "Veteran Progress:"

REFERENCE           MENU_SP_STAT_INTEL_ITEMS
LANG_ENGLISH        "Intel Items:"

REFERENCE           MENU_SP_STAT_TOTAL
LANG_ENGLISH        "Total:"

REFERENCE           MENU_SP_STAT_PLAY_TIME
LANG_ENGLISH        "Play Time:"

REFERENCE           MENU_SP_STAT_SP_PLAY_TIME
LANG_ENGLISH        "Campaign Play Time:"

REFERENCE           MENU_SP_STAT_MP_PLAY_TIME
LANG_ENGLISH        "Multiplayer Play Time:"

REFERENCE           MENU_SP_STAT_TOTAL_PLAY_TIME
LANG_ENGLISH        "Total Play Time:"

REFERENCE           MENU_SP_STAT_SO_PLAY_TIME
LANG_ENGLISH        "Special Ops Play Time:"

REFERENCE           MENU_SP_STAT_TIME_FORMAT
LANG_ENGLISH        "D      H        M       S"

REFERENCE           MENU_SP_STAT_SO_PROGRESSION
LANG_ENGLISH        "Special Ops Progress:"

REFERENCE           MENU_SP_STAT_SP_PROGRESSION
LANG_ENGLISH        "Campaign Progress:"

REFERENCE           MENU_SP_STAT_MP_PROGRESSION
LANG_ENGLISH        "Multiplayer Progress:"

REFERENCE           MENU_SP_STAT_SP_EASY_REGULAR_PROGRESSION
LANG_ENGLISH        "Recruit & Regular Progress:"

REFERENCE           MENU_SP_STAT_STARS_EARNED
LANG_ENGLISH        "Stars Earned:"

REFERENCE           MENU_SP_STAT_TOTAL_STARS
LANG_ENGLISH        "Total Stars:"

REFERENCE           MENU_SP_STAT_NUM_DOT_PERCENT
LANG_ENGLISH        "&&1.&&2%"

REFERENCE           MENU_SP_STAT_NUM_PERCENT
LANG_ENGLISH        "&&1%"

REFERENCE           MENU_SP_STAT_NUM_RATIO
LANG_ENGLISH        "&&1/&&2"

REFERENCE           MENU_SP_COMPLETION_PERCENT
LANG_ENGLISH        "completion &&1%"

REFERENCE           MENU_SP_COMPLETION_DOT_PERCENT
LANG_ENGLISH        "completion &&1.&&2%"

REFERENCE           MENU_SP_CAMPAIGN_INCOMPLETE
LANG_ENGLISH        "Campaign not complete"

REFERENCE           MENU_SP_CLASSIFIED
LANG_ENGLISH        "Classified"

REFERENCE           MENU_SP_ONLY_HOST_CAN_CHOOSE
LANG_ENGLISH        "Only host can change the Op."

REFERENCE           MENU_SP_VIEW_OP
LANG_ENGLISH        "Browse Ops"

REFERENCE           MENU_SP_VIEW_OP_DESC
LANG_ENGLISH        "View unlocked Ops."

REFERENCE           MENU_SP_CURRENT_LEVEL_INTELS
LANG_ENGLISH        "&&1/&&2 Intel Items found"

REFERENCE           MENU_SP_CURRENT_LEVEL_INTEL_TITLE
LANG_ENGLISH        "enemy intelligence"

REFERENCE           MENU_SP_FIRST_DIFFICULTY_STAR
LANG_ENGLISH        "Complete this Op on Hardened or Veteran difficulty to earn additional stars."

REFERENCE           MENU_SP_SKIP_MISSION
LANG_ENGLISH        "Skip Mission"

REFERENCE           MENU_SP_OFFENSIVE_SKIP_1
LANG_ENGLISH        "The following mission may be disturbing or offensive to some players. You may skip this mission at anytime in the pause menu."

REFERENCE           MENU_SP_OFFENSIVE_SKIP_NOW
LANG_ENGLISH        "Skip this mission now"

REFERENCE           MENU_SP_OFFENSIVE_TITLE
LANG_ENGLISH        "Disturbing Content Notice"

REFERENCE           MENU_SP_OFFENSIVE_ARE_YOU_SURE
LANG_ENGLISH        "Are you sure you want to skip this mission?"

REFERENCE           MENU_SP_OFFENSIVE_SKIP_2
LANG_ENGLISH        "Some players may find one of the missions disturbing or offensive. Would you like to have the option to skip this mission?"

REFERENCE           MENU_SP_OFFENSIVE_SKIP_YES_ASK_LATER
LANG_ENGLISH        "Yes, ask me later"

REFERENCE           MENU_SP_OFFENSIVE_SKIP_NO_WONT_GET_OFFENDED
LANG_ENGLISH        "No, I will not be offended"

REFERENCE           MENU_SP_OFFENSIVE_SKIP_3
LANG_ENGLISH        "If you answer yes you will never be asked about skipping levels again."

REFERENCE           MENU_SP_OFFENSIVE_SKIP_4
LANG_ENGLISH        "(The skip level option will be available in the pause menu.)"

REFERENCE           MENU_SP_OFFENSIVE_SKIP_YES_NEVER_ASK
LANG_ENGLISH        "Yes, never ask me again"

REFERENCE           MENU_SP_CREDITS_CAPS
LANG_ENGLISH        "CREDITS"

REFERENCE           MENU_SP_IW_INTEL
LANG_ENGLISH        "Infinity Ward Intel"

REFERENCE           MENU_SP_69STAR_GRATZ
LANG_ENGLISH        "Congratulations! \\nYou've completed Special Ops."

REFERENCE           MENU_SP_CAMPAIGN
LANG_ENGLISH        "CAMPAIGN"

REFERENCE           MENU_SP_SHOW_TIMER
LANG_ENGLISH        "Show Timer"

REFERENCE           MENU_SP_TIMER_NIGHT_VISION
LANG_ENGLISH        "Timer/Night Vision"

REFERENCE           MENU_SP_INVITE_FRIEND_PC_CPU
LANG_ENGLISH        "The player with the fastest CPU should invite."

REFERENCE           MENU_SP_STEAM_CHAT_HINT
LANG_ENGLISH        "Double click your friend's name in Steam to voice chat."

REFERENCE           NULL_EMPTY
LANG_ENGLISH        ""

REFERENCE           XBOXLIVE_SERVICENAME
LANG_ENGLISH        "IWNet"

REFERENCE           XBOXLIVE_CLANSETTINGS
LANG_ENGLISH        "Clan Settings"

REFERENCE           XBOXLIVE_FRIENDSLIST
LANG_ENGLISH        " friends"

REFERENCE           XBOXLIVE_SIGNIN
LANG_ENGLISH        "Sign In to IWNet"

REFERENCE           XBOXLIVE_SIGNOUT
LANG_ENGLISH        "Sign Out of IWNet"

REFERENCE           XBOXLIVE_LOGGEDOFF
LANG_ENGLISH        "You were logged out of IWNet"

REFERENCE           XBOXLIVE_RESTRICTEDCLAN
LANG_ENGLISH        "This server only allows players from certain clans to play here."

REFERENCE           XBOXLIVE_VIEWCLANINFO
LANG_ENGLISH        "Clan Info"

REFERENCE           XBOXLIVE_EDITCLANINFO
LANG_ENGLISH        "Edit Clan Info"

REFERENCE           XBOXLIVE_ENDOFMATCH
LANG_ENGLISH        "End of match"

REFERENCE           XBOXLIVE_MUSTLOGIN
LANG_ENGLISH        "You must sign in before you can play Modern Warfare 2"

REFERENCE           XBOXLIVE_INVALIDPERMISSIONS
LANG_ENGLISH        "The user &&1 does not have proper permissions for that operation"

REFERENCE           XBOXLIVE_SIGNEDOUTOFLIVE
LANG_ENGLISH        "You must be signed in to IWNet to play online matches."

REFERENCE           XBOXLIVE_LOBBYGAMERCARD
LANG_ENGLISH        " View Player's Gamer Card"

REFERENCE           XBOXLIVE_VIEW_GAMER_CARD
LANG_ENGLISH        " view gamer"

REFERENCE           XBOXLIVE_MPNOTALLOWED
LANG_ENGLISH        "The current profile is not allowed to play on IWNet."

REFERENCE           XBOXLIVE_CANTJOINSESSION
LANG_ENGLISH        "Unable to join game session"

REFERENCE           XBOXLIVE_PARTYENDED
LANG_ENGLISH        "The party is no longer active"

REFERENCE           XBOXLIVE_SIGN_IN_TO_SAVE
LANG_ENGLISH        "Sign in to save your progress."

REFERENCE           XBOXLIVE_PLAYER0
LANG_ENGLISH        "Guest 1"

REFERENCE           XBOXLIVE_PLAYER1
LANG_ENGLISH        "Guest 2"

REFERENCE           XBOXLIVE_PLAYER2
LANG_ENGLISH        "Guest 3"

REFERENCE           XBOXLIVE_PLAYER3
LANG_ENGLISH        "Guest 4"

REFERENCE           XBOXLIVE_SPLITSCREEN_SIGN_IN
LANG_ENGLISH        "Splitscreen Sign In"

REFERENCE           XBOXLIVE_NOTSIGNEDIN
LANG_ENGLISH        "Not signed in to a profile"

REFERENCE           XBOXLIVE_SIGNEDINAS
LANG_ENGLISH        "Signed in as: &&1"

REFERENCE           XBOXLIVE_FINDGAMELOBBY
LANG_ENGLISH        " Find Game Lobby"

REFERENCE           XBOXLIVE_FINDGAME
LANG_ENGLISH        " find game"

REFERENCE           XBOXLIVE_PLAYLISTISOLD
LANG_ENGLISH        "Your playlist data is older than the host's.  You must restart the game or reconnect to Xbox LIVE in order to get the new playlist data."

REFERENCE           XBOXLIVE_PLAYLISTISNEW
LANG_ENGLISH        "Your playlist data is newer than the host's.  You will be unable to play with them until they restart to get the new playlists."

REFERENCE           XBOXLIVE_LOBBYENDED
LANG_ENGLISH        "Game lobby closed"

REFERENCE           XBOXLIVE_LEAVELOBBY
LANG_ENGLISH        "Leave Lobby?"

REFERENCE           XBOXLIVE_LEAVEPARTY
LANG_ENGLISH        "Leave party?"

REFERENCE           XBOXLIVE_LEAVEPARTYANDLOBBY
LANG_ENGLISH        "Leave lobby and party?"

REFERENCE           XBOXLIVE_SIGNEDOUT
LANG_ENGLISH        "Your profile was signed out"

REFERENCE           XBOXLIVE_HOSTKICKPLAYER
LANG_ENGLISH        " Kick Player"

REFERENCE           XBOXLIVE_KICKPLAYER
LANG_ENGLISH        "Kick &&1?"

REFERENCE           XBOXLIVE_LEAVEPARTYBUTTON
LANG_ENGLISH        " Leave Party"

REFERENCE           XBOXLIVE_DESTROYPARTY
LANG_ENGLISH        "End Party?"

REFERENCE           XBOXLIVE_PARTYDETAILS
LANG_ENGLISH        " party details"

REFERENCE           XBOXLIVE_FRIENDSLISTONX
LANG_ENGLISH        " friends"

REFERENCE           XBOXLIVE_INVITE
LANG_ENGLISH        " invite friends"

REFERENCE           XBOXLIVE_KICKPLAYERINLIST
LANG_ENGLISH        " KICK PLAYER"

REFERENCE           XBOXLIVE_SELECTBUTTON
LANG_ENGLISH        "Click me!"

REFERENCE           XBOXLIVE_VIEW_PROFILE
LANG_ENGLISH        "View Gamer Card"

REFERENCE           XBOXLIVE_KICK
LANG_ENGLISH        "Kick"

REFERENCE           XBOXLIVE_PLAYER_MUTE
LANG_ENGLISH        "Toggle Mute"

REFERENCE           XBOXLIVE_LEADERBOARDS
LANG_ENGLISH        "Leaderboards"

REFERENCE           XBOXLIVE_PLAYLISTUSERCOUNT
LANG_ENGLISH        "&&1/&&2 Total Players in Playlists"

REFERENCE           XBOXLIVE_TOTALUSERCOUNT
LANG_ENGLISH        "&&1 Total Players Online"

REFERENCE           XBOXLIVE_SIGNINCHANGED
LANG_ENGLISH        "Your sign in status has changed, returning to the main menu"

REFERENCE           XBOXLIVE_INVITE_ONLY
LANG_ENGLISH        "Lobby is by Invitation Only"

REFERENCE           XBOXLIVE_NOTSIGNEDINLIVE
LANG_ENGLISH        "Not signed in to an IWNet profile"

REFERENCE           XBOXLIVE_LOCAL_SERVER
LANG_ENGLISH        "Local Server"

REFERENCE           XBOXLIVE_AWAY
LANG_ENGLISH        "Away"

REFERENCE           XBOXLIVE_BUSY
LANG_ENGLISH        "Busy"

REFERENCE           XBOXLIVE_ONLINE
LANG_ENGLISH        "Online"

REFERENCE           XBOXLIVE_LIVEERROR
LANG_ENGLISH        "Communication with the IWNet servers has been interrupted."

REFERENCE           XBOXLIVE_SAVE_FAIL
LANG_ENGLISH        "Failed to complete save device access for online update."

REFERENCE           XBOXLIVE_DOWNLOAD_FAIL
LANG_ENGLISH        "Failed to complete download for online update."

REFERENCE           XBOXLIVE_EXTERNALMUTE_TITLE
LANG_ENGLISH        "Can't toggle mute"

REFERENCE           XBOXLIVE_EXTERNALMUTE
LANG_ENGLISH        "Player is muted externally."

REFERENCE           XBOXLIVE_SERVICENAME
LANG_ENGLISH        "IWNet"

REFERENCE           XBOXLIVE_CLANSETTINGS
LANG_ENGLISH        "Clan Settings"

REFERENCE           XBOXLIVE_FRIENDSLIST
LANG_ENGLISH        " friends"

REFERENCE           XBOXLIVE_SIGNIN
LANG_ENGLISH        "Sign In to IWNet"

REFERENCE           XBOXLIVE_SIGNOUT
LANG_ENGLISH        "Sign Out of IWNet"

REFERENCE           XBOXLIVE_LOGGEDOFF
LANG_ENGLISH        "You were logged out of IWNet"

REFERENCE           XBOXLIVE_RESTRICTEDCLAN
LANG_ENGLISH        "This server only allows players from certain clans to play here."

REFERENCE           XBOXLIVE_VIEWCLANINFO
LANG_ENGLISH        "Clan Info"

REFERENCE           XBOXLIVE_EDITCLANINFO
LANG_ENGLISH        "Edit Clan Info"

REFERENCE           XBOXLIVE_ENDOFMATCH
LANG_ENGLISH        "End of match"

REFERENCE           XBOXLIVE_MUSTLOGIN
LANG_ENGLISH        "You must sign in before you can play Modern Warfare 2"

REFERENCE           XBOXLIVE_INVALIDPERMISSIONS
LANG_ENGLISH        "The user &&1 does not have proper permissions for that operation"

REFERENCE           XBOXLIVE_SIGNEDOUTOFLIVE
LANG_ENGLISH        "You must be signed in to IWNet to play online matches."

REFERENCE           XBOXLIVE_LOBBYGAMERCARD
LANG_ENGLISH        " View Player's Gamer Card"

REFERENCE           XBOXLIVE_VIEW_GAMER_CARD
LANG_ENGLISH        " view gamer"

REFERENCE           XBOXLIVE_MPNOTALLOWED
LANG_ENGLISH        "The current profile is not allowed to play on IWNet."

REFERENCE           XBOXLIVE_CANTJOINSESSION
LANG_ENGLISH        "Unable to join game session"

REFERENCE           XBOXLIVE_PARTYENDED
LANG_ENGLISH        "The party is no longer active"

REFERENCE           XBOXLIVE_SIGN_IN_TO_SAVE
LANG_ENGLISH        "Sign in to save your progress."

REFERENCE           XBOXLIVE_PLAYER0
LANG_ENGLISH        "Guest 1"

REFERENCE           XBOXLIVE_PLAYER1
LANG_ENGLISH        "Guest 2"

REFERENCE           XBOXLIVE_PLAYER2
LANG_ENGLISH        "Guest 3"

REFERENCE           XBOXLIVE_PLAYER3
LANG_ENGLISH        "Guest 4"

REFERENCE           XBOXLIVE_SPLITSCREEN_SIGN_IN
LANG_ENGLISH        "Splitscreen Sign In"

REFERENCE           XBOXLIVE_NOTSIGNEDIN
LANG_ENGLISH        "Not signed in to a profile"

REFERENCE           XBOXLIVE_SIGNEDINAS
LANG_ENGLISH        "Signed in as: &&1"

REFERENCE           XBOXLIVE_FINDGAMELOBBY
LANG_ENGLISH        " Find Game Lobby"

REFERENCE           XBOXLIVE_FINDGAME
LANG_ENGLISH        " find game"

REFERENCE           XBOXLIVE_PLAYLISTISOLD
LANG_ENGLISH        "Your playlist data is older than the host's.  You must restart the game or reconnect in order to get the new playlist data."

REFERENCE           XBOXLIVE_PLAYLISTISNEW
LANG_ENGLISH        "Your playlist data is newer than the host's.  You will be unable to play with them until they restart to get the new playlists."

REFERENCE           XBOXLIVE_LOBBYENDED
LANG_ENGLISH        "Game lobby closed"

REFERENCE           XBOXLIVE_LEAVELOBBY
LANG_ENGLISH        "Leave Lobby?"

REFERENCE           XBOXLIVE_LEAVEPARTY
LANG_ENGLISH        "Leave party?"

REFERENCE           XBOXLIVE_LEAVEPARTYANDLOBBY
LANG_ENGLISH        "Leave lobby and party?"

REFERENCE           XBOXLIVE_SIGNEDOUT
LANG_ENGLISH        "Your profile was signed out"

REFERENCE           XBOXLIVE_HOSTKICKPLAYER
LANG_ENGLISH        " Kick Player"

REFERENCE           XBOXLIVE_KICKPLAYER
LANG_ENGLISH        "Kick &&1?"

REFERENCE           XBOXLIVE_LEAVEPARTYBUTTON
LANG_ENGLISH        " Leave Party"

REFERENCE           XBOXLIVE_DESTROYPARTY
LANG_ENGLISH        "End Party?"

REFERENCE           XBOXLIVE_PARTYDETAILS
LANG_ENGLISH        " party details"

REFERENCE           XBOXLIVE_FRIENDSLISTONX
LANG_ENGLISH        " friends"

REFERENCE           XBOXLIVE_INVITE
LANG_ENGLISH        " invite friends"

REFERENCE           XBOXLIVE_KICKPLAYERINLIST
LANG_ENGLISH        " KICK PLAYER"

REFERENCE           XBOXLIVE_SELECTBUTTON
LANG_ENGLISH        "Click me!"

REFERENCE           XBOXLIVE_VIEW_PROFILE
LANG_ENGLISH        "View Gamer Card"

REFERENCE           XBOXLIVE_KICK
LANG_ENGLISH        "Kick"

REFERENCE           XBOXLIVE_PLAYER_MUTE
LANG_ENGLISH        "Toggle Mute"

REFERENCE           XBOXLIVE_LEADERBOARDS
LANG_ENGLISH        "Leaderboards"

REFERENCE           XBOXLIVE_PLAYLISTUSERCOUNT
LANG_ENGLISH        "&&1/&&2 Total Players in Playlists"

REFERENCE           XBOXLIVE_TOTALUSERCOUNT
LANG_ENGLISH        "&&1 Total Players Online"

REFERENCE           XBOXLIVE_SIGNINCHANGED
LANG_ENGLISH        "Your sign in status has changed, returning to the main menu"

REFERENCE           XBOXLIVE_INVITE_ONLY
LANG_ENGLISH        "Lobby is by Invitation Only"

REFERENCE           XBOXLIVE_NOTSIGNEDINLIVE
LANG_ENGLISH        "Not signed in to an IWNet profile"

REFERENCE           XBOXLIVE_LOCAL_SERVER
LANG_ENGLISH        "Local Server"

REFERENCE           XBOXLIVE_AWAY
LANG_ENGLISH        "Away"

REFERENCE           XBOXLIVE_BUSY
LANG_ENGLISH        "Busy"

REFERENCE           XBOXLIVE_ONLINE
LANG_ENGLISH        "Online"

REFERENCE           XBOXLIVE_LIVEERROR
LANG_ENGLISH        "Communication with the IWNet servers has been interrupted."

REFERENCE           XBOXLIVE_SAVE_FAIL
LANG_ENGLISH        "Failed to complete save device access for online update."

REFERENCE           XBOXLIVE_DOWNLOAD_FAIL
LANG_ENGLISH        "Failed to complete download for online update."

REFERENCE           XBOXLIVE_EXTERNALMUTE_TITLE
LANG_ENGLISH        "Can't toggle mute"

REFERENCE           XBOXLIVE_EXTERNALMUTE
LANG_ENGLISH        "Player is muted externally."

REFERENCE           PATCH_DESC_BARRACKS
LANG_ENGLISH        "Challenges, Accolades, and Options."

REFERENCE           PATCH_INVALIDPASSWORD
LANG_ENGLISH        "Invalid Password."

REFERENCE           PATCH_PRESTIGE_RESET_WARNING2
LANG_ENGLISH        "Prestige has a price: Everything you've unlocked including weapons, experience and challenges will be reset; you'll have to rank up again to reacquire them.\\n\\nOnly your titles, emblems and play lists will be unaffected."

REFERENCE           PATCH_PRESTIGE_RESET_WARNING1
LANG_ENGLISH        "Trade all of your accomplishments for a bit of prestige.  In addition to your new prestige rank icon, you'll gain access to some new titles, emblems and challenges.\\n\\nOther players will see your new prestige rank icon in the lobby, and game."

REFERENCE           PATCH_STRICTHINT
LANG_ENGLISH        "Go to ^2www.infinityward.com/nat^7 to OPEN your router's NAT.\\n"

REFERENCE           PATCH_STRICTHINT_COOP
LANG_ENGLISH        "Other players may have difficulties connecting to you - players you invited may not make it into your lobby. Go to ^2www.infinityward.com/nat^7 to OPEN your router's NAT."

REFERENCE           PATCH_SEARCHINGFORGAMES_NMS
LANG_ENGLISH        "Finding games: <&&1ms ping"

REFERENCE           PATCH_STORM
LANG_ENGLISH        "Storm"

REFERENCE           PATCH_DESC_MAP_STORM
LANG_ENGLISH        "Stormy warehouse district.  Intense team battles."

REFERENCE           PATCH_COMPACT
LANG_ENGLISH        "Salvage"

REFERENCE           PATCH_DESC_MAP_COMPACT
LANG_ENGLISH        "A snow-covered junkyard.  Lots of fast paced action."

REFERENCE           PATCH_COMPLEX
LANG_ENGLISH        "Bailout"

REFERENCE           PATCH_DESC_MAP_COMPLEX
LANG_ENGLISH        "Overrun apartment complex. Long sight lines with great flank routes."

REFERENCE           PATCH_CRASH
LANG_ENGLISH        "Crash"

REFERENCE           PATCH_DESC_MAP_CRASH
LANG_ENGLISH        "Downed Sea Knight in a desert town. Fantastic team games."

REFERENCE           PATCH_OVERGROWN
LANG_ENGLISH        "Overgrown"

REFERENCE           PATCH_DESC_MAP_OVERGROWN
LANG_ENGLISH        "Large overgrown rural Russian area. Sniper ghillie suits make for good cover."

REFERENCE           PATCH_VACANT
LANG_ENGLISH        "Vacant"

REFERENCE           PATCH_DESC_MAP_VACANT
LANG_ENGLISH        "Deserted Russian office. Intense interior fighting."

REFERENCE           PATCH_SETASHOST
LANG_ENGLISH        "Make Leader"

REFERENCE           PATCH_MAKEHOSTQUESTION
LANG_ENGLISH        "Make &&1 the new party leader?"

REFERENCE           PATCH_CHANGEHOSTTITLE
LANG_ENGLISH        "Change Party Leader"

REFERENCE           PATCH_YOUAREHOST
LANG_ENGLISH        "You are now the party leader."

REFERENCE           PATCH_DLC_MAPS
LANG_ENGLISH        "Bonus Maps"

REFERENCE           PATCH_INVITE_TO_PARTY
LANG_ENGLISH        "Invite to party"

REFERENCE           PATCH_INVITE_FRIEND_TO_PARTY
LANG_ENGLISH        "Invite friend to party"

REFERENCE           PATCH_PARTY_INVITE_TITLE
LANG_ENGLISH        "Party invitation"

REFERENCE           PATCH_PARTY_INVITE_QUESTION
LANG_ENGLISH        "&&1 invites you to join their party."

REFERENCE           PATCH_PARTY_INVITE_QUESTION_PARTY_HOST
LANG_ENGLISH        "&&1 invites you to join their party.\\nAccepting this invite will disband your party."

REFERENCE           PATCH_PARTY_INVITE_ACCEPT
LANG_ENGLISH        "Join party"

REFERENCE           PATCH_PARTY_INVITE_DECLINE
LANG_ENGLISH        "Decline"

REFERENCE           PATCH_DOWNLOAD_MAPS
LANG_ENGLISH        "Download Maps"

REFERENCE           PATCH_DOWNLOAD_CONTENT
LANG_ENGLISH        "Download Content"

REFERENCE           PATCH_DOWNLOAD_MAPS_CAPS
LANG_ENGLISH        "DOWNLOAD MAPS"

REFERENCE           PATCH_DOWNLOAD_CONTENT_CAPS
LANG_ENGLISH        "DOWNLOAD CONTENT"

REFERENCE           PATCH_DLC_MAPS_DESC
LANG_ENGLISH        "Bonus multiplayer maps."

REFERENCE           PATCH_DLC_MAPS_DESC_LOCKED
LANG_ENGLISH        "Download bonus multiplayer maps."

REFERENCE           PATCH_STRIKE
LANG_ENGLISH        "Strike"

REFERENCE           PATCH_DESC_MAP_STRIKE
LANG_ENGLISH        "Large urban desert town.  Excellent team games."

REFERENCE           PATCH_TRAILERPARK
LANG_ENGLISH        "Trailer Park"

REFERENCE           PATCH_DESC_MAP_TRAILERPARK
LANG_ENGLISH        "Medium-sized trailer park with lots of cover and flank routes. Fight from all angles.\\n\\n"

REFERENCE           PATCH_FUEL2
LANG_ENGLISH        "Fuel"

REFERENCE           PATCH_DESC_MAP_FUEL2
LANG_ENGLISH        "Large oil refinery.  Good balance of medium to long range fire fights."

REFERENCE           PATCH_ABANDON
LANG_ENGLISH        "Carnival"

REFERENCE           PATCH_DESC_MAP_ABANDON
LANG_ENGLISH        "Large abandoned theme park. Great for all game modes."

REFERENCE           PATCH_MISSINGMAP
LANG_ENGLISH        "You do not have this map.  You can get this map by downloading map packs from Steam."

REFERENCE           PATCH_DLCMAPS
LANG_ENGLISH        "Maps downloaded from Steam."

REFERENCE           PATCH_PLAYLIST_REQUIRES_DLC
LANG_ENGLISH        "This playlist requires a map pack that you do not have. You can download map packs from Steam."

REFERENCE           DLC_UNKNOWN
LANG_ENGLISH        "Unknown Content Package"

REFERENCE           DLC_1
LANG_ENGLISH        "DLC 1"

REFERENCE           DLC_2
LANG_ENGLISH        "DLC 2"

REFERENCE           DLC_PLAYER_DOESNT_HAVE_MAP_PACK
LANG_ENGLISH        "&&2 disabled!\\n&&1 does not have the map pack."

REFERENCE           DLC_PLAYLIST_MAPS_NOT_ENABLED
LANG_ENGLISH        "This playlist requires map packs that are disabled."

REFERENCE           DLC_NOTEVERYONEHASREQUIREDDLC
LANG_ENGLISH        "This playlist requires a map pack that you have, but other members of your party do not have."

REFERENCE           CGAME_NOSPECTATORVOICECHAT
LANG_ENGLISH        "Can't voice chat as a spectator."

REFERENCE           CGAME_SPECTATOR
LANG_ENGLISH        "SPECTATOR"

REFERENCE           CGAME_COMPLAINTFILED
LANG_ENGLISH        "Your complaint has been filed"

REFERENCE           CGAME_COMPLAINTDISMISSED
LANG_ENGLISH        "Complaint dismissed"

REFERENCE           CGAME_COMPLAINTSERVERHOST
LANG_ENGLISH        "Server Host cannot be complained against"

REFERENCE           CGAME_SERVERHOSTTEAMKILLED
LANG_ENGLISH        "You were team-killed by the Server Host"

REFERENCE           CGAME_COMPLAINTTEAMKILLFILE
LANG_ENGLISH        "File complaint against &&1 for team-killing?"

REFERENCE           CGAME_PRESSYESNO
LANG_ENGLISH        "Press '&&1' for YES, or '&&2' for No"

REFERENCE           CGAME_VOTE
LANG_ENGLISH        "VOTE"

REFERENCE           CGAME_YES
LANG_ENGLISH        "YES"

REFERENCE           CGAME_NO
LANG_ENGLISH        "NO"

REFERENCE           CGAME_FOLLOWING
LANG_ENGLISH        "SPECTATING"

REFERENCE           CGAME_YOUKILLED
LANG_ENGLISH        "You killed &&1"

REFERENCE           CGAME_TEAMMATE
LANG_ENGLISH        "TEAMMATE"

REFERENCE           CGAME_UNKNOWN
LANG_ENGLISH        "unknown"

REFERENCE           CGAME_MISSIONOBJECTIVES
LANG_ENGLISH        "MISSION OBJECTIVES"

REFERENCE           CGAME_PAUSED
LANG_ENGLISH        "Paused"

REFERENCE           CGAME_PLAYERRENAMES
LANG_ENGLISH        "renamed to"

REFERENCE           CGAME_CONNECTIONINTERUPTED
LANG_ENGLISH        "Connection Interrupted"

REFERENCE           CGAME_SB_PLAYER
LANG_ENGLISH        "&&1"

REFERENCE           CGAME_SB_PLAYERS
LANG_ENGLISH        "&&1"

REFERENCE           CGAME_SPECTATORS
LANG_ENGLISH        "Spectators"

REFERENCE           CGAME_SB_SCORE
LANG_ENGLISH        "Score"

REFERENCE           CGAME_SB_DEATHS
LANG_ENGLISH        "Deaths"

REFERENCE           CGAME_SB_PING
LANG_ENGLISH        "Ping"

REFERENCE           CGAME_FOR
LANG_ENGLISH        "for"

REFERENCE           CGAME_DIED
LANG_ENGLISH        "died"

REFERENCE           CGAME_MELEE
LANG_ENGLISH        "melee"

REFERENCE           CGAME_SUICIDE
LANG_ENGLISH        "suicide"

REFERENCE           CGAME_FALLING
LANG_ENGLISH        "falling"

REFERENCE           CGAME_CRUSH
LANG_ENGLISH        "crush"

REFERENCE           CGAME_DROWN
LANG_ENGLISH        "drown"

REFERENCE           CGAME_SLIME
LANG_ENGLISH        "slime"

REFERENCE           CGAME_WAITINGFORSERVERLOAD
LANG_ENGLISH        "Waiting for server to load new map"

REFERENCE           CGAME_HEAD_SHOT
LANG_ENGLISH        "head shot"

REFERENCE           CGAME_PRONE_BLOCKED
LANG_ENGLISH        "Prone Blocked"

REFERENCE           CGAME_PRONE_BLOCKED_WEAPON
LANG_ENGLISH        "Can't Go Prone With This Weapon"

REFERENCE           CGAME_HEALTH
LANG_ENGLISH        "Health"

REFERENCE           CGAME_LISTENSERVER
LANG_ENGLISH        "Listen Server"

REFERENCE           CGAME_THIS_WEAPON_HAS_NO_ALTERNATE
LANG_ENGLISH        "This weapon has no alternate mode to switch to."

REFERENCE           CGAME_YOUWEREKILLED
LANG_ENGLISH        "Killed by &&1"

REFERENCE           CGAME_NOW_SAVING
LANG_ENGLISH        "Saving..."

REFERENCE           CGAME_CONTINUE_SAVING
LANG_ENGLISH        "Save and Quit"

REFERENCE           CGAME_SAVE_WARNING
LANG_ENGLISH        "If you save now, you will lose any progress \\nsince your last checkpoint. \\n\\nContinue saving?"

REFERENCE           CGAME_RESTART_WARNING
LANG_ENGLISH        "If you restart now, you will lose \\nany progress that you have made \\nin this mission\\n\\nContinue restart?"

REFERENCE           CGAME_SAVE_VICTORY
LANG_ENGLISH        "Would you like to save your game progress?"

REFERENCE           CGAME_SB_KILLS
LANG_ENGLISH        "Kills"

REFERENCE           CGAME_SB_ASSISTS
LANG_ENGLISH        "Assists"

REFERENCE           CGAME_OBJECTIVE_BELOW
LANG_ENGLISH        "Objective Below"

REFERENCE           CGAME_OBJECTIVE_ABOVE
LANG_ENGLISH        "Objective Above"

REFERENCE           CGAME_SAVINGREPLAY
LANG_ENGLISH        "&&1 saving replay at\\n &&2 -> &&3"

REFERENCE           CGAME_OBJECTIVE_FOLLOWTEXT_DEFAULT
LANG_ENGLISH        "Follow"

REFERENCE           CLANS_CLANNAME
LANG_ENGLISH        "Clan Name:"

REFERENCE           CLANS_OFFENSIVENAME
LANG_ENGLISH        "Clan name denied due to prohibited text"

REFERENCE           CLANS_INVALIDCHARS
LANG_ENGLISH        "Unsupported characters have been removed from your input."

REFERENCE           AC130_HINT_CYCLE_WEAPONS
LANG_ENGLISH        "Press ^3[{weapnext}]^7 to cycle through weapons."

REFERENCE           AC130_DO_NOT_ENGAGE
LANG_ENGLISH        "You have not been cleared to fire. Mission failed."

REFERENCE           AC130_HUD_TOP_BAR
LANG_ENGLISH        "\\n0         A-G        MAN    NARO"

REFERENCE           AC130_HUD_LEFT_BLOCK
LANG_ENGLISH        "RAY\\nFF 30\\nLIR\\n\\nBORE"

REFERENCE           AC130_HUD_RIGHT_BLOCK
LANG_ENGLISH        "N\\nT\\n\\nS\\nF\\n\\nQ\\nZ\\n\\nT\\nG\\nT"

REFERENCE           AC130_HUD_BOTTOM_BLOCK
LANG_ENGLISH        "L1514    RDY"

REFERENCE           AC130_HUD_THERMAL_WHOT
LANG_ENGLISH        "WHOT"

REFERENCE           AC130_HUD_THERMAL_BHOT
LANG_ENGLISH        "BHOT"

REFERENCE           AC130_HUD_WEAPON_105MM
LANG_ENGLISH        "105 mm"

REFERENCE           AC130_HUD_WEAPON_40MM
LANG_ENGLISH        "40 mm"

REFERENCE           AC130_HUD_WEAPON_25MM
LANG_ENGLISH        "25 mm"

REFERENCE           AC130_HUD_AGL
LANG_ENGLISH        "&&1 AGL"

REFERENCE           AC130_DEBUG_FRIENDLY_COUNT
LANG_ENGLISH        "Friendlies: &&1"

REFERENCE           AC130_FRIENDLIES_DEAD
LANG_ENGLISH        "Too many friendlies have been KIA. Mission failed."

REFERENCE           AC130_FRIENDLY_FIRE
LANG_ENGLISH        "Friendly fire will not be tolerated!\\nWatch for blinking IR strobes on friendly units!"

REFERENCE           AC130_FRIENDLY_FIRE_HELICOPTER
LANG_ENGLISH        "You attacked a friendly helicopter!"

REFERENCE           AC130_CIVILIAN_FIRE_VEHICLE
LANG_ENGLISH        "You attacked a civilian vehicle! Mission failed."

REFERENCE           AC130_CIVILIAN_FIRE
LANG_ENGLISH        "You harmed a civilian! Mission failed."

REFERENCE           AC130_OBJECTIVE_SUPPORT_FRIENDLIES
LANG_ENGLISH        "Provide AC-130 air support for friendly SAS ground units."

REFERENCE           AC130_HUD_RIGHT_BLOCK_SHORT
LANG_ENGLISH        "N\\nT\\n\\nS\\nF\\n\\nQ\\nZ"

REFERENCE           AC130_RELOADING
LANG_ENGLISH        "Reloading"

REFERENCE           SENTRY_DEBUG_SPAWN_ENEMIES
LANG_ENGLISH        "Enemies spawn in 10 seconds"

REFERENCE           SENTRY_PICKUP
LANG_ENGLISH        "Press and hold ^3&&1^7 to pick up the turret."

REFERENCE           SENTRY_MOVE
LANG_ENGLISH        "Press and hold ^3&&1^7 to move the turret."

REFERENCE           SENTRY_PLACE
LANG_ENGLISH        "Press ^3[{+attack}]^7 to place the turret."

REFERENCE           SENTRY_CANNOT_PLACE
LANG_ENGLISH        "Move the turret to a valid location."

REFERENCE           ELEVATOR_CALL_HINT
LANG_ENGLISH        "Press and hold &&1 to call elevator."

REFERENCE           ELEVATOR_USE_HINT
LANG_ENGLISH        "Press and hold &&1 to use elevator."

REFERENCE           ELEVATOR_FLOOR_SELECT_HINT
LANG_ENGLISH        "Press and hold &&1 to select floor."

REFERENCE           PAINTER_DOT
LANG_ENGLISH        "."

REFERENCE           PAINTER_5PLACED_MODELS_
LANG_ENGLISH        "^5Placed Models: "

REFERENCE           PAINTER_5DENSITY_
LANG_ENGLISH        "^5Spacing: "

REFERENCE           PAINTER_5RADIUS_
LANG_ENGLISH        "^5Radius: "

REFERENCE           PAINTER_4X3Y_
LANG_ENGLISH        "^4X/^3Y: "

REFERENCE           PAINTER_2A1B7_
LANG_ENGLISH        "^2A/^1B^7: "

REFERENCE           PAINTER_8LSTICK7RSTICK7_
LANG_ENGLISH        "^8LStick/^7RStick^7: "

REFERENCE           PAINTER_8LBUTTON7RBUTTON7_
LANG_ENGLISH        "^8Lbutton/^7Rbutton^7: "

REFERENCE           PAINTER_8DPADL7DPADR7_
LANG_ENGLISH        "^8DPadL/^7DpadR^7: "

REFERENCE           PAINTER_8DPADU7DPADD7_
LANG_ENGLISH        "^8DPadU/^7DpadD^7: "

REFERENCE           PAINTER_8F5_
LANG_ENGLISH        "^8F: "

REFERENCE           PAINTER_GROUP_UP_DOWN
LANG_ENGLISH        "Group Up / Down"

REFERENCE           PAINTER_DENSITY_DOWN_UP
LANG_ENGLISH        "Density Down / Up"

REFERENCE           PAINTER_RADIUS_DOWN_UP
LANG_ENGLISH        "Radius Down / Up"

REFERENCE           PAINTER_SPAM_REMOVE_PLACE
LANG_ENGLISH        "Remove / Place"

REFERENCE           PAINTER_ZOFFSET_CLEAR_SET
LANG_ENGLISH        "zOffset Clear / Set"

REFERENCE           PAINTER_ROTATION_CLEAR_SET
LANG_ENGLISH        "Rotation Clear / Set"

REFERENCE           PAINTER_DUMP_3MAPSOURCEXENONEXPORTLEVELSCRIPTMODELDUMPMAP
LANG_ENGLISH        "(dump) ^3map_source/xenon_export/<levelname>_modeldump.map"

REFERENCE           PAINTER_BLANK
LANG_ENGLISH        "-"

REFERENCE           PAINTER_HEIGHT_DOWN_UP
LANG_ENGLISH        "Height Down / Up"

REFERENCE           PAINTER__SET
LANG_ENGLISH        " - / Set"

REFERENCE           PAINTER_ROTATEOTHER_UP_DOWN
LANG_ENGLISH        "RotateOther Up / Down"

REFERENCE           PAINTER__SET_
LANG_ENGLISH        " Set / -"

REFERENCE           PAINTER_DBL_BLANK
LANG_ENGLISH        " -- -- "

ENDMARKER
`,A_=`VERSION				"1"
FILENOTES			"Official IW4x localized strings"

REFERENCE			MPUI_VIP_CAPS
LANG_ENGLISH		"VIP"

REFERENCE			MENU_GTNW_DESC
LANG_ENGLISH		"Teams fight for capturing the nuclear payload to activate the nuclear strike."

REFERENCE			MPUI_GUNGAME
LANG_ENGLISH		"Gun Game"

REFERENCE			MPUI_GUNGAME_CAPS
LANG_ENGLISH		"GUN GAME"

REFERENCE			MENU_GUNGAME_DESC
LANG_ENGLISH		"Be the first to dominate with every gun."

REFERENCE			MPUI_SHARPSHOOTER
LANG_ENGLISH		"Sharpshooter"

REFERENCE			MPUI_SHARPSHOOTER_CAPS
LANG_ENGLISH		"SHARPSHOOTER"

REFERENCE			MENU_SHARPSHOOTER
LANG_ENGLISH		"All players are given the same weapon, selected randomly. Every 45 seconds, a new weapon is selected at random and used by all."

REFERENCE			MPUI_OITC
LANG_ENGLISH		"One in the Chamber"

REFERENCE			MPUI_OITC_CAPS
LANG_ENGLISH		"ONE IN THE CHAMBER"

REFERENCE			MENU_OITC_DESC
LANG_ENGLISH		"Gain ammo by eliminating enemies. Highest score wins."

REFERENCE			MPUI_CONF
LANG_ENGLISH		"Kill Confirmed"

REFERENCE			MPUI_CONF_CAPS
LANG_ENGLISH		"KILL CONFIRMED"

REFERENCE			MENU_CONF
LANG_ENGLISH		"Recover Dog Tags to score for your team and deny enemy scores."

REFERENCE			CONF_GAME_DESC
LANG_ENGLISH		"Collect Dog Tags to win."

REFERENCE			MPUI_INF
LANG_ENGLISH		"Infected"

REFERENCE			MPUI_INF_CAPS
LANG_ENGLISH		"INFECTED"

REFERENCE			MENU_INF
LANG_ENGLISH		"Eliminated Survivors become Infected.  Infect everyone, or survive the game to win."

REFERENCE			INF_GAME_DESC
LANG_ENGLISH		"Eliminated Survivors become Infected.  Infect everyone, or survive the game to win."

REFERENCE			INF_WAIT_FOR_PLAYERS
LANG_ENGLISH		"Waiting for more players..."

REFERENCE			INF_COUNTDOWN
LANG_ENGLISH		"Infection countdown: "

REFERENCE			INF_ALLIES_ELIM
LANG_ENGLISH		"Survivors eliminated."

REFERENCE			INF_GOT_INFECTED
LANG_ENGLISH		"Infected!"

REFERENCE			INF_LAST_ALIVE
LANG_ENGLISH		"Last Alive!"

REFERENCE			INF_SURVIVOR
LANG_ENGLISH		"Survivor!"

REFERENCE			CONF_PICKEDUP_TAGS
LANG_ENGLISH		"RETREIVED TAGS"

REFERENCE			CONF_KILL_DENIED
LANG_ENGLISH		"KILL DENIED"

REFERENCE			CONF_KILL_CONFIRMED
LANG_ENGLISH		"KILL CONFIRMED"

REFERENCE			MPUI_CRANKED
LANG_ENGLISH		"Cranked"

REFERENCE			MPUI_CRANKED_CAPS
LANG_ENGLISH		"CRANKED"

REFERENCE			MENU_CRANKED
LANG_ENGLISH		"Kills give you extra perks, 2x scoring, and a time limit.  Chain kills to stay alive!"

REFERENCE			OBJECTIVES_TDEF_ATTACKER_HINT
LANG_ENGLISH		"Capture flag for team x2 bonus."

REFERENCE			OBJECTIVES_TDEF_DEFENDER_HINT
LANG_ENGLISH		"Defend flag for team x2 bonus."

REFERENCE			OBJECTIVES_TDEF
LANG_ENGLISH		"Capture and hold the flag for a team double scoring bonus."

REFERENCE			OBJECTIVES_TDEF_SCORE
LANG_ENGLISH		"Capture and hold the flag for team double scoring bonus.  First team to &&1 wins."

REFERENCE			OBJECTIVES_TDEF_HINT
LANG_ENGLISH		"Capture and hold the flag."

REFERENCE			MPUI_TDEF
LANG_ENGLISH		"Team Defender"

REFERENCE			MPUI_TDEF_CAPS
LANG_ENGLISH		"TEAM DEFENDER"

REFERENCE			MENU_TDEF
LANG_ENGLISH		"Capture and hold the flag for a team double scoring bonus.  Not for the faint of heart.\\n \\n Created by Intricate."

REFERENCE			WEAPON_PEACEKEEPER
LANG_ENGLISH		"Peacekeeper"

REFERENCE			WEAPON_AK47_CLASSIC
LANG_ENGLISH		"AK-47 Classic"

REFERENCE			WEAPON_AK47_CLASSIC_REDDOT
LANG_ENGLISH		"AK-47 Classic Red Dot Sight"

REFERENCE			WEAPON_AK47_CLASSIC_SILENCER
LANG_ENGLISH		"AK-47 Classic Silenced"

REFERENCE			WEAPON_AK47_CLASSIC_XMAGS
LANG_ENGLISH		"AK-47 Classic Extended Mags"

REFERENCE			WEAPON_AK47_CLASSIC_ACOG
LANG_ENGLISH		"AK-47 Classic ACOG Sight"

REFERENCE			WEAPON_AK47_CLASSIC_FMJ
LANG_ENGLISH		"AK-47 Classic FMJ"

REFERENCE			WEAPON_AK47_CLASSIC_GP25
LANG_ENGLISH		"AK-47 Classic Grenade Launcher"

REFERENCE			WEAPON_AK47_CLASSIC_BLING
LANG_ENGLISH		"AK-47 Classic Bling"

REFERENCE			WEAPON_AK74U_EXTENDED_MAGS
LANG_ENGLISH		"AK-74u Extended Mags"

REFERENCE			WEAPON_AK74U_ACOG
LANG_ENGLISH		"AK-74u ACOG Sight"

REFERENCE           WEAPON_DESERTEAGLEGOLD_TACTICAL
LANG_ENGLISH        "Gold Desert Eagle Tactical Knife"

REFERENCE           WEAPON_DESERTEAGLEGOLD_AKIMBO
LANG_ENGLISH        "Gold Desert Eagle Akimbo"

REFERENCE           WEAPON_DESERTEAGLEGOLD_FMJ
LANG_ENGLISH        "Gold Desert Eagle FMJ"

REFERENCE           WEAPON_DESERTEAGLEGOLD_BLING
LANG_ENGLISH        "Gold Desert Eagle Bling"

REFERENCE			MENU_RECONNECTING_TO_PARTY
LANG_ENGLISH		"CONNECTING TO SERVER"

REFERENCE			EXE_AWAITINGGAMESTATE
LANG_ENGLISH		"Awaiting gamestate"

REFERENCE			MPUI_BLOC
LANG_ENGLISH		"Bloc"

REFERENCE			MPUI_BOG_SH
LANG_ENGLISH		"Bog"

REFERENCE			MPUI_DESC_MAP_CARGOSHIP
LANG_ENGLISH		"A medium-sized map featured in Call of Duty 4: Modern Warfare. It takes place on a cargo ship during a storm and is based on the campaign mission, Crew Expendable."

REFERENCE			MPUI_CARGOSHIP_SH
LANG_ENGLISH		"Freighter"

REFERENCE			MPUI_DESC_MAP_CARGOSHIP_SH
LANG_ENGLISH		"An snow covered version of, the Call of Duty 4: Modern Warfare map, Wet Work."

REFERENCE			MPUI_KILLHOUSE
LANG_ENGLISH		"Killhouse"

REFERENCE			MPUI_DESC_MAP_KILLHOUSE
LANG_ENGLISH		"Killhouse is a very small map from the Variety Map Pack of Call of Duty 4: Modern Warfare.  It is the home to very fierce battles as the map is no larger than Shipment."

REFERENCE			MPUI_DESC_MAP_OILRIG
LANG_ENGLISH		"The Only Easy Day... Was Yesterday"

REFERENCE			MPUI_NUKED
LANG_ENGLISH		"Nuketown"

REFERENCE			MPUI_DESC_MAP_NUKED
LANG_ENGLISH		"A deserted nuke testing facility used in the Cold War."

REFERENCE			MPUI_DESC_MAP_FIRINGRANGE
LANG_ENGLISH		"Close range to medium range combat in a military practice facility in Cuba."

REFERENCE			MPUI_RUST_LONG
LANG_ENGLISH		"Rust: Long"

REFERENCE			MPUI_DESC_MAP_RUST_LONG
LANG_ENGLISH		"Fast-paced action in an oil yard in the middle of the desert."

REFERENCE			MPUI_SHIPMENT_LONG
LANG_ENGLISH		"Shipment: Long"

REFERENCE			MPUI_DESC_MAP_SHIPMENT_LONG
LANG_ENGLISH		"A larger version of the original Call of Duty 4: Modern Warfare map Shipment."

REFERENCE			MPUI_BLOC_SH
LANG_ENGLISH		"Forgotten City"

REFERENCE			MPUI_DESC_MAP_BLOC_SH
LANG_ENGLISH		"A modified version of Bloc."

REFERENCE			MPUI_CRASH_TROPICAL
LANG_ENGLISH		"Crash: Tropical"

REFERENCE			MPUI_DESC_MAP_CRASH_TROPICAL
LANG_ENGLISH		"Crash with a tropical landscape."

REFERENCE			MPUI_ESTATE_TROPICAL
LANG_ENGLISH		"Estate: Tropical"

REFERENCE			MPUI_DESC_MAP_ESTATE_TROPICAL
LANG_ENGLISH		"Estate with a tropical landscape."

REFERENCE			MPUI_FAV_TROPICAL
LANG_ENGLISH		"Favela: Tropical"

REFERENCE			MPUI_DESC_MAP_FAV_TROPICAL
LANG_ENGLISH		"Favela with a tropical landscape."

REFERENCE			MPUI_STORM_SPRING
LANG_ENGLISH		"Chemical Plant"

REFERENCE			MPUI_DESC_MAP_STORM_SPRING
LANG_ENGLISH		"A modified version of Storm, snow covered instead of rainy."

REFERENCE			MPUI_CO_HUNTED
LANG_ENGLISH		"Village"

REFERENCE			MPUI_DESC_MAP_CO_HUNTED
LANG_ENGLISH		"Russian village in the evening."

REFERENCE			MP_NEUTRAL_FLAG_DROPPED_BY
LANG_ENGLISH		"&&1 dropped the flag!"

REFERENCE			SPLASHES_X2_BONUS
LANG_ENGLISH		"x2 Bonus!"

REFERENCE			SPLASHES_TEAM_ASSIST
LANG_ENGLISH		"Team Assist!"

REFERENCE			MENU_MODS
LANG_ENGLISH		"Mods"

REFERENCE			MENU_MODS_CAPS
LANG_ENGLISH		"MODS"

REFERENCE			MPUI_DESC_MODS
LANG_ENGLISH		"Browse your Mods"

REFERENCE			MENU_STORE
LANG_ENGLISH		"Store"

REFERENCE			MENU_STORE_CAPS
LANG_ENGLISH		"STORE"

REFERENCE			MPUI_DESC_STORE
LANG_ENGLISH		"Browse for available downloadable game content."

REFERENCE			MENU_FRIENDS
LANG_ENGLISH		"Friends"

REFERENCE			MENU_FRIENDS_CAPS
LANG_ENGLISH		"FRIENDS"

REFERENCE			MENU_PASSWORD_CAPS
LANG_ENGLISH		"PASSWORD"

REFERENCE			PLATFORM_FRIENDS
LANG_ENGLISH		"Friends ^0- ^3F"

REFERENCE			PLATFORM_FRIENDS_CAPS
LANG_ENGLISH		"FRIENDS ^0- ^3F"

REFERENCE			MPUI_DESC_FRIENDS
LANG_ENGLISH		"Check where your friends are playing."

REFERENCE			MENU_FRIENDNOTIFY
LANG_ENGLISH		"Friend Notifications"

REFERENCE			MPUI_DESC_FRIENDNOTIFY
LANG_ENGLISH		"When should the friend status notifications be displayed?"

REFERENCE			MPUI_DESC_OPTIONS
LANG_ENGLISH		"Set your game options."

REFERENCE			MPUI_DESC_QUIT
LANG_ENGLISH		"Quit the game."

REFERENCE			MENU_CLOSE
LANG_ENGLISH		"Close"

REFERENCE			MENU_CLOSE_CAPS
LANG_ENGLISH		"CLOSE"

REFERENCE			PLATFORM_CHANGE_NAME_CAPS
LANG_ENGLISH		"^3C^7HANGE NAME"

REFERENCE			MPUI_DESC_CHANGE_NAME
LANG_ENGLISH		"Change your name"

REFERENCE			PLAYERCARDS_TITLE_EVIL_CHICKEN
LANG_ENGLISH		"Evil Chicken"

REFERENCE			MENU_THEATER
LANG_ENGLISH		"Theater"

REFERENCE			MENU_THEATER_CAPS
LANG_ENGLISH		"THEATER"

REFERENCE			MPUI_DESC_THEATER
LANG_ENGLISH		"View your played matches."

REFERENCE			MENU_PLAY
LANG_ENGLISH		"Play"

REFERENCE			MENU_PLAY_CAPS
LANG_ENGLISH		"PLAY"

REFERENCE			MENU_DELETE
LANG_ENGLISH		"Delete"

REFERENCE			MENU_DELETE_CAPS
LANG_ENGLISH		"DELETE"

REFERENCE			MPUI_DEMOS_KEEP
LANG_ENGLISH		"Demos to keep: "

REFERENCE			MPUI_DEMOS_KEEP_CAPS
LANG_ENGLISH		"DEMOS TO KEEP: "

REFERENCE			MPUI_AUTORECORD
LANG_ENGLISH		"Automatic Recording: "

REFERENCE			MPUI_AUTORECORD_CAPS
LANG_ENGLISH		"AUTOMATIC RECORDING: "

REFERENCE			MENU_SERVER_INFO_CAPS
LANG_ENGLISH		"SERVERINFO"

REFERENCE			MENU_JOIN_SERVER_CAPS
LANG_ENGLISH		"JOIN SERVER"

REFERENCE			MENU_GAME_SETTINGS_CAPS
LANG_ENGLISH		"GAME SETTINGS"

REFERENCE			MENU_CHECK_FOR_UPDATES
LANG_ENGLISH		"^3Update available"

REFERENCE			MENU_CHECK_FOR_UPDATES_CAPS
LANG_ENGLISH		"^3UPDATE AVAILABLE"

REFERENCE			MPUI_DESC_CHECK_FOR_UPDATES
LANG_ENGLISH		"Check if a newer version is available."

REFERENCE			MENU_ADD_TO_FAVORITES_CAPS
LANG_ENGLISH		"ADD TO FAVORITES"

REFERENCE			MENU_DEL_FAVORITE_CAPS
LANG_ENGLISH		"DEL. FAVORITE"

REFERENCE			MPUI_DESC_LOGOUT
LANG_ENGLISH		"Log yourself out."

REFERENCE			PLAYERCARDS_TITLE_NO_LAST_STAND
LANG_ENGLISH		"No Last Stand!"

REFERENCE			PLATFORM_REFRESH_LIST
LANG_ENGLISH		"Refresh List ^0- ^3F5"

REFERENCE			PLATFORM_REFRESH_LIST_CAPS
LANG_ENGLISH		"REFRESH LIST ^0- ^3F5"

REFERENCE			PLATFORM_REFRESH
LANG_ENGLISH		"Refresh ^0- ^3F5"

REFERENCE			PLATFORM_REFRESH_CAPS
LANG_ENGLISH		"REFRESH ^0- ^3F5"

REFERENCE			MENU_SYNC_NODES
LANG_ENGLISH		"Sync Nodes"

REFERENCE			MENU_SYNC_NODES_CAPS
LANG_ENGLISH		"SYNC NODES"

REFERENCE			MPUI_MAX_CLIENTS
LANG_ENGLISH		"Max. Clients:"

REFERENCE			MPUI_MAX_CLIENTS_CAPS
LANG_ENGLISH		"MAX. CLIENTS:"

REFERENCE			MPUI_IS_PRIVATE
LANG_ENGLISH		"Password Protected:"

REFERENCE			MPUI_IS_PRIVATE_CAPS
LANG_ENGLISH		"PASSWORD PROTECTED:"

REFERENCE			MPUI_VERSION
LANG_ENGLISH		"Version:"

REFERENCE			MPUI_VERSION_CAPS
LANG_ENGLISH		"VERSION:"

REFERENCE			MPUI_MOD
LANG_ENGLISH		"Mod:"

REFERENCE			MPUI_MOD_CAPS
LANG_ENGLISH		"MOD:"

REFERENCE			MP_PICKUP_C4
LANG_ENGLISH		"Press and hold ^3[{+activate}]^7 to pick up C4"

REFERENCE			MP_PICKUP_CLAYMORE
LANG_ENGLISH		"Press and hold ^3[{+activate}]^7 to pick up Claymore"

REFERENCE			WEAPON_FAL_GL
LANG_ENGLISH		"FAL Grenade Launcher"

REFERENCE			MENU_CUSTOM_TITLE
LANG_ENGLISH		"Custom Title"

REFERENCE			MENU_CUSTOM_TITLE_CAPS
LANG_ENGLISH		"CUSTOM TITLE"

REFERENCE			MENU_FOV
LANG_ENGLISH		"Field of View"

REFERENCE			MENU_FOVSCALE
LANG_ENGLISH		"Field of View Scale"

REFERENCE			MENU_FOV_CAPS
LANG_ENGLISH		"FOV: "

REFERENCE			MENU_FOV_HINT_PC
LANG_ENGLISH		"An increased Field of View (FOV), may result in poor performance on older computers."

REFERENCE			MENU_8X
LANG_ENGLISH		"8x"

REFERENCE			MENU_16X
LANG_ENGLISH		"16x"

REFERENCE			MENU_FPS_0
LANG_ENGLISH		"OFF: 0"

REFERENCE			MENU_FPS_1
LANG_ENGLISH		"ON: 1"

REFERENCE			MENU_FPS_2
LANG_ENGLISH		"ON: 2"

REFERENCE			MENU_FPS_3
LANG_ENGLISH		"ON: 3"

REFERENCE			MENU_FPS_4
LANG_ENGLISH		"ON: 4"

REFERENCE			MENU_FPS_CAP
LANG_ENGLISH		"FPS Frame Cap"

REFERENCE			MENU_FPS_DRAW
LANG_ENGLISH		"FPS Drawing"

REFERENCE			MENU_FPS_LABELS
LANG_ENGLISH		"FPS Labels"

REFERENCE			MENU_SCREEN_OPTIONS
LANG_ENGLISH		"Screen Options"

REFERENCE			MENU_BORDERLESS
LANG_ENGLISH		"Borderless"

REFERENCE			MENU_FULLSCREEN
LANG_ENGLISH		"Full Screen"

REFERENCE			MENU_XAXIS
LANG_ENGLISH		"Window X-Axis Pos"

REFERENCE			MENU_YAXIS
LANG_ENGLISH		"Window Y-Axis Pos"

REFERENCE			MENU_AAALPHA
LANG_ENGLISH		"Anti-aliasing Alpha"

REFERENCE			MENU_AAA_DITHER
LANG_ENGLISH		"Dither (Poor)"

REFERENCE			MENU_AAA_SUPER
LANG_ENGLISH		"Super Sampled (Nice)"

REFERENCE			MENU_AA_MAXQUALITY
LANG_ENGLISH		"Anti-aliasing Quality"

REFERENCE			MENU_SCROLL_UP
LANG_ENGLISH		"^3SCROLL UP"

REFERENCE			MENU_SCROLL_DOWN
LANG_ENGLISH		"^3SCROLL DOWN"

REFERENCE			MENU_NOBORDER
LANG_ENGLISH		"Disable Window Border"

REFERENCE			MENU_MAXPACKETS
LANG_ENGLISH		"Max. Packets per frame"

REFERENCE			MENU_SNAPS
LANG_ENGLISH		"Snapshot rate"

REFERENCE			MENU_LAGOMETER
LANG_ENGLISH		"Show Lagometer"

REFERENCE			MENU_DRAWFPS
LANG_ENGLISH		"Show FPS"

REFERENCE			MENU_FPSLABELS
LANG_ENGLISH		"Show FPS Labels"

REFERENCE			MENU_NEWCOLORS
LANG_ENGLISH		"Use new color codes"

REFERENCE			MENU_NEWCOLORS
LANG_ENGLISH		"Use new color codes"

REFERENCE			MENU_CHANGELOG
LANG_ENGLISH		"Changelog"

REFERENCE			MENU_CHANGELOG_CAPS
LANG_ENGLISH		"CHANGELOG"

REFERENCE			MPUI_DESC_CHANGELOG
LANG_ENGLISH		"See what's new."

REFERENCE			MPUI_DESC_CHANGELOG
LANG_ENGLISH		"See what's new."

REFERENCE			MPUI_DESC_NOBORDER
LANG_ENGLISH		"Do not use a border in windowed mode."

REFERENCE			MPUI_DESC_NATIVECURSOR
LANG_ENGLISH		"Display your native cursor, instead of the games cursor."

REFERENCE			MPUI_DESC_FOV
LANG_ENGLISH		"Adjust your field of view."

REFERENCE			MPUI_DESC_CUSTOM_TITLE
LANG_ENGLISH		"Change the playercard title text"

REFERENCE			MPUI_DESC_FOVSCALE
LANG_ENGLISH		"Adjust your field of view scale, also modifies aim FOV."

REFERENCE			MPUI_DESC_NEWCOLORS
LANG_ENGLISH		"Use the color code stylesheet from ^2Warfare2."

REFERENCE			MPUI_DESC_AUTORECORD
LANG_ENGLISH		"Record your matches automatically."

REFERENCE			MPUI_DESC_DEMOS_KEEP
LANG_ENGLISH		"Define how many of your recordings should be saved, before the oldest ones get deleted."

REFERENCE			MENU_MAXFPS
LANG_ENGLISH		"Maximum FPS"

REFERENCE			MPUI_DESC_MAXFPS
LANG_ENGLISH		"Define your maximum frames per second."

REFERENCE			MENU_SEARCHINGFORGAMES_100MS
LANG_ENGLISH		""

REFERENCE			MP_SEARCHING_FOR_PLAYER
LANG_ENGLISH		"Waiting"

REFERENCE			MENU_WAITING_FOR_MORE_PLAYERS_TEAMS
LANG_ENGLISH		"Waiting for more players to balance teams"

REFERENCE			MENU_GAME
LANG_ENGLISH		"Game"

REFERENCE			MENU_GAME_CAPS
LANG_ENGLISH		"GAME"

REFERENCE			MENU_MOTD
LANG_ENGLISH		"News"

REFERENCE			MENU_MOTD_CAPS
LANG_ENGLISH		"NEWS"

REFERENCE			MENU_AUTORECORD
LANG_ENGLISH		"Auto-Recording"

REFERENCE			MENU_AUTORECORD_CAPS
LANG_ENGLISH		"AUTO-RECORDING"

REFERENCE			MENU_DEMOS_KEEP
LANG_ENGLISH		"Recordings to keep"

REFERENCE			MENU_DEMOS_KEEP_CAPS
LANG_ENGLISH		"RECORDINGS TO KEEP"

REFERENCE			MPUI_DEMO_AUTHOR
LANG_ENGLISH		"Author:"

REFERENCE			MPUI_DEMO_AUTHOR_CAPS
LANG_ENGLISH		"AUTHOR:"

REFERENCE			MPUI_DEMO_LENGTH
LANG_ENGLISH		"Length:"

REFERENCE			MPUI_DEMO_LENGTH_CAPS
LANG_ENGLISH		"LENGTH:"

REFERENCE			MPUI_DEMO_DATE
LANG_ENGLISH		"Date:"

REFERENCE			MPUI_DEMO_DATE_CAPS
LANG_ENGLISH		"DATE:"

REFERENCE			MPUI_DEMO_CREATED
LANG_ENGLISH		"Created:"

REFERENCE			MPUI_DEMO_CREATED_CAPS
LANG_ENGLISH		"CREATED:"

REFERENCE			MENU_D3D9EX
LANG_ENGLISH		"Direct3D 9Ex"

REFERENCE			MPUI_DESC_D3D9EX
LANG_ENGLISH		"Use Direct3D 9Ex."

REFERENCE			MPUI_SECURITY_LEVEL
LANG_ENGLISH		"Security Level:"

REFERENCE			MPUI_SECURITY_LEVEL_CAPS
LANG_ENGLISH		"SECURITY LEVEL:"

REFERENCE			MENU_FRIEND_ADD
LANG_ENGLISH		"Add Friend"

REFERENCE			MENU_FRIEND_ADD_CAPS
LANG_ENGLISH		"ADD FRIEND"

REFERENCE			MPUI_NA
LANG_ENGLISH		"^3Currently unavailable."

REFERENCE			EXE_PROGRESS
LANG_ENGLISH		"Progress:"

REFERENCE			MPUI_DOWNLOADING
LANG_ENGLISH		"Downloading"

REFERENCE			MPUI_DOWNLOADING_CAPS
LANG_ENGLISH		"DOWNLOADING"

REFERENCE			MPUI_SECURITY_INCREASE_MESSAGE
LANG_ENGLISH		"Increasing security level from %d to %d (est. %s)"

REFERENCE			MPUI_SECURITY_NEW_LEVEL_MESSAGE
LANG_ENGLISH		"Your new security level is %d"

REFERENCE			MPUI_SECURITY_LEVEL_MESSAGE
LANG_ENGLISH		"Your security level is %d"

REFERENCE			ERR_INVALID_CONNECT_PACKET
LANG_ENGLISH		"Invalid connect packet!"

REFERENCE			ERR_INVALID_INFOSTRING_DATA
LANG_ENGLISH		"Invalid infostring data!"

REFERENCE			ERR_INVALID_CONNECT_DATA
LANG_ENGLISH		"Invalid connect data!"

REFERENCE			ERR_INVALID_CONNECT_STRING
LANG_ENGLISH		"Invalid connect string!"

REFERENCE			ERR_XUID_CERTIFICATE_MISMATCH
LANG_ENGLISH		"XUID doesn't match the certificate!"

REFERENCE			ERR_INVALID_CHALLENGE_SIGNATURE
LANG_ENGLISH		"Challenge signature was invalid!"

REFERENCE			PATCH_DLC1
LANG_ENGLISH		"Stimulus Pack"

REFERENCE			PATCH_DESC_DLC1
LANG_ENGLISH		"The Modern Warfare 2 Stimulus Package delivers additional action-packed multiplayer maps, including brand-new battlegrounds and legendary fan-favorites from Call of Duty 4: Modern Warfare."

REFERENCE			PATCH_DLC2
LANG_ENGLISH		"Resurgence Pack"

REFERENCE			PATCH_DESC_DLC2
LANG_ENGLISH		"The Modern Warfare 2 Resurgence Pack delivers five incredible new multiplayer maps. Take the action to exciting new locations, then battle across legendary landscapes from Call of Duty 4: Modern Warfare."

REFERENCE			PATCH_DLC3
LANG_ENGLISH		"Nuketown"

REFERENCE			PATCH_DESC_DLC3
LANG_ENGLISH		"Nuketown is an iconic multiplayer map featured in Call of Duty: Black Ops with a heavy emphasis on extremely close-quarters combat."

REFERENCE			PATCH_DLC4
LANG_ENGLISH		"Classics Pack #1"

REFERENCE			PATCH_DESC_DLC4
LANG_ENGLISH		"The Modern Warfare 2 Classics Pack delivers three beloved maps from Call of Duty 4: Modern Warfare."

REFERENCE			PATCH_DLC5
LANG_ENGLISH		"Classics Pack #2"

REFERENCE			PATCH_DESC_DLC5
LANG_ENGLISH		"The second Modern Warfare 2 Classics Pack adds two more fantastic maps from Call of Duty 4: Modern Warfare to your collection."

REFERENCE			PATCH_DLC6
LANG_ENGLISH		"Freighter"

REFERENCE			PATCH_DESC_DLC6
LANG_ENGLISH		"Freighter is a snow covered version of the Call of Duty 4: Modern Warfare map Wet Work."

REFERENCE			PATCH_DLC7
LANG_ENGLISH		"Resurrection Pack"

REFERENCE			PATCH_DESC_DLC7
LANG_ENGLISH		"The Modern Warfare 2 Resurrection Pack brings three more maps into your battleground."

REFERENCE			PATCH_DLC8
LANG_ENGLISH		"Recycled Pack"

REFERENCE			PATCH_DESC_DLC8
LANG_ENGLISH		"Too much 'pew pew' not enough new new. - R. Bowling"

REFERENCE			MENU_STREAMFRIENDLY_UI
LANG_ENGLISH		"Stream Friendly UI"

REFERENCE			MPUI_DESC_STREAM_FRIENDLY_UI
LANG_ENGLISH		"Hide friend status notifications and server info on scoreboard."

REFERENCE			QUICKMESSAGE_QUICK_MESSAGE
LANG_ENGLISH		"Quick Message"

REFERENCE			QUICKMESSAGE_1_COMMANDS
LANG_ENGLISH		"1. Commands"

REFERENCE			QUICKMESSAGE_2_STATEMENTS
LANG_ENGLISH		"2. Statements"

REFERENCE			QUICKMESSAGE_3_RESPONSES
LANG_ENGLISH		"3. Responses"

REFERENCE			QUICKMESSAGE_ESC_EXIT
LANG_ENGLISH		"Esc. Exit"

REFERENCE			QUICKMESSAGE_1_FOLLOW_ME
LANG_ENGLISH		"1. On me!"

REFERENCE			QUICKMESSAGE_2_MOVE_IN
LANG_ENGLISH		"2. Move in!"

REFERENCE			QUICKMESSAGE_3_FALL_BACK
LANG_ENGLISH		"3. Fall back!"

REFERENCE			QUICKMESSAGE_4_SUPPRESSING_FIRE
LANG_ENGLISH		"4. Base of fire!"

REFERENCE			QUICKMESSAGE_5_ATTACK_LEFT_FLANK
LANG_ENGLISH		"5. Attack left flank!"

REFERENCE			QUICKMESSAGE_6_ATTACK_RIGHT_FLANK
LANG_ENGLISH		"6. Attack right flank!"

REFERENCE			QUICKMESSAGE_7_HOLD_THIS_POSITION
LANG_ENGLISH		"7. Hold this position!"

REFERENCE			QUICKMESSAGE_8_REGROUP
LANG_ENGLISH		"8. Regroup!"

REFERENCE			QUICKMESSAGE_1_ENEMY_SPOTTED
LANG_ENGLISH		"1. Contact!"

REFERENCE			QUICKMESSAGE_2_ENEMY_DOWN
LANG_ENGLISH		"2. Enemy down!"

REFERENCE			QUICKMESSAGE_3_IM_IN_POSITION
LANG_ENGLISH		"3. In position."

REFERENCE			QUICKMESSAGE_4_AREA_SECURE
LANG_ENGLISH		"4. Area secure!"

REFERENCE			QUICKMESSAGE_5_GRENADE
LANG_ENGLISH		"5. Grenade!"

REFERENCE			QUICKMESSAGE_6_SNIPER
LANG_ENGLISH		"6. Sniper!"

REFERENCE			QUICKMESSAGE_7_NEED_REINFORCEMENTS
LANG_ENGLISH		"7. Need reinforcements!"

REFERENCE			QUICKMESSAGE_8_HOLD_YOUR_FIRE
LANG_ENGLISH		"8. Hold your fire!"

REFERENCE			QUICKMESSAGE_1_YES_SIR
LANG_ENGLISH		"1. Roger."

REFERENCE			QUICKMESSAGE_2_NO_SIR
LANG_ENGLISH		"2. Negative."

REFERENCE			QUICKMESSAGE_3_IM_ON_MY_WAY
LANG_ENGLISH		"3. Moving."

REFERENCE			QUICKMESSAGE_3_ON_MY_WAY
LANG_ENGLISH		"3. On my way."

REFERENCE			QUICKMESSAGE_4_SORRY
LANG_ENGLISH		"4. Sorry."

REFERENCE			QUICKMESSAGE_5_GREAT_SHOT
LANG_ENGLISH		"5. Nice shot!"

REFERENCE			QUICKMESSAGE_6_TOOK_LONG_ENOUGH
LANG_ENGLISH		"6. Come on!"

REFERENCE			QUICKMESSAGE_7_ARE_YOU_CRAZY
LANG_ENGLISH		"7. Are you crazy?"

REFERENCE			QUICKMESSAGE_FOLLOW_ME
LANG_ENGLISH		"On me!"

REFERENCE			QUICKMESSAGE_MOVE_IN
LANG_ENGLISH		"Move in!"

REFERENCE			QUICKMESSAGE_FALL_BACK
LANG_ENGLISH		"Fall back!"

REFERENCE			QUICKMESSAGE_SUPPRESSING_FIRE
LANG_ENGLISH		"Base of fire!"

REFERENCE			QUICKMESSAGE_ATTACK_RIGHT_FLANK
LANG_ENGLISH		"Attack right flank!"

REFERENCE			QUICKMESSAGE_ATTACK_LEFT_FLANK
LANG_ENGLISH		"Attack left flank!"

REFERENCE			QUICKMESSAGE_HOLD_THIS_POSITION
LANG_ENGLISH		"Hold this position!"

REFERENCE			QUICKMESSAGE_REGROUP
LANG_ENGLISH		"Regroup!"

REFERENCE			QUICKMESSAGE_STICK_TOGETHER
LANG_ENGLISH		"Stick together!"

REFERENCE			QUICKMESSAGE_SQUAD_ATTACK_RIGHT_FLANK
LANG_ENGLISH		"Squad, attack right flank!"

REFERENCE			QUICKMESSAGE_SQUAD_ATTACK_LEFT_FLANK
LANG_ENGLISH		"Squad, attack left flank!"

REFERENCE			QUICKMESSAGE_SQUAD_HOLD_THIS_POSITION
LANG_ENGLISH		"Squad, hold this position!"

REFERENCE			QUICKMESSAGE_SQUAD_REGROUP
LANG_ENGLISH		"Squad, regroup!"

REFERENCE			QUICKMESSAGE_SQUAD_STICK_TOGETHER
LANG_ENGLISH		"Squad, stick together!"

REFERENCE			QUICKMESSAGE_ENEMY_SPOTTED
LANG_ENGLISH		"Contact!"

REFERENCE			QUICKMESSAGE_ENEMY_DOWN
LANG_ENGLISH		"Enemy down!"

REFERENCE			QUICKMESSAGE_IM_IN_POSITION
LANG_ENGLISH		"In position."

REFERENCE			QUICKMESSAGE_AREA_SECURE
LANG_ENGLISH		"Area secure!"

REFERENCE			QUICKMESSAGE_GRENADE
LANG_ENGLISH		"Grenade!"

REFERENCE			QUICKMESSAGE_ENEMY_GRENADE
LANG_ENGLISH		"Enemy grenade!"

REFERENCE			QUICKMESSAGE_SNIPER
LANG_ENGLISH		"Sniper!"

REFERENCE			QUICKMESSAGE_NEED_REINFORCEMENTS
LANG_ENGLISH		"Need reinforcements!"

REFERENCE			QUICKMESSAGE_HOLD_YOUR_FIRE
LANG_ENGLISH		"Hold your fire!"

REFERENCE			QUICKMESSAGE_YES_SIR
LANG_ENGLISH		"Roger."

REFERENCE			QUICKMESSAGE_NO_SIR
LANG_ENGLISH		"Negative."

REFERENCE			QUICKMESSAGE_IM_ON_MY_WAY
LANG_ENGLISH		"Moving."

REFERENCE			QUICKMESSAGE_ON_MY_WAY
LANG_ENGLISH		"On my way."

REFERENCE			QUICKMESSAGE_SORRY
LANG_ENGLISH		"Sorry."

REFERENCE			QUICKMESSAGE_GREAT_SHOT
LANG_ENGLISH		"Nice shot!"

REFERENCE			QUICKMESSAGE_TOOK_YOU_LONG_ENOUGH
LANG_ENGLISH		"Took you long enough!"

REFERENCE			QUICKMESSAGE_TOOK_LONG_ENOUGH
LANG_ENGLISH		"Took long enough!"

REFERENCE			QUICKMESSAGE_YOURE_CRAZY
LANG_ENGLISH		"You're crazy!"

REFERENCE			QUICKMESSAGE_YOU_OUTTA_YOUR_MIND
LANG_ENGLISH		"You outta your mind?"

REFERENCE			QUICKMESSAGE_YOURE_NUTS
LANG_ENGLISH		"You're nuts!"

REFERENCE			QUICKMESSAGE_ARE_YOU_CRAZY
LANG_ENGLISH		"Are you crazy?"

REFERENCE			QUICKMESSAGE_2_MULTIPLE_CONTACTS
LANG_ENGLISH		"2. Multiple contacts!"

REFERENCE			QUICKMESSAGE_5_WATCH_SIX
LANG_ENGLISH		"5. Watch your six!"

REFERENCE			QUICKMESSAGE_ENEMIES_SPOTTED
LANG_ENGLISH		"Multiple contacts!"

REFERENCE			QUICKMESSAGE_WATCH_SIX
LANG_ENGLISH		"Watch your six!"

REFERENCE			QUICKMESSAGE_COME_ON
LANG_ENGLISH		"Come on."

REFERENCE			PLATFORM_DYK_IW4_MSG40
LANG_ENGLISH		"Your matches are being automatically recorded. You can watch them at the theater menu."

REFERENCE			PLATFORM_DYK_IW4_MSG41
LANG_ENGLISH		"Don't want to level up? Check out the unlock stats feature at the barracks menu."

REFERENCE			PLATFORM_DYK_IW4_MSG42
LANG_ENGLISH		"Check out the store menu for the latest downloadable content."

REFERENCE			PLATFORM_DYK_IW4_MSG43
LANG_ENGLISH		"You can adjust your field of view at the video options."

REFERENCE			PLATFORM_DYK_IW4_MSG44
LANG_ENGLISH		"If you like a specific server, you can add it to your favorites."

REFERENCE			PERKS_PAINKILLER
LANG_ENGLISH		"Juiced"

REFERENCE			PERKS_DESC_COMBATHIGH
LANG_ENGLISH		"Move faster for a few seconds after spawning."

REFERENCE			PERKS_COMBATHIGH
LANG_ENGLISH		"Juiced"

REFERENCE			SPLASHES_COMBATHIGH_DESC
LANG_ENGLISH		"Move faster for a few seconds after spawning."

ENDMARKER
`;function WE(L){if(!LN[L])return L;const N=(L_+A_+R_).match(new RegExp(`${LN[L]}\\nLANG_ENGLISH\\s*"(.*?)"`));return N?N[1]:L}function RN(L){let E,N,n,_,R=WE(L[0][0].name)+"",A;return{c(){E=c("Favorite weapon:"),N=o("br"),n=M(),_=o("div"),A=c(R),i(_,"class","weapon svelte-1s3nnt")},m(e,G){s(e,E,G),s(e,N,G),s(e,n,G),s(e,_,G),a(_,A)},p(e,G){G&1&&R!==(R=WE(e[0][0].name)+"")&&f(A,R)},d(e){e&&l(E),e&&l(N),e&&l(n),e&&l(_)}}}function e_(L){let E,N,n,_,R=L[0].length&&RN(L);return{c(){E=o("div"),N=o("div"),R&&R.c(),n=M(),_=o("canvas"),i(N,"class","middle svelte-1s3nnt"),i(E,"class","chart-weapons svelte-1s3nnt")},m(A,e){s(A,E,e),a(E,N),R&&R.m(N,null),a(E,n),a(E,_),L[4](_)},p(A,[e]){A[0].length?R?R.p(A,e):(R=RN(A),R.c(),R.m(N,null)):R&&(R.d(1),R=null)},i:W,o:W,d(A){A&&l(E),R&&R.d(),L[4](null)}}}function G_(L,E,N){let{weapons:n,kills:_}=E,R,A;tE(()=>{N(3,A=new EE(R,{type:"doughnut",plugins:[hE],options:{backgroundColor:["rgba(255, 99, 132, 0.2)","rgba(255, 159, 64, 0.2)","rgba(255, 205, 86, 0.2)","rgba(75, 192, 192, 0.2)","rgba(54, 162, 235, 0.2)","rgba(153, 102, 255, 0.2)","rgba(171, 172, 173, 0.2)"],borderColor:["rgb(255, 99, 132)","rgb(255, 159, 64)","rgb(255, 205, 86)","rgb(75, 192, 192)","rgb(54, 162, 235)","rgb(153, 102, 255)","rgb(171, 172, 173)"],borderWidth:2,plugins:{legend:{display:!1},datalabels:{formatter(G,I){if(G<_.any.length*.025)return"";const t=I.dataIndex;return I.chart.data.labels[t]}}}},data:{labels:[],datasets:[{data:[]}]}}))});function e(G){eE[G?"unshift":"push"](()=>{R=G,N(1,R)})}return L.$$set=G=>{"weapons"in G&&N(0,n=G.weapons),"kills"in G&&N(2,_=G.kills)},L.$$.update=()=>{L.$$.dirty&9&&A&&(N(3,A.data.labels=n.map(({name:G})=>WE(G)),A),N(3,A.data.datasets[0].data=n.map(({kills:G})=>G),A),A.update())},[n,R,_,A,e]}class S_ extends B{constructor(E){super();y(this,E,G_,e_,Y,{weapons:0,kills:2})}}function I_(L){let E,N;return{c(){E=o("div"),N=o("canvas"),i(E,"class","chart svelte-jnsr7j")},m(n,_){s(n,E,_),a(E,N),L[4](N)},p:W,i:W,o:W,d(n){n&&l(E),L[4](null)}}}function t_(L,E,N){let{items:n,role:_}=E,R,A;const e={traitor:["255, 99, 132","191, 74, 99"],detective:["54, 162, 235","39, 118, 170"]};tE(()=>{N(3,A=new EE(R,{type:"bar",plugins:[hE],options:{maintainAspectRatio:!1,indexAxis:"y",borderWidth:1.5,interaction:{intersect:!0,mode:"point"},scales:{x:{stacked:!0},y:{stacked:!0,display:!1}},plugins:{legend:{display:!1},datalabels:{textAlign:"center",font(I){const t=I.dataIndex,S=I.dataset.data[t]/I.chart.options.scales.x.max;return{size:Math.min(Math.max(S*64,8),12)}},formatter(I,t){return I<t.chart.options.scales.x.max*.06?"":t.dataset.label.replace(" ",`
`)}}}},data:{labels:["Times bought"],datasets:[]}}))});function G(I){eE[I?"unshift":"push"](()=>{R=I,N(0,R)})}return L.$$set=I=>{"items"in I&&N(1,n=I.items),"role"in I&&N(2,_=I.role)},L.$$.update=()=>{L.$$.dirty&14&&A&&_&&(N(3,A.data.datasets=n.map(({name:I,count:t},S)=>({label:I,data:[t],backgroundColor:`rgba(${e[_][S%e[_].length]}, 0.2)`,borderColor:`rgb(${e[_][S%e[_].length]})`})),A),N(3,A.options.scales.x.max=n.reduce((I,{count:t})=>I+t,0)||1,A),A.update())},[R,n,_,A,G]}class AN extends B{constructor(E){super();y(this,E,t_,I_,Y,{items:1,role:2})}}function C_(L){let E,N,n=L[0].name+"",_,R,A=L[0].guid+"",e,G,I,t,S,H,C,r,F,m,U,P,h,w,GE,g,NE,$,k,nE,J,b;return S=new __({props:{player:L[0]}}),P=new AN({props:{items:L[0].stats.items.traitor,role:"traitor"}}),g=new AN({props:{items:L[0].stats.items.detective,role:"detective"}}),J=new S_({props:{weapons:L[0].stats.weapons,kills:L[0].stats.kills}}),{c(){E=o("h1"),N=o("span"),_=c(n),R=o("small"),e=c(A),G=M(),I=o("div"),t=o("div"),d(S.$$.fragment),H=M(),C=o("div"),r=o("h2"),r.textContent="Items",F=M(),m=o("h3"),m.textContent="Traitor",U=M(),d(P.$$.fragment),h=M(),w=o("h3"),w.textContent="Detective",GE=M(),d(g.$$.fragment),NE=M(),$=o("div"),k=o("h2"),k.textContent="Weapons",nE=M(),d(J.$$.fragment),pE(N,"margin-right","0.5em"),i(R,"class","svelte-1am9iu"),i(E,"class","svelte-1am9iu"),i(C,"class","items svelte-1am9iu"),i(t,"class","left svelte-1am9iu"),i($,"class","weapons svelte-1am9iu"),i(I,"class","row svelte-1am9iu")},m(D,K){s(D,E,K),a(E,N),a(N,_),a(E,R),a(R,e),s(D,G,K),s(D,I,K),a(I,t),u(S,t,null),a(t,H),a(t,C),a(C,r),a(C,F),a(C,m),a(C,U),u(P,C,null),a(C,h),a(C,w),a(C,GE),u(g,C,null),a(I,NE),a(I,$),a($,k),a($,nE),u(J,$,null),b=!0},p(D,[K]){(!b||K&1)&&n!==(n=D[0].name+"")&&f(_,n),(!b||K&1)&&A!==(A=D[0].guid+"")&&f(e,A);const SE={};K&1&&(SE.player=D[0]),S.$set(SE);const v={};K&1&&(v.items=D[0].stats.items.traitor),P.$set(v);const _E={};K&1&&(_E.items=D[0].stats.items.detective),g.$set(_E);const LE={};K&1&&(LE.weapons=D[0].stats.weapons),K&1&&(LE.kills=D[0].stats.kills),J.$set(LE)},i(D){b||(T(S.$$.fragment,D),T(P.$$.fragment,D),T(g.$$.fragment,D),T(J.$$.fragment,D),b=!0)},o(D){O(S.$$.fragment,D),O(P.$$.fragment,D),O(g.$$.fragment,D),O(J.$$.fragment,D),b=!1},d(D){D&&l(E),D&&l(G),D&&l(I),p(S),p(P),p(g),p(J)}}}function a_(L,E,N){let n,{evalData:_,guid:R}=E;return L.$$set=A=>{"evalData"in A&&N(1,_=A.evalData),"guid"in A&&N(2,R=A.guid)},L.$$.update=()=>{L.$$.dirty&6&&N(0,n=_.players.find(A=>A.guid===R))},[n,_,R]}class H_ extends B{constructor(E){super();y(this,E,a_,C_,Y,{evalData:1,guid:2})}}function eN(L,E,N){const n=L.slice();return n[2]=E[N],n}function r_(L){let E=L[2].name+"",N,n;return{c(){N=c(E),n=M()},m(_,R){s(_,N,R),s(_,n,R)},p(_,R){R&1&&E!==(E=_[2].name+"")&&f(N,E)},d(_){_&&l(N),_&&l(n)}}}function GN(L){let E,N;return E=new TE({props:{to:L[2].guid,class:!L[2].inRounds&&"no-data",$$slots:{default:[r_]},$$scope:{ctx:L}}}),{c(){d(E.$$.fragment)},m(n,_){u(E,n,_),N=!0},p(n,_){const R={};_&1&&(R.to=n[2].guid),_&1&&(R.class=!n[2].inRounds&&"no-data"),_&33&&(R.$$scope={dirty:_,ctx:n}),E.$set(R)},i(n){N||(T(E.$$.fragment,n),N=!0)},o(n){O(E.$$.fragment,n),N=!1},d(n){p(E,n)}}}function o_(L){let E;return{c(){E=o("div"),E.textContent="Select a player...",i(E,"class","select svelte-1p5k3oi")},m(N,n){s(N,E,n)},d(N){N&&l(E)}}}function i_(L){let E,N;return E=new H_({props:{evalData:L[0],guid:L[1].guid}}),{c(){d(E.$$.fragment)},m(n,_){u(E,n,_),N=!0},p(n,_){const R={};_&1&&(R.evalData=n[0]),_&2&&(R.guid=n[1].guid),E.$set(R)},i(n){N||(T(E.$$.fragment,n),N=!0)},o(n){O(E.$$.fragment,n),N=!1},d(n){p(E,n)}}}function F_(L){let E,N,n,_,R,A,e,G,I,t=L[0].players,S=[];for(let C=0;C<t.length;C+=1)S[C]=GN(eN(L,t,C));const H=C=>O(S[C],1,1,()=>{S[C]=null});return A=new CE({props:{path:"/",primary:!1,$$slots:{default:[o_]},$$scope:{ctx:L}}}),G=new CE({props:{path:":guid",$$slots:{default:[i_,({params:C})=>({1:C}),({params:C})=>C?2:0]},$$scope:{ctx:L}}}),{c(){E=o("section"),N=o("h2"),N.textContent="Players",n=M(),_=o("div");for(let C=0;C<S.length;C+=1)S[C].c();R=M(),d(A.$$.fragment),e=M(),d(G.$$.fragment),i(_,"class","player-list svelte-1p5k3oi"),i(E,"class","players svelte-1p5k3oi")},m(C,r){s(C,E,r),a(E,N),a(E,n),a(E,_);for(let F=0;F<S.length;F+=1)S[F].m(_,null);a(E,R),u(A,E,null),a(E,e),u(G,E,null),I=!0},p(C,[r]){if(r&1){t=C[0].players;let U;for(U=0;U<t.length;U+=1){const P=eN(C,t,U);S[U]?(S[U].p(P,r),T(S[U],1)):(S[U]=GN(P),S[U].c(),T(S[U],1),S[U].m(_,null))}for(z(),U=t.length;U<S.length;U+=1)H(U);Z()}const F={};r&32&&(F.$$scope={dirty:r,ctx:C}),A.$set(F);const m={};r&35&&(m.$$scope={dirty:r,ctx:C}),G.$set(m)},i(C){if(!I){for(let r=0;r<t.length;r+=1)T(S[r]);T(A.$$.fragment,C),T(G.$$.fragment,C),I=!0}},o(C){S=S.filter(Boolean);for(let r=0;r<S.length;r+=1)O(S[r]);O(A.$$.fragment,C),O(G.$$.fragment,C),I=!1},d(C){C&&l(E),Q(S,C),p(A),p(G)}}}function P_(L,E,N){let{evalData:n}=E;return L.$$set=_=>{"evalData"in _&&N(0,n=_.evalData)},[n]}class s_ extends B{constructor(E){super();y(this,E,P_,F_,Y,{evalData:0})}}function SN(L,E,N){const n=L.slice();return n[7]=E[N].player,n[8]=E[N].value,n[10]=N,n}function IN(L,E,N){const n=L.slice();return n[7]=E[N].player,n[8]=E[N].value,n[10]=N,n}function l_(L){let E,N;return{c(){E=o("span"),N=c(L[0]),i(E,"class","title")},m(n,_){s(n,E,_),a(E,N)},p(n,_){_&1&&f(N,n[0])},i:W,o:W,d(n){n&&l(E)}}}function M_(L){let E,N;return E=new qE({props:{text:L[1],$$slots:{default:[T_]},$$scope:{ctx:L}}}),{c(){d(E.$$.fragment)},m(n,_){u(E,n,_),N=!0},p(n,_){const R={};_&2&&(R.text=n[1]),_&4097&&(R.$$scope={dirty:_,ctx:n}),E.$set(R)},i(n){N||(T(E.$$.fragment,n),N=!0)},o(n){O(E.$$.fragment,n),N=!1},d(n){p(E,n)}}}function T_(L){let E,N;return{c(){E=o("span"),N=c(L[0]),i(E,"class","title")},m(n,_){s(n,E,_),a(E,N)},p(n,_){_&1&&f(N,n[0])},d(n){n&&l(E)}}}function tN(L){let E,N;return{c(){E=o("span"),N=c(L[2]),i(E,"class","emoji")},m(n,_){s(n,E,_),a(E,N)},p(n,_){_&4&&f(N,n[2])},d(n){n&&l(E)}}}function O_(L){let E;return{c(){E=o("div"),E.textContent="No data available.",i(E,"class","no-data svelte-1xjb38n")},m(N,n){s(N,E,n)},p:W,d(N){N&&l(E)}}}function m_(L){let E,N,n;const _=[c_,U_],R=[];function A(e,G){return e[4]?1:0}return E=A(L),N=R[E]=_[E](L),{c(){N.c(),n=wE()},m(e,G){R[E].m(e,G),s(e,n,G)},p(e,G){let I=E;E=A(e),E===I?R[E].p(e,G):(z(),O(R[I],1,1,()=>{R[I]=null}),Z(),N=R[E],N?N.p(e,G):(N=R[E]=_[E](e),N.c()),T(N,1),N.m(n.parentNode,n))},d(e){R[E].d(e),e&&l(n)}}}function U_(L){let E,N,n,_=L[3],R=[];for(let A=0;A<_.length;A+=1)R[A]=CN(SN(L,_,A));return{c(){E=o("div");for(let A=0;A<R.length;A+=1)R[A].c();i(E,"class","other svelte-1xjb38n")},m(A,e){s(A,E,e);for(let G=0;G<R.length;G+=1)R[G].m(E,null);n=!0},p(A,e){if(e&8){_=A[3];let G;for(G=0;G<_.length;G+=1){const I=SN(A,_,G);R[G]?R[G].p(I,e):(R[G]=CN(I),R[G].c(),R[G].m(E,null))}for(;G<R.length;G+=1)R[G].d(1);R.length=_.length}},i(A){n||(A&&XE(()=>{N||(N=sE(E,lE,{},!0)),N.run(1)}),n=!0)},o(A){A&&(N||(N=sE(E,lE,{},!1)),N.run(0)),n=!1},d(A){A&&l(E),Q(R,A),A&&N&&N.end()}}}function c_(L){let E,N,n,_=L[3].slice(0,3),R=[];for(let A=0;A<_.length;A+=1)R[A]=aN(IN(L,_,A));return{c(){E=o("div");for(let A=0;A<R.length;A+=1)R[A].c();i(E,"class","podium svelte-1xjb38n")},m(A,e){s(A,E,e);for(let G=0;G<R.length;G+=1)R[G].m(E,null);n=!0},p(A,e){if(e&8){_=A[3].slice(0,3);let G;for(G=0;G<_.length;G+=1){const I=IN(A,_,G);R[G]?R[G].p(I,e):(R[G]=aN(I),R[G].c(),R[G].m(E,null))}for(;G<R.length;G+=1)R[G].d(1);R.length=_.length}},i(A){n||(A&&XE(()=>{N||(N=sE(E,lE,{},!0)),N.run(1)}),n=!0)},o(A){A&&(N||(N=sE(E,lE,{},!1)),N.run(0)),n=!1},d(A){A&&l(E),Q(R,A),A&&N&&N.end()}}}function CN(L){let E,N,n=OE(L[10],L[3])+"",_,R,A,e=L[7].name+"",G,I,t,S=L[8]+"",H,C;return{c(){E=o("div"),N=o("span"),_=c(n),R=M(),A=o("span"),G=c(e),I=M(),t=o("span"),H=c(S),C=o("span"),i(N,"class","place svelte-1xjb38n"),i(A,"class","name svelte-1xjb38n"),i(t,"class","value svelte-1xjb38n"),i(E,"class","placement svelte-1xjb38n")},m(r,F){s(r,E,F),a(E,N),a(N,_),a(E,R),a(E,A),a(A,G),a(E,I),a(E,t),a(t,H),a(t,C)},p(r,F){F&8&&n!==(n=OE(r[10],r[3])+"")&&f(_,n),F&8&&e!==(e=r[7].name+"")&&f(G,e),F&8&&S!==(S=r[8]+"")&&f(H,S)},d(r){r&&l(E)}}}function aN(L){let E,N,n=OE(L[10],L[3])+"",_,R,A,e=L[7].name+"",G,I,t,S=L[8]+"",H,C;return{c(){E=o("div"),N=o("span"),_=c(n),R=M(),A=o("span"),G=c(e),I=M(),t=o("span"),H=c(S),C=o("span"),i(N,"class","place svelte-1xjb38n"),i(A,"class","name svelte-1xjb38n"),i(t,"class","value svelte-1xjb38n"),i(E,"class","placement svelte-1xjb38n")},m(r,F){s(r,E,F),a(E,N),a(N,_),a(E,R),a(E,A),a(A,G),a(E,I),a(E,t),a(t,H),a(t,C)},p(r,F){F&8&&n!==(n=OE(r[10],r[3])+"")&&f(_,n),F&8&&e!==(e=r[7].name+"")&&f(G,e),F&8&&S!==(S=r[8]+"")&&f(H,S)},d(r){r&&l(E)}}}function D_(L){let E,N,n,_,R,A,e,G,I,t;const S=[M_,l_],H=[];function C(P,h){return P[1]?0:1}n=C(L),_=H[n]=S[n](L);let r=L[2]&&tN(L);function F(P,h){return P[3].length?m_:O_}let m=F(L),U=m(L);return{c(){E=o("button"),N=o("h3"),_.c(),R=M(),r&&r.c(),A=M(),e=o("div"),U.c(),i(N,"class","svelte-1xjb38n"),i(e,"class","placements svelte-1xjb38n"),i(E,"class","leaderboard svelte-1xjb38n"),PE(E,"extended",L[4])},m(P,h){s(P,E,h),a(E,N),H[n].m(N,null),a(N,R),r&&r.m(N,null),a(E,A),a(E,e),U.m(e,null),G=!0,I||(t=V(E,"click",L[6]),I=!0)},p(P,[h]){let w=n;n=C(P),n===w?H[n].p(P,h):(z(),O(H[w],1,1,()=>{H[w]=null}),Z(),_=H[n],_?_.p(P,h):(_=H[n]=S[n](P),_.c()),T(_,1),_.m(N,R)),P[2]?r?r.p(P,h):(r=tN(P),r.c(),r.m(N,null)):r&&(r.d(1),r=null),m===(m=F(P))&&U?U.p(P,h):(U.d(1),U=m(P),U&&(U.c(),U.m(e,null))),h&16&&PE(E,"extended",P[4])},i(P){G||(T(_),G=!0)},o(P){O(_),G=!1},d(P){P&&l(E),H[n].d(),r&&r.d(),U.d(),I=!1,t()}}}function OE(L,E){const N=E[L].value;let n=E.slice(0,L).findIndex(_=>N===_.value);return n===-1&&(n=L),n<3?["\u{1F947}","\u{1F948}","\u{1F949}"][n]:n+1+"."}function d_(L,E,N){const n=pN();let{title:_,tooltip:R=null,emoji:A=null,placements:e=[]}=E,{extended:G}=E;const I=()=>n("extend",!G);return L.$$set=t=>{"title"in t&&N(0,_=t.title),"tooltip"in t&&N(1,R=t.tooltip),"emoji"in t&&N(2,A=t.emoji),"placements"in t&&N(3,e=t.placements),"extended"in t&&N(4,G=t.extended)},[_,R,A,e,G,n,I]}class u_ extends B{constructor(E){super();y(this,E,d_,D_,Y,{title:0,tooltip:1,emoji:2,placements:3,extended:4})}}function HN(L,E,N){const n=L.slice();return n[8]=E[N].heading,n[9]=E[N].boards,n}function rN(L,E,N){const n=L.slice();return n[12]=E[N],n}function oN(L,E,N){const n=L.slice();return n[15]=E[N],n}function iN(L){let E,N;const n=[L[15],{extended:L[2]===L[15]}];function _(...A){return L[5](L[15],...A)}let R={};for(let A=0;A<n.length;A+=1)R=uE(R,n[A]);return E=new u_({props:R}),E.$on("extend",_),{c(){d(E.$$.fragment)},m(A,e){u(E,A,e),N=!0},p(A,e){L=A;const G=e&13?hN(n,[e&9&&gN(L[15]),{extended:L[2]===L[15]}]):{};E.$set(G)},i(A){N||(T(E.$$.fragment,A),N=!0)},o(A){O(E.$$.fragment,A),N=!1},d(A){p(E,A)}}}function FN(L){let E,N,n=L[12],_=[];for(let A=0;A<n.length;A+=1)_[A]=iN(oN(L,n,A));const R=A=>O(_[A],1,1,()=>{_[A]=null});return{c(){E=o("div");for(let A=0;A<_.length;A+=1)_[A].c();i(E,"class","column svelte-nbu2ys")},m(A,e){s(A,E,e);for(let G=0;G<_.length;G+=1)_[G].m(E,null);N=!0},p(A,e){if(e&13){n=A[12];let G;for(G=0;G<n.length;G+=1){const I=oN(A,n,G);_[G]?(_[G].p(I,e),T(_[G],1)):(_[G]=iN(I),_[G].c(),T(_[G],1),_[G].m(E,null))}for(z(),G=n.length;G<_.length;G+=1)R(G);Z()}},i(A){if(!N){for(let e=0;e<n.length;e+=1)T(_[e]);N=!0}},o(A){_=_.filter(Boolean);for(let e=0;e<_.length;e+=1)O(_[e]);N=!1},d(A){A&&l(E),Q(_,A)}}}function PN(L){let E,N=L[8]+"",n,_,R,A,e=sN(L[9],L[0]),G=[];for(let t=0;t<e.length;t+=1)G[t]=FN(rN(L,e,t));const I=t=>O(G[t],1,1,()=>{G[t]=null});return{c(){E=o("h2"),n=c(N),_=M(),R=o("div");for(let t=0;t<G.length;t+=1)G[t].c();i(R,"class","group svelte-nbu2ys")},m(t,S){s(t,E,S),a(E,n),s(t,_,S),s(t,R,S);for(let H=0;H<G.length;H+=1)G[H].m(R,null);A=!0},p(t,S){if((!A||S&8)&&N!==(N=t[8]+"")&&f(n,N),S&13){e=sN(t[9],t[0]);let H;for(H=0;H<e.length;H+=1){const C=rN(t,e,H);G[H]?(G[H].p(C,S),T(G[H],1)):(G[H]=FN(C),G[H].c(),T(G[H],1),G[H].m(R,null))}for(z(),H=e.length;H<G.length;H+=1)I(H);Z()}},i(t){if(!A){for(let S=0;S<e.length;S+=1)T(G[S]);A=!0}},o(t){G=G.filter(Boolean);for(let S=0;S<G.length;S+=1)O(G[S]);A=!1},d(t){t&&l(E),t&&l(_),t&&l(R),Q(G,t)}}}function p_(L){let E,N,n,_,R,A,e,G,I,t=L[3],S=[];for(let C=0;C<t.length;C+=1)S[C]=PN(HN(L,t,C));const H=C=>O(S[C],1,1,()=>{S[C]=null});return{c(){E=o("section");for(let C=0;C<S.length;C+=1)S[C].c();N=M(),n=o("p"),_=c(`Players must have been active in the previous
		`),R=o("strong"),R.textContent=`${gE.leaderboards.maxDaysSinceLastSeen} days`,A=c(` or have played at least
		`),e=o("strong"),e.textContent=`${gE.leaderboards.minRounds} rounds`,G=c(" to be listed on the leaderboards."),i(n,"class","note svelte-nbu2ys"),i(E,"class","leaderboards svelte-nbu2ys")},m(C,r){s(C,E,r);for(let F=0;F<S.length;F+=1)S[F].m(E,null);a(E,N),a(E,n),a(n,_),a(n,R),a(n,A),a(n,e),a(n,G),L[6](E),I=!0},p(C,[r]){if(r&13){t=C[3];let F;for(F=0;F<t.length;F+=1){const m=HN(C,t,F);S[F]?(S[F].p(m,r),T(S[F],1)):(S[F]=PN(m),S[F].c(),T(S[F],1),S[F].m(E,N))}for(z(),F=t.length;F<S.length;F+=1)H(F);Z()}},i(C){if(!I){for(let r=0;r<t.length;r+=1)T(S[r]);I=!0}},o(C){S=S.filter(Boolean);for(let r=0;r<S.length;r+=1)O(S[r]);I=!1},d(C){C&&l(E),Q(S,C),L[6](null)}}}function sN(L,E){return L.reduce((N,n,_)=>(N[_%E].push(n),N),[...Array(E)].map(()=>[]))}function h_(L,E,N){let n,{data:_}=E,R,A=1,e;tE(()=>{R=new ResizeObserver(S=>{const H=S[0].contentRect.width;N(0,A=parseInt(H/900+1))}),R.observe(e)}),fN(()=>{R.disconnect()});let G=null;const I=(S,{detail:H})=>{H?N(2,G=S):N(2,G=null)};function t(S){eE[S?"unshift":"push"](()=>{e=S,N(1,e)})}return L.$$set=S=>{"data"in S&&N(4,_=S.data)},L.$$.update=()=>{L.$$.dirty&16&&N(3,n=[{heading:"Kills",boards:[{title:"Kills",emoji:"\u2694\uFE0F",placements:_.kills},{title:"Adjusted KDR",emoji:"\u2797",tooltip:"Enemy kills \xF7 (Deaths + Teamkills)",placements:_.kdrAdjusted},{title:"Headshot Kills",tooltip:"% of bullet weapon kills via headshots",emoji:"\u{1F92F}",placements:_.headshotPct},{title:"Neck-romancer",tooltip:"% of bullet weapon kills via shots in the neck<br>(deals no extra damage)",emoji:"\u{1F992}",placements:_.neckKillsPct},{title:"Multi Kills",tooltip:"Times 2+ kills were achieved with < 5 seconds between each",emoji:"\u{1F465}",placements:_.multiKills},{title:"BOMB Multi-Kills",tooltip:"2+ kills with one explosion",emoji:"\u{1F4A3}",placements:_.bombMultiKills},{title:"Explosive Kills",emoji:"\u{1F4A5}",placements:_.explosiveKills},{title:"Environmental Kills",tooltip:"Kills with explosive barrels or cars",emoji:"\u{1F6E2}\uFE0F",placements:_.environmentalKills},{title:"ROCKET LAUNCHER Direct Hits",emoji:"\u{1F3AF}",placements:_.rpgDirectHitKills},{title:"Revolver.",tooltip:"Kills achieved with .44 Magnum",emoji:"\u{1F52B}",placements:_.revolverKills}]},{heading:"Deaths",boards:[{title:"Deaths",emoji:"\u2620\uFE0F",placements:_.deaths},{title:"Suicides",emoji:"\u{1F644}",placements:_.suicides},{title:"Times Fallen to Death",emoji:"\u{1FA82}",placements:_.fallingSuicides},{title:"ATTACK HELICOPTER Suicides",emoji:"\u{1F681}",placements:_.attackHeliSuicides}]},{heading:"Traitor Rounds",boards:[{title:"Fastest Traitor Round Win",emoji:"\u23F1\uFE0F",placements:_.traitorRoundWinTime},{title:"Slowpoke",tooltip:"% of traitor rounds lost by timelimit",emoji:"\u{1F40C}",placements:_.traitorRoundsLostTimelimitCount},{title:"Cheapskate",tooltip:"Traitor rounds won without spending any credits",emoji:"\u{1F911}",placements:_.traitorNoItemsWonRoundCount},{title:"Least RADARs bought",tooltip:"As % of total traitor items bought by this player",emoji:"\u{1F6F0}\uFE0F",placements:[..._.radarsBoughtPct].reverse()},{title:"First Blood as Traitor",tooltip:"% of this player's traitor rounds where they made the first kill",emoji:"\u{1FA78}",placements:_.traitorRoundsFirstBlood},{title:"Most Traitor Aces",tooltip:"Rounds won by killing all innocent single-handedly",emoji:"\u2660\uFE0F",placements:_.traitorRoundsAced}]},{heading:"Other",boards:[{title:"Chat Messages Sent",emoji:"\u{1F4AC}",placements:_.chatMessages}]}])},[A,e,G,n,_,I,t]}class g_ extends B{constructor(E){super();y(this,E,h_,p_,Y,{data:4})}}function f_(L){let E,N;return E=new jE({props:{$$slots:{default:[W_]},$$scope:{ctx:L}}}),{c(){d(E.$$.fragment)},m(n,_){u(E,n,_),N=!0},p(n,_){const R={};_&512&&(R.$$scope={dirty:_,ctx:n}),E.$set(R)},i(n){N||(T(E.$$.fragment,n),N=!0)},o(n){O(E.$$.fragment,n),N=!1},d(n){p(E,n)}}}function W_(L){let E,N,n=L[8]+"",_;return{c(){E=c("Error loading statistics data:"),N=o("br"),_=c(n)},m(R,A){s(R,E,A),s(R,N,A),s(R,_,A)},p:W,d(R){R&&l(E),R&&l(N),R&&l(_)}}}function K_(L){let E,N;return E=new yN({props:{history:L[3],$$slots:{default:[k_]},$$scope:{ctx:L}}}),{c(){d(E.$$.fragment)},m(n,_){u(E,n,_),N=!0},p(n,_){const R={};_&519&&(R.$$scope={dirty:_,ctx:n}),E.$set(R)},i(n){N||(T(E.$$.fragment,n),N=!0)},o(n){O(E.$$.fragment,n),N=!1},d(n){p(E,n)}}}function lN(L){let E,N,n,_,R,A;return E=new CE({props:{path:"/*",$$slots:{default:[B_]},$$scope:{ctx:L}}}),n=new CE({props:{path:"/players/*",$$slots:{default:[y_]},$$scope:{ctx:L}}}),R=new CE({props:{path:"/leaderboards/*",$$slots:{default:[Y_]},$$scope:{ctx:L}}}),{c(){d(E.$$.fragment),N=M(),d(n.$$.fragment),_=M(),d(R.$$.fragment)},m(e,G){u(E,e,G),s(e,N,G),u(n,e,G),s(e,_,G),u(R,e,G),A=!0},p(e,G){const I={};G&516&&(I.$$scope={dirty:G,ctx:e}),E.$set(I);const t={};G&516&&(t.$$scope={dirty:G,ctx:e}),n.$set(t);const S={};G&516&&(S.$$scope={dirty:G,ctx:e}),R.$set(S)},i(e){A||(T(E.$$.fragment,e),T(n.$$.fragment,e),T(R.$$.fragment,e),A=!0)},o(e){O(E.$$.fragment,e),O(n.$$.fragment,e),O(R.$$.fragment,e),A=!1},d(e){p(E,e),e&&l(N),p(n,e),e&&l(_),p(R,e)}}}function B_(L){let E,N;return E=new Qn({props:{evalData:L[2]}}),{c(){d(E.$$.fragment)},m(n,_){u(E,n,_),N=!0},p(n,_){const R={};_&4&&(R.evalData=n[2]),E.$set(R)},i(n){N||(T(E.$$.fragment,n),N=!0)},o(n){O(E.$$.fragment,n),N=!1},d(n){p(E,n)}}}function y_(L){let E,N;return E=new s_({props:{evalData:L[2]}}),{c(){d(E.$$.fragment)},m(n,_){u(E,n,_),N=!0},p(n,_){const R={};_&4&&(R.evalData=n[2]),E.$set(R)},i(n){N||(T(E.$$.fragment,n),N=!0)},o(n){O(E.$$.fragment,n),N=!1},d(n){p(E,n)}}}function Y_(L){let E,N;return E=new g_({props:{data:L[2].leaderboards}}),{c(){d(E.$$.fragment)},m(n,_){u(E,n,_),N=!0},p(n,_){const R={};_&4&&(R.data=n[2].leaderboards),E.$set(R)},i(n){N||(T(E.$$.fragment,n),N=!0)},o(n){O(E.$$.fragment,n),N=!1},d(n){p(E,n)}}}function k_(L){let E,N,n,_,R,A,e,G,I;function t(C){L[7](C)}let S={};L[0]!==void 0&&(S.filters=L[0]),_=new kn({props:S}),eE.push(()=>YN(_,"filters",t));let H=L[1]&&lN(L);return G=new Kn({}),{c(){E=o("main"),N=o("h1"),N.textContent="Trouble in Terrorist Town \u2014 Statistics",n=M(),d(_.$$.fragment),A=M(),H&&H.c(),e=M(),d(G.$$.fragment),i(N,"class","svelte-atfxw6"),i(E,"class","svelte-atfxw6")},m(C,r){s(C,E,r),a(E,N),a(E,n),u(_,E,null),a(E,A),H&&H.m(E,null),s(C,e,r),u(G,C,r),I=!0},p(C,r){const F={};!R&&r&1&&(R=!0,F.filters=C[0],kN(()=>R=!1)),_.$set(F),C[1]?H?(H.p(C,r),r&2&&T(H,1)):(H=lN(C),H.c(),T(H,1),H.m(E,null)):H&&(z(),O(H,1,1,()=>{H=null}),Z())},i(C){I||(T(_.$$.fragment,C),T(H),T(G.$$.fragment,C),I=!0)},o(C){O(_.$$.fragment,C),O(H),O(G.$$.fragment,C),I=!1},d(C){C&&l(E),p(_),H&&H.d(),C&&l(e),p(G,C)}}}function b_(L){let E,N;return E=new jE({props:{$$slots:{default:[v_]},$$scope:{ctx:L}}}),{c(){d(E.$$.fragment)},m(n,_){u(E,n,_),N=!0},p(n,_){const R={};_&512&&(R.$$scope={dirty:_,ctx:n}),E.$set(R)},i(n){N||(T(E.$$.fragment,n),N=!0)},o(n){O(E.$$.fragment,n),N=!1},d(n){p(E,n)}}}function v_(L){let E;return{c(){E=c("Loading & parsing data...")},m(N,n){s(N,E,n)},d(N){N&&l(E)}}}function V_(L){let E,N,n={ctx:L,current:null,token:null,hasCatch:!0,pending:b_,then:K_,catch:f_,error:8,blocks:[,,,]};return WN(L[4],n),{c(){E=wE(),n.block.c()},m(_,R){s(_,E,R),n.block.m(_,n.anchor=R),n.mount=()=>E.parentNode,n.anchor=E,N=!0},p(_,[R]){L=_,KN(n,L,R)},i(_){N||(T(n.block),N=!0)},o(_){for(let R=0;R<3;R+=1){const A=n.blocks[R];O(A)}N=!1},d(_){_&&l(E),n.block.d(_),n.token=null,n=null}}}function w_(L,E,N){let n,_,R;const A=BN(Un());let e,G;const I=zN();I.then(S=>ZN(S)).then(S=>N(5,e=S)).catch(S=>console.error(S));function t(S){G=S,N(0,G)}return L.$$.update=()=>{L.$$.dirty&33&&N(1,n=e&&G&&qN(e.rounds,G)),L.$$.dirty&32&&N(6,_=e&&[...e.players.values()].filter(({isBot:S})=>!S).sort((S,H)=>S.name.localeCompare(H.name))),L.$$.dirty&66&&N(2,R=n&&_&&En(n,_))},[G,n,R,A,I,e,_,t]}class X_ extends B{constructor(E){super();y(this,E,w_,V_,Y,{})}}new X_({target:document.getElementById("app")});EE.defaults.font.family=getComputedStyle(document.documentElement).getPropertyValue("--font");function MN(){const L=getComputedStyle(document.documentElement);EE.defaults.color=`rgb(${L.getPropertyValue("--col-text")}`,EE.defaults.borderColor=`rgb(${L.getPropertyValue("--col-bg1")})`,Object.values(EE.instances).forEach(E=>E.update())}const x_=window.matchMedia("(prefers-color-scheme: dark)");MN();x_.addEventListener("change",MN);
