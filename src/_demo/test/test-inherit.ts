import { LitElement, html, css, customElement, property } from 'lit-element';
import TestBase from './test-base';
@customElement('test-inherit')
export default class TestInherit extends TestBase {

  @property({type : String}) content = 'prop content'

  static get styles() {
    return css`...`
  }

  static get properties() {
    return {
      ...super.properties
    }
  }

  // Implement `render` to define a template for your element.
   // Implement `render` to define a template for your element.
   render() {
    return html`
    <h2>${this.title}</h2>
    <p>${this.content}</p>
    `
  }
}