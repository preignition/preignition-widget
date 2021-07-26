const mix = (superClass) => {
  class Mixin extends superClass {
    static get properties() {
      return {
        ...super.properties,

        subTitle: {
          type: String
        }

      }
    }
    constructor() {
      super();
      this.subTitle = 'subtitle'
    }
  }
  return Mixin;
};

export default mix;
