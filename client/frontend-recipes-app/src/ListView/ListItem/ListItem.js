import './ListItem.css';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function ListItem(props) {
  return (
    <div>
      <Card className={'listCard'}>
        <Card.Img style={{height: '10rem'}} variant="top" src={props.apiUrl + props.recipe.images.small} />
        <Card.Body>
          <Card.Title><Link to={"/recipe/" + props.recipe.uuid} style={{color:'black'}}>{props.recipe.title}</Link></Card.Title>
          <Card.Text>{props.recipe.description}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

export default ListItem;
