// import { css } from 'lit-element';
import { LifSpan } from '@preignition/lit-firebase';
// import { themeColor, themeTag } from '../style/index.js';

class PwiProgram extends LifSpan {

  static get properties() {
    return {

      ...super.properties,

      /*
       * `language` 
       */
      language: {
        type: String,
      },

      prid: {
        type: String,
      }

    };

  }

  constructor() {
    super();
    this.language = 'en';
    this.defaultValue = 'this program';

    // this.addEventListener('click', this._onClick);
  }

  updated(props) {
    if (props.has('prid') || props.has('language') ) {
      this.setPath();
    }
    super.updated(...arguments);
  }

  setPath() {
    if (this.prid) {
      this.path = `/programData/profile/${this.prid}/title`;
    }
  }

  // _onClick(e) {
  //   // Note(cg): we allow to clic on a widget-resource and listen to this event higher up
  //   // We can potentially ask is we want to edit the resource.
  //   this.dispatchEvent(new CustomEvent('resource-tap', {
  //     detail: {
  //       resourceType: this.resourceType,
  //       resourceId: this.resourceId,
  //       state: this.state,
  //       language: this.language,
  //       title: this.value
  //     },
  //     bubbles: true,
  //     composed: true
  //   }));
  // }

}

export default PwiProgram;
customElements.define('pwi-program', PwiProgram);

