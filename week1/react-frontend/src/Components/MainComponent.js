/* eslint-disable no-useless-constructor */
import React, { Component } from 'react';


import Menu from './MenuComponent';

import DishDetail from './DishdetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import About from './AboutComponent';

import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import Contact from './ContactComponent';
import { connect } from 'react-redux';

import { addComment, fetchDishes } from '../redux/ActionCreators';


const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    leaders: state.leaders,
    promotions: state.promotions
  }
}

const mapDispatchToProps = dispatch => ({
  
  addComment: (dishId, rating, author, comment) => dispatch(addComment(dishId, rating, author, comment)),
  fetchDishes: ()=> {dispatch(fetchDishes())}
});
class Main extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchDishes();
  }



  //Using functional component Menu to pass parameters
  render() {
    const HomePage = ()=>{
        return (
            <Home dish={this.props.dishes.dishes.filter((dish)=>dish.featured)[0]} 
            dishesLoading={this.props.dishes.isLoading}
            dishesErrMess = {this.props.dishes.errMess}
            promotion={this.props.promotions.filter((dish)=>dish.featured)[0]} 
            leader={this.props.leaders.filter((dish)=>dish.featured)[0]} />
        );
    }

    const DishWithId = ({match}) => {
      return (
        <DishDetail dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]}
            isLoading={this.props.dishes.isLoading}
            errMess = {this.props.dishes.errMess}
        comments={this.props.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))}
        addComment={this.props.addComment}
      />
      );
    }

    return (
      <div>
        <Header />
        <Switch>
            <Route path="/home" component={HomePage} />
            <Route path="/contactus" component={Contact } />
            <Route path="/menu/:dishId" component={DishWithId}/>
            <Route exact path="/menu" component={()=> <Menu dishes={this.props.dishes}/> } />
            <Route path="/about" component={()=><About leaders={this.props.leaders}/>}/>
            <Redirect to="/home"/>
        </Switch>
        <Footer/>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));