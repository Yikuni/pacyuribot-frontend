export interface CrawlTaskConfig {
    title_filter: boolean;
    max_length_c: number;
    max_length_e: number;
    min_page_content_length: number;
    allow_origins: string[];
    dis_allow_origins: string[];
    target_urls: string[];
    max_depth: number;
    allow_external_link: boolean;
}

export interface CrawlTaskRecord {
    owner: string | undefined;
    completed: boolean;
    data_source: string;
    config: CrawlTaskConfig;
}