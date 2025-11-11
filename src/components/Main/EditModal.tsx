import { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import type { News } from "../../mocks/typs";
import az from "../../assets/images/az.png"
import en from "../../assets/images/en.png"
import gallery from "../../assets/images/gallery.png"
import { IoNewspaperOutline } from "react-icons/io5";
import { TfiAnnouncement } from "react-icons/tfi";

interface EditModalProps {
  news: News;
  onClose: () => void;
  onSave: (updatedNews: News) => void;
}

export default function EditModal({ news, onClose, onSave }: EditModalProps) {
  const [language, setLanguage] = useState<"az" | "en">(news.language);
  const [title, setTitle] = useState(language === "az" ? news.title_az : news.title_en);
  const [content, setContent] = useState(language === "az" ? news.content_az : news.content_en);
  const [coverImage, setCoverImage] = useState(news.coverImage || "");
  const [url, setUrl] = useState(news.url || "");
  const [category, setCategory] = useState(news.category || "");

  useEffect(() => {
    if (language === "az") {
      setTitle(news.title_az);
      setContent(news.content_az);
    } else {
      setTitle(news.title_en);
      setContent(news.content_en);
    }
  }, [language, news]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setCoverImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    onSave({
      ...news,
      language,
      title_az: language === "az" ? title : news.title_az,
      title_en: language === "en" ? title : news.title_en,
      content_az: language === "az" ? content : news.content_az,
      content_en: language === "en" ? content : news.content_en,
      coverImage,
    });
  };

  return (
    <div onClick={onClose} className="fixed inset-0 flex items-center justify-center bg-[#17171799] z-50">
      <div onClick={e => e.stopPropagation()} className="flex flex-col gap-6 bg-white p-6 rounded-xl w-[600px] max-h-[90vh] overflow-y-auto font-lato">
        <div className="mb-4 flex gap-2">

          <div className={`${language === "az" ? "border-[#243C7B]" : "border-gray-300"} rounded-[20px] border flex justify-center items-center px-4 py-1 gap-2`}>
            <img src={az} alt="" className="w-4 h-4 rounded-[50%]" />
            <button

              onClick={() => setLanguage("az")}
            >

              AZ
            </button>
          </div>
          <div className={`${language === "en" ? "border-[#243C7B]" : "border-gray-300"} rounded-[20px] border flex justify-center items-center px-4 py-1 gap-2`}>
            <img src={en} alt="" className="w-4 h-4 rounded-[50%]" />
            <button

              onClick={() => setLanguage("en")}
            >
              EN
            </button>
          </div>
          <button onClick={onClose} className="text-gray-500 font-bold text-lg translate-x-90 -translate-y-3">&times;</button>
        </div>
        <div className="flex justify-between items-center mb-4 font-lato">
          <h2 className="text-xl font-bold">Create News / Announcement</h2>
          <p><span className="text-[#243C7B]">1</span> / 2</p>
        </div>
        <div className="flex w-full gap-2">
          <hr className="w-full h-0.5 text-[#243C7B] bg-[#243C7B] rounded-md" />
          <hr className="w-full h-0.5 bg-[#E0E7FA] text-[#E0E7FA] rounded-md" />
        </div>

        {/* Language Switch */}

        {/* Title */}
        <div className="mb-4 flex flex-col">
          <label className="text-[14px] mb-1 text-[#374151]">Title</label>
          <input
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="border border-[#EEEEEE] p-2 rounded-[10px]"
          />
        </div>
        <div className="mb-4 flex flex-col">
          <label className="text-[14px] mb-1 text-[#374151]">URL</label>
          <input
            value={url}
            onChange={e => setUrl(e.target.value)}
            className="border border-[#EEEEEE] p-2 rounded-[10px]"
          />
        </div>
        <div className="mb-4 flex flex-col">
          <p className="text-[14px] mb-1 text-[#374151]">Category</p>
          <div className="flex gap-2">
            <button
              onClick={() => setCategory("News")}
              className={`flex items-center gap-2 px-4 py-2 rounded-[20px] border ${category === "News" ? "bg-[#1447E6] text-white" : "border-[#1447E6] text-[#1447E6]"
                }`}
            >
              <IoNewspaperOutline /> News
            </button>
            <button
              onClick={() => setCategory("Announcement")}
              className={`flex items-center gap-2 px-4 py-2 rounded-[20px] border ${category === "Announcement" ? "bg-[#1447E6] text-white" : "border-[#1447E6] text-[#1447E6]"
                }`}
            >
              <TfiAnnouncement /> Announcement
            </button>
          </div>
        </div>

        {/* Cover Image */}
        <div className="mb-4 flex flex-col gap-2">
          <label className="font-semibold">Cover Image</label>
          <div className="relative w-full">
            <input
              type="file"
              id="coverImage"
              accept="image/*"
              onChange={handleImageChange}
              className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
            />
            <div className="w-full h-full border border-[#F0F0F0] rounded-[10px] flex gap-3 items-center justify-center p-3 pointer-events-none text-[#787486]">
              <img src={gallery} alt="" className="w-5 h-5" />
              Upload Cover Image
            </div>
          </div>
          {coverImage && <img src={coverImage} alt="cover" className="w-40 h-24 object-cover rounded" />}
        </div>



        {/* HTML Content */}
        <div className="mb-4 flex flex-col gap-2 text-[14px] rounded-xl p-5 shadow-xL border border-[#EBEBEB40] ">
          <label className="font-semibold">HTML Content</label>
          <span className="text-[#717182]">Use the toolbar to format your text with bold, ita</span>
          <ReactQuill className="rounded-xl" value={content} onChange={setContent} />
        </div>

        <div className="w-full text-center bg-[#243C7B] text-white rounded-[10px]">
          <button className="py-2 px-8">Next</button>
        </div>

        {/* Buttons */}
        {/* <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
          <button onClick={handleSave} className="px-4 py-2 bg-blue-500 text-white rounded">Save</button>
        </div> */}
      </div>
    </div>
  );
}
