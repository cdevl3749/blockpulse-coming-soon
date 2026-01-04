import { useEffect } from "react";

export default function AboutEN() {
  // 🔒 Normal scroll on page load
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  return (
    <main style={{ maxWidth: "820px", margin: "0 auto", padding: "80px 20px" }}>
      <h1>About BlockPulse</h1>

      <p>
        BlockPulse is an independent technical project born from a simple observation:
        most so-called “real-time” Bitcoin data relies on the same intermediary APIs.
      </p>

      <p>
        These abstractions introduce shared latency, silent outages, and make it
        difficult to verify the true origin of the data.
      </p>

      <h2>A different approach</h2>

      <p>
        BlockPulse directly measures selected Bitcoin metrics using a physical ESP32
        module connected to the network.
        The data is produced by the hardware itself, without relying on third-party APIs.
      </p>

      <p>
        The goal is not trading, nor price prediction.
        BlockPulse provides a technical, reproducible, and independent data source,
        designed for developers, researchers, and technical profiles.
      </p>

      <h2>Who is behind BlockPulse</h2>

      <p>
        My name is Christophe, a developer based in Belgium.
        BlockPulse is a self-funded project, developed and maintained independently.
      </p>

      <p>
        The service is offered as a subscription, with no commitment, and complies
        with European data protection standards.
      </p>

      <h2>What BlockPulse is not</h2>

      <ul>
        <li>❌ A trading tool</li>
        <li>❌ A signal or financial prediction service</li>
        <li>❌ A promise of returns</li>
      </ul>

      <p>
        For any technical questions or specific requests, you can contact me via
        the Contact page or LinkedIn.
      </p>
    </main>
  );
}
