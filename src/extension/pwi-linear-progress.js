import { LinearProgress } from '@material/mwc-linear-progress';
import { css } from 'lit-element';

/**
 * extention of mwc-linear-progress allowing:
 * - set progress as percen
 * - set height of the progress bar
 */
class PwiLinearProgress extends LinearProgress {

  static get styles() {
    return [super.styles, css `
      :host {
        --pwi-linear-progress-height: 4px;
        height: var(--pwi-linear-progress-height);
      }
      .mdc-linear-progress {
        height: var(--pwi-linear-progress-height) ;
      }
      .mdc-linear-progress__bar-inner {
        border-top: var(--pwi-linear-progress-height) solid var(--mdc-theme-primary, #6200ee); 
      }
    `];
  }

  static get properties() {
    return {
      ...super.properties,

      percent: {
        type: Number
      }
    };
  }

  updated(props) {
    if (props.has('percent')) {
      this.progress = this.percent / 100;
    }
    super.updated(props);
  }
}

customElements.define('pwi-linear-progress', PwiLinearProgress);

export { PwiLinearProgress };
