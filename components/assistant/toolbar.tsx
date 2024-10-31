type Props = {
  onNewChat: () => void;
};

export function Toolbar({ onNewChat }: Props) {
  return (
    <button
      onClick={onNewChat}
      type="button"
      className="left-4 right-4 absolute z-50 bottom-4 "
    >
      <div className="flex items-center justify-center">
        <div className="dark:bg-[#1A1A1A]/95 bg-[#1A1A1A]/95 h-8 w-full justify-between items-center flex px-2 rounded-lg space-x-4 text-[#878787]">
          <div className="flex items-center space-x-3">
            <div className="flex items-center gap-1.5">
              <kbd className="min-w-[32px] h-5 inline-flex items-center justify-center rounded border border-[#404040] bg-[#2C2C2C] px-1.5 font-mono text-[11px]">
                Shift
              </kbd>
              <span className="text-xs opacity-75">+</span>
              <kbd className="min-w-[20px] h-5 inline-flex items-center justify-center rounded border border-[#404040] bg-[#2C2C2C] px-1.5 font-mono text-[11px]">
                J
              </kbd>
            </div>
            <span className="text-xs">New chat</span>
          </div>
        </div>
      </div>
    </button>
  );
}
