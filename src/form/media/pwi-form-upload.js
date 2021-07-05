import { html, css } from 'lit-element';
import { PwiAccessibleTextfield } from '../accessible/pwi-accessible-textfield.js';
import { DoNotSetUndefinedValue } from '@preignition/preignition-mixin';
import { ifDefined } from 'lit-html/directives/if-defined.js';
import { appState, tokenState } from '@preignition/preignition-state';

class PwiFormUpload extends DoNotSetUndefinedValue(PwiAccessibleTextfield) {
  static get styles() {
    return [super.styles, css `
    :host {
      width: 100%;
    }

    :host(:hover:not([focused]):not([disabled]):not([invalid])) .mdc-text-field .label-above {
     color: var(--mdc-text-field-ink-color);
    }

    .mdc-text-field {
      height: initial;
      position: relative;
      display: inline-block;
    }

    :host(:not([disabled])) .mdc-text-field:not(.mdc-text-field--outlined) {
        background-color: initial;
    }

    .mdc-text-field--filled:before {
      display: none;
    }


     .mdc-line-ripple:before {
       opacity: 0;
     }

     :host(:hover) .mdc-line-ripple:before {
       opacity: 0.2;
     }

    /* Option container layout  */
    pwi-pseudo-input {
      display: block;
      padding-top: var(--space-xx-small);
      padding-bottom: var(--space-small);
    }

    pwi-pseudo-input:focus {
      outline: none;
    }

    firebase-document-upload {
      background-color: var(--color-primary-background);
      z-index: var(--z-index-default);
    }
    
    `];
  }

  static get properties() {
    return {

      ...super.properties,

      focused: {
        type: Boolean,
        reflect: true
      },

      invalid: {
        type: Boolean,
        reflect: true
      },

      disabled: {
        type: Boolean,
        reflect: true
      },

      /*
       * `path` where firebase metaData is stored.
       */
      path: {
        type: String,

      },

      /*
       * `appName` name of firebaseApp
       */
      appName: {
        type: String,
      },

      /*
       * `metaData` (name, path, type, timestamp) stored in firebase
       */
      metaData: {
        type: Object,
        notify: true
      },

      /*
       * `store` path to set at firestore level. if not set, will deduct from meta
       */
      store: {
        type: String,
      },

      /*
       * `fileName` the name of the file to store at firestore level. If not set,
       * will deduct it from original filename and add a timestamp
       */
      fileName: {
        type: String,
      },

      /*
       * Limit of files to upload, by default it is unlimited. If the value is
       * set to one, native file browser will prevent selecting multiple files.
       */
      maxFiles: {
        type: Number,
      },


      /*
       * `multi`
       */
      multi: {
        type: Boolean,
      },

      /*
       * `debug` true for debug mode
       */
      debug: {
        type: Boolean,
      },

      readonly: {
        type: Boolean,
        reflect: true
      },

      /*
       * `hideExisting` if true, will not display the list of files
       * already present in the db. This is usefull for instance when
       * we refresh a page with an image gallery.
       */
      hideExisting: {
        type: Boolean,
      },

      /*
       * `preventRead` if set to true, only push new files and avoid reading
       * metaDate. This is useful in situation where we do not cound the
       * number of files (e.g. images in a blogpost.)
       */
      preventRead: {
        type: Boolean,
      },

      /*
       * `buttonText` text on upload button
       * example: {one: 'upload image ...', many: 'upload images ...'}
       */
      buttonText: {
        type: Object,
      },

      /*
       * `dropText` text on dop button
       * example: {one: 'drop image ...', many: 'drop images ...'}
       */
      dropText: {
        type: Object,
      },

      /*
       * `uploading` flag to indicate that we are loading the image
       */
      uploading: {
        type: Number,
      },

      /*
       * `noFileExtension` set true to prevent filename extenstion to be used for
       * storage path.
       */
      noFileExtension: {
        type: Boolean,
      },


    };
  }

  /*
   * `formAttributes` is called when we construct the form. It returns binding attributes
   */
  static assignFormAttributes(domBind, name, item, config, attributes) {
    // const state = state app.getState();
    // Note(cg): for organisation manager, organisation is the active organisation stored under `organisation_mgmt`.
    const organisation = tokenState.active || appState.organisation;

    Object.assign(attributes, {
      // 'path': path,
      'path': `[[dataPath]]/${item.code}`,
      'store': `[[dataPath]]/${organisation}/${item.code}`
    });
    return attributes;
  }


  constructor() {
    super();
    this.labelAbove = true;
    this.addEventListener('focusin', this._onFocusin);
    this.addEventListener('focusout', this._onFocusout);
  }

  disconnectedCallback() {
    this.removeEventListener('focusin', this._onFocusin);
    this.removeEventListener('focusout', this._onFocusout);
    super.disconnectedCallback();
  }

  _onFocusout() {
    // console.info('focusout', this)
    this.focused = false;
  }

  _onFocusin() {
    // console.info('focusin', this)
    this.focused = true;
  }

  // firstUpdated() {
  //   super.firstUpdated();
  // }


  get formElement() {
    return this.renderRoot.querySelector('pwi-pseudo-input');
  }

  renderInput() {
    const showValidationMessage = this.validationMessage && !this.isUiValid;
    return html `
     <pwi-pseudo-input
        tabindex="0"
        part="pwi-group-container"
        role="group"
        aria-labelledby="label"
        aria-describedby="${
        ifDefined(
            this.focused || this.helperPersistent || showValidationMessage ?
                'helper-text' :
                undefined)}"
        ><firebase-document-upload

           .path="${this.path}"
           .appName="${this.appName}"
           .metaData="${this.metaData}"
           .store="${this.store}"
           .fileName="${this.fileName}"
           .maxFiles="${this.maxFiles}"
           .multi="${this.multi}"
           .debug="${this.debug}"
           .readonly="${this.readonly}"
           .hideExisting="${this.hideExisting}"
           .preventRead="${this.preventRead}"
           .buttonText="${this.buttonText}"
           .dropText="${this.dropText}"
           .uploading="${this.uploading}"
           .noFileExtension="${this.noFileExtension}"
        ></firebase-document-upload></pwi-pseudo-input>`;
  }
}

customElements.define('pwi-form-upload', PwiFormUpload);

export { PwiFormUpload };
