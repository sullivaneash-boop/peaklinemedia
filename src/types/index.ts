/**
 * BodyRegion – the canonical set of muscle-group identifiers used throughout
 * the app.  The string values double as:
 *   1. SVG element IDs in FrontView / BackView
 *   2. URL query param values  (?region=<BodyRegion>)
 *   3. Keys in the REGION_LABELS / REGION_VIEW mapping inside body-map
 *
 * To add a new region:
 *   1. Add the literal string here.
 *   2. Add a matching <path id="<value>" …> in the relevant SVG view component.
 *   3. Add an entry in REGION_LABELS and REGION_TO_VIEW in
 *      src/components/body-map/index.tsx.
 */
export type BodyRegion =
  | "hip-flexors"
  | "hamstrings"
  | "glutes"
  | "quads"
  | "lower-back"
  | "thoracic-spine"
  | "shoulders-rotator-cuff"
  | "traps-neck"
  | "calves-achilles"
  | "it-band-tfl";
