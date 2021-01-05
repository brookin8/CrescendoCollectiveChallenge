import './DetailView.css';
import { useParams} from "react-router-dom";
import { Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function DetailView(props) {
  let { id } = useParams();
  let recipe = props.recipes.filter(x => x.uuid == id);
  recipe = recipe.length > 0 ? recipe[0] : [];
  
  let ingredients = [];
  let directions = [];

  if(recipe)
  {
    recipe.ingredients.forEach(ingredient => {
      let specials = props.specials.filter(x => x.ingredientId == ingredient.uuid);
      let specialsFormatted = [];

      if(specials && specials.length > 0)
      {
        specials.forEach(special => {
          specialsFormatted.push(
            <li>
              <b>{special.title}</b>{" (" + special.type + " deal): " + special.text}
            </li>
          );
        });
      }

      ingredients.push(
        <li key={ingredient.uuid}>
          {ingredient.amount + " " + ingredient.measurement + " " + ingredient.name}
          {specialsFormatted.length > 0 && 
            <ul>
              {specialsFormatted}
            </ul>
          }
        </li>
      );
    });

    recipe.directions.forEach((direction, id) => {
      directions.push(
        <li key={id}>
          {direction.instructions}
          {direction.optional && " (optional)"}
        </li>
      );
    });
  }

  return (
    <div>
      <Row style={{marginTop:'20px'}}>
        <Col>
          <Link to={"/"} style={{color:'black'}}>&larr; Back to Recipes</Link>
        </Col>
      </Row>
      <Row>
        <Col>
          <h2 className="recipeTitle">{recipe.title}</h2>
        </Col>
      </Row>
      <Row>
        <Col>
          <div className={'twentyMarginBottom'} style={{fontSize:'.75rem'}}>{"Posted: " + recipe.postDate}</div>
        </Col>
      </Row>
      <Row>
        <Col>
          <div className={'twentyMarginBottom'}>{recipe.description}</div>
        </Col>
      </Row>
      <Row className={'twentyMarginBottom'}>
        <Col xs={8}>
          <img src={props.apiUrl + recipe.images.full} style={{maxWidth:'100%'}}/>
        </Col>
      </Row>
      <Row className={'twentyMarginBottom'}>
        <Col xs={8}>
          <Card>
            <Card.Body>
              <Row>
                <Col>
                  <div><b>{"Prep Time: "}</b>{recipe.prepTime}</div>
                  <div><b>{"Cook Time: "}</b>{recipe.cookTime}</div>
                </Col>
                <Col>
                  <div><b>{"Servings: "}</b>{recipe.servings}</div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col xs={8}>
          <div className={'subTitle'}>{"Ingredients:"}</div>
          <ul>
            {ingredients}
          </ul>
        </Col>
      </Row>
      <Row className={'twentyMarginBottom'}>
        <Col xs={8}>
          <div className={'subTitle'}>{"Directions:"}</div>
          <ol>
            {directions}
          </ol>
        </Col>
      </Row>
    </div>
  );
}

export default DetailView;
