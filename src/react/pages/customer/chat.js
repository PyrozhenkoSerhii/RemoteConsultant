import React, { useState, useContext } from 'react'
import _find from 'lodash/find'
import _findIndex from 'lodash/findIndex'
import _uniqBy from 'lodash/uniqBy'
import Peer from 'peerjs'
import axios from 'axios'
import { withAlert } from 'react-alert'
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBCard, MDBCardBody, MDBInput, MDBIcon } from 'mdbreact'


import Conversations from '../../Components/Shared/Chat/ConversationList'
import Messages from '../../Components/Shared/Chat/MessageList'
import VideoPlayer from '../../Components/Shared/Chat/VideoPlayer'
import PopupComponent from '../../Components/Shared/Popup'

import { useHTTP } from '../../tools/hooks/http'
import { buildUrl } from '../../tools/functions/query'
import { BASE_URL, CONSULTANT, GET, HOST, PORT, SECURE, LIST, CONSULTATION, POST, ORDER, CUSTOMER } from '../../../config/routes'

import Loading from '../../Components/Loading'
import Redirect from '../../Components/Redirect'
import Error from '../../Components/Error'
import productContext from '../../tools/state/context/product-context';


const Chatroom = ({ customer, product, alert }) => {
  const [quotaLoading, quota, quotaError] = useHTTP(`${BASE_URL}customer/list/${customer._id}/quota`, [customer]);

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


  /**
   * Payment dialog
   */
  const [paymentDialog, setPaymentDialog] = useState(false);
  const [paymentProceeding, setPaymentProceeding] = useState(false);
  const [paymentCallback, setPaymentCallback] = useState(null);
  const [paidConsultation, setPaidConsultation] = useState(false);

  const [paymentData, setPaymentData] = useState({
    nameOnCard: customer?.paymentInfo?.nameOnCard || "",
    address: customer?.paymentInfo?.address || "",
    cardNumber: customer?.paymentInfo?.cardNumber || "",
    cardExp: customer?.paymentInfo?.cardExp || "",
    cardCVV: "",
    saveInfo: true,
  });

  const onPaymentDataUpdate = ({ target }) => {
    if (target.name === 'saveInfo') {
      setPaymentData((prevData) => ({
        ...prevData,
        saveInfo: !prevData.saveInfo
      }))
    } else {
      setPaymentData({ ...paymentData, [target.name]: target.value })
    }
  }

  const onPaymentSubmit = (e) => {
    e.preventDefault();
    setPaymentProceeding(true)
    axios.post(`${BASE_URL}${CUSTOMER}list/${customer._id}/payment`, paymentData)
      .then(res => {
        setPaymentProceeding(false)
        setPaymentDialog(false)
        setPaidConsultation(true);

        alert.success('Thank you for your payment. You can proceed to consultation now')

        startChat(paymentCallback, true)
      })
      .catch(err => {
        setPaymentProceeding(false);

        alert.success('Something went wrong while payment')
      })
  }


  const startChat = (consultant, successfullPayment) => {
    if (quota === 0 && !successfullPayment) {
      setPaymentDialog(true)
      setPaymentCallback(consultant)
      return
    }

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

  const submitPopupHandler = e => {
    e.preventDefault();
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
        },
        paidConsultation,
      }

      setPaidConsultation(false);

      axios.post(BASE_URL + CONSULTATION + POST, data)
        .then(res => {
          alert.success('Thank you for your cooperation')
          console.log(res.data.data)
        })
        .catch(err => console.log(err.response.data.error))
    } else {
      // ordering item
      axios.post(buildUrl(BASE_URL + ORDER + POST), {
        customer: customer._id,
        consultant: popupData.consultant,
        product: context.product && context.product._id ? context.product._id : 'none',
        quantity: Number(popupData.count),
        sum: context.product.price * Number(popupData.count),
      }).then(res => {
        console.log(res);
        setRedirect(`${context.product.company.website}/${context.product._id}`)
      }).catch(err => console.log(err.response.data.error))

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


  if (redirect) {
    return <Redirect url={redirect} />
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

      {paymentDialog && (
        <div className='popup-wrapper'>
          <div className='popup-body'>
            <MDBContainer>
              <MDBRow>
                <MDBCol xl='3' />
                <MDBCol md='6'>
                  <MDBCard>
                    <MDBCardBody>
                      <form onSubmit={onPaymentSubmit}>
                        <p className='h2 text-center py-4'>Consultation payment</p>

                        <MDBInput
                          label='Name on the card'
                          icon='user'
                          group
                          type='text'
                          name='nameOnCard'
                          value={paymentData.nameOnCard}
                          onChange={onPaymentDataUpdate}
                        />

                        <MDBInput
                          label='Address'
                          icon='address-card'
                          group
                          type='text'
                          name='address'
                          value={paymentData.address}
                          onChange={onPaymentDataUpdate}
                        />

                        <MDBInput
                          label='Card Number'
                          icon='credit-card'
                          group
                          type='number'
                          name='cardNumber'
                          value={paymentData.cardNumber}
                          onChange={onPaymentDataUpdate}
                        />

                        <MDBInput
                          label='Expires At '
                          icon='calendar-alt'
                          group
                          type='text'
                          name='cardExp'
                          value={paymentData.cardExp}
                          onChange={onPaymentDataUpdate}
                        />


                        <MDBInput
                          label='CVV'
                          icon='barcode'
                          group
                          type='number'
                          name='cardCVV'
                          value={paymentData.cardCVV}
                          onChange={onPaymentDataUpdate}
                        />

                        <div className="custom-control custom-checkbox">
                          <input type="checkbox" className="custom-control-input" id="defaultUnchecked" name="saveInfo" checked={paymentData.saveInfo} onChange={onPaymentDataUpdate} />
                          <label className="custom-control-label" htmlFor="defaultUnchecked">Save billing info</label>
                        </div>

                        <div className='text-center py-2 mt-3'>
                          <MDBBtn
                            color={paymentProceeding ? 'warning' : 'primary'}
                            type='submit'
                            disabled={paymentProceeding}
                          ><MDBIcon icon="dollar-sign" className="icon-white" font="white" />{paymentProceeding ? "Proceeding..." : "Pay $0.99"}</MDBBtn>
                          <MDBBtn color='danger' type='button' onClick={() => setPaymentDialog(false)}>Cancel</MDBBtn>
                        </div>
                      </form>
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>
              </MDBRow>
            </MDBContainer>
          </div>
        </div>
      )}



    </div>
  )
}


export default withAlert()(Chatroom)