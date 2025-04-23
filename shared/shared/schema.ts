import { pgTable, text, serial, integer, timestamp, doublePrecision, boolean, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Crime incident data
export const crimeIncidents = pgTable("crime_incidents", {
  id: serial("id").primaryKey(),
  crimeType: text("crime_type").notNull(),
  latitude: doublePrecision("latitude").notNull(),
  longitude: doublePrecision("longitude").notNull(),
  district: text("district").notNull(),
  description: text("description"),
  dateTime: timestamp("date_time").notNull(),
  status: text("status").default("open"),
});

export const insertCrimeIncidentSchema = createInsertSchema(crimeIncidents).omit({
  id: true,
});

// District data
export const districts = pgTable("districts", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
  description: text("description"),
});

export const insertDistrictSchema = createInsertSchema(districts).omit({
  id: true,
});

// Crime types
export const crimeTypes = pgTable("crime_types", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
  description: text("description"),
  severity: integer("severity").notNull(), // 1-10 scale
});

export const insertCrimeTypeSchema = createInsertSchema(crimeTypes).omit({
  id: true,
});

// Data imports
export const dataImports = pgTable("data_imports", {
  id: serial("id").primaryKey(),
  fileName: text("file_name").notNull(),
  importDate: timestamp("import_date").notNull().defaultNow(),
  status: text("status").notNull().default("processing"),
  recordCount: integer("record_count"),
  fileType: text("file_type").notNull(),
  metadata: json("metadata"),
});

export const insertDataImportSchema = createInsertSchema(dataImports).omit({
  id: true,
  importDate: true,
  status: true,
});

// Settings
export const settings = pgTable("settings", {
  id: serial("id").primaryKey(),
  key: text("key").notNull().unique(),
  value: text("value").notNull(),
  description: text("description"),
});

export const insertSettingSchema = createInsertSchema(settings).omit({
  id: true,
});

// Export types
export type CrimeIncident = typeof crimeIncidents.$inferSelect;
export type InsertCrimeIncident = z.infer<typeof insertCrimeIncidentSchema>;

export type District = typeof districts.$inferSelect;
export type InsertDistrict = z.infer<typeof insertDistrictSchema>;

export type CrimeType = typeof crimeTypes.$inferSelect;
export type InsertCrimeType = z.infer<typeof insertCrimeTypeSchema>;

export type DataImport = typeof dataImports.$inferSelect;
export type InsertDataImport = z.infer<typeof insertDataImportSchema>;

export type Setting = typeof settings.$inferSelect;
export type InsertSetting = z.infer<typeof insertSettingSchema>;
