import React from "react";
import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";
import useApplicationData from "hooks/useApplicationData";

//separation of concerns - logic for passing data to other components
export default function Application(props) {

  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();

  //generate the Appointment components
  const schedule = getAppointmentsForDay(state, state.day).map(appointment => {
    return (
      <Appointment 
        key={appointment.id}
        {...appointment} //spread the object into the props definition
        interview={getInterview(state, appointment.interview)}
        interviewers={getInterviewersForDay(state, state.day)}
        bookInterview = {bookInterview}
        cancelInterview = {cancelInterview}
      />
    );
  });

  return (
    <main className="layout">
      <section className="sidebar">
        <img 
          className="sidebar--centered" 
          src="images/logo.png" 
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            value={state.day}
            onChange={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {schedule}
        <Appointment 
          key="last"
          time="5pm"
        />
      </section>
    </main>
  );
}
