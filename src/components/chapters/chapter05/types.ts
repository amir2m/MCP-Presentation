export type ScenarioId = 'scenario-a' | 'scenario-b' | 'scenario-c' | 'scenario-d';

export type ParticipantId =
  | 'user'
  | 'host'
  | 'llm'
  | 'mcp-client'
  | 'mcp-server'
  | 'external-db';

export type LifecycleStepNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export type DebuggerTabId =
  | 'model-tool-call'
  | 'mcp-request'
  | 'server-sql'
  | 'mcp-result'
  | 'final-response';

export interface LifecycleStepInfo {
  stepNumber: LifecycleStepNumber;
  titlePersian: string;
  titleEnglish: string;
  descriptionPersian: string;
  activeSender: ParticipantId;
  activeReceiver: ParticipantId;
  pathDescription: string;
  activeLayer: 'user' | 'host-model' | 'mcp-protocol' | 'server-internal' | 'return-path';
  suggestedDebuggerTab: DebuggerTabId;
}

export interface ScenarioDefinition {
  id: ScenarioId;
  namePersian: string;
  nameEnglish: string;
  shortTag: string;
  badgeVariant: 'cyan' | 'indigo' | 'slate' | 'outline' | 'success';
  summaryPersian: string;
  stockStatusText: string;
  userQuery: string;
  modelToolCallPayload: {
    tool_call: {
      name: string;
      arguments: {
        sku: string;
      };
    };
  };
  mcpRequestPayload: {
    jsonrpc: '2.0';
    id: string;
    method: 'tools/call';
    params: {
      name: string;
      arguments: {
        sku: string;
      };
      _meta: {
        'io.modelcontextprotocol/protocolVersion': string;
        'io.modelcontextprotocol/clientCapabilities': Record<string, unknown>;
        'io.modelcontextprotocol/clientInfo': {
          name: string;
          version: string;
        };
      };
    };
  };
  serverSql: string;
  mcpResultPayload:
    | {
        jsonrpc: '2.0';
        id: string;
        result: {
          resultType: 'complete';
          isError?: boolean;
          content: Array<{
            type: 'text';
            text: string;
          }>;
        };
      }
    | {
        jsonrpc: '2.0';
        id: string;
        error: {
          code: number;
          message: string;
        };
      };
  finalModelResponse: string;
  inventoryReference?: string;
}
