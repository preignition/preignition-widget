import { css } from 'lit-element'; 

export default css`
    
    :host([theme~=badge]) {
      display: inline-block;
      overflow: hidden;
      max-width: var(--badge-max-width, 150px);
      text-overflow: ellipsis;
      white-space: nowrap;
      border-radius: 2px;
      font-size: 11px;
      padding: 2px 3px;
      cursor: pointer;
      margin-left: 2px;
      margin-right: 2px;
      vertical-align: middle;
    }

    :host([theme~=tag]) {
      padding: 5px;
      border:  1px solid;
      border-radius: 10px;
      display: inline-block;
      margin: 5px;
    }
`;
