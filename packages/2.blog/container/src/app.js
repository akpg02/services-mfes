import React, { lazy, Suspense } from 'react';
import { Router, Route, Routes } from 'react-router-dom';

const MarketingLazy = lazy(() => import('./components/marketing.app'));
const AuthorsLazy = lazy(() => import('./components/authors.app'));
const DashboardLazy = lazy(() => import('./components/dashboard.app'));
const PostsLazy = lazy(() => import('./components/posts.app'));
const CommentsLazy = lazy(() => import('./components/comments.app'));
const NewslettersLazy = lazy(() => import('./components/newsletters.app'));
const RelatedLazy = lazy(() => import('./components/related.app'));
const SearchLazy = lazy(() => import('./components/search.app'));
const SocialLazy = lazy(() => import('./components/social.app'));

export default function ({ history }) {
  return (
    <Router location={history.location} navigator={history}>
      <Suspense fallback={<div>Loading…</div>}>
        <Routes>
          <Route index element={<MarketingLazy />} />
          <Route path="authors/*" element={<AuthorsLazy />} />
          <Route path="dashboard/*" element={<DashboardLazy />} />
          <Route path="posts/*" element={<PostsLazy />} />
          <Route path="comments/*" element={<CommentsLazy />} />
          <Route path="newsletters/*" element={<NewslettersLazy />} />
          <Route path="related/*" element={<RelatedLazy />} />
          <Route path="search/*" element={<SearchLazy />} />
          <Route path="social/*" element={<SocialLazy />} />
          <Route path="*" element={<div>Not Found</div>} />
        </Routes>
      </Suspense>
    </Router>
  );
}
