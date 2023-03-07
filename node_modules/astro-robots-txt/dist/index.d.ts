import type { AstroIntegration } from 'astro';
export type PolicyItem = {
    userAgent: string;
    allow?: string | string[];
    disallow?: string | string[];
    cleanParam?: string | string[];
    crawlDelay?: number;
};
export type RobotsTxtOptions = {
    host?: string | boolean;
    sitemap?: string | string[] | boolean;
    policy?: PolicyItem[];
    sitemapBaseFileName?: string;
    transform?(content: string): string | Promise<string>;
} | undefined;
declare const createRobotsTxtIntegration: (options?: RobotsTxtOptions) => AstroIntegration;
export default createRobotsTxtIntegration;
