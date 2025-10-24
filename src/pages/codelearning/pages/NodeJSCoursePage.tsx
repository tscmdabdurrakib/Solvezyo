import { CourseLayout } from "../components/CourseLayout";
import { nodejsTopics } from "../data/nodejsTopics";

function NodeJSCoursePage() {
  return (
    <CourseLayout 
      topics={nodejsTopics} 
      title="Node.js Tutorial"
    />
  );
}

export default NodeJSCoursePage;