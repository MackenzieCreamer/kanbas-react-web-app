import { FaMagnifyingGlass } from "react-icons/fa6";
import { FaCaretDown } from "react-icons/fa";
import { LiaClipboardListSolid } from "react-icons/lia";
import { BsGripVertical } from "react-icons/bs";
import GroupControlButtons from "./GroupControlButtons";
import AssignmentControlButtons from "./AssignmentControlButtons";
import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { deleteAssignment, setAssignments } from "./reducer";
import { useEffect, useState } from "react";
import * as coursesClient from "../client";
import * as assignmentsClient from "./client"

export default function Assignments() {
    const { cid } = useParams();
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const { assignments } = useSelector((state: any) => state.assignmentsReducer);
    const [assignmentId, setAssignmentId] = useState("");
    const [assignmentTitle, setAssignmentTitle] = useState("");
    const dispatch = useDispatch();
    const fetchAssignments = async () => {
      const assignments = await coursesClient.findAssignmentsForCourse(cid as string);
      dispatch(setAssignments(assignments));
    };
    useEffect(() => {
      fetchAssignments();
    }, []);
    const removeAssignment = async (assignmentId: string) => {
      await assignmentsClient.deleteAssignment(assignmentId);
      dispatch(deleteAssignment(assignmentId));
    };
  
  

    return (
      <div id="wd-assignments">
        {(currentUser.role ==="FACULTY" || currentUser.role ==="ADMIN") && (<div>
        <div className="display-flex align-items-center align-content-center" style={{height:"120px"}}>
          <Link id="wd-add-assignment" className="btn btn-lg btn-danger m-2 float-end"
            type="button" to={new Date().getTime().toString()}>
            + Assignment
          </Link>
          <button id="wd-add-group" className="btn btn-lg btn-secondary m-2 float-end"
            type="button">
            + Group
          </button>

          <div className="d-flex flex-fill position-relative m-2" style={{height:"48px"}}>
            <label htmlFor="wd-search-assignment"><FaMagnifyingGlass className="position-absolute top-50 translate-middle ms-4 text-secondary"/></label>
            <input className="form-control ps-5" id="wd-search-assignment"
              placeholder="Search..." />
          </div>
        </div>
        </div>)}
        {(currentUser.role !=="FACULTY" && currentUser.role !=="ADMIN") && (<div>
          <div className="d-flex flex-fill position-relative m-2" style={{height:"48px"}}>
            <label htmlFor="wd-search-assignment"><FaMagnifyingGlass className="position-absolute top-50 translate-middle ms-4 text-secondary"/></label>
            <input className="form-control ps-5" id="wd-search-assignment"
              placeholder="Search..." />
          </div>
        </div>)}
        <ul id="wd-assignment-list" className="list-group rounded-0">
          <li className="wd-assignment-list-item list-group-item p-0 mb-5 fs-5 border-gray">
            <div className="wd-group-title d-flex p-3 ps-2 bg-secondary">
              {currentUser.role === "FACULTY" && <BsGripVertical className="me-2 fs-3" />}
              <FaCaretDown className="me-1 fs-3"/>
              <div>ASSIGNMENTS</div>
              <div className="ms-auto bg-light ps-2 pe-2 me-1 rounded-pill">40% of Total</div>
              <GroupControlButtons />
            </div>
            <ul className="wd-assignments list-group rounded-0 border-start border-success border-5">
              {assignments
                .map((assignment: any) => (
                  
                  <li className="wd-assignment list-group-item p-3 ps-1 d-flex align-items-center">
                  {(currentUser.role ==="FACULTY" || currentUser.role ==="ADMIN") && <BsGripVertical className="me-2 fs-3" />}
                  <LiaClipboardListSolid className="me-2 fs-3 text-success"/>
                  <div className="d-flex flex-column align-content-center w-75">
                    <a className="wd-assignment-link text-decoration-none text-dark fw-bold"
                      href={"#/Kanbas/Courses/"+cid+"/Assignments/"+assignment._id}>
                      {assignment.title}
                    </a>
                    <div className="fs-6">
                    <div className="d-inline text-danger">Multiple Modules</div> | <b>Not available until</b> {(new Date((assignment.startshort.substring(0,10)).replace(/-/g, '\/'))).toLocaleDateString('en-US', { year: 'numeric',month: 'long', day: 'numeric'})} at 12:00 AM | <b>Due</b> {(new Date(assignment.dueshort.substring(0,10).replace(/-/g, '\/'))).toLocaleDateString('en-US', { year: 'numeric',month: 'long', day: 'numeric'})} at 11:59 pm | {assignment.points} pts
                    </div>
                  </div>
                  {(currentUser.role ==="FACULTY" || currentUser.role ==="ADMIN") && <div className="ms-auto">
                    <AssignmentControlButtons
                     setAssignmentId={setAssignmentId}
                     assignmentId={assignment._id}
                     deleteAssignment={() => {
                      removeAssignment(assignmentId)
                    }}  setAssignmentTitle={setAssignmentTitle}
                    assignmentTitle={assignment.title}
                    titleState = {assignmentTitle}
                    /> 
                  </div>}
                </li>
                ))
              }
            </ul>
          </li>
        </ul>
      </div>
  );}
  