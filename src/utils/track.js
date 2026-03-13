export async function trackPageView(path) {
  try {

    // 👇 lire paramètres URL
    const params = new URLSearchParams(window.location.search);

    let source =
      params.get("ref") ||
      params.get("promo") ||
      (document.referrer.includes("tiktok") && "tiktok") ||
      (document.referrer.includes("reddit") && "reddit") ||
      "direct";

    await fetch("/.netlify/functions/track", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        type: "visit",
        page: path,
        source: source
      })
    });

  } catch (err) {
    console.log("tracking error", err);
  }
}