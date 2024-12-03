import { useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";
export default function EnrollmentProtection({ children, enrolledCourses }: { children: any, enrolledCourses : any[] }) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { cid } = useParams();
  if (currentUser.role === "FACULTY" || enrolledCourses.some((compareCourse) => {return (compareCourse._id === cid)})) {
    return children;
  } else {
    return <Navigate to="/Kanbas/Dashboard" />;
}}
