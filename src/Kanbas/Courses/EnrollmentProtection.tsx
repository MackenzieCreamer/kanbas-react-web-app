import { useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";
export default function EnrollmentProtection({ children }: { children: any }) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { enrollments } = useSelector((state: any) => state.enrollmentsReducer);
  const { cid } = useParams();
  if (currentUser.role === "FACULTY" || enrollments.filter((m: any) => m.user === currentUser._id && m.course === cid).length !== 0) {
    return children;
  } else {
    return <Navigate to="/Kanbas/Dashboard" />;
}}
