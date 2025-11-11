import { useState, useMemo } from "react";
import { FiPlus } from "react-icons/fi";
import { newsData } from "../../mocks/newsData";
import searchIcon from "../../assets/images/search-normal.png";
import type { NewsType, ActiveStatus } from "../../mocks/newsData";
import NewsTable from "./NewsTable";
import AccordionFilter from "./AccordionFilter";


export default function Main() {
    const [search, setSearch] = useState("");
    const [selectedType, setSelectedType] = useState<NewsType | "All Posts">("All Posts");
    const [selectedStatus, setSelectedStatus] = useState<ActiveStatus | "All Status">("All Status");
    const [openFilter, setOpenFilter] = useState<string | null>(null); // 👈 hansının açıq olduğunu saxlayırıq
    

    const filteredNews = useMemo(() => {
        return newsData.filter((item) => {
            const matchesType = selectedType === "All Posts" || item.type === selectedType;
            const matchesStatus = selectedStatus === "All Status" || item.status === selectedStatus;
            const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase());
            return matchesType && matchesStatus && matchesSearch;
        });
    }, [search, selectedType, selectedStatus]);

    return (
        <div className="flex-1 p-6 bg-[#EBEBEB40]">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="font-lato">
                    <p className="text-[24px]">News & Announcements</p>
                    <p className="text-[14px] text-[#787486]">{filteredNews.length} Posts</p>
                </div>
                <button className="flex items-center gap-2 font-lato text-[16px] bg-[#243C7B] rounded-[30px] py-2 px-3 text-white">
                    <div className="w-6 h-6 rounded-[50%] bg-[#3D5DB2] flex items-center justify-center">
                        <FiPlus />
                    </div>
                    Add News or Announcement
                </button>
            </div>

            {/* Filters */}
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
            <div className="">
                <NewsTable data={filteredNews} itemsPerPage={6} />
            </div>
        </div>
    );
}
