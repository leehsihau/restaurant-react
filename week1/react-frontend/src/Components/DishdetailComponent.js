import { React, Component } from 'react';

import {
  Card, CardImg, CardText, CardBody,
  CardTitle, Breadcrumb, BreadcrumbItem
} from 'reactstrap';
import { Link } from 'react-router-dom';


/* eslint-disable react/jsx-pascal-case */
import {
  Button, Modal,
  ModalHeader, ModalBody, Label, Row, Col, Nav, NavItem
} from "reactstrap";
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);
class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false
    }
    this.toggleModal = this.toggleModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(values) {
    this.toggleModal();
    console.log('Current State is: ' + JSON.stringify(values));
    this.props.addComment(this.props.dishId, values.rating, values.uname, values.msg);
  }
  toggleModal() {
    this.setState({ isModalOpen: !this.state.isModalOpen });
  }

  render() {
    return (
      <div>
        <Nav className="ml-auto" navbar>
          <NavItem>
            <Button outline onClick={this.toggleModal}>
              <span className="fa fa-sign-in fa-lg"></span>Submit Comment
            </Button>
          </NavItem>
        </Nav>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Submit a comment</ModalHeader>
          <ModalBody>
            <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
              <Row className="form-group">
                <Label htmlFor="rating" md={2}>Rating</Label>
                <Col md={10}>
                  <Control.select model=".rating" name="rating"
                    className="form-control">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </Control.select>
                </Col>
              </Row>
              <Row className="form-group mt-3">
                <Label htmlFor="uname" md={3}>Your Name</Label>
                <Col md={9}>
                  <Control.text model=".uname" id="uname" name="uname"
                    placeholder="Your name"
                    className="form-control"
                    validators={{
                      required, minLength: minLength(3),
                      maxLength: maxLength(15)
                    }}
                  />
                  <Errors
                    className="text-danger" model=".uname" show="touched" messages={{
                      required: "required",
                      minLength: "Must be greater than 2 charachters",
                      maxLength: "Must be 15 charachters or less"
                    }} />
                </Col>
              </Row>
              <Row className="form-group">
                <Label htmlFor="msg" md={10}>Your comment</Label>
                <Col md={12}>
                  <Control.textarea model=".msg" id="msg" name="msg"
                    placeholder="Comment"
                    className="form-control"
                    rows="6"
                  />
                </Col>
              </Row>
              <Row className="form-group mt-2">
                <Col md={{ size: 10, offset: 2 }}>
                  <Button type="submit" color="primary">
                    Send Feedback
                  </Button>
                </Col>
              </Row>
            </LocalForm>
          </ModalBody>
        </Modal>
      </div>


    );
  }
}


/**
 * above is commentForm component 
 * @param {*} param0 
 * @returns 
 */


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


function RenderComments({ comments, addComment, dishId }) {
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
      <div>
        <CommentForm />
      </div>
    );
  }
  else
    return (
      <div className="col-12 col-md-5 m-1">
        <h4>
          Comments
        </h4>
        <ul style={{overflow: 'scroll', height: '550px'}} className="list-group">
          {commentsBoies}
        </ul>
        <CommentForm dishId={dishId}
         addComment={addComment} />

      </div>

    );
}

const DishDetail = (props) => {
  console.log("dishdetail component did render");
  const dish = props.dish
  if(props.isLoading) {
    return (
      <div className="container">
        <div className="row">
          <Loading />
        </div>
      </div>
    )
  }
  else if(props.errMess){
    return (
      <div className="container">
        <div className="row">
          <h4>{props.errMess}</h4>
        </div>
      </div>
    )
  }
  else if (dish != null)
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
          <RenderComments comments={props.comments}
           addComment={props.addComment}
           dishId={props.dish.id}/>
        </div>
      </div>
    );
  else
    return (
      <div></div>
    );
}

export default DishDetail;