import moment from "moment";

export const generateFileName = (fileName) => {
  const currentTime = moment().format();
  return `${currentTime}_${fileName}`;
};