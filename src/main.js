import "./css/index.css";
import IMask from "imask";

const cgBgColor01 = document.querySelector(".cc-bg svg > g g:nth-child(1) path");
const cgBgColor02 = document.querySelector(".cc-bg svg > g g:nth-child(2) path");
const ccLogo = document.querySelector(".cc-logo span:nth-child(2) img");

function setCardType(type) {
  const colors = {
    visa: [
      "green", "yellow"
    ],
    mastercard: [
      "red", "blue"
    ],
    default: ["#000000", "#ffffff"]
  };

  cgBgColor01.setAttribute("fill", colors[type][0]);
  cgBgColor02.setAttribute("fill", colors[type][1]);
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
const expirationDateMasked = IMask(exprirationDate, exprirationDatePattern);

// Card number.
const cardNumber = document.querySelector("#card-number");
const cardNumberPattern = {
  mask: [
    {
      mask: "0000 0000 0000 0000",
      regex: /^4\d{0,15}/,
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

    return foundMask;
  }
};
const cardNumberMasked = IMask(cardNumber, cardNumberPattern);

// Button
const addButton = document.querySelector("#add-card");

addButton.addEventListener("click", function () {
  console.log("Opa, você clicou no botão");
});

document.querySelector("form").addEventListener("submit", function (event) {
  event.preventDefault();
});

const cardHolder = document.querySelector("#card-holder");
cardHolder.addEventListener("input", () => {
  const ccHolder = document.querySelector(".cc-holder .value");

  cardHolder.value.length === 0
    ? (ccHolder.innerText = "Fulano da silva")
    : (ccHolder.innerText = cardHolder.value);
});

// Update inputs card.
securityCodeMasked.on("accept", () => {
  updateSecuritycode(securityCodeMasked.value);
});

function updateSecuritycode(code) {
  const ccSecurity = document.querySelector(".cc-security .value");

  code.length === 0
    ? (ccSecurity.innerText = "123")
    : (ccSecurity.innerText = code);
}

cardNumberMasked.on("accept", () => {
  const cardType = cardNumberMasked.masked.currentMask.cardType;
  setCardType(cardType);

  updateCardNumber(cardNumberMasked.value);
});

function updateCardNumber(number) {
  const ccNumber = document.querySelector(".cc-number");

  if (number.length === 0) {
    ccNumber.innerText = "1234 5678 9012 3456";
  } else {
    ccNumber.innerText = number;
  }
}

expirationDateMasked.on("accept", () => {
  updateExpirationDate(expirationDateMasked.value);
});

function updateExpirationDate(date) {
  const ccExpiration = document.querySelector(".cc-expiration .value");

  date.length === 0
    ? (ccExpiration.innerText = "12/22")
    : (ccExpiration.innerText = date);
}
