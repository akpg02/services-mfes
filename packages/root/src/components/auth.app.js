import { mount } from 'auth/AuthApp';
import React, { useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default ({ onSignin }) => {
  const ref = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const onParentNavigateRef = useRef(null);

  useEffect(() => {
    const { onParentNavigate } = mount(ref.current, {
      initialPath: location.pathname,
      onNavigate: ({ pathname: nexPathname }) => {
        navigate(nexPathname);
      },
      onSignin,
    });
    onParentNavigateRef.current = onParentNavigate;
  }, []);

  useEffect(() => {
    if (onParentNavigateRef.current) {
      onParentNavigateRef.current({ pathname: location.pathname });
    }
  }, [location.pathname]);

  return <div ref={ref} />;
};
