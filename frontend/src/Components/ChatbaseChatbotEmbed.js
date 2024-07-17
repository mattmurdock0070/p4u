// ChatbaseChatbotEmbed.jsx

import React, { useEffect } from 'react';

const ChatbaseChatbotEmbed = () => {
  useEffect(() => {
    // Create a script element
    const script = document.createElement('script');
    script.src = 'https://www.chatbase.co/embed.min.js';
    script.setAttribute('chatbotId', 'xRspk29JJ9TNMJbeYpUR-');
    script.setAttribute('domain', 'www.chatbase.co');
    script.defer = true;

    // Append the script to the body
    document.body.appendChild(script);

    // Clean up function to remove the script on unmount (optional)
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return null; // No need to render anything here, as scripts handle embedding
};

export default ChatbaseChatbotEmbed;
