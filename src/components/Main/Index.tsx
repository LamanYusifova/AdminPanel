import { useState, useMemo, useEffect } from "react";
import { FiPlus } from "react-icons/fi";
import { newsData as initialNewsData } from "../../mocks/newsData";
import searchIcon from "../../assets/images/search-normal.png";
import type { NewsType, ActiveStatus } from "../../mocks/newsData";
import type { News } from "../../mocks/typs";
import type { NewsItem } from "../../mocks/newsData";
import NewsTable from "./NewsTable";
import AccordionFilter from "./AccordionFilter";
import EditModal from "./EditModal";

export default function Main() {
    const [search, setSearch] = useState("");
    const [selectedType, setSelectedType] = useState<NewsType | "All Posts">("All Posts");
    const [selectedStatus, setSelectedStatus] = useState<ActiveStatus | "All Status">("All Status");
    const [openFilter, setOpenFilter] = useState<string | null>(null);
    const [openModal, setOpenModal] = useState(false);
    const [newsList, setNewsList] = useState<News[]>([]);

    // 🔹 LocalStorage və ya mock datadan yüklə
    useEffect(() => {
        const saved = localStorage.getItem("newsData");
        if (saved) {
            // localStorage + initialNewsData birləşdir
            const savedList: News[] = JSON.parse(saved);
            const mapped: News[] = initialNewsData.map((item) => ({
                id: String(item.id),
                title: item.title,
                url: item.url || "",
                category: item.type === "News" ? "News" : "Announcement",
                coverImage: item.image || "",
                content: item.excerpt || "",
                language: "az",
                title_az: item.title,
                title_en: "",
                content_az: item.excerpt || "",
                content_en: "",
                status: item.status as "Active" | "Inactive",
                author: item.author
            }));

            // təkrarlanan id-ləri çıxarmaq üçün merge et
            const merged: News[] = [
                ...mapped,
                ...savedList.filter(s => !mapped.some(m => m.id === s.id))
            ];

            setNewsList(merged);
            localStorage.setItem("newsData", JSON.stringify(merged));
        } else {
            const mapped: News[] = initialNewsData.map((item) => ({
                id: String(item.id),
                title: item.title,
                url: item.url || "",
                category: item.type === "News" ? "News" : "Announcement",
                coverImage: item.image || "",
                content: item.excerpt || "",
                language: "az",
                title_az: item.title,
                title_en: "",
                content_az: item.excerpt || "",
                content_en: "",
                status: item.status,
                author: item.author,   // ✅ burda əlavə et
            }));

            setNewsList(mapped);
            localStorage.setItem("newsData", JSON.stringify(mapped));
        }
    }, []);

    // 🔹 Filtrləmə
    const filteredNews = useMemo(() => {
        return newsList.filter((item) => {
            const matchesType = selectedType === "All Posts" || item.category === selectedType;
            const matchesStatus =
                selectedStatus === "All Status" || item.status === selectedStatus;
            const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase());
            return matchesType && matchesStatus && matchesSearch;
        });
    }, [search, selectedType, selectedStatus, newsList]);

    // 🔹 Yeni xəbər əlavə etmə
    const handleAddNews = (newNews: News) => {
        const updatedList = [
            { ...newNews, status: "Active" as "Active" | "Inactive" },
            ...newsList
        ];
        setNewsList(updatedList);
        localStorage.setItem("newsData", JSON.stringify(updatedList));
    };

    return (
        <div className="flex-1 p-6 bg-[#EBEBEB40]">
            <div className="flex items-center justify-between mb-6">
                <div className="font-lato">
                    <p className="text-[24px]">News & Announcements</p>
                    <p className="text-[14px] text-[#787486]">{filteredNews.length} Posts</p>
                </div>

                {/* Add düyməsi */}
                <button
                    onClick={() => setOpenModal(true)}
                    className="flex items-center gap-2 font-lato text-[16px] bg-[#243C7B] rounded-[30px] py-2 px-3 text-white"
                >
                    <div className="w-6 h-6 rounded-[50%] bg-[#3D5DB2] flex items-center justify-center">
                        <FiPlus />
                    </div>
                    Add News or Announcement
                </button>
            </div>

            {/* Filtrlər */}
            <div className="bg-white flex gap-4 mb-6 border border-[#f7f7f7] shadow-[#EBEBEB40] p-6 rounded-xl">
                <AccordionFilter
                    title="Type"
                    options={["All Posts", "News", "Announcement"]}
                    selected={selectedType}
                    onSelect={(val) => setSelectedType(val as NewsType | "All Posts")}
                    isOpen={openFilter === "type"}
                    onToggle={() => setOpenFilter(openFilter === "type" ? null : "type")}
                />

                <AccordionFilter
                    title="Status"
                    options={["All Status", "Active", "Inactive"]}
                    selected={selectedStatus}
                    onSelect={(val) => setSelectedStatus(val as ActiveStatus | "All Status")}
                    isOpen={openFilter === "status"}
                    onToggle={() => setOpenFilter(openFilter === "status" ? null : "status")}
                />

                <div className="flex items-center border border-[#E5E7EB] rounded-lg px-3">
                    <img src={searchIcon} alt="" className="w-4 h-4" />
                    <input
                        type="text"
                        placeholder="Search..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="py-1 px-2"
                    />
                </div>
            </div>

            {/* Cədvəl */}
            <div>
                <NewsTable
                    data={filteredNews.map(n => ({
                        id: n.id,
                        title: n.language === "az" ? n.title_az : n.title_en,
                        excerpt: n.language === "az" ? n.content_az : n.content_en,
                        image: n.coverImage || "",
                        type: n.category as "News" | "Announcement",
                        sharingTime: new Date().toISOString(),
                        publishStatus: "Published",
                        author: n.author,
                        status: n.status as "Active" | "Inactive"
                    })) as NewsItem[]}
                    itemsPerPage={6}
                />
            </div>

            {/* Modal */}
            {openModal && (
                <EditModal
                    news={{
                        id: String(Date.now()),
                        title: "",
                        url: "",
                        category: "News",
                        coverImage: "",
                        content: "",
                        language: "az",
                        title_az: "",
                        title_en: "",
                        content_az: "",
                        content_en: "",
                        status: "Active" as "Active" | "Inactive",
                        author: ""
                    }}
                    onClose={() => setOpenModal(false)}
                    onSave={(newNews) => {
                        handleAddNews(newNews);
                        setOpenModal(false);
                    }}
                />
            )}
        </div>
    );
}
