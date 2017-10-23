import "./recipes_show.css";
import React, { Component } from "react";
import _ from "lodash";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchRecipe, deleteRecipe } from "../actions/actions_recipe";
import LinearProgress from 'material-ui/LinearProgress';
import RaisedButton from 'material-ui/RaisedButton';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import AddIcon from 'material-ui/svg-icons/content/add-circle';
import IconButton from 'material-ui/IconButton';
import BackIcon from 'material-ui/svg-icons/navigation/arrow-back';
import { Card, CardTitle } from 'material-ui/Card';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import RecipeTimeline from './recipe_timeline';


class RecipesShow extends Component {

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchRecipe(id);
  }

  onDeleteClick() {
    const { id } = this.props.match.params;

    this.props.deleteRecipe(id, () => {
      this.props.history.push("/");
    });
  }

  onRecordActivityClick() {
    const { id } = this.props.match.params;
    this.props.history.push(`/activity/new/recipe/${id}`);
  }

  renderIngredients() {
    return _.map(this.props.recipe.ingredients, i => {
      return (
        <li key={i.name}>
          {i.quantity} {i.unit} {i.name}
        </li>
      );
    });
  };


  render() {
    const { recipe } = this.props;

    if (!recipe) {
      return <LinearProgress mode="indeterminate" />;
    }

    return (

      <Card containerStyle={{marginBottom:"50px"}}>
        <CardTitle className="cardTitle" title={
          <div className="cardTitleContents">
            <IconButton tooltip="Back to recipes"
                        containerElement={<Link to="/recipes"/>}>
              <BackIcon color="#999"/>
            </IconButton>
            <div style={{paddingTop:"5px"}}>
              {recipe.name}
            </div>
          </div>
        }/>
        <div className="recipeMeta">
          <div><b>BY  </b> {recipe.user}</div>
          <div><b>PREP  </b> {recipe.prep_time} mins</div>
          <div><b>BAKE  </b> {recipe.bake_time} mins at {recipe.oven_temperature}°</div>
          <div><b>YIELDS  </b> {recipe.yield_count} {recipe.yield_type}</div>
        </div>
        <div style={{padding:"30px"}}>

          {(this.props.user === recipe.user) &&
            <IconMenu
              iconButtonElement={<IconButton tooltip="Delete this recipe"><DeleteIcon/></IconButton>}
              anchorOrigin={{horizontal: 'left', vertical: 'top'}}
              targetOrigin={{horizontal: 'left', vertical: 'top'}}
              className={"recipeActions"}
            >
            <MenuItem
              primaryText="Confirm Deletion"
              leftIcon={<DeleteIcon color="black"/>}
              onClick={this.onDeleteClick.bind(this)}
            />
            </IconMenu>
          }
            <RaisedButton
              label="Record an activity with this recipe"
              icon={<AddIcon/>}
              labelColor={"white"}
              onClick={this.onRecordActivityClick.bind(this)}
              primary={true}
            />

          <h3>Ingredients</h3>
          <ul>
            {this.renderIngredients()}
          </ul>

          <h3>Instructions</h3>
          <RecipeTimeline instructions={this.props.recipe.instructions}/>
        </div>
      </Card>
    );
  }
}

function mapStateToProps({ recipes, auth }, ownProps) {
  return {
    recipe: recipes[ownProps.match.params.id],
    user: auth.user
  };
}

export default connect(mapStateToProps, { fetchRecipe, deleteRecipe })(RecipesShow);
