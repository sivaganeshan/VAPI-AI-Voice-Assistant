import Vapi from "@vapi-ai/web";

const workflowId = import.meta.env.VITE_ASSISTANT_WORKFLOW_ID;
const vapi_APIKEY = import.meta.env.VITE_VAPI_API_KEY;

export const vapi = new Vapi(vapi_APIKEY);

console.log(vapi_APIKEY, workflowId);

export const startAssistant = async (name, topics, userWellnessProfile) => {
  try {
    const workflowOverrides = {
      variableValues: {
        name,
        topics,
        userWellnessProfile,
      },
    };
    return await vapi.start(workflowId, workflowOverrides);
  } catch (err) {
    console.log(err);
  }
};

export const stopAssistant = () => {
  vapi.stop();
};
