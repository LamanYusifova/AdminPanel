import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

interface AccordionFilterProps {
  title: string;
  options: string[];
  selected: string;
  onSelect: (val: string) => void;
  isOpen: boolean;
  onToggle: () => void;
}

export default function AccordionFilter({
  title,
  options,
  selected,
  onSelect,
  isOpen,
  onToggle,
}: AccordionFilterProps) {
  const getStatusColor = (status: string) => {
    if (status.toLowerCase() === "active") return "bg-green-500";
    if (status.toLowerCase() === "inactive") return "bg-red-500";
    return "";
  };

  const isStatusFilter = title.toLowerCase().includes("status");

  return (
    <div className="w-44 relative ">
      {/* Üst düymə */}
      <button
        onClick={onToggle}
        className="w-full px-3 py-1 bg-white border border-[#F7F7F7] rounded-lg flex justify-between items-center font-lato"
      >
        <div className="flex items-center gap-2">
          {isStatusFilter && selected !== "All Status" && (
            <span
              className={`w-3 h-3 rounded-full ${getStatusColor(selected)}`}
            ></span>
          )}
          <span>{selected}</span>
        </div>
        {isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
      </button>

      {/* Açılan menyu */}
      {isOpen && (
        <div className="bg-white border border-[#F7F7F7] mt-1 p-3 rounded-lg shadow-md absolute z-10 w-full font-lato">
          {options
            .filter((opt) => opt !== "All Status") // 👈 “All Status” göstərilmir
            .map((opt) => (
              <button
                key={opt}
                onClick={() => {
                  onSelect(opt);
                  onToggle(); // seçiləndə bağlansın
                }}
                className={`text-left w-full p-2 hover:text-[#243C7B] flex items-center gap-2 text-[#787486]`}
              >
                {isStatusFilter && (
                  <span
                    className={`w-[5px] h-[5px] rounded-full ${getStatusColor(opt)}`}
                  ></span>
                )}
                {opt}
              </button>
            ))}
        </div>
      )}
    </div>
  );
}
