import React, { useState, useEffect } from 'react'
import _find from 'lodash/find'
import _findIndex from 'lodash/findIndex'
import _last from 'lodash/last'
import axios from 'axios'
import Peer from 'peerjs'

import Conversations from '../../Components/Shared/Chat/ConversationList'
import Messages from '../../Components/Shared/Chat/MessageList'

import { BASE_URL, CONSULTANT, PATCH, CHAT, CUSTOMER, GET, HOST } from '../../../config/routes'


const Chatroom = ({ consultant }) => {
	const [peer, setPeer] = useState(null)
	const [peerSettings, setPeerSettings] = useState({
		allowAudio: true,
		allowVideo: true
	})

	/*
		{
			id: 'customer._id that is used inside peer.connect()',
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

	/**
	 * Add new message (1) from peer user
	 */
	useEffect(() => {
		if (currentConversation) {
			const newData = _find(data, { id: currentConversation.id })
			if (newData && newData.messages && newData.messages.length > 0) {
				if (!_find(currentConversation.messages, _last(newData.messages))) {
					setCurrentConversation({
						...currentConversation,
						messages: [...currentConversation.messages, _last(newData.messages)]
					})
				}
			}
		}
	}, [data])

	useEffect(() => {
		const peer = new Peer(consultant._id, { host: HOST, port: 8080, path: '/p2p' })

		// chat setup
		peer.on('connection', conn => {
			console.log(`[p2p receiver - ${consultant._id}] Connection from ${conn.peer}`)

			axios.get(BASE_URL + CUSTOMER + GET + conn.peer)
				.then(res => {
					const customer = res.data.data


					setData(prevState => ([
						...prevState, {
							id: conn.peer,
							customer: customer,
							connection: conn,
							messages: []
						}
					]))
				})

			conn.on('data', message => {
				setData(prevState => (
					prevState.map(conversation => {
						if (conversation.id !== conn.peer) return conversation

						return {
							...conversation,
							messages: [...conversation.messages, {
								author: conn.peer,
								message: message,
								timestamp: new Date().getTime()
							}]
						}
					})
				))
			})
		})

		//video setup
		if (peerSettings.allowAudio && peerSettings.allowVideo) {
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
		}

		peer.on('error', console.log)

		axios.patch(BASE_URL + CONSULTANT + PATCH + `${consultant._id}/` + CHAT, {
			id: consultant._id,
			...peerSettings
		})
			.then(res => console.log(res))
			.catch(err => console.log(err.response))

		setPeer(peer)

		return () => peer.disconnect()
	}, [peerSettings])


	const startChat = customer => {
		if (currentConversation && currentConversation.id === customer._id) return

		if (currentConversation) {
			const index = _findIndex(data, { id: currentConversation.id })
			if (index !== -1) {
				const newData = [...data]
				newData.splice(index, 1, currentConversation)

				setData(newData)
			}
			else setData([...data, currentConversation])
		}

		const conversation = _find(data, { id: customer._id })
		setCurrentConversation(conversation)
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
				author: consultant._id,
				message: message,
				timestamp: new Date().getTime()
			}]
		})
	}

	const handlePeerSettings = () => {

	}

	return (
		<div className='messenger'>
			<div className='scrollable sidebar'>
				{data.length > 0 &&
					<Conversations
						conversations={data.map(conversation => conversation.customer)}
						setSelectedConversation={startChat}
						isConsultant={false}
					/>
				}
			</div>

			<div className='scrollable content'>
				{currentConversation &&
					<Messages
						data={currentConversation.messages}
						currentConversation={currentConversation.customer}
						currentUser={consultant._id}
						handleMessageInput={handleMessageInput}
						message={message}
						sendMessage={sendMessage}
						startCall={startCall}
					/>
				}
			</div>
			{/* 
            <div className='video-wrapper'>
                <div className="text-center">
                    <video id="my-camera" width="300" height="300" autoPlay="autoplay" muted={true} className="mx-auto d-block"></video>
                    <span className="label label-info">You</span>
                </div>

                <div className="text-center">
                    <video id="peer-camera" width="300" height="300" autoPlay="autoplay" className="mx-auto d-block"></video>
                    <span className="label label-info" id="connected_peer"></span>
                </div>
            </div> */}

		</div>
	)
}


export default Chatroom