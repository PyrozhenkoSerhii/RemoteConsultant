import React, { useState } from "react";
import moment from "moment";

import { Image } from 'react-bootstrap'
import {
  MDBPopover, MDBPopoverBody, MDBPopoverHeader, MDBCard, MDBCardBody, MDBBadge,
  MDBCardTitle, MDBCardText, MDBCardHeader, MDBBtn, MDBContainer, MDBCollapse
} from "mdbreact";

import CustomTable from '../../../../Components/Shared/Table/Table'



export const ProfileComponent = ({ customer, quota, orders, columns, consultations }) => {
  const [expandedId, setExpandedId] = useState(null);

  const changeExpanded = (newId) => {
    setExpandedId((oldId) => oldId === newId ? null : newId)
  }

  console.log(consultations);

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
                <MDBCardText>- up to 5 free consultations per day</MDBCardText>
                <MDBCardText>- unlimited paid consultations</MDBCardText>
                <MDBBtn color="green lighten-1">Learn more</MDBBtn>
              </MDBCardBody>
            </MDBCard>
            <MDBCard className='animated-slide-up' style={{ width: "22rem", margin: "1rem" }}>
              <MDBCardHeader color="dark" text="grey">Not activated</MDBCardHeader>
              <MDBCardBody>
                <MDBCardTitle>Premium</MDBCardTitle>
                <MDBCardText>- bonuses and sales</MDBCardText>
                <MDBCardText>- unlimited free consultations</MDBCardText>
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
              <div>
                <MDBPopoverHeader>Paid consultations</MDBPopoverHeader>
                <MDBPopoverBody>
                  Basic account gives you only 4 consultations per day. After they are expired you can pay for every consultation you use as an additional step before consultation
                </MDBPopoverBody>
              </div>
            </MDBPopover>
          </div>

          <p className='header'>Order History</p>
          <CustomTable
            data={orders}
            columns={columns}
          />

          <br/>
          <p className='header'>Consultations archive</p>
          <div className='animated-slide-up'>
            {consultations && consultations.map((consultation) => (
              <div key={consultation._id} className='archive-item-wrapper'>
                <div className='archive-item-info'>
                  <span>Consultant: <i>{consultation.consultantName}</i></span>
                  <span>Product: <i>{`${consultation.productTitle} (${consultation.companyTitle})`}</i></span>

                  <MDBBtn
                    outline
                    color="info"
                    size='sm'
                    onClick={() => changeExpanded(consultation._id)}
                  >
                    Show messages
                </MDBBtn>
                </div>
                <MDBCollapse id={consultation._id} isOpen={expandedId === consultation._id}>
                  {consultation.messages.map((message) => (
                    <div key={message._id} className='archive-item-message'>
                      <span><strong>{message.author}</strong>: {message.message}</span>
                      <span>{message.timestamp}</span>
                    </div>
                  ))}
                </MDBCollapse>
              </div>
            ))}
          </div>

        </div>

      </div>


    </div>
  )
}
