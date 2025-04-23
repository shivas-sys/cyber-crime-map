import { 
  CrimeIncident, InsertCrimeIncident, 
  District, InsertDistrict, 
  CrimeType, InsertCrimeType,
  DataImport, InsertDataImport,
  Setting, InsertSetting,
  crimeIncidents, districts, crimeTypes, dataImports, settings
} from "@shared/schema";
import { db } from "./db";
import { eq, and, gte, lte } from "drizzle-orm";

// Storage interface
export interface IStorage {
  // Crime Incidents
  getCrimeIncidents(): Promise<CrimeIncident[]>;
  getCrimeIncidentById(id: number): Promise<CrimeIncident | undefined>;
  getCrimeIncidentsByType(crimeType: string): Promise<CrimeIncident[]>;
  getCrimeIncidentsByDistrict(district: string): Promise<CrimeIncident[]>;
  getCrimeIncidentsInDateRange(startDate: Date, endDate: Date): Promise<CrimeIncident[]>;
  createCrimeIncident(incident: InsertCrimeIncident): Promise<CrimeIncident>;
  updateCrimeIncident(id: number, incident: Partial<InsertCrimeIncident>): Promise<CrimeIncident | undefined>;
  deleteCrimeIncident(id: number): Promise<boolean>;
  
  // Districts
  getDistricts(): Promise<District[]>;
  getDistrictById(id: number): Promise<District | undefined>;
  createDistrict(district: InsertDistrict): Promise<District>;
  
  // Crime Types
  getCrimeTypes(): Promise<CrimeType[]>;
  getCrimeTypeById(id: number): Promise<CrimeType | undefined>;
  createCrimeType(crimeType: InsertCrimeType): Promise<CrimeType>;
  
  // Data Imports
  getDataImports(): Promise<DataImport[]>;
  getDataImportById(id: number): Promise<DataImport | undefined>;
  createDataImport(dataImport: InsertDataImport): Promise<DataImport>;
  updateDataImportStatus(id: number, status: string, recordCount?: number): Promise<DataImport | undefined>;
  
  // Settings
  getSettings(): Promise<Setting[]>;
  getSetting(key: string): Promise<Setting | undefined>;
  createOrUpdateSetting(key: string, value: string, description?: string): Promise<Setting>;
}

export class MemStorage implements IStorage {
  private crimeIncidents: Map<number, CrimeIncident>;
  private districts: Map<number, District>;
  private crimeTypes: Map<number, CrimeType>;
  private dataImports: Map<number, DataImport>;
  private settings: Map<number, Setting>;
  
  private lastCrimeIncidentId: number;
  private lastDistrictId: number;
  private lastCrimeTypeId: number;
  private lastDataImportId: number;
  private lastSettingId: number;
  
  constructor() {
    this.crimeIncidents = new Map();
    this.districts = new Map();
    this.crimeTypes = new Map();
    this.dataImports = new Map();
    this.settings = new Map();
    
    this.lastCrimeIncidentId = 0;
    this.lastDistrictId = 0;
    this.lastCrimeTypeId = 0;
    this.lastDataImportId = 0;
    this.lastSettingId = 0;
    
    // Initialize with sample data
    this.initializeData();
  }
  
  private initializeData() {
    // Initialize districts
    const districtNames = ["Downtown", "North Side", "South Side", "West End", "East Side"];
    districtNames.forEach(name => {
      this.createDistrict({ name, description: `${name} district area` });
    });
    
    // Initialize crime types
    const crimeTypeData = [
      { name: "Theft", description: "Property theft incidents", severity: 6 },
      { name: "Assault", description: "Physical assault cases", severity: 8 },
      { name: "Burglary", description: "Breaking and entering into buildings", severity: 7 },
      { name: "Vandalism", description: "Property damage", severity: 4 },
      { name: "Robbery", description: "Theft using force or threat", severity: 8 }
    ];
    
    crimeTypeData.forEach(type => {
      this.createCrimeType(type);
    });
  }
  
  // Crime Incidents
  async getCrimeIncidents(): Promise<CrimeIncident[]> {
    return Array.from(this.crimeIncidents.values());
  }
  
  async getCrimeIncidentById(id: number): Promise<CrimeIncident | undefined> {
    return this.crimeIncidents.get(id);
  }
  
