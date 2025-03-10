
import React from 'react';
import { cn } from '@/lib/utils';
import { SearchResult, SearchType } from '@/types/search';
import { Calendar, Link2, Database, ExternalLink } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/custom/Card';

interface SearchResultsProps {
  results: SearchResult[];
  loading?: boolean;
  query?: string;
  searchType?: SearchType;
}

const SearchResults = ({ 
  results, 
  loading = false, 
  query = '', 
  searchType 
}: SearchResultsProps) => {
  
  if (loading) {
    return (
      <div className="w-full max-w-4xl mx-auto mt-8">
        <div className="flex items-center justify-center py-16">
          <div className="relative h-20 w-20">
            <div className="absolute top-0 left-0 h-full w-full border-4 border-bio-blue/20 rounded-full opacity-75 animate-ping"></div>
            <div className="absolute top-0 left-0 h-full w-full border-4 border-t-bio-blue border-bio-neutral-200 rounded-full animate-spin"></div>
          </div>
        </div>
        <p className="text-center text-bio-neutral-500 mt-4">Searching biological databases...</p>
      </div>
    );
  }
  
  if (results.length === 0 && query) {
    return (
      <div className="w-full max-w-4xl mx-auto mt-8">
        <Card className="border-dashed">
          <CardContent className="py-12 flex flex-col items-center">
            <div className="h-16 w-16 rounded-full bg-bio-neutral-100 flex items-center justify-center mb-4">
              <Database className="h-8 w-8 text-bio-neutral-400" />
            </div>
            <h3 className="text-xl font-medium text-bio-neutral-800 mb-2">No results found</h3>
            <p className="text-bio-neutral-500 max-w-md text-center">
              We couldn't find any matches for "{query}" in our databases. 
              Please try different keywords or another search type.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  if (results.length === 0) {
    return null;
  }
  
  return (
    <div className="w-full max-w-4xl mx-auto mt-8">
      <div className="mb-6">
        <h2 className="text-2xl font-medium text-bio-neutral-800 mb-1">
          Search Results
        </h2>
        <p className="text-bio-neutral-500">
          Found {results.length} results for "{query}"
        </p>
      </div>
      
      <div className="space-y-4">
        {results.map((result) => (
          <ResultCard key={result.id} result={result} />
        ))}
      </div>
    </div>
  );
};

interface ResultCardProps {
  result: SearchResult;
}

const ResultCard = ({ result }: ResultCardProps) => {
  return (
    <Card hover>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="mb-1 text-bio-blue hover:text-bio-blue-dark transition-colors">
              {result.title}
            </CardTitle>
            <CardDescription>
              {result.description}
            </CardDescription>
          </div>
          <span className={cn(
            "text-xs font-medium px-2.5 py-1 rounded-full",
            getTypeStyles(result.type)
          )}>
            {result.type.toUpperCase()}
          </span>
        </div>
      </CardHeader>
      
      <CardContent>
        {/* This would be extended with visualization components based on the data type */}
        <div className="bg-bio-neutral-50 rounded-lg p-4 text-bio-neutral-700 text-sm font-mono overflow-hidden text-ellipsis">
          {result.id}
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-between items-center text-sm text-bio-neutral-500">
        <div className="flex items-center">
          <Database className="h-4 w-4 mr-1" />
          <span>Source: {result.source}</span>
        </div>
        
        <div className="flex space-x-4">
          {result.date && (
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              <span>{result.date}</span>
            </div>
          )}
          
          {result.url && (
            <a 
              href={result.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center text-bio-blue hover:text-bio-blue-dark transition-colors"
            >
              <ExternalLink className="h-4 w-4 mr-1" />
              <span>View Source</span>
            </a>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

const getTypeStyles = (type: SearchType) => {
  switch (type) {
    case 'gene':
      return 'bg-bio-green/10 text-bio-green-dark';
    case 'protein':
      return 'bg-bio-blue/10 text-bio-blue-dark';
    case 'sequence':
      return 'bg-purple-100 text-purple-700';
    case 'pdb':
      return 'bg-amber-100 text-amber-700';
    case 'blast':
      return 'bg-red-100 text-red-700';
    default:
      return 'bg-bio-neutral-100 text-bio-neutral-700';
  }
};

export default SearchResults;
