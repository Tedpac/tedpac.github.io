(()=>{const i=[{minWidth:1400,size:1,brightness:.8,yOffset:0},{minWidth:1200,size:.9,brightness:.75,yOffset:0},{minWidth:992,size:.9,brightness:.7,yOffset:0},{minWidth:768,size:.8,brightness:.6,yOffset:.06},{minWidth:576,size:.8,brightness:.55,yOffset:.065},{minWidth:0,size:.7,brightness:.55,yOffset:.055}],t={mouseControls:!0,touchControls:!0,gyroControls:!1,minHeight:200,minWidth:200,backgroundColor:0};class n{#i=document.getElementById("animationContainer");#t=null;#n=null;static getViewportWidth(){return window.innerWidth}static getAnimationBreakpoint(){return i.find((i=>n.getViewportWidth()>=i.minWidth))}#e(){const i=n.getAnimationBreakpoint();this.#t=VANTA.HALO({...t,el:this.#i,size:i.size,yOffset:i.yOffset}),this.#i.style.filter=`brightness(${i.brightness})`,this.#n=n.getViewportWidth()}#s(){null!==this.#t&&(this.#t.destroy(),this.#t=null)}#a(){n.getViewportWidth()!==this.#n&&(this.#s(),this.#e())}#r(){const i=function(i,t){let n;return function(){for(var t=arguments.length,e=new Array(t),s=0;s<t;s++)e[s]=arguments[s];clearTimeout(n),n=setTimeout((()=>{i.apply(this,e)}),200)}}(this.#a.bind(this));new ResizeObserver(((t,n)=>{i()})).observe(this.#i)}startAnimation(){if(null!==this.#t)throw new Error("The animation has already been started.");this.#e(),this.#r()}}(new n).startAnimation()})();