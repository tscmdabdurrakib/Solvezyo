import { lazy } from "react";

const ElectricConductivityConverter = lazy(() => import("@/tools/unit-conversion/electric-conductivity-converter"));

export default function ElectricConductivityConverterPage() {
  return <ElectricConductivityConverter />;
}
