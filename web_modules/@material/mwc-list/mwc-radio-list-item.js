import { h as html } from '../../common/lit-html-f57783b7.js';
import { query, property, customElement } from '../../lit-element.js';
import '../../common/directive-651fd9cf.js';
import '../../common/utils-c3e1aa64.js';
import '../mwc-base.js';
import '../mwc-base/form-element.js';
import { __decorate } from '../../tslib.js';
import '../../common/foundation-61b2c8ea.js';
import '../../common/mwc-ripple-6e1d3918.js';
import { classMap } from '../../lit-html/directives/class-map.js';
import '../../lit-html/directives/style-map.js';
import '../../common/ripple-handlers-7e965c1d.js';
import { ifDefined } from '../../lit-html/directives/if-defined.js';
import '../../common/observer-eeb64c16.js';
import { L as ListItemBase, s as style } from '../../common/mwc-list-item-css-23f3438a.js';
import { s as style$1 } from '../../common/mwc-control-list-item-css-9a692005.js';
import '../mwc-radio.js';

/**
 @license
 Copyright 2020 Google Inc. All Rights Reserved.

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
class RadioListItemBase extends ListItemBase {
    constructor() {
        super(...arguments);
        this.left = false;
        this.graphic = 'control';
        this._changeFromClick = false;
    }
    render() {
        const radioClasses = {
            'mdc-list-item__graphic': this.left,
            'mdc-list-item__meta': !this.left,
        };
        const text = this.renderText();
        const graphic = this.graphic && this.graphic !== 'control' && !this.left ?
            this.renderGraphic() :
            html ``;
        const meta = this.hasMeta && this.left ? this.renderMeta() : html ``;
        const ripple = this.renderRipple();
        return html `
      ${ripple}
      ${graphic}
      ${this.left ? '' : text}
      <mwc-radio
          global
          class=${classMap(radioClasses)}
          tabindex=${this.tabindex}
          name=${ifDefined(this.group === null ? undefined : this.group)}
          .checked=${this.selected}
          ?disabled=${this.disabled}
          @checked=${this.onChange}>
      </mwc-radio>
      ${this.left ? text : ''}
      ${meta}`;
    }
    onClick() {
        this._changeFromClick = true;
        super.onClick();
    }
    async onChange(evt) {
        const checkbox = evt.target;
        const changeFromProp = this.selected === checkbox.checked;
        if (!changeFromProp) {
            this._skipPropRequest = true;
            this.selected = checkbox.checked;
            await this.updateComplete;
            this._skipPropRequest = false;
            if (!this._changeFromClick) {
                this.fireRequestSelected(this.selected, 'interaction');
            }
        }
        this._changeFromClick = false;
    }
}
__decorate([
    query('slot')
], RadioListItemBase.prototype, "slotElement", void 0);
__decorate([
    query('mwc-radio')
], RadioListItemBase.prototype, "radioElement", void 0);
__decorate([
    property({ type: Boolean })
], RadioListItemBase.prototype, "left", void 0);
__decorate([
    property({ type: String, reflect: true })
], RadioListItemBase.prototype, "graphic", void 0);

/**
@license
Copyright 2020 Google Inc. All Rights Reserved.

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
let RadioListItem = class RadioListItem extends RadioListItemBase {
};
RadioListItem.styles = [style, style$1];
RadioListItem = __decorate([
    customElement('mwc-radio-list-item')
], RadioListItem);

export { RadioListItem };
