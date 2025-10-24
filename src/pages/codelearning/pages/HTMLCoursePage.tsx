import { CourseLayout } from "../components/CourseLayout";
import { htmlTopics } from "../data/htmlTopics";

function HTMLCoursePage() {
  return (
    <CourseLayout 
      topics={htmlTopics} 
      title="HTML Tutorial"
    />
  );
}

export default HTMLCoursePage;