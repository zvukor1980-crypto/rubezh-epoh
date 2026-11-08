const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const callbacks={},listeners={},vars={};let height=91,resizes=0,ready=false;
function el(){return {children:[],append(...c){this.children.push(...c)},prepend(c){this.children.unshift(c)},setAttribute(){},getBoundingClientRect(){return {height}},style:{}};}
const tap=el(),body=el();const doc={readyState:'interactive',body,createElement:el,getElementById:id=>ready&&id==='rz-tap'?tap:null,addEventListener:(n,f)=>callbacks[n]=f,documentElement:{style:{setProperty:(k,v)=>vars[k]=v}}};
const win={rzLang:'ru',addEventListener:(n,f)=>listeners[n]=f,dispatchEvent:e=>{resizes++;listeners[e.type]?.()}};
vm.runInNewContext(fs.readFileSync('portal.js','utf8'),{document:doc,window:win,Event:class{constructor(type){this.type=type}},navigator:{},setTimeout,clearTimeout});
assert.equal(body.children.length,0,'wait for the game splash to exist');ready=true;callbacks.DOMContentLoaded();assert.equal(tap.children.length,4);assert.equal(vars['--portal-height'],'91px');
height=78;listeners.orientationchange();assert.equal(vars['--portal-height'],'78px');assert.equal(resizes,0,'web toolbar never resizes the game');
height=57;listeners.resize();assert.equal(vars['--portal-height'],'57px');
assert.equal(body.children.filter(x=>x.id==='portal-tools').length,0);
const tools=tap.children.find(x=>x.id==='portal-tools');assert(tools);listeners['rubezh-started']();assert.equal(tools.hidden,true);assert.equal(vars['--portal-height'],'0px');listeners.resize();assert.equal(vars['--portal-height'],'0px');
const html=fs.readFileSync('index.html','utf8');assert(html.includes('<button type="button" class="go">'));assert(html.includes("closest('.go')"));
console.log('PASS: toolbar belongs to splash, disappears on start, reserves zero game space after rotation');
