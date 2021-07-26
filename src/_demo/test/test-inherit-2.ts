import { LitElement, html, css, customElement, property } from 'lit-element';
import TestBase from './test-inherit';
import Mix from './mix'
@customElement('test-inherit-2')
class TestInherit extends Mix(TestBase) {

 
  // Implement `render` to define a template for your element.
   // Implement `render` to define a template for your element.
   render() {
    return [super.render(), 
      html`
      <h3>${this.subTitle}</h3>
    `]
  }
}

