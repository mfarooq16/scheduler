import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {


  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  const setDay = day => setState({ ...state, day });

  function spotsRemaining(count) {
    const day = state.days.find((d)=> d.name === state.day)
    day.spots += count;
    const dayID = day.id;
    const days = [...state.days]
    days[dayID] = day;
  }

  function bookInterview(id, interview) {
    console.log(id, interview);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
   /* setState({
      ...state,
      appointments
    });*/

    spotsRemaining(-1)
    return axios.put(`/api/appointments/${id}`, { interview })
    .then((response) => {
      setState({
        ...state,
        appointments
      });
    });   
  }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    spotsRemaining(1)
    return axios
      .delete(`http://localhost:8001/api/appointments/${id}`)
      .then(() => axios.get("http://localhost:8001/api/days"))
      .then((days) => 
        setState(state => ({...state, days: days.data, appointments
        })
      )
    );
  };

  useEffect (() => {
    Promise.all([
      axios.get("http://localhost:8001/api/days"),
      axios.get("http://localhost:8001/api/appointments"),
      axios.get("http://localhost:8001/api/interviewers")
    ]).then(
      (all) => {
        let [days, appointments, interviewers] = all;
        days = days.data;
        appointments = appointments.data;
        interviewers = interviewers.data;
        setState((prev) => ({ ...prev, days, appointments, interviewers }));
      }
    );
  }, []);
  //console.log(state.days)
  //console.log(state.appointments)
  //console.log(state.interviewers)

  return { state, setDay, bookInterview, cancelInterview };

}