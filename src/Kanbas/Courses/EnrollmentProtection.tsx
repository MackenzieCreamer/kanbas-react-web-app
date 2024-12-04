import { useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";
export default function EnrollmentProtection({ children, courses, enrolling }: { children: any, courses : any[], enrolling: boolean }) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { cid } = useParams();
  const course = courses.filter((course : any) => course._id == cid)[0];
  if (currentUser.role === "FACULTY" || currentUser.role === "ADMIN"  || (!enrolling && courses.some((compareCourse) => compareCourse._id === cid)) || course.enrolled) {
    return children;
  } else {
    return <Navigate to="/Kanbas/Dashboard" />;
}}
