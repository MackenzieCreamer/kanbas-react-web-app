import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "./GreenCheckmark";
import AssignmentDeleter from "./AssignmentRemovalPrompt";
export default function AssignmentControlButtons({deleteAssignment}:{deleteAssignment:(assignmentId: string) => void}) {
  return (
    <div className="float-end">
      <GreenCheckmark />
      <IoEllipsisVertical className="fs-4" />
      <button data-bs-toggle="modal" data-bs-target="#wd-delete-assignment-dialog" 
      id="wd-delete-assignment-btn" className="btn btn-lg btn-danger me-1 float-end">Delete</button>
      <AssignmentDeleter dialogTitle="Delete Module" dialogDescription="Are you sure you want to delete this assignment?"
                    deleteAssignment={deleteAssignment} />
    </div>
);}
