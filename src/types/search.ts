
export type SearchType = 'gene' | 'protein' | 'sequence' | 'pdb' | 'blast';

export interface SearchResult {
  id: string;
  title: string;
  description: string;
  type: SearchType;
  source: string;
  url?: string;
  matchScore?: number;
  date?: string;
}

export interface SequenceData {
  id: string;
  name: string;
  sequence: string;
  length: number;
  organism?: string;
  source?: string;
}

export interface AlignmentResult {
  query: SequenceData;
  subject: SequenceData;
  score: number;
  identity: number;
  alignments: {
    queryStart: number;
    queryEnd: number;
    subjectStart: number;
    subjectEnd: number;
    querySequence: string;
    alignmentMap: string;
    subjectSequence: string;
  }[];
}

export interface SearchFilters {
  sources?: string[];
  organisms?: string[];
  date?: {
    from?: Date;
    to?: Date;
  };
  size?: {
    min?: number;
    max?: number;
  };
}
