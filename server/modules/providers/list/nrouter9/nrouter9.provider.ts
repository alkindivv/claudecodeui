import { AbstractProvider } from '@/modules/providers/shared/base/abstract.provider.js';
import { Nrouter9ProviderAuth } from '@/modules/providers/list/nrouter9/nrouter9-auth.provider.js';
import { Nrouter9SessionsProvider } from '@/modules/providers/list/nrouter9/nrouter9-sessions.provider.js';
import type { IProviderAuth, IProviderSessions } from '@/shared/interfaces.js';

/**
 * 9Router Provider
 * 
 * Integrates with 9Router AI proxy/router running on localhost:20128.
 * Provides access to multiple AI providers (Kiro AI, ChatGPT, Claude, etc.)
 * through a single OpenAI-compatible API endpoint.
 */
export class Nrouter9Provider extends AbstractProvider {
  readonly mcp = null; // 9Router doesn't use MCP
  readonly auth: IProviderAuth = new Nrouter9ProviderAuth();
  readonly sessions: IProviderSessions = new Nrouter9SessionsProvider();
  readonly sessionSynchronizer = null;

  constructor() {
    super('nrouter9');
  }
}