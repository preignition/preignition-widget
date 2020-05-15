import { LitElement } from 'lit-element';

const timezoneOffset = new Date().getTimezoneOffset();  // Note(cg): in minutes -120 for GMT+2 

/**
 * ## PwiIsPast
 *
 * `<pwi-is-past>` simple element that dispatch a `date-in-past` when date in in the past
 * 
 * @fires is-past-changed - event fired when date is in past
 */
class PwiIsPast extends LitElement {

  static get properties() {
    return {
      /**
       * date in GMT by default or locale 
       * if `isLocale` is true
       * @type String
       */
      date: {
        type: String
      },

      /**
       * timezone offest between Date.now and this.date (in minutes)
       * we assume that date is in GMT and we calculate 
       * the difference. 
       * set 0 to indicate same timezone
       * @type {Object}
       */
      timezoneOffset: {
        type: Number
      },

      /*
       * `interval` in ms
       */
      interval: {
        type: Number
      },

    };
  }
  set isPast(past) {
  }

  get isPast() {
    console.info('isPast');
    return this._isPast || false;

  }

  constructor() {
    super();
    this.timezoneOffset = timezoneOffset;
    this.interval = 1000;
  }

  updated(props) {
    if (props.has('date')) {
      this._handleDate();
    }
  }
  _handleDate() {
    if (this.intervalID) {
      clearInterval(this.intervalID);
    }

    if (this.date) {
      this.timestamp = new Date(this.date).getTime();
      this.intervalID = window.setInterval(() => {this._checkDateInThePast()}, this.interval);
    }
  }

  _checkDateInThePast() {
    // Note(cg): dispatch `date-in-past-changed`.event and clear interval;
    if ((this.timestamp + timezoneOffset * 60 * 1000) < Date.now()) {
      clearInterval(this.intervalID);
      this._isPast = true;
      this.dispatchEvent(new CustomEvent('is-past-changed', {detail: {value: true}}));
      return;
    }
    if (this._isPast) { // Note(cg): is we cahnge the date and isPast was true.
      this._isPast = false;
      this.dispatchEvent(new CustomEvent('is-past-changed', {detail: {value: false}}));
    }
  }
}

// Register the new element with the browser.
customElements.define('pwi-is-past', PwiIsPast);
