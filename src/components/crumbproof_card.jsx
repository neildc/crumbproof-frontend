import React from "react";
import {Card,  CardTitle} from 'material-ui/Card';

export default function CPCard(props) {
    return (
          <Card containerStyle={{marginBottom:"50px"}}>
            <CardTitle title={props.title} style={{backgroundColor:"#eee"}} children={props.titleChildren}/>
            <div style={{padding:"30px"}}>
                {props.children}
            </div>
        </Card>
    );
}
