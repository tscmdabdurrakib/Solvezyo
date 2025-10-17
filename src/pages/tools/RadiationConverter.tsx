import { lazy } from "react";

const RadiationConverter = lazy(() => import("@/tools/unit-conversion/radiation-converter"));

export default function RadiationConverterPage() {
  return <RadiationConverter />;
}
