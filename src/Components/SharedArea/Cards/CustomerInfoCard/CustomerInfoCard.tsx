import "./CustomerInfoCard.css";
import React from "react";
import { CustomerCardProps } from "../CustomerCard/CustomerCard";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import { BsTrash } from "react-icons/bs";
import { FaEdit, FaInfoCircle } from "react-icons/fa";


function CustomerInfoCard(props: CustomerCardProps) {
  const name = props.customer.firstName + " " + props.customer.lastName;
  return (
    <div className="customer-info-card">
      <Card style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Text>
            <span>id: {props.customer.id}</span>
            <br />
            <span>first name: {props.customer.firstName}</span>
            <br />
            <span>last name: {props.customer.lastName}</span>
            <br />
            <span>email: {props.customer.email}</span>
            <br />
          </Card.Text>

          {!props.isSelf && (
            <div>
              <Link
                className="remove"
                to={"/customers/remove/" + props.customer.id}
              >
                <Button variant="primary">
                  <BsTrash />
                  delete
                </Button>
              </Link>

              <Link
                className="update"
                to={"/customers/update/" + props.customer.id}
              >
                <Button variant="primary">
                  <FaEdit />
                  update
                </Button>
              </Link>
              <Link className="back" to={"/admin/customers"}>
                <Button variant="primary">
                  <FaInfoCircle />
                  back
                </Button>
              </Link>
            </div>)}
        </Card.Body>
      </Card>
    </div>
  );
}

export default CustomerInfoCard;
