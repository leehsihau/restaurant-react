/* eslint-disable react/jsx-pascal-case */
import React, { Component } from "react";
import {
    Button, Modal,
    ModalHeader, ModalBody, Label, Row, Col, Nav, NavItem
} from "reactstrap";
import { Control, LocalForm, Errors } from 'react-redux-form';

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
        alert('Current State is: ' + JSON.stringify(values));
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
                                        placeholder="uname"
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

export default CommentForm;