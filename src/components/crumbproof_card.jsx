import React from 'react';
import { Card, CardTitle } from 'material-ui/Card';
import { FadeIn } from './animations/fade';

export default function CPCard(props) {
  return (
    <FadeIn>
      <Card containerStyle={{ marginBottom: '50px' }}>
        <CardTitle
          title={props.title}
          style={{ backgroundColor: '#eee' }}
        >
          {props.titleChildren}
        </CardTitle>

        <div style={{ padding: '30px' }}>
          {props.children}
        </div>
      </Card>
    </FadeIn>
  );
}
