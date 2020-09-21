const supportLocale = !!Number.prototype.toLocaleString;
const reg = /[^\d]*/g;

export const LocaleInput = (baseElement) => class extends baseElement {

  static get properties() {
    return {
      ...super.properties,

      /**
       * `locale`  A string with a BCP 47 language tag, or an array of such strings(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#Locale_identification_and_negotiation)
       */
      locale: {
        type: String
      },

      /**
       * `currency` the currency to Use. The currency to use in currency formatting. Possible values are the ISO 4217 currency codes, such as "USD" for the US dollar, "EUR" for the euro, or "CNY" for the Chinese RMB — see the Current currency & funds code list. There is no default value; if the style is "currency", the currency property must be provided.
       */
      currency: {
        type: String
      },

      /**
       * `style` The formatting style to use. Possible values are "decimal" for plain number formatting, "currency" for currency formatting, and "percent" for percent formatting.
       */
      formatingStyle: {
        type: String
      },


      /**
       * `currencyDisplay` How to display the currency in currency formatting. Possible values are "symbol" to use a localized currency symbol such as €, "code" to use the ISO currency code, "name" to use a localized currency name such as "dollar"; the default is "symbol".
       */
      currencyDisplay: {
        type: String
      },

      /**
       * `preventUseGrouping` Whether to use grouping separators, such as thousands separators or thousand/lakh/crore separators. .
       */
      preventUseGrouping: {
        type: Boolean
      },

      /**
       * `minimumFractionDigits` The minimum number of fraction digits to use. Possible values are from 0 to 20; the default for plain number and percent formatting is 0
       */
      minimumFractionDigits: {
        type: Number
      },

      /**
       * `maximumFractionDigits` The maximum number of fraction digits to use. Possible values are from 0 to 20; the default for plain number formatting is the larger of minimumFractionDigits and 3; the default for currency formatting is the larger of minimumFractionDigits and the number of minor unit digits provided by the ISO 4217 currency code list (2 if the list doesn't provide that information); the default for percent formatting is the larger of minimumFractionDigits and 0.
       */
      maximumFractionDigits: {
        type: Number
      },

      /**
       * `minimumIntegerDigits` The minimum number of integer digits to use. Possible values are from 1 to 21; the default is 1.
       */
      minimumIntegerDigits: {
        type: Number
      },

      /*
       * `__numValue` value used for validation and firing value canhges up
       */
      __numValue: {
        type: Number,
      },
    };
  }

  constructor() {
    super();
    this.minimumFractionDigits = 0;
    this.maximumFractionDigits = 2;
    this.minimumIntegerDigits = 1;
    this.preventUseGrouping = false;
    this.currencyDisplay = 'symbol';
    this.locale = 'us-US';
    this.currency = 'USD';
    this.formatingStyle = 'currency';

  }
  update(props) {
    if (supportLocale && props.has('value')) {
      this.__numValue = this.getNumericValue(this.value);
      this.value = this.getFormatedValue(this.__numValue);
    }
    super.update(props);
  }

  updated(props) {
    if (props.has('minimumIntegerDigits')
      || props.has('maximumFractionDigits')
      || props.has('minimumFractionDigits')
      || props.has('preventUseGrouping')
      || props.has('currencyDisplay')
      || props.has('currency')
      || props.has('locale')
      || props.has('formatingStyle')
      ) {
      this.handleInputChange(this.value);
    }

    if (props.has('currency') && !supportLocale) {
      this.prefix = this.currency;
    }
    super.updated(props);
  }

  dispatchValueChanged() {
    this.dispatchEvent(new CustomEvent('value-changed', { detail: { value: supportLocale ? this.getNumericValue(this.value) : this.value }, bubbles: true, composed: true }));
  }

  getNumericValue(value) {
    value = value.replace(reg, '');
    return value.length ? value * Math.pow(10, -this.minimumFractionDigits) : '';
  }

  getFormatedValue(num) {
    let format;
    try {
      format = num.toLocaleString(this.locale, {
        style: this.formatingStyle,
        currency: this.currency,
        currencyDisplay: this.currencyDisplay,
        preventUseGrouping: this.preventUseGrouping,
        minimumFractionDigits: this.minimumFractionDigits,
        maximumFractionDigits: this.maximumFractionDigits,
        minimumIntegerDigits: this.minimumIntegerDigits
          // minimumSignificantDigits and minimumSignificantDigitsthis does not work
          // minimumSignificantDigits:  this.minimumSignificantDigits || minimumSignificantDigits,
          // maximumSignificantDigits:  this.maximumSignificantDigit || maximumSignificantDigits
      });
    } catch (err) {
      this.errorMessage = err;
      this.invalid = true;
      return num;
    }
    this.errorMessage = null;
    this.invalid = false;
    return format;
  }
};

export default LocaleInput;
