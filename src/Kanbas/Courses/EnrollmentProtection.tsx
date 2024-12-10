import { useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";
import * as userClient from "../Account/client" 
import { useState } from "react";
export default function EnrollmentProtection({ children, courses, enrolling }: { children: any, courses : any[], enrolling: boolean }) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { cid } = useParams();
  const [possibleCourses, setCourses] = useState(courses)
  
  const getCourses = async () => {
    setCourses(await userClient.findMyCourses(currentUser._id))
  }
  if(possibleCourses.length===0){
    getCourses()
  } 
  const course = courses.filter((course : any) => course._id == cid)[0];

  if(course!==undefined){
    if (currentUser.role === "FACULTY" || currentUser.role === "ADMIN"  || (!enrolling && possibleCourses.some((compareCourse) => compareCourse._id === cid)) || course.enrolled) {
      return children;
    } else {
      return <Navigate to="/Kanbas/Dashboard" />;
    }
  } else {
    if (currentUser.role === "FACULTY" || currentUser.role === "ADMIN"  || (!enrolling && possibleCourses.some((compareCourse) => compareCourse._id === cid))) {
      return children;
    } else {
      return <Navigate to="/Kanbas/Dashboard" />;
    }
  }

}
