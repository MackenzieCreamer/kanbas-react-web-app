import { Routes, Route, Navigate } from "react-router";
import Account from "./Account";
import Dashboard from "./Dashboard";
import KanbasNavigation from "./Navigation";
import Courses from "./Courses";
// import * as db from "./Database";
import { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import "./styles.css";
import ProtectedRoute from "./Account/ProtectedRoute";
import EnrollmentProtection from "./Courses/EnrollmentProtection";
import Session from "./Account/Session";

import * as userClient from "./Account/client";
import * as courseClient from "./Courses/client";

export default function Kanbas() {
    const [courses, setCourses] = useState<any[]>([]);
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const [enrolling, setEnrolling] = useState<boolean>(false);
    const updateEnrollment = async (courseId: string, enrolled: boolean) => {
        if (enrolled) {
          await userClient.enrollForCourse(currentUser._id, courseId);
        } else {
          await userClient.unenrollFromCourse(currentUser._id, courseId);
        }
        setCourses(
          courses.map((course) => {
            if (course._id === courseId) {
              return { ...course, enrolled: enrolled };
            } else {
              return course;
            }
          })
        );
      };     
    
    const fetchCourses = async () => {
      let courses = [];
      try {
        courses = await userClient.findMyCourses(currentUser._id);
      } catch (error) {
        console.error(error);
      }
      setCourses(courses);
    };
    const fetchAllCourses = async () => {
        try {
            const allCourses = await courseClient.fetchAllCourses();
            console.log(allCourses)
            const enrolledCourses = await userClient.findMyCourses(
              currentUser._id
            );
            console.log(enrolledCourses)
            const courses = allCourses.map((course: any) => {
              if (enrolledCourses.find((c: any) => c._id === course._id)) {
                return { ...course, enrolled: true };
              } else {
                return { ...course, enrolled: false };
              }
            });
            setCourses(courses);
          } catch (error) {
            console.error(error);
          }       
    };
    useEffect(() => {
        if (enrolling) {
            fetchAllCourses();
          } else {
            fetchCourses();
          }       
    }, [currentUser, enrolling]);
  
    const [course, setCourse] = useState<any>({
        _id: "1234", name: "New Course", number: "New Number",
        startDate: "2023-09-10", endDate: "2023-12-15", description: "New Description",
    });
    const addNewCourse = async () => {
        // const newCourse = await userClient.createCourse(course);
        const newCourse = await courseClient.createCourse(course);
        setCourses([...courses, newCourse]);
    };
    const deleteCourse = async (courseId: any) => {
        const status = await courseClient.deleteCourse(courseId);
        setCourses(courses.filter((course) => course._id !== courseId));
    };
    const updateCourse =  async () => {
        await courseClient.updateCourse(course);
        setCourses(
        courses.map((c) => {
            if (c._id === course._id) {
            return course;
            } else {
            return c;
            }
        })
        );
    };

    return (
        <Session>
            <div id="wd-kanbas">
                <KanbasNavigation />
                <div className="wd-main-content-offset p-3">
                    <Routes>
                        <Route path="/" element={<Navigate to="Account" />} />
                        <Route path="/Account/*" element={<Account />} />
                        <Route path="/Dashboard" element={<ProtectedRoute>
                            <Dashboard
                            courses={courses}
                            course={course}
                            setCourse={setCourse}
                            addNewCourse={addNewCourse}
                            deleteCourse={deleteCourse}
                            updateCourse={updateCourse}
                            enrolling={enrolling}
                            setEnrolling={setEnrolling}
                            updateEnrollment={updateEnrollment}/> </ProtectedRoute>         
                        } />
                        <Route path="/Courses/:cid/*" element={<EnrollmentProtection courses={courses} enrolling={enrolling}><ProtectedRoute><Courses courses={courses}/></ProtectedRoute></EnrollmentProtection>} />
                        <Route path="/Calendar" element={<h1>Calendar</h1>} />
                        <Route path="/Inbox" element={<h1>Inbox</h1>} />
                    </Routes>
                </div>
        </div>
    </Session>
);}
