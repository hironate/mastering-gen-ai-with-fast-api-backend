import { useState } from 'react';
import { IoAttach } from 'react-icons/io5';

export function FileUploader() {
  const [files, setFiles] = useState<File[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFiles(Array.from(event.target.files));
    }
  };

  return (
    <div className="flex items-center gap-2 text-xs">
      <div className="border border-dashed border-[#2C2F36] hover:border-[#2172E5] transition-colors rounded p-1 bg-[#191B1F] min-w-[120px]">
        <input
          type="file"
          className="hidden"
          id="file-upload"
          multiple
          accept="image/*,.pdf,.doc,.docx"
          onChange={handleFileChange}
        />
        <label
          htmlFor="file-upload"
          className="cursor-pointer text-[#2172E5] hover:text-[#1966D6] transition-colors flex items-center gap-1"
        >
          <IoAttach className="text-base" />
          Upload files
        </label>
      </div>

      {files.length > 0 && (
        <div className="flex gap-2 flex-wrap">
          {files.map((file, index) => (
            <span key={index} className="text-gray-300 whitespace-nowrap">
              {file.name} ({(file.size / 1024).toFixed(1)} KB)
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
