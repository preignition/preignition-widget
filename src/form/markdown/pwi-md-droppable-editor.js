import { LitElement, html, css } from 'lit-element';
// import Droppable from '../util/droppable.js';
import { default as droppable } from '../../style/droppable.js';

import '@material/mwc-button';
import '@material/mwc-linear-progress';


import PwiMdEditor from './pwi-md-editor.js';
const imageLoading = '{{loading image ...}}';

/**
 * Markdown editor, with droppable and image copy/paste facility. 
 * This is supposed to work as blog poset editor where images 
 * can be added.
 *
 * Note: `firebase-document-upload` shall be availalbe in DOM independently
 */
// class PwiMdDroppableEditor extends Droppable(PwiMdEditor) {
class PwiMdDroppableEditor extends PwiMdEditor {

  static get styles() {
    return [
      super.styles,
      droppable,
      css `
      firebase-document-upload  {
        display: none;
      }

      mwc-button {
        margin-top: var(--space-xx-small, 4px);
      }

      [part=error] {
        color: var(--color-error, red);
        padding: 0 20px;
      }
    `
    ];
  }

  static get properties() {
    return {
      ...super.properties,

      /*
       * `nodrop` set true to prevent droping files
       */
      nodrop: {
        type: Boolean
      },

      /**
       * Specifies the types of files that the server accepts.
       * Syntax: a comma-separated list of MIME type patterns (wildcards are
       * allowed) or file extensions.
       * Notice that MIME types are widely supported, while file extensions
       * are only implemented in certain browsers, so avoid using it.
       * Example: accept="video/*,image/tiff" or accept=".pdf,audio/mp3"
       */
      accept: {
        type: String,
        value: ''
      },

      /**
       * Specifies the maximum file size in bytes allowed to upload.
       * Notice that it is a client-side constraint, which will be checked before
       * sending the request. Obviously you need to do the same validation in
       * the server-side and be sure that they are aligned.
       */
      maxFileSize: {
        type: Number,
        attribute: 'max-file-size',
        value: Infinity
      },

      /*
       * `dragoverValid` true when we drag-over and the drag is valid.
       */
      dragoverValid: {
        type: Boolean,
        reflect: true,
        attribute: 'dragover-valid'
      },

      /*
       * `log` true to log in the console
       */
      log: {
        type: Boolean
      },

      /*
       * `_uploadStatus` status {
       *  status: {started|progress|success|error}
       *  error: error,
       *  file: String,
       *  progress: Number
       */
      _uploadStatus: {
        type: Object,
      },

      _errorMessage: {
        type: String
      }
    };
  }

  render() {
    const editor = super.render();

    return [html `
     <firebase-document-upload 
        prevent-read
        .log="${this.log}"
        .nodrop="${this.nodrop}"
        .accept="${this.accept}" 
        .maxFileSize="${this.maxFileSize}"
        .path="${this.path}" 
        .dropTarget="${this.dropTarget}"
        @upload-start="${this.onUploadStart}" 
        @upload-success="${this.onUploadSuccess}" 
        @upload-error="${this.onUploadError}" 
        @upload-progress="${this.onUploadProgress}"  
        @upload-finished="${this.onUploadFinished}"  
        @file-reject="${this.onFileReject}"
      ></firebase-document-upload>`, editor];
  }

  renderSlotToolbar() {
    return html `
        <div id="toolbar">
          ${this._errorMessage ? html`<span part="error">${this._errorMessage}</span>` : ''}
          <mwc-button  dense @click="${this.onclickUpload}" label="upload image" icon="cloud_upload"></mwc-button>
          ${this.loading ? html `<mwc-linear-progress indeterminate></mwc-linear-progress> ` : ''} 
        </div>
    `;
  }

  constructor() {
    super();
    this.path = 'pathNeedToBeSet';
    this.addEventListener('paste', this.onPaste);
    this.accept = 'image/*, video/*';
  }

  get upload() {
    return this.renderRoot.querySelector('firebase-document-upload');
  }

  firstUpdated() {
    this.setAttribute('droppable', true);
    setTimeout(() => {
      this.upload.dropTarget = this;
    }, 200);
  }

  update(props) {
    if (props.has('_uploadStatus')) {
      this.processStatus();
    }
    super.update(props);
  }

  processStatus() {
    const status = this._uploadStatus;
    this.log && console.info('processStatus', status);
    if (status.status === 'start') {
      this._errorMessage = null;
      this.uploadingStarted();
    }
    // if (status.status === 'progress') {
    // }
    // if (status.status === 'success') {
    // }
    if (status.status === 'finished') {
      this.uploadingFinished(status);
    }
    if (status.status === 'error') {
      this._errorMessage = status.error;
      setTimeout(() => {this._errorMessage = null }, 4000);
    }
  }

  _isOnTextarea(e) {
    return e.composedPath()[0].localName === 'textarea';
  }

  canDrag(e) {
    return this._isOnTextarea(e);
  }

  canDrop(e) {
    return this._isOnTextarea(e);
  }

  uploadingStarted() {
    this.insertAtCaret(`\n${imageLoading}`);
    this.md = this.textarea.value;
  }

  formatURL(url) {
    return url;
  }

  uploadingFinished(status) {
    this.md = this.md.replace(imageLoading, `![${status.file.name.split('.')[0]}](${this.formatURL(status.file.url)})`);
  }

  onclickUpload() {
    this.upload._onAddFilesClick();
  }

  onUploadError(e) {
    this.loading = false;
    this._uploadStatus = {
      status: 'error',
      file: e.detail.file,
      error: e.detail.file.error
    };
  }
  onUploadSuccess(e) {
    this.loading = false;
    this._uploadStatus = {
      status: 'success',
      file: e.detail.file
    };
  }

  onUploadFinished(e) {
    this.loading = false;
    this._uploadStatus = {
      status: 'finished',
      file: e.detail.file
    };
  }

  onUploadProgress(e) {
    this.loading = true;
    this._uploadStatus = {
      status: 'progress',
      file: e.detail.file
    };
  }

  onUploadStart(e) {
    this.loading = true;
    this._uploadStatus = {
      status: 'start',
      file: e.detail.file
    };
  }

  onFileReject(e) {
    this.loading = false;
    this._uploadStatus = {
      status: 'error',
      file: e.detail.file,
      error: e.detail.error
    };
  }

  // Note(cg): handle pasting image data ; ) 
  onPaste(e) {

    // We need to check if event.clipboardData is supported (Chrome & IE)
    if (e.clipboardData && e.clipboardData.items) {

      // Get the items from the clipboard
      var items = e.clipboardData.items;

      // Loop through all items, looking for any kind of image
      for (var i = 0; i < items.length; i++) {
        if (items[i].type.indexOf('image') !== -1) {
          // We need to represent the image as a file
          this.upload._uploadFirebaseFile(items[i].getAsFile());
          // Prevent the image (or URL) from being pasted into the contenteditable element
          e.preventDefault();
        }
      }
    }
  }
}

// Register the new element with the browser.
customElements.define('pwi-md-droppable-editor', PwiMdDroppableEditor);

export default PwiMdDroppableEditor;
