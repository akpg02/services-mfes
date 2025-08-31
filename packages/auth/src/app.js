import React, { useState, useEffect } from 'react';
import { Routes, Route, Router } from 'react-router-dom';

import Signin from './components/signin.component';
import Signup from './components/signup.component';

export default ({ history, onSignin }) => {
  const [location, setLocation] = useState(history.location);

  useEffect(() => {
    const unlisten = history.listen((update) => setLocation(update.location));
    return unlisten;
  }, [history]);

  return (
    <>
      <Router location={location} navigator={history}>
        <Routes>
          <Route path="/auth/signin" element={<Signin onSignin={onSignin} />} />
          <Route path="/auth/signup" element={<Signup onSignin={onSignin} />} />
        </Routes>
      </Router>
    </>
  );
};
