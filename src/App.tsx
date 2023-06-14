import { ChatCompletionRequestMessage, ChatCompletionRequestMessageRoleEnum } from 'openai';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { FaLock } from 'react-icons/fa';
import './App.css';
import { openaiapi as requestAi } from './api/openaiapi';
import ApiKeyInput from './components/api-key-input/ApiKeyInput';
import './i18n/i18n';
import { AiRole, ChatHistory, roles } from './model/app';

let chatContext: ChatCompletionRequestMessage[] = [];
const addUserMessage = (prompt: string) => {
  chatContext.push({ role: ChatCompletionRequestMessageRoleEnum.User, content: prompt })
}
const App = () => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [role, setRole] = useState<AiRole>(roles[0]);
  const [chat, setChat] = useState<ChatHistory[]>([]);
  const [prompt, setPrompt] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleRoleChange = (i: number) => {
    const r = roles.find(x => x.index === i);
    setRole(r!);
  }

  const onSubmit = async (prompt: string, role: AiRole) => {
    setPrompt('');
    setChat(s => [...s, { role: 'you', content: prompt } as ChatHistory]);
    addUserMessage(prompt);
    try {
      setIsLoading(true);
      const response = await requestAi(chatContext, role.fullName);
      chatContext = response;
      const c = { role: role, content: response[response.length - 1].content } as ChatHistory;
      setChat(s => [...s, c]);
    }
    finally {
      setIsLoading(false);
    }
  }

  const handleKeyEvent = (key: string, prompt: string, role: AiRole) => {
    if (key === 'Enter') {
      onSubmit(prompt, role);
    }
  }

  return (
    <div className="container-fluid align-items-end vh-100 d-grid" >
      <div className="position-absolute top-0 end-0 p-2 d-flex gap-2">
        <select className="form-select form-select-sm" onChange={e => handleRoleChange(parseInt(e.target.value))}>
          {roles.map(r => {
            return (
              <option key={r.index} value={r.index}>{r.displayName}</option>
            );
          })}
        </select>
        <Button variant='light' onClick={() => setShowModal(true)}><FaLock /></Button>
      </div>
      <h1 className='text-center'>{t('welcome')}</h1>
      <div className='overflow-y-auto flex-grow-1 h-100'>
        {chat.map((r, i) => {
          return (
            <p key={i} className='text-bg-light p-2 rounded shadow-sm'>
              <strong>{r.role === 'you' ? t('you') : r.role.displayName}: </strong>
              {r.content}
            </p>
          )
        })}
      </div>
      <div className='row gap-2 p-2'>
        <input
          className='col-sm-12 col-lg-10 '
          value={prompt}
          onChange={e => setPrompt(e.target.value)}
          placeholder={t('placeholder_chat')!}
          onKeyUp={e => handleKeyEvent(e.key, prompt, role)}
        />
        <Button
          disabled={isLoading}
          className='col'
          variant="dark"
          onClick={() => onSubmit(prompt, role)}>
          {t('submit')}
        </Button>
      </div>
      <ApiKeyInput show={showModal} setShow={v => setShowModal(v)} />
    </div >
  );
}

export default App;