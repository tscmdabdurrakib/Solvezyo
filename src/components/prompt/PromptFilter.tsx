import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PromptFilterProps {
  onFilterChange: (filters: any) => void;
}

export function PromptFilter({ onFilterChange }: PromptFilterProps) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedModels, setSelectedModels] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('popular');
  const [minLikes, setMinLikes] = useState(0);

  const categories = ["Writing", "Coding", "Marketing", "Design", "Business", "Education"];
  const models = ["ChatGPT", "Midjourney", "DALL-E", "Claude", "Gemini"];

  const handleCategoryChange = (category: string) => {
    const updated = selectedCategories.includes(category)
      ? selectedCategories.filter(c => c !== category)
      : [...selectedCategories, category];
    setSelectedCategories(updated);
    onFilterChange({ categories: updated, models: selectedModels, sortBy, minLikes });
  };

  const handleModelChange = (model: string) => {
    const updated = selectedModels.includes(model)
      ? selectedModels.filter(m => m !== model)
      : [...selectedModels, model];
    setSelectedModels(updated);
    onFilterChange({ categories: selectedCategories, models: updated, sortBy, minLikes });
  };

  const handleSortChange = (value: string) => {
    setSortBy(value);
    onFilterChange({ categories: selectedCategories, models: selectedModels, sortBy: value, minLikes });
  };

  const handleLikesChange = (value: number[]) => {
    const min = value[0];
    setMinLikes(min);
    onFilterChange({ categories: selectedCategories, models: selectedModels, sortBy, minLikes: min });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
          </svg>
          Filters
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="font-medium mb-3">Categories</h3>
          <div className="space-y-2">
            {categories.map(category => (
              <div key={category} className="flex items-center space-x-2">
                <Checkbox 
                  id={`category-${category}`}
                  checked={selectedCategories.includes(category)}
                  onCheckedChange={() => handleCategoryChange(category)}
                />
                <label
                  htmlFor={`category-${category}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {category}
                </label>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="font-medium mb-3">AI Models</h3>
          <div className="space-y-2">
            {models.map(model => (
              <div key={model} className="flex items-center space-x-2">
                <Checkbox 
                  id={`model-${model}`}
                  checked={selectedModels.includes(model)}
                  onCheckedChange={() => handleModelChange(model)}
                />
                <label
                  htmlFor={`model-${model}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {model}
                </label>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="font-medium mb-3">Sort By</h3>
          <Select value={sortBy} onValueChange={handleSortChange}>
            <SelectTrigger>
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="popular">Most Popular</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="alphabetical">Alphabetical</SelectItem>
              <SelectItem value="likes">Most Liked</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <h3 className="font-medium mb-3">Minimum Likes: {minLikes}</h3>
          <Slider 
            value={[minLikes]} 
            onValueChange={handleLikesChange} 
            max={1000} 
            step={10} 
            className="w-full"
          />
        </div>
        
        <Button 
          variant="outline" 
          className="w-full"
          onClick={() => {
            setSelectedCategories([]);
            setSelectedModels([]);
            setSortBy('popular');
            setMinLikes(0);
            onFilterChange({ categories: [], models: [], sortBy: 'popular', minLikes: 0 });
          }}
        >
          Reset Filters
        </Button>
      </CardContent>
    </Card>
  );
}