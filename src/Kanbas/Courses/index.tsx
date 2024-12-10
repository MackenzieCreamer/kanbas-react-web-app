// import { courses } from "../Database";
import CoursesNavigation from "./Navigation";
import Modules from "./Modules";
import Home from "./Home";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor";
import { FaAlignJustify } from "react-icons/fa";
import { Navigate, Route, Routes, useParams, useLocation} from "react-router";
import PeopleTable from "./People/Table";
import { useEffect, useState } from "react";
import * as client from "./client"
import Quizzes from "./Quizzes";
import QuizEditor from "./Quizzes/Editor";
import QuizDetails from "./Quizzes/Details";
import { useSelector } from "react-redux";
import AttemptScreen from "./Quizzes/Attempts";


export default function Courses({ courses }: { courses: any[]; }) {
    const { cid } = useParams();
    const course = courses.find((course) => course._id === cid);
    const { pathname } = useLocation();

    const [users, setUsers] = useState<any[]>([]);
    const fetchUsers = async () => {
      const users = await client.findUsersForCourse(cid as string);
      setUsers(users);
    };
    useEffect(() => {
      fetchUsers();
    });

    return (
      <div id="wd-courses">
        <h2 className="text-danger">
        <FaAlignJustify className="me-4 fs-4 mb-1" />
          {course && course.name} &gt; {pathname.split("/")[4]}
        </h2>
        <hr />
        <div className="d-flex">
          <div className="d-none d-md-block">
            <CoursesNavigation />
          </div>
          <div className="flex-fill">
            <Routes>
              <Route path="/" element={<Navigate to="Home" />} />
              <Route path="Home" element={<Home />} />
              <Route path="Modules" element={<Modules />} />
              <Route path="Assignments" element={<Assignments />} />
              <Route path="Assignments/:aid" element={<AssignmentEditor />} />
              <Route path="Quizzes" element={<Quizzes />} />
              <Route path="Quizzes/:qid/details" element={<QuizDetails />} />
              <Route path="Quizzes/:qid/edit" element={<QuizEditor />} />
              <Route path="Quizzes/:qid/preview" element={<AttemptScreen />} />
              <Route path="People" element={<PeopleTable users={users} />} />
              </Routes>
          </div>
        </div>
    </div>
  );
}
  