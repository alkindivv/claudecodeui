import React, { useState, useRef, useEffect } from 'react';
import { MoreHorizontalIcon, MoonIcon, SunIcon, BrainIcon, ZapIcon, XIcon } from 'lucide-react';
import type { PermissionMode } from '../../types/types';

interface OverflowMenuProps {
  provider: string;
  permissionMode: PermissionMode | string;
  onModeSwitch: () => void;
  thinkingMode: string;
  setThinkingMode: React.Dispatch<React.SetStateAction<string>>;
  tokenBudget: { used?: number; total?: number } | null;
}

const THINKING_OPTIONS = [
  { value: 'auto', label: 'Auto' },
  { value: 'on', label: 'Thinking On' },
  { value: 'off', label: 'Thinking Off' },
];

export default function ComposerOverflowMenu({
  permissionMode,
  onModeSwitch,
  thinkingMode,
  setThinkingMode,
  tokenBudget,
}: OverflowMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isOpen]);

  return (
    <div className="relative" ref={menuRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
        aria-label="More options"
        aria-expanded={isOpen}
        aria-haspopup="menu"
      >
        <MoreHorizontalIcon className="h-4 w-4" />
      </button>

      {isOpen && (
        <div
          className="absolute bottom-full right-0 z-50 mb-2 w-48 overflow-hidden rounded-xl border border-border bg-popover shadow-lg"
          role="menu"
        >
          {/* Permission Mode */}
          <button
            type="button"
            className="flex w-full items-center gap-2 px-3 py-2 text-left text-xs text-foreground hover:bg-accent"
            onClick={() => { onModeSwitch(); setIsOpen(false); }}
            role="menuitem"
          >
            {permissionMode === 'ask' ? (
              <>
                <MoonIcon className="h-3.5 w-3.5 text-muted-foreground" />
                <span>Auto-confirm tools</span>
              </>
            ) : (
              <>
                <SunIcon className="h-3.5 w-3.5 text-muted-foreground" />
                <span>Ask before tools</span>
              </>
            )}
          </button>

          {/* Divider */}
          <div className="border-t border-border/50" />

          {/* Thinking mode */}
          <div className="px-3 py-1.5 text-[10px] uppercase tracking-wider text-muted-foreground/70">
            Thinking
          </div>
          {THINKING_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              className={`flex w-full items-center gap-2 px-3 py-1.5 text-left text-xs ${thinkingMode === opt.value ? 'text-primary' : 'text-foreground hover:bg-accent'}`}
              onClick={() => { setThinkingMode(opt.value); setIsOpen(false); }}
              role="menuitem"
            >
              <BrainIcon className="h-3.5 w-3.5 text-muted-foreground" />
              <span>{opt.label}</span>
            </button>
          ))}

          {/* Token budget */}
          {tokenBudget && tokenBudget.total && (
            <>
              <div className="border-t border-border/50" />
              <div className="flex items-center gap-2 px-3 py-2 text-xs text-muted-foreground">
                <ZapIcon className="h-3.5 w-3.5" />
                <span>
                  {tokenBudget.used ?? 0} / {tokenBudget.total} tokens
                </span>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
