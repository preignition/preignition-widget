import { LitElement, html, css } from 'lit-element';
import { nothing } from 'lit-html';
import { styleTypography } from '@preignition/preignition-styles';
import locale from './pwi-log-in-locale.js';

/**
 # sign-in / sign-up widget

 @fires auth-sign-in  on sign-in attempt
 @fires auth-sign-up on sign-up attempt
 @fires auth-reset-email on email reset attempt

 ## Remark
 - We stop animating transition between sign-in and sign-up as waiting
 for lit-html version 2 better way to handle animation (https://github.com/Polymer/lit-html/issues/1182)
 */

import { Translate as translate } from '@preignition/preignition-util';

class PwiLogIn extends translate(LitElement, locale) {
  static get styles() {
    return [styleTypography, css `
        :host {
          display: block;
        }
        #sign-in, #sign-up {
          margin-left: auto;
          margin-right: auto;
          max-width: 320px;
          width: 100%;
        }

        #sign-up {
          max-width: 480px;
        }
        #sign-in {
          max-width: 300px;
        }

       .button-container {
          display: flex;
          flex-wrap: wrap;
          flex-direction: row;
          align-items: baseline;
        }

        pwi-textfield {
          margin-bottom: var(--space-small, 12px);
          width: 100%;
        }

        mwc-button {
          margin-bottom: var(--space-medium, 20px);
        }

        .accent {
          --mdc-theme-primary: var(--color-accent);
        }

        .button-container mwc-button, .button-container div {
          flex: 1;
        }
        .button-container span { 
          margin-left: var(--space-medium, 12px);
          margin-right: var(--space-medium, 12px);
        }

         .progress {
          --mdc-circular-progress-bar-color-1: var(--color-primary-background);
          --mdc-circular-progress-bar-color-2: var(--primary-color);
          --mdc-circular-progress-bar-color-3: var(--primary-color);
          --mdc-circular-progress-bar-color-4: var(--color-primary-background);
          position: absolute;
          left: 14px;
          top: 5px;
        }
       
        h2 {
          color: var(--dark-primary-color);
          font-size: 30px;
          font-weight: 100;
          margin-top: 0;
          margin-bottom: 0;
        }

        a {
          text-decoration: none;
        }

        .error-message, .info-message {
          text-align: center; 
          margin-bottom: var(--space-x-small);
          cursor: pointer;
        }

        .error-message {
          color: var(--color-error);
        }

        .info-message {
          color: var(--accent-color);
        }

        .info-message a {
          color: var(--accent-color);
          text-decoration: underline;
        }

        .back {
          position: fixed;
          right: 10px;
          bottom: 0;
        }

        .break {
          width: 100%;
          border-top: solid var(--divider-color) 1px;
          margin-bottom: var(--space-medium, 20px);
        }

     @media (max-width: 600px) {

      #sign-up {
       max-width: 320px;
      }
      .button-container mwc-button {
        flex-basis: 100%;
      }
      .button-container span, .button-container div {
        display: none;
      }

      .break {
        border-top: none;
        margin-bottom: var(--space-small);   
      }
       
      pwi-textfield {
        margin-bottom: var(--space-xx-small, 4px);
      }

      mwc-button {
        margin-top: var(--space-xx-small, 4px);
        margin-bottom: var(--space-xx-small, 4px);
      }

      a.back {
        position: static;
        text-align: right;
      }
    }
    `];
  }

  static get properties() {
    return {
      ...super.properties,

      /*
       * `isSignUp` true when signing-up
       * default: false
       */
      isSignUp: {
        type: Boolean,
        attribute: 'is-sign-up'
      },

      /*
       * `email`
       */
      email: {
        type: String,
      },

      /*
       * `password`
       */
      password: {
        type: String,
      },

      /*
       * `displayName`
       */
      displayName: {
        type: String,
      },

      /*
       * `errorMsg` the error message to display
       */
      errorMsg: {
        type: String,
      },

      /*
       * `successMsg`
       */
      successMsg: {
        type: String,
      },

      /*
       * `signingIn`  flag to know if this element is siging in. It is also user to check whether we need to activate redirection stuff
       */
      signingIn: {
        type: Boolean,
      },

      /**
       * `onlyLogin` flag to set that we only authorize login stuff (and not account creation)
       */
      onlyLogin: {
        type: Boolean,
        attribute: 'only-login'
      },

      /*
       * `enableBack` flag to enable `window.history.back()` once a user is signed-in
       */
      enableRedirect: {
        type: Boolean,
        attribute: 'enable-redirect'
      },

      /*
       * `hideSocial` true to hide social buttons
       */
      hideSocial: {
        type: Boolean,
        attribute: 'hide-social'
      },

      /*
       * `allowAnonynous` true to allow anonymous accounts
       */
      allowAnonymous: {
        type: Boolean,
        attribute: 'allow-anonymous'
      },

      /*
       * `queryParams`handle query params like:
       * email, view
       */
      queryParams: {
        type: Object,
      },

    };
  }

