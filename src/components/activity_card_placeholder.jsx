import React from 'react';
import { Card } from 'material-ui/Card';
import './activity_card_placeholder.css';

const animateIfNeeded= (shouldAnimate) =>
      (shouldAnimate ? "animated-background" : "");

const ActivityCardPlaceholder = (p) => (

  <Card style={{ height: '800px' }}>
    <div className="placeholder-wrapper">
      <div className="placeholder-crumbshot">
        <div className={animateIfNeeded(p.animate)}>
          <div className="background-masker crumbshot-top" />
        </div>
      </div>
      <div className="placeholder-recipe">
        <div className={animateIfNeeded(p.animate)}>

          {/* TODO: Dynamically generate these
            */}
          <div className="background-masker recipe-right-block" />
          <div className="background-masker recipe-right-end" />
          <div className="background-masker recipe-second-line" />
          <div className="background-masker recipe-second-end" />
          <div className="background-masker recipe-third-line" />
          <div className="background-masker recipe-third-end" />
          <div className="background-masker recipe-fourth-line" />
          <div className="background-masker recipe-fourth-end" />
          <div className="background-masker recipe-fifth-line" />
          <div className="background-masker recipe-fifth-end" />
        </div>
      </div>
    </div>
  </Card>
);

export default ActivityCardPlaceholder;
