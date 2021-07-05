import { LitElement, html, css } from 'lit-element';
import { ifDefined } from 'lit-html/directives/if-defined.js';
import RadioGroup from './pwi-radio-group'
import { accessibility } from '@preignition/preignition-styles'
import {getInnerText} from '@preignition/preignition-util';
// import { render } from 'lit-html';

class PwiStarRating extends RadioGroup {
  static get styles() {
    return [
      super.styles,
      accessibility,
      css`
        :host {
          --pwi-group-pseudo-input-display: flex;
          --pwi-group-pseudo-input-flex-direction: row;
        }

        pwi-pseudo-input {
         padding-top: var(--space-small);
         padding-bottom: var(--space-small);
        }
        
        svg {
          width: 1em;
          height: 1em;
          fill: currentColor;
          stroke: currentColor;
        }
        
        output {
          font-size: var(--pwi-star-rating-font-size, 1em);
          padding: 0px 1em;
          align-self: center;
          line-height: 2em;
          color: var(--mdc-theme-primary, #6200ee);
        }

        label {
          display: block;
          font-size: 1.6em;
          line-height: 0.5em;
          color: var(--mdc-text-field-disabled-ink-color, rgba(0, 0, 0, 0.38));
          cursor: pointer;
          /* Transparent border-bottom avoids jumping
            when a colored border is applied
            on :hover/:focus */
          border-bottom: 4px solid transparent;
        }

        /* input:checked ~ label { */
          /* color: var(--mdc-text-field-disabled-ink-color, rgba(0, 0, 0, 0.38)); */
        /* } */
        /* input:hover ~ label {
          color: var(--mdc-text-field-disabled-ink-color, rgba(0, 0, 0, 0.38));
        } */
        /* input:hover ~ label {
          color: var(--mdc-text-field-disabled-ink-color, rgba(0, 0, 0, 0.38));
        } */


        input:checked + label, 
        input[highlight] + label,
        input:hover + label,
        input:focus + label {
          color: var(--mdc-theme-primary, #6200ee);
        }
        
        input:checked + label {
          border-bottom-color:  var(--mdc-theme-primary, #6200ee);
        }
        input:focus + label {
          border-bottom-style: dotted;
        }
       
        input[id="star0"] + label {
          color: var(--mdc-text-field-disabled-ink-color, rgba(0, 0, 0, 0.38));
        }
 
        input[id="star0"]:checked + label {
          color: var(--mdc-theme-error, #b00020);
          border-bottom-color: var(--mdc-theme-error, #b00020);
        }
      `]
  }

  static get properties() {
    return { 
      ...super.properties,
      // @prop number of stars to display
      starNumber: {
        type: Number
      },
      // @prop true to allow 0 star
      allowNoStar: {
        type: Boolean
      }
    };
  }

  constructor() {
    super()
    this.starNumber = 5;
  }

  // Note(CG): we need to override this as radio input do not
  // expose chekced attribute
  get _selectedItem() {
    return [...this._queryItems('input')].find(el => el.checked)
  }
  set selected(value) {
    // const old = this._value;
    this._value = value;
    const selectedItem = this._queryItem(`[value="${value}"]`);
    if (selectedItem) {selectedItem.checked = true;}

    this.requestUpdate();
  }

  get selected() {
    return this._selectedValue;
  }
  
  renderInput() {
    const showValidationMessage = this.validationMessage && !this.isUiValid;
    return html `
      <pwi-pseudo-input
        ?hasValue=${this._value}
        part="pwi-group-container"
        role="radiogroup"
        aria-labelledby="label"
        aria-invalid="${ifDefined(showValidationMessage ? 'true' : undefined)}"
        aria-errormessage="${ifDefined(showValidationMessage ? 'helper-text' : undefined)}"
        aria-describedby="${
        ifDefined(
            this.focused || this.helperPersistent || showValidationMessage ?
                'helper-text' :
                undefined)}"
        >
        ${this.allowNoStar ? this.renderNoStar() : ''}
        ${[...Array(this.starNumber)].map(this.renderOption, this)}
        ${this.renderOutput()}</pwi-pseudo-input>
      `;
  }

  renderOption(option, index) {
    const st = index + 1
    return html`
      <input value="${st}" id="star${st}"
          ?highlight=${st < this._value * 1}
          ?checked=${st + '' === this._value}
          type="radio" name="rating" class="sr-only"></input>
      <label for="star${st}">
        <span class="sr-only">${st} ${st === 1 ? this.translate('star') : this.translate('stars')}</span>
        ${this.renderStar()}
      </label>

    `;
  } 
  
  renderNoStar() {
    return html`
      <input value="0" id="star0"
        type="radio" name="rating" class="sr-only"></input>
      <label for="star0">
        <span class="sr-only">0 ${this.translate('star')}</span>
        <svg viewBox="0 0 512 512">
          <g stroke-width="80" stroke-linecap="square">
            <path d="M91.5 442.5l317.866-317.866M90.986 124.986l318.198 318.198"/>
        </svg>
      </label>
    `;
  } 
  renderOutput() {
    return html `<output>${this._selectedItem?.nextElementSibling?.innerText}</output>`
  }
  
  renderStar() {
    return html`
      <svg viewBox="0 0 512 512"><path d="M512 198.525l-176.89-25.704-79.11-160.291-79.108 160.291-176.892 25.704 128 124.769-30.216 176.176 158.216-83.179 158.216 83.179-30.217-176.176 128.001-124.769z"></path></svg>
    `;
  }

  getReadAloud(readHelper) {
    
    const min = this.allowNoStar ? 0 : 1;
    const max = this.starNumber ;

    return this._value === undefined ?
      (getInnerText(this.label) + (readHelper && this.helper ? ('. ' + this.getTranslate('hint') + ': ' + this.helper) + '. ' : '') + this.getTranslate('giveRate', {min: min, max: max})) :
      (this.getTranslate('givenRate', {count: this._value, max: max}) + getInnerText(this.label))
     
  }

}
customElements.define('pwi-star-rating', PwiStarRating);