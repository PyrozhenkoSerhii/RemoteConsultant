import React, { useState, useContext } from 'react'
import _find from 'lodash/find'
import _findIndex from 'lodash/findIndex'
import _uniqBy from 'lodash/uniqBy'
import Peer from 'peerjs'
import axios from 'axios'
import { withAlert } from 'react-alert'

import Conversations from '../../Components/Shared/Chat/ConversationList'
import Messages from '../../Components/Shared/Chat/MessageList'
import VideoPlayer from '../../Components/Shared/Chat/VideoPlayer'
import PopupComponent from '../../Components/Shared/Popup'

import { useHTTP } from '../../tools/hooks/http'
import { buildUrl } from '../../tools/functions/query'
import { BASE_URL, CONSULTANT, GET, HOST, PORT, SECURE, CONSULTATION, POST } from '../../../config/routes'

import Loading from '../../Components/Loading'
import Redirect from '../../Components/Redirect'
import Error from '../../Components/Error'
import productContext from '../../tools/state/context/product-context';


const Chatroom = ({ customer, product, alert }) => {
	const context = useContext(productContext)

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

	const closeConversation = () => {
		const conn = currentConversation.connection

		conn.close()
		setCurrentConversation(null)
		setData(prevData => prevData.map(connection => {
			if (connection.id !== currentConversation.connection.id) return connection
		}))

		const video = document.getElementById('peer-camera')
		video.pause()
		setIsStreaming(false)

		setActivePopup({
			type: 'consultation',
			conversationData: currentConversation,
			title: 'Please, assess our consultant',
			structure: [
				{
					name: 'competence',
					label: 'Competence (1-5)',
					type: 'number',
					icon: 'clipboard'
				},
				{
					name: 'friendliness',
					label: 'Friendliness (1-5)',
					type: 'number',
					icon: 'clipboard'
				},
				{
					name: 'note',
					label: 'Note',
					type: 'textarea',
					icon: 'edit'
				}
			]
		})
	}

	const [activePopup, setActivePopup] = useState(null)
	const [redirect, setRedirect] = useState(null)
	const [popupData, setPopupData] = useState({})

	const handlePopupUpdate = ({ target }) => {
		setPopupData({ ...popupData, [target.name]: target.value })
	}

	const submitPopupHandler = () => {
		if (activePopup.type === 'consultation') {
			const product = context.product && context.product._id ? context.product._id : 'none'

			const data = {
				customer: customer._id,
				consultant: activePopup.conversationData.consultant._id,
				product: product,
				alternative: null,
				messages: activePopup.conversationData.messages,
				survey: {
					competence: popupData.competence,
					friendliness: popupData.friendliness,
					note: popupData.note,
				}
			}

			axios.post(BASE_URL + CONSULTATION + POST, data)
				.then(res => {
					alert.success('Thank you for your cooperation')
					console.log(res.data.data)
				})
				.catch(err => console.log(err.response.data.error))
		} else {
			setRedirect(`${product.website}/${product._id}`)
		}

		setActivePopup(null)
	}

	const handlePopup = type => setActivePopup(type)


	const handleOrderPopup = product => {
		axios.get(buildUrl(BASE_URL + CONSULTATION + GET, null, { product: product._id, customer: customer._id }))
			.then(res => {
				const consultants = res.data.data.map(consultation => {
					return { value: consultation.consultant._id, label: consultation.consultant.fullname }
				})

				setActivePopup({
					type: 'order',
					title: `Ordering ${product.title} Redirect to: ${product.company.website}/${product._id}`,
					structure: [
						{
							name: 'count',
							label: 'Quantity',
							type: 'number',
							icon: 'list-ol'
						},
						{
							name: 'consultant',
							label: 'The most useful consultant',
							type: 'select',
							options: _uniqBy(consultants, 'value')
						}
					]
				})
			})
			.catch(err => console.log(err.response))
	}


	if(redirect){
		return <Redirect to={redirect}/>
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
							selectedConversation={currentConversation}
							closeConversation={closeConversation}
							handleOrderPopup={handleOrderPopup}
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

			<VideoPlayer isStreaming={isStreaming} />

			{activePopup && <PopupComponent
				title={activePopup.title}
				structure={activePopup.structure}
				formData={popupData}
				handleUpdate={handlePopupUpdate}
				handleSubmit={submitPopupHandler}
				handlePopup={handlePopup}
			/>}



		</div>
	)
}


export default withAlert()(Chatroom)