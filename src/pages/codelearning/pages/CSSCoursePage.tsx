import { CourseLayout } from "../components/CourseLayout";
import { cssTopics } from "../data/cssTopics";

function CSSCoursePage() {
  return (
    <CourseLayout 
      topics={cssTopics} 
      title="CSS Tutorial"
    />
  );
}

export default CSSCoursePage;