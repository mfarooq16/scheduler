export function getAppointmentsForDay(state, day) {
  let filteredData = [];
  let list = [];

  filteredData = state.days.filter(item => item.name === day)

  if (filteredData.length > 0) {
    for (let appointment of filteredData[0].appointments) {
      list.push(state.appointments[appointment]);
    }
  }
  return list;
};

export function getInterview(state, interview) {
  if (interview) {
    const interviewObject = {
      student: interview.student,
      interviewer: {
        id: state.interviewers[interview.interviewer].id,
        name: state.interviewers[interview.interviewer].name,
        avatar: state.interviewers[interview.interviewer].avatar,
      },
    };
    return interviewObject;
  }
  return null;
}
