import moment from 'moment'

export default (date) => {
  return moment(date).format("ddd, MMM Do YYYY, hh:mm:ss A");
}
