import '../common/lit-html-f57783b7.js';
import { css } from '../lit-element.js';
import '../common/directive-651fd9cf.js';

var typography = css`
body, html {
  font-family: var(--font-family-text);
  -webkit-font-smoothing: antialiased;  /* OS X subpixel AA bleed bug */
}

/* [paper-font=display2] */
h1 {
  font-family: var(--font-family-heading, Roboto);
  font-size: var(--font-size-xxx-large, 45);
  font-weight: var(--font-weight-normal, 400);
  letter-spacing: -.018em;
  line-height: 48px;
}

/* [paper-font=display1] */
h2 {
  font-family: var(--font-family-heading, Roboto);
  font-size: var(--font-size-xx-large, 34px);
  font-weight: var(--font-weight-normal, 400);
  letter-spacing: var(--letter-spacing-heading, -.01em);
  line-height: 40px;
}

/* [paper-font=headline] */
h3 {
  font-family: var(--font-family-heading, Roboto);
  font-size: var(--font-size-x-large, 24px);
  font-weight: var(--font-weight-normal, 400);
  letter-spacing: var(--letter-spacing-heading, -.012em);
  line-height: 32px;
}

/* [paper-font=subhead] */
h4 {
  font-family: var(--font-family-heading, Roboto);
  font-size: var(--font-size-large, 16px);
  font-weight: var(--font-weight-normal, 400);
  line-height: 24px;
}

/* [paper-font=body2] */
h5, h6 {
  font-family: var(--font-family-heading, Roboto);
  font-size: var(--font-size-medium, 14px);
  font-weight: var(--font-weight-semi-bold, 500);
  line-height: 24px;
}

/* [paper-font=button] */
/*a {
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.018em;
  line-height: 24px;
  text-transform: uppercase;
}*/

/* Overrides */

body {
  color: #212121;
}

h1, h2, h3, h4, h5, h6, p {
  margin: 0 0 20px 0;
}

h1, h2, h3, h4, h5, h6, a {
  text-rendering: optimizeLegibility;
}

a {
  transition: var(--transition-quickly);
  color: var(--color-primary);
}

a:hover {
  color: var(color-primary-dark);
  text-decoration: none;
}

a:active {
  transition: none;
  opacity: var(--opacity-75);
}

a[target=_blank]:after {
  content: 'open_in_new';
  font-family: var(--mdc-icon-font, "Material Icons");
  font-weight: var(--font-weight-thin, 200);
  padding-left: var(--space-xxx-small, 2px);
  line-height: 0px;
  opacity: 0.6;
  font-size: 0.9rem;
}

code {
   font-family: var(--font-family-code, Mono);
}

`;

var themeColor = css`
  :host([theme~="secondary"]) {
      background: var(--secondary-color);
      color: var(--primary-background-color);
      border-color: var(--primary-background-color);
    }

  :host([theme~="primary"]) {
      background: var(--primary-color);
      color: var(--primary-background-color);
      border-color: var(--primary-background-color);
    }

  :host([theme~="accent"]) {
      background: var(--accent-color);
      color: var(--primary-background-color);
      border-color: var(--primary-background-color);
    }    

`;

var themeTag = css`
    
    :host([theme~=badge]) {
      display: inline-block;
      overflow: hidden;
      max-width: var(--badge-max-width, 150px);
      text-overflow: ellipsis;
      white-space: nowrap;
      border-radius: 2px;
      font-size: 11px;
      padding: 2px 3px;
      cursor: pointer;
      margin-left: 2px;
      margin-right: 2px;
      vertical-align: middle;
    }

    :host([theme~=tag]) {
      padding: 5px;
      border:  1px solid;
      border-radius: 10px;
      display: inline-block;
      margin: 5px;
    }
`;

/*
  show hover will only appear on host hover, avtive or focus
 */
var showHover = css `
  [show-hover] {
    transition: opacity 0.1s;
    opacity: 0;
  }
  
  :host(:hover) [show-hover], :host(:active) [show-hover], :host(:focus) [show-hover], :host([hover]) [show-hover] {
    opacity: 1;
  }
`;

