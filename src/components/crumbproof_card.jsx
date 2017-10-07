import React from "react";
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

export default function CP_Card(props) {
    return (
        <div>
            <CardTitle title={props.title} style={{backgroundColor:"#eee"}}/>
            <div style={{padding:"30px"}}>
                {props.children}
            </div>
        </div>
    );
}
