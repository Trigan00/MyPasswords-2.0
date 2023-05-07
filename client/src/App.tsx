import React, { useEffect } from 'react';
import AppRouter from './components/AppRouter';
import { useTypedSelector } from './store/hooks/useTypedSelector';
import MyAlert from './UI/MyAlert';
// import { localStorageName } from './http';
// import { useTypedDispatch } from './store/hooks/useTypedDispatch';
// import { checkAuth } from './store/slices/user/user.action';

const App: React.FC = () => {
  const myAlert = useTypedSelector((state) => state.alert);
  // const dispatch = useTypedDispatch();

  useEffect(() => {
    // if (JSON.parse(localStorage.getItem(localStorageName) as string).token) {
    //   dispatch(checkAuth());
    // }
    // const cook = Cookies.get('name');
    // console.log(cook);
  }, []);

  return (
    <>
      <AppRouter />
      <MyAlert
        message={myAlert.message}
        open={myAlert.isOpen}
        severity={myAlert.severity}
        duration={myAlert.duration}
      />
    </>
  );
};

export default App;
