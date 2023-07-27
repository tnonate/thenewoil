import { HTMLAnchorElement } from "linkedom";

export interface TransformerConfig {
  protocolIdentifier: string;
  excludeStartWithPatterns: readonly string[];
  localPathPrefixes: readonly string[];
  publicPrefix: string;
  language: string;
}

export type AnchorTransformer = (
  anchor: HTMLAnchorElement
) => Promise<string | undefined>;

export type CreateAnchorTransformer = (
  config: TransformerConfig
) => AnchorTransformer;

declare const createAnchorTransformer: CreateAnchorTransformer;
