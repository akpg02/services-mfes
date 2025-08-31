import React, { lazy, Suspense } from 'react';
import { Router, Route, Routes } from 'react-router-dom';

const MarketingLazy = lazy(() => import('./components/marketing.app'));
const AdminLazy = lazy(() => import('./components/admin.app'));
const AnalyticsLazy = lazy(() => import('./components/analytics.app'));
const AvailabilityLazy = lazy(() => import('./components/availability.app'));
const CollaborationLazy = lazy(() => import('./components/collaboration.app'));
const EventsLazy = lazy(() => import('./components/events.app'));
const IntegrationsLazy = lazy(() => import('./components/integrates.app'));
const InvitationsLazy = lazy(() => import('./components/invites.app'));
const NotificationsLazy = lazy(() => import('./components/notifications.app'));
const RecurrencesLazy = lazy(() => import('./components/recurrences.app'));
const SearchLazy = lazy(() => import('./components/search.app'));
const SettingsLazy = lazy(() => import('./components/settings.app'));
const ViewsLazy = lazy(() => import('./components/views.app'));

export default function ({ history }) {
  return (
    <Router location={history.location} navigator={history}>
      <Suspense fallback={<div>Loading…</div>}>
        <Routes>
          <Route index element={<MarketingLazy />} />
          <Route path="admin/*" element={<AdminLazy />} />
          <Route path="analytics/*" element={<AnalyticsLazy />} />
          <Route path="availability/*" element={<AvailabilityLazy />} />
          <Route path="collaborations/*" element={<CollaborationLazy />} />
          <Route path="events/*" element={<EventsLazy />} />
          <Route path="integrations/*" element={<IntegrationsLazy />} />
          <Route path="invitations/*" element={<InvitationsLazy />} />
          <Route path="notifications/*" element={<NotificationsLazy />} />
          <Route path="recurrences/*" element={<RecurrencesLazy />} />
          <Route path="searches/*" element={<SearchLazy />} />
          <Route path="settings/*" element={<SettingsLazy />} />
          <Route path="views/*" element={<ViewsLazy />} />
          <Route path="*" element={<div>Not Found</div>} />
        </Routes>
      </Suspense>
    </Router>
  );
}
