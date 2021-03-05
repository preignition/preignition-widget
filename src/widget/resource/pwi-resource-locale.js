// import { css } from 'lit-element';
import PwiResource from './pwi-resource.js';

class PwiResourceLocale extends PwiResource {
  setPath() {
    if (this.property && this.resourceId && this.resourceType && this.language) {
      this.path = `/locale/${this.state}/${this.resourceType}/${this.language}/${this.resourceId}/${this.property}`;
    }
  }
}

export default PwiResourceLocale;
customElements.define('pwi-resource-locale', PwiResourceLocale);

// Note(cg): Create sub classes
const config = {
  question: {
    property: 'label'
  },
  section: {
    property: 'label'
  }
};

['form', 'report', 'survey', 'question', 'section', 'machine', 'notification'].forEach(name => {
  class PwiResourceName extends PwiResourceLocale {
    constructor() {
      super();
      this.resourceType = name;
      this.defaultValue = `this ${name}`;
      if (config[name]) {
        Object.assign(this, config[name]);
      }
    }
  }
  customElements.define(`pwi-resource-locale-${name}`, PwiResourceName);
});
