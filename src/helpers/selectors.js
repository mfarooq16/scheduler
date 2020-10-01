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