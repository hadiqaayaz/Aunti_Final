export type DoulaSpecialty = "birth" | "postpartum" | "full-spectrum";

export interface Doula {
  id: string;
  name: string;
  photoUrl: string;
  city: string;
  state: string;
  pronouns: string;
  zipCode: string;
  specialties: DoulaSpecialty[];
  tags: string[];
  rating: number;
  reviewCount: number;
  testimonialCount: number;
  bio: string;
  availableDates?: string[];
  packagePrice: number;
  addonRate: number;
  slidingScale: boolean;
  paymentPlans: boolean;
  isNew?: boolean;
}

export interface ListingsQuery {
  zipCode?: string;
  specialties?: DoulaSpecialty[];
  date?: string;
}

export interface ListingsResponse {
  results: Doula[];
  total: number;
}

export type ApiResponse<T> =
  | { ok: true; data: T }
  | { ok: false; error: string };

  export interface ListingsQuery {
  zipCode?: string;
  specialties?: DoulaSpecialty[];
  date?: string;
  maxPackagePrice?: number;
  maxAddonRate?: number;
  tags?: string[];
}
