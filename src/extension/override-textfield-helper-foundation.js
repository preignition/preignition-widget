/**
 * mixin overriding how mdc-textfield instantiate MDC foundation
 * It gets native input validation message when
 * no default validatationMessage is set.
 *
 * Related issue:
 * https://github.com/material-components/material-components-web-components/issues/971
 *
 */
// import { MDCTextFieldHelperTextFoundation } from '@material/textfield/helper-text/foundation.js';

// export const TextFielHelperFoundationOverride = (baseElement) => class extends baseElement {

//   constructor() {
//     super();
//     // this.mdcFoundationClass = MDCTextFieldHelperTextFoundation;
//   }
//   createFoundation() {
//     if (this.mdcFoundation !== undefined) {
//       this.mdcFoundation.destroy();
//     }
    
//     this.mdcFoundation = new this.mdcFoundationClass(this.createAdapter(), {helperText: new MDCTextFieldHelperTextFoundation(this)});
//     this.mdcFoundation.init();
//   }

// };

// export default TextFielHelperFoundationOverride;
