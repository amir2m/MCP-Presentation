export type TrustBoundaryType = 'untrusted-data' | 'unsandboxed-process' | 'network-oauth';

export interface UseCaseScenario {
  id: string;
  titlePersian: string;
  titleEnglish: string;
  category: 'developer' | 'enterprise' | 'automation';
  hostName: string;
  mcpClientRole: string;
  mcpServerName: string;
  transportType: 'STDIO' | 'Streamable HTTP' | 'STDIO (محلی) / Streamable HTTP (راه دور)';
  underlyingService: string;
  description: string;
  securityRiskNote: string;
  toolsExposed: string[];
  resourcesExposed?: string[];
  activeBoundaries: TrustBoundaryType[];
}

export interface MultiToolStep {
  stepNumber: number;
  titlePersian: string;
  actor: 'user' | 'host' | 'client-inventory' | 'client-procurement' | 'server-inventory' | 'server-procurement';
  actionPersian: string;
  details: string;
  payload?: Record<string, unknown>;
  status?: string;
  isMockData?: boolean;
}

export type SecurityOperationId = 'query_log' | 'send_email' | 'reorder_inventory' | 'drop_table';
export type SecurityPolicyDecision = 'ALLOW' | 'CONFIRM' | 'DENY';
export type SecurityRiskLevel = 'low' | 'medium' | 'high' | 'critical';

export interface SecurityPolicyItem {
  id: SecurityOperationId;
  name: string;
  toolName: string;
  riskLevel: SecurityRiskLevel;
  riskLevelPersian: string;
  defaultDecision: SecurityPolicyDecision;
  decisionPersian: string;
  summaryPersian: string;
  riskExplanationPersian: string;
  owaspReference: string;
  mcpSpecReference: string;
  mockPayload: Record<string, unknown>;
  mockOutcome: string;
}

export interface RoadmapPriority {
  id: string;
  priorityNumber: number;
  titleEnglish: string;
  titlePersian: string;
  descriptionPersian: string;
  category: 'core-protocol' | 'transport' | 'security' | 'developer-experience';
  statusBadge: string;
}

export interface SynthesisChapterNode {
  chapterId: number;
  numberPersian: string;
  titlePersian: string;
  titleEnglish: string;
  coreTakeawayPersian: string;
  iconName: 'Sparkles' | 'Layers' | 'Network' | 'Cpu' | 'Workflow' | 'ArrowLeftRight' | 'ShieldCheck';
  badgeColor: 'cyan' | 'indigo' | 'emerald' | 'purple' | 'amber';
}

export interface AntiPatternItem {
  id: string;
  scenarioPersian: string;
  whyAvoidPersian: string;
  betterAlternativePersian: string;
  riskOfUsingMcpPersian: string;
}
