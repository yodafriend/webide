import React, { useState, useRef } from 'react';
import { Client } from '@stomp/stompjs';

function ChatPage() {
    const [connected, setConnected] = useState(false);
    const [messages, setMessages] = useState([]);

    const roomIdRef = useRef(null);
    const projectIdRef = useRef(null);
    const nameRef = useRef(null);
    const messageRef = useRef(null);

    const stompClient = new Client({
        brokerURL: "ws://localhost:8080/ws-stomp"
    });

    stompClient.onConnect = frame => {
        setConnected(true);
        console.log('Connected:', frame);
    };

    stompClient.onWebSocketError = error => {
        console.error('Error with websocket', error);
    };

    stompClient.onStompError = frame => {
        console.error('Broker reported error:', frame.headers.message);
        console.error('Additional details:', frame.body);
    };

    const connect = () => {
        stompClient.activate();
    };

    const disconnect = () => {
        stompClient.deactivate();
        setConnected(false);
        console.log("Disconnected");
    };

    const sendName = () => {
        const roomUrl = `/sub/chat/room/${roomIdRef.current.value}`;
        stompClient.subscribe(roomUrl, chatDto => {
            const parsedMessage = JSON.parse(chatDto.body).message;
            setMessages(prevMessages => [...prevMessages, parsedMessage]);
            console.log(parsedMessage);
        });

        stompClient.publish({
            destination: "/pub/chat/enterUserTest",
            body: JSON.stringify({
                'type': 'ENTER',
                'projectId': projectIdRef.current.value,
                'roomId': roomIdRef.current.value,
                'sender': nameRef.current.value,
                'time': "오후 3:00"
            })
        });
    };

    const sendMsg = () => {
        stompClient.publish({
            destination: "/pub/chat/sendMessageTest",
            body: JSON.stringify({
                'type': 'TALK',
                'projectId': projectIdRef.current.value,
                'roomId': roomIdRef.current.value,
                'sender': nameRef.current.value,
                'message': messageRef.current.value,
                'time': "오후 3:00"
            })
        });
    };

    return (
        <div id="main-content" className="container">
                        <div className="row">
                <div className="col-md-6">
                    <form className="form-inline">
                        <div className="form-group">
                            <label htmlFor="connect">WebSocket connection:</label>
                            <button id="connect" className="btn btn-default" type="submit" onClick={connect} disabled={connected}>Connect</button>
                            <button id="disconnect" className="btn btn-default" type="submit" onClick={disconnect} disabled={!connected}>Disconnect</button>
                        </div>
                    </form>
                </div>
                <div className="col-md-6">
                    <form className="form-inline">
                        <div className="form-group">
                            <input type="text" ref={nameRef} className="form-control" placeholder="이름" />
                            <input type="text" ref={roomIdRef} className="form-control" placeholder="채팅방id" />
                            <input type="text" ref={projectIdRef} className="form-control" placeholder="프로젝트 uuid" />
                        </div>
                        <button type="button" className="btn btn-default" onClick={sendName}>채팅방 입장하기</button>
                    </form>
                    <form className="form-inline">
                        <div className="form-group">
                            <label htmlFor="message">메세지 전송</label>
                            <input type="text" id = "message " ref={messageRef} className="form-control" placeholder="메세지" />
                        </div>
                        <button type="button" className="btn btn-default" onClick={sendMsg}>전송하기</button>
                    </form>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Greetings</th>
                            </tr>
                        </thead>
                        <tbody>
                            {messages.map((message, index) => (
                                <tr key={index}>
                                    <td>{message}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default ChatPage;