/** use in template 
  <header>
    header content
  </header>
  
  <section id="main">
    <div id="content">
      content
    </div>
    <aside>
      aside content
    </aside>
  </section>

  <footer>
    footer content
  </footer>

**/

var semanticLayout = css`
   :host {
      display: flex;
      min-height: 100vh;
      flex-direction: column;
      margin: 0;
      color: var(--primary-text-color, #212121);
      --sl-aside-max-width: 380px;
    }
   
    
    header {
      text-align: center;
    }
   
    aside {
      flex: 0 0 20vw;
      max-width: var(--sl-aside-max-width);  
    }

    /* we used <div id="main"> instead of <main> 
     * because we want to keep main at appliction level.
     */
    #main {
      display: flex;
      flex: 1;
      box-sizing: border-box;
    }

    #main > * {
      box-sizing: border-box;
    }
    
    #content {
      flex: 1;
      max-width: var(--sl-content-max-width, var(--size-layout-max-width));
      margin: auto;
    }

    @media screen and (max-width: 992px) {
      #main {
        display: block;
      }
    }
  `;

// Note(cg): style for using `lite-youtube` in markdown fields.
// copied from https://github.com/paulirish/lite-youtube-embed/blob/master/src/lite-yt-embed.css
// version 0.1.2

var liteYoutube = css`
lite-youtube {
    background-color: #000;
    position: relative;
    display: block;
    contain: content;
    background-position: center center;
    background-size: cover;
    cursor: pointer;
    max-width: 720px;
}

/* gradient */
lite-youtube::before {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAADGCAYAAAAT+OqFAAAAdklEQVQoz42QQQ7AIAgEF/T/D+kbq/RWAlnQyyazA4aoAB4FsBSA/bFjuF1EOL7VbrIrBuusmrt4ZZORfb6ehbWdnRHEIiITaEUKa5EJqUakRSaEYBJSCY2dEstQY7AuxahwXFrvZmWl2rh4JZ07z9dLtesfNj5q0FU3A5ObbwAAAABJRU5ErkJggg==);
    background-position: top;
    background-repeat: repeat-x;
    height: 60px;
    padding-bottom: 50px;
    width: 100%;
    transition: all 0.2s cubic-bezier(0, 0, 0.2, 1);
}

/* responsive iframe with a 16:9 aspect ratio
    thanks https://css-tricks.com/responsive-iframes/
*/
lite-youtube::after {
    content: "";
    display: block;
    padding-bottom: calc(100% / (16 / 9));
}
lite-youtube > iframe {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
}

/* play button */
lite-youtube > .lty-playbtn {
    width: 68px;
    height: 48px;
    position: absolute;
    transform: translate3d(-50%, -50%, 0);
    top: 50%;
    left: 50%;
    z-index: 1;
    background-color: transparent;
    /* YT's actual play button svg */
    background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 68 48"><path fill="%23f00" fill-opacity="0.8" d="M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55 C3.97,2.33,2.27,4.81,1.48,7.74C0.06,13.05,0,24,0,24s0.06,10.95,1.48,16.26c0.78,2.93,2.49,5.41,5.42,6.19 C12.21,47.87,34,48,34,48s21.79-0.13,27.1-1.55c2.93-0.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74z"></path><path d="M 45,24 27,14 27,34" fill="%23fff"></path></svg>');
    filter: grayscale(100%);
    transition: filter .1s cubic-bezier(0, 0, 0.2, 1);
    border: none;
}

lite-youtube:hover > .lty-playbtn,
lite-youtube .lty-playbtn:focus {
    filter: none;
}

/* Post-click styles */
lite-youtube.lyt-activated {
    cursor: unset;
}
lite-youtube.lyt-activated::before,
lite-youtube.lyt-activated > .lty-playbtn {
    opacity: 0;
    pointer-events: none;
}
`;

export { liteYoutube, semanticLayout, showHover, typography as styleTypography, themeColor, themeTag };
