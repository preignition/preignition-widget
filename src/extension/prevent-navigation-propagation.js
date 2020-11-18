/**
 * small mixin to prevent navigation keys to propagate
 * This is usefull for instance for textarea in forms
 * Pressing page-up page-down should just be keps on t
 * focused textfield
 */

export const PreventNavigationPropagation = (baseElement) => class extends baseElement {
  
  constructor() {
    super();
    this.addEventListener('keydown', this._onKeyDownPropagation);
  }

  _onKeyDownPropagation(e) {
    console.info('keydown');
    const {code} = e;
    const prevent = ['PageDown', 'PageUp', 'End', 'Home'];
    if (prevent.indexOf(code) > -1) {
      e.stopPropagation();
      e.preventDefault();
      const target = e.composedPath()[0];
      const cursorPosition = (code === 'PageUp' || code === 'Home') ? 0 : target.textLength;
      target.setSelectionRange(cursorPosition, cursorPosition);
    }
  }
};

export default PreventNavigationPropagation;
