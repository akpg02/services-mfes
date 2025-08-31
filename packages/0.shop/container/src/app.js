import React, { lazy, Suspense } from 'react';
import { Router, Route, Routes } from 'react-router-dom';

const MarketingLazy = lazy(() => import('./components/marketing.app'));
const ProductsLazy = lazy(() => import('./components/products.app'));
const CartsLazy = lazy(() => import('./components/carts.app'));
const ChatsLazy = lazy(() => import('./components/chats.app'));
const CheckoutLazy = lazy(() => import('./components/checkout.app'));
const DashboardLazy = lazy(() => import('./components/dashboard.app'));
const OrdersLazy = lazy(() => import('./components/orders.app'));
const PaymentsLazy = lazy(() => import('./components/payments.app'));
const ReviewsLazy = lazy(() => import('./components/reviews.app.js'));
const SearchLazy = lazy(() => import('./components/search.app.js'));
const WishlistsLazy = lazy(() => import('./components/wishlists.app.js'));
const RecommendationsLazy = lazy(() =>
  import('./components/recommendations.app.js')
);

export default function ShopApp({ history }) {
  return (
    <Router location={history.location} navigator={history}>
      <Suspense fallback={<div>Loading…</div>}>
        <Routes>
          <Route index element={<MarketingLazy />} />
          <Route path="products/*" element={<ProductsLazy />} />
          <Route path="carts/*" element={<CartsLazy />} />
          <Route path="chats/*" element={<ChatsLazy />} />
          <Route path="checkout/*" element={<CheckoutLazy />} />
          <Route path="dashboard/*" element={<DashboardLazy />} />
          <Route path="orders/*" element={<OrdersLazy />} />
          <Route path="payments/*" element={<PaymentsLazy />} />
          <Route path="recommendations/*" element={<RecommendationsLazy />} />
          <Route path="reviews/*" element={<ReviewsLazy />} />
          <Route path="search/*" element={<SearchLazy />} />
          <Route path="wishlists/*" element={<WishlistsLazy />} />
          <Route path="*" element={<div>Not Found</div>} />
        </Routes>
      </Suspense>
    </Router>
  );
}
