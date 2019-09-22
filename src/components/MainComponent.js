import React, { Component } from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import Menu from './RepoMenuComponent';
import RecordingDetail from './RecordingDetailComponent';
import { RECORDINGS } from '../shared/recordings';
import { COMMENTS } from '../shared/comments';
import { PROMOTIONS } from '../shared/promotions';
import { LEADERS } from '../shared/leaders';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import { Switch, Route, Redirect } from 'react-router-dom';

class Main extends Component {

  constructor(props) {
    super(props);
    this.state = {
        recordings: RECORDINGS,
        comments: COMMENTS,
        promotions: PROMOTIONS,
        leaders: LEADERS
    };
  }


  render() {

    const HomePage = () => {
      return(
          <Home 
              recording={this.state.recordings.filter((recording) => recording.featured)[0]}
              promotion={this.state.promotions.filter((promo) => promo.featured)[0]}
              leader={this.state.leaders.filter((leader) => leader.featured)[0]}
          />
      );
    };

    const RecordingWithId = ({match}) => {
      return(
        <RecordingDetail recording={this.state.recordings.filter((recording) => recording.id === parseInt(match.params.recordingId,10))[0]} comments={this.state.comments.filter((comment) => comment.recordingId === parseInt(match.params.recordingId,10))} /> 
      );
    };

    return (
      <div className="background">
        <Header />
          <Switch>
            <Route path='/home' component={HomePage} />
            <Route exact path='/recordingsmenu' render={() => <Menu recordings={this.state.recordings} /> } />
            <Route path='/menu/:recordingId' component={RecordingWithId} />
            <Route exact path='/contactus' component={Contact} />
            <Redirect to="/home" />
          </Switch>
        <Footer />
      </div>
    );
  }
}

export default Main;