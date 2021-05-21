import { LitElement, html, css } from 'lit-element';
import '@material/mwc-linear-progress';
import '@material/mwc-icon';

class PwiProcess extends LitElement {
  static get styles() {
    return css`
    host {
      display: block;
    }

    .error {
      color: var(--color-error);
    }

    .success {
      color: var(--color-success, var(--primary-color));
    }

    
    `;
  }

  static get properties() {
    return {
      path: {
        type: String
      },
      _status: {
        type: Object
      },
      _message: {
        type: Object
      },
      useToast: {
        type: Boolean
      },
    };
  }

  constructor() {
    super();
    this.useToast = false;
  }

  render() {
    return html`
    <lif-document 
      @data-changed=${e => this._status = e.detail.value}
      .path="/triggerStatus/${this.path}"
      ></lif-document>
    <lif-document 
      @data-changed=${e => this._message = e.detail.value}
      .path="/triggerStatus/${this.path}/message"
      ></lif-document>
    ${this.useToast ? '' : this.renderProcess()}
    `;
  }

  renderProcess() {
    return html`
    <mwc-linear-progress .progress=${(this._status?.percent || 0) / 100} ariaLabel="progress status"></mwc-linear-progress>
    ${this._status ? this.renderStatus() : ''}`;
  }

  renderStatus() {
    const status = this._status?.status;
    return html`${status === 'error' ? html`<mwc-icon class="error">error</mwc-icon><span class="message error">${this._message}</span>` :
      status === 'success' ? html`<mwc-icon class="success">check_circle</mwc-icon><span class="message success">Success: ${this._message}</span>` :
        status === 'processing' ? html`<span class="message"> ... processing </span><span class="message">${this._status.step}</span>` : ''}
     `;
  }

  update(props) {
    if (props.has('_message') && this.useToast) {
      this._dispatchMessage;
    }
    super.update();
  }
  
  _dispatchStatus() {
    if (this._message) {
      const name = this._status && this.status.status === 'error' ? 'toast-error' : 'toast';
      this.dispatchEvent(new CustomEvent(name, {
        detail: this._message, bubbles: true, composed: true
      }));
    }
  }
}
customElements.define('pwi-process', PwiProcess);
