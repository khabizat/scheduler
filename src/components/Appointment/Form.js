import React, {useState} from "react";
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";

function Form(props) {

  const {onCancel, onSave, interviewers} = props;

  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");
  

  function reset() {
    setStudent("");
    setError("");
    setInterviewer(null);
  }

  function cancel() {
    reset();
    onCancel();
  }

  //validates user input
  function validate() {
    if (student === "") {
      setError("Student name cannot be blank");
      return;
    }
    if (interviewer === null) {
      setError("Please select an interviewer");
      return;
    }
    setError("");
    onSave(student, interviewer);
  }
  
  
  return(
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            value={student}
            name="student name"
            onChange={(event) => setStudent(event.target.value)}
            type="text"
            placeholder="Enter Student Name"
            data-testid = "student-name-input"
          />
        </form>
        <section className="appointment__validation">{error}</section>
        <InterviewerList
          interviewers = {interviewers}
          value={interviewer}
          onChange={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onClick={validate}>Save</Button>
        </section>
       </section>
    </main>
  );
}

export default Form;