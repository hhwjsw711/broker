import { getAuthUserId } from "@convex-dev/auth/server";
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const viewer = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) {
      throw new Error("Not signed in");
    }
    const user = await ctx.db.get(userId);
    if (user === null) {
      throw new Error("User was deleted");
    }
    return user;
  },
});

// 认证 mutation
export const authenticate = mutation({
  args: {
    value: v.any(),
    metadata: v.object({
      name: v.string(),
      track: v.optional(
        v.object({
          event: v.string(),
          channel: v.string(),
        }),
      ),
    }),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) {
      throw new Error("Not signed in");
    }

    const user = await ctx.db.get(userId);
    if (user === null) {
      throw new Error("User was deleted");
    }

    // 认证通过，返回原始数据
    return args.value;
  },
});
