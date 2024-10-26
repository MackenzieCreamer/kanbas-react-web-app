export default function AssignmentDeleter({ dialogTitle, dialogDescription, deleteAssignment }:
    { dialogTitle: string; dialogDescription: string, deleteAssignment: (assignmentId: string) => void;}) {
      return (
        <div id="wd-delete-assignment-dialog" className="modal fade" data-bs-backdrop="static" data-bs-keyboard="false">
          <div className="modal-dialog">
            <div className="modal-content">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                  Cancel </button>
                <button onClick={(e) => {console.log(deleteAssignment); return deleteAssignment}} type="button" data-bs-dismiss="modal" className="btn btn-danger">
                  Add Module </button>
            </div>
          </div>
        </div>
      );
    }