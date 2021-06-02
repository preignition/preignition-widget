import PwiFirebaseTooltip from './pwi-firebase-tooltip.js';
/*
  # tooltip loading its content from firebase
  path is calculated on the basis of term id


 */

class PwiFormTooltip extends PwiFirebaseTooltip {
  static get properties() {
    return {
      ...super.properties,

     /*
      * `resource` the resource object to get
      * context from. It can be a form or a section
      * path is calculated on that basis
      */
     resource: {
       type: Object,
     },

     /*
      * `term` the term id to get tooltip for
      */
     term: {
       type: String,
     },
    };
  }

  // firstUpdated(props) {
  //   // Note(cg): form and sectionlisten to the event and will set resource in turn.
  //   this.dispatchEvent(new CustomEvent('form-tooltip-ready', {detail: {}, bubbles: true, composed: true}));
  //   super.firstUpdated(props);
  // }

  updated(props) {
    if (props.has('resource')) {
      this.setPath(this.resource, this.term);
    }
    super.updated(props);
  }

  setPath(resource, term) {
    if (resource && term) {
      if (resource.localName === 'pfo-form') {
        this.path = `/resourceDataLocale/${resource.isTest ? 'draft' : 'published'}/${resource.resourceId || resource.tooltipId}/${resource.language}/glossary/${term}/definition`;
      }
      // TODO(cg): handle shared section.
      // if (resource.localeName === 'form-section') {
      //   this.path = `/resourceDataLocale/${resource.isTest ? 'draft' : 'published'}/${resource.resourceId}/${resource.language}/glossary/${term}/definition`
      // }
    }
  }
}

// Register the new element with the browser.
customElements.define('pwi-form-tooltip', PwiFormTooltip);
