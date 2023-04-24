import React, { useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";
import { BsTrash } from "react-icons/bs";
import { BiPurchaseTagAlt } from "react-icons/bi";
import { FaInfoCircle, FaEdit } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import CompanyUserModel from "../../../../Models/CompanyUserModel";
import { CouponModel } from "../../../../Models/CouponModel";
import { addedCompanyAction } from "../../../../Redux/CompanyAppState";
import store from "../../../../Redux/Store";
import notificationService from "../../../../Services/NotificationService";
import { getCompanyApi } from "../../../../WebApi/AdminApi";
import { getCompanyInfoApi } from "../../../../WebApi/CompanyApi";
import ".././CardStyling.css"
import PurchaseCoupon from "../../../UserArea/CustomerArea/PurchaseCoupon/PurchaseCoupon";
import { boolean } from "yup";

export interface CouponCardProps {
  coupon: CouponModel;
  purchasable: boolean;
  owned: boolean;
}

function CouponCard(props: CouponCardProps): JSX.Element {
  // const company = props.coupon;
  
  const [purchased, setPurchased] = useState(false);

  const purchase = (id: number) => {
    PurchaseCoupon(id);
    props.coupon.amount--;
    setPurchased(true);
  }

  useEffect (()=> {
    if (store.getState().customerReducer.customerCoupons.find(coupon => coupon.id === props.coupon.id)) {
      setPurchased(true);
    };
  }, [purchased]);


  return (
      <>
        <Card className="coupon-card">
          <Card.Header><img className="card-image" src={props.coupon.image} alt="coupon image" /></Card.Header>
          <Card.Body> 
            <Card.Title>{props.coupon.title}</Card.Title>
            <Card.Text>{props.coupon.description}</Card.Text>
            <Card.Text>{props.coupon.category}</Card.Text>
            <Card.Text>

              <span>info: </span>
              <br />
              <span>
                available until: {props.coupon.endDate?.toString()}
              </span>
              <br />
              <span>amount: {props.coupon.amount} </span>
              <br />
              <span>price: {props.coupon.price}$ </span>
              <br />
              {/* <span>company: {company.id} </span> */}
              <br />

            </Card.Text>
            {!props.purchasable ?
              (<div>
                <Link className="remove" to={"/company/coupon/delete/" + props.coupon.id}>
                  <Button variant="primary">
                    <BsTrash />
                    delete
                  </Button>
                </Link>

                <Link className="update" to={"/company/coupon/update/" + props.coupon.id}>
                  <Button style={{marginTop: 20}} variant="primary">
                    <FaEdit />
                    update
                  </Button>
                </Link>
              </div>) : !props.owned ? (<div>

                <Button variant="primary" onClick={()=>purchase(props.coupon.id)} disabled={purchased}>
                <BiPurchaseTagAlt />
                purchase now
              </Button>
              </div>) : <></>
            }
        </Card.Body>
      </Card>
      </>
  );
}

export default CouponCard;
