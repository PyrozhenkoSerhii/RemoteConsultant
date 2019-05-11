import React from 'react';
import moment from 'moment';

const MessageItem = ({ data, isMine, startsSequence, endsSequence, showTimestamp }) => (
    <div className={[
        'message',
        `${isMine ? 'mine' : ''}`,
        `${startsSequence ? 'start' : ''}`,
        `${endsSequence ? 'end' : ''}`
    ].join(' ')}>

        {showTimestamp && <div className="timestamp">
            {moment(data.timestamp).format('LLLL')}
        </div>}

        <div className="bubble-container">
            <div className="bubble" title={moment(data.timestamp).format('LLLL')}>
                {data.message}
            </div>
        </div>
    </div>
)


export default MessageItem
