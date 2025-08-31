import React, { useState, useEffect } from 'react';
import { Routes, Route, Router } from 'react-router-dom';

import Landing from './components/landing.component';

export default ({ history }) => {
  const [location, setLocation] = useState(history.location);

  useEffect(() => {
    const unlisten = history.listen((update) => setLocation(update.location));
    return unlisten;
  }, [history]);
  return (
    <>
      <Router location={location} navigator={history}>
        <Routes>
          <Route path="/about" element=<Landing /> />
        </Routes>
      </Router>
    </>
  );
};
