import { LitElement, html, css } from 'lit-element';
import { LitNotify } from '@preignition/preignition-mixin';
import cronstrue from 'cronstrue';
import '@material/mwc-textfield';

const cronReg = '(((([*])|(((([0-5])?[0-9])((-(([0-5])?[0-9])))?)))((/(([0-9])?([0-9])?([0-9])?([0-9])?([0-9])?([0-9])?([0-9])?([0-9])?([0-9])?([0-9])?[0-9])))?))(,(((([*])|(((([0-5])?[0-9])((-(([0-5])?[0-9])))?)))((/(([0-9])?([0-9])?([0-9])?([0-9])?([0-9])?([0-9])?([0-9])?([0-9])?([0-9])?([0-9])?[0-9])))?)))* (((([*])|(((((([0-1])?[0-9]))|(([2][0-3])))((-(((([0-1])?[0-9]))|(([2][0-3])))))?)))((/(([0-9])?([0-9])?([0-9])?([0-9])?([0-9])?([0-9])?([0-9])?([0-9])?([0-9])?([0-9])?[0-9])))?))(,(((([*])|(((((([0-1])?[0-9]))|(([2][0-3])))((-(((([0-1])?[0-9]))|(([2][0-3])))))?)))((/(([0-9])?([0-9])?([0-9])?([0-9])?([0-9])?([0-9])?([0-9])?([0-9])?([0-9])?([0-9])?[0-9])))?)))* (((((((([*])|(((((([1-2])?[0-9]))|(([3][0-1]))|(([1-9])))((-(((([1-2])?[0-9]))|(([3][0-1]))|(([1-9])))))?)))((/(([0-9])?([0-9])?([0-9])?([0-9])?([0-9])?([0-9])?([0-9])?([0-9])?([0-9])?([0-9])?[0-9])))?))|(L)|(((((([1-2])?[0-9]))|(([3][0-1]))|(([1-9])))W))))(,(((((([*])|(((((([1-2])?[0-9]))|(([3][0-1]))|(([1-9])))((-(((([1-2])?[0-9]))|(([3][0-1]))|(([1-9])))))?)))((/(([0-9])?([0-9])?([0-9])?([0-9])?([0-9])?([0-9])?([0-9])?([0-9])?([0-9])?([0-9])?[0-9])))?))|(L)|(((((([1-2])?[0-9]))|(([3][0-1]))|(([1-9])))W)))))*)|([?])) (((([*])|((((([1-9]))|(([1][0-2])))((-((([1-9]))|(([1][0-2])))))?))|((((JAN)|(FEB)|(MAR)|(APR)|(MAY)|(JUN)|(JUL)|(AUG)|(SEP)|(OKT)|(NOV)|(DEC))((-((JAN)|(FEB)|(MAR)|(APR)|(MAY)|(JUN)|(JUL)|(AUG)|(SEP)|(OKT)|(NOV)|(DEC))))?)))((/(([0-9])?([0-9])?([0-9])?([0-9])?([0-9])?([0-9])?([0-9])?([0-9])?([0-9])?([0-9])?[0-9])))?))(,(((([*])|((((([1-9]))|(([1][0-2])))((-((([1-9]))|(([1][0-2])))))?))|((((JAN)|(FEB)|(MAR)|(APR)|(MAY)|(JUN)|(JUL)|(AUG)|(SEP)|(OKT)|(NOV)|(DEC))((-((JAN)|(FEB)|(MAR)|(APR)|(MAY)|(JUN)|(JUL)|(AUG)|(SEP)|(OKT)|(NOV)|(DEC))))?)))((/(([0-9])?([0-9])?([0-9])?([0-9])?([0-9])?([0-9])?([0-9])?([0-9])?([0-9])?([0-9])?[0-9])))?)))* (((((((([*])|((([0-6](#[1-5])?)((-([0-6])))?))|((((SUN(#[1-5])?)|(MON(#[1-5])?)|(TUE(#[1-5])?)|(WED(#[1-5])?)|(THU(#[1-5])?)|(FRI(#[1-5])?)|(SAT(#[1-5])?))((-((SUN)|(MON)|(TUE)|(WED)|(THU)|(FRI)|(SAT))))?)))((/(([0-9])?([0-9])?([0-9])?([0-9])?([0-9])?([0-9])?([0-9])?([0-9])?([0-9])?([0-9])?[0-9])))?))|((([0-6])L))|(W)|(([#][1-5]))))(,(((((([*])|((([0-6])((-([0-6])))?))|((((SUN)|(MON)|(TUE)|(WED)|(THU)|(FRI)|(SAT))((-((SUN)|(MON)|(TUE)|(WED)|(THU)|(FRI)|(SAT))))?)))((/(([0-9])?([0-9])?([0-9])?([0-9])?([0-9])?([0-9])?([0-9])?([0-9])?([0-9])?([0-9])?[0-9])))?))|((([0-6])L))|(W)|(([#][1-5])))))*)|([?]))((( (((([*])|((([1-2][0-9][0-9][0-9])((-([1-2][0-9][0-9][0-9])))?)))((/(([0-9])?([0-9])?([0-9])?([0-9])?([0-9])?([0-9])?([0-9])?([0-9])?([0-9])?([0-9])?[0-9])))?))(,(((([*])|((([1-2][0-9][0-9][0-9])((-([1-2][0-9][0-9][0-9])))?)))((/(([0-9])?([0-9])?([0-9])?([0-9])?([0-9])?([0-9])?([0-9])?([0-9])?([0-9])?([0-9])?[0-9])))?)))*))?)';

class PwiCronBuilder extends LitNotify(LitElement) {
  static get styles() {
    return css `
    :host {
      display: block;
    }
    `;
  }

  static get properties() {
    return {
      /**
       * cron expression
       * @type {String}
       */
      cron: {
        notify: true,
        type: String
      },

     /*
      * `label`
      */
     label: {
       type: String,
     },

     /*
      * `helper`
      */
     helper: {
       type: String,
     },

     /*
      * `validationMessage`
      */
     validationMessage: {
       type: String,
     },

     /*
      * `required`
      */
     required: {
       type: Boolean,
     },

     /*
      * `disabled`
      */
     disabled: {
       type: Boolean,
     },


      /*
       * human readable cron.
       */
      cronHuman: {
        type: String,
        notify: true,
        attribute: 'cron-human'
      },
    };
  }

  render() {
    return html `
      <mwc-textfield 
        part="input" 
        .helper="${this.helper}"
        .required="${this.required}"
        .label="${this.label}"
        .icon="${this.icon}"
        .disabled="${this.disabled}"
        .validationMessage="${this.validationMessage}"
        .pattern="${cronReg}" 
        .value="${this.cron}"
        @input="${e => this.cron = e.target.value}"
        @invalid="${e => this.cronHuman = 'invalid cron expression'}"></mwc-textfield>
      <div part="parsed">${this.cronHuman}</div>
    `;
  }

  constructor() {
    super();
    this.required = false;
    this.cron = '0 0 0 1,2 *';
    this.label = 'cron expression';
    this.icon = 'schedule';
    this.helper = 'cron expression of the form "* * * * *"';
    this.validationMessage = 'invalid cron format, see https://en.wikipedia.org/wiki/Cron';
  }

  update(props) {
    if (props.has('cron')) {
      this.cronHuman = !this.cron ? 'no cron expression' : cronstrue.toString(this.cron);
    }
    super.update(props);
  }
}

// Register the new element with the browser.
customElements.define('pwi-cron-builder', PwiCronBuilder);
