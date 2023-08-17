import { FaRegCopy } from "react-icons/fa";
import { ChatHistory } from "../../model/app";
import ReactMarkdown from 'react-markdown';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { dracula, hybrid, stackoverflowDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { useTranslation } from "react-i18next";

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

const ChatMessages = ({ chatHistory }: Props) => {
  const { t } = useTranslation();

  return (
    <>
      {[...chatHistory].reverse().map((r, i) => {
        const roleText = r.role === 'you' ? null : <><strong>{r.role.displayName}</strong><br /></>;
        const styles = (r.role === 'you' ? 'text-bg-white' : 'text-bg-secondary') + ' p-3';
        return (
          <div key={i} className={styles}>
            {roleText}
            <ReactMarkdown
              children={r.content}
              components={{
                code({ node, inline, className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || '')
                  const content = String(children).replace(/\n$/, '');
                  return !inline && match ? (
                    <div style={stackoverflowDark}>
                      <button className="bg-transparent border" onClick={() => copyToClipboard(content)}><FaRegCopy className='mb-1' color="white" /></button> <span >{t('copy_source_code')}</span>
                      <SyntaxHighlighter
                        {...props}
                        children={content}
                        style={stackoverflowDark}
                        language={match[1]}
                        PreTag="div"
                      />
                    </div>
                  ) : (
                    <code {...props} className={className}>
                      {children}
                    </code>
                  )
                }
              }}
            />
          </div >
        )
      })}
    </>
  );
}

export default ChatMessages;