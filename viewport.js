(function(){'use strict';
// Preserve the known-working landscape UI. Resizing the same iframe keeps the battle alive.
function fit(width,height){const portrait=height>width;const w=portrait?844:width,h=portrait?390:height;const scale=Math.min(width/w,height/h);return {portrait,width:w,height:h,scale,left:(width-w*scale)/2,top:Math.max(0,(height-h*scale)/2)};}
if(typeof module!=='undefined'&&module.exports){module.exports=fit;return;}
const surface=document.getElementById('surface'),frame=document.getElementById('game-frame');
function resize(){const r=surface.getBoundingClientRect(),v=fit(r.width,r.height);surface.classList.toggle('portrait',v.portrait);Object.assign(frame.style,{width:v.width+'px',height:v.height+'px',left:v.left+'px',top:v.top+'px',transform:'scale('+v.scale+')'});}
new ResizeObserver(resize).observe(surface);window.addEventListener('orientationchange',resize);resize();
})();
