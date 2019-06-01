import React, { useState } from 'react'
import Rating from 'material-ui-rating'

import { MDBBtn, MDBIcon } from "mdbreact";

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const renderRating = (rating) => (
    <Rating style={{ color: 'orange' }} value={Math.ceil(rating / 20)} max={5} disabled />
)

const renderLanguages = (languages) => {
    const items = []
    languages.forEach(lang => items.push(<div key={lang.title}>{`${lang.title} - ${lang.level}`}</div>))

    return items
}

const Conversations = ({ conversations, selectedConversation, setSelectedConversation, isConsultant, closeConversation }) => {
    const [expanded, setExpanded] = useState(false);

    const handleChange = conversationId => (event, isExpanded) => {
        setExpanded(isExpanded ? conversationId : false);
    };

    return <div className="conversation-list">
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
}


export default Conversations