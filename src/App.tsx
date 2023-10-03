import { useEffect, useState } from 'react';
import './App.css';
import ApiKeyInput from './components/api-key-input/ApiKeyInput';
import ChatInput from './components/chat-input/ChatInput';
import ChatMessages from './components/chat-messages/ChatMessages';
import GithubLink from './components/github-button/GithubLink';
import InfoCards from './components/info-cards/InfoCards';
import LegalInformation from './components/legal-information/LegalInformation';
import RoleSelector from './components/role-selector/RoleSelector';
import './i18n/i18n';
import { AiRole, ChatHistory } from './model/app';
import { getPersistedRole, resetUsage } from './store/store';

const App = () => {
  const [role, setRole] = useState<AiRole>(getPersistedRole());
  const [chat, setChat] = useState<ChatHistory[]>([]);

  const appendToChat = (c: ChatHistory) => {
    setChat(s => [...s, c]);
  }

  useEffect(() => {
    const interval = setInterval(() => resetUsage()
      , 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    navigator.serviceWorker.onmessage = (event) => {
      if (event.data && event.data.type === 'UPDATE_AVAILABLE') {
        alert(('New version available. Refresh the page to update.'));
      }
    };
  }, []);

  return (
    <div className="safe-area" >
      <div className="p-2 d-flex gap-2 settings-bar side-space">
        <RoleSelector selectedRole={role} setRole={setRole} />
        <ApiKeyInput />
        <GithubLink />
      </div>
      {chat.length > 0 ? null : <InfoCards />}
      <div className='overflow-y-auto overflow-x-hidden d-flex flex-column-reverse custom-scroll'>
        <ChatMessages chatHistory={chat} />
      </div>
      <div className='p-2 side-space'>
        <ChatInput role={role} appendToChat={appendToChat} />
      </div>
      <LegalInformation />
    </div >
  );
}

export default App;