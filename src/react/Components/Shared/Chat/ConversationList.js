import React, { useState, useContext } from 'react'
import Rating from 'material-ui-rating'
import _map from 'lodash/map'

import Popper from '@material-ui/core/Popper'
import Fade from '@material-ui/core/Fade'
import Paper from '@material-ui/core/Paper'
import { MDBCard, MDBCardBody, MDBCardHeader, MDBBtn, MDBIcon } from "mdbreact"

import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import productContext from '../../../tools/state/context/product-context'


const renderRating = (rating) => (
    <Rating style={{ color: 'orange' }} value={Math.ceil(rating / 20)} max={5} disabled />
)

const renderLanguages = (languages) => {
    const items = []
    languages.forEach(lang => items.push(<div key={lang.title}>{`${lang.title} - ${lang.level}`}</div>))

    return items
}

const Conversations = ({ conversations, selectedConversation, setSelectedConversation, isConsultant, closeConversation, handleOrderPopup }) => {
    const [expanded, setExpanded] = useState(false);

    const handleChange = conversationId => (event, isExpanded) => {
        setExpanded(isExpanded ? conversationId : false);
    };

    const [popup, setPopup] = useState(null);

    const handleClick = event => {
        setPopup(popup ? null : event.currentTarget);
    }
    const open = Boolean(popup);
    const id = open ? 'simple-popper' : null;

    const context = useContext(productContext)

    const makeOrder = () => {
        setPopup(null)
        handleOrderPopup(context.product)
    }

    return (
        <div className="conversation-list">
            {context.product && <div>
                <MDBBtn rounded size="lg" color="cyan" onClick={handleClick}>
                    Selected product
                    <MDBIcon icon={open ? 'angle-left' : 'angle-right'} className="ml-2" />
                </MDBBtn>
                <Popper
                    id={id}
                    open={open}
                    anchorEl={popup}
                    placement='right-start'
                    modifiers={{
                        flip: {
                            enabled: true,
                        },
                        preventOverflow: {
                            enabled: true,
                            boundariesElement: 'viewport',
                        }
                    }}
                    transition>
                    {({ TransitionProps }) => (
                        <Fade {...TransitionProps} timeout={350}>
                            <Paper>
                                <MDBCard style={{ marginTop: "1rem" }}>
                                    <MDBCardHeader color="cyan">{context.product.title}</MDBCardHeader>
                                    <MDBCardBody>
                                        <p>Category: {context.product.category}</p>
                                        <p>Price: {context.product.price}</p>
                                        <p>Auantity: {context.product.quantity}</p>
                                        {context.product.specification && _map(context.product.specification, (value, key) => (
                                            <p key={key}>{key}: {JSON.stringify(value)}</p>
                                        ))}
                                        <MDBBtn color="cyan" onClick={makeOrder}>Order Product</MDBBtn>
                                    </MDBCardBody>
                                </MDBCard>
                            </Paper>
                        </Fade>
                    )}
                </Popper>
            </div>}

            {conversations.map(conversation =>
                <ExpansionPanel
                    key={conversation._id}
                    expanded={expanded === conversation._id}
                    onChange={handleChange(conversation._id)}
                    style={{ margin: 0 }}
                >
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel3bh-content"
                        id="panel3bh-header"
                    >
                        <Typography><img className='conversation-photo' src={conversation.image} alt='conversation' /></Typography>
                        <div className='conversation-info'>
                            <div className='conversation-info-fullname'>{conversation.fullname}{conversation.gender === 'male' ? ' (m)' : ' (f)'}</div>
                            {isConsultant && <div className='conversation-info-rating'>{renderRating(conversation.rating)}</div>}
                        </div>

                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <div className='conversation-details-wrapper'>
                            {isConsultant && (
                                <div className='consultant-info'>
                                    {conversation.info && conversation.info.length > 0 && <div className='consultant-info-item item-info'>{conversation.info}</div>}
                                    {conversation.languages && conversation.languages.length > 0 && <div className='consultant-info-item item-language'>{renderLanguages(conversation.languages)}</div>}
                                </div>
                            )}
                            {selectedConversation && selectedConversation.id === conversation._id ?
                                <MDBBtn outline color="danger" onClick={() => closeConversation(conversation)}>
                                    End consultantion <MDBIcon icon="times-circle" className="ml-1" />
                                </MDBBtn> :
                                <MDBBtn outline color="success" onClick={() => setSelectedConversation(conversation)}>
                                    Connect <MDBIcon icon="external-link-square-alt" className="ml-1" />
                                </MDBBtn>
                            }
                        </div>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            )}
        </div>
    )
}


export default Conversations