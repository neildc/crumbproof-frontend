import React from "react";
import { Motion, spring, presets } from "react-motion";

export function SlideInBottom(props) {
  return(
    <Motion defaultStyle={{y: 1000 }}
            style={{y: spring(0,presets.gentle)}}>

        {iStyle => (
          <div style={{transform: `translate(0,${iStyle.y}px)`, ...props.style}}>
            {props.children}
          </div>
        )}
    </Motion>
  );
}

export function SlideInRight(props) {
  return(
    <Motion defaultStyle={{x: 1000 }}
            style={{x: spring(0,presets.gentle)}}>

        {iStyle => (
          <div style={{transform: `translate(${iStyle.x}px)`, ...props.style}}>
            {props.children}
          </div>
        )}
    </Motion>
  );
}
