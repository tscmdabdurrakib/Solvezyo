import { lazy } from "react";

const MagneticFieldStrengthConverter = lazy(() => import("@/tools/unit-conversion/magnetic-field-strength-converter"));

export default function MagneticFieldStrengthConverterPage() {
  return <MagneticFieldStrengthConverter />;
}
