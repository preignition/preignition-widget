//  DEPRECATED

import { default as droppable } from '../style/droppable.js';
export const droppableMixin = (superclass) => class extends superclass {

  static get styles() {
    return droppable
  }
  
  static get properties() {
    return {

      ...super.properties,

      /*
       * `nodrop` set true to prevent droping files
       */
      nodrop: {
        type: Boolean,
        reflect: true
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
        value: Infinity
      },

      /*
       * `dropTarget` the element handling drop events
       * we bind dragover, dragleave and drop to droptTarget
       */
      dropTarget: {
        type: Object,
      },
    }
  }

  // constructor() {
  //   super();
  // }

  updated(props) {
    if (props.has('dropTarget')) {
      this.setDropTarget(props);
    }
    super.updated();
  }

  setDropTarget() {
    if (this.dropTarget) {
      this.dropTarget.classList.add('droppable');
      this.dropTarget.addEventListener('dragover', this._onDragover.bind(this));
      this.dropTarget.addEventListener('dragleave', this._onDragleave.bind(this));
      this.dropTarget.addEventListener('drop', this._onDrop.bind(this));
    } else {

    }
  }
  
  _onDragover(event) {
    console.event('dragover', event);
    event.preventDefault();
    if (!this.nodrop && !this._dragover) {
      this._dragoverValid = !this.maxFilesReached;
      this._dragover = true;
    }
    event.dataTransfer.dropEffect = !this._dragoverValid || this.nodrop ? 'none' : 'copy';
  }
  
  _onDragleave(event) {
    console.event('draleave', event);
    event.preventDefault();
    if (this._dragover && !this.nodrop) {
      this._dragover = this._dragoverValid = false;
    }
  }

  _onDrop(event) {
    console.event('drop', event);
    if (!this.nodrop) {
      event.preventDefault();
      this._dragover = this._dragoverValid = false;
      this._addFiles(event.dataTransfer.files);
    }
  }



}

export default droppableMixin;
