import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addAssignment, setAssignments, updateAssignment } from "./reducer";
import { useEffect, useState } from "react";
import * as assignmentsClient from "./client"
import * as coursesClient from "../client"


export default function AssignmentEditor() {
  const { cid,aid } = useParams();
  const { assignments } = useSelector((state: any) => state.assignmentsReducer);
  const dispatch = useDispatch();
  const fetchAssignments = async () => {
    const assignments = await coursesClient.findAssignmentsForCourse(cid as string);
    dispatch(setAssignments(assignments));
    const currentAssignment = assignments.filter((assignment: any) => assignment._id === aid)[0] !== undefined ? 
    assignments.filter((assignment: any) => assignment._id === aid)[0] : assignment
    setAssignment({...currentAssignment})
  };
  useEffect(() => {
    fetchAssignments();
  }, []);
  const saveAssignment = async (assignment: any) => {
    await assignmentsClient.updateAssignment(assignment);
    dispatch(updateAssignment(assignment));
  };

  const initialState = assignments.filter((assignment: any) => assignment._id === aid)[0] !== undefined ? 
    assignments.filter((assignment: any) => assignment._id === aid)[0] : {
      title: "New Title",
      description: "New description",
      points: 100,
      startshort: "2999-01-01",
      dueshort: "2999-12-31",
      untilshort: "2999-12-31",
      course: cid,
    };
    const [assignment, setAssignment] = useState<any>(initialState);

  const newFlag = assignments.filter((assignment: any) => assignment._id === aid)[0] === undefined;

  const createAssignmentForCourse = async () => {
    if (!cid) return;
    const newAssignment = { cid, ...assignment };
    const localAssignment = await coursesClient.createAssignmentForCourse(cid, newAssignment);
    dispatch(addAssignment(localAssignment));
  };
  return (
    <div id="wd-assignments-editor" className="d-flex flex-column">
        <label htmlFor="wd-name">Assignment Name</label>
        <input id="wd-name" value={assignment.title} onChange={(e) => setAssignment({ ...assignment, title: e.target.value })} className="form-control mb-3"/>
        <textarea id="wd-description" className="form-control mb-3" value={assignment.description} onChange={(e) => setAssignment({ ...assignment, description: e.target.value })}></textarea>
        <div className="d-flex mb-3">
          <label htmlFor="wd-points" className="align-content-center text-end pe-3" style={{width:"200px"}}>Points</label>
          <input id="wd-points" value={assignment.points} onChange={(e) => setAssignment({ ...assignment, points: parseInt(e.target.value) })} className="form-control" />
        </div>
        <div className="d-flex mb-3">
          <label htmlFor="wd-group" className="align-content-center text-end pe-3" style={{width:"200px"}}>Assignment Group</label>
          <select id="wd-group" className="form-control">
            <option selected value="ASSIGNMENTS">ASSIGNMENTS</option>
            <option value="QUIZZES">QUIZZES</option>
            <option value="EXAMS"> EXAMS</option>
            <option value="PROJECT">PROJECT</option>
          </select>
        </div>
        <div className="d-flex mb-3">
          <label htmlFor="wd-display-grade-as" className="align-content-center text-end pe-3" style={{width:"200px"}}>Display Grade as</label>
          <select id="wd-display-grade-as" className="form-control">
            <option value="HIDE">Hide</option>
            <option value="POINTS">Points</option>
            <option selected value="PERCENTAGE">
                Percentage</option>
            <option value="LETTER">Letter</option>
          </select>
        </div>
        <div className="d-flex mb-3">
          <label htmlFor="wd-submission-type" style={{width:"200px"}} className="text-end pe-3">Submission Type</label>
          <div className="d-flex flex-column mb-3 form-control">
            <select id="wd-submission-type" className="form-control mb-3">
              <option value="HYBRID">Hybrid</option>
              <option value="PERSON">In Person</option>
              <option selected value="ONLINE">
                  Online</option>
              <option value="NONE">None</option>
            </select>
            <label className="fw-bold">Online Entry Options</label>
            
            <div className="d-flex">
              <input type="checkbox" name="check-entry" id="wd-text-entry" className="me-2"/>
              <label htmlFor="wd-text-entry">Text Entry</label>
            </div>
            <div className="d-flex">
              <input type="checkbox" name="check-entry" id="wd-website-url" className="me-2"/>
              <label htmlFor="wd-website-url">Website URL</label>
            </div>
            <div className="d-flex">
              <input type="checkbox" name="check-entry" id="wd-media-recordings" className="me-2"/>
              <label htmlFor="wd-media-recordings">Media Recordings</label>
            </div>
            <div className="d-flex">
              <input type="checkbox" name="check-entry" id="wd-student-annotation" className="me-2"/>
              <label htmlFor="wd-student-annotation">Student Annotation</label>
            </div>
            <div className="d-flex">
              <input type="checkbox" name="check-entry" id="wd-file-upload" className="me-2"/>
              <label htmlFor="wd-file-upload">File Uploads</label>
            </div>
          </div>
        </div>
        <div className="d-flex mb-3">
          <label htmlFor="wd-assign-to" className="text-end pe-3" style={{width:"200px"}}>Assign</label>
          <div className="d-flex flex-column mb-3 form-control">
            <div className="d-flex flex-column mb-3">
              <label htmlFor="wd-assign-to">Assign to</label>
              <input type="text" id="wd-assign-to" placeholder="Everyone" className="form-control"/>
            </div>
            <div className="f-flex flex-column mb-3">
              <label htmlFor="wd-due-date">Due</label>
              <input id="wd-due-date" type="date"
                value={assignment.dueshort} onChange={(e) => setAssignment({ ...assignment, dueshort: e.target.value })} className="form-control"/>
            </div>
            <div className="d-flex mb-3">
                <div className="d-flex flex-column me-1 w-50">
                  <label htmlFor="wd-available-from">Available from</label>
                  <input id="wd-available-from" type="date"
                    value={assignment.startshort} onChange={(e) => setAssignment({ ...assignment, startshort: e.target.value })} className="form-control"/>
                </div>
              <div className="d-flex flex-column w-50">
                <label htmlFor="wd-available-until">Until</label>
                <input id="wd-available-until" type="date"
                  value={assignment.untilshort} onChange={(e) => setAssignment({ ...assignment, untilshort: e.target.value })} className="form-control"/>
              </div>
            </div>
          </div>
        </div>
        <hr/>
        <div>
          <Link id="wd-save" type="button" onClick={() =>     {                  
                    if(newFlag) 
                      createAssignmentForCourse()
                    else{
                      saveAssignment({ ...assignment})
                      }
                    }
                    } className="btn btn-lg btn-danger float-end ms-1" to={"/Kanbas/Courses/"+ cid +"/Assignments"}> Save </Link>
          <Link id="wd-cancel" type="button" className="btn btn-lg btn-secondary float-end" to={"/Kanbas/Courses/"+ cid +"/Assignments"}> Cancel </Link> 
        </div>
  </div>
)
;}
  