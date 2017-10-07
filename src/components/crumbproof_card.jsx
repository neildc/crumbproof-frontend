import React from "react";
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

export default function CP_Card(props) {
    return (
          <Card containerStyle={{marginBottom:"50px"}}>
            <CardTitle title={props.title} style={{backgroundColor:"#eee"}} children={props.titleChildren}/>
            <div style={{padding:"30px"}}>
                {props.children}
            </div>
        </Card>
    );
}
