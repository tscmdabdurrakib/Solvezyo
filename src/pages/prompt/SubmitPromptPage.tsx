import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Copy, Eye, Plus, X } from 'lucide-react';

const formSchema = z.object({
  title: z.string().min(5, {
    message: "Title must be at least 5 characters.",
  }).max(100, {
    message: "Title must be less than 100 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }).max(500, {
    message: "Description must be less than 500 characters.",
  }),
  prompt: z.string().min(20, {
    message: "Prompt must be at least 20 characters.",
  }),
  category: z.string({
    required_error: "Please select a category.",
  }),
  model: z.string({
    required_error: "Please select an AI model.",
  }),
  tags: z.array(z.string()).min(1, {
    message: "Please add at least one tag.",
  }).max(10, {
    message: "You can add up to 10 tags.",
  }),
});

const SubmitPromptPage = () => {
  const { toast } = useToast();
  const [previewMode, setPreviewMode] = useState(false);
  const [tagInput, setTagInput] = useState('');

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      prompt: "",
      category: "",
      model: "",
      tags: [],
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    
    toast({
      title: "Prompt Submitted!",
      description: "Your prompt has been successfully submitted for review.",
    });
    
    // Reset form
    form.reset();
  }

  const addTag = () => {
    if (tagInput.trim() && !form.getValues().tags.includes(tagInput.trim())) {
      form.setValue("tags", [...form.getValues().tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    form.setValue("tags", form.getValues().tags.filter(tag => tag !== tagToRemove));
  };

  const categories = ["Writing", "Coding", "Marketing", "Design", "Business", "Education", "Other"];
  const models = ["ChatGPT", "Midjourney", "DALL-E", "Claude", "Gemini", "Other"];

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold mb-4">Submit a New Prompt</h1>
            <p className="text-muted-foreground">
              Share your best AI prompts with the community. Help others boost their productivity!
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Prompt Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Title *</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter a descriptive title" {...field} />
                            </FormControl>
                            <FormDescription>
                              A clear and concise title that summarizes what your prompt does.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Description *</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Describe what your prompt does and when to use it" 
                                className="min-h-[120px]"
                                {...field} 
                              />
                            </FormControl>
                            <FormDescription>
                              Explain the purpose and benefits of your prompt.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="prompt"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Prompt *</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Paste your full prompt here" 
                                className="min-h-[200px] font-mono text-sm"
                                {...field} 
                              />
                            </FormControl>
                            <FormDescription>
                              The actual prompt that users will copy and use.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="category"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Category *</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select a category" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {categories.map(category => (
                                    <SelectItem key={category} value={category}>
                                      {category}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="model"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>AI Model *</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select an AI model" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {models.map(model => (
                                    <SelectItem key={model} value={model}>
                                      {model}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <FormField
                        control={form.control}
                        name="tags"
                        render={() => (
                          <FormItem>
                            <FormLabel>Tags *</FormLabel>
                            <div className="flex flex-wrap gap-2 mb-2">
                              {form.watch("tags").map((tag, index) => (
                                <Badge key={index} variant="secondary" className="flex items-center gap-1">
                                  {tag}
                                  <button 
                                    type="button"
                                    onClick={() => removeTag(tag)}
                                    className="rounded-full hover:bg-muted-foreground/20 p-0.5"
                                  >
                                    <X className="h-3 w-3" />
                                  </button>
                                </Badge>
                              ))}
                            </div>
                            
                            <div className="flex gap-2">
                              <Input 
                                placeholder="Add a tag..." 
                                value={tagInput}
                                onChange={(e) => setTagInput(e.target.value)}
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') {
                                    e.preventDefault();
                                    addTag();
                                  }
                                }}
                              />
                              <Button 
                                type="button" 
                                variant="outline" 
                                onClick={addTag}
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                            </div>
                            <FormDescription>
                              Add tags to help users find your prompt. Press Enter or click + to add.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="flex gap-4 pt-4">
                        <Button type="submit" className="flex-1">
                          Submit Prompt
                        </Button>
                        <Button 
                          type="button" 
                          variant="outline"
                          onClick={() => setPreviewMode(!previewMode)}
                          className="flex items-center gap-2"
                        >
                          <Eye className="h-4 w-4" />
                          {previewMode ? "Hide Preview" : "Preview"}
                        </Button>
                      </div>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </div>
            
            {/* Preview Panel */}
            <div className="lg:col-span-1">
              <Card className="sticky top-8">
                <CardHeader>
                  <CardTitle>Preview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted rounded-lg p-4 min-h-[300px]">
                    {previewMode ? (
                      <div className="space-y-4">
                        <div>
                          <h3 className="font-bold text-lg">
                            {form.watch("title") || "Prompt Title"}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {form.watch("description") || "Prompt description will appear here..."}
                          </p>
                        </div>
                        
                        <div className="flex flex-wrap gap-2">
                          <Badge>{form.watch("category") || "Category"}</Badge>
                          <Badge variant="secondary">{form.watch("model") || "Model"}</Badge>
                        </div>
                        
                        <div className="flex flex-wrap gap-1">
                          {form.watch("tags").length > 0 ? (
                            form.watch("tags").map((tag, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))
                          ) : (
                            <Badge variant="outline" className="text-xs">Tags</Badge>
                          )}
                        </div>
                        
                        <div className="pt-4">
                          <h4 className="font-medium mb-2">Prompt:</h4>
                          <pre className="bg-background p-3 rounded text-xs overflow-auto max-h-40">
                            {form.watch("prompt") || "Your prompt content will appear here..."}
                          </pre>
                        </div>
                        
                        <Button className="w-full" disabled>
                          <Copy className="h-4 w-4 mr-2" />
                          Copy Prompt
                        </Button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center h-full text-muted-foreground">
                        Preview will appear here when you toggle the preview button
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmitPromptPage;