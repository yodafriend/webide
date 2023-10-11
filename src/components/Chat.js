/** @jsxImportSource @emotion/react */
import 'twin.macro';
import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import useAuthStore from '../auth/authStore';
import CreateRoom from './CreateRoom';

let stompClient = '';

function ChatPage({ projectId, projectName }) {
  const { token } = useAuthStore();
  const email = useAuthStore((state) => state.email);
  const username = email.split('@')[0];
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [room, setRoom] = useState({
    projectId: '',
    roomId: '',
    roomName: '',
  });
  const inputRef = useRef(null);

  const showGreeting = (messageContent) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { id: Date.now(), content: messageContent },
    ]);
  };

  const onConnect = () => {
    console.log('connected with room id :', room.roomId);

    stompClient.subscribe(`/sub/chat/room/${room.roomId}`, (message) => {
      console.log('received', message);
      setMessages((prev) => {
        const updatedMessages = [...prev, JSON.parse(message.body)];
        console.log('Updated messages:', updatedMessages);
        return updatedMessages;
      });
    });

    stompClient.subscribe('/api/v1/chat/chatlist', (message) => {
      console.log('chat list', message);
      setMessages((prev) => [...prev, JSON.parse(message.body)]);
    });
  };

  const onError = (error) => {
    console.log({ error });
  };

  const handleConnect = () => {
    const socket = new SockJS('http://localhost:8080/ws-stomp', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    stompClient = Stomp.over(socket);

    stompClient.connect({}, onConnect, onError);
  };

  const handleJoinRoom = () => {
    if (stompClient && room.roomId) {
      const joinMessage = {
        type: 'ENTER',
        projectId: room.projectId,
        roomId: room.roomId,
        sender: username,
        time: new Date().toLocaleTimeString(),
      };
      stompClient.publish({
        destination: '/pub/chat/enterUser',
        body: JSON.stringify(joinMessage),
      });
    }
  };

  const handleLeaveRoom = () => {
    if (stompClient && room.roomId) {
      const leaveMessage = {
        type: 'LEAVE',
        roomId: room.roomId,
        sender: username,
        time: new Date().toLocaleTimeString(),
      };

      stompClient.publish({
        destination: '/chat/leaveRoom',
        body: JSON.stringify(leaveMessage),
      });
    }
  };

  const handleDisconnect = () => {
    handleLeaveRoom();
    if (stompClient) {
      stompClient.deactivate();
      stompClient = '';
      setMessages([]); // 메시지 초기화
    }
    console.log('방을 나갔습니다.');
  };

  const handleSendMessage = () => {
    if (stompClient) {
      const chat = {
        type: 'TALK',
        projectId: room.projectId,
        roomId: room.roomId,
        sender: username,
        message: currentMessage,
        time: new Date().toLocaleTimeString(),
      };
      showGreeting(currentMessage);
      stompClient.publish({
        destination: '/pub/chat/sendMessage',
        body: JSON.stringify(chat),
      });
      setCurrentMessage('');
    }
  };

  const handleMessageChange = (e) => {
    setCurrentMessage(e.target.value);
  };
  const handleRoomDataChange = (e) => {
    const { name, value } = e.target;
    setRoom((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <div tw="flex min-h-full flex-1 flex-col justify-center px-10 py-10 lg:px-10">
      <div tw="flex-grow">
        <div tw="flex items-center justify-between py-2">
          {' '}
          <CreateRoom
            setRoom={setRoom}
            projectUuid={projectId}
            projectName={projectName}
          />
          <span tw="mt-2 mr-4 text-gray-900"> {username}님 안녕하세요! </span>
        </div>
        <div tw="flex flex-wrap -mx-4" onSubmit={(e) => e.preventDefault()}>
          <div tw="w-1/2 px-4">
            <form tw="flex items-center" onSubmit={(e) => e.preventDefault()}>
              <button
                type="button"
                id="connect"
                tw="bg-gray-300 hover:bg-green-500 px-2 py-1 mr-2"
                onClick={handleConnect}
              >
                Connect
              </button>
              <button
                type="button"
                id="disconnect"
                tw="bg-gray-300 hover:bg-red-500 px-2 py-1"
                disabled={!stompClient}
                onClick={handleDisconnect}
              >
                Disconnect
              </button>
            </form>
          </div>
          <div tw="flex">
            <div tw="w-1/3 px-4 mr-auto">
              <form
                tw="flex items-center mb-4"
                onSubmit={(e) => e.preventDefault()}
              >
                <input
                  type="text"
                  id="name"
                  tw="px-2 py-1 border rounded mr-2"
                  placeholder="이름"
                  value={username}
                  readOnly
                />
                <input
                  type="text"
                  id="roomId"
                  tw="px-2 py-1 border rounded mr-2"
                  placeholder="채팅방id"
                  name="roomId"
                  value={room.roomId}
                  onChange={handleRoomDataChange}
                />
                <input
                  type="text"
                  id="projectId"
                  tw="px-2 py-1 border rounded mr-2"
                  placeholder="프로젝트 uuid"
                  name="projectId"
                  value={room.projectId}
                  onChange={handleRoomDataChange}
                />
                <button
                  id="Entrance"
                  type="button"
                  tw="bg-gray-300 hover:bg-gray-400 w-16 h-16"
                  onClick={handleJoinRoom}
                >
                  입장
                </button>
              </form>
            </div>
          </div>
        </div>

        <div tw="flex flex-wrap -mx-4 mt-4">
          <div tw="w-full px-4">
            <table id="conversation" tw="table-auto w-full border-collapse">
              <thead>
                <tr>
                  <th tw="border px-4 py-2 text-gray-900 bg-sky-200 rounded">
                    <img
                      src="/logo.png"
                      alt="Logo"
                      tw="w-6 h-auto mr-2 inline-block"
                    />
                    Chat
                  </th>
                </tr>
              </thead>
              <tbody id="greetings">
                {messages.map((message, index) => (
                  <tr key={`message.sender${message.sender}_${index}`}>
                    <td tw="border px-4 py-2 text-gray-900">
                      {message.message}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div tw="fixed mx-auto max-w-7xl bottom-0 left-0 right-0 bg-white p-4 border-t">
        <form
          tw="container mx-auto flex items-center"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="text"
            id="message"
            tw="px-2 py-1 border rounded mr-2 flex-grow text-gray-900"
            placeholder="메세지"
            ref={inputRef}
            value={currentMessage}
            onChange={handleMessageChange}
          />
          <button
            id="send"
            type="button"
            tw="bg-sky-500 hover:bg-sky-600 px-2 py-1 text-gray-900 rounded"
            onClick={handleSendMessage}
          >
            전송하기
          </button>
        </form>
      </div>
    </div>
  );
}

ChatPage.propTypes = {
  projectId: PropTypes.string.isRequired,
  projectName: PropTypes.string.isRequired,
};

export default ChatPage;
