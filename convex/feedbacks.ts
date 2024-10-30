import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const create = mutation({
  args: {
    content: v.string(),
  },
  handler: async (ctx, args) => {
    const feedbackId = await ctx.db.insert("feedbacks", {
      content: args.content,
      createdAt: new Date().toISOString(),
      status: "new",
    });
    return feedbackId;
  },
});
