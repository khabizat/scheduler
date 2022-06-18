export function getAppointmentsForDay(state, day) {
//returns an array
//returns an array with a length matching the number of appointments for that day
//returns an array containing the correct appointment objects
//returns an empty array when the days data is empty
//returns an empty array when the day is not found

  const filteredDays = [];
  const appointmentsForDay = state.days.filter(currentDay=>currentDay.name===day)

  if (!appointmentsForDay[0]){
    return filteredDays;
  }
  
  for (const appointment of appointmentsForDay[0].appointments) {
    filteredDays.push(state.appointments[appointment]);
  }
  return filteredDays;
}


