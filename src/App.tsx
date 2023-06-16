import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './App.css';
import ApiKeyInput from './components/api-key-input/ApiKeyInput';
import ChatInput from './components/chat-input/ChatInput';
import ChatMessages from './components/chat-messages/ChatMessages';
import GithubLink from './components/github-button/GithubLink';
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
    <div className="safe-area container-fluid" >
      <div className="p-2 d-flex gap-2 position-absolute top-0 end-0">
        <RoleSelector setRole={setRole} />
        <ApiKeyInput />
        <GithubLink />
      </div>
      <h1 hidden={chat.length > 0} className='text-center '>{t('welcome')}</h1>
      <div className='overflow-y-auto overflow-x-hidden d-flex flex-column-reverse'>
        <ChatMessages chatHistory={chat} />
      </div>
      <ChatInput role={role} appendToChat={appendToChat} />
    </div >
  );
}

export default App;