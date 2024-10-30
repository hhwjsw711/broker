"use client";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

export function FeedbackForm() {
  const [value, setValue] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const createFeedback = useMutation(api.feedbacks.create);

  const handleSubmit = () => {
    createFeedback({ content: value })
      .then(() => {
        setValue("");
        setIsSuccess(true);
      })
      .catch((error) => {
        console.error("Failed to create feedback:", error);
      });
  };

  return (
    <Popover>
      <PopoverTrigger asChild className="hidden md:block">
        <Button
          variant="outline"
          className="rounded-full font-normal h-[32px] p-0 px-3 text-xs text-[#878787]"
        >
          Feedback
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-[320px] h-[200px]"
        sideOffset={10}
        align="end"
      >
        {isSuccess ? (
          <div className="flex items-center justify-center flex-col space-y-1 mt-10 text-center">
            <p className="font-medium text-sm">Thank you for your feedback!</p>
            <p className="text-sm text-[#4C4C4C]">
              We will be back with you as soon as possible
            </p>
          </div>
        ) : (
          <form className="space-y-4">
            <Textarea
              name="feedback"
              value={value}
              required
              autoFocus
              placeholder="Ideas to improve this page or issues you are experiencing."
              className="resize-none h-[120px]"
              onChange={(evt) => setValue(evt.target.value)}
            />

            <div className="mt-1 flex items-center justify-end">
              <Button
                type="button"
                onClick={handleSubmit}
                disabled={value.length === 0}
              >
                {value.length === 0 ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "Send"
                )}
              </Button>
            </div>
          </form>
        )}
      </PopoverContent>
    </Popover>
  );
}
