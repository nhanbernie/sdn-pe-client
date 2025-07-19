import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ContactAPI } from "@/services/contactApi";
import {
  Contact,
  NormalizedContact,
  CreateContactRequest,
  UpdateContactRequest,
  ContactsSearchParams,
  normalizeContact,
} from "@/types/contact";
import { useToast } from "@/hooks/use-toast";
import { useMemo } from "react";

// Query Keys
export const contactKeys = {
  all: ["contacts"] as const,
  lists: () => [...contactKeys.all, "list"] as const,
  details: () => [...contactKeys.all, "detail"] as const,
  detail: (id: string) => [...contactKeys.details(), id] as const,
};

// Get all contacts and apply client-side filtering
export const useContacts = (params: ContactsSearchParams = {}) => {
  const query = useQuery({
    queryKey: contactKeys.lists(),
    queryFn: () => ContactAPI.getContacts(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Client-side filtering and pagination
  const processedData = useMemo(() => {
    if (!query.data) return { data: [], total: 0, totalPages: 0 };

    const contacts = query.data;
    let filtered = contacts.map(normalizeContact);

    // Apply search filter
    if (params.search) {
      const searchTerm = params.search.toLowerCase();
      filtered = filtered.filter(
        (contact) =>
          contact.name.toLowerCase().includes(searchTerm) ||
          contact.email.toLowerCase().includes(searchTerm) ||
          (contact.phone && contact.phone.toLowerCase().includes(searchTerm))
      );
    }

    // Apply group filter
    if (params.group && params.group !== "Tất cả") {
      filtered = filtered.filter((contact) => contact.group === params.group);
    }

    // Apply sorting
    if (params.sortBy) {
      filtered.sort((a, b) => {
        const aValue = a[params.sortBy!];
        const bValue = b[params.sortBy!];
        const comparison = String(aValue).localeCompare(String(bValue), "vi");
        return params.sortOrder === "desc" ? -comparison : comparison;
      });
    }

    // Apply pagination
    const page = params.page || 1;
    const limit = params.limit || 10;
    const total = filtered.length;
    const totalPages = Math.ceil(total / limit);
    const startIndex = (page - 1) * limit;
    const paginatedData = filtered.slice(startIndex, startIndex + limit);

    return {
      data: paginatedData,
      total,
      totalPages,
      page,
      limit,
    };
  }, [query.data, params]);

  return {
    ...query,
    data: processedData,
  };
};

// Get single contact
export const useContact = (id: string) => {
  return useQuery({
    queryKey: contactKeys.detail(id),
    queryFn: async () => {
      const contact = await ContactAPI.getContactById(id);
      return normalizeContact(contact);
    },
    enabled: !!id,
  });
};

// Create contact mutation
export const useCreateContact = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (data: CreateContactRequest) => ContactAPI.createContact(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: contactKeys.lists() });
      toast({
        title: "Thành công",
        description: "Liên hệ đã được thêm thành công",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Lỗi",
        description: error.message || "Có lỗi xảy ra khi thêm liên hệ",
        variant: "destructive",
      });
    },
  });
};

// Update contact mutation
export const useUpdateContact = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateContactRequest }) =>
      ContactAPI.updateContact(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: contactKeys.lists() });
      queryClient.invalidateQueries({ queryKey: contactKeys.detail(id) });
      toast({
        title: "Thành công",
        description: "Liên hệ đã được cập nhật thành công",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Lỗi",
        description: error.message || "Có lỗi xảy ra khi cập nhật liên hệ",
        variant: "destructive",
      });
    },
  });
};

// Delete contact mutation
export const useDeleteContact = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (id: string) => ContactAPI.deleteContact(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: contactKeys.lists() });
      toast({
        title: "Thành công",
        description: "Liên hệ đã được xóa thành công",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Lỗi",
        description: error.message || "Có lỗi xảy ra khi xóa liên hệ",
        variant: "destructive",
      });
    },
  });
};
