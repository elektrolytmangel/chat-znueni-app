import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './App.css';
import ApiKeyInput from './components/api-key-input/ApiKeyInput';
import ChatInput from './components/chat-input/ChatInput';
import ChatMessages from './components/chat-messages/ChatMessages';
import RoleSelector from './components/role-selector/RoleSelector';
import './i18n/i18n';
import { AiRole, ChatHistory, roles } from './model/app';

const App = () => {
  const { t } = useTranslation();
  const [role, setRole] = useState<AiRole>(roles[0]);
  const [chat, setChat] = useState<ChatHistory[]>([]);

  const appendToChat = (c: ChatHistory) => {
    setChat(s => [...s, c]);
  }

  return (
    <div id="app" className="container-fluid align-items-end vh-100 d-grid" >
      <div className="position-absolute top-0 end-0 p-2 d-flex gap-2">
        <RoleSelector setRole={setRole} />
        <ApiKeyInput />
      </div>
      <h1 className='text-center'>{t('welcome')}</h1>
      <div className='overflow-y-auto overflow-x-hidden d-flex flex-column-reverse'>
        <ChatMessages chatHistory={chat} />
      </div>
      <div className='row gap-2 p-2'>
        <ChatInput role={role} appendToChat={appendToChat} />
      </div>
    </div >
  );
}

export default App;