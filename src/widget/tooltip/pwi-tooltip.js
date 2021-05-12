import { LitElement, html, css } from 'lit-element';
import { nothing } from 'lit-html';
import { ifDefined } from 'lit-html/directives/if-defined.js';
import { styleTypography } from '@preignition/preignition-styles';

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
     * 
     * @prop --pwi-tooltip-border-radius: tooltip radius.
     * @prop --pwi-tooltip-background-color: color of background.
     * @prop --pwi-tooltip-decoration-color: color for icon and hover.
     * @prop --pwi-tooltip-color: text color.
     * @prop --pwi-tooltip-font-weight: 
     * @prop --pwi-tooltip-font-size: 
     * @prop --pwi-tooltip-line-height: 

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

    #outline[noIcon] {
      padding: 0;
      margin-right: 0;
      font-size: 0;
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
      color: var(--pwi-tooltip-decoration-color, var(--primary-color));
    }
    
    #outline:hover::after, #outline:active::after, #outline:focus::after {
      background-color: var(--pwi-tooltip-decoration-color, var(--primary-color));
      opacity: 0.25;
    }

    #tooltip {
      position: absolute;
      z-index: var(--z-index-popup);
      max-width: var(--max-width);
      border-radius: var(--pwi-tooltip-border-radius, var(--radius-default));
      background-color: var(--pwi-tooltip-background-color, var(--primary-text-color));
      font-family: var(--pwi-tooltip-font-family);
      font-size: var(--pwi-tooltip-font-size, var(--font-size-medium));
      font-weight: var(--pwi-tooltip-font-weight, var(--font-weight-normal));
      line-height: var(--pwi-tooltip-line-height, var(--line-height-small));
      opacity: 1;
      color: var(--pwi-tooltip-color,var(--color-primary-background));
      padding: var(--space-xx-small) var(--space-x-small);
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
        transform: translate(calc(-100% - 0.6rem), 50%) scale(1);
    }

    #tooltip::before {
        background-color: var(--pwi-tooltip-background-color, var(--primary-text-color));
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
      /**
       *  the `container` used to decide how to position tooltip before opening. 
       */
      container: {type: Object},
      fireonclick: { type: Boolean },

      /**
       * @prop `skipFocus` tooltip is not actiabtable by tap if true. 
       * To use for instance when sloted element is a button (which will receive focus)
       */
      skipFocus: { type: Boolean }, 
      _opened: { type: Boolean },
      noIcon: { type: Boolean },
    };
  }

  render() {
    return html `
      ${this.renderTooltip()}
        <span 
          id="outline"
          ?noIcon=${this.noIcon}
          part="outline"
          aria-describedby="tooltip"
          .tabindex=${this.skipFocus ? -1 : 0}
          @keydown=${e => {
            e.target === this && (e.code === 'Enter' || e.code === 'Space') ? this.toggleTooltip(e) : '';}
            }
          @focusin=${() => this.showTooltip()}
          @focusout=${() => this.hideTooltip()}
          @mouseover=${() => {this.fireonclick ? '' : this.showTooltip();}}
          @mouseout=${() => {this.fireonclick ? '' : this.hideTooltip();}}
          @click=${() => {this.fireonclick ? this.showTooltip() : '';}}>
          <slot></slot>
          ${this.noIcon ? '' : html `<mwc-icon>info</mwc-icon>`}
        </span>
    `;
  }

  renderTooltip() {
    return html `
      <div part="tooltip" 
        id="tooltip" 
        class="${this.position || this._position} ${this._opened ? 'visible' : ''}"  
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
    this._position = 'top';
    this.tipwidth = 200;
    this.opened = false;
    this.noIcon = false;
  }

  update(props)  {
    if (props.has('_opened') && this._opened && this.container) {
      this.calcPosition();
    }
    super.update(props);
  }

  calcPosition() {
    const ctRect = this.container.getBoundingClientRect();
    const rect = this.getBoundingClientRect();
    const positions = ['top', 'left', 'bottom', 'right'];
    const delta = positions.map((p, index) => (index < 2) ? rect[p] - ctRect[p]: ctRect[p] - rect[p]);
    const maxIndex = delta.indexOf(Math.max.apply(null, delta));
    let position = positions[maxIndex];
    if (delta[2] > 500) {
      position = 'bottom';
    }
    if (delta[0] > 300) {
      position = 'top';
    }
    if (delta[1] < 100) {
      position = 'right';
    }
    if (delta[3] < 100) {
      position = 'left';
    }

    this._position = position;
  }

  hideTooltip() {
    this._opened = false;
  }

  showTooltip() {
    this._opened = true;
  }

  toggleTooltip(e) {
    e && e.preventDefault(); // Note(cg): prevent Space to scroll down.
    this._opened = !this._opened;
  }
}

// Register the new element with the browser.
customElements.define('pwi-tooltip', PwiTooltip);

export default PwiTooltip;
