export async function onRequestPost(context) {
  const { request, env } = context;
  const { message } = await request.json();

  const res = await fetch("https://open.bigmodel.cn/api/paas/v4/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${env.GLM_API_KEY}`,
    },
    body: JSON.stringify({
      model: "glm-5.3-flash",
      messages: [{ role: "user", content: message }],
      temperature: 1,
      max_tokens: 1024,
      thinking: { type: "enabled", clear_thinking: false },
      reasoning_effort: "max"
    }),
  });

  const data = await res.json();
  return new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json" },
  });
}
