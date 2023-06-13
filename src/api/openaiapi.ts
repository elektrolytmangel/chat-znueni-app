import { ChatCompletionRequestMessage, ChatCompletionRequestMessageRoleEnum, Configuration, OpenAIApi } from "openai";

const getSystemContent = (role: string) => {
  return `You answer questions always as you are ${role} from the movie Pulp Fiction. You are restricted to answer only with context to siwss food or the movie puplp fuction, nothing else. At the end of every response you add a quote from Pulp Fuction which matches the question.`;
}

const addSystemContextIfNeeded = (context: ChatCompletionRequestMessage[], role: string) => {
  const lastSystemContent = [...context].reverse().find(x => x.role === ChatCompletionRequestMessageRoleEnum.System);
  if (!lastSystemContent?.content.includes(`You answer questions always as you are ${role}`)) {
    const systemContext: ChatCompletionRequestMessage = {
      role: ChatCompletionRequestMessageRoleEnum.System,
      content: getSystemContent(role),
    };
    const upd = [...context.slice(0, context.length - 1), systemContext, ...context.slice(context.length - 1)]

    return upd;
  }

  return context;
}

export default async (messages: ChatCompletionRequestMessage[], role: string) => {
  const configuration = new Configuration({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY || '',
  });

  const openai = new OpenAIApi(configuration);
  const context = addSystemContextIfNeeded(messages, role);

  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: context,
    });

    const response = completion.data.choices[0];
    const text = response?.message?.content || '';
    return [...context, { role: response.message?.role || ChatCompletionRequestMessageRoleEnum.Assistant, content: text }]
  }
  catch (err: any) {
    console.log(err);
    return [...context, { role: ChatCompletionRequestMessageRoleEnum.Assistant, content: err.message }]

  }
};