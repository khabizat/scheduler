import {useEffect, useState} from "react";
import axios from "axios";

//separation of concerns - logic for managing the state (data management)
export default function useApplicationData(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  //action can be used to set the current day
  const setDay = day => setState({ ...state, day });

  useEffect(() => {
   Promise.all([
    axios.get('/api/days'),
    axios.get('/api/appointments'),
    axios.get('/api/interviewers')
  ]).then((all) => {
    setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
  });
  }, []);

  const updateSpots = (state, appointments) => {

    return state.days.map((day)=> {
      let newSpots = 0;
      // get appointment id from day
      for (let appID of day.appointments) {
        // get appointment by ID
        if (appointments[appID].interview === null) {
          newSpots += 1;
        };
      }
      const newDay = {...day, spots: newSpots}
      return newDay;
    });
  };

  //makes an HTTP request and updates the local state
  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const newDays = updateSpots(state, appointments);
    return axios.put(`/api/appointments/${id}`, {interview})
    .then(() => {
      setState({...state, appointments, days: newDays});
    });
  };

  //makes an HTTP request and updates the local state
  const cancelInterview = id => {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const newDays = updateSpots(state, appointments)
    return axios.delete(`/api/appointments/${id}`)
    .then(() => {
      setState({...state, appointments, days: newDays});
    });
  };

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  }

}