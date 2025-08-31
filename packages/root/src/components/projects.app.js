import { mount } from 'projects/ProjectsApp';
import React, { useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default () => {
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
