/*! For license information please see 429.3088ae60.iframe.bundle.js.LICENSE.txt */
"use strict";(self.webpackChunktemporary_access=self.webpackChunktemporary_access||[]).push([[429],{"./node_modules/@wordpress/components/build-module/notice/index.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>notice});var clsx=__webpack_require__("./node_modules/clsx/dist/clsx.mjs"),build_module=__webpack_require__("./node_modules/@wordpress/i18n/build-module/index.js");function isObject(o){return"[object Object]"===Object.prototype.toString.call(o)}var dist_es2015=__webpack_require__("./node_modules/param-case/dist.es2015/index.js");const REGEXP_INVALID_ATTRIBUTE_NAME=/[\u007F-\u009F "'>/="\uFDD0-\uFDEF]/;function escapeAmpersand(value){return value.replace(/&(?!([a-z0-9]+|#[0-9]+|#x[a-f0-9]+);)/gi,"&amp;")}function escapeLessThan(value){return value.replace(/</g,"&lt;")}function escapeAttribute(value){return function __unstableEscapeGreaterThan(value){return value.replace(/>/g,"&gt;")}(function escapeQuotationMark(value){return value.replace(/"/g,"&quot;")}(escapeAmpersand(value)))}function isValidAttributeName(name){return!REGEXP_INVALID_ATTRIBUTE_NAME.test(name)}var react=__webpack_require__("./node_modules/react/index.js");function RawHTML({children,...props}){let rawHtml="";return react.Children.toArray(children).forEach((child=>{"string"==typeof child&&""!==child.trim()&&(rawHtml+=child)})),(0,react.createElement)("div",{dangerouslySetInnerHTML:{__html:rawHtml},...props})}const{Provider,Consumer}=(0,react.createContext)(void 0),ForwardRef=(0,react.forwardRef)((()=>null)),ATTRIBUTES_TYPES=new Set(["string","boolean","number"]),SELF_CLOSING_TAGS=new Set(["area","base","br","col","command","embed","hr","img","input","keygen","link","meta","param","source","track","wbr"]),BOOLEAN_ATTRIBUTES=new Set(["allowfullscreen","allowpaymentrequest","allowusermedia","async","autofocus","autoplay","checked","controls","default","defer","disabled","download","formnovalidate","hidden","ismap","itemscope","loop","multiple","muted","nomodule","novalidate","open","playsinline","readonly","required","reversed","selected","typemustmatch"]),ENUMERATED_ATTRIBUTES=new Set(["autocapitalize","autocomplete","charset","contenteditable","crossorigin","decoding","dir","draggable","enctype","formenctype","formmethod","http-equiv","inputmode","kind","method","preload","scope","shape","spellcheck","translate","type","wrap"]),CSS_PROPERTIES_SUPPORTS_UNITLESS=new Set(["animation","animationIterationCount","baselineShift","borderImageOutset","borderImageSlice","borderImageWidth","columnCount","cx","cy","fillOpacity","flexGrow","flexShrink","floodOpacity","fontWeight","gridColumnEnd","gridColumnStart","gridRowEnd","gridRowStart","lineHeight","opacity","order","orphans","r","rx","ry","shapeImageThreshold","stopOpacity","strokeDasharray","strokeDashoffset","strokeMiterlimit","strokeOpacity","strokeWidth","tabSize","widows","x","y","zIndex","zoom"]);function hasPrefix(string,prefixes){return prefixes.some((prefix=>0===string.indexOf(prefix)))}function isInternalAttribute(attribute){return"key"===attribute||"children"===attribute}function getNormalAttributeValue(attribute,value){return"style"===attribute?function renderStyle(style){if(!function isPlainObject(o){var ctor,prot;return!1!==isObject(o)&&(void 0===(ctor=o.constructor)||!1!==isObject(prot=ctor.prototype)&&!1!==prot.hasOwnProperty("isPrototypeOf"))}(style))return style;let result;for(const property in style){const value=style[property];if(null==value)continue;result?result+=";":result="";result+=getNormalStylePropertyName(property)+":"+getNormalStylePropertyValue(property,value)}return result}(value):value}const SVG_ATTRIBUTE_WITH_DASHES_LIST=["accentHeight","alignmentBaseline","arabicForm","baselineShift","capHeight","clipPath","clipRule","colorInterpolation","colorInterpolationFilters","colorProfile","colorRendering","dominantBaseline","enableBackground","fillOpacity","fillRule","floodColor","floodOpacity","fontFamily","fontSize","fontSizeAdjust","fontStretch","fontStyle","fontVariant","fontWeight","glyphName","glyphOrientationHorizontal","glyphOrientationVertical","horizAdvX","horizOriginX","imageRendering","letterSpacing","lightingColor","markerEnd","markerMid","markerStart","overlinePosition","overlineThickness","paintOrder","panose1","pointerEvents","renderingIntent","shapeRendering","stopColor","stopOpacity","strikethroughPosition","strikethroughThickness","strokeDasharray","strokeDashoffset","strokeLinecap","strokeLinejoin","strokeMiterlimit","strokeOpacity","strokeWidth","textAnchor","textDecoration","textRendering","underlinePosition","underlineThickness","unicodeBidi","unicodeRange","unitsPerEm","vAlphabetic","vHanging","vIdeographic","vMathematical","vectorEffect","vertAdvY","vertOriginX","vertOriginY","wordSpacing","writingMode","xmlnsXlink","xHeight"].reduce(((map,attribute)=>(map[attribute.toLowerCase()]=attribute,map)),{}),CASE_SENSITIVE_SVG_ATTRIBUTES=["allowReorder","attributeName","attributeType","autoReverse","baseFrequency","baseProfile","calcMode","clipPathUnits","contentScriptType","contentStyleType","diffuseConstant","edgeMode","externalResourcesRequired","filterRes","filterUnits","glyphRef","gradientTransform","gradientUnits","kernelMatrix","kernelUnitLength","keyPoints","keySplines","keyTimes","lengthAdjust","limitingConeAngle","markerHeight","markerUnits","markerWidth","maskContentUnits","maskUnits","numOctaves","pathLength","patternContentUnits","patternTransform","patternUnits","pointsAtX","pointsAtY","pointsAtZ","preserveAlpha","preserveAspectRatio","primitiveUnits","refX","refY","repeatCount","repeatDur","requiredExtensions","requiredFeatures","specularConstant","specularExponent","spreadMethod","startOffset","stdDeviation","stitchTiles","suppressContentEditableWarning","suppressHydrationWarning","surfaceScale","systemLanguage","tableValues","targetX","targetY","textLength","viewBox","viewTarget","xChannelSelector","yChannelSelector"].reduce(((map,attribute)=>(map[attribute.toLowerCase()]=attribute,map)),{}),SVG_ATTRIBUTES_WITH_COLONS=["xlink:actuate","xlink:arcrole","xlink:href","xlink:role","xlink:show","xlink:title","xlink:type","xml:base","xml:lang","xml:space","xmlns:xlink"].reduce(((map,attribute)=>(map[attribute.replace(":","").toLowerCase()]=attribute,map)),{});function getNormalAttributeName(attribute){switch(attribute){case"htmlFor":return"for";case"className":return"class"}const attributeLowerCase=attribute.toLowerCase();return CASE_SENSITIVE_SVG_ATTRIBUTES[attributeLowerCase]?CASE_SENSITIVE_SVG_ATTRIBUTES[attributeLowerCase]:SVG_ATTRIBUTE_WITH_DASHES_LIST[attributeLowerCase]?(0,dist_es2015.c)(SVG_ATTRIBUTE_WITH_DASHES_LIST[attributeLowerCase]):SVG_ATTRIBUTES_WITH_COLONS[attributeLowerCase]?SVG_ATTRIBUTES_WITH_COLONS[attributeLowerCase]:attributeLowerCase}function getNormalStylePropertyName(property){return property.startsWith("--")?property:hasPrefix(property,["ms","O","Moz","Webkit"])?"-"+(0,dist_es2015.c)(property):(0,dist_es2015.c)(property)}function getNormalStylePropertyValue(property,value){return"number"!=typeof value||0===value||CSS_PROPERTIES_SUPPORTS_UNITLESS.has(property)?value:value+"px"}function renderElement(element,context,legacyContext={}){if(null==element||!1===element)return"";if(Array.isArray(element))return renderChildren(element,context,legacyContext);switch(typeof element){case"string":return function escapeHTML(value){return escapeLessThan(escapeAmpersand(value))}(element);case"number":return element.toString()}const{type,props}=element;switch(type){case react.StrictMode:case react.Fragment:return renderChildren(props.children,context,legacyContext);case RawHTML:const{children,...wrapperProps}=props;return renderNativeComponent(Object.keys(wrapperProps).length?"div":null,{...wrapperProps,dangerouslySetInnerHTML:{__html:children}},context,legacyContext)}switch(typeof type){case"string":return renderNativeComponent(type,props,context,legacyContext);case"function":return type.prototype&&"function"==typeof type.prototype.render?function renderComponent(Component,props,context,legacyContext={}){const instance=new Component(props,legacyContext);"function"==typeof instance.getChildContext&&Object.assign(legacyContext,instance.getChildContext());const html=renderElement(instance.render(),context,legacyContext);return html}(type,props,context,legacyContext):renderElement(type(props,legacyContext),context,legacyContext)}switch(type&&type.$$typeof){case Provider.$$typeof:return renderChildren(props.children,props.value,legacyContext);case Consumer.$$typeof:return renderElement(props.children(context||type._currentValue),context,legacyContext);case ForwardRef.$$typeof:return renderElement(type.render(props),context,legacyContext)}return""}function renderNativeComponent(type,props,context,legacyContext={}){let content="";if("textarea"===type&&props.hasOwnProperty("value")){content=renderChildren(props.value,context,legacyContext);const{value,...restProps}=props;props=restProps}else props.dangerouslySetInnerHTML&&"string"==typeof props.dangerouslySetInnerHTML.__html?content=props.dangerouslySetInnerHTML.__html:void 0!==props.children&&(content=renderChildren(props.children,context,legacyContext));if(!type)return content;const attributes=function renderAttributes(props){let result="";for(const key in props){const attribute=getNormalAttributeName(key);if(!isValidAttributeName(attribute))continue;let value=getNormalAttributeValue(key,props[key]);if(!ATTRIBUTES_TYPES.has(typeof value))continue;if(isInternalAttribute(key))continue;const isBooleanAttribute=BOOLEAN_ATTRIBUTES.has(attribute);if(isBooleanAttribute&&!1===value)continue;const isMeaningfulAttribute=isBooleanAttribute||hasPrefix(key,["data-","aria-"])||ENUMERATED_ATTRIBUTES.has(attribute);("boolean"!=typeof value||isMeaningfulAttribute)&&(result+=" "+attribute,isBooleanAttribute||("string"==typeof value&&(value=escapeAttribute(value)),result+='="'+value+'"'))}return result}(props);return SELF_CLOSING_TAGS.has(type)?"<"+type+attributes+"/>":"<"+type+attributes+">"+content+"</"+type+">"}function renderChildren(children,context,legacyContext={}){let result="";children=Array.isArray(children)?children:[children];for(let i=0;i<children.length;i++){result+=renderElement(children[i],context,legacyContext)}return result}const serialize=renderElement;function addContainer(ariaLive="polite"){const container=document.createElement("div");container.id=`a11y-speak-${ariaLive}`,container.className="a11y-speak-region",container.setAttribute("style","position: absolute;margin: -1px;padding: 0;height: 1px;width: 1px;overflow: hidden;clip: rect(1px, 1px, 1px, 1px);-webkit-clip-path: inset(50%);clip-path: inset(50%);border: 0;word-wrap: normal !important;"),container.setAttribute("aria-live",ariaLive),container.setAttribute("aria-relevant","additions text"),container.setAttribute("aria-atomic","true");const{body}=document;return body&&body.appendChild(container),container}let previousMessage="";function speak(message,ariaLive){!function clear(){const regions=document.getElementsByClassName("a11y-speak-region"),introText=document.getElementById("a11y-speak-intro-text");for(let i=0;i<regions.length;i++)regions[i].textContent="";introText&&introText.setAttribute("hidden","hidden")}(),message=function filterMessage(message){return message=message.replace(/<[^<>]+>/g," "),previousMessage===message&&(message+=" "),previousMessage=message,message}(message);const introText=document.getElementById("a11y-speak-intro-text"),containerAssertive=document.getElementById("a11y-speak-assertive"),containerPolite=document.getElementById("a11y-speak-polite");containerAssertive&&"assertive"===ariaLive?containerAssertive.textContent=message:containerPolite&&(containerPolite.textContent=message),introText&&introText.removeAttribute("hidden")}!function domReady(callback){"undefined"!=typeof document&&("complete"!==document.readyState&&"interactive"!==document.readyState?document.addEventListener("DOMContentLoaded",callback):callback())}((function setup(){const introText=document.getElementById("a11y-speak-intro-text"),containerAssertive=document.getElementById("a11y-speak-assertive"),containerPolite=document.getElementById("a11y-speak-polite");null===introText&&function addIntroText(){const introText=document.createElement("p");introText.id="a11y-speak-intro-text",introText.className="a11y-speak-intro-text",introText.textContent=(0,build_module.__)("Notifications"),introText.setAttribute("style","position: absolute;margin: -1px;padding: 0;height: 1px;width: 1px;overflow: hidden;clip: rect(1px, 1px, 1px, 1px);-webkit-clip-path: inset(50%);clip-path: inset(50%);border: 0;word-wrap: normal !important;"),introText.setAttribute("hidden","hidden");const{body}=document;return body&&body.appendChild(introText),introText}(),null===containerAssertive&&addContainer("assertive"),null===containerPolite&&addContainer("polite")}));var library_close=__webpack_require__("./node_modules/@wordpress/icons/build-module/library/close.js"),build_module_button=__webpack_require__("./node_modules/@wordpress/components/build-module/button/index.js"),component=__webpack_require__("./node_modules/@wordpress/components/build-module/visually-hidden/component.js"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const noop=()=>{};function getDefaultPoliteness(status){switch(status){case"success":case"warning":case"info":return"polite";default:return"assertive"}}function getStatusLabel(status){switch(status){case"warning":return(0,build_module.__)("Warning notice");case"info":return(0,build_module.__)("Information notice");case"error":return(0,build_module.__)("Error notice");default:return(0,build_module.__)("Notice")}}const notice=function Notice({className,status="info",children,spokenMessage=children,onRemove=noop,isDismissible=!0,actions=[],politeness=getDefaultPoliteness(status),__unstableHTML,onDismiss=noop}){!function useSpokenMessage(message,politeness){const spokenMessage="string"==typeof message?message:serialize(message);(0,react.useEffect)((()=>{spokenMessage&&speak(spokenMessage,politeness)}),[spokenMessage,politeness])}(spokenMessage,politeness);const classes=(0,clsx.A)(className,"components-notice","is-"+status,{"is-dismissible":isDismissible});return __unstableHTML&&"string"==typeof children&&(children=(0,jsx_runtime.jsx)(RawHTML,{children})),(0,jsx_runtime.jsxs)("div",{className:classes,children:[(0,jsx_runtime.jsx)(component.A,{children:getStatusLabel(status)}),(0,jsx_runtime.jsxs)("div",{className:"components-notice__content",children:[children,(0,jsx_runtime.jsx)("div",{className:"components-notice__actions",children:actions.map((({className:buttonCustomClasses,label,isPrimary,variant,noDefaultClasses=!1,onClick,url},index)=>{let computedVariant=variant;return"primary"===variant||noDefaultClasses||(computedVariant=url?"link":"secondary"),void 0===computedVariant&&isPrimary&&(computedVariant="primary"),(0,jsx_runtime.jsx)(build_module_button.Ay,{href:url,variant:computedVariant,onClick:url?void 0:onClick,className:(0,clsx.A)("components-notice__action",buttonCustomClasses),children:label},index)}))})]}),isDismissible&&(0,jsx_runtime.jsx)(build_module_button.Ay,{className:"components-notice__dismiss",icon:library_close.A,label:(0,build_module.__)("Close"),onClick:()=>{onDismiss(),onRemove()}})]})}},"./node_modules/@wordpress/icons/build-module/library/close.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@wordpress/primitives/build-module/svg/index.js"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/jsx-runtime.js");const __WEBPACK_DEFAULT_EXPORT__=(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.t4,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.wA,{d:"m13.06 12 6.47-6.47-1.06-1.06L12 10.94 5.53 4.47 4.47 5.53 10.94 12l-6.47 6.47 1.06 1.06L12 13.06l6.47 6.47 1.06-1.06L13.06 12Z"})})}}]);