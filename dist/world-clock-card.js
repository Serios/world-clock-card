var xe=Object.defineProperty;var ke=(s,e,t)=>e in s?xe(s,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):s[e]=t;var re=(s,e,t)=>ke(s,typeof e!="symbol"?e+"":e,t);var U=window,N=U.ShadowRoot&&(U.ShadyCSS===void 0||U.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,D=Symbol(),ae=new WeakMap,z=class{constructor(e,t,i){if(this._$cssResult$=!0,i!==D)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o,t=this.t;if(N&&e===void 0){let i=t!==void 0&&t.length===1;i&&(e=ae.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&ae.set(t,e))}return e}toString(){return this.cssText}},le=s=>new z(typeof s=="string"?s:s+"",void 0,D),H=(s,...e)=>{let t=s.length===1?s[0]:e.reduce(((i,o,r)=>i+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(o)+s[r+1]),s[0]);return new z(t,s,D)},I=(s,e)=>{N?s.adoptedStyleSheets=e.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet)):e.forEach((t=>{let i=document.createElement("style"),o=U.litNonce;o!==void 0&&i.setAttribute("nonce",o),i.textContent=t.cssText,s.appendChild(i)}))},L=N?s=>s:s=>s instanceof CSSStyleSheet?(e=>{let t="";for(let i of e.cssRules)t+=i.cssText;return le(t)})(s):s;var B,M=window,ce=M.trustedTypes,Te=ce?ce.emptyScript:"",he=M.reactiveElementPolyfillSupport,q={toAttribute(s,e){switch(e){case Boolean:s=s?Te:null;break;case Object:case Array:s=s==null?s:JSON.stringify(s)}return s},fromAttribute(s,e){let t=s;switch(e){case Boolean:t=s!==null;break;case Number:t=s===null?null:Number(s);break;case Object:case Array:try{t=JSON.parse(s)}catch{t=null}}return t}},de=(s,e)=>e!==s&&(e==e||s==s),j={attribute:!0,type:String,converter:q,reflect:!1,hasChanged:de},F="finalized",f=class extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this._$Eu()}static addInitializer(e){var t;this.finalize(),((t=this.h)!==null&&t!==void 0?t:this.h=[]).push(e)}static get observedAttributes(){this.finalize();let e=[];return this.elementProperties.forEach(((t,i)=>{let o=this._$Ep(i,t);o!==void 0&&(this._$Ev.set(o,i),e.push(o))})),e}static createProperty(e,t=j){if(t.state&&(t.attribute=!1),this.finalize(),this.elementProperties.set(e,t),!t.noAccessor&&!this.prototype.hasOwnProperty(e)){let i=typeof e=="symbol"?Symbol():"__"+e,o=this.getPropertyDescriptor(e,i,t);o!==void 0&&Object.defineProperty(this.prototype,e,o)}}static getPropertyDescriptor(e,t,i){return{get(){return this[t]},set(o){let r=this[e];this[t]=o,this.requestUpdate(e,r,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)||j}static finalize(){if(this.hasOwnProperty(F))return!1;this[F]=!0;let e=Object.getPrototypeOf(this);if(e.finalize(),e.h!==void 0&&(this.h=[...e.h]),this.elementProperties=new Map(e.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){let t=this.properties,i=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(let o of i)this.createProperty(o,t[o])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(e){let t=[];if(Array.isArray(e)){let i=new Set(e.flat(1/0).reverse());for(let o of i)t.unshift(L(o))}else e!==void 0&&t.push(L(e));return t}static _$Ep(e,t){let i=t.attribute;return i===!1?void 0:typeof i=="string"?i:typeof e=="string"?e.toLowerCase():void 0}_$Eu(){var e;this._$E_=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$Eg(),this.requestUpdate(),(e=this.constructor.h)===null||e===void 0||e.forEach((t=>t(this)))}addController(e){var t,i;((t=this._$ES)!==null&&t!==void 0?t:this._$ES=[]).push(e),this.renderRoot!==void 0&&this.isConnected&&((i=e.hostConnected)===null||i===void 0||i.call(e))}removeController(e){var t;(t=this._$ES)===null||t===void 0||t.splice(this._$ES.indexOf(e)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach(((e,t)=>{this.hasOwnProperty(t)&&(this._$Ei.set(t,this[t]),delete this[t])}))}createRenderRoot(){var e;let t=(e=this.shadowRoot)!==null&&e!==void 0?e:this.attachShadow(this.constructor.shadowRootOptions);return I(t,this.constructor.elementStyles),t}connectedCallback(){var e;this.renderRoot===void 0&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(e=this._$ES)===null||e===void 0||e.forEach((t=>{var i;return(i=t.hostConnected)===null||i===void 0?void 0:i.call(t)}))}enableUpdating(e){}disconnectedCallback(){var e;(e=this._$ES)===null||e===void 0||e.forEach((t=>{var i;return(i=t.hostDisconnected)===null||i===void 0?void 0:i.call(t)}))}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$EO(e,t,i=j){var o;let r=this.constructor._$Ep(e,i);if(r!==void 0&&i.reflect===!0){let n=(((o=i.converter)===null||o===void 0?void 0:o.toAttribute)!==void 0?i.converter:q).toAttribute(t,i.type);this._$El=e,n==null?this.removeAttribute(r):this.setAttribute(r,n),this._$El=null}}_$AK(e,t){var i;let o=this.constructor,r=o._$Ev.get(e);if(r!==void 0&&this._$El!==r){let n=o.getPropertyOptions(r),l=typeof n.converter=="function"?{fromAttribute:n.converter}:((i=n.converter)===null||i===void 0?void 0:i.fromAttribute)!==void 0?n.converter:q;this._$El=r,this[r]=l.fromAttribute(t,n.type),this._$El=null}}requestUpdate(e,t,i){let o=!0;e!==void 0&&(((i=i||this.constructor.getPropertyOptions(e)).hasChanged||de)(this[e],t)?(this._$AL.has(e)||this._$AL.set(e,t),i.reflect===!0&&this._$El!==e&&(this._$EC===void 0&&(this._$EC=new Map),this._$EC.set(e,i))):o=!1),!this.isUpdatePending&&o&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(t){Promise.reject(t)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var e;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach(((o,r)=>this[r]=o)),this._$Ei=void 0);let t=!1,i=this._$AL;try{t=this.shouldUpdate(i),t?(this.willUpdate(i),(e=this._$ES)===null||e===void 0||e.forEach((o=>{var r;return(r=o.hostUpdate)===null||r===void 0?void 0:r.call(o)})),this.update(i)):this._$Ek()}catch(o){throw t=!1,this._$Ek(),o}t&&this._$AE(i)}willUpdate(e){}_$AE(e){var t;(t=this._$ES)===null||t===void 0||t.forEach((i=>{var o;return(o=i.hostUpdated)===null||o===void 0?void 0:o.call(i)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(e){return!0}update(e){this._$EC!==void 0&&(this._$EC.forEach(((t,i)=>this._$EO(i,this[i],t))),this._$EC=void 0),this._$Ek()}updated(e){}firstUpdated(e){}};f[F]=!0,f.elementProperties=new Map,f.elementStyles=[],f.shadowRootOptions={mode:"open"},he?.({ReactiveElement:f}),((B=M.reactiveElementVersions)!==null&&B!==void 0?B:M.reactiveElementVersions=[]).push("1.6.3");var Z,R=window,b=R.trustedTypes,ue=b?b.createPolicy("lit-html",{createHTML:s=>s}):void 0,W="$lit$",g=`lit$${(Math.random()+"").slice(9)}$`,$e="?"+g,Pe=`<${$e}>`,A=document,x=()=>A.createComment(""),k=s=>s===null||typeof s!="object"&&typeof s!="function",ye=Array.isArray,Oe=s=>ye(s)||typeof s?.[Symbol.iterator]=="function",V=`[ 	
\f\r]`,C=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,me=/-->/g,pe=/>/g,$=RegExp(`>|${V}(?:([^\\s"'>=/]+)(${V}*=${V}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),fe=/'/g,_e=/"/g,Ae=/^(?:script|style|textarea|title)$/i,we=s=>(e,...t)=>({_$litType$:s,strings:e,values:t}),_=we(1),je=we(2),w=Symbol.for("lit-noChange"),u=Symbol.for("lit-nothing"),ve=new WeakMap,y=A.createTreeWalker(A,129,null,!1);function be(s,e){if(!Array.isArray(s)||!s.hasOwnProperty("raw"))throw Error("invalid template strings array");return ue!==void 0?ue.createHTML(e):e}var Ue=(s,e)=>{let t=s.length-1,i=[],o,r=e===2?"<svg>":"",n=C;for(let l=0;l<t;l++){let a=s[l],c,h,d=-1,m=0;for(;m<a.length&&(n.lastIndex=m,h=n.exec(a),h!==null);)m=n.lastIndex,n===C?h[1]==="!--"?n=me:h[1]!==void 0?n=pe:h[2]!==void 0?(Ae.test(h[2])&&(o=RegExp("</"+h[2],"g")),n=$):h[3]!==void 0&&(n=$):n===$?h[0]===">"?(n=o??C,d=-1):h[1]===void 0?d=-2:(d=n.lastIndex-h[2].length,c=h[1],n=h[3]===void 0?$:h[3]==='"'?_e:fe):n===_e||n===fe?n=$:n===me||n===pe?n=C:(n=$,o=void 0);let p=n===$&&s[l+1].startsWith("/>")?" ":"";r+=n===C?a+Pe:d>=0?(i.push(c),a.slice(0,d)+W+a.slice(d)+g+p):a+g+(d===-2?(i.push(void 0),l):p)}return[be(s,r+(s[t]||"<?>")+(e===2?"</svg>":"")),i]},T=class s{constructor({strings:e,_$litType$:t},i){let o;this.parts=[];let r=0,n=0,l=e.length-1,a=this.parts,[c,h]=Ue(e,t);if(this.el=s.createElement(c,i),y.currentNode=this.el.content,t===2){let d=this.el.content,m=d.firstChild;m.remove(),d.append(...m.childNodes)}for(;(o=y.nextNode())!==null&&a.length<l;){if(o.nodeType===1){if(o.hasAttributes()){let d=[];for(let m of o.getAttributeNames())if(m.endsWith(W)||m.startsWith(g)){let p=h[n++];if(d.push(m),p!==void 0){let Ce=o.getAttribute(p.toLowerCase()+W).split(g),O=/([.?@])?(.*)/.exec(p);a.push({type:1,index:r,name:O[2],strings:Ce,ctor:O[1]==="."?K:O[1]==="?"?J:O[1]==="@"?G:E})}else a.push({type:6,index:r})}for(let m of d)o.removeAttribute(m)}if(Ae.test(o.tagName)){let d=o.textContent.split(g),m=d.length-1;if(m>0){o.textContent=b?b.emptyScript:"";for(let p=0;p<m;p++)o.append(d[p],x()),y.nextNode(),a.push({type:2,index:++r});o.append(d[m],x())}}}else if(o.nodeType===8)if(o.data===$e)a.push({type:2,index:r});else{let d=-1;for(;(d=o.data.indexOf(g,d+1))!==-1;)a.push({type:7,index:r}),d+=g.length-1}r++}}static createElement(e,t){let i=A.createElement("template");return i.innerHTML=e,i}};function S(s,e,t=s,i){var o,r,n,l;if(e===w)return e;let a=i!==void 0?(o=t._$Co)===null||o===void 0?void 0:o[i]:t._$Cl,c=k(e)?void 0:e._$litDirective$;return a?.constructor!==c&&((r=a?._$AO)===null||r===void 0||r.call(a,!1),c===void 0?a=void 0:(a=new c(s),a._$AT(s,t,i)),i!==void 0?((n=(l=t)._$Co)!==null&&n!==void 0?n:l._$Co=[])[i]=a:t._$Cl=a),a!==void 0&&(e=S(s,a._$AS(s,e.values),a,i)),e}var Y=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){var t;let{el:{content:i},parts:o}=this._$AD,r=((t=e?.creationScope)!==null&&t!==void 0?t:A).importNode(i,!0);y.currentNode=r;let n=y.nextNode(),l=0,a=0,c=o[0];for(;c!==void 0;){if(l===c.index){let h;c.type===2?h=new P(n,n.nextSibling,this,e):c.type===1?h=new c.ctor(n,c.name,c.strings,this,e):c.type===6&&(h=new Q(n,this,e)),this._$AV.push(h),c=o[++a]}l!==c?.index&&(n=y.nextNode(),l++)}return y.currentNode=A,r}v(e){let t=0;for(let i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}},P=class s{constructor(e,t,i,o){var r;this.type=2,this._$AH=u,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=o,this._$Cp=(r=o?.isConnected)===null||r===void 0||r}get _$AU(){var e,t;return(t=(e=this._$AM)===null||e===void 0?void 0:e._$AU)!==null&&t!==void 0?t:this._$Cp}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=S(this,e,t),k(e)?e===u||e==null||e===""?(this._$AH!==u&&this._$AR(),this._$AH=u):e!==this._$AH&&e!==w&&this._(e):e._$litType$!==void 0?this.g(e):e.nodeType!==void 0?this.$(e):Oe(e)?this.T(e):this._(e)}k(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}$(e){this._$AH!==e&&(this._$AR(),this._$AH=this.k(e))}_(e){this._$AH!==u&&k(this._$AH)?this._$AA.nextSibling.data=e:this.$(A.createTextNode(e)),this._$AH=e}g(e){var t;let{values:i,_$litType$:o}=e,r=typeof o=="number"?this._$AC(e):(o.el===void 0&&(o.el=T.createElement(be(o.h,o.h[0]),this.options)),o);if(((t=this._$AH)===null||t===void 0?void 0:t._$AD)===r)this._$AH.v(i);else{let n=new Y(r,this),l=n.u(this.options);n.v(i),this.$(l),this._$AH=n}}_$AC(e){let t=ve.get(e.strings);return t===void 0&&ve.set(e.strings,t=new T(e)),t}T(e){ye(this._$AH)||(this._$AH=[],this._$AR());let t=this._$AH,i,o=0;for(let r of e)o===t.length?t.push(i=new s(this.k(x()),this.k(x()),this,this.options)):i=t[o],i._$AI(r),o++;o<t.length&&(this._$AR(i&&i._$AB.nextSibling,o),t.length=o)}_$AR(e=this._$AA.nextSibling,t){var i;for((i=this._$AP)===null||i===void 0||i.call(this,!1,!0,t);e&&e!==this._$AB;){let o=e.nextSibling;e.remove(),e=o}}setConnected(e){var t;this._$AM===void 0&&(this._$Cp=e,(t=this._$AP)===null||t===void 0||t.call(this,e))}},E=class{constructor(e,t,i,o,r){this.type=1,this._$AH=u,this._$AN=void 0,this.element=e,this.name=t,this._$AM=o,this.options=r,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=u}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(e,t=this,i,o){let r=this.strings,n=!1;if(r===void 0)e=S(this,e,t,0),n=!k(e)||e!==this._$AH&&e!==w,n&&(this._$AH=e);else{let l=e,a,c;for(e=r[0],a=0;a<r.length-1;a++)c=S(this,l[i+a],t,a),c===w&&(c=this._$AH[a]),n||(n=!k(c)||c!==this._$AH[a]),c===u?e=u:e!==u&&(e+=(c??"")+r[a+1]),this._$AH[a]=c}n&&!o&&this.j(e)}j(e){e===u?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},K=class extends E{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===u?void 0:e}},Ne=b?b.emptyScript:"",J=class extends E{constructor(){super(...arguments),this.type=4}j(e){e&&e!==u?this.element.setAttribute(this.name,Ne):this.element.removeAttribute(this.name)}},G=class extends E{constructor(e,t,i,o,r){super(e,t,i,o,r),this.type=5}_$AI(e,t=this){var i;if((e=(i=S(this,e,t,0))!==null&&i!==void 0?i:u)===w)return;let o=this._$AH,r=e===u&&o!==u||e.capture!==o.capture||e.once!==o.once||e.passive!==o.passive,n=e!==u&&(o===u||r);r&&this.element.removeEventListener(this.name,this,o),n&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t,i;typeof this._$AH=="function"?this._$AH.call((i=(t=this.options)===null||t===void 0?void 0:t.host)!==null&&i!==void 0?i:this.element,e):this._$AH.handleEvent(e)}},Q=class{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){S(this,e)}};var ge=R.litHtmlPolyfillSupport;ge?.(T,P),((Z=R.litHtmlVersions)!==null&&Z!==void 0?Z:R.litHtmlVersions=[]).push("2.8.0");var Se=(s,e,t)=>{var i,o;let r=(i=t?.renderBefore)!==null&&i!==void 0?i:e,n=r._$litPart$;if(n===void 0){let l=(o=t?.renderBefore)!==null&&o!==void 0?o:null;r._$litPart$=n=new P(e.insertBefore(x(),l),l,void 0,t??{})}return n._$AI(s),n};var X,ee;var v=class extends f{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e,t;let i=super.createRenderRoot();return(e=(t=this.renderOptions).renderBefore)!==null&&e!==void 0||(t.renderBefore=i.firstChild),i}update(e){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Se(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this._$Do)===null||e===void 0||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._$Do)===null||e===void 0||e.setConnected(!1)}render(){return w}};v.finalized=!0,v._$litElement$=!0,(X=globalThis.litElementHydrateSupport)===null||X===void 0||X.call(globalThis,{LitElement:v});var Ee=globalThis.litElementPolyfillSupport;Ee?.({LitElement:v});((ee=globalThis.litElementVersions)!==null&&ee!==void 0?ee:globalThis.litElementVersions=[]).push("3.3.3");var oe=[{timezone:"America/New_York",name:"New York"},{timezone:"Europe/London",name:"London"},{timezone:"Europe/Moscow",name:"Moscow"}],ze={long:{year:"numeric",month:"long",day:"numeric"},medium:{year:"numeric",month:"short",day:"numeric"},short:{year:"2-digit",month:"short",day:"numeric"},extra_short:{month:"short",day:"numeric"},numeric:{year:"numeric",month:"2-digit",day:"2-digit"}},He={long:"long",medium:"short",short:"short",extra_short:"short",numeric:"long"},se=class extends v{static get properties(){return{hass:{attribute:!1},config:{attribute:!1}}}static get styles(){return H`
      :host {
        display: block;
        cursor: default;
        --mdc-icon-size: 5em;
        /* Establishes this card as a query container so its internal
           layout can respond to its own rendered width — independent
           of however many grid columns HA's Sections view happens to
           be giving it, which the card has no direct way to read. */
        container-type: inline-size;
        container-name: world-clock-card;
      }
      .content {
        padding: 24px 16px;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
      }
      .main-clock {
        padding: 0;
        margin: 0;
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        justify-content: center;
        flex: 0 0 100%;
        align-content: center;
        align-items: baseline;
        color: var(--primary-text-color);
      }
      .clockicon {
        align-self: baseline;
        margin-right: 1.2em;
      }
      .time {
        font-family: var(--paper-font-headline_-_font-family);
        font-size: clamp(3.5rem, 9cqi, 3rem);
        font-weight: var(--paper-font-headline_-_font-weight);
        letter-spacing: var(--paper-font-headline_-_letter-spacing);
        line-height: 1.1em;
        white-space: nowrap;
      }
      .date {
        font-family: var(--paper-font-headline_-_font-family);
        font-size: clamp(0.8rem, 4cqi, 1.3rem);
        font-weight: var(--paper-font-headline_-_font-weight);
        letter-spacing: var(--paper-font-headline_-_letter-spacing);
        line-height: var(--paper-font-headline_-_line-height);
      }
      .ampm {
        font-size: 0.3em;
        font-weight: 500;
        vertical-align: super;
        margin-left: -0.5em;
      }
      .zones-clocks {
        padding: 0;
        margin: 0;
        margin-top: 1em;
        display: flex;
        flex-wrap: nowrap;
        flex-direction: row;
        flex: 0 0 100%;
        justify-content: space-evenly;
        text-align: center;
        align-items: center;
        color: var(--primary-text-color);
      }
      .zone-time,
      .zone-name {
        color: var(--primary-text-color);
        font-family: var(--paper-font-headline_-_font-family);
        font-weight: var(--paper-font-headline_-_font-weight);
        letter-spacing: var(--paper-font-headline_-_letter-spacing);
        font-size: clamp(1rem, 6cqi, 2rem);
        white-space: nowrap;
      }
      .zone-name {
        color: var(--secondary-text-color);
        font-size: clamp(0.65rem, 3cqi, 1rem);
      }

      /* Below roughly the space a 9-column card gets: drop the icon,
         its width isn't earning its keep once things get tight. */
      @container world-clock-card (max-width: 420px) {
        .clockicon {
          display: none;
        }
      }

      /* Narrower still: three zone columns side by side stop working
         at all, so stack them instead of letting them wrap mid-value.
         Each zone row now gets the full card width to itself, so it
         can afford to be a bit larger than the 3-across layout was. */
      @container world-clock-card (max-width: 320px) {
        .date-time {
          text-align: center;
        }
        .time {
          font-size: clamp(2.8rem, 14cqi, 3.6rem);
        }
        .date {
          font-size: clamp(0.8rem, 6cqi, 1rem);
          line-height: 1rem;
        }
        .zones-clocks {
          flex-direction: column;
          align-items: center;
          gap: 0.75em;
        }
        .zone-time {
          font-size: clamp(1.4rem, 11cqi, 1.8rem);
        }
        .zone-name {
          font-size: clamp(0.8rem, 5cqi, 1rem);
        }
      }
    `}constructor(){super(),this._now=new Date,this._timer=void 0}static getStubConfig(){return{time_format:"auto",show_seconds:!0,date_format:"long",show_weekday:!0,locale:"auto",zones:oe}}static getConfigElement(){return document.createElement("world-clock-card-editor")}setConfig(e){if(!e)throw new Error("Invalid configuration");if(e.zones&&e.zones.length!==3)throw new Error("world-clock-card requires exactly 3 zones");this.config=e}set hass(e){this._hass=e}get hass(){return this._hass}connectedCallback(){super.connectedCallback(),this._tick(),this._timer=setInterval(()=>this._tick(),1e3)}disconnectedCallback(){super.disconnectedCallback(),this._timer&&(clearInterval(this._timer),this._timer=void 0)}_tick(){this._now=new Date,this.requestUpdate()}_zones(){return this.config?.zones??oe}_locale(){let e=this.config?.locale;return e&&e!=="auto"?e:this._hass?.locale?.language??"en"}_hour12(){let e=this.config?.time_format??"auto";if(e==="12h")return!0;if(e==="24h")return!1;let t=this._hass?.locale?.time_format;if(t==="12")return!0;if(t==="24")return!1}_mainTimeFormatter(){let e=this.config?.show_seconds??!0;return new Intl.DateTimeFormat(this._locale(),{hour12:this._hour12(),hour:"2-digit",minute:"2-digit",...e?{second:"2-digit"}:{}})}_zoneTimeFormatter(e){return new Intl.DateTimeFormat(this._locale(),{timeZone:e,hour12:this._hour12(),hour:"2-digit",minute:"2-digit"})}_renderTime(e){return e.formatToParts(this._now).map(t=>t.type==="dayPeriod"?_`<span class="ampm">${t.value}</span>`:t.value)}_formatDate(){let e=this.config?.date_format??"long",t=this.config?.show_weekday??!0;if(e==="iso"){let r=this._now.getFullYear(),n=String(this._now.getMonth()+1).padStart(2,"0"),l=String(this._now.getDate()).padStart(2,"0");return`${r}-${n}-${l}`}let i=ze[e]??ze.long,o=t?{weekday:He[e]??"long",...i}:i;return this._now.toLocaleDateString(this._locale(),o)}render(){let e=this._zones();return _`
      <ha-card .header=${this.config?.title||void 0}>
        <div class="content">
          <div class="main-clock">
            <div class="clockicon">
              <ha-icon icon="mdi:clock-outline"></ha-icon>
            </div>
            <div class="date-time">
              <div class="time">${this._renderTime(this._mainTimeFormatter())}</div>
              <div class="date">${this._formatDate()}</div>
            </div>
          </div>
          <div class="zones-clocks">
            ${e.map(t=>_`
                <div class="clock-zone">
                  <div class="zone-time">
                    ${this._renderTime(this._zoneTimeFormatter(t.timezone))}
                  </div>
                  <div class="zone-name">${t.name}</div>
                </div>
              `)}
          </div>
        </div>
      </ha-card>
    `}getCardSize(){return 3}getGridOptions(){return{columns:12,rows:"auto",min_columns:6,max_columns:12,min_rows:3,max_rows:4}}};customElements.define("world-clock-card",se);window.customCards=window.customCards||[];window.customCards.push({type:"world-clock-card",name:"World Clock Card",description:"Shows the local time and date, plus the current time in three other timezones.",preview:!0});var te=[{name:"Sofia",timezone:"Europe/Sofia"},{name:"London",timezone:"Europe/London"},{name:"Paris",timezone:"Europe/Paris"},{name:"Berlin",timezone:"Europe/Berlin"},{name:"Moscow",timezone:"Europe/Moscow"},{name:"Istanbul",timezone:"Europe/Istanbul"},{name:"New York",timezone:"America/New_York"},{name:"Los Angeles",timezone:"America/Los_Angeles"},{name:"Chicago",timezone:"America/Chicago"},{name:"Mexico City",timezone:"America/Mexico_City"},{name:"Sao Paulo",timezone:"America/Sao_Paulo"},{name:"Dubai",timezone:"Asia/Dubai"},{name:"Mumbai",timezone:"Asia/Kolkata"},{name:"Bangkok",timezone:"Asia/Bangkok"},{name:"Shanghai",timezone:"Asia/Shanghai"},{name:"Tokyo",timezone:"Asia/Tokyo"},{name:"Seoul",timezone:"Asia/Seoul"},{name:"Singapore",timezone:"Asia/Singapore"},{name:"Sydney",timezone:"Australia/Sydney"},{name:"Auckland",timezone:"Pacific/Auckland"},{name:"Cairo",timezone:"Africa/Cairo"},{name:"Johannesburg",timezone:"Africa/Johannesburg"}],Le={title:"Title (optional)",time_format:"Time format",show_seconds:"Show seconds on main clock",date_format:"Date format",show_weekday:"Show day name",locale:"Locale"};function ie(s,e,t){s.dispatchEvent(new CustomEvent(e,{detail:t,bubbles:!0,composed:!0}))}var ne=class extends v{constructor(){super();re(this,"_computeLabel",t=>Le[t.name]??t.name);this._customZoneOverride=[!1,!1,!1]}static get properties(){return{hass:{attribute:!1},config:{attribute:!1},_customZoneOverride:{state:!0}}}static get styles(){return H`
      .zones-heading {
        margin: 16px 0 8px;
        font-weight: 500;
        color: var(--primary-text-color);
      }
      .zones-help {
        margin: 0 0 12px;
        font-size: 12px;
        color: var(--secondary-text-color);
      }
      .zones-help a {
        color: var(--primary-color);
      }
      .zone-row {
        display: flex;
        gap: 8px;
        align-items: center;
        margin-bottom: 8px;
        flex-wrap: wrap;
      }
      .zone-row > * {
        flex: 1;
        min-width: 140px;
      }
      .field {
        display: flex;
        flex-direction: column;
        gap: 4px;
      }
      .field label {
        font-size: 12px;
        color: var(--secondary-text-color);
      }
      .field select,
      .field input[type="text"] {
        padding: 10px 8px;
        border-radius: 4px;
        border: 1px solid var(--divider-color, #ccc);
        background: var(--card-background-color, #fff);
        color: var(--primary-text-color);
        font-size: 1em;
        font-family: inherit;
      }
    `}setConfig(t){this.config=t}_zones(){return this.config?.zones??oe}_localeOptions(){let t=this._hass?.translationMetadata?.translations,i={value:"auto",label:"Auto (use Home Assistant setting)"};if(!t)return[i];let o=Object.entries(t).map(([r,n])=>({value:r,label:n?.nativeName??r}));return o.sort((r,n)=>r.label.localeCompare(n.label)),[i,...o]}_schema(){return[{name:"title",selector:{text:{}}},{name:"time_format",selector:{select:{mode:"dropdown",options:[{value:"auto",label:"Auto (use Home Assistant setting)"},{value:"12h",label:"12-hour"},{value:"24h",label:"24-hour"}]}}},{name:"show_seconds",selector:{boolean:{}}},{name:"date_format",selector:{select:{mode:"dropdown",options:[{value:"long",label:"Long - Thursday, September 10, 2026"},{value:"medium",label:"Medium - Thu, Sep 10, 2026"},{value:"short",label:"Short - Thu, Sep 10, 26"},{value:"extra_short",label:"Extra short - Thu, Sep 10"},{value:"numeric",label:"Numeric - Thursday, 10.09.2026"},{value:"iso",label:"ISO - 2026-09-10"}]}}},{name:"show_weekday",selector:{boolean:{}},disabled:this.config?.date_format==="iso"},{name:"locale",selector:{select:{mode:"dropdown",options:this._localeOptions()}}}]}_valueChanged(t){let i={...this.config,...t.detail.value};ie(this,"config-changed",{config:i})}_zoneCityChanged(t,i){let o=i.target.value;if(o==="custom"){let l=[...this._customZoneOverride];l[t]=!0,this._customZoneOverride=l;return}if(this._customZoneOverride[t]){let l=[...this._customZoneOverride];l[t]=!1,this._customZoneOverride=l}let r=[...this._zones()],n=te.find(l=>l.timezone===o);n&&(r[t]={timezone:n.timezone,name:n.name}),ie(this,"config-changed",{config:{...this.config,zones:r}})}_zoneFieldChanged(t,i,o){let r=[...this._zones()];r[t]={...r[t],[i]:o},ie(this,"config-changed",{config:{...this.config,zones:r}})}_renderZoneEditor(t,i){let r=!(this._customZoneOverride?.[i]??!1)&&te.find(n=>n.timezone===t.timezone);return _`
      <div class="zone-row">
        <div class="field">
          <label>Zone ${i+1} city</label>
          <select @change=${n=>this._zoneCityChanged(i,n)}>
            ${te.map(n=>_`
                <option
                  value=${n.timezone}
                  ?selected=${!!r&&r.timezone===n.timezone}
                >
                  ${n.name}
                </option>
              `)}
            <option value="custom" ?selected=${!r}>Custom...</option>
          </select>
        </div>
        ${r?"":_`
              <div class="field">
                <label>Timezone (IANA)</label>
                <input
                  type="text"
                  .value=${t.timezone??""}
                  @input=${n=>this._zoneFieldChanged(i,"timezone",n.target.value)}
                />
              </div>
            `}
        <div class="field">
          <label>Label</label>
          <input
            type="text"
            .value=${t.name??""}
            @input=${n=>this._zoneFieldChanged(i,"name",n.target.value)}
          />
        </div>
      </div>
    `}set hass(t){this._hass=t}render(){return this.config?_`
      <ha-form
        .hass=${this._hass}
        .data=${this.config}
        .schema=${this._schema()}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._valueChanged}
      ></ha-form>
      <div class="zones-heading">Zones</div>
      <div class="zones-help">
        Pick a city for each zone, or choose "Custom" to enter any IANA
        time zone name directly (e.g. Europe/Sofia). See the
        <a
          href="https://en.wikipedia.org/wiki/List_of_tz_database_time_zones"
          target="_blank"
          rel="noopener noreferrer"
          >full list of IANA time zones on Wikipedia</a
        >.
      </div>
      ${this._zones().map((t,i)=>this._renderZoneEditor(t,i))}
    `:_``}};customElements.define("world-clock-card-editor",ne);
/*! Bundled license information:

@lit/reactive-element/css-tag.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/reactive-element.js:
lit-html/lit-html.js:
lit-element/lit-element.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/is-server.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
*/
