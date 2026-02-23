"use client";

/**
 * FrontView.tsx
 *
 * Anterior (front-facing) anatomical body illustration rendered as interactive
 * JSX.  Each muscle-group zone is a <g> element whose id matches a BodyRegion
 * value so the parent can apply highlight classes dynamically.
 *
 * Zone geometry notes:
 *  – The viewBox is 200 × 480 (portrait).
 *  – Coordinates are approximate anatomical outlines; adjust the path data to
 *    match any future design-system illustration.  All <path> data uses
 *    absolute SVG commands so they are easy to edit in a vector editor.
 *  – To add a new zone: add a <g id="<BodyRegion>"> with its paths here, then
 *    register it in REGION_LABELS / REGION_TO_VIEW in index.tsx.
 */

import React from "react";
import type { BodyRegion } from "@/types";

export interface ZoneEventHandlers {
  onZoneClick: (region: BodyRegion) => void;
  onZoneHover: (region: BodyRegion | null) => void;
  hoveredRegion: BodyRegion | null;
  selectedRegion: BodyRegion | null;
}

type FrontRegion = Extract<
  BodyRegion,
  "hip-flexors" | "quads" | "shoulders-rotator-cuff" | "traps-neck" | "calves-achilles" | "it-band-tfl"
>;

// Zones visible on the front view
const FRONT_REGIONS: FrontRegion[] = [
  "traps-neck",
  "shoulders-rotator-cuff",
  "hip-flexors",
  "quads",
  "it-band-tfl",
  "calves-achilles",
];

const ZONE_FILL = {
  default: "#1B4F72",
  hover: "#2E86C1",
  selected: "#85C1E9",
} as const;

function getZoneFill(
  region: BodyRegion,
  hovered: BodyRegion | null,
  selected: BodyRegion | null
): string {
  if (selected === region) return ZONE_FILL.selected;
  if (hovered === region) return ZONE_FILL.hover;
  return ZONE_FILL.default;
}

