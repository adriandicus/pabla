!function(){"use strict";var e="undefined"==typeof window?global:window;if("function"!=typeof e.require){var t={},n={},r={},a={}.hasOwnProperty,i=/^\.\.?(\/|$)/,s=function(e,t){for(var n,r=[],a=(i.test(t)?e+"/"+t:t).split("/"),s=0,o=a.length;o>s;s++)n=a[s],".."===n?r.pop():"."!==n&&""!==n&&r.push(n);return r.join("/")},o=function(e){return e.split("/").slice(0,-1).join("/")},u=function(t){return function(n){var r=s(o(t),n);return e.require(r,t)}},l=function(e,t){var r={id:e,exports:{}};return n[e]=r,t(r.exports,u(e),r),r.exports},c=function(e){return r[e]?c(r[e]):e},d=function(e,r){null==r&&(r="/");var i=c(e);if(a.call(n,i))return n[i].exports;if(a.call(t,i))return l(i,t[i]);throw new Error("Cannot find module '"+e+"' from '"+r+"'")};d.alias=function(e,t){r[t]=e},d.reset=function(){t={},n={},r={}};var f=/\.[^.\/]+$/,h=/\/index(\.[^\/]+)?$/,p=function(e){if(f.test(e)){var t=e.replace(f,"");a.call(r,t)&&r[t].replace(f,"")!==t+"/index"||(r[t]=e)}if(h.test(e)){var n=e.replace(h,"");a.call(r,n)||(r[n]=e)}};d.register=d.define=function(e,r){if("object"==typeof e)for(var i in e)a.call(e,i)&&d.register(i,e[i]);else t[e]=r,delete n[e],p(e)},d.list=function(){var e=[];for(var n in t)a.call(t,n)&&e.push(n);return e},d.brunch=!0,d._cache=n,e.require=d}}(),require.register("actions.js",function(e,t,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.resetSearch=e.searchImages=e.initialFetchImages=e.setQuery=e.cacheDrawing=e.setText=e.setSize=e.selectImage=e.setFilter=e.setColor=e.setItalic=e.setBold=e.setFontSize=e.setFont=void 0;var r=t("util/unsplash"),a=(e.setFont=function(e){return{type:"SET_FONT",font:e}},e.setFontSize=function(e){return{type:"SET_FONT_SIZE",size:e}},e.setBold=function(e){return{type:"SET_BOLD",bold:e}},e.setItalic=function(e){return{type:"SET_ITALIC",italic:e}},e.setColor=function(e){return{type:"SET_COLOR",color:e}},e.setFilter=function(e){return{type:"SET_FILTER",filter:e}},e.selectImage=function(e){return{type:"SELECT_IMAGE",image:e}});e.setSize=function(e){return{type:"SET_SIZE",size:e}},e.setText=function(e){return{type:"SET_TEXT",text:e}},e.cacheDrawing=function(e){return{type:"CACHE_DRAWING",drawing:e}},e.setQuery=function(e){return{type:"SET_QUERY",query:e}},e.initialFetchImages=function(){return function(e){(0,r.getPopularImages)().then(function(t){e({type:"RECEIVE_IMAGES",images:t}),e(a(t[0]))})}},e.searchImages=function(e){return function(t){(0,r.searchImages)(e).then(function(e){t({type:"RECEIVE_IMAGES",images:e})})}},e.resetSearch=function(){return function(e){(0,r.getPopularImages)().then(function(t){e({type:"RECEIVE_IMAGES",images:t})})}}}),require.register("components/Canvas/Container.jsx",function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(e,"__esModule",{value:!0});var a=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},i=t("react"),s=r(i),o=t("react/lib/ReactUpdates"),u=r(o),l=t("react/lib/ReactMultiChild"),c=r(l),d=t("react/lib/ReactInstanceMap"),f=r(d),h=t("util/canvas"),p=t("util/debounce"),m=r(p),g=Object.assign({},c["default"].Mixin,{mountAndInjectChildren:function(e,t,n){this.mountChildren(e,t,n);window.requestAnimationFrame(this._draw)},updateChildren:function(e,t,n){this.mountAndInjectChildren(e,t,n)}});e["default"]=s["default"].createClass({displayName:"Container",mixins:[g],render:function(){var e=this.props,t=e.width,n=e.height,r=this.props,i=r.onMouseDown,o=r.onMouseMove,u=r.onMouseUp,l={width:t,height:n},c=window.devicePixelRatio||1;return s["default"].createElement("canvas",a({ref:"canvas",width:t*c,height:n*c,style:l},{onMouseDown:i,onMouseMove:o,onMouseUp:u}))},scaleCanvas:function(){this.refs.canvas.getContext("2d").scale(window.devicePixelRatio||1,window.devicePixelRatio||1)},componentWillMount:function(){this.passRendered=(0,m["default"])(this._passRendered,500)},componentDidMount:function(){this._debugID=this._reactInternalInstance._debugID;var e=u["default"].ReactReconcileTransaction.getPooled();e.perform(this.mountAndInjectChildren,this,this.props.children,e,f["default"].get(this)._context),u["default"].ReactReconcileTransaction.release(e),this.scaleCanvas()},componentDidUpdate:function(e){var t=u["default"].ReactReconcileTransaction.getPooled();t.perform(this.updateChildren,this,this.props.children,t,f["default"].get(this)._context),u["default"].ReactReconcileTransaction.release(t),e.height===this.props.height&&e.width===this.props.width||this.scaleCanvas()},_draw:function(){var e=this,t=Object.keys(this._renderedChildren).map(function(t){var n=e._renderedChildren[t],r=n.getNativeNode();return r}),n={frame:[0,0,this.props.width,this.props.height],children:t},r=this.refs.canvas,a=r.getContext("2d"),i=this.props,s=i.width,o=i.height;a.clearRect(0,0,s,o),(0,h.renderCanvasLayout)(a,n),this.passRendered()},_passRendered:function(){var e=this.props.onRedraw;if(e){var t=this.refs.canvas,n=t.toDataURL("image/jpeg");e(n)}}})}),require.register("components/Canvas/createCanvasComponent.js",function(e,t,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e["default"]=function(e,t){var n=function(e){this._el=e};return n.displayName="Rect",Object.assign(n.prototype,{construct:function(){},mountComponent:function(e,t,n,r){return{}},receiveComponent:function(){},unmountComponent:function(){},getNativeNode:function(){return t(this._el.props)},getPublicInstance:function(){return t(this._el.props)}}),n}}),require.register("components/Canvas/index.js",function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(e,"__esModule",{value:!0}),e.Canvas=e.CanvasLine=e.CanvasOutline=e.CanvasText=e.CanvasImage=e.CanvasFilter=e.CanvasRect=void 0;var a=t("./Container"),i=r(a),s=t("./createCanvasComponent"),o=r(s);e.CanvasRect=(0,o["default"])("CanvasRect",function(e){return Object.assign({type:"rect"},e)}),e.CanvasFilter=(0,o["default"])("CanvasFilter",function(e){return Object.assign({type:"filter"},e)}),e.CanvasImage=(0,o["default"])("CanvasImage",function(e){return Object.assign({type:"image"},e)}),e.CanvasText=(0,o["default"])("CanvasText",function(e){return Object.assign({type:"text"},e)}),e.CanvasOutline=(0,o["default"])("CanvasOutline",function(e){return Object.assign({type:"outline"},e)}),e.CanvasLine=(0,o["default"])("CanvasLine",function(e){return Object.assign({type:"line"},e)}),e.Canvas=i["default"]}),require.register("components/Card.jsx",function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(e,"__esModule",{value:!0});var a=t("react"),i=r(a);e["default"]=function(e){var t=e.title,n=e.children;return i["default"].createElement("div",{className:"Card"},i["default"].createElement("div",{className:"Card-header"},i["default"].createElement("h4",null,t)),n)}}),require.register("components/DownloadButton.jsx",function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(e,"__esModule",{value:!0});var a=t("react"),i=r(a);e["default"]=i["default"].createClass({displayName:"DownloadButton",propTypes:{drawing:i["default"].PropTypes.string},handleDownload:function(e){var t=this.props.drawing,n=e.target;n.href=t,n.click()},render:function(){return i["default"].createElement("div",null,i["default"].createElement("a",{className:"Button",download:"pabla.jpg",target:"_blank",onClick:this.handleDownload},"Download"))}})}),require.register("components/FiltersPicker.jsx",function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(e,"__esModule",{value:!0});var a=t("react"),i=r(a);e["default"]=i["default"].createClass({displayName:"FiltersPicker",propTypes:{filter:i["default"].PropTypes.oneOf(["none","light_contrast","heavy_contrast","light_blur","heavy_blur"]).isRequired,onFilterChange:i["default"].PropTypes.func.isRequired},updateFilter:function(){var e=this.refs.select.value;this.props.onFilterChange(e)},render:function(){return i["default"].createElement("div",null,i["default"].createElement("select",{className:"FiltersPicker",value:this.props.filter,ref:"select",onChange:this.updateFilter},i["default"].createElement("option",{value:"none"},"None"),i["default"].createElement("option",{value:"light_contrast"},"Light contrast"),i["default"].createElement("option",{value:"heavy_contrast"},"Heavy contrast"),i["default"].createElement("option",{value:"light_blur"},"Light blur"),i["default"].createElement("option",{value:"heavy_blur"},"Heavy blur")))}})}),require.register("components/ImageCanvas.jsx",function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(e,"__esModule",{value:!0});var a=function(){function e(e,t){var n=[],r=!0,a=!1,i=void 0;try{for(var s,o=e[Symbol.iterator]();!(r=(s=o.next()).done)&&(n.push(s.value),!t||n.length!==t);r=!0);}catch(u){a=!0,i=u}finally{try{!r&&o["return"]&&o["return"]()}finally{if(a)throw i}}return n}return function(t,n){if(Array.isArray(t))return t;if(Symbol.iterator in Object(t))return e(t,n);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),i=t("react"),s=r(i),o=t("./Canvas"),u=t("util/imageCache"),l=t("util/text"),c=t("util/textEditor"),d=r(c),f=document.createElement("canvas").getContext("2d"),h={8:"backspace",27:"escape",37:"arr_left",39:"arr_right"},p={tall:[500,750],square:[500,500],wide:[500,250]},m=function(e,t){var n=t.getBoundingClientRect(),r={x:e.clientX-n.left,y:e.clientY-n.top};return r},g=function(e,t){return e.x>=t[0]&&e.x<=t[0]+t[2]&&e.y>=t[1]&&e.y<=t[1]+t[3]},v=function(e,t){return[e[0]-t.x,e[1]-t.y,e[2],e[3]]};e["default"]=s["default"].createClass({displayName:"ImageCanvas",initSize:function(e){var t=this,n={},r=a(p[e],2);n.canvasWidth=r[0],n.canvasHeight=r[1];var i=this.state;return i.canvasWidth===n.canvasWidth&&i.canvasHeight===n.canvasHeight?Promise.resolve():new Promise(function(e){t.setState(n,e)})},loadImage:function(e){var t=this;return e?(this.props.image!==e&&this.setState({image:null}),(0,u.getImage)(e).then(function(e){t.setState({image:e})})):Promise.resolve()},componentWillReceiveProps:function(e){var t=this;Promise.all([this.initSize(e.size),this.loadImage(e.image)]).then(function(){t.redraw(e)})},getInitialState:function(){return this.textEditor=new d["default"](this),{textRect:[20,20,460,460]}},componentWillMount:function(){Promise.all([this.initSize(this.props.size),this.loadImage(this.props.image)])},componentDidMount:function(){var e=this;window.requestAnimationFrame(this.doRedraw),setInterval(function(){e.state.isEditing&&(e.textEditor.toggleCursor(),window.requestAnimationFrame(e.doRedraw))},450)},doRedraw:function(){this.redraw(this.props)},redraw:function(e){e||(e=this.props),this.forceUpdate()},cancelEditing:function(){this.setState({isEditing:!1})},updateCursor:function(e){"escape"===h[e.which]&&(this.cancelEditing(),e.target.blur());var t=this.refs.txt,n=t.selectionStart,r=t.selectionEnd;this.textEditor.setFromInput(n,r),setTimeout(this.doRedraw,0)},setFocus:function(){this.setState({isFocused:!0})},setEditing:function(){this.setState({isFocused:!0,isEditing:!0})},setNoFocus:function(){this.setState({isFocused:!1,isEditing:!1})},handleMouseDown:function(e){var t=m(e,this.refs.canvas.refs.canvas);this.startPos=t;var n=this.getSnapFrames(),r=n.left,a=n.right,i=this.state.textRect,s=g(t,i),o=g(t,r),u=g(t,a);!s||o||u?o?(this.mouseHeld=!0,this.snap="left"):u?(this.mouseHeld=!0,this.snap="right"):this.setNoFocus():(this.mouseHeld=!0,this.state.isFocused&&(this.mouseDown=new Date),this.setFocus())},handleMouseMove:function(e){if(this.mouseHeld){var t=this.startPos,n=m(e,this.refs.canvas.refs.canvas),r={x:t.x-n.x,y:t.y-n.y},i=this.state,s=i.isFocused,o=i.isEditing;if(!s||o||this.snap){if(this.snap){var u=a(this.state.textRect,4),c=u[0],d=u[1],h=u[2],p=u[3],g="left"===this.snap?[c-r.x,d,h+r.x,p]:[c,d,h-r.x,p];this.setState({textRect:g}),this.mouseDiff=r,this.startPos=n}else if(s&&o){var y=t,x=n,C=this.state.textRect,E=this.props,S=E.text,b=E.textAttrs,_=(0,l.findIdxForCursor)(f,C,y,b,S),w=(0,l.findIdxForCursor)(f,C,x,b,S);this.textEditor.setSelection(_,w,this.refs.txt)}}else{var I=v(this.state.textRect,r);this.setState({textRect:I}),this.mouseDiff=r,this.startPos=n}setTimeout(this.doRedraw,0)}},handleMouseUp:function(e){if(this.mouseDown&&new Date-this.mouseDown<200&&!this.snap){var t=this.startPos,n=this.state.textRect,r=this.props,a=r.text,i=r.textAttrs,s=(0,l.findIdxForCursor)(f,n,t,i,a);this.textEditor.setCursor(s,this.refs.txt),this.setEditing(),this.refs.txt.focus()}this.mouseDiff=null,this.mouseDown=null,this.mouseHeld=!1,this.snap=null,setTimeout(this.doRedraw,0)},getSelectionRects:function(){var e=this.textEditor,t=this.state.textRect,n=e.cursor1,r=e.cursor2;if(this.state.isEditing&&n>=0&&r>=0){var a=this.props,i=a.textAttrs,s=a.text,o=(0,l.findRectsForSelection)(f,t,n,r,i,s);if(o)return o.map(function(e,t){var n=e.x1,r=e.x2,a=e.y1,i=e.y2;return[n,a,r-n,i-a]})}return[]},getCursorCoords:function(){var e=arguments.length<=0||void 0===arguments[0]?[]:arguments[0],t=this.textEditor,n=this.state.textRect,r=t.cursor,a=t.showCursor;if(this.state.isEditing&&a&&0===e.length){var i=this.props,s=i.textAttrs,o=i.text,u=(0,l.findPosForCursor)(f,r,n,s,o);if(u)return(0,l.findCoordsForPos)(f,n,s,o,u)}},getSnapFrames:function(){var e=a(this.state.textRect,4),t=e[0],n=e[1],r=e[2],i=e[3],s=15,o=[t-s/2,n+i/2-s/2,s,s],u=[t+r-s/2,n+i/2-s/2,s,s];return{left:o,right:u}},render:function(){var e=this,t=this.state.image,n=this.state,r=n.canvasWidth,a=n.canvasHeight,i=n.isFocused,u=(n.isEditing,n.textRect),l=this.props,c=l.filter,d=l.textAttrs,f=l.text,h=this.mouseHeld,p=(this.textEditor,[0,0,r,a]),m=this.getSelectionRects(),g=m.map(function(e,t){return s["default"].createElement(o.CanvasRect,{key:t,fill:"rgba(87, 205, 255, 0.5)",frame:e})}),v=this.getSnapFrames(),y=v.left,x=v.right,C=this.getCursorCoords(m),E=function(t){e.setState({textRect:t})},S=h?"rgba(87, 205, 255, 0.5)":"#0092d1";return s["default"].createElement("div",{className:"ImageCanvas"},s["default"].createElement(o.Canvas,{ref:"canvas",width:r,height:a,onRedraw:this.props.onRedraw,onMouseDown:this.handleMouseDown,onMouseMove:this.handleMouseMove,onMouseUp:this.handleMouseUp},t?s["default"].createElement(o.CanvasImage,{image:t,frame:p}):null,s["default"].createElement(o.CanvasFilter,{filter:c,frame:p}),u&&i?s["default"].createElement(o.CanvasRect,{frame:y,fill:S}):null,u&&i?s["default"].createElement(o.CanvasRect,{frame:x,fill:S}):null,u?s["default"].createElement(o.CanvasText,{ref:"textRect",text:f,frame:u,textAttrs:d,onUpdateRect:E}):null,u&&i?s["default"].createElement(o.CanvasOutline,{width:2,frame:u,color:S}):null,C?s["default"].createElement(o.CanvasLine,{color:"rgba(255, 255, 255, 0.75)",width:1,from:[C.x,C.y1],to:[C.x,C.y2]}):null,g),s["default"].createElement("textarea",{ref:"txt",value:f,onChange:function(t){return e.props.onTextChange(t.target.value)},onKeyUp:this.updateCursor,onFocus:this.setEditing,style:{height:1,width:1,opacity:0}}))}})}),require.register("components/ImagePicker.jsx",function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(e,"__esModule",{value:!0});var a=t("react"),i=r(a),s=t("./Option"),o=r(s);e["default"]=i["default"].createClass({displayName:"ImagePicker",propTypes:{images:i["default"].PropTypes.arrayOf(i["default"].PropTypes.shape({url:i["default"].PropTypes.string})).isRequired,selected:i["default"].PropTypes.shape({url:i["default"].PropTypes.string}),onSelect:i["default"].PropTypes.func},handleSelect:function(e){this.props.onSelect&&this.props.onSelect(e)},render:function(){var e=this,t=this.props.selected||{};return i["default"].createElement("div",{className:"ImagePicker"},this.props.images.map(function(n){var r=n.url===t.url,a="ImagePicker-image"+(r?" ImagePicker-image--selected":""),s=n.url+"&w=364";return i["default"].createElement("div",{className:a,onClick:e.handleSelect.bind(e,n),key:n.url},i["default"].createElement(o["default"],{selected:r,borderStyle:"thick-transparent"},i["default"].createElement("img",{src:s})))}))}})}),require.register("components/Option.jsx",function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(e,"__esModule",{value:!0});var a=t("react"),i=r(a);e["default"]=function(e){var t=e.selected,n=e.checkSize,r=e.borderStyle,a=e.children;n||(n="normal"),r||(r="thin-grey");var s="OptionWrapper OptionWrapper--size-"+n+" OptionWrapper--border-"+r+(t?" OptionWrapper--selected":"");return i["default"].createElement("div",{className:s},i["default"].createElement("div",{className:"OptionWrapper-w"},a))}}),require.register("components/SearchBar.jsx",function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(e,"__esModule",{value:!0});var a=t("react"),i=r(a);e["default"]=i["default"].createClass({displayName:"SearchBar",propTypes:{query:i["default"].PropTypes.string.isRequired,onSearch:i["default"].PropTypes.func.isRequired,onSearchReset:i["default"].PropTypes.func.isRequired,onQueryChange:i["default"].PropTypes.func.isRequired},search:function(e){e.preventDefault();var t=this.props.query;t&&t.length>0?this.props.onSearch(t):this.props.onSearchReset()},setQuery:function(e){e.preventDefault();var t=e.target.value;this.props.onQueryChange&&this.props.onQueryChange(t)},render:function(){return i["default"].createElement("form",{onSubmit:this.search},i["default"].createElement("input",{type:"text",className:"SearchBar",placeholder:"Search images",onChange:this.setQuery,value:this.props.query}))}})}),require.register("components/SizePicker.jsx",function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(e,"__esModule",{value:!0});var a=t("react"),i=r(a),s=t("./Option"),o=r(s),u=function(e){var t=e.name,n=e.code,r=e.currentCode,a=e.onSelect,s=function(e){e.preventDefault(),a(n)},u="SizePicker-size SizePicker-size--"+n;return i["default"].createElement("div",{className:u,onClick:s},i["default"].createElement(o["default"],{selected:n===r},t))};e["default"]=i["default"].createClass({displayName:"SizePicker",render:function(){var e=this.props.size;return i["default"].createElement("div",{className:"SizePicker"},i["default"].createElement(u,{name:"Tall",code:"tall",currentCode:e,onSelect:this.props.onSizeSelect}),i["default"].createElement(u,{name:"Square",code:"square",currentCode:e,onSelect:this.props.onSizeSelect}),i["default"].createElement(u,{name:"Wide",code:"wide",currentCode:e,onSelect:this.props.onSizeSelect}))}})}),require.register("components/TextPropertiesPicker.jsx",function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(e,"__esModule",{value:!0});var a=t("react"),i=r(a),s=t("./Option"),o=r(s),u=["white","black","#444","#007fff","#ffb300","#71c318"],l=["Arial","Georgia","Helvetica","Trebuchet MS"],c=[8,10,12,14,16,18,20,22,26,32,36,42,48,54];e["default"]=i["default"].createClass({displayName:"TextPropertiesPicker",propTypes:{textAttrs:i["default"].PropTypes.shape({font:i["default"].PropTypes.string.isRequired,fontSize:i["default"].PropTypes.number.isRequired,color:i["default"].PropTypes.string.isRequired,bold:i["default"].PropTypes.bool.isRequired,italic:i["default"].PropTypes.bool.isRequired}).isRequired,onFontChange:i["default"].PropTypes.func.isRequired,onFontSizeChange:i["default"].PropTypes.func.isRequired,onColorChange:i["default"].PropTypes.func.isRequired},updateFont:function(){var e=this.refs.font.value;this.props.onFontChange(e)},updateFontSize:function(){var e=parseInt(this.refs.fontSize.value,10);this.props.onFontSizeChange(e)},updateColor:function(e){this.props.onColorChange(e)},updateBold:function(){this.props.onBoldChange(!this.props.textAttrs.bold)},updateItalic:function(){this.props.onItalicChange(!this.props.textAttrs.italic)},render:function(){var e=this,t=this.props.textAttrs,n=t.font,r=t.fontSize,a=(t.color,t.bold),s=t.italic;return i["default"].createElement("div",{className:"TextPropsPicker"},i["default"].createElement("p",null,"Font:",i["default"].createElement("select",{ref:"font",value:n,onChange:this.updateFont},l.map(function(e){return i["default"].createElement("option",{key:e,value:e},e)}))),i["default"].createElement("p",null,"Font size:",i["default"].createElement("select",{ref:"fontSize",value:r,onChange:this.updateFontSize},c.map(function(e){return i["default"].createElement("option",{key:e,value:e},e)}))),i["default"].createElement("div",{className:"TextPropsPicker-style"},i["default"].createElement("div",{className:"TextPropsPicker-style-bold",onClick:this.updateBold},i["default"].createElement(o["default"],{selected:a},i["default"].createElement("span",null,"Bold"))),i["default"].createElement("div",{className:"TextPropsPicker-style-italic",onClick:this.updateItalic},i["default"].createElement(o["default"],{selected:s},i["default"].createElement("span",null,"Italic")))),i["default"].createElement("div",{className:"TextPropsPicker-colors"},u.map(function(t){return i["default"].createElement("div",{key:t,className:"TextPropsPicker-color",onClick:e.updateColor.bind(e,t)},i["default"].createElement(o["default"],{selected:t===e.props.textAttrs.color,checkSize:"small"},i["default"].createElement("div",{style:{background:t,borderRadius:3}})))})))}})}),require.register("container/App.jsx",function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(e,"__esModule",{value:!0});var a=t("react"),i=r(a),s=t("react-redux"),o=t("actions"),u=t("./LeftSidebar"),l=r(u),c=t("./RightSidebar"),d=r(c),f=t("components/ImageCanvas"),h=r(f),p=i["default"].createClass({displayName:"App",updateDrawnImage:function(e){this.props.drawing!==e&&this.props.onCacheDrawing(e)},render:function(){var e=this.props.selected&&this.props.selected.url,t=this.props,n=t.text,r=t.textAttrs,a=t.filter,s=t.size;return i["default"].createElement("div",{className:"Container"},i["default"].createElement(l["default"],null),i["default"].createElement("div",{className:"Main"},i["default"].createElement("h4",{className:"Main-subtitle"},"Canvas"),i["default"].createElement(h["default"],{image:e,text:n,textAttrs:r,filter:a,size:s,onRedraw:this.updateDrawnImage,onTextChange:this.props.onTextChange})),i["default"].createElement(d["default"],null))}}),m=function(e){return{textAttrs:e.textAttrs,filter:e.filter,size:e.size,selected:e.selectedImage,drawing:e.drawing,text:e.text}},g=function(e){return{onCacheDrawing:function(t){e((0,o.cacheDrawing)(t))},onTextChange:function(t){e((0,o.setText)(t))}}};e["default"]=(0,s.connect)(m,g)(p)}),require.register("container/LeftSidebar.jsx",function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(e,"__esModule",{value:!0});var a=t("react"),i=r(a),s=t("react-redux"),o=t("actions"),u=t("components/Card"),l=r(u),c=t("components/SearchBar"),d=r(c),f=t("components/ImagePicker"),h=r(f),p=function(e){var t=e.query,n=e.availableImages,r=e.selectedImage,a=e.onSelectImage,s=e.onSearch,o=e.onSearchReset,u=e.onQueryChange;return i["default"].createElement("div",{className:"Sidebar"},i["default"].createElement(l["default"],{title:"Images"},i["default"].createElement(d["default"],{query:t,onSearch:s,onSearchReset:o,onQueryChange:u}),i["default"].createElement(h["default"],{images:n,selected:r,onSelect:a})))},m=function(e){return{availableImages:e.availableImages,selectedImage:e.selectedImage,query:e.query}},g=function(e){return{onSelectImage:function(t){e((0,o.selectImage)(t))},onSearch:function(t){e((0,o.searchImages)(t))},onSearchReset:function(){e((0,o.resetSearch)())},onQueryChange:function(t){e((0,o.setQuery)(t))}}};e["default"]=(0,s.connect)(m,g)(p)}),require.register("container/RightSidebar.jsx",function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(e,"__esModule",{value:!0});var a=t("react"),i=r(a),s=t("react-redux"),o=t("actions"),u=t("components/Card"),l=r(u),c=t("components/FiltersPicker"),d=r(c),f=t("components/TextPropertiesPicker"),h=r(f),p=t("components/SizePicker"),m=r(p),g=t("components/DownloadButton"),v=r(g),y=function(e){var t=e.drawing,n=e.filter,r=e.onFilterChange,a=e.textAttrs,s=e.onFontChange,o=e.onFontSizeChange,u=e.onColorChange,c=e.onBoldChange,f=e.onItalicChange,p=e.size,g=e.onSizeSelect;return i["default"].createElement("div",{className:"Sidebar"},i["default"].createElement(l["default"],{title:"Sizes"},i["default"].createElement(m["default"],{size:p,onSizeSelect:g})),i["default"].createElement(l["default"],{title:"Filters"},i["default"].createElement(d["default"],{filter:n,onFilterChange:r})),i["default"].createElement(l["default"],{title:"Text"},i["default"].createElement(h["default"],{textAttrs:a,onFontChange:s,onFontSizeChange:o,onColorChange:u,onBoldChange:c,onItalicChange:f})),i["default"].createElement(v["default"],{drawing:t}),i["default"].createElement("p",{className:"Credit"},"Made by ",i["default"].createElement("a",{href:"http://goshakkk.name"},"Gosha Arinich"),". ",i["default"].createElement("a",{href:"https://github.com/goshakkk/pabla"},"Repo"),"."))},x=function(e){return{textAttrs:e.textAttrs,filter:e.filter,size:e.size,drawing:e.drawing}},C=function(e){return{onFontChange:function(t){e((0,o.setFont)(t))},onFontSizeChange:function(t){e((0,o.setFontSize)(t))},onColorChange:function(t){e((0,o.setColor)(t))},onBoldChange:function(t){e((0,o.setBold)(t))},onItalicChange:function(t){e((0,o.setItalic)(t))},onFilterChange:function(t){e((0,o.setFilter)(t))},onSizeSelect:function(t){e((0,o.setSize)(t))}}};e["default"]=(0,s.connect)(x,C)(y)}),require.register("initialize.js",function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}var a=t("react-dom"),i=r(a),s=t("react"),o=r(s),u=t("redux"),l=t("redux-thunk"),c=r(l),d=t("react-redux"),f=t("reducer"),h=r(f),p=t("container/App"),m=r(p),g=t("actions");t("es6-promise").polyfill();var v=(0,u.createStore)(h["default"],(0,u.applyMiddleware)(c["default"]));v.dispatch((0,g.initialFetchImages)()),document.addEventListener("DOMContentLoaded",function(){i["default"].render(o["default"].createElement(d.Provider,{store:v},o["default"].createElement(m["default"],null)),document.querySelector("#app"))})}),require.register("reducer.js",function(e,t,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e["default"]=function(){var e=arguments.length<=0||void 0===arguments[0]?a:arguments[0],t=arguments[1],n=void 0;switch(t.type){case"SET_FONT":return n=Object.assign({},e.textAttrs,{font:t.font}),Object.assign({},e,{textAttrs:n});case"SET_FONT_SIZE":return n=Object.assign({},e.textAttrs,{fontSize:t.size}),Object.assign({},e,{textAttrs:n});case"SET_BOLD":return n=Object.assign({},e.textAttrs,{bold:t.bold}),Object.assign({},e,{textAttrs:n});case"SET_ITALIC":return n=Object.assign({},e.textAttrs,{italic:t.italic}),Object.assign({},e,{textAttrs:n});case"SET_COLOR":return n=Object.assign({},e.textAttrs,{color:t.color}),Object.assign({},e,{textAttrs:n});case"SET_FILTER":return Object.assign({},e,{filter:t.filter});case"SELECT_IMAGE":return Object.assign({},e,{selectedImage:t.image});case"SET_SIZE":return Object.assign({},e,{size:t.size});case"SET_TEXT":return Object.assign({},e,{text:t.text});case"CACHE_DRAWING":return Object.assign({},e,{drawing:t.drawing});case"RECEIVE_IMAGES":return Object.assign({},e,{availableImages:t.images});case"SET_QUERY":return Object.assign({},e,{query:t.query});default:return e}};var r=t("util/unsplash"),a=((0,r.getPopularImages)(),{filter:"light_contrast",availableImages:[],selectedImage:null,query:"",drawing:null,size:"square",text:"“Others have seen what is and asked why. I have seen what could be and asked why not.”\n- Pablo Picasso",textAttrs:{fontSize:32,color:"white",font:"Georgia",bold:!1,italic:!1,lineHeight:1.35}})}),require.register("util/canvas.js",function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}function a(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)}Object.defineProperty(e,"__esModule",{value:!0}),e.renderCanvasLayout=void 0;var i=function(){function e(e,t){var n=[],r=!0,a=!1,i=void 0;try{for(var s,o=e[Symbol.iterator]();!(r=(s=o.next()).done)&&(n.push(s.value),!t||n.length!==t);r=!0);}catch(u){a=!0,i=u}finally{try{!r&&o["return"]&&o["return"]()}finally{if(a)throw i}}return n}return function(t,n){if(Array.isArray(t))return t;if(Symbol.iterator in Object(t))return e(t,n);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),s=t("util/text"),o=t("stackblur-canvas"),u=r(o),l={image:function(e,t){d(e,t.frame,t.image)},filter:function f(e,t){var f=t.filter;if("light_contrast"===f||"heavy_contrast"===f){var n="light_contrast"===f?.35:.65;c(e,t.frame,n)}if("light_blur"===f||"heavy_blur"===f){var r="light_blur"===f?15:40,a=i(t.frame,4),s=a[0],o=a[1],l=a[2],d=a[3],h=window.devicePixelRatio||1;u["default"].canvasRGB(e.canvas,s,o,l*h,d*h,r)}},text:function(e,t){var n=(0,s.addText)(e,t.textAttrs,t.frame,t.text);t.frame.join(",")!==n.join(",")&&t.onUpdateRect&&t.onUpdateRect(n)},rect:function(e,t){e.fillStyle=t.fill,e.fillRect.apply(e,a(t.frame))},outline:function(e,t){e.lineWidth=t.width,e.strokeStyle=t.color,e.strokeRect.apply(e,a(t.frame))},line:function(e,t){e.strokeStyle=t.color,e.lineWidth=t.width,e.lineCap="round",e.beginPath(),e.moveTo.apply(e,a(t.from)),e.lineTo.apply(e,a(t.to)),e.stroke(),e.strokeStyle=null}},c=function(e,t,n){e.fillStyle="rgba(45, 45, 45, "+n+")",e.fillRect.apply(e,a(t))},d=function(e,t,n){var r=t[2],a=t[3],i=n.naturalWidth,s=n.naturalHeight,o=i/s,u=r/a,l=void 0,c=void 0;u>=o?(l=i,c=i/u):(l=s*u,c=s);var d=(i-l)/2,f=(s-c)/2;e.drawImage(n,d,f,l,c,0,0,r,a)};e.renderCanvasLayout=function(e,t){t.children.forEach(function(t){if(t){var n=l[t.type];n||console.error("Unknown canvas component: "+t.type),e.save(),n(e,t),e.restore()}})}}),require.register("util/debounce.js",function(e,t,n){"use strict";function r(e,t,n){var r;return function(){var a=this,i=arguments,s=function(){r=null,n||e.apply(a,i)},o=n&&!r;clearTimeout(r),r=setTimeout(s,t),o&&e.apply(a,i)}}Object.defineProperty(e,"__esModule",{value:!0}),e["default"]=r}),require.register("util/imageCache.js",function(e,t,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r={},a=function(e){var t=new Image;return t.crossOrigin="anonymous",t.src=e,new Promise(function(e,n){t.onload=function(){return e(t)}})};e.getImage=function(e){if(e in r)return r[e];var t=a(e);return r[e]=t,t}}),require.register("util/text.js",function(e,t,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=function(){function e(e,t){var n=[],r=!0,a=!1,i=void 0;try{for(var s,o=e[Symbol.iterator]();!(r=(s=o.next()).done)&&(n.push(s.value),!t||n.length!==t);r=!0);}catch(u){a=!0,i=u}finally{try{!r&&o["return"]&&o["return"]()}finally{if(a)throw i}}return n}return function(t,n){if(Array.isArray(t))return t;if(Symbol.iterator in Object(t))return e(t,n);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),a=10,i=2*a,s=function(e,t){var n=t.bold,r=t.italic,a=t.font,i=t.fontSize,s=t.color;e.font=(n?"bold":"")+" "+(r?"italic":"")+" "+i+'px "'+a+'"',e.fillStyle=s},o=e.splitTextInLines=function(e,t,n,r){n.fontSize;t-=i,s(e,n);var a=r.split("\n"),o=a.map(function(e){return e.split(" ")}).reduce(function(e,t,n){var r=n==a.length-1?[]:["\n"];return e.concat(t).concat(r)},[]),u=[""],l=[[]],c=0;return o.forEach(function(n,r){if("\n"===n)return l.push([]),void u.push("");var a=u.length-1,i=u[a],s=0===i.length?n:i+" "+n;if(e.measureText(s).width<=t||0===i.length){u[a]=s;0===i.length;l[a]=l[a].concat(n.split("").map(function(e,t){return c+1+t}))}else l.push(n.split("").map(function(e,t){return c+1+t})),u.push(n);l[u.length-1].push(c+1+n.length),c=c+1+n.length}),[u,l]},u=(e.findIdxForCursor=function(e,t,n,i,u){
var l=i.fontSize,c=i.lineHeight;s(e,i);var d=t[2],f=o(e,d,i,u),h=r(f,2),p=h[0],m=(h[1],l*c),g=void 0;return p.forEach(function(r,i){var s=t[0]+a,o=t[1]+l+i*m;n&&n.y<=o&&n.y>=o-m&&r.split("").forEach(function(t,a){var i=e.measureText(r.slice(0,a)).width,o=e.measureText(r.slice(0,a+1)).width,l=n.x-s;l>=i&&o>=l&&(g=u.indexOf(r)+a)})}),void 0!==g?g+1:null},e.coordsForLine=function(e,t,n){var r=t.fontSize,i=t.lineHeight,s=r*i;return{x:e[0]+a,y:e[1]+r+n*s}}),l=e.findPosForCursor=function(e,t,n,a,i){var u=a.fontSize;s(e,a);var l=n[2],c=o(e,l,u,i),d=r(c,2),f=(d[0],d[1]);if(0===t)return{lineNo:0,idxInLine:0,line:[""]};var h=f.find(function(e){return-1!==e.indexOf(t)}),p=void 0;if(h){var m=f.indexOf(h),g=h.indexOf(t);h.map(function(e){return i[e-1]}).join("");p={lineNo:m,idxInLine:g,line:h}}return p};e.findCoordsForPos=function(e,t,n,r,a){var i=n.fontSize;s(e,n);var o=a.lineNo,l=a.idxInLine,c=a.line,d=c.map(function(e){return r[e-1]}).join(""),f=u(t,n,o),h=f.x,p=f.y,m=e.measureText(d.slice(0,l+1)).width;return{x:h+m,y1:p-i+7,y2:p+7}},e.findRectsForSelection=function(e,t,n,a,i,c){var d=i.fontSize;s(e,i);var f=n,h=a;if(f>h){var p=[h,f];f=p[0],h=p[1]}var m=l(e,f,t,i,c),g=l(e,h,t,i,c);if(m&&g){var v=o(e,t[2],i,c),y=r(v,2),x=(y[0],y[1]);if(m.lineNo===g.lineNo){var C=x.find(function(e){return-1!==e.indexOf(f+1)}),E=C.map(function(e){return c[e-1]}).join(""),S=u(t,i,m.lineNo),b=S.x,_=S.y,w=e.measureText(E.slice(0,m.idxInLine)).width,I=e.measureText(E.slice(m.idxInLine,g.idxInLine)).width;return[{x1:b+w,x2:b+w+I,y1:_-d+7,y2:_+7}]}var P=Array.apply(0,Array(g.lineNo-m.lineNo+1)).map(function(e,t){return t+m.lineNo});return P.map(function(n){var r=u(t,i,n),a=r.x,s=r.y,o=void 0,l=void 0;if(n==m.lineNo){var p=x.find(function(e){return-1!==e.indexOf(f+1)}),v=p.map(function(e){return c[e-1]}).join("");o=e.measureText(v.slice(0,m.idxInLine)).width,l=e.measureText(v.slice(m.idxInLine)).width}else if(n===g.lineNo){var y=x.find(function(e){return-1!==e.indexOf(h)}),C=y.map(function(e){return c[e-1]}).join("");o=0,l=e.measureText(C.slice(0,g.idxInLine)).width}else{var E=x[n],S=E.map(function(e){return c[e-1]}).join("");o=0,l=e.measureText(S).width}return{x1:a+o,x2:a+o+l,y1:s-d+7,y2:s+7}})}},e.addText=function(e,t,n,l){var c=t.fontSize,d=t.lineHeight;s(e,t);var f=n.slice(),h=n[2],p=o(e,h,t,l),m=r(p,2),g=m[0],v=(m[1],c*d);g.forEach(function(n,r){var a=u(f,t,r),s=a.x,o=a.y;e.fillText(n,s,o,f[2]-i)});var y=g.length*v;return f[3]=y+a,f}}),require.register("util/textEditor.js",function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0});var a=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),i=function(){function e(t){r(this,e),this.component=t,this.cursor=0,this.cursor1=null,this.cursor2=null,this.showCursor=!1}return a(e,[{key:"toggleCursor",value:function(){this.showCursor=!this.showCursor}},{key:"setFromInput",value:function(e,t){e===t?(this.cursor=e,this.cursor1=null,this.cursor2=null):(this.cursor=null,this.cursor1=e+1,this.cursor2=t+1)}},{key:"setSelection",value:function(e,t,n){this.cursor1=e,this.cursor2=t,n.setSelectionRange(e,t-1)}},{key:"setCursor",value:function(e,t){this.cursor=e||this.cursor,this.cursor1=null,this.cursor2=null,t.setSelectionRange(this.cursor,this.cursor)}}]),e}();e["default"]=i}),require.register("util/unsplash.js",function(e,t,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=[{url:"https://images.unsplash.com/photo-1461016951828-c09537329b3a?fm=jpg",tags:["field","landscape","sunlight"]},{url:"https://images.unsplash.com/photo-1461295025362-7547f63dbaea?fm=jpg",tags:["crops"]},{url:"https://images.unsplash.com/photo-1465326117523-6450112b60b2?fm=jpg",tags:["forest","hill"]},{url:"https://images.unsplash.com/photo-1458640904116-093b74971de9?fm=jpg",tags:["dark","field"]},{url:"https://images.unsplash.com/photo-1447969025943-8219c41ea47a?fm=jpg",tags:["cat","kitten"]},{url:"https://images.unsplash.com/photo-1421749810611-438cc492b581?fm=jpg",tags:["water","landscape"]},{url:"https://images.unsplash.com/photo-1449960238630-7e720e630019?fm=jpg",tags:["water","seaside"]},{url:"https://images.unsplash.com/photo-1433190152045-5a94184895da?fm=jpg",tags:["water","cliff"]}];e.getPopularImages=function(){return Promise.resolve(r)},e.searchImages=function(e){var t=r.filter(function(t){return t.tags.some(function(t){return-1!==t.indexOf(e)})});return Promise.resolve(t)}});