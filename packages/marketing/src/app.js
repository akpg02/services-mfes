import React, { useState, useEffect } from 'react';
import { Routes, Route, Router } from 'react-router-dom';

import Landing from './components/landing.component';

export default function MarketingApp({ history }) {
  const [location, setLocation] = useState(history.location);
  useEffect(
    () => history.listen(({ location }) => setLocation(location)),
    [history]
  );

  return (
    <Router location={location} navigator={history}>
      <Routes>
        <Route index element={<Landing />} />
        <Route path="*" element={<div>Page not found</div>} />
      </Routes>
    </Router>
  );
}
