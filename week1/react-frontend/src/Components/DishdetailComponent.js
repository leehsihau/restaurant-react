import React from 'react';

import {
  Card, CardImg, CardText, CardBody,
  CardTitle, Breadcrumb, BreadcrumbItem
} from 'reactstrap';
import { Link } from 'react-router-dom';

function RenderDish({ dish }) {
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

function RenderComments({ comments }) {
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

const DishDetail = (props) => {
  console.log("dishdetail component did render");
  const dish = props.dish
  if (dish != null)
    return (
      <div className="container">
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>

          </Breadcrumb>
          <div className="col-12">
            <h3>{props.dish.name}</h3>
            <hr />
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-md-5 m-1">
            <RenderDish dish={props.dish} />
          </div>
          <RenderComments comments={props.comments} />
        </div>
      </div>
    );
  else
    return (
      <div></div>
    );
}

export default DishDetail;