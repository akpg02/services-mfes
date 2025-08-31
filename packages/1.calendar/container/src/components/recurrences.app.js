import { mount } from 'calrecur/RecurrencesApp';
import React, { useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const BASENAME = '/recurrences';
const stripBase = (p) =>
  p.startsWith(BASENAME) ? p.slice(BASENAME.length) || '/' : p;
const addBase = (p) => (p === '/' ? BASENAME : `${BASENAME}${p}`);

export default () => {
  const ref = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const onParentNavigateRef = useRef(null);

  useEffect(() => {
    const { onParentNavigate } = mount(ref.current, {
      initialPath: stripBase(location.pathname),
      onNavigate: ({ pathname: nextInternal }) => {
        const nextExternal = addBase(nextInternal);
        if (nextExternal !== location.pathname) navigate(nextExternal);
      },
    });
    onParentNavigateRef.current = onParentNavigate;
  }, []);

  useEffect(() => {
    onParentNavigateRef.current?.({ pathname: stripBase(location.pathname) });
  }, [location.pathname]);

  return <div ref={ref} />;
};
