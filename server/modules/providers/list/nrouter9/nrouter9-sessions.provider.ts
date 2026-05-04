import type { IProviderSessions } from '@/shared/interfaces.js';
import type { FetchHistoryOptions, FetchHistoryResult, NormalizedMessage } from '@/shared/types.js';

/**
 * 9Router Sessions Provider
 * 
 * Manages chat sessions for 9Router.
 * Since 9Router is stateless (pure API proxy), we manage sessions locally.
 */
export class Nrouter9SessionsProvider implements IProviderSessions {
  readonly id = 'nrouter9-sessions';

  /**
   * Normalize a raw message from 9Router into the app's message format
   */
  normalizeMessage(raw: unknown, sessionId: string | null): NormalizedMessage[] {
    // 9Router returns OpenAI-compatible format
    const msg = raw as any;
    
    if (!msg || typeof msg !== 'object') {
      return [];
    }

    const sid = sessionId || 'unknown';
    const timestamp = new Date().toISOString();

    // Handle streaming chunks
    if (msg.choices?.[0]?.delta) {
      return [{
        id: `${sid}-${Date.now()}`,
        sessionId: sid,
        provider: 'nrouter9' as const,
        kind: 'stream_delta' as const,
        role: msg.choices[0].delta.role || 'assistant',
        content: msg.choices[0].delta.content || '',
        timestamp,
      }];
    }

    // Handle complete messages
    if (msg.choices?.[0]?.message) {
      return [{
        id: `${sid}-${Date.now()}`,
        sessionId: sid,
        provider: 'nrouter9' as const,
        kind: 'text' as const,
        role: msg.choices[0].message.role || 'assistant',
        content: msg.choices[0].message.content || '',
        timestamp,
      }];
    }

    return [];
  }

  /**
   * Fetch message history for a session
   * 9Router is stateless, so we don't have server-side history
   */
  async fetchHistory(sessionId: string, options?: FetchHistoryOptions): Promise<FetchHistoryResult> {
    // 9Router doesn't store history server-side
    // History is managed client-side in CloudCLI
    return {
      messages: [],
      hasMore: false,
      total: 0,
      offset: options?.offset || 0,
      limit: options?.limit || null,
    };
  }

  /**
   * Create a new 9Router session
   */
  async createSession(config: {
    endpoint: string;
    apiKey?: string;
    model?: string;
  }): Promise<{ sessionId: string; model: string }> {
    const sessionId = `nrouter9-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    return {
      sessionId,
      model: config.model || 'kr/claude-sonnet-4.5',
    };
  }

  /**
   * Send a message through 9Router
   */
  async sendMessage(
    sessionId: string,
    message: string,
    config: {
      endpoint: string;
      apiKey?: string;
      model?: string;
      systemPrompt?: string;
    }
  ): Promise<{ response: string; sessionId: string }> {
    const model = config.model || 'kr/claude-sonnet-4.5';
    
    const response = await fetch(`${config.endpoint}/v1/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(config.apiKey ? { 'Authorization': `Bearer ${config.apiKey}` } : {}),
      },
      body: JSON.stringify({
        model,
        messages: [
          ...(config.systemPrompt ? [{ role: 'system', content: config.systemPrompt }] : []),
          { role: 'user', content: message },
        ],
        stream: false,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`9Router API error ${response.status}: ${error}`);
    }

    const data = await response.json() as any;
    const content = data.choices?.[0]?.message?.content || '';

    return { response: content, sessionId };
  }

  /**
   * Abort an ongoing request (not directly applicable to stateless API)
   */
  async abortSession(sessionId: string): Promise<void> {
    // 9Router is stateless, nothing to abort
  }
}