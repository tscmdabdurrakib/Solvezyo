import { lazy } from "react";

const MagneticFluxDensityConverter = lazy(() => import("@/tools/unit-conversion/magnetic-flux-density-converter"));

export default function MagneticFluxDensityConverterPage() {
  return <MagneticFluxDensityConverter />;
}
