import { CrimeIncident, District, CrimeType, DataImport } from "@/lib/types";

// This file provides static data for the application when deployed as a static site

export const staticCrimeIncidents: CrimeIncident[] = [
  {
    id: 1,
    crimeType: "Theft",
    latitude: 40.730610,
    longitude: -73.935242,
    district: "Downtown",
    description: "Bike stolen from parking rack",
    dateTime: "2023-04-17T10:30:00Z",
    status: "Reported"
  },
  {
    id: 2,
    crimeType: "Assault",
    latitude: 40.733610,
    longitude: -73.991242,
    district: "North Side",
    description: "Physical altercation outside bar",
    dateTime: "2023-04-16T23:15:00Z",
    status: "Under Investigation"
  },
  {
    id: 3,
    crimeType: "Vandalism",
    latitude: 40.731610,
    longitude: -73.998242,
    district: "West End",
    description: "Graffiti on public building",
    dateTime: "2023-04-18T15:45:00Z",
    status: "Reported"
  },
  {
    id: 4,
    crimeType: "Burglary",
    latitude: 40.734610,
    longitude: -73.980242,
    district: "East Side",
    description: "Break-in at local business",
    dateTime: "2023-04-14T02:20:00Z",
    status: "Closed"
  },
  {
    id: 5,
    crimeType: "Theft",
    latitude: 40.729610,
    longitude: -73.989242,
    district: "South Side",
    description: "Wallet stolen on subway",
    dateTime: "2023-04-15T17:30:00Z",
    status: "Reported"
  },
  {
    id: 6,
    crimeType: "Theft",
    latitude: 40.729610,
    longitude: -73.982242,
    district: "Downtown",
    description: "Phone stolen from café table",
    dateTime: "2023-04-18T14:25:00Z",
    status: "Reported"
  },
  {
    id: 7,
    crimeType: "Robbery",
    latitude: 40.732610,
    longitude: -73.990242,
    district: "North Side",
    description: "Convenience store robbery",
    dateTime: "2023-04-13T22:10:00Z",
    status: "Under Investigation"
  },
  {
    id: 8,
    crimeType: "Assault",
    latitude: 40.735610,
    longitude: -73.978242,
    district: "East Side",
    description: "Assault near nightclub",
    dateTime: "2023-04-17T01:30:00Z",
    status: "Under Investigation"
  },
  {
    id: 9,
    crimeType: "Vandalism",
    latitude: 40.730610,
    longitude: -73.995242,
    district: "West End",
    description: "Car vandalized in parking lot",
    dateTime: "2023-04-16T19:45:00Z",
    status: "Reported"
  },
  {
    id: 10,
    crimeType: "Burglary",
    latitude: 40.728610,
    longitude: -73.985242,
    district: "South Side",
    description: "Apartment break-in",
    dateTime: "2023-04-15T03:15:00Z",
    status: "Under Investigation"
  },
  {
    id: 11,
    crimeType: "Theft",
    latitude: 40.731610,
    longitude: -73.983242,
    district: "Downtown",
    description: "Shoplifting at retail store",
    dateTime: "2023-04-18T16:20:00Z",
    status: "Reported"
  },
  {
    id: 12,
    crimeType: "Vandalism",
    latitude: 40.733610,
    longitude: -73.988242,
    district: "North Side",
    description: "Bus stop vandalized",
    dateTime: "2023-04-17T07:40:00Z",
    status: "Reported"
  },
  {
    id: 13,
    crimeType: "Assault",
    latitude: 40.727610,
    longitude: -73.992242,
    district: "South Side",
    description: "Fight at sports event",
    dateTime: "2023-04-14T20:15:00Z",
    status: "Closed"
  },
  {
    id: 14,
    crimeType: "Robbery",
    latitude: 40.734610,
    longitude: -73.986242,
    district: "East Side",
    description: "Mugging on street corner",
    dateTime: "2023-04-16T22:50:00Z",
    status: "Under Investigation"
  },
  {
    id: 15,
    crimeType: "Burglary",
    latitude: 40.729610,
    longitude: -73.997242,
    district: "West End",
    description: "Storage unit break-in",
    dateTime: "2023-04-12T04:10:00Z",
    status: "Closed"
  },
  {
    id: 16,
    crimeType: "Theft",
    latitude: 40.732610,
    longitude: -73.981242,
    district: "Downtown",
    description: "Laptop stolen from library",
    dateTime: "2023-04-17T13:25:00Z",
    status: "Reported"
  },
  {
    id: 17,
    crimeType: "Vandalism",
    latitude: 40.736610,
    longitude: -73.989242,
    district: "North Side",
    description: "Damaged public artwork",
    dateTime: "2023-04-15T10:35:00Z",
    status: "Under Investigation"
  },
  {
    id: 18,
    crimeType: "Assault",
    latitude: 40.730610,
    longitude: -73.993242,
    district: "West End",
    description: "Assault in parking garage",
    dateTime: "2023-04-18T00:20:00Z",
    status: "Reported"
  },
  {
    id: 19,
    crimeType: "Robbery",
    latitude: 40.728610,
    longitude: -73.987242,
    district: "South Side",
    description: "Purse snatching",
    dateTime: "2023-04-16T16:40:00Z",
    status: "Under Investigation"
  },
  {
    id: 20,
    crimeType: "Burglary",
    latitude: 40.734610,
    longitude: -73.984242,
    district: "East Side",
    description: "Office break-in",
    dateTime: "2023-04-13T01:15:00Z",
    status: "Closed"
  }
];

export const staticDistricts: District[] = [
  {
    id: 1,
    name: "Downtown",
    description: "Downtown district area"
  },
  {
    id: 2,
    name: "North Side",
    description: "North Side district area"
  },
  {
    id: 3,
    name: "South Side",
    description: "South Side district area"
  },
  {
    id: 4,
    name: "West End",
    description: "West End district area"
  },
  {
    id: 5,
    name: "East Side",
    description: "East Side district area"
  }
];

export const staticCrimeTypes: CrimeType[] = [
  {
    id: 1,
    name: "Theft",
    description: "Property theft incidents",
    severity: 6
  },
  {
    id: 2,
    name: "Assault",
    description: "Physical assault cases",
    severity: 8
  },
  {
    id: 3,
    name: "Burglary",
    description: "Breaking and entering into buildings",
    severity: 7
  },
  {
    id: 4,
    name: "Vandalism",
    description: "Property damage",
    severity: 4
  },
  {
    id: 5,
    name: "Robbery",
    description: "Theft using force or threat",
    severity: 8
  }
];

export const staticDataImports: DataImport[] = [];

// Helper functions to filter static data
export function getIncidentsByType(crimeType: string): CrimeIncident[] {
  return staticCrimeIncidents.filter(
    incident => incident.crimeType.toLowerCase() === crimeType.toLowerCase()
  );
}

export function getIncidentsByDistrict(district: string): CrimeIncident[] {
  return staticCrimeIncidents.filter(
    incident => incident.district.toLowerCase() === district.toLowerCase()
  );
}

export function getIncidentsInDateRange(startDate: Date, endDate: Date): CrimeIncident[] {
  return staticCrimeIncidents.filter(incident => {
    const incidentDate = new Date(incident.dateTime);
    return incidentDate >= startDate && incidentDate <= endDate;
  });
}