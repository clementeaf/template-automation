declare module 'alova' {
  interface AlovaConfig {
    baseURL?: string;
    statesHook: unknown;
    requestAdapter: unknown;
    beforeRequest?: (params: { config: Record<string, unknown> }) => void;
    responded?: (response: unknown) => Promise<unknown>;
    [key: string]: unknown;
  }
  export function createAlova(config: AlovaConfig): unknown;
}

declare module 'alova/react' {
  export const ReactHook: unknown;
}

declare module '@alova/adapter-xhr' {
  export function xhrRequestAdapter(): unknown;
} 