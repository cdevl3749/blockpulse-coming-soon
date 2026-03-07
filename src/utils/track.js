export async function trackPageView(path) {
  try {

    await fetch("/.netlify/functions/track", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        type: "visit",
        page: path
      })
    });

  } catch (err) {
    console.log("tracking error", err);
  }
}