import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem, Label,
    Modal, ModalHeader, ModalBody, Button, Row, Col } from 'reactstrap';
import { Control, LocalForm } from 'react-redux-form';
import { Link } from 'react-router-dom';
import Iframe from 'react-iframe'

    function RenderRecording({recording}){
            return(
                <div className="col-12 col-md-5 m1">
                    <Card>
                        <CardImg width="100%" src={recording.image} alt={recording.name}/>
                        <CardBody>
                        <CardTitle>{recording.name}</CardTitle>
                            <CardText>
                            {recording.description}
                            </CardText>
                        </CardBody>
                    </Card>
                </div>   
            );
    }

    function RenderComments({comments, addComment, recordingId}) {
            return(
                <div className="col-12 col-md-5 m-1">
                    <h4>Comments</h4>
                    <ul className = "list-unstyled">
                        {comments.map(
                            (comment)=>{
                                return (<li>
                                        <p>{comment.comment}</p><p>--{comment.author} , {new Intl.DateTimeFormat('en-US', {year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                                    </li>
                                );
                            })
                        }
                    </ul>
                    <CommentForm recodingId={recordingId} addComment={addComment} />
                </div>
            );
    }

    function RenderYouTube({recording}){
        if (recording.recording != null){
        return(
            <div className="col-12 mx-auto">
                <Iframe url={(recording.recording)}
                        width="100%"
                        height="450px"
                        id="myId"
                        className="myClassname"
                        display="initial"
                        position="relative"/>
            </div>
            );
        } else {
            return(
                <div></div>
            );
        }
    }

    class CommentForm extends Component {

        constructor(props) {
            super(props);
    
            this.toggleModal = this.toggleModal.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);
            
            this.state = {
              isNavOpen: false,
              isModalOpen: false
            };
        }
    
        toggleModal() {
            this.setState({
              isModalOpen: !this.state.isModalOpen
            });
        }
    
        handleSubmit(values) {
            this.toggleModal();
            this.props.addComment(this.props.recordingId, values.rating, values.comment);
        }
    
        render() {
            return(
            <div>
                <Button outline onClick={this.toggleModal}><span className="fa fa-pencil fa-lg"></span> Submit Comment</Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                <ModalBody>
                    <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                        <Row className="form-group">
                            <Col>
                            <Label htmlFor="rating">Rating</Label>
                            <Control.select model=".rating" id="rating" className="form-control">
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </Control.select>
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Col>
                            <Label htmlFor="comment">Comment</Label>
                            <Control.textarea model=".comment" id="comment"
                                        rows="6" className="form-control" />
                            </Col>
                        </Row>
                        <Button type="submit" className="bg-primary">
                            Submit
                        </Button>
                    </LocalForm>
                </ModalBody>
               </Modal>
            </div>
            );
        }
    }

    const RecordingDetail = (props) => {
        if(props.recording){
            return (
                <div className="container">
                    <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/recordingsmenu">Recordings Menu</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{props.recording.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                            <h3>{props.recording.name}</h3>
                            <hr />
                        </div>                
                    </div>
                    <div className="row">
                        <RenderRecording recording={props.recording} />
                        <RenderComments comments={props.comments} addComment={props.addComment} recordingId={props.recording.id} />
                    </div>
                    <div className="row">
                        <RenderYouTube recording={props.recording} />
                    </div>
                </div>
            );
        }else{
            return(<div></div>);
        }
    }

export default RecordingDetail;