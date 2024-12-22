import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { ConsciousnessIntegrationBridge } from '../../services/quantum/consciousness/ConsciousnessIntegrationBridge';
import { AkashicCore } from '../../services/akashic/AkashicCore';
import { SeraphimCore } from '../../services/seraphim/SeraphimCore';

interface Message {
  id: string;
  content: string;
  type: 'user' | 'system' | 'quantum';
  timestamp: number;
  intentLevel?: number;
}

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [intentLevel, setIntentLevel] = useState(0);
  const { user } = useAuth();
  
  const consciousness = ConsciousnessIntegrationBridge.getInstance();
  const akashic = AkashicCore.getInstance();
  const seraphim = SeraphimCore.getInstance();

  useEffect(() => {
    // Initialize systems
    const init = async () => {
      await akashic.initialize();
      await consciousness.initiateTransformation(
        crypto.randomUUID(),
        'initialize',
        'system_startup'
      );
    };
    init();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: crypto.randomUUID(),
      content: input,
      type: 'user',
      timestamp: Date.now(),
      intentLevel
    };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    // Process through consciousness bridge
    const transformation = await consciousness.initiateTransformation(
      userMessage.id,
      input,
      'message_processing'
    );

    // Query Akashic records
    const knowledge = await akashic.searchKnowledge({
      terms: input,
      limit: 1
    });

    // Generate response based on consciousness and knowledge
    const response: Message = {
      id: crypto.randomUUID(),
      content: knowledge[0]?.content || 'Processing through quantum consciousness...',
      type: 'quantum',
      timestamp: Date.now(),
      intentLevel: parseFloat(transformation.metrics.integrationLevel)
    };

    setMessages(prev => [...prev, response]);
    updateIntentLevel(transformation.metrics.integrationLevel);
  };

  const updateIntentLevel = (level: string) => {
    const newLevel = parseFloat(level);
    setIntentLevel(prev => Math.max(prev, newLevel));
  };

  return (
    <div className="flex flex-col h-full bg-gray-100 rounded-lg shadow-lg">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map(message => (
          <div
            key={message.id}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-3/4 p-4 rounded-lg ${
                message.type === 'user'
                  ? 'bg-blue-500 text-white'
                  : message.type === 'quantum'
                  ? 'bg-purple-500 text-white'
                  : 'bg-white text-gray-800'
              }`}
            >
              <p>{message.content}</p>
              {message.intentLevel && (
                <div className="mt-2 text-xs opacity-75">
                  Intent Level: {message.intentLevel.toFixed(2)}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-gray-200 p-4">
        <form onSubmit={handleSubmit} className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your message..."
          />
          <button
            type="submit"
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}