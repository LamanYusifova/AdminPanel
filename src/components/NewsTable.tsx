import { useState, useMemo, useEffect } from "react";
import type { NewsItem } from "../../src/mocks/newsData";
import type { News } from "../components/Main/EditModalProps";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import trash from "../../src/assets/images/trash.png"
import { GrFormClose } from "react-icons/gr";
import EditModal from '../../src/components/Main/EditModalProps';

interface NewsTableProps {
    data: NewsItem[];
    itemsPerPage?: number;
}

export default function NewsTable({ data, itemsPerPage = 6 }: NewsTableProps) {
    const [currentPage, setCurrentPage] = useState(1);

    // Silmə modalı və seçilmiş news üçün state
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [newsToDelete, setNewsToDelete] = useState<NewsItem | null>(null);
    const [newsList, setNewsList] = useState<NewsItem[]>(data);

    // data prop-u dəyişəndə yenilə
    useEffect(() => {
        setNewsList(data);
    }, [data]);

    const totalPages = Math.ceil(newsList.length / itemsPerPage);

    const paginatedData = useMemo(() => {
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        return newsList.slice(start, end);
    }, [currentPage, newsList, itemsPerPage]);

    const getStatusColor = (status: string) => {
        if (status.toLowerCase() === "active") return "bg-[#1DB100]";
        if (status.toLowerCase() === "inactive") return "bg-[#D82C2C]";
        return "bg-gray-400";
    };

    // Silmə funksiyası (nullable-safe)
    const handleDelete = () => {
        if (!newsToDelete) return; // null-dursa heç bir əməliyyat etmə
        setNewsList(prev => prev.filter(item => item.id !== newsToDelete.id));
        setShowDeleteModal(false);
        setNewsToDelete(null);
    };
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [selectedNews, setSelectedNews] = useState<News | null>(null);
    return (
        <div className="overflow-x-auto rounded-lg">
            <table className="w-full border border-gray-200">
                <thead className="text-center">
                    <tr className="text-[#243C7B] font-lato font-semibold">
                        <th className="px-3 py-2 text-left">Posts</th>
                        <th className="px-3 py-2">Type</th>
                        <th className="px-3 py-2">Sharing Time</th>
                        <th className="px-3 py-2">Status</th>
                        <th className="px-3 py-2">Publish Status</th>
                        <th className="px-3 py-2">Author</th>
                        <th className="px-3 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedData.map((item) => (
                        <tr key={item.id} className="border-t border-gray-200">
                            <td className="py-2 px-2 flex gap-3 items-center">
                                <img src={item.image} alt={item.title} className="w-20 h-20 object-cover rounded-md" />
                                <div className="flex flex-col">
                                    <p className="font-bold text-[16px]">{item.title}</p>
                                    <p className="text-[14px] text-gray-500">{item.excerpt}</p>
                                </div>
                            </td>
                            <td className="py-2 px-2 text-center">
                                <span className={`px-3 py-1 rounded-full ${item.type === "News" ? "bg-[#C4DEFF] text-[#1447E6]" : "bg-[#F3E8FF] text-[#8200DB]"}`}>
                                    {item.type}
                                </span>
                            </td>
                            <td className="py-2 px-2 text-gray-600 text-center">
                                {new Date(item.sharingTime).toLocaleDateString()} <br />
                                <span className="text-xs text-gray-400">{new Date(item.sharingTime).toLocaleTimeString()}</span>
                            </td>
                            <td className="py-2 px-2 flex items-center gap-2 justify-center">
                                <div className={`flex justify-center items-center gap-1 rounded-md px-2 ${getStatusColor(item.status)}`}>
                                    <span className={`w-[5px] h-[5px] rounded-full ${getStatusColor(item.status)}`}></span>
                                    {item.status}
                                </div>
                            </td>
                            <td className="py-2 px-2 text-center">{item.publishStatus}</td>
                            <td className="py-2 px-2 text-center">{item.author}</td>
                            <td className="py-2 px-2 flex gap-2 text-center">
                                <button className="text-[#243C7B] "><FiEdit /></button>
                                <button
                                    onClick={() => {
                                        setNewsToDelete(item);
                                        setShowDeleteModal(true);
                                    }}
                                    className="text-[#D82C2C] "
                                >
                                    <FiTrash2 />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Pagination */}
            <div className="flex justify-center gap-2 mt-4">
                <button disabled={currentPage === 1} onClick={() => setCurrentPage((p) => p - 1)} className="px-3 py-1 rounded disabled:opacity-50">
                    <IoIosArrowBack />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`w-10 h-10 rounded-[50%] px-3 py-1 ${page === currentPage ? "bg-[#243C7B] text-white" : ""}`}
                    >
                        {page}
                    </button>
                ))}
                <button disabled={currentPage === totalPages} onClick={() => setCurrentPage((p) => p + 1)} className="px-3 py-1 rounded disabled:opacity-50">
                    <IoIosArrowForward />
                </button>
            </div>

            {/* Delete Modal */}
            {showDeleteModal && newsToDelete && (
                <div onClick={() => setShowDeleteModal(false)} className="fixed inset-0 flex items-center justify-center font-lato bg-[#17171799] bg-opacity-50 z-50">
                    <div onClick={(e) => {
                        e.stopPropagation();
                    }} className="flex flex-col items-center justify-center bg-white p-5 gap-2 rounded-lg w-[400px]">
                        <GrFormClose onClick={() => setShowDeleteModal(false)} className="w-9 h-9 translate-x-40" />
                        <div className="flex items-center justify-center w-16 h-16 rounded-[50%] bg-[#FDEEEE]"><img src={trash} alt="" className="w-10 h-10" /></div>
                        <h3 className="text-[24px] font-lato mb-4">Delete Post</h3>
                        <p className="mb-6 text-[#6A7282]">Are you sure you want to delete the post - <span className="italic text-black font-lato">{newsToDelete.title}</span>?</p>
                        <div className="flex w-full gap-4">
                            <button className="px-4 py-2 border border-[#E5E5E5] bg-white w-full rounded " onClick={() => setShowDeleteModal(false)}>No</button>
                            <button className="px-4 py-2 bg-[#D82C2C] w-full  text-white rounded" onClick={handleDelete}>Yes</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
