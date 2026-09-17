export interface VenueInfo {
  name: string;
  address: string;
  city: string;
  time: string;
  mapsUrl: string;
}

export interface TimelineStoryEvent {
  year: string;
  title: string;
  description: string;
}

export interface ItineraryEvent {
  time: string;
  title: string;
  icon: "rings" | "cocktail" | "utensils" | "music" | "party";
}

export interface DressCodeGuideline {
  audience: string;
  points: string[];
}

export interface DressCodeInfo {
  level: string;
  description: string;
  guidelines: DressCodeGuideline[];
  suggestedColors: string[];
  considerations: string[];
}

export interface GiftRegistryOption {
  id: string;
  label: string;
  description: string;
  href?: string;
}

export interface BankDetails {
  bankName: string;
  accountHolder: string;
  clabe: string;
  accountNumber: string;
}

export interface GuestInfoBlock {
  id: string;
  title: string;
  summary: string;
  details: string[];
}

export interface SocialLink {
  id: string;
  label: string;
  href: string;
}

export interface WeddingData {
  brideName: string;
  groomName: string;
  coupleHashtag: string;
  weddingDate: string;
  rsvpDeadline: string;
  city: string;
  welcomeQuote: string;
  welcomeText: string;
  welcomeClosing: string;
  ceremony: VenueInfo;
  reception: VenueInfo;
  story: {
    heading: string;
    text: string;
    timeline: TimelineStoryEvent[];
  };
  itinerary: ItineraryEvent[];
  dressCode: DressCodeInfo;
  giftRegistry: {
    intro: string;
    options: GiftRegistryOption[];
  };
  bankDetails: BankDetails;
  guestInformation: GuestInfoBlock[];
  socialLinks: SocialLink[];
}
