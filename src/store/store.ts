import { AiRole } from "../model/app";
import { roles } from "../model/defaults";

const REACT_APP_OPENAI_API_USAGE_KEY = "REACT_APP_OPENAI_API_USAGE_KEY";
const REACT_APP_OPENAI_API_KEY = 'REACT_APP_OPENAI_API_KEY';
const REACT_APP_ROLE_KEY = 'REACT_APP_ROLE_KEY';

export const increaseUsage = (): number => {
  const usage = getUsage() + 1;
  localStorage.setItem(REACT_APP_OPENAI_API_USAGE_KEY, usage.toString());
  return usage;
}

export const resetUsage = () => {
  localStorage.setItem(REACT_APP_OPENAI_API_USAGE_KEY, "0");
}

export const getUsage = (): number => {
  return parseInt(localStorage.getItem(REACT_APP_OPENAI_API_USAGE_KEY) ?? "0");
}

export const setApiKey = (apiKey: string) => {
  localStorage.setItem(REACT_APP_OPENAI_API_KEY, apiKey);
}

export const getApiKey = () => {
  return localStorage.getItem(REACT_APP_OPENAI_API_KEY);
}

export const setPersistedRole = (r: AiRole) => {
  localStorage.setItem(REACT_APP_ROLE_KEY, JSON.stringify(r));
}

export const getPersistedRole = (): AiRole => {
  const r = localStorage.getItem(REACT_APP_ROLE_KEY);
  if (r) {
    return JSON.parse(r);
  }

  return roles[0];
}
