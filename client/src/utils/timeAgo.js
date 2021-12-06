import moment from "moment";

export const timeAgo = (rawDate) => {
  if (rawDate) {
    return moment(String(rawDate)).fromNow();
  }
};

export const timeString = (rawDate) => {
  if (rawDate) {
    return moment(String(rawDate)).format("MM/DD/YYYY hh:mm");
  }
}