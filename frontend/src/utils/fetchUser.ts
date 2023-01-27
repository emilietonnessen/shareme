export const fetchUser = () => {
  const user = localStorage.getItem('user');

  const userInfo = !!user ? JSON.parse(user) : localStorage.clear();

  return userInfo;
};
