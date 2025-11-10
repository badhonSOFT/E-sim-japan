import { useState } from 'react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function ExpandableChatDemo() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    
    const userMessage = { role: 'user' as const, content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
      
      if (!apiKey) {
        throw new Error('OpenAI API key not found. Please check your .env file.');
      }
      
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [...messages, userMessage],
          max_tokens: 150
        })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || `HTTP ${response.status}`);
      }
      
      const data = await response.json();
      const aiMessage = { role: 'assistant' as const, content: data.choices[0].message.content };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      const errorMsg = error instanceof Error ? error.message : 'Unknown error';
      setMessages(prev => [...prev, { role: 'assistant', content: `Error: ${errorMsg}` }]);
    }
    setLoading(false);
  };

  return (
    <div className="fixed bottom-4 right-4">
      <div className={`bg-white rounded-lg shadow-lg transition-all duration-300 ${
        isExpanded ? 'w-80 h-96' : 'w-16 h-16'
      }`}>
        {isExpanded ? (
          <div className="p-4 h-full flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold">Chat</h3>
              <button 
                onClick={() => setIsExpanded(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <div className="flex-1 bg-gray-50 rounded p-2 mb-4 overflow-y-auto">
              {messages.length === 0 ? (
                <p className="text-sm text-gray-600">Start a conversation...</p>
              ) : (
                messages.map((msg, i) => (
                  <div key={i} className={`mb-2 p-2 rounded text-sm ${
                    msg.role === 'user' ? 'bg-blue-100 ml-4' : 'bg-white mr-4'
                  }`}>
                    {msg.content}
                  </div>
                ))
              )}
              {loading && <div className="text-sm text-gray-500">Typing...</div>}
            </div>
            <div className="flex gap-2">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Type a message..."
                className="flex-1 p-2 border rounded"
                disabled={loading}
              />
              <button 
                onClick={sendMessage}
                disabled={loading || !input.trim()}
                className="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
              >
                Send
              </button>
            </div>
          </div>
        ) : (
          <button 
            onClick={() => setIsExpanded(true)}
            className="w-full h-full bg-blue-500 text-white rounded-lg flex items-center justify-center hover:bg-blue-600"
          >
            💬
          </button>
        )}
      </div>
    </div>
  );
}