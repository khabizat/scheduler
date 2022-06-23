export function getAppointmentsForDay(state, day) {
/*returns an array
  returns an array with a length matching the number of appointments for that day
  returns an array containing the correct appointment objects
  returns an empty array when the days data is empty
  returns an empty array when the day is not found */

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

export function getInterview(state, interview) {
//returns an object that contains the interview data if it is passed an object that contains an interviewer
  
  if (!interview){
    return null;
  }
  const interviewData = state.interviewers[interview.interviewer];
  const interviewObj = {
    student: interview.student,
    interviewer: interviewData
  }
  return interviewObj;
}

export function getInterviewersForDay(state, day) {
/*returns an array
  returns an array with a length matching the number of interviewers for that day
  returns an array containing the correct interviewers objects
  returns an empty array when the days data is empty
  returns an empty array when the day is not found */

  const filteredDays = [];
  const appointmentsForDay = state.days.filter(currentDay=>currentDay.name===day)
    if (!appointmentsForDay[0]){
      return filteredDays;
    }
    for (const appointment of appointmentsForDay[0].interviewers) {
      filteredDays.push(state.interviewers[appointment]);
    }
    return filteredDays;
}