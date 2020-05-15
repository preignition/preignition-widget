import { css } from 'lit-element';

export default css `
    
    [data-title] {
      position: relative;
    }
  
    [data-title]::before {
      opacity: 0;
      will-change: opacity;
      transition: opacity 150ms;
      content: attr(data-title);
      position: absolute;
      bottom: -32px;
      display: inline-block;
      padding: 5px 10px;
      border-radius: 3px;
      font-family: var(--mdc-typography-body2-font-family, var(--mdc-typography-font-family, Roboto, sans-serif));
      font-size: var(--mdc-typography-body2-font-size, 0.875rem);
      line-height: var(--mdc-typography-body2-line-height, 1.25rem);
      font-weight: var(--mdc-typography-body2-font-weight, 400);
      letter-spacing: var(--mdc-typography-body2-letter-spacing, 0.0178571em);
      text-transform: var(--mdc-typography-body2-text-transform, inherit);
      background-color: var(--tooltip-background-color, rgb(51, 51, 51));
      color: var(--tooltip-color, rgba(255, 255, 255, 0.87));
      white-space: nowrap;
    }
   
    [data-title]:hover::before, [data-title]:hover::after {
      opacity: 1;
    }
`;
