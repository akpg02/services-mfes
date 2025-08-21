import React, { Suspense, lazy, useState } from 'react';
import { Routes, Route } from 'react-router-dom';

const AuthApp = lazy(() => import('auth/AuthApp'));
const AboutApp = lazy(() => import('about/AboutApp'));
const ChallengesApp = lazy(() => import('challenges/ChallengesApp'));
const ProjectsApp = lazy(() => import('projects/ProjectsApp'));
const MarketingApp = lazy(() => import('marketing/MarketingApp'));
const ContactApp = lazy(() => import('contact/ContactApp'));
const ShopApp = lazy(() => import('shop/ShopApp'));
const BlogApp = lazy(() => import('blog/BlogApp'));
const CalendarApp = lazy(() => import('calendar/CalendarApp'));

export default function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setIsSignedIn(false);
  };

  return (
    <>
      <Suspense fallback={<div>Loading root...</div>}>
        <Routes>
          <Route index element={<MarketingApp />} />
          <Route
            path="auth/*"
            element={
              <AuthApp
                onSignIn={() => setIsSignedIn(true)}
                isSignedIn={isSignedIn}
                handleLogout={handleLogout}
              />
            }
          />
          <Route path="about/*" element={<AboutApp />} />
          <Route path="challenges/*" element={<ChallengesApp />} />
          <Route path="projects/*" element={<ProjectsApp />} />
          <Route path="contact/*" element={<ContactApp />} />
          <Route path="shop/*" element={<ShopApp />} />
          <Route path="blog/*" element={<BlogApp />} />
          <Route path="calendar/*" element={<CalendarApp />} />
        </Routes>
      </Suspense>
    </>
  );
}
