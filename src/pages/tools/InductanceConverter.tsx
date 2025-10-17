import { lazy } from "react";

const InductanceConverter = lazy(() => import("@/tools/unit-conversion/inductance-converter"));

export default function InductanceConverterPage() {
  return <InductanceConverter />;
}
