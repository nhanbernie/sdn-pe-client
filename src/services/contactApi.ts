import { apiClient } from "@/lib/api";
import {
  Contact,
  CreateContactRequest,
  UpdateContactRequest,
  ContactsSearchParams,
} from "@/types/contact";

export class ContactAPI {
  // Get all contacts - returns array directly
  static async getContacts(params: ContactsSearchParams = {}) {
    // For now, API doesn't support pagination/filtering, so we get all and filter client-side
    return apiClient.get<Contact[]>("/contacts");
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
