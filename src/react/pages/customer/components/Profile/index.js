import React from "react";
import moment from "moment";

import { Image } from 'react-bootstrap'
import {
  MDBPopover, MDBPopoverBody, MDBPopoverHeader, MDBCard, MDBCardBody, MDBBadge,
  MDBCardTitle, MDBCardText, MDBCardHeader, MDBBtn, MDBContainer
} from "mdbreact";

import CustomTable from '../../../../Components/Shared/Table/Table'



export const ProfileComponent = ({ customer, quota, orders, columns }) => {
  return (
    <div className="profile-wrapper">
      <div className="profile-info">
        <div className='profile-left animated-slide-up'>
          <Image src={customer.image} rounded />
          <p className='header'>{customer.username}</p>
        </div>
        <div className='profile-right'>
          <p className='header'>Manage your subscription</p>

          <div className='subscrition-wrapper'>
            <MDBCard className='animated-slide-up' style={{ width: "22rem", margin: "1rem" }}>
              <MDBCardHeader color="green lighten-1">Active</MDBCardHeader>
              <MDBCardBody>
                <MDBCardTitle>Basic</MDBCardTitle>
                <MDBCardText>
                  <p>- up to 5 free consultations per day</p>
                  <p>- unlimited paid consultations</p>
                </MDBCardText>
                <MDBBtn color="green lighten-1">Learn more</MDBBtn>
              </MDBCardBody>
            </MDBCard>
            <MDBCard className='animated-slide-up' style={{ width: "22rem", margin: "1rem" }}>
              <MDBCardHeader color="dark" text="grey">Not activated</MDBCardHeader>
              <MDBCardBody>
                <MDBCardTitle>Premium</MDBCardTitle>
                <MDBCardText>
                  <p>- unlimited free consultations</p>
                  <p>- bonuses and sales</p>
                </MDBCardText>
                <MDBBtn color="darkgray" disabled>Coming soon...</MDBBtn>
              </MDBCardBody>
            </MDBCard>
          </div>


          <p className='header'>Remaining quota</p>
          <div className='animated-slide-up'>
            <h6>{`Free consultations on ${moment(new Date()).format("DD/MM/yyyy")}:`}
              <MDBBadge pill color="primary" className="ml-2 badge">{quota}</MDBBadge>
            </h6>
            <MDBPopover
              placement="top"
              popover
              clickable
              id="popper1"
            >
              <MDBBtn outline color="info" size='sm'>How to get more?</MDBBtn>
              {/* <span className="get-more-link">How to get more?</span> */}
              <div>
                <MDBPopoverHeader>Paid consultations</MDBPopoverHeader>
                <MDBPopoverBody>
                  Basic account gives you only 5 consultations per day. After they are expired you can pay for every consultation you use as an additional step before consultation
                </MDBPopoverBody>
              </div>
            </MDBPopover>
          </div>

          <p className='header'>Order History</p>
          <CustomTable
            data={orders}
            columns={columns}
          />

        </div>
      </div>


    </div>
  )
}
