import './App.css';
import React from 'react';
import { config } from './Constants'
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ListView from './ListView/ListView';
import DetailView from './DetailView/DetailView';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      recipes: [],
      specials: []
    };
  }

  componentDidMount() {
    Promise.all([
      fetch(config.url.API_URL + '/recipes'),
      fetch(config.url.API_URL + '/specials')
    ]).then((responses) => {
      return Promise.all(responses.map(function (response) {
        return response.json();
      }));
    }).then((data) => {
      this.setState({
        isLoaded: true,
        recipes: data[0],
        specials: data[1]
      });
    }).catch((error) => {
      this.setState({
        isLoaded: true,
        error: error
      });
    });
  }
  render() {
    const { error, isLoaded } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <Router>
          <Container>
            <Switch>
              <Route exact path="/">
                <ListView recipes={this.state.recipes} apiUrl={config.url.API_URL}/>
              </Route>
              <Route path="/recipe/:id">
                <DetailView recipes={this.state.recipes} specials={this.state.specials} apiUrl={config.url.API_URL}/>
              </Route>
            </Switch> 
          </Container>
        </Router>
      );
    }
  }
}

export default App;
