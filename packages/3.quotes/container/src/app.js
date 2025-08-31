import React, { lazy, Suspense } from 'react';
import { Router, Route, Routes } from 'react-router-dom';

const MarketingLazy = lazy(() => import('./components/marketing.app'));
const AuthorsLazy = lazy(() => import('./components/authors.app'));
const DashboardLazy = lazy(() => import('./components/dashboard.app'));
const SearchLazy = lazy(() => import('./components/search.app'));

export default function ({ history }) {
  return (
    <Router location={history.location} navigator={history}>
      <Suspense fallback={<div>Loading…</div>}>
        <Routes>
          <Route index element={<MarketingLazy />} />
          <Route path="authors/*" element={<AuthorsLazy />} />
          <Route path="dashboard/*" element={<DashboardLazy />} />
          <Route path="search/*" element={<SearchLazy />} />
          <Route path="*" element={<div>Not Found</div>} />
        </Routes>
      </Suspense>
    </Router>
  );
}
