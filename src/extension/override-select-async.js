/**
 * mixin overriding how pwi-select handle async list.async
 * We want to avoid situation where: 
 *   1. value is reset to '' when list item is not pupulated
 *   2. select element does not show any text value, when the 
 *   list is populated later on.
 *
 * Related issue:
 * https://github.com/material-components/material-components-web-components/issues/971
 *
 */

export const OverrideSelectAsync = (baseElement) => class extends baseElement {

  selectByValue(value) {
        let indexToSelect = -1;
        for (let i = 0; i < this.items.length; i++) {
            const item = this.items[i];
            if (item.value === value) {
                indexToSelect = i;
                break;
            }
        }
        this.valueSetDirectly = true;
        // Note(cg): we prevent setting item on inner list 
        // for items that do not exit. Otherwise, value is 
        // reset = '' when list item is missing. This is a problem
        // with async lists
        if (indexToSelect === -1) {
          this._missingItem = true;
          if (value) {
            this.selectedText = value;
          }
          return;
        }
        this.select(indexToSelect);
        this.mdcFoundation.handleChange();
    }

   onItemsUpdated(e) {
      super.onItemsUpdated();
      if ((this._missingItem && this.value)) {
        delete this._missingItem;
        this.selectByValue(this.value);
      }
    }

    connectedCallback() {
      super.connectedCallback();
      this.addEventListener('async-value', this.onAsyncValue)
    }
    disconnectedCallback() {
      super.disconnectedCallback();
      this.removeEventListener('async-value', this.onAsyncValue)
    }

    onAsyncValue(e) {
      if (this.selected) {
        this.selectedText = this.selected.text
      }
    }




   // onNotifyAsync(e) {
   //   if (this.value === e.currentTarget.value) {
   //      this.selectByValue(this.value);
   //    }
   // }
};

export default OverrideSelectAsync;
