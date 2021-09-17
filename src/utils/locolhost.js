export default {
  setUser(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  },
  getUser(key) {
    return JSON.parse(localStorage.getItem(key));
  },
  removeUser(key) {
    localStorage.removeItem(key);
  },
};
