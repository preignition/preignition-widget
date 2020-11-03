import { LitElement, html, css } from 'lit-element';
import { nothing } from 'lit-html';
import { ifDefined } from 'lit-html/directives/if-defined.js';
import { styleTypography } from '../../style/index.js';

import '@material/mwc-button';

/*
 # tooltip
 show a tooltip over an element

 ## example
 `<pwi-tooltip message="this is the tooltip`>hover me</pwi-tooltip>

  @csspart tooltip
  @csspart message
  @csspart heading
  @csspart outline

  @cssprop --pwi-tooltip-border-radius - tooltip header readius
  @cssprop --pwi-tooltip-background-color - tooltip background color
  @cssprop --pwi-tooltip-decoration-color - color used for highlighting tooltip target (underline, outline)
  @cssprop --pwi-tooltip-color - tooltip text color
  @cssprop --pwi-tooltip-font-weight
  @cssprop --pwi-tooltip-font-size
  @cssprop --pwi-tooltip-line-height
  @cssprop --pwi-tooltip-padding
 */
class PwiTooltip extends LitElement {

  static get styles() {
    return [styleTypography, css `
    /**
     * @prop --hide-delay: The amount of time to wait before hiding the tooltip.
     * @prop --hide-duration: The amount of time the hide transition takes to complete.
     * @prop --hide-timing-function: The timing function (easing) to use for the hide transition.
     * @prop --max-width: The maximum width of the tooltip.
     * @prop --show-delay: The amount of time to wait before showing the tooltip.
     * @prop --show-duration: The amount of time the show transition takes to complete.
     * @prop --show-timing-function: The timing function (easing) to use for the show transition.
     */
    :host {
      --max-width: 20rem;
      --hide-delay: 0s;
      --hide-duration: 0.1s;
      --hide-timing-function: ease;
      --show-delay: 0.1s;
      --show-duration: 0.1s;
      --show-timing-function: ease;
      display: inline-block;
      position: relative;
    }


    #outline {
      padding: 0 2px;
      border-radius: 2px;
      position: relative;
      margin-right: 13px;
    }
    
    #outline::after {
      content: "";
      position: absolute;
      background-color: var(--secondary-text-color);
      opacity: 0.1;
      inset: 0px;
      border-radius: 4px;
    }
    
     mwc-icon {
      --mdc-icon-size: 14px;
      color: var(--secondary-text-color);
      position: absolute;
      top: -3px;
      right: -12px;
    }

    #outline:hover, #outline:active, #outline:focus {
      outline: none;
      text-decoration: none;
    }
    
    #outline:hover mwc-icon, #outline:active mwc-icon, #outline:focus mwc-icon {
      color: var(--pwi-tooltip-decoration-color);
    }
    
    #outline:hover::after, #outline:active::after, #outline:focus::after {
      background-color: var(--pwi-tooltip-decoration-color);
      opacity: 0.25;
    }

    #tooltip {
      position: absolute;
      z-index: var(--z-index-popup);
      max-width: var(--max-width);
      border-radius: var(--pwi-tooltip-border-radius);
      background-color: var(--pwi-tooltip-background-color);
      font-family: var(--pwi-tooltip-font-family);
      font-size: var(--pwi-tooltip-font-size);
      font-weight: var(--pwi-tooltip-font-weight);
      line-height: var(--pwi-tooltip-line-height);
      opacity: 1;
      color: var(--pwi-tooltip-color);
      padding: var(--pwi-tooltip-padding);
      transform: scale(0.2);
      transform-origin: center;
      transition-property: opacity, transform;
      transition-delay: var(--hide-delay);
      transition-duration: var(--hide-duration);
      transition-timing-function: var(--hide-timing-function);
    }

    #tooltip[aria-hidden] {
      opacity: 0;
    }

    #tooltip.top {
        top: 0;
        left: 50%;
        transform: translate(-50%, calc(-100% - 0.6rem)) scale(0.2);
    }

    #tooltip.visible.top {
        transform: translate(-50%, calc(-100% - 0.6rem)) scale(1);
    }

    #tooltip.bottom {
        bottom: 0;
        left: 50%;
        transform: translate(-50%, calc(100% + 0.6rem)) scale(0.2);
    }

    #tooltip.visible.bottom {
      transform: translate(-50%, calc(100% + 0.6rem)) scale(1);
     }

    #tooltip.right {
        bottom: 50%;
        right: 0;
        transform: translate(calc(100% + 0.6rem), 50%) scale(0.2);
    }
    #tooltip.visible.right {
        transform: translate(calc(100% + 0.6rem), 50%) scale(1);
    }

    #tooltip.left {
        bottom: 50%;
        left: 0;
        transform: translate(calc(-100% - 0.6rem), 50%) scale(0.2);
    }

    #tooltip.visible.left {
        transform: translateX(calc(-100% - 0.6rem), 50%) scale(1);
    }

    #tooltip::before {
        background-color: var(--pwi-tooltip-background-color);
        content: ' ';
        
        position: absolute;
        width: 0.6rem;
        height: 0.6rem;
        z-index: var(--z-index-popup);
    }

    #tooltip.bottom::before {
        top: 0;
        left: 50%;
        transform: translate(-50%, calc(-100% + 0.4rem)) rotate(45deg);
    }

    #tooltip.top::before {
        bottom: 0;
        left: 50%;
        transform: translate(-50%, calc(100% - 0.4rem)) rotate(45deg);
    }

    #tooltip.left::before {
        top: 50%;
        right: 0;
        transform: translate(calc(100% - 0.4rem), -50%) rotate(45deg);
    }

    #tooltip.right::before {
        top: 50%;
        left: 0;
        transform: translate(calc(-100% + 0.4rem), -50%) rotate(45deg);
    }

    .buttons {
      margin: var(--space-xx-small) 0;
      text-align: center;
    }
    .heading {
      margin: var(--space-xx-small) 0;
      font-size: larger;
    }

    .message {

    }

    `];
  }
  static get properties() {
    return {
      heading: { type: String },
      message: { type: String },
      tipwidth: { type: String },
      /**
       * The preferred placement of the tooltip. Note that the actual placement may vary as needed to keep the tooltip
       * inside of the viewport  {'top' | 'top-start' | 'top-end' | 'right' | 'right-start' | 'right-end' | 'bottom' | 'bottom-start' | 'bottom-end' | 'left' | 'left-start' | 'left-end'  }
       */
      position: {
        type: String
      },
      fireonclick: { type: Boolean },
      _opened: { type: Boolean },
    };
  }

