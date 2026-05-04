import { useState } from 'react';
import { Settings, ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import ThinkingModeSelector from './ThinkingModeSelector';
import TokenUsagePie from './TokenUsagePie';

type ComposerAdvancedMenuProps = {
  provider: string;
  permissionMode: string;
  onModeSwitch: () => void;
  thinkingMode: string;
  setThinkingMode: (mode: string) => void;
  tokenBudget: { used?: number; total?: number } | null;
};

export default function ComposerAdvancedMenu({
  provider,
  permissionMode,
  onModeSwitch,
  thinkingMode,
  setThinkingMode,
  tokenBudget,
}: ComposerAdvancedMenuProps) {
  const { t } = useTranslation('chat');
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 rounded-md px-2 py-1 text-xs text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
        title="Advanced settings"
      >
        <Settings className="h-3.5 w-3.5" />
        <ChevronDown className={`h-3 w-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute bottom-full right-0 z-50 mb-2 w-64 rounded-lg border border-border bg-card p-3 shadow-lg">
            <div className="space-y-3">
              {/* Permission Mode */}
              <div>
                <label className="mb-1.5 block text-xs font-medium text-foreground">
                  Permission Mode
                </label>
                <button
                  type="button"
                  onClick={() => {
                    onModeSwitch();
                    setIsOpen(false);
                  }}
                  className={`w-full rounded-md border px-3 py-2 text-left text-xs transition-colors ${
                    permissionMode === 'default'
                      ? 'border-border bg-muted/50 text-muted-foreground'
                      : permissionMode === 'acceptEdits'
                        ? 'border-green-300/60 bg-green-50 text-green-700 dark:border-green-600/40 dark:bg-green-900/15 dark:text-green-300'
                        : permissionMode === 'auto'
                          ? 'border-blue-300/60 bg-blue-50 text-blue-700 dark:border-blue-600/40 dark:bg-blue-900/15 dark:text-blue-300'
                          : 'border-primary/20 bg-primary/5 text-primary'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div
                      className={`h-2 w-2 rounded-full ${
                        permissionMode === 'default'
                          ? 'bg-muted-foreground'
                          : permissionMode === 'acceptEdits'
                            ? 'bg-green-500'
                            : permissionMode === 'auto'
                              ? 'bg-blue-500'
                              : 'bg-primary'
                      }`}
                    />
                    <span className="font-medium">
                      {permissionMode === 'default' && t('codex.modes.default')}
                      {permissionMode === 'acceptEdits' && t('codex.modes.acceptEdits')}
                      {permissionMode === 'auto' && t('codex.modes.auto')}
                      {permissionMode === 'bypassPermissions' && t('codex.modes.bypassPermissions')}
                      {permissionMode === 'plan' && t('codex.modes.plan')}
                    </span>
                  </div>
                </button>
              </div>

              {/* Thinking Mode (Claude only) */}
              {provider === 'claude' && (
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-foreground">
                    Thinking Mode
                  </label>
                  <ThinkingModeSelector
                    selectedMode={thinkingMode}
                    onModeChange={(mode) => {
                      setThinkingMode(mode);
                      setIsOpen(false);
                    }}
                    onClose={() => setIsOpen(false)}
                    className="w-full"
                  />
                </div>
              )}

              {/* Token Usage */}
              <div>
                <label className="mb-1.5 block text-xs font-medium text-foreground">
                  Token Usage
                </label>
                <div className="flex items-center gap-2">
                  <TokenUsagePie
                    used={tokenBudget?.used || 0}
                    total={tokenBudget?.total || parseInt(import.meta.env.VITE_CONTEXT_WINDOW) || 160000}
                  />
                  <div className="text-xs text-muted-foreground">
                    {tokenBudget?.used || 0} / {tokenBudget?.total || 160000}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
