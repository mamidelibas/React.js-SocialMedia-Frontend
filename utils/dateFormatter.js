import moment from "moment";

export const dateFormatter = (date) => {
  return moment(date).format("DD/MM/YYYY HH:mm");
};
