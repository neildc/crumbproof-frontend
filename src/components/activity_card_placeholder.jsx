import React from 'react';
import { Card } from 'material-ui/Card';
import './activity_card_placeholder.css';

const ActivityCardPlaceholder = () => (
  <Card style={{ height: '800px' }}>
    <div className="placeholder-wrapper">
      <div className="placeholder-crumbshot">
        <div className="animated-background">
          <div className="background-masker crumbshot-top" />
        </div>
      </div>
      <div className="placeholder-recipe">
        <div className="animated-background">

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
