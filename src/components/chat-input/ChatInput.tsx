import { ChatCompletionRequestMessage, ChatCompletionRequestMessageRoleEnum } from 'openai';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IoSendSharp } from 'react-icons/io5';
import TextareaAutosize from 'react-textarea-autosize';
import { openaiapi as requestAi } from '../../api/openaiapi';
import { AiRole, ChatHistory } from '../../model/app';
import './ChatInput.css';

type Props = {
  role: AiRole;
  appendToChat: (chat: ChatHistory) => void;
};

let chatContext: ChatCompletionRequestMessage[] = [];
const addUserMessage = (prompt: string) => {
  chatContext.push({ role: ChatCompletionRequestMessageRoleEnum.User, content: prompt });
};

const ChatInput = ({ role, appendToChat }: Props) => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [prompt, setPrompt] = useState('');
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const onSubmit = async (prompt: string, role: AiRole) => {
    setPrompt('');
    appendToChat({ role: 'you', content: prompt } as ChatHistory);
    addUserMessage(prompt);
    try {
      setIsLoading(true);
      const response = await requestAi(chatContext, role);
      chatContext = response;
      const c = { role: role, content: response[response.length - 1].content } as ChatHistory;
      appendToChat(c);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyEvent = (e: React.KeyboardEvent<HTMLTextAreaElement>, prompt: string, role: AiRole) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      onSubmit(prompt, role);
    }
  };

  const focus = useCallback(() => {
    if (inputRef.current !== null) {
      inputRef.current.focus();
    }
  }, [inputRef]);

  useEffect(() => {
    if (!isLoading) {
      focus();
    }
  }, [isLoading, focus]);

  return (
    <>
      <div className="d-flex justify-content-start align-items-center" hidden={!isLoading}>
        <div className="spinner-border spinner-border-sm" role="status" hidden={!isLoading}>
          <span className="visually-hidden">Loading...</span>
        </div>
        <span hidden={!isLoading} className="ms-1">
          {role.displayName} {t('is_thinking')}
        </span>
      </div>
      <div className="w-100 d-flex shadow-lg p-1 rounded border">
        <TextareaAutosize
          style={{
            resize: 'none',
            lineHeight: '1.5rem',
          }}
          className="bg-dark "
          autoFocus={true}
          ref={inputRef}
          disabled={isLoading}
          value={prompt}
          rows={1}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder={t('placeholder_chat')!}
          onKeyUp={(e) => handleKeyEvent(e, prompt, role)}
        />
        <button
          disabled={isLoading}
          className="d-flex justify-content-center align-items-center no-style"
          onClick={() => onSubmit(prompt, role)}
        >
          <IoSendSharp className="icon" size="1.8rem" color={isLoading ? 'grey' : 'white'} />
        </button>
      </div>
    </>
  );
};

export default ChatInput;
