import { Routes, Route, Navigate } from "react-router";
import Account from "./Account";
import Dashboard from "./Dashboard";
import KanbasNavigation from "./Navigation";
import Courses from "./Courses";
// import * as db from "./Database";
import { useEffect, useState } from "react";
import store from "./store";
import { Provider, useSelector } from "react-redux";
import "./styles.css";
import ProtectedRoute from "./Account/ProtectedRoute";
import EnrollmentProtection from "./Courses/EnrollmentProtection";
import Session from "./Account/Session";

import * as userClient from "./Account/client";
import * as courseClient from "./Courses/client";

export default function Kanbas() {
    const [courses, setCourses] = useState<any[]>([]);
    const [allCourses, setAllCourses] = useState<any[]>([]);
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const fetchCourses = async () => {
      let courses = [];
      try {
        courses = await userClient.findMyCourses();
      } catch (error) {
        console.error(error);
      }
      setCourses(courses);
    };
    const fetchAllCourses = async () => {
        let allCourses = [];
        try {
            allCourses = await courseClient.fetchAllCourses();
        } catch (error) {
          console.error(error);
        }
        setAllCourses(allCourses);
    };
    useEffect(() => {
      fetchCourses();
      fetchAllCourses();
    }, [currentUser]);
  
    const [course, setCourse] = useState<any>({
        _id: "1234", name: "New Course", number: "New Number",
        startDate: "2023-09-10", endDate: "2023-12-15", description: "New Description",
    });
    const addNewCourse = async () => {
        const newCourse = await userClient.createCourse(course);
        setCourses([...courses, newCourse]);
        setAllCourses([...allCourses, newCourse]);
    };
    const deleteCourse = async (courseId: any) => {
        const status = await courseClient.deleteCourse(courseId);
        setCourses(courses.filter((course) => course._id !== courseId));
        setAllCourses(allCourses.filter((course) => course._id !== courseId));
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
        setAllCourses(
            allCourses.map((c) => {
                if (c._id === course._id) {
                return course;
                } else {
                return c;
                }
            })
        );
    };
    const updateCourseLists = async () => {
        fetchCourses();
        fetchAllCourses();
    }
  
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
                            allCourses={allCourses}
                            course={course}
                            setCourse={setCourse}
                            addNewCourse={addNewCourse}
                            deleteCourse={deleteCourse}
                            updateCourse={updateCourse}
                            updateCourseLists={updateCourseLists}/> </ProtectedRoute>         
                        } />
                        <Route path="/Courses/:cid/*" element={<EnrollmentProtection><ProtectedRoute><Courses courses={courses}/></ProtectedRoute></EnrollmentProtection>} />
                        <Route path="/Calendar" element={<h1>Calendar</h1>} />
                        <Route path="/Inbox" element={<h1>Inbox</h1>} />
                    </Routes>
                </div>
        </div>
    </Session>
);}