  render() {
    return html `
      ${this.renderTooltip()}
        <span 
          id="outline"
          part="outline"
          aria-describedby="tooltip"
          tabindex="0"
          @keydown="${e => {e.code === 'Enter' || e.code === 'Space' ? this.toggleTooltip() : '';}}"
          @mouseover="${() => { this.fireonclick ? '' : this.showTooltip();}}"
          @mouseout="${() => { this.fireonclick ? '' : this.hideTooltip();}}"
          @click="${() => {this.fireonclick ? this.showTooltip() : '';}}">
          <slot></slot>
          <mwc-icon>info</mwc-icon>
        </span>
    `;
  }

  renderTooltip() {
    return html `
      <div part="tooltip" 
        id="tooltip" 
        class="${this.position} ${this._opened ? 'visible' : ''}"  
        aria-hidden="${ifDefined(this._opened ? undefined : 'true')}"
        role="tooltip"  
        style="${`min-width: ${this.tipwidth}px;`}">
          ${this.heading ? html `<header part="heading" class="heading">${this.heading}</header>` : nothing}
          <div part="message" class="message">${this.message}</div>
        ${this.fireonclick ? html `<div class="buttons"><mwc-button label="close" dense unelevated @click="${this.toggleTooltip}"></mwc-button><div>` : nothing}
      </div>
    `;
  }

  constructor() {
    super();

    // property defaults
    this.position = 'top';
    this.tipwidth = 200;
    this.opened = false;
  }

  hideTooltip() {
    this._opened = false;
  }

  showTooltip() {
    this._opened = true;
  }

  toggleTooltip() {
    this._opened = !this._opened;
  }
}

// Register the new element with the browser.
customElements.define('pwi-tooltip', PwiTooltip);

export default PwiTooltip;
