import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchActivities } from "../actions";
import {List} from 'material-ui/List';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import CP_Card from './crumbproof_card.jsx';
import {GridList, GridTile} from 'material-ui/GridList';


class ActivityIndex extends Component {
  componentDidMount() {
    this.props.fetchActivities();
  }

  renderActivityTiles() {

    return _.map(this.props.activities, activity => {

      return (
        <GridTile
          key={activity.id}
          title={activity.name}
          subtitle={<span>by <b>{activity.user_id}</b></span>}
          containerElement={
            <Link to={`/activity/${activity.id}`} />
          }
        >
          <img src={activity.crumb_shot} alt="" />
        </GridTile>
      );
    });
  }

  render() {

    const styles = {
      root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
      },
      gridList: {
        width: 500,
        height: 450,
        overflowY: 'auto',
      },
    };

    return (
        <CP_Card title="Activities">
            <List>
            </List>
            <GridList
                  cellHeight={180}
                  style={styles.gridList}
                >
                  {this.renderActivityTiles()}
                </GridList>
            <div style={{float:"right"}}>
                <FloatingActionButton containerElement={<Link to="/activity/new"/>}>
                    <ContentAdd/>
                </FloatingActionButton>
            </div>
        </CP_Card>
    );
  }
}

function mapStateToProps(state) {
  return { activities: state.activities };
}

export default connect(mapStateToProps, { fetchActivities })(ActivityIndex);
