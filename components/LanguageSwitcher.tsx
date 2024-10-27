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
      <SelectTrigger className="h-6 rounded border-primary/20 bg-secondary !px-2 hover:border-primary/40">
        <div className="flex items-start gap-2">
          <span className="text-xs font-medium">
            {formatLanguage(currentLocale)}
          </span>
        </div>
      </SelectTrigger>
      <SelectContent>
        {langs.map(({ text, value }) => (
          <SelectItem
            key={value}
            value={value}
            className="text-sm font-medium text-primary/60"
          >
            {text}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
