(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{10:function(e,t,a){e.exports=a(21)},21:function(e,t,a){"use strict";a.r(t);var n=a(0),l=a.n(n),c=a(9),r=a.n(c),o=a(5),s=a.n(o),i=a(7),u=a(3),m=function(e){for(var t=e.postsPerPage,a=e.totalPosts,n=e.paginate,c=[],r=1;r<=Math.ceil(a/t);r++)c.push(r);return l.a.createElement("nav",{style:{backgroundColor:"#6d3088"}},l.a.createElement("ul",{className:"Pages"},c.map(function(e){return l.a.createElement("li",{key:e,className:"page-item"},l.a.createElement("a",{onClick:function(){return n(e)},href:"#!",className:"page-link"},e))})))},p=(a(6),function(e){var t=e.videoarr;return l.a.createElement("div",{className:"table"},l.a.createElement("ul",{className:"Full"},t.map(function(e){return l.a.createElement("li",{key:e.uri,className:"Videos"},l.a.createElement("iframe",{src:e.player_embed_url,allow:"autoplay;fullscreen;picture-in-picture",width:"384",height:"216",allowFullScreen:!0,title:"Test Recording"}),l.a.createElement("p",null,l.a.createElement("strong",null,"Name")," : ",e.name),l.a.createElement("p",null,l.a.createElement("strong",null,"Plays")," : ",e.stats.plays),l.a.createElement("p",null,l.a.createElement("strong",null,"Comments")," : ",e.metadata.connections.comments.total))})))});var d=function(){var e=Object(n.useState)([]),t=Object(u.a)(e,2),a=t[0],c=t[1],r=Object(n.useState)(1),o=Object(u.a)(r,2),d=o[0],f=o[1],E=Object(n.useState)(2),v=Object(u.a)(E,1)[0],b=Object(n.useState)(0),h=Object(u.a)(b,2),g=h[0],j=h[1];Object(n.useEffect)(function(){function e(){return(e=Object(i.a)(s.a.mark(function e(){var t,a;return s.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=4,fetch("https://api.vimeo.com/me/videos",{headers:{Authorization:"Bearer ".concat("a2c4b3de90fa383f2bc05d70ce966e1d")}});case 4:return t=e.sent,e.next=7,t.json();case 7:a=e.sent,console.log(a),j(a.data.length),console.log(g),c(a.data);case 12:case"end":return e.stop()}},e)}))).apply(this,arguments)}!function(){e.apply(this,arguments)}()},[]);var N=d*v,O=N-v,y=a.slice(O,N);return l.a.createElement("div",{className:"Centre"},l.a.createElement("h2",{className:"Top"},"Video Details"),l.a.createElement("div",null,l.a.createElement(p,{videoarr:y})),l.a.createElement(m,{postsPerPage:v,totalPosts:g,paginate:function(e){return f(e)}}))};var f=function(){var e=Object(n.useState)("no file exists"),t=Object(u.a)(e,2),a=t[0],c=t[1],r=Object(n.useState)("awaiting file upload"),o=Object(u.a)(r,2),m=o[0],p=o[1],d=Object(n.useState)("Enter File Name"),f=Object(u.a)(d,2),E=f[0],v=f[1],b=Object(n.useRef)(null),h=Object(n.useRef)(null);function g(){return(g=Object(i.a)(s.a.mark(function e(){var t,n,l;return s.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return p("uploading"),e.next=3,fetch("https://api.vimeo.com/me/videos",{method:"POST",headers:{Authorization:"bearer a2c4b3de90fa383f2bc05d70ce966e1d","Content-Type":"application/json",Accept:"application/vnd.vimeo.*+json;version=3.4"},body:JSON.stringify({upload:{approach:"tus",size:a.size},name:E})});case 3:return t=e.sent,e.next=6,t.json();case 6:return n=e.sent,console.log(t),e.next=10,fetch(n.upload.upload_link,{method:"PATCH",headers:{"Tus-Resumable":"1.0.0","Upload-Offset":"0","Content-Type":"application/offset+octet-stream",Accept:"application/vnd.vimeo.*+json;version=3.4"},body:a});case 10:l=e.sent,console.log(l),p("complete");case 13:case"end":return e.stop()}},e)}))).apply(this,arguments)}return Object(n.useEffect)(function(){"complete"===m&&setTimeout(function(){p("awaiting file upload"),b.current.value="",h.current.value="untitled"},3e3)},[m]),l.a.createElement("div",null,l.a.createElement("main",null,l.a.createElement("h2",{className:"Top"},"Vimeo upload"),l.a.createElement("div",{className:"Videoup"},l.a.createElement("input",{ref:b,onChange:function(e){return c(e.target.files[0])},type:"file"}),l.a.createElement("br",null),l.a.createElement("p",null,l.a.createElement("input",{ref:h,value:E,onChange:function(e){return v(e.target.value)},type:"text"})),l.a.createElement("button",{className:"Buttons",onClick:function(){return g.apply(this,arguments)}},"Upload Video"),l.a.createElement("p",null,l.a.createElement("strong",null,"Upload status:")," ",m))))},E=a(4);var v=function(){return l.a.createElement("ul",{className:"NavL"},l.a.createElement("li",{className:"Nav"},l.a.createElement(E.b,{to:"/"},"Home")),l.a.createElement("li",{className:"Nav"},l.a.createElement(E.b,{to:"/VideoDetails"},"Video Details")),l.a.createElement("li",{className:"Nav"},l.a.createElement(E.b,{to:"/VideoUpload"},"Upload Video")))};var b=function(){return l.a.createElement("div",null,"This is the homepage.")},h=a(1);function g(){return l.a.createElement("div",{className:"MAIN"},l.a.createElement("h1",{className:"Head"},"Vimeo Dashboard"),l.a.createElement(v,null),l.a.createElement(h.c,null,l.a.createElement(h.a,{path:"/*"},l.a.createElement(h.a,{index:!0,element:l.a.createElement(b,null)}),l.a.createElement(h.a,{exact:!0,path:"VideoDetails",element:l.a.createElement(d,null)}),l.a.createElement(h.a,{exact:!0,path:"VideoUpload",element:l.a.createElement(f,null)}))))}r.a.createRoot(document.getElementById("root")).render(l.a.createElement(E.a,null,l.a.createElement(g,null)))},6:function(e,t,a){}},[[10,1,2]]]);
//# sourceMappingURL=main.0f6994f7.chunk.js.map