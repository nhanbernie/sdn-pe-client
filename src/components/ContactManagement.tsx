import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Plus, Edit, Trash2, ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import DeleteConfirmDialog from "./DeleteConfirmDialog";

interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  group: string;
}

// Mock data - updated với nhóm mới
const mockContacts: Contact[] = [
  { id: "1", name: "Nguyễn Văn A", email: "nguyenvana@email.com", phone: "0901234567", group: "Bạn bè" },
  { id: "2", name: "Trần Thị B", email: "tranthib@email.com", phone: "0912345678", group: "Công việc" },
  { id: "3", name: "Lê Minh C", email: "leminhc@email.com", phone: "0923456789", group: "Gia đình" },
  { id: "4", name: "Phạm Thu D", email: "phamthud@email.com", phone: "0934567890", group: "Bạn bè" },
  { id: "5", name: "Hoàng Văn E", email: "hoangvane@email.com", phone: "0945678901", group: "Công việc" },
  { id: "6", name: "Vũ Thị F", email: "vuthif@email.com", phone: "0956789012", group: "Gia đình" },
  { id: "7", name: "Đặng Minh G", email: "dangminhg@email.com", phone: "0967890123", group: "Khách hàng" },
  { id: "8", name: "Bùi Thu H", email: "buithuh@email.com", phone: "0978901234", group: "Đối tác" },
];

const mockGroups = ["Tất cả", "Bạn bè", "Công việc", "Gia đình", "Khách hàng", "Đối tác"];

const ContactManagement = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [contacts, setContacts] = useState<Contact[]>(mockContacts);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGroup, setSelectedGroup] = useState("Tất cả");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteDialog, setDeleteDialog] = useState<{ open: boolean; contact?: Contact }>({ open: false });
  const contactsPerPage = 6;

  // Filter and sort contacts
  const filteredContacts = contacts
    .filter(contact => 
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedGroup === "Tất cả" || contact.group === selectedGroup)
    )
    .sort((a, b) => {
      const comparison = a.name.localeCompare(b.name, 'vi');
      return sortOrder === "asc" ? comparison : -comparison;
    });

  // Pagination
  const totalPages = Math.ceil(filteredContacts.length / contactsPerPage);
  const startIndex = (currentPage - 1) * contactsPerPage;
  const paginatedContacts = filteredContacts.slice(startIndex, startIndex + contactsPerPage);

  const handleDeleteClick = (contact: Contact) => {
    setDeleteDialog({ open: true, contact });
  };

  const confirmDelete = async () => {
    if (!deleteDialog.contact) return;
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setContacts(contacts.filter(c => c.id !== deleteDialog.contact!.id));
      setDeleteDialog({ open: false });
      
      toast({
        title: "Thành công",
        description: `Đã xóa liên hệ "${deleteDialog.contact.name}"`,
      });
    } catch (error) {
      toast({
        title: "Lỗi",
        description: "Có lỗi xảy ra khi xóa liên hệ",
        variant: "destructive",
      });
    }
  };

  const handleSort = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const getGroupBadgeColor = (group: string) => {
    switch (group) {
      case "Bạn bè": return "bg-blue-100 text-blue-800 hover:bg-blue-200";
      case "Công việc": return "bg-green-100 text-green-800 hover:bg-green-200";
      case "Gia đình": return "bg-purple-100 text-purple-800 hover:bg-purple-200";
      case "Khách hàng": return "bg-orange-100 text-orange-800 hover:bg-orange-200";
      case "Đối tác": return "bg-pink-100 text-pink-800 hover:bg-pink-200";
      default: return "bg-gray-100 text-gray-800 hover:bg-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Contact Management</h1>
          <p className="text-muted-foreground">Quản lý danh bạ liên hệ của bạn</p>
        </div>

        {/* Controls */}
        <div className="bg-card rounded-lg border p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Tìm kiếm theo tên..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Group Filter */}
              <Select value={selectedGroup} onValueChange={setSelectedGroup}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Chọn nhóm" />
                </SelectTrigger>
                <SelectContent>
                  {mockGroups.map((group) => (
                    <SelectItem key={group} value={group}>
                      {group}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Sort Button */}
              <Button variant="outline" onClick={handleSort} className="flex items-center gap-2">
                <ArrowUpDown className="h-4 w-4" />
                {sortOrder === "asc" ? "A-Z" : "Z-A"}
              </Button>
            </div>

            {/* Add New Contact Button */}
            <Button 
              className="flex items-center gap-2"
              onClick={() => navigate("/add")}
            >
              <Plus className="h-4 w-4" />
              Thêm liên hệ mới
            </Button>
          </div>
        </div>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {paginatedContacts.map((contact) => (
            <Card key={contact.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-foreground mb-1">
                      {contact.name}
                    </h3>
                    <Badge className={getGroupBadgeColor(contact.group)}>
                      {contact.group}
                    </Badge>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 w-8 p-0"
                      onClick={() => navigate(`/edit/${contact.id}`)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                      onClick={() => handleDeleteClick(contact)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">Email:</span>
                    <span className="text-foreground">{contact.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">Phone:</span>
                    <span className="text-foreground">{contact.phone}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2">
            <Button
              variant="outline"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              Trước
            </Button>
            
            <div className="flex gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentPage(page)}
                  className="w-10"
                >
                  {page}
                </Button>
              ))}
            </div>

            <Button
              variant="outline"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Sau
            </Button>
          </div>
        )}

        {/* Empty State */}
        {filteredContacts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-muted-foreground mb-4">
              <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p className="text-lg">Không tìm thấy liên hệ nào</p>
              <p className="text-sm">Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</p>
            </div>
          </div>
        )}

        {/* Delete Confirmation Dialog */}
        <DeleteConfirmDialog
          open={deleteDialog.open}
          onOpenChange={(open) => setDeleteDialog({ open, contact: deleteDialog.contact })}
          contactName={deleteDialog.contact?.name || ""}
          onConfirm={confirmDelete}
        />
      </div>
    </div>
  );
};

export default ContactManagement;