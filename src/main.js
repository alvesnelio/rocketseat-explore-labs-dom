import "./css/index.css";
import IMask from "imask";

const cgBgColor01 = document.querySelector(".cc-bg svg > g g:nth-child(1) path");
const cgBgColor02 = document.querySelector(".cc-bg svg > g g:nth-child(2) path");
const ccLogo = document.querySelector(".cc-logo span:nth-child(2) img");

function setCardType(type) {
  const colors = {
    visa: [
      "purple", "brown"
    ],
    mastercard: [
      "red", "blue"
    ],
    default: ["#000000", "#ffffff"]
  };

  cgBgColor01.setAttribute("fill", colors[type][0]);
  cgBgColor02.setAttribute("fill", colors[type][1]);

  // if()
  const path = `cc-${type}.svg`;
  ccLogo.setAttribute("src", path);
}

globalThis.setCardType = setCardType;

// Security code.
const securityCode = document.querySelector("#security-code");
const securityCodePattern = {
  mask: "0000"
};
const securityCodeMasked = IMask(securityCode, securityCodePattern);

// Expiration date.
const exprirationDate = document.querySelector("#expiration-date");
const exprirationDatePattern = {
  mask: "MM{/}YY",
  blocks: {
    MM: {
      mask: IMask.MaskedRange,
      from: 1,
      to: 12,
      maxLength: 2
    },
    YY: {
      mask: IMask.MaskedRange,
      from: String(new Date().getFullYear()).slice(2),
      to: String(new Date().getFullYear() + 10).slice(2),
      maxLength: 2
    }
  }
};
const exprirationDateMasked = IMask(exprirationDate, exprirationDatePattern);

// Card number.
const cardNumber = document.querySelector("#card-number");
const cardNumberPattern = {
  mask: [
    {
      mask: "0000 0000 0000 0000",
      regex: /^4\d{0-15}/,
      cardType: "visa"
    }, {
      mask: "0000 0000 0000 0000",
      regex: /(^5[1-5]\d{0,2}|^22[2-9]\d|^2[3-7]\d{0,2})\d{0,12}/,
      cardType: "mastercard"
    }, {
      mask: "0000 0000 0000 0000",
      regex: ``,
      cardType: "default"
    }
  ],
  dispatch: function (appended, dynamicMasked) {
    const number = (dynamicMasked.value + appended).replace(/\D/g, "");
    const foundMask = dynamicMasked.compiledMasks.find(function (item) {
      return number.match(item.regex);
    });

    console.log(foundMask);

    return foundMask;
  }
};
const cardNumberMasked = IMask(cardNumber, cardNumberPattern);