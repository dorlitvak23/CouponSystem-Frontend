import ".././CardStyling.css";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import React from "react";
import CompanyUserModel from "../../../../Models/CompanyUserModel";
import { Link } from "react-router-dom";
import { BsTrash } from "react-icons/bs";
import { FaEdit, FaInfoCircle } from "react-icons/fa";

export interface CompanyCardProps {
  company: CompanyUserModel;
  isSelf: boolean;
}

function CompanyCard(props: CompanyCardProps): JSX.Element {
  return (

    
    
      <div className="company-card-div">
    <Card className="company-card">


      <Card.Header>{props.company.name}</Card.Header>
      <Card.Body>
        <Card.Title>{props.company.email}</Card.Title>
        <Card.Text>
          With supporting text below as a natural lead-in to additional content.
        </Card.Text>
       
          <Link className="view" to={"/companies/view/" + props.company.id}> 
          <Button variant="primary">
            <FaInfoCircle />view
          </Button>
          </Link>

          <Link className="remove" to={"/companies/remove/" + props.company.id}>
          <Button variant="primary">
            <BsTrash />delete
            </Button>
          </Link>

          <Link className="update" to={"/companies/update/" + props.company.id}>
          <Button variant="primary">
            <FaEdit />update
            </Button>
          </Link>
          
      </Card.Body>
    </Card>
      </div>
    
      
    
  );
}

export default CompanyCard;