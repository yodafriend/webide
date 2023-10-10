/** @jsxImportSource @emotion/react */
import 'twin.macro';
import { Terminal } from 'xterm';
import { useEffect, useRef } from 'react';
import SockJS from 'sockjs-client';
// import { AttachAddon } from 'xterm-addon-attach';
import useAuthStore from '../auth/authStore';

function WebTerminal() {
  const { token } = useAuthStore();
  console.log(token);
  const terminalRef = useRef(null);
  const terminal = new Terminal({
    cursorBlink: true,
  });

  const handleConnect = () => {
    const socket = new SockJS('http://localhost:8080/api/v1/terminal', null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    socket.onopen = () => {
      console.log('웹소켓 연결이 열렸습니다.open');
      socket.send(
        JSON.stringify({ projectId: 'd6811229-fd5f-4d69-ade8-98b64e33db2d' }),
      );
    };
  };

  useEffect(() => {
    handleConnect();
    terminal.open(terminalRef.current);

    const handleKeyPress = (e) => {
      terminal.write(e.key);
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      terminal.dispose();
    };
  }, []);

  return <div ref={terminalRef} tw="h-64 bg-black text-white" />;
}

export default WebTerminal;
