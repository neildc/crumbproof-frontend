import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import moment from 'moment';

import LinearProgress from 'material-ui/LinearProgress';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import AddIcon from 'material-ui/svg-icons/content/add-circle';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import BackIcon from 'material-ui/svg-icons/navigation/arrow-back';
import { Card, CardTitle, CardHeader, CardText } from 'material-ui/Card';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';

import RecipeTimeline from '../recipe_timeline';
import ActivityGallery from '../activities_gallery';
import RecipeDiff from '../recipe_diff';
import { FadeIn } from '../animations/fade';

import { getTotalTimeStr } from '../../util/time';

import './recipe_show.css';

const renderIngredients = ingredients => (
  _.map(ingredients, i => (
    <li key={i.name}>
      {i.quantity} {i.unit} {i.name}
    </li>
  ))
);

const renderRecipe = ({ data: {credits, ingredients, instructions}}) => (
  <Card containerStyle={{ marginBottom: '20px' }} initiallyExpanded>
    <CardHeader title="RECIPE" showExpandableButton />
    <CardText expandable style={{ padding: '30px', paddingTop: '0px' }}>


      { credits &&
        <div>
          <h3>Credits:</h3>
          {credits}
        </div>
      }
      <h3>Ingredients</h3>

      <ul> {renderIngredients(ingredients)} </ul>

      <h3>Instructions</h3>
      <RecipeTimeline instructions={instructions} />
    </CardText>
  </Card>
);

const renderHistory = ({ recipe, baseRecipe, parentRecipe }) => {

  if (!baseRecipe) {
    return <LinearProgress mode="indeterminate" />;
  }

  return (
    <Card containerStyle={{ marginBottom: '20px' }} initiallyExpanded>
      <CardHeader
        title="RECIPE HISTORY"
        showExpandableButton
      />
      <CardText expandable style={{ padding: '30px', paddingTop: '0px' }}>
        <h3>Recipe based off:</h3>
        <Link to={`/recipes/${baseRecipe.id}`}>{baseRecipe.data.name}</Link>
        {` created ${moment(baseRecipe.created).fromNow()}`}

        {parentRecipe &&
          <div>
            <h3>Previous iteration of recipe:</h3>
            <Link to={`/recipes/${parentRecipe.id}`}>
              {parentRecipe.data.name}
            </Link>
            {` created ${moment(parentRecipe.created).fromNow()}`}

            <h2>Changes made:</h2>
            <RecipeDiff recipe={recipe} />
          </div>
          }
      </CardText>
    </Card>
  );
};

const RecipeShowPresentation = (props) => {
  const { recipe } = props;

  if (!recipe) {
    return <LinearProgress mode="indeterminate" />;
  }

  return (
    <FadeIn>
      <Card containerStyle={{ marginBottom: '20px' }}>
        <CardTitle
          className="cardTitle"
          title={
            <div className="cardTitleContents">
              <IconButton
                tooltip="Back to recipes"
                         containerElement={<Link to="/recipes" />}
                                           >
                <BackIcon color="#999" />
              </IconButton>
              <div style={{ paddingTop: '5px' }}>
                {recipe.data.name}
              </div>
            </div>
          }
        />
        <div className="recipeMeta">
          <div><b>BY  </b> {recipe.user}</div>
          <div><b>TIME  </b> {getTotalTimeStr(recipe.data.instructions)}</div>
          <div><b>BAKE  </b> {recipe.data.bake_time} mins at {recipe.data.oven_temperature}°</div>
          <div><b>YIELDS  </b> {recipe.data.yield_count} {recipe.data.yield_type}</div>
        </div>
        <div style={{ padding: '30px' }}>

          {(props.user === recipe.user) &&
           <IconMenu
             iconButtonElement={
               <IconButton tooltip="Delete recipe">
                 <DeleteIcon />
               </IconButton>
             }
             anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
             targetOrigin={{ horizontal: 'left', vertical: 'top' }}
             className="recipeActions"
             >
             <MenuItem
               primaryText="Confirm Deletion"
               leftIcon={<DeleteIcon color="black" />}
               onClick={props.onDeleteClick}
             />
           </IconMenu>
          }

          <h3>Recent Activity</h3>
          <ActivityGallery recipeId={props.recipe.id} />
          <RaisedButton
            label="Record an activity with recipe"
            icon={<AddIcon />}
            onClick={ props.onRecordActivityClick }
            style={{ margin: '20px 0' }}
          />
          <br />
          <RaisedButton
            label="Start guided activity"
            icon={<AddIcon />}
            labelColor="white"
            onClick={props.onStartActivityClick}
            primary
            style={{ margin: '20px 0' }}
          />
        </div>
      </Card>

      { renderRecipe(recipe) }

      { recipe.base_recipe &&
        renderHistory(props)
      }
    </FadeIn>
  )
};

RecipeShowPresentation.propTypes = {
  recipe: PropTypes.object,
  baseRecipe: PropTypes.object,
  parentRecipe: PropTypes.object,
  onDeleteClick: PropTypes.func.isRequired,
  onRecordActivityClick: PropTypes.func.isRequired,
  onStartActivityClick: PropTypes.func.isRequired,
};

export default RecipeShowPresentation;
