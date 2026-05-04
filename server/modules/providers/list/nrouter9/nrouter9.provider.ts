import { AbstractProvider } from '@/modules/providers/shared/base/abstract.provider.js';
import { Nrouter9ProviderAuth } from '@/modules/providers/list/nrouter9/nrouter9-auth.provider.js';
import { Nrouter9McpProvider } from '@/modules/providers/list/nrouter9/nrouter9-mcp.provider.js';
import { Nrouter9SessionSynchronizer } from '@/modules/providers/list/nrouter9/nrouter9-session-synchronizer.provider.js';
import { Nrouter9SessionsProvider } from '@/modules/providers/list/nrouter9/nrouter9-sessions.provider.js';
import type { IProviderAuth, IProviderMcp, IProviderSessionSynchronizer, IProviderSessions } from '@/shared/interfaces.js';

/**
 * 9Router Provider
 * 
 * Integrates with 9Router AI proxy/router running on localhost:20128.
 * Provides access to multiple AI providers (Kiro AI, ChatGPT, Claude, etc.)
 * through a single OpenAI-compatible API endpoint.
 */
export class Nrouter9Provider extends AbstractProvider {
  readonly mcp: IProviderMcp = new Nrouter9McpProvider();
  readonly auth: IProviderAuth = new Nrouter9ProviderAuth();
  readonly sessions: IProviderSessions = new Nrouter9SessionsProvider();
  readonly sessionSynchronizer: IProviderSessionSynchronizer = new Nrouter9SessionSynchronizer();

  constructor() {
    super('nrouter9');
  }
}