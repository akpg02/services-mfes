import React, { lazy, Suspense, useState } from 'react';
import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
  useNavigate,
} from 'react-router-dom';

const AuthLazy = lazy(() => import('./components/auth.app'));
const MarketingLazy = lazy(() => import('./components/marketing.app'));
const AboutLazy = lazy(() => import('./components/about.app'));
const ChallengesLazy = lazy(() => import('./components/challenges.app'));
const ContactLazy = lazy(() => import('./components/contact.app'));
const ProjectsLazy = lazy(() => import('./components/projects.app'));
const ShopLazy = lazy(() => import('./components/shop.app'));
const CalendarLazy = lazy(() => import('./components/calendar.app'));
const BlogLazy = lazy(() => import('./components/blog.app'));
const QuotesLazy = lazy(() => import('./components/quotes.app'));

const App = () => {
  const [isSignedIn, setisSignedIn] = useState(false);
  const navigate = useNavigate();

  const handleSignin = () => {
    setisSignedIn(true);
    navigate('/');
  };

  return (
    <>
      <Suspense fallback={<div>Loading....</div>}>
        <Routes>
          <Route
            path="/auth/*"
            element={<AuthLazy onSignin={handleSignin} />}
          />
          <Route path="/about/*" element={<AboutLazy />} />
          <Route path="/challenges/*" element={<ChallengesLazy />} />
          <Route path="/contact/*" element={<ContactLazy />} />
          <Route path="/projects/*" element={<ProjectsLazy />} />
          <Route path="/shop/*" element={<ShopLazy />} />
          <Route path="/calendars/*" element={<CalendarLazy />} />
          <Route path="/blogs/*" element={<BlogLazy />} />
          <Route path="/quotes/*" element={<QuotesLazy />} />
          <Route path="/*" element={<MarketingLazy />} />
          <Route path="*" element={<div>Page not found at root</div>} />
        </Routes>
      </Suspense>
    </>
  );
};

export default () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
