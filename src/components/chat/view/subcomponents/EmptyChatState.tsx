import React from 'react';
import { useTranslation } from 'react-i18next';
import type { Project } from '../../../../types/app';

interface EmptyChatStateProps {
  projectName?: string;
  onStarterAction?: (text: string) => void;
}

const STARTERS = [
  'Explain this project',
  'Find recent changes',
  'Open files',
  'Run a command',
];

export default function EmptyChatState({
  projectName,
  onStarterAction,
}: EmptyChatStateProps) {
  const { t } = useTranslation('chat');

  return (
    <div className="flex h-full flex-col items-center justify-center px-4">
      <div className="w-full max-w-sm text-center">
        {/* Title */}
        <h2 className="text-lg font-semibold text-foreground">
          How can I help with this project?
        </h2>

        {/* Subtitle */}
        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
          Ask about code, files, shell commands, or project context.
        </p>

        {/* Starter chips */}
        {onStarterAction && (
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            {STARTERS.map((starter) => (
              <button
                key={starter}
                type="button"
                onClick={() => onStarterAction(starter)}
                className="rounded-full border border-border/60 bg-card px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
              >
                {starter}
              </button>
            ))}
          </div>
        )}

        {/* Keyboard hint */}
        <p className="mt-8 text-xs text-muted-foreground/60">
          Press{' '}
          <kbd className="inline-flex items-center gap-0.5 rounded border border-border/60 bg-muted/40 px-1.5 py-0.5 font-mono text-[10px]">
            ⌘K
          </kbd>{' '}
          to search commands
        </p>
      </div>
    </div>
  );
}
