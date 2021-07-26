import { LitElement, html, css, customElement, property } from 'lit-element';

@customElement('test-base')
export default class TestBase extends LitElement {

  @property({type: String}) title = 'base title'

  static get styles() {
    return css`...`
  }

  // Implement `render` to define a template for your element.
  render() {
    return html`
    <h2>${this.title}</h2>
    <p>content para</p>
    `
  }
}