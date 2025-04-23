import { QueryClient, QueryFunction } from "@tanstack/react-query";
import { 
  staticCrimeIncidents, 
  staticDistricts, 
  staticCrimeTypes, 
  staticDataImports,
  getIncidentsByType,
  getIncidentsByDistrict
} from "@/staticData";

// Check if we're in a static deployment (no backend server)
const isStaticDeployment = import.meta.env.VITE_STATIC_DEPLOYMENT === "true";

async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    const text = (await res.text()) || res.statusText;
    throw new Error(`${res.status}: ${text}`);
  }
}

// Handle static API requests with mock data
function handleStaticApiRequest(url: string, method: string, data?: unknown): any {
  console.log(`Static API request: ${method} ${url}`);
  
  // GET requests
  if (method === 'GET' || method.toLowerCase() === 'get') {
    if (url.includes('/api/incidents')) {
      // Handle filtered requests
      if (url.includes('?')) {
        const params = new URLSearchParams(url.split('?')[1]);
        const crimeType = params.get('crimeType');
        const district = params.get('district');
        
        if (crimeType) {
          return getIncidentsByType(crimeType);
        }
        
        if (district) {
          return getIncidentsByDistrict(district);
        }
      }
      return staticCrimeIncidents;
    }
    
    if (url.includes('/api/districts')) {
      return staticDistricts;
    }
    
    if (url.includes('/api/crime-types')) {
      return staticCrimeTypes;
    }
    
    if (url.includes('/api/data-imports')) {
      return staticDataImports;
    }
  }
  
  // For other methods, return empty success response
  return { success: true };
}

export async function apiRequest(
  method: string,
  url: string,
  data?: unknown | undefined,
): Promise<Response> {
  // If static deployment, handle API requests with static data
  if (isStaticDeployment) {
    const staticResponse = handleStaticApiRequest(url, method, data);
    // Create a fake Response object with static data
    return new Response(JSON.stringify(staticResponse), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const res = await fetch(url, {
    method,
    headers: data ? { "Content-Type": "application/json" } : {},
    body: data ? JSON.stringify(data) : undefined,
    credentials: "include",
  });

  await throwIfResNotOk(res);
  return res;
}

type UnauthorizedBehavior = "returnNull" | "throw";
export const getQueryFn: <T>(options: {
  on401: UnauthorizedBehavior;
}) => QueryFunction<T> =
  ({ on401: unauthorizedBehavior }) =>
  async ({ queryKey }) => {
    const url = queryKey[0] as string;
    
    // For static deployment, use static data instead of fetching
    if (isStaticDeployment) {
      return handleStaticApiRequest(url, 'GET');
    }

    const res = await fetch(url, {
      credentials: "include",
    });

    if (unauthorizedBehavior === "returnNull" && res.status === 401) {
      return null;
    }

    await throwIfResNotOk(res);
    return await res.json();
  };

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});
