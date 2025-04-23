import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertCrimeIncidentSchema, 
  insertDistrictSchema, 
  insertCrimeTypeSchema,
  insertDataImportSchema
} from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Crime Incidents
  app.get("/api/incidents", async (req, res) => {
    try {
      const incidents = await storage.getCrimeIncidents();
      res.json(incidents);
    } catch (error) {
      res.status(500).json({ message: "Failed to retrieve crime incidents" });
    }
  });

  app.get("/api/incidents/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID format" });
      }
      
      const incident = await storage.getCrimeIncidentById(id);
      if (!incident) {
        return res.status(404).json({ message: "Incident not found" });
      }
      
      res.json(incident);
    } catch (error) {
      res.status(500).json({ message: "Failed to retrieve crime incident" });
    }
  });

  app.post("/api/incidents", async (req, res) => {
    try {
      const validatedData = insertCrimeIncidentSchema.parse(req.body);
      const newIncident = await storage.createCrimeIncident(validatedData);
      res.status(201).json(newIncident);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid incident data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create crime incident" });
    }
  });

  app.patch("/api/incidents/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID format" });
      }
      
      // Partial validation of the request body
      const validatedData = insertCrimeIncidentSchema.partial().parse(req.body);
      
      const updatedIncident = await storage.updateCrimeIncident(id, validatedData);
      if (!updatedIncident) {
        return res.status(404).json({ message: "Incident not found" });
      }
      
      res.json(updatedIncident);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid incident data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to update crime incident" });
    }
  });

  app.delete("/api/incidents/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID format" });
      }
      
      const deleted = await storage.deleteCrimeIncident(id);
      if (!deleted) {
        return res.status(404).json({ message: "Incident not found" });
      }
      
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete crime incident" });
    }
  });

  // Filter incidents
  app.get("/api/incidents/filter/type/:type", async (req, res) => {
    try {
      const incidents = await storage.getCrimeIncidentsByType(req.params.type);
      res.json(incidents);
    } catch (error) {
      res.status(500).json({ message: "Failed to retrieve filtered incidents" });
    }
  });

  app.get("/api/incidents/filter/district/:district", async (req, res) => {
    try {
      const incidents = await storage.getCrimeIncidentsByDistrict(req.params.district);
      res.json(incidents);
    } catch (error) {
      res.status(500).json({ message: "Failed to retrieve filtered incidents" });
    }
  });

  app.get("/api/incidents/filter/date-range", async (req, res) => {
    try {
      const startDate = req.query.start as string;
      const endDate = req.query.end as string;
      
      if (!startDate || !endDate) {
        return res.status(400).json({ message: "Start and end dates are required" });
      }
      
      const incidents = await storage.getCrimeIncidentsInDateRange(
        new Date(startDate), 
        new Date(endDate)
      );
      
      res.json(incidents);
    } catch (error) {
      res.status(500).json({ message: "Failed to retrieve filtered incidents" });
    }
  });

  // Districts
  app.get("/api/districts", async (_req, res) => {
    try {
      const districts = await storage.getDistricts();
      res.json(districts);
    } catch (error) {
      res.status(500).json({ message: "Failed to retrieve districts" });
    }
  });

  app.post("/api/districts", async (req, res) => {
    try {
      const validatedData = insertDistrictSchema.parse(req.body);
      const newDistrict = await storage.createDistrict(validatedData);
      res.status(201).json(newDistrict);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid district data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create district" });
    }
  });

  // Crime Types
  app.get("/api/crime-types", async (_req, res) => {
    try {
      const crimeTypes = await storage.getCrimeTypes();
      res.json(crimeTypes);
    } catch (error) {
      res.status(500).json({ message: "Failed to retrieve crime types" });
    }
  });

  app.post("/api/crime-types", async (req, res) => {
    try {
      const validatedData = insertCrimeTypeSchema.parse(req.body);
      const newCrimeType = await storage.createCrimeType(validatedData);
      res.status(201).json(newCrimeType);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid crime type data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create crime type" });
    }
  });

  // Data Imports
  app.get("/api/data-imports", async (_req, res) => {
    try {
      const imports = await storage.getDataImports();
      res.json(imports);
    } catch (error) {
      res.status(500).json({ message: "Failed to retrieve data imports" });
    }
  });

  app.post("/api/data-imports", async (req, res) => {
    try {
      const validatedData = insertDataImportSchema.parse(req.body);
      const newImport = await storage.createDataImport(validatedData);
      
      // Simulate processing
      setTimeout(async () => {
        await storage.updateDataImportStatus(newImport.id, "processed", validatedData.recordCount || 0);
      }, 2000);
      
      res.status(201).json(newImport);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid import data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create data import" });
    }
  });

  // Settings
  app.get("/api/settings", async (_req, res) => {
    try {
      const settings = await storage.getSettings();
      res.json(settings);
    } catch (error) {
      res.status(500).json({ message: "Failed to retrieve settings" });
    }
  });

  app.get("/api/settings/:key", async (req, res) => {
    try {
      const setting = await storage.getSetting(req.params.key);
      if (!setting) {
        return res.status(404).json({ message: "Setting not found" });
      }
      res.json(setting);
    } catch (error) {
      res.status(500).json({ message: "Failed to retrieve setting" });
    }
  });

  app.post("/api/settings", async (req, res) => {
    try {
      const { key, value, description } = req.body;
      
      if (!key || !value) {
        return res.status(400).json({ message: "Key and value are required" });
      }
      
      const setting = await storage.createOrUpdateSetting(key, value, description);
      res.status(201).json(setting);
    } catch (error) {
      res.status(500).json({ message: "Failed to create/update setting" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
