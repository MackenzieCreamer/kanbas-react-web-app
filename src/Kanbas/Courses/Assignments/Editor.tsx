import * as db from "../../Database";
import { useParams } from "react-router";
import { Link } from "react-router-dom";


export default function AssignmentEditor() {
  const { cid,aid } = useParams();
  const assignments = db.assignments;
  const assignment = assignments.filter((assignment: any) => assignment._id === aid)[0]
  console.log(assignment)
  return (
    <div id="wd-assignments-editor" className="d-flex flex-column">
        <label htmlFor="wd-name">Assignment Name</label>
        <input id="wd-name" value={assignment.title} className="form-control mb-3"/>
        <textarea id="wd-description" className="form-control mb-3">
          {assignment.description}
        </textarea>
        <div className="d-flex mb-3">
          <label htmlFor="wd-points" className="align-content-center text-end pe-3" style={{width:"200px"}}>Points</label>
          <input id="wd-points" value={assignment.points} className="form-control" />
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
                defaultValue={assignment.dueshort} className="form-control"/>
            </div>
            <div className="d-flex mb-3">
                <div className="d-flex flex-column me-1 w-50">
                  <label htmlFor="wd-available-from">Available from</label>
                  <input id="wd-available-from" type="date"
                    defaultValue={assignment.startshort} className="form-control"/>
                </div>
              <div className="d-flex flex-column w-50">
                <label htmlFor="wd-available-until">Until</label>
                <input id="wd-available-until" type="date"
                  defaultValue={assignment.untilshort} className="form-control"/>
              </div>
            </div>
          </div>
        </div>
        <hr/>
        <div>
          <Link id="wd-save" type="button" className="btn btn-lg btn-danger float-end ms-1" to={"/Kanbas/Courses/"+ cid +"/Assignments"}> Save </Link>
          <Link id="wd-cancel" type="button" className="btn btn-lg btn-secondary float-end" to={"/Kanbas/Courses/"+ cid +"/Assignments"}> Cancel </Link> 
        </div>
  </div>
)
;}
  