import { LitElement, html, css } from 'lit-element';
import { content, style } from './home-banner-template.js';
import styles from './home-banner-styles.js';
import { select } from 'd3-selection';

// const defaultViewBox = '-200 0 1600 570'

// Note(cg): for known object we stor BBox (as sometimes tries to calculte on non rendered page...)
const knownBBox = {
  entrepreneurs: {
    height: 248.29,
    width: 305.28,
    x: 558.93,
    y: 303.24
  },
  bso: {
    height: 194,
    width: 254,
    x: 888.96,
    y: 267,
  },
  investor: {
    height: 213.15,
    width: 294.62,
    x: 1104.44,
    y: 70.58
  }
}

class HomeBanner extends LitElement {
  static get styles() {
    return styles
  }

  /**
   * Implement `render` to define a template for your element.
   */
  render() {
    return html `
        ${style}
        <svg id="svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="100%" preserveAspectRatio="xMidYMid meet" viewBox="-200 0 1600 570" >
          ${content}
        </svg>
    `
  }

  static get properties() {
    return {
      focus: {
        type: String,
        observer: '_observeFocus',
        reflect: true
      },

      /*
       * `selected` when set, set opacity to non-selected items (entrepreneurs, bso, investor)
       */
      selected: {
        type: String,
        reflect: true
      }
    };
  }

  get svg() {
    return this.getById('svg')
  }

  getById(id) {
    return this.renderRoot.querySelector(`#${id}`)
  }

  firstUpdated(props) {
    super.firstUpdated(props)

    const navigate = function() {
      this.dispatchEvent(new CustomEvent('banner-actor-navigate', { detail: this, bubbles: true, composed: true }));
    };

    select(this.renderRoot)
      .selectAll('.actor, .explanation')
      .on('mouseenter', function() {
        // Note(cg): we fire an event potentially caught by home-page.
        this.dispatchEvent(new CustomEvent('banner-actor-enter', { detail: this, bubbles: true, composed: true }));
      })
      .on('mouseleave', function() {
        // Note(cg): we fire an event potentially caught by home-page.
        this.dispatchEvent(new CustomEvent('banner-actor-leave', { detail: this, bubbles: true, composed: true }));
      })
      .on('click', navigate)
      .on('tap', navigate);
  }

  updated(props) {
    super.updated(props);
    if (props.has('focus')) {
      this.focusTo(this.focus)
    }
  }

  // Note(cg): set viewBox so as to focus only to container.
  focusTo(id) {
    const viewBox = this.svg.viewBox.baseVal;
    const reset = { x: -200, y: 0, width: 1600, height: 570 };
    const focus = id && knownBBox[id] ? knownBBox[id] : this.getById(id) ? this.getById(id).getBBox() : reset;

    viewBox.x = focus.x;
    viewBox.y = focus.y;
    viewBox.width = focus.width;
    viewBox.height = focus.height;
  }

  // Note(cg): zoom to an #id.
  // https://bl.ocks.org/catherinekerr/b3227f16cebc8dd8beee461a945fb323
  zoomTo(id, scale) {

    const node = this.getById(id);

    const container = select(this.getById('zoom'));

    const bbox = container.node().getBBox();
    const vx = bbox.x; // container x co-ordinate
    const vy = bbox.y; // container y co-ordinate
    const vw = bbox.width; // container width
    const vh = bbox.height; // container height        

    function getTransform(node, scale) {
      if (!node) {
        return { translate: [0, 0], scale: 1 };
      }

      const bbox = node.getBBox();
      const bx = bbox.x;
      const by = bbox.y;
      const bw = bbox.width;
      const bh = bbox.height;
      if (!scale) {
        scale = Math.min(vw / bw, vh / bh);
      }
      const tx = -bx * scale + vx + vw / 2 - bw * scale / 2;
      const ty = -by * scale + vy + vh / 2 - bh * scale / 2;
      return { translate: [tx, ty], scale: scale };
    }

    var transform = getTransform(node, scale);
    container.transition().duration(1000)
      .attr('transform', 'translate(' + transform.translate + ')scale(' + transform.scale + ')');
  }
}

customElements.define('home-banner', HomeBanner);