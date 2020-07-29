import { css } from 'lit-element';

/*
  show hover will only appear on host hover, avtice or focus
 */
export default css `
  [show-hover] {
    transition: opacity 0.1s;
    opacity: 0;
  }
  
  :host(:hover) [show-hover], :host(:active) [show-hover], :host(:focus) [show-hover], :host([hover]) [show-hover] {
    opacity: 1;
  }
`;
