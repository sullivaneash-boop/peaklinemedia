"use client";

/**
 * BackView.tsx
 *
 * Posterior (back-facing) anatomical body illustration rendered as interactive
 * JSX.  Each muscle-group zone is a <g> element whose id matches a BodyRegion
 * value.
 *
 * Zone geometry notes:
 *  – The viewBox is 200 × 480 (same portrait canvas as FrontView).
 *  – To add a new zone: add a <g id="<BodyRegion>"> with its paths here, then
 *    register it in REGION_LABELS / REGION_TO_VIEW in index.tsx.
 */

import React from "react";
import type { BodyRegion } from "@/types";
import type { ZoneEventHandlers } from "./FrontView";

type BackRegion = Extract<
  BodyRegion,
  "hamstrings" | "glutes" | "lower-back" | "thoracic-spine" | "traps-neck" | "shoulders-rotator-cuff" | "calves-achilles" | "it-band-tfl"
>;

const BACK_REGIONS: BackRegion[] = [
  "traps-neck",
  "shoulders-rotator-cuff",
  "thoracic-spine",
  "lower-back",
  "glutes",
  "hamstrings",
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

export default function BackView({
  onZoneClick,
  onZoneHover,
  hoveredRegion,
  selectedRegion,
}: ZoneEventHandlers) {
  const makeZoneProps = (region: BackRegion) => ({
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
      aria-label="Back view of human body"
      role="img"
      style={{ width: "100%", height: "auto", maxWidth: "100%" }}
    >
      {/* ── Body outline ─────────────────────────────────────────────── */}
      <g id="body-outline-back" aria-hidden="true">
        {/* Head (posterior) */}
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
        <path d="M76,438 Q70,442 66,448 L68,454 Q76,456 84,450 L84,442 Z"
          fill="none" stroke="#4A90A4" strokeWidth="1.2" />
        {/* Right foot */}
        <path d="M124,438 Q130,442 134,448 L132,454 Q124,456 116,450 L116,442 Z"
          fill="none" stroke="#4A90A4" strokeWidth="1.2" />

        {/* Anatomical landmarks – spine center line */}
        <path d="M100,72 L100,230" fill="none" stroke="#4A90A4" strokeWidth="0.6" strokeDasharray="3,3" />
        {/* Scapula outlines */}
        <path d="M80,86 Q72,90 70,102 Q72,114 80,116 Q88,112 88,100 Q86,90 80,86"
          fill="none" stroke="#4A90A4" strokeWidth="0.8" strokeDasharray="2,2" />
        <path d="M120,86 Q128,90 130,102 Q128,114 120,116 Q112,112 112,100 Q114,90 120,86"
          fill="none" stroke="#4A90A4" strokeWidth="0.8" strokeDasharray="2,2" />
        {/* Iliac crest */}
        <path d="M68,200 Q100,194 132,200" fill="none" stroke="#4A90A4" strokeWidth="0.8" strokeDasharray="2,2" />
        {/* Sacrum */}
        <path d="M88,224 Q100,228 112,224 Q110,236 100,238 Q90,236 88,224"
          fill="none" stroke="#4A90A4" strokeWidth="0.8" strokeDasharray="2,2" />
        {/* Knee landmarks */}
        <ellipse cx="85" cy="338" rx="9" ry="6" fill="none" stroke="#4A90A4" strokeWidth="0.8" />
        <ellipse cx="115" cy="338" rx="9" ry="6" fill="none" stroke="#4A90A4" strokeWidth="0.8" />
        {/* Achilles tendon landmarks */}
        <path d="M82,410 L82,434" fill="none" stroke="#4A90A4" strokeWidth="1" strokeDasharray="2,2" />
        <path d="M118,410 L118,434" fill="none" stroke="#4A90A4" strokeWidth="1" strokeDasharray="2,2" />
      </g>

      {/* ── Interactive zones ─────────────────────────────────────────── */}

      {/* traps-neck: upper trapezius – large diamond on upper back */}
      <g {...makeZoneProps("traps-neck")} opacity="0.75">
        {/* Upper trap left */}
        <path d="M88,62 Q80,66 72,72 Q64,76 60,84 Q64,90 70,88
                  Q80,84 88,76 Q96,70 100,68 Z" />
        {/* Upper trap right */}
        <path d="M112,62 Q120,66 128,72 Q136,76 140,84 Q136,90 130,88
                  Q120,84 112,76 Q104,70 100,68 Z" />
        {/* Mid trap / neck base */}
        <path d="M88,58 Q84,62 86,72 Q93,70 100,68 Q107,70 114,72 Q116,62 112,58 Z" />
      </g>

      {/* shoulders-rotator-cuff: posterior deltoid / rotator cuff */}
      <g {...makeZoneProps("shoulders-rotator-cuff")} opacity="0.75">
        {/* Left posterior shoulder */}
        <path d="M68,72 Q56,76 48,88 Q44,98 46,110 Q50,116 56,112
                  Q60,104 62,94 Q66,84 72,78 Z" />
        {/* Right posterior shoulder */}
        <path d="M132,72 Q144,76 152,88 Q156,98 154,110 Q150,116 144,112
                  Q140,104 138,94 Q134,84 128,78 Z" />
      </g>

      {/* thoracic-spine: rhomboids, middle/lower trap, thoracic erectors */}
      <g {...makeZoneProps("thoracic-spine")} opacity="0.75">
        {/* Central thoracic zone */}
        <path d="M86,88 Q100,86 114,88 Q118,108 116,132
                  Q100,136 84,132 Q82,108 86,88 Z" />
        {/* Left erector spinae strip */}
        <path d="M82,90 Q76,92 74,108 Q74,128 78,136
                  Q82,134 84,130 Q82,110 84,92 Z" />
        {/* Right erector spinae strip */}
        <path d="M118,90 Q124,92 126,108 Q126,128 122,136
                  Q118,134 116,130 Q118,110 116,92 Z" />
      </g>

      {/* lower-back: lumbar erectors, QL, lumbosacral region */}
      <g {...makeZoneProps("lower-back")} opacity="0.75">
        {/* Central lumbar zone */}
        <path d="M84,136 Q100,134 116,136 Q118,158 116,178
                  Q100,182 84,178 Q82,158 84,136 Z" />
        {/* Left lumbar column */}
        <path d="M78,138 Q72,142 70,158 Q70,174 76,180
                  Q80,178 82,174 Q78,158 80,140 Z" />
        {/* Right lumbar column */}
        <path d="M122,138 Q128,142 130,158 Q130,174 124,180
                  Q120,178 118,174 Q122,158 120,140 Z" />
        {/* Upper sacral / posterior pelvis */}
        <path d="M82,180 Q100,184 118,180 Q118,200 116,212
                  Q100,216 84,212 Q82,200 82,180 Z" />
      </g>

      {/* glutes: gluteus maximus / medius */}
      <g {...makeZoneProps("glutes")} opacity="0.75">
        {/* Left glute */}
        <path d="M68,212 Q62,220 62,232 Q64,244 72,248
                  Q80,250 86,244 Q90,236 90,226
                  L86,214 Q78,210 68,212 Z" />
        {/* Right glute */}
        <path d="M132,212 Q138,220 138,232 Q136,244 128,248
                  Q120,250 114,244 Q110,236 110,226
                  L114,214 Q122,210 132,212 Z" />
      </g>

      {/* hamstrings: biceps femoris, semimembranosus, semitendinosus */}
      <g {...makeZoneProps("hamstrings")} opacity="0.75">
        {/* Left hamstring */}
        <path d="M80,248 Q74,260 74,280 L74,316 Q76,330 82,336
                  Q88,334 92,322 L94,284 Q96,264 94,248 Z" />
        {/* Right hamstring */}
        <path d="M120,248 Q126,260 126,280 L126,316 Q124,330 118,336
                  Q112,334 108,322 L106,284 Q104,264 106,248 Z" />
      </g>

      {/* it-band-tfl: IT band lateral thigh (posterior view) */}
      <g {...makeZoneProps("it-band-tfl")} opacity="0.75">
        {/* Left IT band */}
        <path d="M72,248 L68,268 L68,306 L70,334 Q72,340 74,338
                  Q74,316 74,280 L74,258 L76,248 Z" />
        {/* Right IT band */}
        <path d="M128,248 L132,268 L132,306 L130,334 Q128,340 126,338
                  Q126,316 126,280 L126,258 L124,248 Z" />
      </g>

      {/* calves-achilles: gastrocnemius, soleus, achilles tendon */}
      <g {...makeZoneProps("calves-achilles")} opacity="0.75">
        {/* Left calf body */}
        <path d="M76,342 L74,368 L74,400 Q74,416 76,428
                  Q80,434 84,432 Q88,428 88,416
                  L88,392 L88,366 L86,342 Z" />
        {/* Left achilles tendon */}
        <path d="M81,408 Q80,422 80,432 Q82,436 84,434
                  Q86,432 86,428 Q84,416 83,408 Z" />
        {/* Right calf body */}
        <path d="M124,342 L126,368 L126,400 Q126,416 124,428
                  Q120,434 116,432 Q112,428 112,416
                  L112,392 L112,366 L114,342 Z" />
        {/* Right achilles tendon */}
        <path d="M119,408 Q120,422 120,432 Q118,436 116,434
                  Q114,432 114,428 Q116,416 117,408 Z" />
      </g>

      {/* ── Zone label overlays ──────────────────────────────────────── */}
      <g aria-hidden="true" pointerEvents="none">
        {BACK_REGIONS.map((region) => {
          const labelPos: Record<BackRegion, { x: number; y: number }> = {
            "traps-neck": { x: 100, y: 71 },
            "shoulders-rotator-cuff": { x: 100, y: 94 },
            "thoracic-spine": { x: 100, y: 112 },
            "lower-back": { x: 100, y: 158 },
            glutes: { x: 100, y: 232 },
            hamstrings: { x: 100, y: 290 },
            "it-band-tfl": { x: 100, y: 302 },
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
