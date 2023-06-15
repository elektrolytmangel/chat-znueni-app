import { useTranslation } from "react-i18next";
import { FaRegCopy } from "react-icons/fa";
import { ChatHistory } from "../../model/app";

type Props = {
  chatHistory: ChatHistory[],
}

const copyToClipboard = (textToCopy: string) => {
  navigator.clipboard.writeText(textToCopy).then(function () {
    console.log("Text copied successfully to clipboard");
  }, function () {
    console.error("Failed to copy text to clipboard");
  });
}

const convertThrippleBackticksToCode = (content: string) => {
  return content.split('```').map((c, i, a) => {
    if (i % 2 != 0) {
      return (
        <pre key={i} className="m-3 p-1 bg-dark text-light rounded">
          <button className="bg-transparent rounded" onClick={() => copyToClipboard(c)}><FaRegCopy className='mb-1' color="white" /></button> <var>[source-code]</var> <span></span>
          <code>{c}</code>
        </pre>
      )
    }
    else {
      return <span key={i}>{c}</span>
    }
  });
}

const ChatMessages = ({ chatHistory }: Props) => {
  const { t } = useTranslation();
  return (
    <>
      {[...chatHistory].reverse().map((r, i) => {
        return (
          <div key={i} className='text-bg-light border my-1 p-2 rounded shadow-sm'>
            <strong>{r.role === 'you' ? t('you') : r.role.displayName}: </strong>
            {convertThrippleBackticksToCode(r.content)}
          </div>
        )
      })}
    </>
  );
}

export default ChatMessages;