import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
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

    function RenderComments({comments}){
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
                        <RenderComments comments={props.comments} />
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