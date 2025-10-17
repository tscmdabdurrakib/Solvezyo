import { lazy } from "react";

const ElectrostaticCapacitanceConverter = lazy(() => import("@/tools/unit-conversion/electrostatic-capacitance-converter"));

export default function ElectrostaticCapacitanceConverterPage() {
  return <ElectrostaticCapacitanceConverter />;
}
