export async function trackPageView(path) {
  try {

    let source = "direct";

    const params = new URLSearchParams(window.location.search);

    if (params.get("ref") === "reddit") {
      source = "reddit";
    }

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