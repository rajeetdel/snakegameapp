(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{10:function(e,t,a){"use strict";a.r(t);var s=a(3),n=a(4),i=a(7),r=a(5),o=a(1),l=a(8),c=a(0),h=a.n(c),m=a(6),u=a.n(m);a(16);function v(e){var t="grid-cell \n".concat(e.ratCell?"grid-cell--rat":""," \n").concat(e.snakeCell?"grid-cell--snake":"","\n");return h.a.createElement("div",{className:t,style:{height:e.size+"px",width:e.size+"px"}})}function d(e,t){if(!e||!t||e.length!==t.length)return!1;for(var a=!0,s=0;s<e.length;s++)e[s]!==t[s]&&(a=!1);return a}var k=function(e){function t(e){var a;return Object(s.a)(this,t),(a=Object(i.a)(this,Object(r.a)(t).call(this,e))).state={snake:[],rat:[],status:0,direction:39},a.SnakeonProwl=a.SnakeonProwl.bind(Object(o.a)(a)),a.doesntOverlap=a.doesntOverlap.bind(Object(o.a)(a)),a.setDirection=a.setDirection.bind(Object(o.a)(a)),a.moveRat=a.moveRat.bind(Object(o.a)(a)),a.hadRat=a.hadRat.bind(Object(o.a)(a)),a.startGame=a.startGame.bind(Object(o.a)(a)),a.endGame=a.endGame.bind(Object(o.a)(a)),a.removeTimers=a.removeTimers.bind(Object(o.a)(a)),a}return Object(l.a)(t,e),Object(n.a)(t,[{key:"setDirection",value:function(e){var t=this,a=e.keyCode,s=!0;[[38,40],[37,39]].forEach(function(e){e.indexOf(t.state.direction)>-1&&e.indexOf(a)>-1&&(s=!1)}),s&&this.setState({direction:a})}},{key:"moveRat",value:function(){this.moveRatTimeout&&clearTimeout(this.moveRatTimeout);var e=parseInt(Math.random()*this.numCells),t=parseInt(Math.random()*this.numCells);this.setState({rat:[e,t]}),this.moveRatTimeout=setTimeout(this.moveRat,5e3)}},{key:"isValid",value:function(e){return e[0]>-1&&e[1]>-1&&e[0]<this.numCells&&e[1]<this.numCells}},{key:"SnakeonProwl",value:function(){var e=this,t=[];switch(this.state.direction){case 40:t[0]=[this.state.snake[0][0],this.state.snake[0][1]+1];break;case 38:t[0]=[this.state.snake[0][0],this.state.snake[0][1]-1];break;case 39:t[0]=[this.state.snake[0][0]+1,this.state.snake[0][1]];break;case 37:t[0]=[this.state.snake[0][0]-1,this.state.snake[0][1]]}[].push.apply(t,this.state.snake.slice(1).map(function(t,a){return e.state.snake[a]})),this.setState({snake:t}),this.hadRat(t),this.isValid(t[0])&&this.doesntOverlap(t)||this.endGame()}},{key:"hadRat",value:function(e){if(d(e[0],this.state.rat)){var t,a,s,n=e[e.length-1],i=[[-1,0],[0,-1],[1,0],[0,1]];e.length>1&&(i[0]=(a=n,s=e[e.length-2],a.map(function(e,t){return e-s[t]})));for(var r=0;r<i.length&&(t=[n[0]+i[r][0],n[1]+i[r][1]],!this.isValid(t));r++);this.setState({snake:e.concat([t]),rat:[]}),this.moveRat()}}},{key:"doesntOverlap",value:function(e){return 0===e.slice(1).filter(function(t){return d(e[0],t)}).length}},{key:"startGame",value:function(){this.removeTimers(),this.SnakeonProwlInterval=setInterval(this.SnakeonProwl,150),this.moveRat(),this.setState({status:1,snake:[[5,5]],rat:[10,10]}),this.el.focus()}},{key:"endGame",value:function(){this.removeTimers(),this.setState({status:2})}},{key:"removeTimers",value:function(){this.SnakeonProwlInterval&&clearInterval(this.SnakeonProwlInterval),this.moveRatTimeout&&clearTimeout(this.moveRatTimeout)}},{key:"componentWillUnmount",value:function(){this.removeTimers()}},{key:"render",value:function(){var e=this;this.numCells=Math.floor(this.props.size/15);var t,a=this.props.size/this.numCells,s=Array.from(Array(this.numCells).keys()),n=s.map(function(t){return s.map(function(s){var n=e.state.rat[0]===s&&e.state.rat[1]===t,i=e.state.snake.filter(function(e){return e[0]===s&&e[1]===t});return i=i.length&&i[0],h.a.createElement(v,{ratCell:n,snakeCell:i,size:a,key:s+" "+t})})});return 0===this.state.status?t=h.a.createElement("div",{className:"snake-app__overlay"},h.a.createElement("button",{onClick:this.startGame},"Start game!")):2===this.state.status&&(t=h.a.createElement("div",{className:"snake-app__overlay"},h.a.createElement("div",{className:"mb-1"},h.a.createElement("b",null,"GAME OVER!")),h.a.createElement("div",{className:"mb-1"},"Your score: ",this.state.snake.length," "),h.a.createElement("button",{onClick:this.startGame},"Start a new game"))),h.a.createElement("div",{className:"snake-app",onKeyDown:this.setDirection,style:{width:this.props.size+"px",height:this.props.size+"px"},ref:function(t){return e.el=t},tabIndex:-1},t,h.a.createElement("div",{className:"grid",style:{width:this.props.size+"px",height:this.props.size+"px"}},n))}}]),t}(h.a.Component);u.a.render(h.a.createElement(k,{size:350}),document.getElementById("root"))},16:function(e,t,a){},9:function(e,t,a){e.exports=a(10)}},[[9,1,2]]]);
//# sourceMappingURL=main.5fbc1da6.chunk.js.map