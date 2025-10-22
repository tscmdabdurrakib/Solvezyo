import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Filter } from 'lucide-react';
import { useState } from 'react';

interface PromptSearchProps {
  onSearch: (query: string) => void;
  onFilter: () => void;
}

export function PromptSearch({ onSearch, onFilter }: PromptSearchProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input 
          placeholder="Search prompts..." 
          className="pl-10 py-6 text-base"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <Button type="submit" size="lg" className="px-6">
        <Search className="h-4 w-4 mr-2" />
        Search
      </Button>
      <Button 
        type="button" 
        size="lg" 
        variant="outline" 
        className="px-6"
        onClick={onFilter}
      >
        <Filter className="h-4 w-4 mr-2" />
        Filters
      </Button>
    </form>
  );
}