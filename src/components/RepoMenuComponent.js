import React from 'react';
import { Card, CardImg, CardImgOverlay,
    CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';

function RenderMenuItem ({recording}) {
    console.log("repomenu component", recording.image)
    return (
        <Card>
            <Link to={`/menu/${recording.id}`} >
                <CardImg width="100%" src={recording.image} alt={recording.name} />
                <CardImgOverlay>
                    <CardTitle>{recording.name}</CardTitle>
                </CardImgOverlay>
            </Link>
        </Card>
    );
}

const Menu = (props) => {
    const menu = props.recordings.map((recording) => {
       return (
            <div className="col-12 col-md-5 m-1" key={recording.id}>                
                <RenderMenuItem recording={recording} />
            </div>
        );
    });

    return (
        <div className="container">
            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                    <BreadcrumbItem active>Recordings Menu</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>Recordings Menu</h3>
                    <hr />
                </div>                
            </div>
            <div className="row">
                {menu}
            </div>
        </div>
    );
}

export default Menu;