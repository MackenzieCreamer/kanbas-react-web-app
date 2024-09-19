export default function AssignmentEditor() {
    return (
      <div id="wd-assignments-editor">
        <label htmlFor="wd-name">Assignment Name</label>
        <input id="wd-name" value="A1 - ENV + HTML" /><br /><br />
        <textarea id="wd-description">
          The assignment is available online Submit a link to the landing page of
        </textarea>
        <br />
        <table>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-points">Points</label>
            </td>
            <td>
              <input id="wd-points" value={100} />
            </td>
          </tr>
          <br/>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-group">Assignment Group</label>
            </td>
            <td>
              <select id="wd-group">
                <option selected value="ASSIGNMENTS">ASSIGNMENTS</option>
                <option value="QUIZZES">QUIZZES</option>
                <option value="EXAMS"> EXAMS</option>
                <option value="PROJECT">PROJECT</option>
              </select>
            </td>
          </tr>
          <br/>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-display-grade-as">Display Grade as</label>
            </td>
            <td>
              <select id="wd-display-grade-as" >
                <option value="HIDE">Hide</option>
                <option value="POINTS">Points</option>
                <option selected value="PERCENTAGE">
                    Percentage</option>
                <option value="LETTER">Letter</option>
              </select>
            </td>
          </tr>
          <br/>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-submission-type">Submission Type</label>
            </td>
            <td>
              <select id="wd-submission-type" >
                <option value="HYBRID">Hybrid</option>
                <option value="PERSON">In Person</option>
                <option selected value="ONLINE">
                    Online</option>
                <option value="NONE">None</option>
              </select>
            </td>
          </tr>
          <br/>
          <tr>
            <td>
            </td>
            <td>
              <label>Online Entry Options</label><br/>

              <input type="checkbox" name="check-entry" id="wd-text-entry"/>
              <label htmlFor="wd-text-entry">Text Entry</label><br/>

              <input type="checkbox" name="check-entry" id="wd-website-url"/>
              <label htmlFor="wd-website-url">Website URL</label><br/>

              <input type="checkbox" name="check-entry" id="wd-media-recordings"/>
              <label htmlFor="wd-media-recordings">Media Recordings</label><br/>

              <input type="checkbox" name="check-entry" id="wd-student-annotation"/>
              <label htmlFor="wd-student-annotation">Student Annotation</label><br/>

              <input type="checkbox" name="check-entry" id="wd-file-upload"/>
              <label htmlFor="wd-file-upload">File Uploads</label>
            </td>
          </tr>
          <br/>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-assign-to">Assign</label>
            </td>
            <td>
            <label htmlFor="wd-text-fields-first-name">First name:</label>
              Assign to<br/>
              <input type="text" id="wd-assign-to" placeholder="Everyone" />
            </td>
          </tr>
          <br/>
          <tr>
            <td>
            </td>
            <td>
              <label htmlFor="wd-due-date">Due</label><br/>
              <input id="wd-due-date" type="date"
                    placeholder="MM/DD/YYYY"/>
            </td>
          </tr>
          <br/>
          <tr>
            <td>
            </td>
            <td>
              <label htmlFor="wd-available-from">Available from</label><br/>
              <input id="wd-available-from" type="date"
                    placeholder="MM/DD/YYYY"/>
            </td>
            <td>
              <label htmlFor="wd-available-until">Until</label><br/>
              <input id="wd-available-until" type="date"
                    placeholder="MM/DD/YYYY"/>
            </td>
          </tr>
          <tr>
            <td colSpan={3}>
              <hr/>
            </td>
          </tr>
          <tr>
            <td>
            </td>
            <td>
            </td>
            <td align="right" valign="top">
            <button id="wd-cancel" type="button"> Cancel </button> 
            <button id="wd-save" type="button"> Save </button>
            </td>
          </tr>
        </table>
      </div>
  );}
  