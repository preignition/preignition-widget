import { css } from 'lit-element'; 

export default css`
  :host([theme~="secondary"]) {
      background: var(--secondary-color);
      color: var(--primary-background-color);
      border-color: var(--primary-background-color);
    }

  :host([theme~="primary"]) {
      background: var(--primary-color);
      color: var(--primary-background-color);
      border-color: var(--primary-background-color);
    }

  :host([theme~="accent"]) {
      background: var(--accent-color);
      color: var(--primary-background-color);
      border-color: var(--primary-background-color);
    }    

`;
