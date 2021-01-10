import { h as html } from '../common/lit-html-f57783b7.js';
import { query, property, css, customElement } from '../lit-element.js';
import '../common/directive-651fd9cf.js';
import '../common/utils-c3e1aa64.js';
import './mwc-base.js';
import './mwc-base/form-element.js';
import { __decorate } from '../tslib.js';
import '../common/foundation-61b2c8ea.js';
import { classMap } from '../lit-html/directives/class-map.js';
import { ifDefined } from '../lit-html/directives/if-defined.js';
import '../common/observer-eeb64c16.js';
import './mwc-notched-outline.js';
import '../common/mwc-line-ripple-directive-e0f3f0a2.js';
import { T as TextFieldBase, s as style$1 } from '../common/mwc-textfield-base-0d8f0b71.js';
import { live } from '../lit-html/directives/live.js';

/**
@license
Copyright 2019 Google Inc. All Rights Reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
const booleanOrStringConverter = {
    fromAttribute(value) {
        if (value === null) {
            return false;
        }
        else if (value === '') {
            return true;
        }
        return value;
    },
    toAttribute(value) {
        if (typeof value === 'boolean') {
            return value ? '' : null;
        }
        return value;
    }
};
/** @soyCompatible */
class TextAreaBase extends TextFieldBase {
    constructor() {
        super(...arguments);
        this.rows = 2;
        this.cols = 20;
        this.charCounter = false;
    }
    /** @soyTemplate */
    render() {
        const shouldRenderCharCounter = this.charCounter && this.maxLength !== -1;
        const shouldRenderInternalCharCounter = shouldRenderCharCounter && this.charCounter === 'internal';
        const shouldRenderExternalCharCounter = shouldRenderCharCounter && !shouldRenderInternalCharCounter;
        const shouldRenderHelperText = !!this.helper || !!this.validationMessage ||
            shouldRenderExternalCharCounter;
        /** @classMap */
        const classes = {
            'mdc-text-field--disabled': this.disabled,
            'mdc-text-field--no-label': !this.label,
            'mdc-text-field--filled': !this.outlined,
            'mdc-text-field--outlined': this.outlined,
            'mdc-text-field--end-aligned': this.endAligned,
            'mdc-text-field--with-internal-counter': shouldRenderInternalCharCounter,
        };
        return html `
      <label class="mdc-text-field mdc-text-field--textarea ${classMap(classes)}">
        ${this.renderRipple()}
        ${this.outlined ? this.renderOutline() : this.renderLabel()}
        ${this.renderInput()}
        ${this.renderCharCounter(shouldRenderInternalCharCounter)}
        ${this.renderLineRipple()}
      </label>
      ${this.renderHelperText(shouldRenderHelperText, shouldRenderExternalCharCounter)}
    `;
    }
    /** @soyTemplate */
    renderInput() {
        const minOrUndef = this.minLength === -1 ? undefined : this.minLength;
        const maxOrUndef = this.maxLength === -1 ? undefined : this.maxLength;
        const autocapitalizeOrUndef = this.autocapitalize ?
            this.autocapitalize :
            undefined;
        return html `
      <textarea
          aria-labelledby="label"
          class="mdc-text-field__input"
          .value="${live(this.value)}"
          rows="${this.rows}"
          cols="${this.cols}"
          ?disabled="${this.disabled}"
          placeholder="${this.placeholder}"
          ?required="${this.required}"
          ?readonly="${this.readOnly}"
          minlength="${ifDefined(minOrUndef)}"
          maxlength="${ifDefined(maxOrUndef)}"
          name="${ifDefined(this.name === '' ? undefined : this.name)}"
          inputmode="${ifDefined(this.inputMode)}"
          autocapitalize="${ifDefined(autocapitalizeOrUndef)}"
          @input="${this.handleInputChange}"
          @blur="${this.onInputBlur}">
      </textarea>`;
    }
}
__decorate([
    query('textarea')
], TextAreaBase.prototype, "formElement", void 0);
__decorate([
    property({ type: Number })
], TextAreaBase.prototype, "rows", void 0);
__decorate([
    property({ type: Number })
], TextAreaBase.prototype, "cols", void 0);
__decorate([
    property({ converter: booleanOrStringConverter })
], TextAreaBase.prototype, "charCounter", void 0);

/**
@license
Copyright 2018 Google Inc. All Rights Reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
const style = css `.mdc-text-field{height:100%}.mdc-text-field__input{resize:none}`;

/**
@license
Copyright 2019 Google Inc. All Rights Reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
/** @soyCompatible */
let TextArea = class TextArea extends TextAreaBase {
};
TextArea.styles = [style$1, style];
TextArea = __decorate([
    customElement('mwc-textarea')
], TextArea);

export { TextArea };
