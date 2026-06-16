export type AssistantRole = "assistant" | "user";

export type AssistantMessage = {
  role: AssistantRole;
  text: string;
};

export type LeadFormData = {
  name: string;
  email: string;
  phone: string;
  caseSummary: string;
};
