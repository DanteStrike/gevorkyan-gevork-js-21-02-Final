const addBodyClass = (className: string) => document.body.classList.add(className);
const removeBodyClass = (className: string) => document.body.classList.remove(className);

export default {
  addBodyClass,
  removeBodyClass,
};
