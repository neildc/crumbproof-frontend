import React from 'react';
import { Motion, spring } from 'react-motion';

// eslint-disable-next-line import/prefer-default-export
export function FadeIn(props) {
  return (
    <Motion
      defaultStyle={{ opacity: 0 }}
      style={{ opacity: spring(1, { stiffness: 100, damping: 14 }) }}
    >
      {iStyle => (
        <div style={{ ...iStyle, ...props.style }}>
          {props.children}
        </div>
      )}
    </Motion>
  );
}
