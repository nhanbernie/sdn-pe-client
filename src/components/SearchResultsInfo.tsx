import { Search } from "lucide-react";

interface SearchResultsInfoProps {
  searchTerm: string;
  totalResults: number;
  isLoading: boolean;
}

const SearchResultsInfo = ({
  searchTerm,
  totalResults,
  isLoading,
}: SearchResultsInfoProps) => {
  if (!searchTerm && !isLoading) return null;

  return (
    <div className="bg-muted/50 rounded-lg p-3 mb-4 flex items-center gap-2">
      <Search className="h-4 w-4 text-muted-foreground" />
      <div className="text-sm text-muted-foreground">
        {isLoading ? (
          <span>Đang tìm kiếm...</span>
        ) : searchTerm ? (
          <span>
            Tìm thấy <strong>{totalResults}</strong> kết quả cho "{searchTerm}"
            {totalResults === 0 && (
              <span className="ml-2 text-orange-600">
                Thử tìm kiếm với từ khóa khác
              </span>
            )}
          </span>
        ) : (
          <span>Hiển thị tất cả {totalResults} liên hệ</span>
        )}
      </div>
    </div>
  );
};

export default SearchResultsInfo;
