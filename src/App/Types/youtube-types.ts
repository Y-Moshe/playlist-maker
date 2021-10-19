export interface YTSearchResponse {
  etag: string;
  items: SearchResultItem[];
  kind: string;
  nextPageToken: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  },
  regionCode: string;
}

export interface SearchResultItem {
  etag: string;
  id: {
    kind: string;
    videoId: string;
  },
  kind: string;
  snippet: SnippetType;
}

export type SnippetType = {
  channelId: string;
  channelTitle: string;
  description: string;
  liveBroadcastContent: string;
  publishTime: Date;
  publishedAt: Date;
  thumbnails: {
    default: ThumbnailType;
    high: ThumbnailType;
    medium: ThumbnailType;
  };
  title: string;
}

export type ThumbnailType = {
  url: string;
  width: number;
  height: number;
}
