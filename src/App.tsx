import { useState } from "react";
import { pipeline } from "@xenova/transformers";

export default function App() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState<any>(null);
  const [error, setError] = useState("");

  // Load MiniLM model ONCE (cached automatically by transformers.js)
  const [embedderPromise] = useState(() =>
    pipeline("feature-extraction", "Xenova/all-MiniLM-L6-v2"),
  );

  const sendQuery = async () => {
    try {
      setLoading(true);
      setError("");
      setAnswer(null);

      // 1️⃣ Generate embedding in browser
      const embedder = await embedderPromise;
      const output = await embedder(query, {
        pooling: "mean",
        normalize: true,
      });

      const embedding = Array.from(output.data);

      // 2️⃣ Send to backend RAG server
      const response = await fetch(
        "https://curatorbackend-6p51.onrender.com/query",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query, embedding }),
        },
      );

      if (!response.ok) throw new Error("Server error");

      const result = await response.json();
      setAnswer(result.answer);
    } catch (err: any) {
      console.error(err);
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 40, fontFamily: "sans-serif" }}>
      <h1>Medical RAG Test</h1>

      <textarea
        style={{ width: "100%", height: 120, padding: 12 }}
        placeholder="Enter your query..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <button
        onClick={sendQuery}
        disabled={loading}
        style={{
          marginTop: 20,
          padding: "12px 24px",
          cursor: "pointer",
          background: "#222",
          color: "white",
        }}
      >
        {loading ? "Processing..." : "Send Query"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {answer && (
        <div style={{ marginTop: 30 }}>
          <h2>Response:</h2>
          <pre
            style={{
              background: "#f3f3f3",
              padding: 20,
              borderRadius: 8,
              whiteSpace: "pre-wrap",
            }}
          >
            {JSON.stringify(answer, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}