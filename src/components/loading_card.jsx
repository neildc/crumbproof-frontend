import React from "react";
import { Card } from 'material-ui/Card';
import LinearProgress from 'material-ui/LinearProgress';

export default function LoadingCard(props) {
  return (
    <Card style={{...props.style, padding:"20px"}}>
      <LinearProgress mode="indeterminate" />
    </Card>
  )
}
