(function(t){function a(a){for(var n,i,o=a[0],c=a[1],l=a[2],h=0,d=[];h<o.length;h++)i=o[h],Object.prototype.hasOwnProperty.call(r,i)&&r[i]&&d.push(r[i][0]),r[i]=0;for(n in c)Object.prototype.hasOwnProperty.call(c,n)&&(t[n]=c[n]);u&&u(a);while(d.length)d.shift()();return s.push.apply(s,l||[]),e()}function e(){for(var t,a=0;a<s.length;a++){for(var e=s[a],n=!0,o=1;o<e.length;o++){var c=e[o];0!==r[c]&&(n=!1)}n&&(s.splice(a--,1),t=i(i.s=e[0]))}return t}var n={},r={app:0},s=[];function i(a){if(n[a])return n[a].exports;var e=n[a]={i:a,l:!1,exports:{}};return t[a].call(e.exports,e,e.exports,i),e.l=!0,e.exports}i.m=t,i.c=n,i.d=function(t,a,e){i.o(t,a)||Object.defineProperty(t,a,{enumerable:!0,get:e})},i.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,a){if(1&a&&(t=i(t)),8&a)return t;if(4&a&&"object"===typeof t&&t&&t.__esModule)return t;var e=Object.create(null);if(i.r(e),Object.defineProperty(e,"default",{enumerable:!0,value:t}),2&a&&"string"!=typeof t)for(var n in t)i.d(e,n,function(a){return t[a]}.bind(null,n));return e},i.n=function(t){var a=t&&t.__esModule?function(){return t["default"]}:function(){return t};return i.d(a,"a",a),a},i.o=function(t,a){return Object.prototype.hasOwnProperty.call(t,a)},i.p="/itp-courses/";var o=window["webpackJsonp"]=window["webpackJsonp"]||[],c=o.push.bind(o);o.push=a,o=o.slice();for(var l=0;l<o.length;l++)a(o[l]);var u=c;s.push([0,"chunk-vendors"]),e()})({0:function(t,a,e){t.exports=e("56d7")},"16a1":function(t,a,e){t.exports=e.p+"img/instructions4.8034985c.png"},2775:function(t,a,e){"use strict";var n=e("3a40"),r=e.n(n);r.a},"3a40":function(t,a,e){},"3a48":function(t,a,e){var n={"./instructions1.png":"bf03","./instructions2.png":"fce9","./instructions3.png":"a595","./instructions4.png":"16a1"};function r(t){var a=s(t);return e(a)}function s(t){if(!e.o(n,t)){var a=new Error("Cannot find module '"+t+"'");throw a.code="MODULE_NOT_FOUND",a}return n[t]}r.keys=function(){return Object.keys(n)},r.resolve=s,t.exports=r,r.id="3a48"},"3e37":function(t,a,e){"use strict";var n=e("b647"),r=e.n(n);r.a},4666:function(t,a,e){"use strict";var n=e("484e"),r=e.n(n);r.a},"484e":function(t,a,e){},"48cc":function(t,a,e){},"4c08":function(t,a,e){"use strict";var n=e("85f8"),r=e.n(n);r.a},"56d7":function(t,a,e){"use strict";e.r(a);e("cadf"),e("551c"),e("f751"),e("097d");var n=e("2b0e"),r=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{attrs:{id:"app"}},[t._m(0),e("Galaxies"),e("h2",[t._v(t._s(t.selectedGalaxy.title))]),e("Detail"),e("Descriptions"),e("Instructions")],1)},s=[function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{attrs:{id:"header"}},[e("h1",[t._v("Forty Years of ITP Classes")]),e("em",[t._v("data by "),e("span",{staticClass:"name"},[t._v("Jim Schmitz")]),t._v(" // visualizations by "),e("span",{staticClass:"name"},[t._v("Shirley Wu")])])])}],i=e("5698"),o=e("2ef0"),c=e.n(o),l=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{attrs:{id:"galaxies"}},[e("div",{staticClass:"scrollContainer"},[e("div",{ref:"scroll",style:{width:446*t.galaxies.length-22+"px"}},[e("div",{staticClass:"otherGalaxies"},t._l(t.prevGalaxies,(function(a){return e("Galaxy",t._b({key:a.id},"Galaxy",{galaxy:a},!1))})),1),e("div",{staticClass:"selectedGalaxy"},[e("Galaxy",t._b({},"Galaxy",{galaxy:t.galaxy},!1))],1),e("div",{staticClass:"otherGalaxies"},t._l(t.nextGalaxies,(function(a){return e("Galaxy",t._b({key:a.id},"Galaxy",{galaxy:a},!1))})),1)])])])},u=[],h=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"galaxy",style:{opacity:t.galaxy===t.selectedGalaxy?1:.75,paddingTop:t.galaxy===t.selectedGalaxy?"5px":"0px",backgroundColor:t.galaxy===t.selectedGalaxy?"#fff":"#f0f0f0"},on:{click:function(a){return t.$store.commit("setGalaxy",t.galaxy)}}},[e("svg",{attrs:{width:t.width,height:t.height}},[t._l(t.planets,(function(a){return e("Planet",t._b({},"Planet",{d:a},!1))})),t._l(t.stars,(function(a){return e("Star",t._b({},"Star",{d:a},!1))}))],2),t.galaxy!==t.selectedGalaxy?e("div",{staticClass:"title"},[t._v(t._s(t.galaxy.title))]):t._e()])},d=[],f=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("g",{staticClass:"planet",attrs:{transform:"translate("+t.d.x+", "+t.d.y+")scale("+t.d.r+")\n  rotate("+(t.d.rotate+(t.twinkle?t.twinkleRotation:0))+")"}},[e("path",{attrs:{d:t.circlePath(),fill:"#fff",stroke:"#333","stroke-width":.75/t.d.r}}),t.d.ring?e("path",{attrs:{d:"M1,0 A1.25,0.25 0 1 1 -1,0",fill:"none",stroke:"#333","stroke-width":2/t.d.r}}):t._e(),t.d.line?e("line",{attrs:{x1:"-1.5",x2:"1.5",stroke:"#333","stroke-width":2/t.d.r}}):t._e()])},p=[],y=e("237d"),g=e.n(y),x={name:"planet",props:["d"],data:function(){return{twinkleRotation:2*(this.d.rotate<0?-1:1)*c.a.random(this.d.rotate)}},computed:{twinkle:function(){return this.$store.state.twinkle}},methods:{circlePath:function(){var t="";return c.a.times(11,(function(a){var e=a*(Math.PI/5),n=g.a.prototype.randomGaussian(Math.cos(e),.03),r=g.a.prototype.randomGaussian(Math.sin(e),.03);t+=0===a?"M".concat(n,",").concat(r):"A 1,1 0 1 0 ".concat(n,",").concat(r)})),"".concat(t)}}},m=x,v=(e("ee08"),e("2877")),w=Object(v["a"])(m,f,p,!1,null,"776dcd8c",null),b=w.exports,k=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("path",{staticClass:"star",attrs:{d:"tech"===t.d.type?t.starPath():"person"===t.d.type?t.asteriskPath():t.circlePath(),fill:"thing"===t.d.type?"#333":"#fff",stroke:"#333","stroke-width":1.5/t.d.r,transform:"translate("+t.d.x+", "+t.d.y+")scale("+t.d.r+")\n    rotate("+(t.d.rotate+(t.twinkle?t.twinkleRotation:0))+")"}})},S=[],$={name:"star",props:["d"],data:function(){return{twinkleRotation:c.a.random(30,45)}},computed:{twinkle:function(){return"thing"!==this.d.type&&this.$store.state.twinkle}},methods:{starPath:function(){var t=1,a=.5,e="";return c.a.times(30,(function(n){var r=n%2?t:a,s=n*(Math.PI/5),i=0===n?"M":"L",o=g.a.prototype.randomGaussian(r*Math.cos(s),.05),c=g.a.prototype.randomGaussian(r*Math.sin(s),.05);e+="".concat(i," ").concat(o,",").concat(c)})),"".concat(e,"Z")},asteriskPath:function(){var t="";return c.a.times(12,(function(a){var e=g.a.prototype.randomGaussian(a*(Math.PI/4),.1);t+="\n          M".concat(c.a.round(Math.cos(e),2),",").concat(c.a.round(Math.sin(e),2),"\n          L").concat(c.a.round(Math.cos(e+Math.PI),2),",").concat(c.a.round(Math.sin(e+Math.PI),2))})),t},circlePath:function(){var t="";return c.a.times(11,(function(a){var e=a*(Math.PI/5),n=g.a.prototype.randomGaussian(Math.cos(e),.03),r=g.a.prototype.randomGaussian(Math.sin(e),.03);t+=0===a?"M".concat(n,",").concat(r):"A 1,1 0 1 0 ".concat(n,",").concat(r)})),"".concat(t)}}},G=$,O=(e("4666"),Object(v["a"])(G,k,S,!1,null,"77d83bcb",null)),M=O.exports,j=400,C=200,P={top:40,right:40,bottom:40,left:40},B={name:"overview",props:["galaxy"],components:{Planet:b,Star:M},data:function(){return{planets:[],stars:[],width:j,height:C}},mounted:function(){this.simulation=i["e"]().force("x",i["f"]((function(t){return t.forceX}))).force("y",i["g"]((function(t){return t.forceY}))).force("collide",i["d"]((function(t){return 2*t.r}))).stop(),this.xScale=i["l"]().range([P.left,j-P.right]),this.yScale=i["l"]().range([P.top,C-P.bottom]),this.calculateData()},computed:{radiusScale:function(){return this.$store.getters.radiusScale},selectedGalaxy:function(){return this.$store.state.galaxy}},watch:{galaxy:function(){this.calculateData()}},methods:{calculateData:function(){var t=this;if(this.galaxy){var a=this.galaxy,e=a.words,n=a.classes,r=i["c"](c.a.union(e,n),(function(t){return t.medianYear})),s=i["c"](e,(function(t){return t.medianRank}));this.xScale.domain(r),this.yScale.domain(s);var o=c.a.chain(e).map("ranks").flatten().sortBy().value(),l=this.yScale(i["j"](o));this.planets=c.a.chain(n).sortBy((function(t){return-t.count})).map((function(a,e){var r=a.medianYear,s=a.count,i=a.id,o=(a.title,t.xScale(r)),u=l;return{id:i,x:o,y:u,forceX:o,forceY:u,r:t.radiusScale(s),rotate:(e%2?-1:1)*c.a.random(30),ring:e<n.length/4,line:.75*n.length<e}})).value(),this.stars=c.a.chain(e).sortBy((function(t){return-t.count})).map((function(a){var e=a.medianRank,n=a.medianYear,r=a.count,s=a.id,i=a.type,o=t.xScale(n),l=t.yScale(e);return{id:s,x:o,y:l,forceX:o,forceY:l,r:t.radiusScale(r)/("thing"===i?6:2),rotate:c.a.random(180),type:i}})).value(),this.simulation.nodes(c.a.union(this.planets,this.stars)).alpha(1),c.a.times(300,(function(a){return t.simulation.tick()}))}}}},T=B,Y=(e("2775"),Object(v["a"])(T,h,d,!1,null,null,null)),A=Y.exports,D={name:"app",components:{Galaxy:A},computed:{galaxies:function(){return this.$store.state.galaxies},galaxy:function(){return this.$store.state.galaxy},prevGalaxies:function(){var t=c.a.indexOf(this.galaxies,this.galaxy);return c.a.slice(this.galaxies,0,t)},nextGalaxies:function(){var t=c.a.indexOf(this.galaxies,this.galaxy);return c.a.slice(this.galaxies,t+1,this.galaxies.length)}}},I=D,E=(e("3e37"),Object(v["a"])(I,l,u,!1,null,"c96a3838",null)),R=E.exports,H=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{attrs:{id:"detail"}},[e("svg",{staticClass:"years",attrs:{width:t.width,height:t.height}},[e("defs",[e("pattern",{attrs:{id:"texture",patternUnits:"userSpaceOnUse",width:"8",height:"8"}},[e("path",{attrs:{d:"M 0,8 l 8,-8 M -2,2 l 4,-4 M 6,10 l 4,-4","stroke-width":"1","shape-rendering":"auto",stroke:"#cfcfcf","stroke-linecap":"square"}})])]),e("g",{attrs:{transform:"translate(0, "+t.rectsTop+")"}},[e("rect",{staticStyle:{fill:'url("#texture")'},attrs:{x:t.rect.x,width:t.rect.width,height:t.rect.height},on:{click:function(a){return t.$store.commit("setYear",t.d.year)}}})])]),e("svg",{staticClass:"classes",attrs:{width:t.width,height:t.classesHeight}},[t._l(t.planets,(function(a){return e("g",{attrs:{transform:"translate(0, "+a.y+")"}},[e("circle",{attrs:{cx:a.x1,r:"2.5"}}),e("line",{attrs:{x1:a.x2,x2:a.x2,y1:"-2.5",y2:"2.5",stroke:"#333"}}),e("line",{attrs:{x1:a.x1,x2:a.x2,stroke:"#333","stroke-width":"2"}}),e("Planet",t._b({},"Planet",{d:a.planet},!1)),e("g",{attrs:{transform:"translate("+(a.x2+8)+", 0)"}},[e("text",{attrs:{dy:a.text.titleY+"em"}},[t._v(t._s(a.text.title))]),e("text",{staticClass:"years",attrs:{opacity:a.text.yearOpacity,dy:"1em"}},[t._v(t._s(a.text.year1)+"\n          "),a.text.year1!==a.text.year2?e("tspan",[t._v(" - "+t._s(a.text.year2))]):t._e()])])],1)})),e("g",{ref:"xAxis",attrs:{transform:"translate(0, "+t.axisY+")"}})],2),e("svg",{staticClass:"words",attrs:{width:t.width,height:t.wordsHeight}},[e("g",{attrs:{transform:"translate(0, "+t.wordsTop+")"}},t._l(t.stars,(function(a){return e("g",{attrs:{transform:"translate(0, "+a.y+")"}},[e("path",{attrs:{d:a.path,fill:"none",stroke:"#999","stroke-dasharray":"5"}}),t._l(a.stars,(function(a){return e("Star",t._b({},"Star",{d:a},!1))})),e("text",{attrs:{x:a.x2+10,y:a.y2,dy:".35em"}},[t._v(t._s(a.word))])],2)})),0)]),e("div",{ref:"scrollContainer",staticClass:"scrollContainer",style:{height:t.docHeight+"px"}},[e("svg",{attrs:{width:t.width,height:t.height}},t._l(t.rects,(function(a){return e("rect",{attrs:{x:a.x,width:a.width,height:a.height,fill:"#f0f0f0",opacity:"0"},on:{click:function(e){return t.$store.commit("setYear",a.year)}}})})),0)])])},L=[],F=(e("7514"),e("768b")),q=e("cffa"),z={top:20,right:200,bottom:20,left:40},U=1466,J=420,W=14,X={name:"detail",components:{Planet:b,Star:M},data:function(){return{docHeight:U,height:U,planets:[],stars:[],rects:[],rect:{},axisY:0,classesHeight:0,wordsHeight:0,wordsTop:0,rectsTop:0}},mounted:function(){this.xScale=i["l"]().domain([1980,2020]).range([z.left,this.width-z.right]),this.xAxis=i["a"]().tickFormat((function(t){return t})).tickSizeOuter(0),this.$refs.scrollContainer.addEventListener("scroll",this.handleScroll),this.tl=new q["a"]({paused:!0}),this.calculateData(),this.calculateRects(),this.renderAxis(),this.calculateScroll()},destroyed:function(){this.$refs.scrollContainer.removeEventListener("scroll",this.handleScroll)},computed:{galaxy:function(){return this.$store.state.galaxy},classes:function(){return this.$store.getters.classesForGalaxy},words:function(){return this.$store.getters.wordsForGalaxy},radiusScale:function(){return this.$store.getters.radiusScale},width:function(){return this.$store.state.width},years:function(){return this.$store.state.years},year:function(){return this.$store.state.year}},watch:{galaxy:function(){this.initializeScroll(),this.calculateData(),this.calculateRects(),this.calculateScroll()},year:function(){this.calculateRects()}},methods:{calculateData:function(){var t=this;if(this.galaxy){var a=z.top;this.planets=c.a.chain(this.classes).sortBy((function(t){return i["k"](t,(function(t){return t.year}))})).map((function(e,n){var r=i["k"](e,(function(t){return t.year})),s=i["i"](e,(function(a){return t.years[Math.min(c.a.indexOf(t.years,a.year)+1,t.years.length-1)]})),o=t.xScale(r),l=t.radiusScale(e.length),u=Math.max(2*l+10,28);return a+=u,{planet:{x:o,y:0,r:l},x1:o,x2:t.xScale(s),y:a-u/2,text:{year1:r,year2:s,title:c.a.maxBy(e,"year").title,yearOpacity:1,titleY:0},count:e.length}})).sortBy((function(t){var a=t.count;return-a})).map((function(a,e){return Object.assign(a,{planet:Object.assign(a.planet,{ring:e<.25*t.classes.length,line:.75*t.classes.length<e,rotate:(e%2?-1:1)*c.a.random(30)})})})).sortBy((function(t){var a=t.y;return a})).value(),this.axisY=a+=z.bottom/2,this.classesHeight=a+z.bottom,a=z.top,this.stars=c.a.chain(this.words).sortBy((function(t){return t[0].year})).map((function(e,n){var r=i["c"](e,(function(t){return t.rank})),s=Object(F["a"])(r,2),o=s[0],l=s[1],u=Math.max(l-o+20,28);a+=u;var h="",d=c.a.chain(e).sortBy((function(t){return t.year})).map((function(a,n){var r=t.xScale(a.year),s=0===n?"M":"L";return h+="".concat(s," ").concat(r,",").concat(a.rank-o),{x:r,y:a.rank-o,type:a.type,r:t.radiusScale(e.length)/("thing"===a.type?4:2),rotate:c.a.random(180)}})).value();return{stars:d,path:h,y:a-u-10,x2:c.a.last(d).x,y2:c.a.last(d).y,word:e[0].word}})).value(),this.wordsHeight=a+J,this.height=this.classesHeight+this.wordsHeight}},calculateRects:function(){var t=this;this.galaxy&&(this.rects=c.a.map(this.galaxy.years,(function(a){var e=t.years[c.a.indexOf(t.years,a)+1]||2020,n=t.xScale(a);return{x:n,width:t.xScale(e)-n,y:0,height:t.height,year:a}})),this.rect=c.a.find(this.rects,(function(a){return a.year===t.year})))},renderAxis:function(){this.xAxis.scale(this.xScale),i["n"](this.$refs.xAxis).call(this.xAxis).selectAll("text").style("user-select","none")},initializeScroll:function(){this.wordsTop=0,this.rectsTop=0,this.$refs.scrollContainer.scrollTop=0},handleScroll:function(){var t=this.$refs.scrollContainer.scrollTop,a=this.height-U;if(!(t>a)){var e=t/a;this.tl.progress(e)}},calculateScroll:function(){this.tl.clear();var t=.4;this.tl.staggerTo(c.a.map(this.planets,"planet"),t/2,{r:0},0,0),this.tl.staggerTo(this.planets,t,{cycle:{y:function(t){return t*W+z.top}}},0,0);var a=this.planets.length*W+z.top+z.bottom;this.tl.to(this.$data,t,{classesHeight:a,axisY:a-z.bottom},0),this.tl.staggerTo(c.a.map(this.planets,"text"),t/3,{yearOpacity:0},0,0),this.tl.staggerTo(c.a.map(this.planets,"text"),t,{titleY:.35},0,0),this.tl.to(this.$data,1,{rectsTop:-this.height+U-J+z.bottom/2,wordsTop:-this.wordsHeight+(U-a)},0)}}},N=X,Z=(e("4c08"),Object(v["a"])(N,H,L,!1,null,"5023ab82",null)),K=Z.exports,Q=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{attrs:{id:"descriptions"}},[e("div",{staticClass:"scrollContainer"},[e("div",{ref:"scroll",style:{width:t.descriptions.length*(t.width+32)+"px"}},t._l(t.descriptions,(function(a){return e("div",{staticClass:"description",style:{width:t.width+"px"}},[e("h3",[t._v(t._s(a.title))]),e("div",{staticClass:"byline"},[t._v("taught by "+t._s(a.instructor.join(", "))+" in "+t._s(a.year))]),e("p",t._l(a.description,(function(a){var n=a.phrase,r=a.highlight;return e("span",{class:r?"word":""},[t._v("\n            "+t._s(n)+"\n          ")])})),0)])})),0)])])},V=[],tt=(e("6762"),e("2fdb"),e("28a5"),{name:"descriptions",data:function(){return{width:300}},computed:{descriptions:function(){return c.a.map(this.$store.getters.descriptions,(function(t){var a=t.title,e=t.instructor,n=t.year,r=t.description,s=t.words;return s=c.a.map(s,"word"),r=c.a.reduce(s,(function(t,a){return t.split(a).join("<split>".concat(a,"<split>"))}),r),r=c.a.map(r.split("<split>"),(function(t){return{phrase:t,highlight:c.a.includes(s,t)}})),{title:a,instructor:e,year:n,description:r}}))}}}),at=tt,et=(e("a480"),Object(v["a"])(at,Q,V,!1,null,"55f9d088",null)),nt=et.exports,rt=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{style:{display:t.display},attrs:{id:"instructions"},on:{click:function(a){return t.$store.commit("setDisplayInstructions","none")}}},t._l(t.images,(function(t){return e("img",{style:{height:"100vh",opacity:t.opacity},attrs:{src:t.src}})})),0)},st=[],it=4,ot={name:"instructions",data:function(){return{images:_.times(it,(function(t){return{src:e("3a48")("./instructions".concat(t+1,".png")),opacity:0}}))}},computed:{display:function(){return this.$store.state.displayInstructions},galaxies:function(){return this.$store.state.galaxies}},watch:{display:function(){"block"===this.display?this.tl.restart():"none"===this.display&&this.tl.stop()}},mounted:function(){var t=this,a=5,e=2;this.tl=new q["a"]({paused:!0}),_.each(this.images,(function(n,r){t.tl.to(n,e,{opacity:1},r*a),t.tl.to(n,e,{opacity:0},(r+1)*a)})),_.each([2,1,0],(function(e,n){t.tl.add((function(){t.$store.commit("setGalaxy",t.galaxies[e])}),(.4+.2*n)*a)})),_.each([1992,2011,2e3],(function(e,n){t.tl.add((function(){t.$store.commit("setYear",e)}),(2.4+.2*n)*a)})),this.tl.add((function(){t.$store.commit("setDisplayInstructions","none")}))}},ct=ot,lt=(e("8781"),Object(v["a"])(ct,rt,st,!1,null,"00251c7e",null)),ut=lt.exports,ht={name:"app",components:{Galaxies:R,Detail:K,Descriptions:nt,Instructions:ut},data:function(){return{hovered:null}},created:function(){this.$store.dispatch("getRawData")},mounted:function(){var t=this;this.sinceLastActivity=0,document.addEventListener("mousemove",this.registerActivity),c.a.map(document.querySelectorAll(".scrollContainer"),(function(a){a.addEventListener("scroll",t.registerActivity)})),this.$store.dispatch("startTimer")},computed:{selectedGalaxy:function(){return this.$store.state.galaxy||{}}},methods:{registerActivity:function(){this.$store.dispatch("resetActivity")}}},dt=ht,ft=(e("9e36"),Object(v["a"])(dt,r,s,!1,null,"26bdfa70",null)),pt=ft.exports,yt=(e("ac6a"),e("5df3"),e("2f62"));n["a"].use(yt["a"]);var gt=0,xt=new yt["a"].Store({state:{width:1080,height:1920,classes:[],words:[],galaxies:[],galaxy:null,years:[],year:1980,twinkle:!1,displayInstructions:"none"},getters:{nodes:function(t){var a=t.galaxies;if(a.length)return c.a.chain(a).map((function(t){var a=t.classes,e=t.words;return c.a.union(a,e)})).flatten().value()},radiusScale:function(t,a){var e=a.nodes,n=i["c"](e,(function(t){return t.count}));return i["m"]().domain(n).range([5,20])},classesForGalaxy:function(t){var a=t.galaxy,e=t.classes;if(a){var n=c.a.groupBy(e,"course");return c.a.map(a.classes,(function(t){var a=t.id;return n[a]}))}},wordsForGalaxy:function(t){var a=t.galaxy,e=t.words;if(a){var n=c.a.groupBy(e,"word");return c.a.map(a.words,(function(t){var a=t.id;return n[a]}))}},descriptions:function(t){var a=t.galaxy,e=t.classes,n=t.year;if(a)return c.a.chain(a.classes).map((function(t){var a=t.id;return c.a.find(e,(function(t){return t.course===a&&t.year===n}))})).filter().value()}},mutations:{setClasses:function(t,a){t.classes=a},setWords:function(t,a){t.words=a},setGalaxies:function(t,a){t.galaxies=a},setGalaxy:function(t,a){t.galaxy=a,t.year=a.years[0]},setYears:function(t,a){t.years=a},setYear:function(t,a){t.year=a},toggleTwinkle:function(t){t.twinkle=!t.twinkle},setDisplayInstructions:function(t,a){t.displayInstructions!==a&&(t.displayInstructions=a,gt=0)}},actions:{getRawData:function(t){var a=t.commit;Promise.all([i["h"]("./classes.json"),i["h"]("./words.json"),i["b"]("./groups.csv")]).then((function(t,e){var n=Object(F["a"])(t,3),r=n[0],s=n[1],o=n[2],l=c.a.keyBy(r,"id"),u=c.a.keyBy(s,"id");c.a.each(r,(function(t){return Object.assign(t,{words:c.a.map(t.words,(function(t){return u[t]||t}))})})),c.a.each(s,(function(t){return Object.assign(t,{courses:c.a.map(t.courses,(function(t){return l[t]}))})}));var h=c.a.groupBy(r,"course"),d=c.a.keyBy(o,"id"),f=c.a.chain(r).filter((function(t){return t.words.length})).groupBy("group").map((function(t,a){t=c.a.chain(t).map((function(t){var a=t.course;return h[a]})).flatten().uniqBy("id").value();var e=c.a.chain(t).map("year").flatten().uniq().sortBy().value(),n=c.a.chain(t).map("words").flatten().filter().groupBy("word").filter((function(t){return t.length>1})).map((function(t){var e=c.a.chain(t).map("rank").sortBy().value(),n=c.a.chain(t).map("year").sortBy().value();return{id:t[0].word,count:t.length,type:t[0].type,ranks:e,years:n,medianRank:i["j"](e),medianYear:i["j"](n),group:a}})).value();return t=c.a.chain(t).groupBy("course").filter((function(t){return 2018===t[0].year||t.length>1})).map((function(t){t=c.a.sortBy(t,"year");var e=c.a.chain(t).map("year").sortBy().value();return{id:t[0].course,count:t.length,medianYear:i["j"](e),title:c.a.last(t).title,group:a}})).value(),{id:a,title:d[a].title,classes:t,words:n,years:e}})).filter((function(t){return t.classes.length&&t.words.length})).sortBy((function(t){return-t.classes.length-t.words.length})).value(),p=c.a.chain(r).map("year").uniq().value();a("setYears",p),a("setClasses",r),a("setWords",s),a("setGalaxies",f),a("setGalaxy",f[0])}))},startTimer:function(t){var a=t.commit,e=600;setInterval((function(){a("toggleTwinkle"),gt+=e,gt>3e4&&a("setDisplayInstructions","block")}),e)},resetActivity:function(){gt=0}}});n["a"].config.productionTip=!1,new n["a"]({store:xt,render:function(t){return t(pt)}}).$mount("#app")},"6f9e":function(t,a,e){},"85f8":function(t,a,e){},8781:function(t,a,e){"use strict";var n=e("48cc"),r=e.n(n);r.a},"9e36":function(t,a,e){"use strict";var n=e("d0ae"),r=e.n(n);r.a},a480:function(t,a,e){"use strict";var n=e("6f9e"),r=e.n(n);r.a},a595:function(t,a,e){t.exports=e.p+"img/instructions3.e9a84cec.png"},b647:function(t,a,e){},b817:function(t,a,e){},bf03:function(t,a,e){t.exports=e.p+"img/instructions1.98bd0992.png"},d0ae:function(t,a,e){},ee08:function(t,a,e){"use strict";var n=e("b817"),r=e.n(n);r.a},fce9:function(t,a,e){t.exports=e.p+"img/instructions2.f0ad1307.png"}});
//# sourceMappingURL=app.21f748d5.js.map