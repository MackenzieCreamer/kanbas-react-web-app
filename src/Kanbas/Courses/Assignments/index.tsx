import { FaMagnifyingGlass } from "react-icons/fa6";
import { FaCaretDown } from "react-icons/fa";
import { LiaClipboardListSolid } from "react-icons/lia";
import { BsGripVertical } from "react-icons/bs";
import GroupControlButtons from "./GroupControlButtons";
import AssignmentControlButtons from "./AssignmentControlButtons";

export default function Assignments() {
    return (
      <div id="wd-assignments">
        <div className="display-flex align-items-center align-content-center" style={{height:"120px"}}>
          <button id="wd-add-assignment" className="btn btn-lg btn-danger m-2 float-end"
            type="button">
            + Assignment
          </button>
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
        <ul id="wd-assignment-list" className="list-group rounded-0">
          <li className="wd-assignment-list-item list-group-item p-0 mb-5 fs-5 border-gray">
            <div className="wd-group-title d-flex p-3 ps-2 bg-secondary">
              <BsGripVertical className="me-2 fs-3" />
              <FaCaretDown className="me-1 fs-3"/>
              <div>ASSIGNMENTS</div>
              <div className="ms-auto bg-light ps-2 pe-2 rounded-pill">40% of Total</div>
              <GroupControlButtons />
            </div>
            <ul className="wd-assignments list-group rounded-0 border-start border-success border-5">
              <li className="wd-assignment list-group-item p-3 ps-1 d-flex align-items-center">
                <BsGripVertical className="me-2 fs-3" />
                <LiaClipboardListSolid className="me-2 fs-3 text-success"/>
                <div className="d-flex flex-column align-content-center w-75">
                  <a className="wd-assignment-link text-decoration-none text-dark"
                    href="#/Kanbas/Courses/1234/Assignments/123">
                    A1 - ENV + HTML
                  </a>
                  <div className="fs-6"> <div className="d-inline text-danger">Multiple Modules</div> | <b>Not available until</b> May 6 as 12:00am | <b>Due</b> May 13 at 11:59pm | 100 pts</div>
                </div>
                <div className="ms-auto">
                  <AssignmentControlButtons /> 
                </div>
              </li>
              <li className="wd-assignment list-group-item p-3 ps-1 d-flex align-items-center">
                <BsGripVertical className="me-2 fs-3" />
                <LiaClipboardListSolid className="me-2 fs-3 text-success"/>
                <div className="d-flex flex-column align-content-center w-75">
                  <a className="wd-assignment-link text-decoration-none text-dark"
                    href="#/Kanbas/Courses/1234/Assignments/123">
                    A2 - CSS + BOOTSTRAP
                  </a>
                  <div className="fs-6"><div className="d-inline text-danger">Multiple Modules</div> | <b>Not available until</b> May 13 as 12:00am | <b>Due</b> May 20 at 11:59pm | 100 pts</div>
                </div>
                <div className="ms-auto">
                  <AssignmentControlButtons /> 
                </div>
              </li>
              <li className="wd-assignment list-group-item p-3 ps-1 d-flex align-items-center">
                <BsGripVertical className="me-2 fs-3" />
                <LiaClipboardListSolid className="me-2 fs-3 text-success"/>
                <div className="d-flex flex-column align-content-center w-75">
                  <a className="wd-assignment-link text-decoration-none text-dark"
                    href="#/Kanbas/Courses/1234/Assignments/123">
                    A3 - JAVASCRIPT + REACT
              </a>
                  <div className="fs-6"><div className="d-inline text-danger">Multiple Modules</div> | <b>Not available until</b> May 20 as 12:00am | <b>Due</b> May 27 at 11:59pm | 100 pts</div>
                </div>
                <div className="ms-auto">
                  <AssignmentControlButtons /> 
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
  );}
  