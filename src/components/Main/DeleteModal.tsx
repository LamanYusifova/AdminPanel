import { GrFormClose } from "react-icons/gr";
import trash from "../../assets/images/trash.png";
import type { NewsItem } from "../../mocks/newsData";

interface DeleteModalProps {
  news: NewsItem;
  onClose: () => void;
  onDelete: () => void;
}

export default function DeleteModal({ news, onClose, onDelete }: DeleteModalProps) {
  return (
    <div onClick={onClose} className="fixed inset-0 flex items-center justify-center bg-[#17171799] z-50">
      <div
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col items-center justify-center bg-white p-5 gap-2 rounded-lg w-[400px]"
      >
        <GrFormClose onClick={onClose} className="w-9 h-9 translate-x-40 cursor-pointer" />
        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-[#FDEEEE]">
          <img src={trash} alt="" className="w-10 h-10" />
        </div>
        <h3 className="text-[24px] font-lato mb-4">Delete Post</h3>
        <p className="mb-6 text-[#6A7282]">
          Are you sure you want to delete the post - <span className="italic text-black font-lato">{news.title}</span>?
        </p>
        <div className="flex w-full gap-4">
          <button className="px-4 py-2 border border-[#E5E5E5] bg-white w-full rounded" onClick={onClose}>No</button>
          <button className="px-4 py-2 bg-[#D82C2C] w-full text-white rounded" onClick={onDelete}>Yes</button>
        </div>
      </div>
    </div>
  );
}
