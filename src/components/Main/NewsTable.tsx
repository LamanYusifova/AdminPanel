import { useState, useMemo, useEffect } from "react";
import type { NewsItem } from "../../mocks/newsData";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import DeleteModal from "./DeleteModal";
import EditModal from "./EditModal";
import type { News } from "../../mocks/typs";

interface NewsTableProps {
    data: NewsItem[];
    itemsPerPage?: number;
}

export default function NewsTable({ data, itemsPerPage = 6 }: NewsTableProps) {
    const [currentPage, setCurrentPage] = useState(1);
    const [newsList, setNewsList] = useState<NewsItem[]>(data);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [newsToDelete, setNewsToDelete] = useState<NewsItem | null>(null);
    const [newsToEdit, setNewsToEdit] = useState<News | null>(null);

    useEffect(() => setNewsList(data), [data]);

    const totalPages = Math.ceil(newsList.length / itemsPerPage);
    const paginatedData = useMemo(() => {
        const start = (currentPage - 1) * itemsPerPage;
        return newsList.slice(start, start + itemsPerPage);
    }, [currentPage, newsList, itemsPerPage]);

    const getStatusColor = (status?: string) => {
        if (!status) return "bg-gray-400"; // default rəng
        if (status.toLowerCase() === "active") return "bg-[#1DB100]";
        if (status.toLowerCase() === "inactive") return "bg-[#D82C2C]";
        return "bg-gray-400";
    };
    const getStatusColorB = (status?: string) => {
        if (!status) return "#999";
        switch (status.toLowerCase()) {
            case "active":
                return "#3BB900";
            case "inactive":
                return "#FF0000";
            default:
                return "#999";
        }
    };

    const getStatusColorT = (status?: string) => {
        if (!status) return "text-gray-400";
        if (status.toLowerCase() === "active") return "text-[#1DB100]";
        if (status.toLowerCase() === "inactive") return "text-[#D82C2C]";
        return "text-gray-400";
    };

    const handleDelete = () => {
        if (!newsToDelete) return;
        const updatedList = newsList.filter(item => item.id !== newsToDelete.id);
        setNewsList(updatedList);
        localStorage.setItem("newsData", JSON.stringify(updatedList)); // 🔹 localStorage yenilə
        setShowDeleteModal(false);
        setNewsToDelete(null);
    };


    const handleSaveEditedNews = (updatedNews: News) => {
        setNewsList(prev =>
            prev.map(n => {
                if (n.id === updatedNews.id) {
                    return {
                        ...n,
                        title: updatedNews.language === "az" ? updatedNews.title_az : updatedNews.title_en,
                        excerpt: updatedNews.language === "az" ? updatedNews.content_az : updatedNews.content_en,
                        image: updatedNews.coverImage || n.image,
                        type: updatedNews.category,
                    };
                }
                return n;
            })
        );
        setShowEditModal(false);
        setNewsToEdit(null);
    };

    const handleEdit = (item: NewsItem) => {
        const newsForEdit: News = {
            id: item.id,
            title: item.title,
            url: item.url || "",
            category: item.type,
            coverImage: item.image,
            content: item.excerpt || "",
            language: "az",
            title_az: item.title,
            title_en: "",
            content_az: item.excerpt || "",
            content_en: "",
            author: item.author,

        };
        setNewsToEdit(newsForEdit);
        setShowEditModal(true);
    };
    return (
        <div className="overflow-x-auto rounded-lg">
            <table className="w-full border border-gray-200">
                <thead>
                    <tr className="text-[#243C7B] font-lato font-semibold text-[14px]">
                        <th className="px-3 py-2 text-left w-1/4">Posts</th>
                        <th className="px-3 py-2 w-1/6">Type</th>
                        <th className="px-3 py-2 w-1/6">Sharing Time</th>
                        <th className="px-3 py-2 w-1/6">Status</th>
                        <th className="px-3 py-2 w-1/6">Publish Status</th>
                        <th className="px-3 py-2 w-1/6">Author</th>
                        <th className="px-3 py-2 w-1/6">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedData.map(item => (
                        <tr key={item.id} className="border-t border-gray-200">
                            <td className="py-2 px-2 flex gap-3 items-center">
                                <img src={item.image} alt={item.title} className="w-32 h-20 object-cover rounded-md" />
                                <div className="flex flex-col">
                                    <div className="font-bold text-[16px]">
                                        {item.title.replace(/<\/?[^>]+(>|$)/g, "").slice(0, 30)}...
                                    </div>
                                    <div className="text-[14px] text-gray-500">
                                        {item.excerpt.replace(/<\/?[^>]+(>|$)/g, "").slice(0, 50)}...
                                    </div>
                                </div>
                            </td>
                            <td className="py-2 px-2 text-center">
                                <span className={`px-3 py-1 rounded-full ${item.type === "News" ? "bg-[#C4DEFF] text-[#1447E6]" : "bg-[#F3E8FF] text-[#8200DB]"}`}>{item.type}</span>
                            </td>
                            <td className="py-2 px-2 text-gray-600 text-center">
                                {new Date(item.sharingTime).toLocaleDateString()} <br />
                                <span className="text-xs text-gray-400">{new Date(item.sharingTime).toLocaleTimeString()}</span>
                            </td>
                            <td className="py-2 px-2 flex items-center gap-2 justify-center">
                                <div className={`flex justify-center items-center gap-1 rounded-md px-2 ${getStatusColorB(item.status)}`}>
                                    <span className={`w-[5px] h-[5px] rounded-full ${getStatusColor(item.status)}`}></span>
                                    <div className={`${getStatusColorT(item.status)}`}>{item.status}</div>
                                </div>
                            </td>
                            <td className="py-2 px-2 text-center">{item.publishStatus}</td>
                            <td className="py-2 px-2 text-center">{item.author}</td>
                            <td className="py-2 px-2 flex gap-2 text-center">
                                <button className="text-[#243C7B]" onClick={() => handleEdit(item)}><FiEdit /></button>
                                <button onClick={() => { setNewsToDelete(item); setShowDeleteModal(true); }} className="text-[#D82C2C]"><FiTrash2 /></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="flex justify-center items-center gap-2 mt-4">
                <button disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)} className="px-3 py-1 rounded disabled:opacity-50">
                    <IoIosArrowBack />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <button key={page} onClick={() => setCurrentPage(page)} className={`w-10 h-10 rounded-full px-3 py-1 ${page === currentPage ? "bg-[#243C7B] text-white" : ""}`}>{page}</button>
                ))}
                <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)} className="px-3 py-1 rounded disabled:opacity-50">
                    <IoIosArrowForward />
                </button>
                <div className="border border-[#ECECEC] shadow-2xs py-2 px-4 rounded-[20px]">
                    {totalPages} / Page
                </div>
            </div>



            {showDeleteModal && newsToDelete && (
                <DeleteModal
                    news={newsToDelete}
                    onClose={() => setShowDeleteModal(false)}
                    onDelete={handleDelete}
                />
            )}

            {showEditModal && newsToEdit && (
                <EditModal
                    news={newsToEdit}
                    onClose={() => setShowEditModal(false)}
                    onSave={handleSaveEditedNews}
                />
            )}
        </div>
    );
}
