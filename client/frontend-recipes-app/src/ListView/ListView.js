import './ListView.css';
import ListItem from './ListItem/ListItem';
import { Row, Col } from 'react-bootstrap';

function ListView(props) {
  let listItems = [];
  props.recipes.forEach(recipe => {
    listItems.push(
      <ListItem recipe={recipe} apiUrl={props.apiUrl} key={recipe.uuid}/>
    );
  });
  return (
    <div>
      <Row>
        <h2 className="title">Recipes</h2>
      </Row>
      <Row style={{paddingBottom:'10px'}}>
        <Col>
          <div>{listItems}</div>
        </Col>
      </Row>
    </div>
  );
}

export default ListView;
