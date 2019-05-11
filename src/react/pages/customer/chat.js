import React, { useState } from 'react'
import _find from 'lodash/find'
import Peer from 'peerjs'

import Conversations from '../../Components/Shared/Chat/ConversationList'
import Messages from '../../Components/Shared/Chat/MessageList'

import { useHTTP } from '../../tools/hooks/http'
import { BASE_URL, CONSULTANT, GET } from '../../../config/routes'

import Loading from '../../Components/Loading'
import Error from '../../Components/Error'



const Chatroom = ({ customer, product }) => {
	const [loading, consultants, error] = useHTTP(BASE_URL + CONSULTANT + GET, [product])


	/*
		{
			id: 'consultant._id that is used inside peer.connect()',
			connection: 'connection from peer.connect()'
			?messages: [{
				author: 'id of message owner',
				message: 'data of message',
				timestamp: 'date of message'
			}],
		}
	*/
	const [data, setData] = useState([])

	const [currentConversation, setCurrentConversation] = useState(null)

	const startChat = (consultant) => {
		let connection = _find(data, { id: consultant._id })
		if (!connection) {
			const peer = new Peer(customer._id, { host: 'localhost', port: 8080, path: '/p2p' })
			connection = peer.connect(consultant.chat.id)

			setData([...data, {
				id: consultant._id,
				connection: connection,
				messages: []
			}])

			connection.on('data', data => {
				console.log(data)
			})
		}

		setCurrentConversation({ id: consultant._id, connection, consultant })
	}

	const [message, setMessage] = useState('')
	const handleMessageInput = ({ target }) => {
		setMessage(target.value)
	}

	const sendMessage = () => {
		const conn = currentConversation.connection

		conn.send(message)
	}

	return (
		<div className='messenger'>
			<div className='scrollable sidebar'>
				{loading ? <Loading /> :
					error ? <Error /> :
						<Conversations
							conversations={consultants}
							setSelectedConversation={startChat}
						/>
				}
			</div>

			<div className='scrollable content'>
				{currentConversation && _find(data, { id: currentConversation.id }) &&
					<Messages
						data={_find(data, { id: currentConversation.id }).messages}
						currentConversation={currentConversation.consultant}
						currentUser={customer._id}
						handleMessageInput={handleMessageInput}
						message={message}
						sendMessage={sendMessage}
					/>
				}
			</div>
		</div>
	)
}


export default Chatroom