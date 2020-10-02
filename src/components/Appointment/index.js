import React from "react";

import "components/Appointment/styles.scss";

import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";


import useVisualMode from "hooks/useVisualMode";

const classNames = require("classnames");
const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";

export default function Appointment(props) {

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  
  function save(name, interviewer) {
    transition(SAVING);
    const interview = {
      student: name,
      interviewer
    };
    props.bookInterview(props.id, interview)
    .then((response) => transition(SHOW));
  }

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === CREATE && (
        <Form
          onCancel={() => back()}
          interviewers={props.interviewers}
          onSave={save}
        />
      )}
      {mode === SAVING && <Status message={"Saving"}/>}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        />
      )}
    </article>
  );
}