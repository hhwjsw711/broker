import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { useChangeLocale, useCurrentLocale } from "@/locales/client";

export function LanguageSwitcher() {
  const currentLocale = useCurrentLocale();
  const changeLocale = useChangeLocale();

  const langs = [
    { text: "English", value: "en" },
    { text: "中文", value: "zh" },
  ];
  const formatLanguage = (lng: string) => {
    return langs.find((lang) => lang.value === lng)?.text;
  };

  return (
    <Select value={currentLocale} onValueChange={changeLocale}>
      <SelectTrigger className="h-7 w-[80px] rounded-md border-input bg-transparent text-sm">
        <span className="text-xs">
          {formatLanguage(currentLocale)}
        </span>
      </SelectTrigger>
      <SelectContent align="end">
        {langs.map(({ text, value }) => (
          <SelectItem
            key={value}
            value={value}
            className="text-sm cursor-pointer"
          >
            {text}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}