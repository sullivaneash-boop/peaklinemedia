"use client";

/**
 * /symptom-select route
 *
 * Landing page after the user taps a muscle zone on the BodyMap.
 * Reads the `region` query parameter and displays the selected region name.
 * Extend this page to show symptom-selection UI as needed.
 */

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";
import type { BodyRegion } from "@/types";

const REGION_LABELS: Record<BodyRegion, string> = {
  "hip-flexors": "Hip Flexors",
  hamstrings: "Hamstrings",
  glutes: "Glutes",
  quads: "Quads",
  "lower-back": "Lower Back",
  "thoracic-spine": "Thoracic Spine",
  "shoulders-rotator-cuff": "Shoulders / Rotator Cuff",
  "traps-neck": "Traps & Neck",
  "calves-achilles": "Calves & Achilles",
  "it-band-tfl": "IT Band / TFL",
};

function SymptomSelectContent() {
  const searchParams = useSearchParams();
  const region = searchParams.get("region") as BodyRegion | null;
  const label = region && REGION_LABELS[region] ? REGION_LABELS[region] : region;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1.5rem",
        padding: "2rem 1rem",
        maxWidth: "480px",
        width: "100%",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <h1
        style={{
          color: "#E8F4FD",
          fontSize: "clamp(1.2rem, 5vw, 1.75rem)",
          fontWeight: 700,
          margin: 0,
          textAlign: "center",
        }}
      >
        {label ? label : "Region not selected"}
      </h1>
      {region && (
        <p style={{ color: "#7FB3D3", margin: 0, textAlign: "center" }}>
          You selected{" "}
          <strong style={{ color: "#85C1E9" }}>{label}</strong>.{" "}
          Add your symptom-selection UI here.
        </p>
      )}
      <Link
        href="/body-map"
        style={{
          marginTop: "1rem",
          backgroundColor: "transparent",
          border: "1px solid #2E86C1",
          color: "#7FB3D3",
          padding: "0.75rem 1.5rem",
          borderRadius: "0.5rem",
          textDecoration: "none",
          fontWeight: 500,
          fontSize: "0.875rem",
          minHeight: "44px",
          display: "inline-flex",
          alignItems: "center",
        }}
      >
        ← Back to Body Map
      </Link>
    </div>
  );
}

export default function SymptomSelectPage() {
  return (
    <main
      style={{
        minHeight: "100svh",
        backgroundColor: "#0D1B2A",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Suspense fallback={<p style={{ color: "#7FB3D3" }}>Loading…</p>}>
        <SymptomSelectContent />
      </Suspense>
    </main>
  );
}
