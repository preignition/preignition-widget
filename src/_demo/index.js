import { html, render } from 'lit-html';

import '/dist/index.js';
import './preignition-demo.js';

window.onerror = function(e) {
  console.error('ERROR', e);
};

// Note(cg): prevent error happening in promise
// window.addEventListener("unhandledrejection", e => {
//   console.warn(`UNHANDLED PROMISE REJECTION: ${e.reason}`, e);
//   // e.preventDefault();
// });

render(
  html`
    <preignition-demo></preignition-demo>          
  `,
  document.querySelector('#demo')
);
