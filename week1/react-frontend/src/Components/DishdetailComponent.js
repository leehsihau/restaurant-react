import React, { Component } from 'react';

import {
  Card, CardImg, CardText, CardBody,
  CardTitle
} from 'reactstrap';

class Dishdetail extends Component {

  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log("dishdetail component did mount");
  }

  componentDidUpdate(){
    console.log("dishdetail component did update");
  }

  renderDish(dish) {
    return (
      <Card>
        <CardImg top src={dish.image} alt={dish.name} />
        <CardBody>
          <CardTitle>{dish.name}</CardTitle>
          <CardText>{dish.description}</CardText>
        </CardBody>
      </Card>
    );
  }

  renderComments(comments) {
    console.log(comments)
    const commentsBoies = comments.map((commentBody, index) =>
      <li className="list-group-item" key={index}>
        <p>
          {commentBody.comment}
          <br /><br />
          --{commentBody.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(commentBody.date)))}
        </p>
      </li>


    );
    if (comments == null) {
      return (
        <div></div>
      );
    }
    else
      return (
        <div className="col-12 col-md-5 m-1">
          <h4>
            Comments
          </h4>
          <ul className="list-group">
            {commentsBoies}
          </ul>

        </div>
      );
  }

  render() {
    console.log("dishdetail component did render");
    const dish = this.props.dish
    if (dish != null)
      return (
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-5 m-1">
              {this.renderDish(dish)}
            </div>
            {this.renderComments(dish.comments)}
          </div>
        </div>
      );
    else
      return (
        <div></div>
      );
  }
}

export default Dishdetail;