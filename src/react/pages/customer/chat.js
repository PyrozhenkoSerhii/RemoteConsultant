import React, { useState } from 'react'
import _find from 'lodash/find'
import _findIndex from 'lodash/findIndex'
import Peer from 'peerjs'

import Conversations from '../../Components/Shared/Chat/ConversationList'
import Messages from '../../Components/Shared/Chat/MessageList'

import { useHTTP } from '../../tools/hooks/http'
import { BASE_URL, CONSULTANT, GET, HOST, PORT } from '../../../config/routes'

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
			const peer = new Peer(customer._id, { host: HOST, port: PORT, secure: true, key: 'peerjs' })
			const connection = peer.connect(consultant._id)

			console.log(`[p2p sender - ${customer._id}] Connection to ${consultant._id}`)

			conversation = {
				id: consultant._id,
				connection: connection,
				consultant: consultant,
				messages: []
			}

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
					myStream => {
						call.answer(myStream)

						const myVideo = document.getElementById('my-camera')
						myVideo.srcObject = myStream
						myVideo.play()
					},
					error => console.log(error)
				)

				call.on('stream', stream => {
					const video = document.getElementById('peer-camera')
					video.srcObject = stream
					video.play()
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
				})

				const myVideo = document.getElementById('my-camera')
				myVideo.srcObject = myStream
				myVideo.play()
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

			{/* <div className='video-wrapper'>
				<div className="text-center">
					<video id="my-camera" width="300" height="300" autoPlay="autoplay" muted={true} className="mx-auto d-block"></video>
					<span className="label label-info">You</span>
				</div>

				<div className="text-center">
					<video id="peer-camera" width="300" height="300" autoPlay="autoplay" className="mx-auto d-block"></video>
					<span className="label label-info" id="connected_peer">Other</span>
				</div>
			</div> */}
		</div>
	)
}


export default Chatroom