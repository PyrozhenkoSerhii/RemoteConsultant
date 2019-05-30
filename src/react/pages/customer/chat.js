import React, { useState } from 'react'
import _find from 'lodash/find'
import _findIndex from 'lodash/findIndex'
import Peer from 'peerjs'

import Conversations from '../../Components/Shared/Chat/ConversationList'
import Messages from '../../Components/Shared/Chat/MessageList'
import VideoPlayer from '../../Components/Shared/Chat/VideoPlayer'

import { useHTTP } from '../../tools/hooks/http'
import { BASE_URL, CONSULTANT, GET, HOST, PORT, SECURE } from '../../../config/routes'

import Loading from '../../Components/Loading'
import Error from '../../Components/Error'


const Chatroom = ({ customer, product }) => {
	const [loading, consultants, error] = useHTTP(BASE_URL + CONSULTANT + GET, [product])

	const [peer, setPeer] = useState(null)

	/*
		{
			id: 'consultant._id that is used inside peer.connect()',
			connection: 'connection from peer.connect()',
			consultant: 'consultant object',
			?messages: [{
				author: 'id of message owner',
				message: 'data of message',
				timestamp: 'date of message'
			}]
		}
	*/
	const [currentConversation, setCurrentConversation] = useState(null)
	const [isStreaming, setIsStreaming] = useState(false)


	/**
	 * An array of 'currentConversation' objects
	 */
	const [data, setData] = useState([])

	const startChat = (consultant) => {
		if (currentConversation && currentConversation.id === consultant._id) return

		if (currentConversation) {
			const index = _findIndex(data, { id: currentConversation.id })
			if (index !== -1) {
				const newData = [...data]
				newData.splice(index, 1, currentConversation)

				setData(newData)
			}
			else setData([...data, currentConversation])
		}

		let conversation = _find(data, { id: consultant._id })
		if (!conversation) {
			// const peer = new Peer(customer._id, { host: HOST, port: PORT, secure: true, key: 'peerjs', debug: 3 })
			const peer = new Peer(customer._id, {
				host: HOST, port: PORT, secure: SECURE, path: '/p2p', config: {
					'iceServers': [
						{ url: 'stun:stun1.l.google.com:19302' },
						{
							url: 'turn:numb.viagenie.ca',
							credential: 'muazkh',
							username: 'webrtc@live.com'
						}
					]
				}
			})

			const connection = peer.connect(consultant._id)

			console.log(`[p2p sender - ${customer._id}] Connection to ${consultant._id}`)

			conversation = {
				id: consultant._id,
				connection: connection,
				consultant: consultant,
				messages: []
			}

			connection.on('open', () => console.log('opened'))

			connection.on('data', message => {
				setCurrentConversation(prevState => ({
					...prevState,
					messages: [...prevState.messages, {
						author: consultant._id,
						message: message,
						timestamp: new Date().getTime()
					}]
				}))
			})

			//video setup
			peer.on('call', call => {
				navigator.getUserMedia({ audio: true, video: true },
					myStream => call.answer(myStream),
					error => console.log(error)
				)

				call.on('stream', stream => {
					const video = document.getElementById('peer-camera')
					video.srcObject = stream
					video.play()

					setIsStreaming(true)
				})
			})

			setPeer(peer)
		}

		setCurrentConversation(conversation)
	}

	const [message, setMessage] = useState('')
	const handleMessageInput = ({ target }) => {
		setMessage(target.value)
	}

	const sendMessage = () => {
		const conn = currentConversation.connection
		conn.send(message)

		setMessage('')

		setCurrentConversation({
			...currentConversation,
			messages: [...currentConversation.messages, {
				author: customer._id,
				message: message,
				timestamp: new Date().getTime()
			}]
		})
	}


	const startCall = () => {
		navigator.getUserMedia({ audio: true, video: true },
			myStream => {
				const call = peer.call(currentConversation.id, myStream)

				call.on('stream', stream => {
					const video = document.getElementById('peer-camera')
					video.srcObject = stream
					video.play()

					setIsStreaming(true)
				})
			},
			error => console.error(error)
		)
	}

	return (
		<div className='messenger'>
			<div className='scrollable sidebar'>
				{loading ? <Loading /> :
					error ? <Error /> :
						<Conversations
							conversations={consultants}
							setSelectedConversation={startChat}
							isConsultant={true}
						/>
				}
			</div>

			<div className='scrollable content'>
				{currentConversation &&
					<Messages
						data={currentConversation.messages}
						currentConversation={currentConversation.consultant}
						currentUser={customer._id}
						handleMessageInput={handleMessageInput}
						message={message}
						sendMessage={sendMessage}
						startCall={startCall}
					/>
				}
			</div>

			<VideoPlayer isStreaming={isStreaming}/>
		</div>
	)
}


export default Chatroom