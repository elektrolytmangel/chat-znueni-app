import { ChatCompletionRequestMessage, ChatCompletionRequestMessageRoleEnum } from "openai";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { openaiapi as requestAi } from '../../api/openaiapi';
import { AiRole, ChatHistory } from "../../model/app";

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
    <>
      <input
        autoFocus={true}
        ref={inputRef}
        disabled={isLoading}
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
    </>
  )
}

export default ChatInput;