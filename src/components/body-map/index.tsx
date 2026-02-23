"use client";

/**
 * BodyMap – interactive anterior/posterior muscle-group selector.
 *
 * ─── How zones are mapped ───────────────────────────────────────────────────
 *
 * 1.  BodyRegion (src/types/index.ts) is the single source of truth for every
 *     muscle-group identifier string.
 *
 * 2.  REGION_TO_VIEW tells the component which SVG view (front / back) each
 *     region lives on.  A region may appear in both views if desired – the
 *     toggle will switch automatically when the user taps a zone that belongs
 *     to the non-active view.
 *
 * 3.  Each SVG view (FrontView / BackView) renders <g id="<BodyRegion>"> zones
 *     and calls onZoneClick / onZoneHover passed in via props.
 *
 * ─── Adding / modifying a zone ──────────────────────────────────────────────
 *
 * a. Add the new string literal to the BodyRegion union in src/types/index.ts.
 * b. Add a matching <g id="<value>" …> with path data in FrontView.tsx and/or
 *    BackView.tsx.
 * c. Add entries in REGION_LABELS and REGION_TO_VIEW below.
 * d. That's it – state management and navigation are generic and require no
 *    further changes.
 */

import React, { useState, useCallback, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { BodyRegion } from "@/types";
import FrontView from "./FrontView";
import BackView from "./BackView";

// ─── Configuration ──────────────────────────────────────────────────────────

/** Human-readable label for each region (used in aria-labels and tooltips). */
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

/**
 * Which view (front/back) each region is primarily located on.
 * If a region appears on both views it should default to the back view.
 */
const REGION_TO_VIEW: Record<BodyRegion, "front" | "back"> = {
  "hip-flexors": "front",
  quads: "front",
  "calves-achilles": "front",   // visible both sides; front default
  "it-band-tfl": "front",       // visible both sides; front default
  "shoulders-rotator-cuff": "front", // visible both sides; front default
  "traps-neck": "back",
  hamstrings: "back",
  glutes: "back",
  "lower-back": "back",
  "thoracic-spine": "back",
};

// Session-storage key for persisting the selected view across page refreshes.
const VIEW_STORAGE_KEY = "bodymap-view";

type View = "front" | "back";

// ─── Component ──────────────────────────────────────────────────────────────

export default function BodyMap() {
  const router = useRouter();

  // ── View state (persisted in sessionStorage) ─────────────────────────────
  const [view, setView] = useState<View>(() => {
    if (typeof window !== "undefined") {
      const stored = sessionStorage.getItem(VIEW_STORAGE_KEY);
      if (stored === "front" || stored === "back") return stored;
    }
    return "front";
  });

  // ── Selected / hovered region state ──────────────────────────────────────
  const [selectedRegion, setSelectedRegion] = useState<BodyRegion | null>(null);
  const [hoveredRegion, setHoveredRegion] = useState<BodyRegion | null>(null);
  // Guard against double navigation on rapid taps
  const [navigating, setNavigating] = useState(false);

  // Persist view preference
  useEffect(() => {
    sessionStorage.setItem(VIEW_STORAGE_KEY, view);
  }, [view]);

  // ── Event handlers ────────────────────────────────────────────────────────

  const handleViewToggle = useCallback((next: View) => {
    setView(next);
    setSelectedRegion(null);
    setHoveredRegion(null);
  }, []);

  const handleZoneClick = useCallback(
    (region: BodyRegion) => {
      if (navigating) return; // prevent double navigation

      // If region is on the other view, switch first and do NOT navigate yet
      const targetView = REGION_TO_VIEW[region];
      if (targetView !== view) {
        setView(targetView);
        return;
      }

      setSelectedRegion(region);
      setNavigating(true);

      // Brief visual feedback before routing (~120 ms)
      setTimeout(() => {
        router.push(`/symptom-select?region=${region}`);
      }, 120);
    },
    [navigating, view, router]
  );

  const handleZoneHover = useCallback((region: BodyRegion | null) => {
    setHoveredRegion(region);
  }, []);

  // ─────────────────────────────────────────────────────────────────────────

  return (
    <div
      className="body-map-container"
      style={{
        fontFamily: "'Inter', sans-serif",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1.5rem",
        width: "100%",
        padding: "1.5rem 1rem",
        backgroundColor: "#0D1B2A",
        minHeight: "100%",
        boxSizing: "border-box",
      }}
    >
      {/* ── Heading ──────────────────────────────────────────────────────── */}
      <div style={{ textAlign: "center" }}>
        <h1
          style={{
            color: "#E8F4FD",
            fontSize: "clamp(1.1rem, 4vw, 1.4rem)",
            fontWeight: 600,
            margin: 0,
            letterSpacing: "-0.01em",
          }}
        >
          Where does it hurt?
        </h1>
        <p
          style={{
            color: "#7FB3D3",
            fontSize: "clamp(0.8rem, 3vw, 0.9rem)",
            margin: "0.35rem 0 0",
          }}
        >
          Tap a muscle group to continue
        </p>
      </div>

      {/* ── Front / Back toggle ──────────────────────────────────────────── */}
      <div
        role="group"
        aria-label="Body view toggle"
        style={{
          display: "inline-flex",
          borderRadius: "9999px",
          overflow: "hidden",
          border: "1px solid #2E86C1",
          gap: 0,
        }}
      >
        {(["front", "back"] as View[]).map((v) => (
          <button
            key={v}
            onClick={() => handleViewToggle(v)}
            aria-pressed={view === v}
            style={{
              minWidth: "80px",
              minHeight: "44px",
              padding: "0 1.25rem",
              border: "none",
              cursor: "pointer",
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.875rem",
              fontWeight: 600,
              letterSpacing: "0.04em",
              textTransform: "uppercase",
              transition: "background-color 0.18s ease, color 0.18s ease",
              backgroundColor: view === v ? "#2E86C1" : "transparent",
              color: view === v ? "#FFFFFF" : "#7FB3D3",
              outline: "none",
            }}
            onFocus={(e) => {
              if (view !== v) e.currentTarget.style.backgroundColor = "#1B4F72";
            }}
            onBlur={(e) => {
              if (view !== v) e.currentTarget.style.backgroundColor = "transparent";
            }}
          >
            {v.charAt(0).toUpperCase() + v.slice(1)}
          </button>
        ))}
      </div>

      {/* ── SVG Body illustration ─────────────────────────────────────────── */}
      <div
        style={{
          width: "100%",
          maxWidth: "320px",
          position: "relative",
        }}
        aria-live="polite"
        aria-atomic="false"
      >
        {view === "front" ? (
          <FrontView
            onZoneClick={handleZoneClick}
            onZoneHover={handleZoneHover}
            hoveredRegion={hoveredRegion}
            selectedRegion={selectedRegion}
          />
        ) : (
          <BackView
            onZoneClick={handleZoneClick}
            onZoneHover={handleZoneHover}
            hoveredRegion={hoveredRegion}
            selectedRegion={selectedRegion}
          />
        )}

        {/* Hover / tap tooltip (desktop) */}
        {hoveredRegion && !navigating && (
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              bottom: "calc(100% + 0.5rem)",
              left: "50%",
              transform: "translateX(-50%)",
              backgroundColor: "#2E86C1",
              color: "#FFFFFF",
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.8rem",
              fontWeight: 600,
              padding: "0.35rem 0.75rem",
              borderRadius: "0.375rem",
              whiteSpace: "nowrap",
              pointerEvents: "none",
              boxShadow: "0 4px 12px rgba(0,0,0,0.35)",
              letterSpacing: "0.01em",
            }}
          >
            {REGION_LABELS[hoveredRegion]}
          </div>
        )}
      </div>

      {/* ── Region list – accessible fallback & zone legend ─────────────── */}
      <nav aria-label="Muscle group list" style={{ width: "100%", maxWidth: "360px" }}>
        <ul
          style={{
            listStyle: "none",
            margin: 0,
            padding: 0,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
            gap: "0.5rem",
          }}
        >
          {(Object.keys(REGION_LABELS) as BodyRegion[]).map((region) => {
            const isOnCurrentView = REGION_TO_VIEW[region] === view;
            const isSelected = selectedRegion === region;
            const isHovered = hoveredRegion === region;

            return (
              <li key={region}>
                <button
                  onClick={() => handleZoneClick(region)}
                  aria-label={`Select ${REGION_LABELS[region]}`}
                  aria-current={isSelected ? "true" : undefined}
                  style={{
                    width: "100%",
                    minHeight: "44px",
                    border: "1px solid",
                    borderColor: isSelected
                      ? "#85C1E9"
                      : isHovered
                      ? "#2E86C1"
                      : "#1B4F72",
                    borderRadius: "0.5rem",
                    backgroundColor: isSelected
                      ? "rgba(133,193,233,0.15)"
                      : isHovered
                      ? "rgba(46,134,193,0.15)"
                      : "rgba(27,79,114,0.25)",
                    color: isOnCurrentView
                      ? isSelected
                        ? "#85C1E9"
                        : "#C5E3F7"
                      : "#7FB3D3",
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.78rem",
                    fontWeight: 500,
                    padding: "0.4rem 0.6rem",
                    cursor: "pointer",
                    textAlign: "left",
                    transition: "all 0.18s ease",
                    opacity: navigating && !isSelected ? 0.5 : 1,
                  }}
                  onMouseEnter={() => handleZoneHover(region)}
                  onMouseLeave={() => handleZoneHover(null)}
                  onFocus={() => handleZoneHover(region)}
                  onBlur={() => handleZoneHover(null)}
                >
                  <span
                    style={{
                      display: "inline-block",
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      backgroundColor: isSelected
                        ? "#85C1E9"
                        : isHovered
                        ? "#2E86C1"
                        : "#1B4F72",
                      marginRight: "0.4rem",
                      verticalAlign: "middle",
                      transition: "background-color 0.18s ease",
                    }}
                  />
                  {REGION_LABELS[region]}
                  {!isOnCurrentView && (
                    <span
                      style={{
                        display: "block",
                        fontSize: "0.65rem",
                        color: "#5D9EC4",
                        marginTop: "0.1rem",
                        marginLeft: "1rem",
                      }}
                    >
                      → {REGION_TO_VIEW[region]} view
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* ── Loading overlay during navigation ────────────────────────────── */}
      {navigating && (
        <div
          role="status"
          aria-live="polite"
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(13,27,42,0.7)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 50,
          }}
        >
          <div
            style={{
              backgroundColor: "#0D1B2A",
              border: "1px solid #2E86C1",
              borderRadius: "0.75rem",
              padding: "1.25rem 2rem",
              textAlign: "center",
            }}
          >
            <p
              style={{
                color: "#85C1E9",
                fontFamily: "'Inter', sans-serif",
                fontWeight: 600,
                fontSize: "0.95rem",
                margin: 0,
              }}
            >
              {selectedRegion ? REGION_LABELS[selectedRegion] : ""} selected…
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
