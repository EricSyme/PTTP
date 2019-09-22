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
import About from './AboutComponent';
import Contact from './ContactComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import { addComment } from '../redux/ActionCreators';



const mapStateToProps = state => {
  return {
    recordings: state.recordings,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }
}

const mapDispatchToProps = dispatch => ({
  
  addComment: (recordingId, rating, author, comment) => dispatch(addComment(recordingId, rating, author, comment))

});


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
              recording={this.props.recordings.filter((recording) => recording.featured)[0]}
              promotion={this.props.promotions.filter((promo) => promo.featured)[0]}
              leader={this.props.leaders.filter((leader) => leader.featured)[0]}
          />
      );
    };

    const RecordingWithId = ({match}) => {
      return(
        <RecordingDetail 
        recording={this.props.recordings.filter((recording) => recording.id === parseInt(match.params.recordingId,10))[0]} 
        comments={this.props.comments.filter((comment) => comment.recordingId === parseInt(match.params.recordingId,10))}
        addComment={this.props.addComment}
        /> 
      );
    };

    return (
      <div className="background">
        <Header />
          <Switch>
            <Route path='/home' component={HomePage} />
            <Route exact path='/aboutus' render={() => <About leaders={this.props.leaders} />} />
            <Route exact path='/recordingsmenu' render={() => <Menu recordings={this.props.recordings} /> } />
            <Route path='/menu/:recordingId' component={RecordingWithId} />
            <Route exact path='/contactus' component={Contact} />
            <Redirect to="/home" />
          </Switch>
        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));