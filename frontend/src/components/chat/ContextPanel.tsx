import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { File, X } from 'lucide-react';

interface ContextPanelProps {
  context: string;
  setContext: (context: string) => void;
  files: File[];
  setFiles: (files: File[]) => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function ContextPanel({
  context,
  setContext,
  files,
  setFiles,
  fileInputRef,
  handleFileChange,
}: ContextPanelProps) {
  return (
    <div className="w-96 bg-gray-900 text-white p-4 overflow-y-auto">
      <h2 className="text-xl font-bold mb-4">Context</h2>
      <Tabs defaultValue="input" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="input" className="text-sm">
            Text
          </TabsTrigger>
          <TabsTrigger value="files" className="text-sm">
            Files
          </TabsTrigger>
        </TabsList>
        <TabsContent value="input">
          <Textarea
            placeholder="Add context here..."
            value={context}
            onChange={(e) => setContext(e.target.value)}
            className="w-full bg-gray-800 text-white border-gray-700 focus:border-gray-600 focus:ring-gray-600"
            rows={30}
          />
        </TabsContent>
        <TabsContent value="files">
          <Label
            htmlFor="file-upload"
            className="cursor-pointer flex flex-col items-center justify-center p-4 border-2 border-dashed border-gray-700 rounded-md hover:border-gray-600 transition-colors"
          >
            <File className="w-8 h-8 text-gray-400 mb-2" />
            <span className="text-sm text-gray-400">Upload files</span>
          </Label>
          <Input
            id="file-upload"
            type="file"
            className="hidden"
            onChange={handleFileChange}
            multiple
            ref={fileInputRef}
          />
        </TabsContent>
      </Tabs>
      {files.length > 0 && (
        <div className="mt-4">
          <h3 className="text-sm font-semibold mb-2">Uploaded Files:</h3>
          <ul className="space-y-2">
            {files.map((file, index) => (
              <li
                key={index}
                className="flex items-center justify-between bg-gray-800 p-2 rounded-md"
              >
                <span className="text-sm truncate">{file.name}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setFiles(files.filter((_, i) => i !== index))}
                  className="text-gray-400 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </Button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
