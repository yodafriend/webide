/** @jsxImportSource @emotion/react */
import 'twin.macro';
import { Terminal } from 'xterm';
import 'xterm/css/xterm.css';
import { useEffect, useRef } from 'react';
import SockJS from 'sockjs-client';
import useAuthStore from '../auth/authStore';

function WebTerminal(props) {
  const { token } = useAuthStore();
  const { projectId } = props;
  const terminalRef = useRef(null);
  const terminal = new Terminal();

  const socket = new SockJS('http://localhost:8080/api/v1/terminal', null, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  useEffect(() => {
    terminal.open(terminalRef.current);

    socket.onopen = () => {
      socket.send(JSON.stringify({ projectId: `${projectId}` }));
      socket.send('\n');
    };

    socket.onmessage = (e) => {
      terminal.write(e.data);
    };

    terminal.onData((data) => {
      const code = data.charCodeAt(0);
      // ctrl + c
      if (code === 3) {
        socket.send('SIGINT');
        return;
      }

      // ctrl + z
      if (code === 26) {
        socket.send('SIGTSTP');
        return;
      }

      // backspace
      if (code === 127) {
        socket.send('\b');
        return;
      }

      // esc key
      if (code === 27 && data.length === 1) {
        socket.send('\x1B');
        return;
      }

      // up key
      if (code === 27 && data.includes('[A')) {
        socket.send('\x1b[A');
        return;
      }

      // down key
      if (code === 27 && data.includes('[B')) {
        socket.send('\x1b[B');
        return;
      }

      // right key
      if (code === 27 && data.includes('[C')) {
        socket.send('\x1b[C');
        return;
      }

      // left key
      if (code === 27 && data.includes('[D')) {
        socket.send('\x1b[D');
        return;
      }

      // vi up key
      if (code === 27 && data.includes('OA')) {
        socket.send('\x1bOA');
        return;
      }

      // vi down key
      if (code === 27 && data.includes('OB')) {
        socket.send('\x1bOB');
        return;
      }

      // vi right key
      if (code === 27 && data.includes('OC')) {
        socket.send('\x1bOC');
        return;
      }

      // vi left key
      if (code === 27 && data.includes('OD')) {
        socket.send('\x1bOD');
        return;
      }

      // tab
      if (code === 9) {
        socket.send('\t');
        return;
      }

      // 모든 입력 데이터를 서버로 전송
      socket.send(data);
    });

    return () => {
      terminal.dispose();
      socket.close();
    };
  }, []);

  return <div ref={terminalRef} tw="h-64 bg-black text-white" />;
}

export default WebTerminal;
