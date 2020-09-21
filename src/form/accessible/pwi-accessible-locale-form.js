import { PwiAccessibleLocale } from './pwi-accessible-locale.js';

class PwiAccessibleLocaleForm extends PwiAccessibleLocale {

      /* 
       * `formAttributes` is called when we construct the form. It returns binding attributes
       */
      static assignFormAttributes(domBind, name, item, config, attributes ) {
          Object.assign(attributes, {
            currency: '[[context.currency]]',
            locale: '[[locale]]'
          });
          return attributes;
      }
  
}

customElements.define('pwi-accessible-locale-form', PwiAccessibleLocaleForm);
