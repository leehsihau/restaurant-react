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
    const commentsBoies = comments.map((commentBody) =>
      <li class="list-group-item">
        <p>
          {commentBody.comment}
          <br /><br />
          --{commentBody.author}, {commentBody.date}
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
        <h4>
          Comments
        </h4>,
        <div className="col-12 col-md-5 m-1">
          <h4>
            Comments
          </h4>
          <ul class="list-group">
            {commentsBoies}
          </ul>

      </div>
          );
  }

          render() {
    const dish = this.props.dish
          if (dish != null)
          return (
          <div className="row">
            <div className="col-12 col-md-5 m-1">
              {this.renderDish(dish)}
            </div>
            {this.renderComments(dish.comments)}
          </div>
          );
          else
          return (
          <div></div>
          );
  }
}

          export default Dishdetail;