import { Switch, Route } from "wouter";
import { lazy, Suspense } from "react";
import CodeLearningLanding from "./pages/Landing";
import { CourseLayout } from "./components/CourseLayout";

// Lazy load course pages
const HTMLCoursePage = lazy(() => import("./pages/HTMLCoursePage"));
const CSSCoursePage = lazy(() => import("./pages/CSSCoursePage"));
const JSCoursePage = lazy(() => import("./pages/JSCoursePage"));
const ReactCoursePage = lazy(() => import("./pages/ReactCoursePage"));
const NodeJSCoursePage = lazy(() => import("./pages/NodeJSCoursePage"));

function CodeLearningLayout() {
  return (
    <div className="min-h-screen bg-background">
      <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
        <Switch>
          <Route path="/" component={CodeLearningLanding} />
          <Route path="/html/*" component={HTMLCoursePage} />
          <Route path="/css/*" component={CSSCoursePage} />
          <Route path="/javascript/*" component={JSCoursePage} />
          <Route path="/react/*" component={ReactCoursePage} />
          <Route path="/nodejs/*" component={NodeJSCoursePage} />
        </Switch>
      </Suspense>
    </div>
  );
}

export default CodeLearningLayout;