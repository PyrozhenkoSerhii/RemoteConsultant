import React from 'react'
import moment from 'moment'
import {Button} from 'react-bootstrap'

import Message from './Message'



const Messages = ({ data, currentUser, currentConversation, message, handleMessageInput, sendMessage }) => {
	const renderMessages = () => {
		let i = 0
		let messageCount = data.length
		let messages = []

		while (i < messageCount) {
			let previous = data[i - 1]
			let current = data[i]
			let next = data[i + 1]
			let isMine = current.author === currentUser
			let currentMoment = moment(current.timestamp)
			let prevBySameAuthor = false
			let nextBySameAuthor = false
			let startsSequence = true
			let endsSequence = true
			let showTimestamp = true

			if (previous) {
				let previousMoment = moment(previous.timestamp)
				let previousDuration = moment.duration(currentMoment.diff(previousMoment))
				prevBySameAuthor = previous.author === current.author

				if (prevBySameAuthor && previousDuration.as('hours') < 1) {
					startsSequence = false
				}

				if (previousDuration.as('hours') < 1) {
					showTimestamp = false
				}
			}

			if (next) {
				let nextMoment = moment(next.timestamp)
				let nextDuration = moment.duration(nextMoment.diff(currentMoment))
				nextBySameAuthor = next.author === current.author

				if (nextBySameAuthor && nextDuration.as('hours') < 1) {
					endsSequence = false
				}
			}

			messages.push(
				<Message
					key={i}
					isMine={isMine}
					startsSequence={startsSequence}
					endsSequence={endsSequence}
					showTimestamp={showTimestamp}
					data={current}
				/>
			)

			i += 1
		}

		return messages
	}

	return (
		<div className='message-list'>
			<div className='toolbar'>
				<div className='left-items'></div>
				<h1 className='toolbar-title'>{currentConversation.fullname}</h1>
				<div className='right-items'>
					<i className='toolbar-button fas fa-microphone' />
					<i className='toolbar-button fas fa-video' />
				</div>
			</div>

			<div className='message-list-container'>{renderMessages()}</div>

			<div className='compose'>
				<input
					type='text'
					className='compose-input'
					placeholder='Type a message, @name'
					value={message}
					onChange={handleMessageInput}
				/>
				<i className='toolbar-button far fa-paper-plane' onClick={sendMessage}/>
			</div>
		</div>
	)
}


export default Messages