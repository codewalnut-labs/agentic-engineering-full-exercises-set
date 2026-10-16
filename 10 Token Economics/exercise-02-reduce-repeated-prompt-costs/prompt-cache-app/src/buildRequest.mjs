// Learner task: preserve the complete input while making the shared prefix reusable.
export function buildRequest({document,question,timestamp,namespace}) {
  return {
    system:[{type:'text',text:`Request timestamp: ${timestamp}\nExperiment namespace: ${namespace}\n${document}`,cache_control:{type:'ephemeral'}}],
    messages:[{role:'user',content:question}],
  };
}
