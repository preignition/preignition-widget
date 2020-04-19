import { LitElement, html, css } from 'lit-element';
import { DefaultValueMixin, DoNotSetUndefinedValue } from '@preignition/preignition-mixin';
import { format } from 'd3-format';

class GridCellNumber extends
DefaultValueMixin(
  DoNotSetUndefinedValue(
    LitElement)) {

  static get styles() {
    return css `
     :host {
      display: block;
      text-align: center;
      margin: 0 12px;
    }

    :host(.dark) {
      color: var(--primary-background-color);
    }

    `;
  }
  
  render() {
    if (this.backgroundScaleColor) {
      this.style['background-color'] = this.backgroundScaleColor(this.value * 1);
    }
    if (this.scaleColor) {
      this.style['color'] = this.scaleColor(this.value * 1);
    }
    return html ` 
      <span>${this.formatValue(this.value, this.format)}<span>
    `;
  }

  static get properties() {
    return {
      /*
       * `value` value to display
       */
      value: {
        type: String
      },


      /*
       * `scale` d3.scale
       */
      scale: {
        type: Function,
        value: function() {
          return x => x * 1;
        }
      },

      scaleColor: {
        type: Function,
        // value: () => {
        //   // Note(cg): app is no more global in ESM.
        //   const app = document.querySelector('#app');
        //   return scaleLinear().domain([0, 0.5, 1]).range([app.themeColors['--paper-red-400'], app.themeColors['--paper-orange-400'], app.themeColors['--paper-green-400']]);
        // }
      },

      backgroundScaleColor: {
        type: Function
      },

      /*
       * `format` value to be sent to d3.format
       */
      format: {
        type: String
      }
    };
  }

  formatValue(value, stringFormat = '.0f') {
    if (value || value === 0) {
      return format(stringFormat)(this.scale(value));
    }
    return '';
  }
}

// Register the new element with the browser.
customElements.define('grid-cell-number', GridCellNumber);