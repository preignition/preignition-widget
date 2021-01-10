import { LifSpan } from '@preignition/lit-firebase';

class PwiResource extends LifSpan {

  static get properties() {
    return {

      ...super.properties,

      /*
       * `language` 
       */
      language: {
        type: String,
      },

      /*
       * `property` the property to display 
       * default is 'title'
       */
      property: {
        type: String,
      },

      resourceType: {
        type: String,
        attribute: 'resource-type'
      },

      resourceId: {
        type: String,
        attribute: 'resource-id'
      },

      state: {
        type: String
      }


    };

  }

  constructor() {
    super();
    this.language = 'en';
    this.property = 'title';
    this.state = 'published';
    this.defaultValue = 'this resource';

    this.addEventListener('click', this._onClick);
  }

  updated(props) {
    if (props.has('resourceType') || props.has('resourceId') || props.has('language') || props.has('property') || props.has('state')) {
      this.setPath();
    }
    super.updated(...arguments);
  }

  setPath() {
    if (this.property && this.resourceId && this.resourceType && this.language) {
      this.path = `/resources/${this.state}/${this.resourceType}/${this.resourceId}/${this.property}`;
    }
  }

  _onClick(e) {
    // Note(cg): we allow to clic on a widget-resource and listen to this event higher up
    // We can potentially ask is we want to edit the resource.
    this.dispatchEvent(new CustomEvent('resource-tap', {
      detail: {
        resourceType: this.resourceType,
        resourceId: this.resourceId,
        state: this.state,
        language: this.language,
        title: this.value
      },
      bubbles: true,
      composed: true
    }));
  }

}

export default PwiResource;
customElements.define('pwi-resource', PwiResource);

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
  class PwiResourceName extends PwiResource {
    constructor() {
      super();
      this.resourceType = name;
      this.defaultValue = `this ${name}`;
      if (config[name]) {
        Object.assign(this, config[name])
      }
    }
  }
  customElements.define(`pwi-resource-${name}`, PwiResourceName);
});