  async getCrimeIncidentsByType(crimeType: string): Promise<CrimeIncident[]> {
    return Array.from(this.crimeIncidents.values()).filter(
      incident => incident.crimeType.toLowerCase() === crimeType.toLowerCase()
    );
  }
  
  async getCrimeIncidentsByDistrict(district: string): Promise<CrimeIncident[]> {
    return Array.from(this.crimeIncidents.values()).filter(
      incident => incident.district.toLowerCase() === district.toLowerCase()
    );
  }
  
  async getCrimeIncidentsInDateRange(startDate: Date, endDate: Date): Promise<CrimeIncident[]> {
    return Array.from(this.crimeIncidents.values()).filter(incident => {
      const incidentDate = new Date(incident.dateTime);
      return incidentDate >= startDate && incidentDate <= endDate;
    });
  }
  
  async createCrimeIncident(incident: InsertCrimeIncident): Promise<CrimeIncident> {
    const id = ++this.lastCrimeIncidentId;
    const newIncident = { ...incident, id };
    this.crimeIncidents.set(id, newIncident);
    return newIncident;
  }
  
  async updateCrimeIncident(id: number, incident: Partial<InsertCrimeIncident>): Promise<CrimeIncident | undefined> {
    const existingIncident = this.crimeIncidents.get(id);
    if (!existingIncident) return undefined;
    
    const updatedIncident = { ...existingIncident, ...incident };
    this.crimeIncidents.set(id, updatedIncident);
    return updatedIncident;
  }
  
  async deleteCrimeIncident(id: number): Promise<boolean> {
    return this.crimeIncidents.delete(id);
  }
  
  // Districts
  async getDistricts(): Promise<District[]> {
    return Array.from(this.districts.values());
  }
  
  async getDistrictById(id: number): Promise<District | undefined> {
    return this.districts.get(id);
  }
  
  async createDistrict(district: InsertDistrict): Promise<District> {
    const id = ++this.lastDistrictId;
    const newDistrict = { ...district, id };
    this.districts.set(id, newDistrict);
    return newDistrict;
  }
  
  // Crime Types
  async getCrimeTypes(): Promise<CrimeType[]> {
    return Array.from(this.crimeTypes.values());
  }
  
  async getCrimeTypeById(id: number): Promise<CrimeType | undefined> {
    return this.crimeTypes.get(id);
  }
  
  async createCrimeType(crimeType: InsertCrimeType): Promise<CrimeType> {
    const id = ++this.lastCrimeTypeId;
    const newCrimeType = { ...crimeType, id };
    this.crimeTypes.set(id, newCrimeType);
    return newCrimeType;
  }
  
  // Data Imports
  async getDataImports(): Promise<DataImport[]> {
    return Array.from(this.dataImports.values());
  }
  
  async getDataImportById(id: number): Promise<DataImport | undefined> {
    return this.dataImports.get(id);
  }
  
  async createDataImport(dataImport: InsertDataImport): Promise<DataImport> {
    const id = ++this.lastDataImportId;
    const newDataImport: DataImport = {
      ...dataImport,
      id,
      importDate: new Date(),
      status: "processing",
    };
    this.dataImports.set(id, newDataImport);
    return newDataImport;
  }
  
  async updateDataImportStatus(id: number, status: string, recordCount?: number): Promise<DataImport | undefined> {
    const existingImport = this.dataImports.get(id);
    if (!existingImport) return undefined;
    
    const updatedImport = { 
      ...existingImport, 
      status, 
      ...(recordCount !== undefined ? { recordCount } : {}) 
    };
    
    this.dataImports.set(id, updatedImport);
    return updatedImport;
  }
  
  // Settings
  async getSettings(): Promise<Setting[]> {
    return Array.from(this.settings.values());
  }
  
  async getSetting(key: string): Promise<Setting | undefined> {
    return Array.from(this.settings.values()).find(setting => setting.key === key);
  }
  
  async createOrUpdateSetting(key: string, value: string, description?: string): Promise<Setting> {
    const existingSetting = await this.getSetting(key);
    
    if (existingSetting) {
      const updatedSetting = { 
        ...existingSetting, 
        value,
        ...(description ? { description } : {})
      };
      this.settings.set(existingSetting.id, updatedSetting);
      return updatedSetting;
    }
    
    const id = ++this.lastSettingId;
    const newSetting: Setting = { 
      id, 
      key, 
      value, 
      ...(description ? { description } : { description: null }) 
    };
    this.settings.set(id, newSetting);
    return newSetting;
  }
}

