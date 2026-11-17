export type ArchitectureMode = 'direct-api' | 'mcp-based';

export type MatrixViewMode = 'custom-m-times-n' | 'mcp-m-plus-n';

export type TriadTab = 'api-layer' | 'model-function-calling' | 'mcp-protocol';

export interface AIHost {
  id: string;
  name: string;
  namePersian: string;
  role: string;
  iconName: 'Code' | 'Monitor' | 'Bot';
  description: string;
}

export interface ExternalService {
  id: string;
  name: string;
  namePersian: string;
  category: string;
  iconName: 'Database' | 'BookOpen' | 'Headphones';
  endpoint: string;
  description: string;
}

export interface MatrixConnection {
  id: string;
  hostId: string;
  serviceId: string;
  label: string;
  customGlueCodeDescription: string;
  mcpStandardChannel: string;
}

export interface DecisionCriterion {
  id: string;
  dimension: string;
  directApiRecommendation: string;
  directApiFit: 'high' | 'medium' | 'low';
  mcpRecommendation: string;
  mcpFit: 'high' | 'medium' | 'low';
  explanation: string;
}

export interface TriadLayerDetail {
  id: TriadTab;
  titlePersian: string;
  titleEnglish: string;
  badge: string;
  roleDescription: string;
  keyResponsibilities: string[];
  scientificDemarcation: string;
  codeSnippetTitle: string;
  codeSnippet: string;
  language: string;
}
