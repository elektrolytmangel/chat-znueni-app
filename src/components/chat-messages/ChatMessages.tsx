import { useTranslation } from 'react-i18next';
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
        const styles = r.role === 'you' ? ' rounded bg-black text-end p-2 m-0' : '';
        return (
          <div className={'text-bg-dark px-3 py-2'}>
            <div key={i} className={'side-space'}>
              {roleText}
              <ReactMarkdown
                children={r.content}
                components={{
                  p({ className, children, ...props }) {
                    return (
                      <p className={className + styles} {...props}>
                        {children}
                      </p>
                    );
                  },
                  code({ node, inline, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || '');
                    const content = String(children).replace(/\n$/, '');
                    const language = match ? match[1] : 'text';
                    return !inline && match ? (
                      <div
                        style={{ backgroundColor: stackoverflowDark.hljs.background?.toString() }}
                        className="bg-success rounded"
                      >
                        <div className="d-flex justify-content-between px-1">
                          <span className="text-white">{language}</span>
                          <button
                            className="bg-transparent no-style"
                            onClick={() => copyToClipboard(content)}
                            title={t('copy_source_code') || ''}
                          >
                            {t('copy_code')}
                          </button>
                        </div>
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
