import { useTranslation } from 'react-i18next';
import { FaRegCopy } from 'react-icons/fa';
import ReactMarkdown from 'react-markdown';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { stackoverflowDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { ChatHistory } from '../../model/app';

type Props = {
  chatHistory: ChatHistory[];
};

const copyToClipboard = (textToCopy: string) => {
  navigator.clipboard.writeText(textToCopy).then(
    function () {
      console.log('Text copied successfully to clipboard');
    },
    function () {
      console.error('Failed to copy text to clipboard');
    }
  );
};

const ChatMessages = ({ chatHistory }: Props) => {
  const { t } = useTranslation();

  return (
    <>
      {[...chatHistory].reverse().map((r, i) => {
        const roleText =
          r.role === 'you' ? null : (
            <>
              <strong>{r.role.displayName}</strong>
              <br />
            </>
          );
        const styles = (r.role === 'you' ? 'text-bg-white' : 'text-bg-light') + ' py-2 px-3 ';
        return (
          <div className={styles}>
            <div key={i} className="side-space">
              {roleText}
              <ReactMarkdown
                children={r.content}
                components={{
                  code({ node, inline, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || '');
                    const content = String(children).replace(/\n$/, '');
                    const language = match ? match[1] : 'text';
                    return !inline && match ? (
                      <div
                        style={{ backgroundColor: stackoverflowDark.hljs.background?.toString() }}
                        className="border border-secondary rounded p-1"
                      >
                        <button
                          className="bg-transparent border mt-1 ms-1"
                          onClick={() => copyToClipboard(content)}
                          title={t('copy_source_code') || ''}
                        >
                          <FaRegCopy className="mb-1" color="white" />
                        </button>{' '}
                        <span className="text-white">{language}</span>
                        <SyntaxHighlighter
                          {...props}
                          showLineNumbers={true}
                          children={content}
                          style={stackoverflowDark}
                          language={language}
                          PreTag="div"
                        />
                      </div>
                    ) : (
                      <code {...props} className={className}>
                        {children}
                      </code>
                    );
                  },
                }}
              />
            </div>
          </div>
        );
      })}
    </>
  );
};

export default ChatMessages;