export default function FrontView({
  onZoneClick,
  onZoneHover,
  hoveredRegion,
  selectedRegion,
}: ZoneEventHandlers) {
  const makeZoneProps = (region: FrontRegion) => ({
    id: region,
    role: "button" as const,
    tabIndex: 0,
    "aria-label": `Select ${region.replace(/-/g, " ")}`,
    style: {
      fill: getZoneFill(region, hoveredRegion, selectedRegion),
      transition: "fill 0.18s ease",
      cursor: "pointer",
    },
    onClick: () => onZoneClick(region),
    onMouseEnter: () => onZoneHover(region),
    onMouseLeave: () => onZoneHover(null),
    onFocus: () => onZoneHover(region),
    onBlur: () => onZoneHover(null),
    onKeyDown: (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onZoneClick(region);
      }
    },
  });

  return (
    <svg
      viewBox="0 0 200 480"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Front view of human body"
      role="img"
      style={{ width: "100%", height: "auto", maxWidth: "100%" }}
    >
      {/* ── Body outline ─────────────────────────────────────────────── */}
      <g id="body-outline" aria-hidden="true">
        {/* Head */}
        <ellipse cx="100" cy="34" rx="22" ry="26"
          fill="none" stroke="#4A90A4" strokeWidth="1.5" />
        {/* Neck */}
        <path d="M88,58 Q100,65 112,58 L114,72 Q100,78 86,72 Z"
          fill="none" stroke="#4A90A4" strokeWidth="1.5" />
        {/* Torso */}
        <path d="M68,72 Q52,78 48,98 L44,160 Q44,170 48,174
                  L50,210 Q52,220 68,224
                  L80,226 L80,240 L120,240 L120,226
                  L132,224 Q148,220 150,210
                  L152,174 Q156,170 156,160
                  L152,98 Q148,78 132,72 Z"
          fill="none" stroke="#4A90A4" strokeWidth="1.5" />
        {/* Left arm */}
        <path d="M68,78 Q52,88 46,104 L38,148 Q36,158 40,164
                  L44,178 Q46,182 50,180
                  L54,166 L56,152 Q56,144 60,134 L64,108 Z"
          fill="none" stroke="#4A90A4" strokeWidth="1.2" />
        {/* Right arm */}
        <path d="M132,78 Q148,88 154,104 L162,148 Q164,158 160,164
                  L156,178 Q154,182 150,180
                  L146,166 L144,152 Q144,144 140,134 L136,108 Z"
          fill="none" stroke="#4A90A4" strokeWidth="1.2" />
        {/* Left hand */}
        <ellipse cx="46" cy="186" rx="8" ry="10"
          fill="none" stroke="#4A90A4" strokeWidth="1.2" />
        {/* Right hand */}
        <ellipse cx="154" cy="186" rx="8" ry="10"
          fill="none" stroke="#4A90A4" strokeWidth="1.2" />
        {/* Left leg */}
        <path d="M80,240 L76,290 L74,340 Q72,360 72,380
                  L74,430 Q74,438 80,442
                  L88,444 Q94,444 96,438
                  L98,380 L100,350 Z"
          fill="none" stroke="#4A90A4" strokeWidth="1.5" />
        {/* Right leg */}
        <path d="M120,240 L124,290 L126,340 Q128,360 128,380
                  L126,430 Q126,438 120,442
                  L112,444 Q106,444 104,438
                  L102,380 L100,350 Z"
          fill="none" stroke="#4A90A4" strokeWidth="1.5" />
        {/* Left foot */}
        <path d="M74,438 Q68,440 64,444 L64,452 Q68,456 80,454 L84,448 Z"
          fill="none" stroke="#4A90A4" strokeWidth="1.2" />
        {/* Right foot */}
        <path d="M126,438 Q132,440 136,444 L136,452 Q132,456 120,454 L116,448 Z"
          fill="none" stroke="#4A90A4" strokeWidth="1.2" />

        {/* Anatomical landmarks – clavicles */}
        <path d="M88,74 Q76,72 64,76" fill="none" stroke="#4A90A4" strokeWidth="0.8" strokeDasharray="2,2" />
        <path d="M112,74 Q124,72 136,76" fill="none" stroke="#4A90A4" strokeWidth="0.8" strokeDasharray="2,2" />
        {/* Sternum center line */}
        <path d="M100,76 L100,170" fill="none" stroke="#4A90A4" strokeWidth="0.6" strokeDasharray="3,3" />
        {/* Rib cage outline */}
        <path d="M68,90 Q100,106 132,90 Q140,120 132,148 Q100,160 68,148 Q60,120 68,90"
          fill="none" stroke="#4A90A4" strokeWidth="0.8" strokeDasharray="2,2" />
        {/* Navel */}
        <circle cx="100" cy="178" r="2.5" fill="none" stroke="#4A90A4" strokeWidth="0.8" />
        {/* Hip crests */}
        <path d="M68,200 Q100,196 132,200" fill="none" stroke="#4A90A4" strokeWidth="0.8" strokeDasharray="2,2" />
        {/* Knee landmarks */}
        <ellipse cx="85" cy="338" rx="9" ry="6" fill="none" stroke="#4A90A4" strokeWidth="0.8" />
        <ellipse cx="115" cy="338" rx="9" ry="6" fill="none" stroke="#4A90A4" strokeWidth="0.8" />
      </g>

      {/* ── Interactive zones ─────────────────────────────────────────── */}

      {/* traps-neck: upper trapezius and neck musculature */}
      <g {...makeZoneProps("traps-neck")} opacity="0.75">
        {/* Left trap */}
        <path d="M88,62 Q80,66 72,72 Q64,76 60,82 Q62,86 68,84
                  Q78,80 86,74 Q94,70 100,68 Z" />
        {/* Right trap */}
        <path d="M112,62 Q120,66 128,72 Q136,76 140,82 Q138,86 132,84
                  Q122,80 114,74 Q106,70 100,68 Z" />
        {/* Neck sides */}
        <path d="M88,58 Q84,62 86,72 Q93,70 100,68 Q107,70 114,72 Q116,62 112,58 Z" />
      </g>

      {/* shoulders-rotator-cuff: deltoids and rotator cuff region */}
      <g {...makeZoneProps("shoulders-rotator-cuff")} opacity="0.75">
        {/* Left shoulder */}
        <path d="M68,72 Q56,76 48,88 Q44,98 46,108 Q50,114 56,110
                  Q60,102 62,92 Q66,84 72,78 Z" />
        {/* Right shoulder */}
        <path d="M132,72 Q144,76 152,88 Q156,98 154,108 Q150,114 144,110
                  Q140,102 138,92 Q134,84 128,78 Z" />
      </g>

      {/* hip-flexors: iliopsoas / hip flexor region (anterior pelvis) */}
      <g {...makeZoneProps("hip-flexors")} opacity="0.75">
        {/* Left hip flexor */}
        <path d="M68,196 Q64,206 66,220 Q72,228 80,228
                  L80,212 Q76,204 72,198 Z" />
        {/* Right hip flexor */}
        <path d="M132,196 Q136,206 134,220 Q128,228 120,228
                  L120,212 Q124,204 128,198 Z" />
        {/* Central lower abdomen / inguinal region */}
        <path d="M86,204 Q100,208 114,204 Q112,218 100,222 Q88,218 86,204 Z" />
      </g>

      {/* quads: rectus femoris, vastus lateralis/medialis/intermedius */}
      <g {...makeZoneProps("quads")} opacity="0.75">
        {/* Left quad */}
        <path d="M80,238 L76,258 L74,290 L74,318 Q78,330 84,332
                  Q90,330 92,318 L94,290 L96,258 L96,238 Z" />
        {/* Right quad */}
        <path d="M120,238 L124,258 L126,290 L126,318 Q122,330 116,332
                  Q110,330 108,318 L106,290 L104,258 L104,238 Z" />
      </g>

      {/* it-band-tfl: IT band / tensor fasciae latae (lateral thigh) */}
      <g {...makeZoneProps("it-band-tfl")} opacity="0.75">
        {/* Left IT band – lateral thigh strip */}
        <path d="M72,240 L68,260 L68,300 L70,330 Q72,336 74,334
                  Q74,318 74,290 L76,260 L78,240 Z" />
        {/* Right IT band */}
        <path d="M128,240 L132,260 L132,300 L130,330 Q128,336 126,334
                  Q126,318 126,290 L124,260 L122,240 Z" />
      </g>

      {/* calves-achilles: gastrocnemius / soleus / achilles tendon */}
      <g {...makeZoneProps("calves-achilles")} opacity="0.75">
        {/* Left calf (tibialis anterior visible from front) */}
        <path d="M76,344 L74,370 L74,400 Q74,418 76,428
                  Q80,432 84,430 Q88,428 88,418
                  L88,396 L88,370 L86,344 Z" />
        {/* Right calf */}
        <path d="M124,344 L126,370 L126,400 Q126,418 124,428
                  Q120,432 116,430 Q112,428 112,418
                  L112,396 L112,370 L114,344 Z" />
      </g>

      {/* ── Zone label overlays (shown on hover via CSS pointer-events:none) */}
      <g aria-hidden="true" pointerEvents="none">
        {FRONT_REGIONS.map((region) => {
          // Label positions keyed by region
          const labelPos: Record<FrontRegion, { x: number; y: number }> = {
            "traps-neck": { x: 100, y: 71 },
            "shoulders-rotator-cuff": { x: 100, y: 94 },
            "hip-flexors": { x: 100, y: 212 },
            quads: { x: 100, y: 284 },
            "it-band-tfl": { x: 100, y: 296 },
            "calves-achilles": { x: 100, y: 392 },
          };
          const pos = labelPos[region];
          const isActive = hoveredRegion === region || selectedRegion === region;
          return (
            <text
              key={region}
              x={pos.x}
              y={pos.y}
              textAnchor="middle"
              fontSize="6.5"
              fontFamily="Inter, sans-serif"
              fill="#E8F4FD"
              opacity={isActive ? 1 : 0}
              style={{ transition: "opacity 0.18s ease", userSelect: "none" }}
            >
              {region.replace(/-/g, " ")}
            </text>
          );
        })}
      </g>
    </svg>
  );
}
