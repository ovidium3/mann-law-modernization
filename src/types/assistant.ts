export type AssistantRole = "assistant" | "user";

export type AssistantMessage = {
  role: AssistantRole;
  text: string;
};
