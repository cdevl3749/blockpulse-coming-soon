export async function trackPageView(path) {
  try {

    let source = "direct";

    const params = new URLSearchParams(window.location.search);

    const ref = params.get("ref");

    // détecter toutes les variantes reddit
    if (ref && ref.startsWith("reddit")) {
      source = "reddit";
    }

    // détecter TikTok
    if (params.get("promo") === "tiktok") {
      source = "tiktok";
    }

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