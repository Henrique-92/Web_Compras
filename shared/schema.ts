import { pgTable, text, serial, integer, boolean, doublePrecision } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  sku: text("sku").notNull().unique(),
  category: text("category").notNull(),
  price: doublePrecision("price").notNull(),
  stock: integer("stock").notNull().default(0),
  status: text("status").notNull().default("active"),
  image: text("image"), // URL of the image
});

export const insertProductSchema = createInsertSchema(products).omit({ 
  id: true 
});

export type InsertProduct = z.infer<typeof insertProductSchema>;
export type Product = typeof products.$inferSelect;
