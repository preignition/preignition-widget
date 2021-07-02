import { LitElement, html, css } from 'lit-element';
import { ifDefined } from 'lit-html/directives/if-defined.js';
import RadioGroup from './pwi-radio-group'
import { accessibility } from '@preignition/preignition-styles'
import { render } from 'lit-html';

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
          font-size: 1em;
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
          /* color: var(--mdc-theme-primary, #6200ee); */
          cursor: pointer;
          /* Transparent border-bottom avoids jumping
            when a colored border is applied
            on :hover/:focus */
          border-bottom: 4px solid transparent;
        }
        input:checked ~ label {
          color: #999;
        }
        input:checked + label {
          color: var(--mdc-theme-primary, #6200ee);
          border-bottom-color:  var(--mdc-theme-primary, #6200ee);
        }
        input:focus + label {
          border-bottom-style: dotted;
        }
        #star_rating:hover input + label {
          color: var(--mdc-theme-primary, #6200ee);
        }
        input:hover ~ label,
        input:focus ~ label,
        input[id="star0"] + label {
          color: #999;
        }
        input:hover + label,
        input:focus + label {
          color: var(--mdc-theme-primary, #6200ee);
        }
        input[id="star0"]:checked + label {
          color: var(--mdc-theme-error, #b00020);
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
          ?checked=${st + '' === this._value}
          type="radio" name="rating" class="sr-only"></input>
      <label for="star${st}">
        <span class="sr-only">${st} Stars</span>
        ${this.renderStar()}
      </label>

    `;
  } 
  
  renderNoStar() {
    return html`
      <input value="0" id="star0"
        type="radio" name="rating" class="sr-only"></input>
      <label for="star0">
        <span class="sr-only">0 Star</span>
        <svg viewBox="0 0 512 512">
          <g stroke-width="70" stroke-linecap="square">
            <path d="M91.5,442.5 L409.366489,124.633512"></path>
            <path d="M90.9861965,124.986197 L409.184248,443.184248"></path>
          </g>
        </svg>
      </label>
    `;
  } 
  renderOutput() {
    return html `<output>${this._selectedItem?.nextElementSibling?.innerText}</output>`
  }
  
  // <div><pwi-formfield label="${option.label}">
  //     <pwi-radio 
  //       name="${option.name || this.name}" 
  //       value="${option.code}" 
  //       ?checked="${option.code + '' === this._value}"
  //       ?disabled="${this.disabled || this.readonly || option.disabled}"
  //       aria-controls=${ifDefined(option.specify ? `specify${index}` : undefined)} 
  //       ></pwi-radio>
  //   </pwi-formfield>${this.renderSpecify(option, index)}</div>

  renderStar() {
    return html`
      <svg viewBox="0 0 512 512"><path d="M512 198.525l-176.89-25.704-79.11-160.291-79.108 160.291-176.892 25.704 128 124.769-30.216 176.176 158.216-83.179 158.216 83.179-30.217-176.176 128.001-124.769z"></path></svg>
    `
  }

}
customElements.define('pwi-star-rating', PwiStarRating);