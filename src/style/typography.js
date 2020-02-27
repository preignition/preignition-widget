import { css } from 'lit-element'; 

export default css`
body, html {
  font-family: var(--font-family-text);
  -webkit-font-smoothing: antialiased;  /* OS X subpixel AA bleed bug */
}

/* [paper-font=display2] */
h1 {
  font-family: var(--font-family-heading, Roboto);
  font-size: var(--font-size-xxx-large, 45);
  font-weight: var(--font-weight-normal, 400);
  letter-spacing: -.018em;
  line-height: 48px;
}

/* [paper-font=display1] */
h2 {
  font-family: var(--font-family-heading, Roboto);
  font-size: var(--font-size-xx-large, 34px);
  font-weight: var(--font-weight-normal, 400);
  letter-spacing: var(--letter-spacing-heading, -.01em);
  line-height: 40px;
}

/* [paper-font=headline] */
h3 {
  font-family: var(--font-family-heading, Roboto);
  font-size: var(--font-size-x-large, 24px);
  font-weight: var(--font-weight-normal, 400);
  letter-spacing: var(--letter-spacing-heading, -.012em);
  line-height: 32px;
}

/* [paper-font=subhead] */
h4 {
  font-family: var(--font-family-heading, Roboto);
  font-size: var(--font-size-large, 16px);
  font-weight: var(--font-weight-normal, 400);
  line-height: 24px;
}

/* [paper-font=body2] */
h5, h6 {
  font-family: var(--font-family-heading, Roboto);
  font-size: var(--font-size-medium, 14px);
  font-weight: var(--font-weight-semi-bold, 500);
  line-height: 24px;
}

/* [paper-font=button] */
/*a {
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.018em;
  line-height: 24px;
  text-transform: uppercase;
}*/

/* Overrides */

body, a {
  color: #212121;
}

h1, h2, h3, h4, h5, h6, p {
  margin: 0 0 20px 0;
}

h1, h2, h3, h4, h5, h6, a {
  text-rendering: optimizeLegibility;
}

a {
  text-decoration: none;
}

`;
