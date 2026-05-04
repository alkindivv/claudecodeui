import type { IProviderMcp } from '@/shared/interfaces.js';
import type { McpScope, ProviderMcpServer, UpsertProviderMcpServerInput } from '@/shared/types.js';

/**
 * 9Router MCP Provider (stub)
 * 
 * 9Router doesn't use MCP (Model Context Protocol).
 * This is a no-op implementation to satisfy the interface.
 */
export class Nrouter9McpProvider implements IProviderMcp {
  async listServers(options?: { workspacePath?: string }): Promise<Record<McpScope, ProviderMcpServer[]>> {
    return {
      user: [],
      local: [],
      project: [],
    };
  }

  async listServersForScope(scope: McpScope, options?: { workspacePath?: string }): Promise<ProviderMcpServer[]> {
    return [];
  }

  async upsertServer(input: UpsertProviderMcpServerInput): Promise<ProviderMcpServer> {
    throw new Error('9Router does not support MCP servers');
  }

  async removeServer(
    input: { name: string; scope?: McpScope; workspacePath?: string },
  ): Promise<{ removed: boolean; provider: 'nrouter9'; name: string; scope: McpScope }> {
    throw new Error('9Router does not support MCP servers');
  }
}
