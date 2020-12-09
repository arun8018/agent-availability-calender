import moment from "moment";
export const withAvailableTimeValidator = (addedTime, availabilityHours, date) => {
  let time = {
    from: date + "T" + addedTime.from,
    to: date + "T" + addedTime.to,
  };

  for (let i = 0; availabilityHours.length > i; i++) {
    if (
      moment(time.from).isBetween(
        moment(availabilityHours[i].availableFrom),
        moment(availabilityHours[i].availableTo)
      ) ||
      moment(time.to).isBetween(
        moment(availabilityHours[i].availableFrom),
        moment(availabilityHours[i].availableTo)
      )
    ) {
      return false
    } else {
      return true;
    }
  }

 
};

export const withNewTimeValidator = (addedTime,date) => {
  let time = {
    from: date + "T" + addedTime.from,
    to: date + "T" + addedTime.to,
  };
   if (moment(time.from).isBefore(moment(time.to))) {
     return true;
   } else {
     return false;
   }
}