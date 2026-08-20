export interface TransformerConfig {
  document: Document;
  protocolIdentifier: string;
  excludeStartWithPatterns: readonly string[];
  localPathPrefixes: readonly string[];
  publicPrefix: string;
  language: string;
  obfuscateEmail: boolean;
}

export type AnchorTransformer = (
  anchor: globalThis.HTMLAnchorElement,
) => Promise<string | undefined>;

export type CreateAnchorTransformer = (
  config: TransformerConfig,
) => AnchorTransformer;

declare const createAnchorTransformer: CreateAnchorTransformer;
