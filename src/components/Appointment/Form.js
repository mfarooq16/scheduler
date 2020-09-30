import React, { useState } from "react";

import "components/Appointment/styles.scss";

import InterviewerList from "components/InterviewerList";
import Button from "components/Button";

//const classNames = require("classnames");

export default function Form(props) {
  const [text, setText] = useState("");

  return (


    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={(event) => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name={props.name}
            type="text"
            placeholder="Enter Student Name"
            value={props.name ? props.name : text}
            onChange={(event) => setText(event.target.value)}
            /*
              This must be a controlled component
            */
          />
        </form>
        <InterviewerList
          interviewers={props.interviewers}
          interviewer={props.interviewer}
          setInterviewer={props.setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={props.onCancel}>Cancel</Button>
          <Button confirm onClick={props.onSave}>Save</Button>
        </section>
      </section>
    </main>
  )
}