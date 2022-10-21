import "./css/index.css";

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
