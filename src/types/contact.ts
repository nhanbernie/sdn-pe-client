export interface Contact {
  _id: string; // MongoDB uses _id
  name: string;
  email: string;
  phone?: string; // Optional in API
  group: string;
  createdAt: string;
  updatedAt: string;
  __v?: number; // MongoDB version field
}

// For frontend compatibility, we'll also have a normalized version
export interface NormalizedContact {
  id: string;
  name: string;
  email: string;
  phone: string;
  group: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateContactRequest {
  name: string;
  email: string;
  phone?: string;
  group: string;
}

export interface UpdateContactRequest {
  name?: string;
  email?: string;
  phone?: string;
  group?: string;
}

export interface ContactsSearchParams {
  page?: number;
  limit?: number;
  search?: string;
  group?: string;
  sortBy?: "name" | "email" | "createdAt";
  sortOrder?: "asc" | "desc";
}

export const CONTACT_GROUPS = [
  "Friends", // Matching API data
  "Work", // Matching API data
  "Family", // Matching API data
  "Khách hàng",
  "Đối tác",
] as const;

export type ContactGroup = (typeof CONTACT_GROUPS)[number];

// Utility function to normalize contact data
export const normalizeContact = (contact: Contact): NormalizedContact => ({
  id: contact._id,
  name: contact.name,
  email: contact.email,
  phone: contact.phone || "",
  group: contact.group,
  createdAt: contact.createdAt,
  updatedAt: contact.updatedAt,
});
