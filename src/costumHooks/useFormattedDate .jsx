import { useCallback } from "react";
import moment from "moment";

const useFormattedDate = () => {
  const formatDate = useCallback((date) => {
    const now = moment();
    const messageDate = moment(date);

    if (now.diff(messageDate, "days") === 0) {
      return messageDate.format("h:mm A");
    } else if (now.diff(messageDate, "days") === 1) {
      return "Yesterday";
    } else if (now.diff(messageDate, "weeks") < 1) {
      return messageDate.format("dddd");
    } else {
      return messageDate.format("MMM D, YYYY");
    }
  }, []);

  return formatDate;
};

export default useFormattedDate;
