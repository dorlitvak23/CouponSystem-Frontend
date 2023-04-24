import "./CustomerCard.css";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import React from "react";
import CustomerUserModel from "../../../../Models/CustomerUserModel";
import { Link } from "react-router-dom";
import { BsTrash } from "react-icons/bs";
import { FaEdit, FaInfoCircle } from "react-icons/fa";

export interface CustomerCardProps {
  customer: CustomerUserModel;
  isSelf: boolean;
}

function CustomerCard(props: CustomerCardProps): JSX.Element {
    const customerName = props.customer.firstName + " " + props.customer.lastName;
  return (

    <>
    
    <Card className="customer-card">
      <Card.Header>{customerName}</Card.Header>
      <Card.Body>
        <Card.Title>{props.customer.email}</Card.Title>
        <Card.Text>
          With supporting text below as a natural lead-in to additional content.
        </Card.Text>
       
          <Link className="view" to={"/customers/view/" + props.customer.id}> 
          <Button variant="primary">
            <FaInfoCircle />view
          </Button>
          </Link>

          <Link className="remove" to={"/customers/remove/" + props.customer.id}>
          <Button variant="primary">
            <BsTrash />delete
            </Button>
          </Link>

          <Link className="update" to={"/customers/update/" + props.customer.id}>
          <Button variant="primary">
            <FaEdit />update
            </Button>
          </Link>
          
      </Card.Body>
    </Card>
    </>
  );
}

export default CustomerCard;
