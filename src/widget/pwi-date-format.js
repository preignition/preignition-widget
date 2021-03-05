import { LitElement, html, css } from 'lit-element';

class PwiDateFormat extends LitElement {
  // Note(cg): we want to render value in light dom so that
  // textContent work on parent elements.
  createRenderRoot() {
    return this;
  }

  static get properties() {
    return {

      /*
       * `date`
       */
      date: {
        type: String,
      },

      options: {
        type: Object
      },

      locale: {
        type: String
      },

      /*
       * `interval` when date - now small smaller that interval,
       * we display a longer format
       */
      interval: {
        type: Number,
      },

    };
  }

  constructor() {
    super();
    this.options = { year: 'numeric', month: 'short', day: 'numeric' };
    this.interval = 1000 * 60 * 60 * 12; // 12 hours.
  }

  render() {
    return html `
      <span>${this.formatDate(this.date)}</span>
    `;
  }

  formatDate(date) {
    if (date) {
      let ret;
      try {
        const now = new Date();
        const d = new Date(date);
        return (now - d) < this.interval ? d.toLocaleTimeString(this.locale) : d.toLocaleDateString(this.locale, this.options);
      } catch (e) {
        return date;
      }
    }
    return '';
  }
}

// Register the new element with the browser.
customElements.define('pwi-date-format', PwiDateFormat);
