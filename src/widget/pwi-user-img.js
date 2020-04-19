import { LitElement, html, css } from 'lit-element';
import '@preignition/lit-firebase';
/**
 * Displays an image for a user
 */
class PwiUserImg extends LitElement {

  static get styles() {
    return css `
    :host {
       display: inline-flex;
    }

    img {
      border: solid white 2px;
      height: var(--pwi-user-img-size, 40px);
      width: var(--pwi-user-img-size, 40px);
      display: inline-block;
      background-color: var(--pwi-user-img-color, #dadce0)
      border-radius: 50%;
      flex-shrink: 0;
      margin: -2px;
      
      object-fit: cover;
      overflow: hidden;
      max-width: 100%;
      vertical-align: middle;
      filter: grayscale(60%);
    }

    [part=photo] {
      border: solid white 2px;
      border-radius: 50%;
      height: var(--pwi-user-img-size, 40px);
      width: var(--pwi-user-img-size, 40px);
      overflow: hidden;
      position: relative;
    }
    `;
  }

  static get properties() {
    return {

      ...super.properties,

      /*
       * `uid` the user ID
       */
      uid: {
        type: String,
      },

      /*
       * `displayName` used name
       */
      displayName: {
        type: String,
      },

      /*
       * `photoURL` 
       */
      photoURL: {
        type: String,
      },

      /*
       * `gravatarURL` 
       */
      gravatarURL: {
        type: String,
      },
      /*
       * `gravatarType` 
       */
      gravatarType: {
        type: String,
      },
      /*
       * `gravatarSize` 
       */
      gravatarSize: {
        type: String,
      }
    };
  }

  // render() {
  //   return html`
  //    <h3>COUCOU</h3>
  //   `;
  // }

  render() {
    return html `
      <lif-document @data-changed="${this.setPhotoURL}" .path="${this.photoPath}"></lif-document>
      <lif-document @data-changed="${e => this.displayName = e.detail.value}" .path="${this.namePath}"></lif-document>
      ${this.photoURL ? html`<div part="photo"><img src="${this.photoURL}" loading="lazy" alt="${this.displayName}"></div>` :''}
    `;
  }

  constructor() {
    super();
    this.gravatarURL = 'https://www.gravatar.com/avatar';
    this.gravatarType = 'mm';

  }

  setPhotoURL(e) {
    if (e && e.detail.value) {
      this.photoURL = e.detail.value;
      return;
    }
    this.photoURL = `${this.gravatarURL}/${this.uid}?d=${this.gravatarType}${this.gravatarSize ? ('size=' + this.gravatarSize) : ''}`;
  }

  get photoPath() {
    return `/userData/profile/${this.uid}/photoURL`;
  }
  get namePath() {
    return `/userData/profile/${this.uid}/displayName`;
  }
}

export default PwiUserImg;
customElements.define('pwi-user-img', PwiUserImg);
