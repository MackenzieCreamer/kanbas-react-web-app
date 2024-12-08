export default function QuizDeleter({ dialogTitle, dialogDescription, deleteQuiz,quizId, setQuizId }:
    { dialogTitle: string; dialogDescription: string, deleteQuiz: (quizId: string) => void; quizId:string;setQuizId:(_id:string) => void;}) {
      return (
        <div id="wd-delete-quiz-dialog" className="modal fade" data-bs-backdrop="static" data-bs-keyboard="false">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                  <h1 className="modal-title fs-5" id="staticBackdropLabel">
                    {dialogTitle} </h1>
                  <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
              </div>
              <div className="modal-body">
                {dialogDescription}
              </div>
              <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                    Cancel </button>
                  <button onClick={() => {deleteQuiz(quizId); setQuizId("");}} type="button" data-bs-dismiss="modal" className="btn btn-danger">
                    Delete </button>
              </div>
            </div>
          </div>
        </div>
      );
    }