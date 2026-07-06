/* ============================================================
   AI PROVIDER — Abstract interface for OpenAI-compatible APIs
   ============================================================ */
window.AIProvider = (() => {
  const STORAGE_KEY = 'linux-ai-config';

  const defaults = {
    provider: 'openai',
    apiUrl: 'https://api.openai.com/v1',
    model: 'gpt-4o-mini',
    temperature: 0.3,
    maxTokens: 2048,
    timeout: 30000
  };

  let config = { ...defaults, apiKey: '' };

  function load() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
      config = { ...defaults, ...saved };
    } catch { /* use defaults */ }
    return config;
  }

  function save(cfg) {
    config = { ...config, ...cfg };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  }

  function getConfig() { return { ...config }; }

  function isConfigured() { return !!config.apiKey; }

  async function ask(messages, opts = {}) {
    const url = `${config.apiUrl}/chat/completions`;
    const body = {
      model: opts.model || config.model,
      temperature: opts.temperature ?? config.temperature,
      max_tokens: opts.maxTokens || config.maxTokens,
      messages
    };

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), opts.timeout || config.timeout);

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${config.apiKey}`
        },
        body: JSON.stringify(body),
        signal: controller.signal
      });

      if (!res.ok) {
        const err = await res.text().catch(() => '');
        throw new Error(`API ${res.status}: ${err}`);
      }

      const data = await res.json();
      return data.choices?.[0]?.message?.content || '';
    } finally {
      clearTimeout(timeout);
    }
  }

  function systemPrompt(text) {
    return { role: 'system', content: text };
  }

  function userPrompt(text) {
    return { role: 'user', content: text };
  }

  load();
  return { load, save, getConfig, isConfigured, ask, systemPrompt, userPrompt };
})();
