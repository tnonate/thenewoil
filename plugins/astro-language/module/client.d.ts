interface Config {
  supportedLanguageCodes: readonly string[];
  consoleTag: string;
  excludeStartWithPatterns: readonly string[];
  localPathPrefixes: readonly string[];
  protocolIdentifier: string;
  publicPrefix: string;
  logChanges: boolean;
}

export type transformAllAnchors = (config: Config) => void;
declare const transformAllAnchors: transformAllAnchors;
