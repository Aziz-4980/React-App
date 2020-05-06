    import React from 'react';
    import { Card, CardImg, CardTitle, CardText, CardBody, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody, Label } from 'reactstrap';
import { Component } from 'react';
    import { Link } from 'react-router-dom';
    import { Control, LocalForm, Errors } from 'react-redux-form';



    class CommentForm extends Component {
        constructor(props) {
            super(props);
            this.state = {
                isModalOpen: false,
            }
            this.toggleModal = this.toggleModal.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);
        }
        

        handleSubmit(values) {
            console.log("The current state : " + JSON.stringify(values));
            alert("The current state : " + JSON.stringify(values));
        }


        toggleModal() {
            this.setState({
                isModalOpen: !this.state.isModalOpen,
            })
        }

        render() {
            const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);
const required = (val) => val && val.length;

            return (
                <>
                    <Button outline onClick={this.toggleModal}>
                        <span className="fa fa-pencil fa-lg m-1"></span> Submit Comment
                </Button>
                    <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                        <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                        <ModalBody>
                            <LocalForm onSubmit={(values) => {
                                this.handleSubmit(values);
                            }}>
                                <Label htmlFor="rating">Rating</Label>
                                <Control.select model=".rating" name="rating" className="form-control mt-1">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Control.select>
                                <Label htmlFor="author">Your Name</Label>
                                <Control.text model=".author" name="author" className="form-control mt-1" validators={{
                                    required,
                                    minLength: minLength(3),
                                    maxLength: maxLength(15),
                                }} />
                                <Errors
                                    className="text-danger"
                                    model=".author"
                                    show="touched"
                                    messages={{
                                        required: " Required",
                                        minLength: " Greater than 2 number",
                                        maxLength: " Must be 15 numbers or less",

                                    }}
                                />
                                <Label htmlFor="enteredComment">Comment</Label>
                                <Control.textarea name="enteredComment" model=".enteredComment" className="form-control m-1" rows="6" />
                                <Button type="submit" color="primary" className="mt-3">
                                    Submit
                                    </Button>
                            </LocalForm>
                        </ModalBody>
                    </Modal>
                </>
            )

        }

    }






    function RenderDish({ dish }) {
        if (dish != null) {
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
        else {
            return (
                <div></div>
            );
        }
    }

    function RenderComments({ comments }) {

        if (comments != null) {
            comments = comments.map(comment => {
                return (
                    <div>
                        <p>{comment.comment}</p>
                        <p>-- {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(comment.date)))}</p>
                    </div>
                );
            });

            return (
                <div className="list-unstyled">
                    <h4>Comments</h4>
                    {comments}

                    <div>
                        <CommentForm />
                    </div>
                </div>

            );
        }

        else {
            return (
                <div></div>
            );
        }

    }

    // ========================
    const DishDetail = (props) => {
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>

                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
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
                    <div className="col-12 col-md-5 m-1">
                        <RenderComments comments={props.comments} />
                    </div>
                </div>
            </div>
        );
    }

    export default DishDetail;
