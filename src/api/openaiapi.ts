import { ChatCompletionRequestMessage, ChatCompletionRequestMessageRoleEnum, Configuration, OpenAIApi } from 'openai';
import { AiRole } from '../model/app';
import { getSystemContent } from '../services/systemContextService';
import { getApiKey, increaseUsage } from '../store/store';

const addSystemContextIfNeeded = (context: ChatCompletionRequestMessage[], role: AiRole) => {
  const lastSystemContent = [...context].reverse().find((x) => x.role === ChatCompletionRequestMessageRoleEnum.System);
  if (!lastSystemContent?.content.includes(`You answer questions always as you are ${role.fullName}`)) {
    const systemContext: ChatCompletionRequestMessage = {
      role: ChatCompletionRequestMessageRoleEnum.System,
      content: getSystemContent(role),
    };
    const upd = [...context.slice(0, context.length - 1), systemContext, ...context.slice(context.length - 1)];

    return upd;
  }

  return context;
};

export const openaiapi = async (messages: ChatCompletionRequestMessage[], role: AiRole) => {
  const customApiKey = getApiKey();
  const configuration = new Configuration({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY || customApiKey || '',
  });

  const context = addSystemContextIfNeeded(messages, role);
  const isDefaultApiKey = !customApiKey && process.env.REACT_APP_OPENAI_API_KEY;
  if (isDefaultApiKey && increaseUsage() > 10) {
    return [
      ...context,
      {
        role: ChatCompletionRequestMessageRoleEnum.Assistant,
        content:
          'Usage limit reached. Use a custom openai api key, add it with a click on the lock-button. More info: https://platform.openai.com. Thank you for using chat.znueni.app!',
      },
    ];
  }

  const openai = new OpenAIApi(configuration);
  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo-0125",
      messages: context,
    });

    const response = completion.data.choices[0];
    const text = response?.message?.content || '';
    return [
      ...context,
      { role: response.message?.role || ChatCompletionRequestMessageRoleEnum.Assistant, content: text },
    ];
  } catch (err: any) {
    console.log(err);
    return [...context, { role: ChatCompletionRequestMessageRoleEnum.Assistant, content: err.message }];
  }
};
