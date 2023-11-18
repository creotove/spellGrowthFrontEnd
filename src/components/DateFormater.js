// // const date = new Date();
// // const today = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
// const DateFormater = (date) => {
//   const formatDate = new Date(date);
//   console.log(formatDate);
//   const newDate = `${formatDate.getDate()}-${
//     formatDate.getMonth() + 1
//   }-${formatDate.getFullYear()}`;
//   console.log(newDate);
//   return newDate;
// };

function DateFormater(inputDate) {
  let date;

  if (inputDate) {
    date = new Date(inputDate);
  } else {
    // If no inputDate is provided, use the current date
    date = new Date();
  }

  // Extract UTC date components
  const day = String(date.getUTCDate()).padStart(2, '0');
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const year = date.getUTCFullYear();

  // Assemble the formatted date
  const formattedDate = `${day}-${month}-${year}`;

  return formattedDate;
}
export default DateFormater;
