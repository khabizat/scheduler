import React, { Fragment } from 'react';
import "./styles.scss"; 
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from './Form';
import Status from './Status';
import Confirm from './Confirm';
import useVisualMode from 'hooks/useVisualMode';


function Appointment(props){
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );  
  
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props.bookInterview(props.id, interview)
    .then(()=> transition(SHOW));
  }

  //delete an interview with confirmation dialog
  function remove() {
    if (mode !== CONFIRM) {
      transition(CONFIRM);
    } else {
    transition(DELETING)
    props.cancelInterview(props.id)
    .then(()=>transition(EMPTY));
    }
  }

  return (  
    <article className="appointment">
      <Header time={props.time}/>
      {mode === EMPTY && 
        <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && props.interview && 
        <Show
          id = {props.id}
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete = {remove}
          onEdit = {()=>transition(EDIT)}
        />
      }
      {mode === CREATE && 
        <Form
          value = {props.value}
          name = {props.name}
          interviewers = {props.interviewers}
          onCancel = {back}
          onSave = {save}
        />
      }
      {mode === SAVING &&
        <Status message="Saving"/>
      }
      {mode === DELETING &&
        <Status message="Deleting"/>
      }
      {mode === CONFIRM &&
        <Confirm
          message="Are you sure you would like to cancel"
          onCancel = {back}
          onConfirm = {remove}
        />
      }
      {mode === EDIT &&
        <Form
          student = {props.interview.student}
          interviewer = {props.interview.interviewer.id}
          interviewers = {props.interviewers}
          onCancel = {back}
          onSave = {save}
        />
      }
    </article>
  );
}

export default Appointment;