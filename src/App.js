/** @jsxImportSource @emotion/react */
import 'twin.macro';
import React from 'react';

function TailDiv() {
  return <div tw="bg-black">hello</div>;
}

function App() {
  return (
    <div>
      <TailDiv />
      <div>Hello!</div>
      <p>hi!!</p>
    </div>
  );
}

export default App;