  render() {
    return this.isSignUp ? this.renderSignUp() : this.renderSignIn();
  }

  renderError() {
    return this.errorMsg ? html `<div class="error-message">${this.errorMsg}</div>` : nothing;
  }
  renderSuccess() {
    return this.successMsg ? html `<div class="info-message">${this.successMsg}</div>` : nothing;
  }
  renderForScreenReader(test, content) {
    return test ? html `<div style="height: 0px; line-height: 0; opacity: 0;">${content}</div>` : nothing;
  }
  renderSocial(text) {
    return html `
      <div class="break "></div>
      <div>
        <span class="label">${text}</span>
      </div>
      <div class="social  button-container">
        <mwc-button @click="${this.loginHandler}" class="accent-paint" data-provider="google" outlined label="google">
          <iron-icon slot="icon" icon="social-post:gplus"></iron-icon>
        </mwc-button>
        <span></span>
        <mwc-button @click="${this.loginHandler}" class="accent-paint" data-provider="facebook" label="facebook" outlined>
          <iron-icon slot="icon" icon="social-post:facebook"></iron-icon>
        </mwc-button>
      </div>`;

    // <!--mwc-button @click="${this.loginHandler}" data-provider="twitter" label="twitter" outlined disabled>
    //   <iron-icon slot="icon" icon="social-post:twitter"><
    // </mwc-button>-->
  }


  renderSignIn() {
    return html `
      <div id="sign-in" class="content">
        <form>
          <pwi-textfield autocomplete="username" .value="${this.email}" @input="${e => this.email = e.currentTarget.value}" .label="${this.translate('email')}" type="email" name="username"></pwi-textfield>
          <pwi-textfield autocomplete="password" .value="${this.password}" @input="${e => this.password = e.currentTarget.value}" .label="${this.translate('password')}" name="password" type="password"></pwi-textfield>
        </form>
        <div aria-live="polite">
          ${this.renderError()}
          ${this.renderSuccess()}
          ${this.renderForScreenReader(this.signingIn, html`<span>${this.translate('signingIn')}</span>`)}
        </div>
        <div aria-live="assertive">
          ${this.errorMsg !== '' && this.email !== '' ?
            html `<mwc-button @click="${this.resetPasswordHandler}" icon="contact_mail" label="${this.translate('forgotPsw')}" class="accent" raised></mwc-button>` :
            nothing
          }
        </div>
        <div class="button-container">
          <mwc-button id="login-button" label="${this.translate('signIn')}" ?disabled="${!(this.email && this.password)}" data-provider="password" class="accent" @click="${this.loginHandler}" raised>
            <mwc-icon slot="icon">person</mwc-icon>
            <mwc-circular-progress-four-color slot="icon" aria-label="${this.translate('signInInProcess')}" density="-5" class="progress" ?closed="${!this.signingIn}" indeterminate></mwc-circular-progress-four-color>
          </mwc-button>
          ${
            this.onlyLogin ? nothing : html`
              <span> ${this.translate('or')} </span>
              <mwc-button icon="person_add" label="${this.translate('signUp')}" raised @click="${e => this.isSignUp = true}"></mwc-button>
            `
          }
        </div>
        ${this.hideSocial ? nothing : this.renderSocial(html`<span>${this.translate('signInWith')}</span>`)}
        ${this.enableRedirect && !this.onlyLogin ?
          html`
            <a href="/" class="back" title="${this.translate('backToApp')}">
            <mwc-button outlined icon="exit_to_app" label="${this.translate('backToApp')}" trailingIcon></mwc-button>
          </a>
          ` : nothing
        }
      </div>
    `;
  }

