import React from 'react'
import Rating from 'material-ui-rating'


const renderRating = (rating) => (
    <Rating style={{ color: 'orange' }} value={Math.ceil(rating / 20)} max={5} disabled />
)


const Conversations = ({ conversations, setSelectedConversation, isConsultant }) => (
    <div className="conversation-list">
        {conversations.map(conversation =>
            <div className='conversation-list-item' key={conversation._id} onClick={() => setSelectedConversation(conversation)}>
                <img className='conversation-photo' src={conversation.image} alt='conversation' />
                <div className='conversation-info'>
                    <h1 className='conversation-title'>{conversation.fullname}</h1>
                    <p className='conversation-snippet'>{conversation.gender}</p>
                    {isConsultant &&
                        <div className='conversation-snippet'>{renderRating(conversation.rating)}</div>
                    }
                </div>
            </div>
        )}
    </div>
)


export default Conversations