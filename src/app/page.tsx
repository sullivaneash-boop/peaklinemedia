import Link from "next/link";

export default function Home() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#0D1B2A",
        gap: "1.5rem",
        padding: "2rem",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <h1 style={{ color: "#E8F4FD", fontSize: "1.75rem", fontWeight: 700, margin: 0 }}>
        Peakline Media
      </h1>
      <Link
        href="/body-map"
        style={{
          backgroundColor: "#2E86C1",
          color: "#FFFFFF",
          padding: "0.75rem 2rem",
          borderRadius: "0.5rem",
          textDecoration: "none",
          fontWeight: 600,
          fontSize: "0.95rem",
        }}
      >
        Open Body Map
      </Link>
    </main>
  );
}
