import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
// import { addEnrollment, deleteEnrollment } from "./Courses/reducer";
import * as usersClient from "./Account/client"
import { current } from "@reduxjs/toolkit";

export default function Dashboard(
  { courses, course, setCourse, addNewCourse,
    deleteCourse, updateCourse, enrolling, setEnrolling, updateEnrollment}: {
    courses: any[]; course: any; setCourse: (course: any) => void;
    addNewCourse: () => void; deleteCourse: (course: any) => void;
    updateCourse: () => void; enrolling: boolean; setEnrolling: (enrolling: boolean) => void;
    updateEnrollment: (courseId: string, enrolled: boolean) => void;}) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title" className="d-inline">Dashboard</h1>
      {currentUser.role !== "ADMIN" && <button onClick={() => setEnrolling(!enrolling)} className="float-end btn btn-primary" >
          {enrolling ? "My Courses" : "All Courses"}
        </button>}
      <hr />
      {(currentUser.role === "FACULTY" || currentUser.role === "ADMIN") && (<div><h5>New Course
          <button className="btn btn-primary float-end"
                  id="wd-add-new-course-click"
                  onClick={addNewCourse} > Add </button>
          <button className="btn btn-warning float-end me-2"
                  onClick={updateCourse} id="wd-update-course-click">
          Update
        </button>
      </h5><br />
      <input defaultValue={course.name} value={course.name} className="form-control mb-2" 
          onChange={(e) => setCourse({ ...course, name: e.target.value }) } />
      <textarea defaultValue={course.description} value={course.description} className="form-control"
          onChange={(e) => setCourse({ ...course, description: e.target.value }) } />
      <hr />
      <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2> <hr /></div>)}

      
      <div id="wd-dashboard-courses" className="row">
        <div className="row row-cols-1 row-cols-md-5 g-4">
        {courses  
        .map((course) => (
          <div className="wd-dashboard-course col" style={{ width: "300px" }}>
              <div className="card rounded-3 overflow-hidden">
                <Link to={`/Kanbas/Courses/${course._id}/Home`}
                      className="wd-dashboard-course-link text-decoration-none text-dark" >
                  <img src={course.image} alt="Potential course" width="100%" height={160} />
                  <div className="card-body">
                    <div className="d-flex justify-content-between">
                      <span className="wd-dashboard-course-title card-title overflow-hidden text-primary text-truncate fw-bold me-3">
                        {course.name}
                      </span>
                      {enrolling && currentUser.role !== "ADMIN" && (
                          <button  onClick={(event) => {
                            event.preventDefault();
                            updateEnrollment(course._id, !course.enrolled);
                            }} 
                            className={`btn ${ course.enrolled ? "btn-danger" : "btn-success" } float-end`} >
                            {course.enrolled ? "Unenroll" : "Enroll"}
                          </button>
                        )}
                      </div>
                    <p className="wd-dashboard-course-title card-text overflow-hidden" style={{ maxHeight: "100px" }}>
                      {course.description}
                    </p>                      
                    {(currentUser.role === "ADMIN" || currentUser.role === "FACULTY") && (<div>
                      <button className="btn btn-primary"> Go </button>
                    <button onClick={(event) => {
                        deleteCourse(course._id);
                        event.preventDefault();
                      }} className="btn btn-danger float-end"
                      id="wd-delete-course-click">
                      Delete
                    </button>
                    <button id="wd-edit-course-click"
                      onClick={(event) => {
                        setCourse(course);
                        event.preventDefault();
                      }}
                      className="btn btn-warning me-2 float-end" >
                      Edit
                    </button></div>)}
                    {(currentUser.role !== "FACULTY" && currentUser.role !== "ADMIN") && (<div>
                      <button className="btn btn-primary"> Go </button></div>)}
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
