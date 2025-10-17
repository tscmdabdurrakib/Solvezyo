import { pgTable, text, serial, integer, boolean, varchar, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Category schema
export const categories = pgTable("categories", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  count: integer("count").notNull().default(0),
  icon: text("icon").notNull(),
  color: text("color").notNull(),
});

export const insertCategorySchema = createInsertSchema(categories);
export type InsertCategory = z.infer<typeof insertCategorySchema>;
export type Category = typeof categories.$inferSelect;

// Tool schema
export const tools = pgTable("tools", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  categoryId: text("category_id").notNull().references(() => categories.id),
  icon: text("icon").notNull(),
  views: integer("views").notNull().default(0),
  gradient: text("gradient").notNull(),
  features: text("features"),
  isPopular: boolean("is_popular").notNull().default(false),
  isRecent: boolean("is_recent").notNull().default(false),
});

export const insertToolSchema = createInsertSchema(tools);
export type InsertTool = z.infer<typeof insertToolSchema>;
export type Tool = typeof tools.$inferSelect;

// Original hardcoded data from client (for MemStorage)
// These are manually added and would normally come from a database
export const categoriesData: Category[] = [
  // Sample categories that would be in the database
  // In a real implementation, these would be stored in the database
];

// Tool visits tracking
export const toolVisits = pgTable("tool_visits", {
  id: serial("id").primaryKey(),
  toolId: text("tool_id").notNull(),
  sessionId: text("session_id"),
  userAgent: text("user_agent"),
  ipAddress: text("ip_address"),
  visitedAt: timestamp("visited_at").defaultNow().notNull(),
});

export const insertToolVisitSchema = createInsertSchema(toolVisits);
export type InsertToolVisit = z.infer<typeof insertToolVisitSchema>;
export type ToolVisit = typeof toolVisits.$inferSelect;
// Website visits tracking
export const websiteVisits = pgTable("website_visits", {
  id: serial("id").primaryKey(),
  sessionId: text("session_id"),
  visitedAt: timestamp("visited_at").defaultNow().notNull(),
});

export const insertWebsiteVisitSchema = createInsertSchema(websiteVisits);
export type InsertWebsiteVisit = z.infer<typeof insertWebsiteVisitSchema>;
export type WebsiteVisit = typeof websiteVisits.$inferSelect;


export const toolsData: Tool[] = [
  // Sample tools that would be in the database
  // In a real implementation, these would be stored in the database
];
