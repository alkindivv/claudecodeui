import { useState, useEffect, useCallback } from 'react';
import { api } from '@/utils/api.js';

type Nrouter9Model = {
  fullModel: string;
  name: string;
  provider: string;
};

type Nrouter9Combo = {
  name: string;
  models: string[];
};

/**
 * Hook to fetch and cache 9Router models and combos
 *
 * Usage:
 *   const { models, combos, loading, error, refetch } = useNrouter9Models();
 */
export function useNrouter9Models() {
  const [models, setModels] = useState<Nrouter9Model[]>([]);
  const [combos, setCombos] = useState<Nrouter9Combo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchConfig = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await api.nrouter9.config();
      if (!response.ok) {
        throw new Error(`Failed to fetch 9Router config: ${response.status}`);
      }

      const data = await response.json();
      setModels((data.models || []) as Nrouter9Model[]);
      setCombos((data.combos || []) as Nrouter9Combo[]);
    } catch (err) {
      console.error('[useNrouter9Models] Error:', err);
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchConfig();
  }, [fetchConfig]);

  return {
    models,
    combos,
    loading,
    error,
    refetch: fetchConfig,
  };
}

/**
 * Get model options formatted for UI selection
 * Transforms 9Router models into the format expected by the UI
 */
export function useNrouter9ModelOptions() {
  const { models, loading, error } = useNrouter9Models();

  type ModelOption = {
    value: string;
    label: string;
    provider: string;
  };

  const options: ModelOption[] = models.map(model => ({
    value: model.fullModel,
    label: model.name,
    provider: model.provider,
  }));

  // Group by provider for better UX
  const groupedOptions: Record<string, ModelOption[]> = options.reduce((acc, opt) => {
    if (!acc[opt.provider]) {
      acc[opt.provider] = [];
    }
    acc[opt.provider].push(opt);
    return acc;
  }, {} as Record<string, ModelOption[]>);

  return {
    options,
    groupedOptions,
    loading,
    error,
  };
}
