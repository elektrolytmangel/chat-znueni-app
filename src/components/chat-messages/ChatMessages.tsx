import { useTranslation } from "react-i18next";
import { FaRegCopy } from "react-icons/fa";
import ReactMarkdown from 'react-markdown';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { stackoverflowDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
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

const ChatMessages = ({ chatHistory }: Props) => {
  const { t } = useTranslation();

  return (
    <>
      {[...chatHistory].reverse().map((r, i) => {
        const roleText = r.role === 'you' ? null : <><strong>{r.role.displayName}</strong><br /></>;
        const styles = (r.role === 'you' ? 'text-bg-white' : 'text-bg-dark') + ' p-3';
        console.log(stackoverflowDark)
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
                    <div style={{ backgroundColor: stackoverflowDark.hljs.background?.toString() }} className="border border-secondary rounded" >
                      <button className="bg-transparent border mt-1 ms-1" onClick={() => copyToClipboard(content)}><FaRegCopy className='mb-1' color="white" /></button> <span >{t('copy_source_code')}</span>
                      <SyntaxHighlighter
                        {...props}
                        showLineNumbers={true}
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