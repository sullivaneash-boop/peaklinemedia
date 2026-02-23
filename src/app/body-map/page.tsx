/**
 * /body-map route
 *
 * Renders the BodyMap component inside a full-viewport, navy-background shell.
 * The component itself is self-contained and reusable; this page simply provides
 * the routing entry point.
 */

import BodyMap from "@/components/body-map";

export const metadata = {
  title: "Body Map | Peakline Media",
  description: "Select a muscle group to describe your symptom",
};

export default function BodyMapPage() {
  return (
    <main
      style={{
        minHeight: "100svh",
        backgroundColor: "#0D1B2A",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <BodyMap />
    </main>
  );
}
