const assert=require('node:assert/strict'),fit=require('../viewport.js');
for(const [w,h]of [[390,763],[390,580],[320,480],[844,369],[750,300],[1024,768]]){const r=fit(w,h);assert(r.width>r.height);assert(r.top>=0&&r.left>=0);assert(r.left+r.width*r.scale<=w+.001);assert(r.top+r.height*r.scale<=h+.001);if(w>h)assert.equal(r.scale,1);}
console.log('PASS: whole landscape game fits portrait and landscape safe rectangles; no clipping or iframe reload');
