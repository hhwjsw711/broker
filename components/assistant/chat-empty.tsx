import { MdHome } from "react-icons/md";

export function ChatEmpty() {
  return (
    <div className="w-full mt-24 flex flex-col items-center justify-center text-center">
      <MdHome />
      <span className="font-medium text-xl mt-6">
        Hello, how can I help <br />
        you today?
      </span>
    </div>
  );
}
