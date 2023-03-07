import type { SSRResult } from '../../../@types/astro';
export declare const ScopeFlags: {
    readonly Astro: number;
    readonly JSX: number;
    readonly Slot: number;
    readonly HeadBuffer: number;
    readonly RenderSlot: number;
};
type ScopeFlagValues = (typeof ScopeFlags)[keyof typeof ScopeFlags];
export declare function addScopeFlag(result: SSRResult, flag: ScopeFlagValues): void;
export declare function removeScopeFlag(result: SSRResult, flag: ScopeFlagValues): void;
export declare function hasScopeFlag(result: SSRResult, flag: ScopeFlagValues): boolean;
export declare function createScopedResult(result: SSRResult, flag?: ScopeFlagValues): SSRResult;
export {};
