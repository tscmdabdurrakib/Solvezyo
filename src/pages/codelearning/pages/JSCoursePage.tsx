import { CourseLayout } from "../components/CourseLayout";
import { jsTopics } from "../data/jsTopics";

function JSCoursePage() {
  return (
    <CourseLayout 
      topics={jsTopics} 
      title="JavaScript Tutorial"
    />
  );
}

export default JSCoursePage;