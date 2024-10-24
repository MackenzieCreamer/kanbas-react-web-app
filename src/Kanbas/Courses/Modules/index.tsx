import React, { useState } from "react";
import { BsGripVertical } from "react-icons/bs";
import LessonControlButtons from "./LessonControlButtons";
import ModuleControlButtons from "./ModuleControlButtons";
import ModulesControls from "./ModulesControls";
import { useParams } from "react-router";
import * as db from "../../Database";
import { addModule, editModule, updateModule, deleteModule }
  from "./reducer";
import { useSelector, useDispatch } from "react-redux";
import { BiCaretDown } from "react-icons/bi";

export default function Modules() {
  const { cid } = useParams();
  // const [modules, setModules] = useState<any[]>(db.modules);
  const [moduleName, setModuleName] = useState("");
  const { modules } = useSelector((state: any) => state.modulesReducer);
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: any) => state.accountReducer);


  return (
    <div>
      <ModulesControls setModuleName={setModuleName} moduleName={moduleName} addModule={() => {
          dispatch(addModule({ name: moduleName, course: cid }));
          setModuleName("");
        }}/><br /><br /><br /><br />
      <ul id="wd-modules" className="list-group rounded-0">
        {modules
          .filter((module: any) => module.course === cid)
          .map((module: any) => (
          <li className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
            <div className="wd-title p-3 ps-2 bg-secondary">
            {currentUser.role === "FACULTY" && (<div>
              <BsGripVertical className="me-2 fs-3" />
              {!module.editing && module.name}
            { module.editing && (
              <input className="form-control w-50 d-inline-block"
                    onChange={(e) =>                       
                    dispatch(
                      updateModule({ ...module, name: e.target.value })
                    )}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        dispatch(updateModule({ ...module, editing: false }));
                      }
                    }}
                    defaultValue={module.name}/>
            )}
            <ModuleControlButtons
              moduleId={module._id}
              deleteModule={(moduleId) => {
                dispatch(deleteModule(moduleId));
              }}
              editModule={(moduleId) => dispatch(editModule(moduleId))}/>
            </div>
            )}
            {currentUser.role !== "FACULTY" && (<div>
              <BiCaretDown className="me-2 fs-3" />
              {!module.editing && module.name}
            </div>)}
            </div>
            {module.lessons && (
              <ul className="wd-lessons list-group rounded-0">
                {module.lessons.map((lesson: any) => (
                  <li className="wd-lesson list-group-item p-3 ps-1">
                    {currentUser.role === "FACULTY" && (<div>
                      <BsGripVertical className="me-2 fs-3" />
                      {lesson.name}
                      <LessonControlButtons />
                    </div>)}
                    {currentUser.role !== "FACULTY" && (<div>
                      {lesson.name}
                    </div>)}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
);}
  