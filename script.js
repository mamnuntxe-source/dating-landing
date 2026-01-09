// ==============================
// CONFIG
// ==============================
const CPA_LINK = "https://direct-promo.pro/a/rkLmSDP2Ef4ojN";
const BOT_REDIRECT = "https://google.com"; // where bad traffic goes
const CLICK_DELAY = 2500; // 2.5 seconds human delay

// ==============================
// MAIN CLICK FUNCTION
// ==============================
function goOffer() {
  const btn = document.querySelector("button");
  btn.innerText = "Checking availability...";
  btn.disabled = true;

  setTimeout(async () => {
    const riskScore = await getRiskScore();

    // Block suspicious / fake traffic
    if (riskScore >= 60) {
      window.location.href = BOT_REDIRECT;
      return;
    }

    // Clean traffic → CPA offer
    window.location.href = CPA_LINK;

  }, CLICK_DELAY);
}

// ==============================
// RISK SCORING SYSTEM
// ==============================
async function getRiskScore() {
  let score = 0;

  // Headless browser / automation
  if (navigator.webdriver) score += 40;

  // Bot keywords
  if (/bot|crawler|spider|headless|phantom/i.test(navigator.userAgent)) {
    score += 40;
  }

  // Fake mobile (emulator)
  if (isMobile() && navigator.maxTouchPoints === 0) {
    score += 20;
  }

  // Screen spoofing
  if (screen.width < 320 || screen.height < 320) {
    score += 20;
  }

  // Device mismatch
  if (isMobile() && screen.width > 1024) {
    score += 20;
  }

  // Missing language (common in bots)
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