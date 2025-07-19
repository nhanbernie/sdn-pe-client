import { apiClient } from "@/lib/api";
import {
  Contact,
  CreateContactRequest,
  UpdateContactRequest,
  ContactsSearchParams,
} from "@/types/contact";

export class ContactAPI {
  // Get all contacts with optional search parameter
  static async getContacts(params: ContactsSearchParams = {}) {
    // Build query parameters
    const queryParams: Record<string, string> = {};

    if (params.search) {
      queryParams.search = params.search;
    }

    // Note: Backend may support other params in the future like group, sortBy, etc.
    if (params.group && params.group !== "Tất cả") {
      queryParams.group = params.group;
    }

    return apiClient.get<Contact[]>("/contacts", queryParams);
  }

  // Get contact by ID
  static async getContactById(id: string) {
    return apiClient.get<Contact>(`/contacts/${id}`);
  }

  // Create new contact
  static async createContact(data: CreateContactRequest) {
    return apiClient.post<Contact>("/contacts", data);
  }

  // Update contact using PATCH
  static async updateContact(id: string, data: UpdateContactRequest) {
    return apiClient.patch<Contact>(`/contacts/${id}`, data);
  }

  // Delete contact
  static async deleteContact(id: string) {
    return apiClient.delete<void>(`/contacts/${id}`);
  }
}
