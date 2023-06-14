import { useTranslation } from "react-i18next";
import { ChatHistory } from "../../model/app";

type Props = {
  chatHistory: ChatHistory[],
}

const ChatMessages = ({ chatHistory }: Props) => {
  const { t } = useTranslation();

  return (
    <>
      {[...chatHistory].reverse().map((r, i) => {
        return (
          <p key={i} className='text-bg-light p-2 rounded shadow-sm'>
            <strong>{r.role === 'you' ? t('you') : r.role.displayName}: </strong>
            {r.content}
          </p>
        )
      })}
    </>
  );
}

export default ChatMessages;