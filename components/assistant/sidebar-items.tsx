import { chatExamples } from "./examples";
import { SidebarItem } from "./sidebar-item";

interface SidebarItemsProps {
  onSelect: (id: string) => void;
  chatId?: string;
}

const formatRange = (key: string) => {
  switch (key) {
    case "1d":
      return "Today";
    case "2d":
      return "Yesterday";
    case "7d":
      return "Last 7 days";
    case "30d":
      return "Last 30 days";
    default:
      return null;
  }
};

const items = {
  "1d": [
    {
      id: "1",
      title: chatExamples.at(0)?.title || "Default Title 1",
    },
    {
      id: "2",
      title: chatExamples.at(2)?.title || "Default Title 2",
    },
  ],
  "2d": [
    {
      id: "1",
      title: chatExamples.at(3)?.title || "Default Title 3",
    },
    {
      id: "2",
      title: chatExamples.at(4)?.title || "Default Title 4",
    },
  ],
  "7d": [
    {
      id: "1",
      title: chatExamples.at(5)?.title || "Default Title 5",
    },
    {
      id: "2",
      title: chatExamples.at(6)?.title || "Default Title 6",
    },
    {
      id: "3",
      title: chatExamples.at(0)?.title || "Default Title 7",
    },
    {
      id: "4",
      title: chatExamples.at(2)?.title || "Default Title 8",
    },
    {
      id: "5",
      title: chatExamples.at(3)?.title || "Default Title 9",
    },
  ],
  "30d": [
    {
      id: "1",
      title: chatExamples.at(2)?.title || "Default Title 10",
    },
    {
      id: "2",
      title: chatExamples.at(3)?.title || "Default Title 11",
    },
    {
      id: "3",
      title: chatExamples.at(4)?.title || "Default Title 12",
    },
    {
      id: "4",
      title: chatExamples.at(5)?.title || "Default Title 13",
    },
    {
      id: "5",
      title: chatExamples.at(6)?.title || "Default Title 14",
    },
  ],
};

export function SidebarItems({ onSelect }: SidebarItemsProps) {
  return (
    <div className="overflow-auto relative h-full md:h-[410px] mt-4 scrollbar-hide p-4 pt-0 pb-[70px] flex flex-col space-y-6">
      {!Object.keys(items).length && (
        <div className="flex flex-col justify-center items-center h-full">
          <div className="flex flex-col items-center -mt-12 text-xs space-y-1">
            <span className="text-[#878787]">History</span>
            <span>No results found</span>
          </div>
        </div>
      )}

      {Object.keys(items).map((key) => {
        const section = items[key as keyof typeof items];

        return (
          <div key={key}>
            {section?.length > 0 && (
              <div className="sticky top-0 z-20 w-full bg-background dark:bg-[#131313] pb-1">
                <span className="font-mono text-xs">{formatRange(key)}</span>
              </div>
            )}

            <div className="mt-1">
              {section?.map((chat) => {
                return (
                  <SidebarItem key={chat.id} chat={chat} onSelect={onSelect} />
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
