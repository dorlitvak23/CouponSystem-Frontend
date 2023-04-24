import ".././CardStyling.css";
import React from 'react';
import { CompanyCardProps } from "../CompanyCard/CompanyCard";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";
import { BsTrash } from "react-icons/bs";
import { FaEdit, FaInfoCircle } from "react-icons/fa";


function CompanyInfoCard(props: CompanyCardProps) {
  return (
    <div className="company-info-card">
      <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title>{props.company.name}</Card.Title>
          <Card.Text>
            <span>id: {props.company.id}</span>
            <br />
            <span>name: {props.company.name}</span>
            <br />
            <span>email: {props.company.email}</span>
            <br />
          </Card.Text>

          { !props.isSelf&& <div >
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
            <Link className="back" to={"/admin/companies"}>
              <Button variant="primary">
                <FaInfoCircle />back
              </Button>
            </Link>
          </div>}
        </Card.Body>
      </Card>
    </div>
  );
}

export default CompanyInfoCard;