export const formatDate = (date) => {
   const newDate = new Date(date);
   console.log({ newDate });
   return `${newDate.getDay()}/${newDate.getMonth()}/${newDate.getFullYear()} - ${newDate.getHours()}:${newDate.getMinutes()}`;
};
