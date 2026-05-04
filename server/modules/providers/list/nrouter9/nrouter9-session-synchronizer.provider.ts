import type { IProviderSessionSynchronizer } from '@/shared/interfaces.js';

/**
 * 9Router Session Synchronizer (stub)
 * 
 * 9Router is stateless and doesn't store sessions on disk.
 * This is a no-op implementation to satisfy the interface.
 */
export class Nrouter9SessionSynchronizer implements IProviderSessionSynchronizer {
  /**
   * Synchronize sessions from disk (no-op for 9Router)
   */
  async synchronize(since?: Date): Promise<number> {
    // 9Router doesn't store sessions on disk
    return 0;
  }

  /**
   * Synchronize a single session file (no-op for 9Router)
   */
  async synchronizeFile(filePath: string): Promise<string | null> {
    // 9Router doesn't store sessions on disk
    return null;
  }
}
