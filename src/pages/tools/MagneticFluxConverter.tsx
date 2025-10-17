import { lazy } from "react";

const MagneticFluxConverter = lazy(() => import("@/tools/unit-conversion/magnetic-flux-converter"));

export default function MagneticFluxConverterPage() {
  return <MagneticFluxConverter />;
}
