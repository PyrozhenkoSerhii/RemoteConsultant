import React, { useState, useEffect } from 'react'
import _find from 'lodash/find'
import axios from 'axios'
import Peer from 'peerjs'

import Conversations from '../../Components/Shared/Chat/ConversationList'
import Messages from '../../Components/Shared/Chat/MessageList'

import { useHTTP } from '../../tools/hooks/http'
import { BASE_URL, CONSULTANT, PATCH, CHAT } from '../../../config/routes'

import Loading from '../../Components/Loading'
import Error from '../../Components/Error'



const Chatroom = ({ consultant }) => {
    const [peer, setPeer] = useState(null)
    const [connections, setConnections] = useState([])
    const [peerSettings, setPeerSettings] = useState({
        allowAudio: true,
        allowVideo: true
    })

    useEffect(() => {
        const peer = new Peer(consultant._id, { host: 'localhost', port: 8080, path: '/p2p' })
        console.log('peer', peer)

        peer.on('open', id => console.log(id))
        
        peer.on('connection', conn => {
            console.log('newConn:', conn)
            setConnections([...connections, conn])

            conn.on('data', data => {
                console.log(data)
            })
        })

        peer.on('error', console.log)

        axios.patch(BASE_URL + CONSULTANT + PATCH + `${consultant._id}/` + CHAT, {
            id: consultant._id,
            ...peerSettings
        })
            .then(res => console.log(res))
            .catch(err => console.log(err.response))

        setPeer(peer)
    }, [])

    const [selectedConversation, setSelectedConversation] = useState({})
    const [messages, setMessages] = useState([])


    return (
        <div className='messenger'>
            <p>Test</p>
            {/* <div className='scrollable sidebar'>
                {loading ? <Loading /> :
                    error ? <Error /> :
                        <Conversations
                            conversations={consultants}
                            setSelectedConversation={setSelectedConversation}
                        />
                }
            </div>

            <div className='scrollable content'>
                <Messages
                    data={_find(messages, { chat: selectedConversation._id }) || []}
                    selectedConversation={selectedConversation}
                    currentUser={participant._id}
                />
            </div> */}
        </div>
    )
}


export default Chatroom