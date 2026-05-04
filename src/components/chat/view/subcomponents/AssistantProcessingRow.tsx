import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import SessionProviderLogo from '../../../llm-logo-provider/SessionProviderLogo';
import type { LLMProvider } from '../../../../types/app';

interface AssistantProcessingRowProps {
  isLoading: boolean;
  claudeStatus: { text?: string; tokens?: number; can_interrupt?: boolean } | null;
  onAbort: () => void;
  provider: LLMProvider;
}

const ACTION_WORDS = ['Thinking', 'Processing', 'Analyzing', 'Working', 'Reasoning'];

function formatElapsedTime(totalSeconds: number) {
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  return mins < 1 ? `${secs}s` : `${mins}m ${secs}s`;
}

export default function AssistantProcessingRow({
  isLoading,
  claudeStatus,
  onAbort,
  provider,
}: AssistantProcessingRowProps) {
  const { t } = useTranslation('chat');
  const [elapsedTime, setElapsedTime] = useState(0);
  const [dots, setDots] = useState('');

  useEffect(() => {
    if (!isLoading) {
      setElapsedTime(0);
      setDots('');
      return;
    }
    const startTime = Date.now();
    const timer = setInterval(() => {
      setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);
    const dotTimer = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? '' : prev + '.'));
    }, 400);
    return () => {
      clearInterval(timer);
      clearInterval(dotTimer);
    };
  }, [isLoading]);

  if (!isLoading && !claudeStatus) return null;

  const actionWord = ACTION_WORDS[Math.floor(elapsedTime / 3) % ACTION_WORDS.length];
  const statusText = claudeStatus?.text
    ? claudeStatus.text.replace(/[.]+$/, '')
    : actionWord;

  const p = String(provider);
  const providerLabel =
    p === 'cursor' ? 'Cursor' :
    p === 'codex' ? 'Codex' :
    p === 'gemini' ? 'Gemini' :
    p === 'nrouter9' ? '9Router' : 'Claude';

  return (
    <div className="message-row message-assistant">
      <div className="message-avatar">
        <SessionProviderLogo provider={provider} className="h-full w-full" />
      </div>
      <div className="message-content">
        {!isLoading && !claudeStatus ? null : (
          <div className="flex items-center gap-2 text-sm">
            <span className="text-muted-foreground">
              {providerLabel} {statusText}<span className="inline-block w-3">{dots}</span>
            </span>
            {isLoading && (
              <span className="text-xs tabular-nums text-muted-foreground/50">
                {formatElapsedTime(elapsedTime)}
              </span>
            )}
            {isLoading && claudeStatus?.can_interrupt !== false && (
              <button
                type="button"
                onClick={onAbort}
                className="ml-2 rounded-md bg-destructive/10 px-2 py-0.5 text-xs font-medium text-destructive transition-colors hover:bg-destructive/20"
                aria-label="Stop generation"
              >
                Stop
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
