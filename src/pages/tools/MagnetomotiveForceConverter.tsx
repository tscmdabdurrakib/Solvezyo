import { lazy } from "react";

const MagnetomotiveForceConverter = lazy(() => import("@/tools/unit-conversion/magnetomotive-force-converter"));

export default function MagnetomotiveForceConverterPage() {
  return <MagnetomotiveForceConverter />;
}
