import { useState } from "react";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';

export interface News {
  id: number;
  title: string;
  url: string;
  category: "News" | "Announcement";
  coverImage?: string;
  content: string;
}

interface EditModalProps {
  news: News;
  onClose: () => void;
  onSave: (updatedNews: News) => void;
}

export default function EditModal({ news, onClose, onSave }: EditModalProps) {
  const [title, setTitle] = useState(news.title);
  const [url, setUrl] = useState(news.url);
  const [category, setCategory] = useState(news.category);
  const [coverImage, setCoverImage] = useState(news.coverImage || "");
  const [content, setContent] = useState(news.content);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setCoverImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    onSave({ ...news, title, url, category, coverImage, content });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-xl w-[600px] max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Edit News / Announcement</h2>
          <button onClick={onClose} className="text-gray-500 font-bold text-lg">&times;</button>
        </div>

        {/* Title */}
        <div className="mb-4 flex flex-col">
          <label className="font-semibold mb-1">Title</label>
          <input 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border border-gray-300 p-2 rounded"
          />
        </div>

        {/* URL */}
        <div className="mb-4 flex flex-col">
          <label className="font-semibold mb-1">URL</label>
          <input 
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="border border-gray-300 p-2 rounded"
          />
        </div>

        {/* Category */}
        <div className="mb-4 flex gap-2">
          <button 
            onClick={() => setCategory("News")} 
            className={`px-4 py-2 rounded border ${category === "News" ? "bg-blue-500 text-white" : "border-gray-300"}`}
          >News</button>
          <button 
            onClick={() => setCategory("Announcement")} 
            className={`px-4 py-2 rounded border ${category === "Announcement" ? "bg-blue-500 text-white" : "border-gray-300"}`}
          >Announcement</button>
        </div>

        {/* Cover Image */}
        <div className="mb-4 flex flex-col gap-2">
          <label className="font-semibold">Cover Image</label>
          <input type="file" onChange={handleImageChange} />
          {coverImage && <img src={coverImage} alt="cover" className="w-40 h-24 object-cover rounded" />}
        </div>

        {/* HTML Content */}
        <div className="mb-4 flex flex-col gap-2">
          <label className="font-semibold">HTML Content</label>
          <ReactQuill value={content} onChange={setContent} />
        </div>

        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
          <button onClick={handleSave} className="px-4 py-2 bg-blue-500 text-white rounded">Save</button>
        </div>
      </div>
    </div>
  );
}