export class DatabaseStorage implements IStorage {
  async getCrimeIncidents(): Promise<CrimeIncident[]> {
    const result = await db.select().from(crimeIncidents);
    return result;
  }

  async getCrimeIncidentById(id: number): Promise<CrimeIncident | undefined> {
    const [result] = await db.select().from(crimeIncidents).where(eq(crimeIncidents.id, id));
    return result;
  }

  async getCrimeIncidentsByType(crimeType: string): Promise<CrimeIncident[]> {
    const result = await db.select().from(crimeIncidents).where(eq(crimeIncidents.crimeType, crimeType));
    return result;
  }

  async getCrimeIncidentsByDistrict(district: string): Promise<CrimeIncident[]> {
    const result = await db.select().from(crimeIncidents).where(eq(crimeIncidents.district, district));
    return result;
  }

  async getCrimeIncidentsInDateRange(startDate: Date, endDate: Date): Promise<CrimeIncident[]> {
    const result = await db.select().from(crimeIncidents)
      .where(
        and(
          gte(crimeIncidents.dateTime, startDate.toISOString()),
          lte(crimeIncidents.dateTime, endDate.toISOString())
        )
      );
    return result;
  }

  async createCrimeIncident(incident: InsertCrimeIncident): Promise<CrimeIncident> {
    const [result] = await db.insert(crimeIncidents).values(incident).returning();
    return result;
  }

  async updateCrimeIncident(id: number, incident: Partial<InsertCrimeIncident>): Promise<CrimeIncident | undefined> {
    const [result] = await db.update(crimeIncidents)
      .set(incident)
      .where(eq(crimeIncidents.id, id))
      .returning();
    return result;
  }

  async deleteCrimeIncident(id: number): Promise<boolean> {
    const result = await db.delete(crimeIncidents).where(eq(crimeIncidents.id, id));
    return true;
  }

  async getDistricts(): Promise<District[]> {
    const result = await db.select().from(districts);
    return result;
  }

  async getDistrictById(id: number): Promise<District | undefined> {
    const [result] = await db.select().from(districts).where(eq(districts.id, id));
    return result;
  }

  async createDistrict(district: InsertDistrict): Promise<District> {
    const [result] = await db.insert(districts).values(district).returning();
    return result;
  }

  async getCrimeTypes(): Promise<CrimeType[]> {
    const result = await db.select().from(crimeTypes);
    return result;
  }

  async getCrimeTypeById(id: number): Promise<CrimeType | undefined> {
    const [result] = await db.select().from(crimeTypes).where(eq(crimeTypes.id, id));
    return result;
  }

  async createCrimeType(crimeType: InsertCrimeType): Promise<CrimeType> {
    const [result] = await db.insert(crimeTypes).values(crimeType).returning();
    return result;
  }

  async getDataImports(): Promise<DataImport[]> {
    const result = await db.select().from(dataImports);
    return result;
  }

  async getDataImportById(id: number): Promise<DataImport | undefined> {
    const [result] = await db.select().from(dataImports).where(eq(dataImports.id, id));
    return result;
  }

  async createDataImport(dataImport: InsertDataImport): Promise<DataImport> {
    const [result] = await db.insert(dataImports).values(dataImport).returning();
    return result;
  }

  async updateDataImportStatus(id: number, status: string, recordCount?: number): Promise<DataImport | undefined> {
    const [result] = await db.update(dataImports)
      .set({ 
        status, 
        ...(recordCount !== undefined ? { recordCount } : {}) 
      })
      .where(eq(dataImports.id, id))
      .returning();
    return result;
  }

  async getSettings(): Promise<Setting[]> {
    const result = await db.select().from(settings);
    return result;
  }

  async getSetting(key: string): Promise<Setting | undefined> {
    const [result] = await db.select().from(settings).where(eq(settings.key, key));
    return result;
  }

  async createOrUpdateSetting(key: string, value: string, description?: string): Promise<Setting> {
    const existingSetting = await this.getSetting(key);
    
    if (existingSetting) {
      const [result] = await db.update(settings)
        .set({ value, ...(description ? { description } : {}) })
        .where(eq(settings.id, existingSetting.id))
        .returning();
      return result;
    } else {
      const [result] = await db.insert(settings)
        .values({ key, value, ...(description ? { description } : {}) })
        .returning();
      return result;
    }
  }
}

export const storage = new DatabaseStorage();
