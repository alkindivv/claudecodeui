import type { IProviderAuth } from '@/shared/interfaces.js';

/**
 * 9Router Authentication Provider
 * 
 * Stores and validates 9Router API configuration.
 * 9Router uses a custom API key system managed through the 9Router dashboard.
 * For now, we store the 9Router endpoint URL and any provider API keys.
 */
export class Nrouter9ProviderAuth implements IProviderAuth {
  readonly id = 'nrouter9-auth';

  /**
   * Validate that 9Router is reachable and credentials are configured
   */
  async validateCredentials(config: {
    endpoint: string;
    apiKey?: string;
  }): Promise<{ valid: boolean; error?: string }> {
    try {
      const response = await fetch(`${config.endpoint}/v1/models`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...(config.apiKey ? { 'Authorization': `Bearer ${config.apiKey}` } : {}),
        },
      });

      if (response.ok) {
        return { valid: true };
      }

      return { valid: false, error: `9Router returned ${response.status}` };
    } catch (error) {
      return { valid: false, error: `Cannot reach 9Router: ${error}` };
    }
  }

  /**
   * Get required configuration fields for 9Router
   */
  getRequiredFields(): Array<{ key: string; label: string; type: string; sensitive: boolean }> {
    return [
      { key: 'endpoint', label: '9Router Endpoint', type: 'text', sensitive: false },
      { key: 'apiKey', label: '9Router API Key (optional)', type: 'password', sensitive: true },
    ];
  }
}