  renderSignUp() {
    return html `
      <div id="sign-up" class="content">
        <h2>${this.translate('createAnAccount')}</h2>
        <form>
          <pwi-textfield autocomplete="username" .value="${this.email}" @input="${e => this.email = e.currentTarget.value}" .label="${this.translate('email')}" type="email" name="username" ></pwi-textfield>
          <pwi-textfield autocomplete="password" .value="${this.password}" @input="${e => this.password = e.currentTarget.value}" .label="${this.translate('password')}" name="password" type="password"></pwi-textfield>
          <pwi-textfield autocomplete="name" .value="${this.displayName}" @input="${e => this.displayName = e.currentTarget.value}" .label="${this.translate('firstName')}" .helper="${this.translate('firstNameHelp')}"></pwi-textfield>
        </form>
        <div aria-live="polite">
            ${this.renderError()}
            ${this.renderSuccess()}
            ${this.renderForScreenReader(this.signingIn, html`<span>${this.translate('signingUp')}</span>`)}
        </div>
        <div class="button-container">
          <mwc-button icon="person_add" @click="${this.createUserHandler}" label="${this.translate('createAccount')}" raised></mwc-button>
          ${this.allowAnonymous ?
            html`<span>${this.translate('or')}</span><mwc-button @click="${this.loginHandler}" icon="person_outline" data-provider="anonymous" raised label="${this.translate('continueAsGuest')}"></mwc-button>` :
            html`<div></div>`}
        </div>
        ${this.hideSocial ? nothing : this.renderSocial(html`<span>${this.translate('orSignUpWith')}</span>`)}
        <div class="break "></div>
        <div class="button-container">
          <div></div>
          <span></span>
          <mwc-button @click="${e => this.isSignUp = false}" label="${this.translate('backToSignIn')}" icon=""></mwc-button>
        </div>
      </div>
    `;
  }

  constructor() {
    super();
    this.isSignUp = false;
    this.signingIn = false;
    this.onlyLogin = false;
    this.hideSocial = false;
    this.allowAnonymous = false;
    this.enableRedirect = false;
    this._resetData();

    this.addEventListener('keydown', this._handleKeydown);
  }

  _handleKeydown(e) {
    if (e.defaultPrevented) {
      return; // Do nothing if the event was already processed
    }
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft' || e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      return e.stopPropagation();
    }
    if (e.key === 'Enter') {
      if (this.isSignUp) {
        return this.createUserHandler();
      }
      this.loginHandler();
    }
  }
  _resetData() {
    this.email = '';

    this.password = '';
    this.displayName = '';
    this._resetMessage();
  }

  _resetMessage() {
    this.errorMsg = '';
    this.successMsg = '';
  }

  firstUpdated() {
    // implementation
    if (window.location.search) {
      const params = new URLSearchParams(window.location.search);
      ['email', 'view', 'hideSocial'].forEach(k => {
        if (params.has(k)) {
          this[k] = params.get(k);
        }
      });
    }
  }

  updated(props) {
    if (props.has('isSignUp')) {
      this._resetMessage();
    }
    super.updated(props);
  }
  // Note(cg): callback when success.
  onSuccessCallback(message) {
    this.signingIn = false;
    this.errorMsg = '';
    this.successMsg = message;
    this._checkRedirect();
  }

  // Note(cg): callback when error.
  onErrorCallback(error) {
    this.signingIn = false;
    this.successMsg = '';
    this.errorMsg = `Error:  ${error.message}`;
  }

  _checkRedirect() {
    if (this.enableRedirect) {
      if (!document.referrer) {
        // Note(cg): this is happening when we launch the app on /login.
        this.resetLocation();
      } else {
        window.history.back();
      }
    }
  }

  resetLocation(path) {
    path = path || '/';
    window.history.pushState({}, '', path);
    // window.dispatchEvent(new CustomEvent('location-changed'));
  }
  /*
   * HANDLERS
   */

  loginHandler(e) {
    this.signingIn = true;
    this.provider = e && e.currentTarget && e.currentTarget.dataset.provider || 'password';
    this.dispatchEvent(new CustomEvent('auth-sign-in', {
      detail: {
        provider: this.provider,
        email: this.email,
        password: this.password,
        successCallback: this.onSuccessCallback.bind(this),
        errorCallback: this.onErrorCallback.bind(this),
      },
      bubbles: true,
      composed: true
    }));
  }

  resetPasswordHandler(e) {
    if (this.email) {
      this.dispatchEvent(new CustomEvent('auth-reset-email', {
        detail: {
          provider: this.provider,
          email: this.email,
          successCallback: () => {
            this.successMsg = `reset password email sent to ${this.email}!`;
          },
          errorCallback: this.onErrorCallback.bind(this),
        },
        bubbles: true,
        composed: true
      }));
    }
  }

  createUserHandler(e) {
    if (this.email && this.password) {
      const displayName = this.displayName || this.email.replace(/@.*/, '');
      this.provider = 'password';

      this.dispatchEvent(new CustomEvent('auth-sign-up', {
        detail: {
          provider: this.provider,
          email: this.email,
          displayName: displayName,
          password: this.password,
          successCallback: () => {
            this.successMsg = `Success: new user ${displayName} created!`;
            setTimeout(() => {this.selected = 0;}, 200);
            setTimeout(() => {this._checkRedirect();}, 500);
          },
          errorCallback: this.onErrorCallback.bind(this),
        },
        bubbles: true,
        composed: true
      }));
    }
  }
}

// Register the new element with the browser.
customElements.define('pwi-log-in', PwiLogIn);
