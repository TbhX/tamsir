import { useState, useEffect, useRef } from 'react';
import { Send, Paperclip, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';
import { supabase } from '../../lib/supabase';
import { useClientStore } from '../../stores/clientStore';
import { useDropzone } from 'react-dropzone';

interface Message {
  id: string;
  content: string;
  sender: 'client' | 'admin';
  timestamp: Date;
  attachments?: { name: string; url: string }[];
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [uploading, setUploading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useClientStore();

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({
    onDrop: async (files) => {
      if (!user) return;
      setUploading(true);
      
      try {
        const uploadedFiles = await Promise.all(
          files.map(async (file) => {
            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random()}.${fileExt}`;
            const filePath = `chat/${user.id}/${fileName}`;

            const { error: uploadError } = await supabase.storage
              .from('attachments')
              .upload(filePath, file);

            if (uploadError) throw uploadError;

            const { data: { publicUrl } } = supabase.storage
              .from('attachments')
              .getPublicUrl(filePath);

            return {
              name: file.name,
              url: publicUrl
            };
          })
        );

        const message: Message = {
          id: Date.now().toString(),
          content: 'Fichiers partagés',
          sender: 'client',
          timestamp: new Date(),
          attachments: uploadedFiles
        };

        setMessages(prev => [...prev, message]);
      } catch (error) {
        console.error('Error uploading files:', error);
      } finally {
        setUploading(false);
      }
    },
    accept: {
      'image/*': [],
      'application/pdf': [],
      'application/zip': [],
      'application/x-zip-compressed': []
    }
  });

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() && acceptedFiles.length === 0) return;

    const message: Message = {
      id: Date.now().toString(),
      content: newMessage,
      sender: 'client',
      timestamp: new Date()
    };

    setMessages([...messages, message]);
    setNewMessage('');
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] max-w-3xl mx-auto bg-white rounded-lg shadow-sm">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold text-slate-900">Discussion du Projet</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`flex ${message.sender === 'client' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[70%] rounded-lg p-3 ${
                  message.sender === 'client'
                    ? 'bg-blue-900 text-white'
                    : 'bg-slate-100 text-slate-900'
                }`}
              >
                <p>{message.content}</p>
                {message.attachments && (
                  <div className="mt-2 space-y-1">
                    {message.attachments.map((file, index) => (
                      <a
                        key={index}
                        href={file.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-sm underline hover:no-underline"
                      >
                        {file.name}
                      </a>
                    ))}
                  </div>
                )}
                <p className="text-xs mt-1 opacity-70">
                  {format(new Date(message.timestamp), 'HH:mm')}
                </p>
              </div>
            </motion.div>
          ))}
          <div ref={messagesEndRef} />
        </AnimatePresence>
      </div>

      <form onSubmit={sendMessage} className="p-4 border-t">
        <div {...getRootProps()} className="mb-4">
          <input {...getInputProps()} />
          {isDragActive ? (
            <div className="p-4 border-2 border-dashed border-blue-300 rounded-lg text-center text-slate-600">
              Déposez les fichiers ici...
            </div>
          ) : (
            <div className="p-4 border-2 border-dashed border-slate-300 rounded-lg text-center text-slate-600 cursor-pointer hover:border-blue-300 transition-colors">
              <Paperclip className="h-5 w-5 mx-auto mb-2" />
              Cliquez ou déposez des fichiers ici
            </div>
          )}
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Tapez votre message..."
            className="flex-1 rounded-lg border-slate-300 focus:border-blue-500 focus:ring-blue-500 text-slate-900"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={uploading}
            className="px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="h-5 w-5" />
          </motion.button>
        </div>
      </form>
    </div>
  );
}