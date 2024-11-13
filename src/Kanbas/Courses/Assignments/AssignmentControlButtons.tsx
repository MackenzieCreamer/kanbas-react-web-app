import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "./GreenCheckmark";
import AssignmentDeleter from "./AssignmentRemovalPrompt";
export default function AssignmentControlButtons({assignmentId,setAssignmentId,deleteAssignment,assignmentTitle, titleState, setAssignmentTitle}:
          {assignmentId:string;setAssignmentId: (_id: string) => void;deleteAssignment:(assignmentId: string) => void;assignmentTitle:string;titleState:string,setAssignmentTitle:(title:string)=>void;}) {
  return (
    <div className="float-end">
      <GreenCheckmark />
      <IoEllipsisVertical className="fs-4" />
      <button data-bs-toggle="modal" data-bs-target="#wd-delete-assignment-dialog" 
      id="wd-delete-assignment-btn" className="btn btn-lg btn-danger me-1 float-end" onClick={() => {setAssignmentId(assignmentId);setAssignmentTitle(assignmentTitle);}}>Delete</button>
      <AssignmentDeleter dialogTitle="Delete Assignment" dialogDescription={"Are you sure you want to delete \"" + titleState + "\"?"}
                    assignmentId={assignmentId} deleteAssignment={deleteAssignment} setAssignmentId={setAssignmentId}/>
    </div>
);}
