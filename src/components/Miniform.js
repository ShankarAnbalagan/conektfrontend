import React from 'react';
import {Form, Button} from 'react-bootstrap';
const Miniform = props =>(
    <div>
    <Form onSubmit={props.gettext}>
    <Form.Control as="textarea" name ="post" placeholder="write here"/>
    <Button type="submit" variant="dark">Done</Button>
</Form></div>
);

export default Miniform;