// ==============================
// CONFIG – OFFER LINKS
// ==============================
const OFFER_POLAND = "https://direct-promo.pro/a/rkLmSDP2Ef4ojN";
const OFFER_CZECH = "https://top-deal.me/a/jRz0hRRl8S5mnG";
const OFFER_OTHER = "https://safeoffers.pro/a/QWP6iLlOuP17m";

const SAFE_REDIRECT = "https://google.com"; // suspicious traffic
const CLICK_DELAY = 2000; // 2 seconds human delay

// ==============================
// MAIN CLICK HANDLER
// ==============================
function goOffer() {
  const btn = document.querySelector("button");
  btn.innerText = "Checking availability...";
  btn.disabled = true;

  setTimeout(async () => {
    const risk = getRiskScore();

    // Block obvious bots / fake devices
    if (risk >= 50) {
      window.location.href = SAFE_REDIRECT;
      return;
    }

    // Get country & redirect
    const country = await getCountry();

    if (country === "PL") {
      window.location.href = OFFER_POLAND;
    } else if (country === "CZ") {
      window.location.href = OFFER_CZECH;
    } else {
      window.location.href = OFFER_OTHER;
    }

  }, CLICK_DELAY);
}

// ==============================
// BASIC BOT / FAKE DEVICE CHECK
// ==============================
function getRiskScore() {
  let score = 0;

  if (navigator.webdriver) score += 40;

  if (/bot|crawler|spider|headless|phantom/i.test(navigator.userAgent)) {
    score += 40;
  }

  if (isMobile() && navigator.maxTouchPoints === 0) {
    score += 20;
  }

  if (screen.width < 320 || screen.height < 320) {
    score += 20;
  }

  if (isMobile() && screen.width > 1024) {
    score += 20;
  }

  if (!navigator.language) {
    score += 10;
  }

  return score;
}

// ==============================
// DEVICE CHECK
// ==============================
function isMobile() {
  return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
}

// ==============================
// COUNTRY DETECTION (FREE)
// ==============================
async function getCountry() {
  try {
    const res = await fetch("https://ipapi.co/json/");
    const data = await res.json();
    return data.country; // PL, CZ, etc.
  } catch (e) {
    return "OTHER";
  }
}