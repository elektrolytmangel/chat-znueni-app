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
    if (i % 2 !== 0) {
      return (
        <pre key={i} className="m-3 p-2 bg-dark text-light ">
          <button className="bg-transparent border" onClick={() => copyToClipboard(c)}><FaRegCopy className='mb-1' color="white" /></button> <var>[source-code]</var> <span></span>
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
  return (
    <>
      {[...chatHistory].reverse().map((r, i) => {
        const roleText = r.role === 'you' ? null : <><strong>{r.role.displayName}</strong><br /></>;
        const styles = (r.role === 'you' ? 'text-bg-white' : 'text-bg-secondary') + ' p-3';
        return (
          <div key={i} className={styles}>
            {roleText}
            {convertThrippleBackticksToCode(r.content)}
          </div >
        )
      })}
    </>
  );
}

export default ChatMessages;