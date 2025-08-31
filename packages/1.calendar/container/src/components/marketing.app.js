import { mount } from 'calMarketing/MarketingApp';
import React, { useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function () {
  const ref = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const onParentNavigateRef = useRef(null);
  const mountedRef = useRef(false);

  useEffect(() => {
    if (mountedRef.current) return;
    mountedRef.current = true;

    const { onParentNavigate } = mount(ref.current, {
      initialPath: location.pathname,
      onNavigate: ({ pathname }) => {
        if (pathname !== location.pathname) navigate(pathname);
      },
    });
    onParentNavigateRef.current = onParentNavigate;
  }, []);

  useEffect(() => {
    onParentNavigateRef.current?.({ pathname: location.pathname });
  }, [location.pathname]);

  return <div ref={ref} />;
}
