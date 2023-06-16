import { ChatCompletionRequestMessage, ChatCompletionRequestMessageRoleEnum } from "openai";
import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { IoSendSharp } from 'react-icons/io5';
import { openaiapi as requestAi } from '../../api/openaiapi';
import { AiRole, ChatHistory } from "../../model/app";
import './ChatInput.css';

type Props = {
  role: AiRole,
  appendToChat: (chat: ChatHistory) => void,
}

let chatContext: ChatCompletionRequestMessage[] = [];
const addUserMessage = (prompt: string) => {
  chatContext.push({ role: ChatCompletionRequestMessageRoleEnum.User, content: prompt })
}

const ChatInput = ({ role, appendToChat }: Props) => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [prompt, setPrompt] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const onSubmit = async (prompt: string, role: AiRole) => {
    setPrompt('');
    appendToChat({ role: 'you', content: prompt } as ChatHistory);
    addUserMessage(prompt);
    try {
      setIsLoading(true);
      const response = await requestAi(chatContext, role.fullName);
      chatContext = response;
      const c = { role: role, content: response[response.length - 1].content } as ChatHistory;
      appendToChat(c);
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
    <div className="mt-2 mb-3 input-style safe-area-bottom-padding">
      <input
        autoFocus={true}
        ref={inputRef}
        disabled={isLoading}
        value={prompt}
        onChange={e => setPrompt(e.target.value)}
        placeholder={t('placeholder_chat')!}
        onKeyUp={e => handleKeyEvent(e.key, prompt, role)}
      />
      <button
        disabled={isLoading}
        className='d-flex justify-content-center align-items-center no-style'
        onClick={() => onSubmit(prompt, role)}>
        <IoSendSharp className="icon" size="1.2rem" color={isLoading ? 'grey' : 'black'} />
      </button>
    </div>
  )
}

export default ChatInput;