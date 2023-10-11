/** @jsxImportSource @emotion/react */
import 'twin.macro';
import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import useAuthStore from '../../auth/authStore';


function CreateRoom({setRoom}) {
    const [isVisible,setIsVisible]=useState(true);
    const [roomName, setRoomName] = useState('');
    const [currentRoom,setCurrentRoom] = useState({});
    const {token, projectId} = useAuthStore();
    const handleRoomNameChange = (e) => {
        setRoomName(e.target.value);
    };


    const handleCreateRoom = async () => {
        try {
            const roomRequest = {
                projectId ,
                roomName,
            };
            const response = await axios.post('http://localhost:8080/api/v1/chat/createroom', roomRequest,{
                headers:{
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.status === 200) {
                console.log("Chat room created successfully:", response.data);
                setRoomName(''); 
                const newRoom = ({
                    projectId,
                    roomId: response.data.roomInfo.roomId,
                    roomName
                })
                setRoom(newRoom)
                setIsVisible(false);
                console.log("SetRoom:",setRoom.data)
                setCurrentRoom(newRoom);
                console.log("SetCurrentRoom:",setCurrentRoom)

            }
        } catch (error) {
            console.error("Failed to create a chat room:", error);
        }
    };
    console.log(currentRoom)
    CreateRoom.propTypes = {
        setRoom:PropTypes.func.isRequired
    };

    if (!isVisible) return null;
    return (
        <div>
            <div>
                <input type="text" placeholder="채팅방 이름 아무거나" value={roomName} onChange={handleRoomNameChange} />
                <button type='button' onClick={handleCreateRoom}>방 만들기</button>
            </div>
        </div>
    );
}

export default CreateRoom;
