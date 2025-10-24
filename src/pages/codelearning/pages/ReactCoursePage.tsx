import { CourseLayout } from "../components/CourseLayout";
import { reactTopics } from "../data/reactTopics";

function ReactCoursePage() {
  return (
    <CourseLayout 
      topics={reactTopics} 
      title="React Tutorial"
    />
  );
}

export default ReactCoursePage;