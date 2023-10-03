import { Terminal } from 'xterm';
import 'xterm/css/xterm.css';
import React, { useEffect, useRef } from 'react';

function WebTerminal() {
  const terminalRef = useRef(null);

  useEffect(() => {
    const terminal = new Terminal();
    terminal.open(terminalRef.current);

    // You can customize the terminal here, e.g., change colors, fonts, etc.

    // Attach event listeners, handle input, and send output to the terminal

    // Clean up the terminal on unmount
    return () => {
      terminal.dispose();
    };
  }, []);

  return <div ref={terminalRef} style={{ overflow: "hidden" }} />;
}

export default WebTerminal;
