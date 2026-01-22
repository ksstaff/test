// Fix: Define and export core interfaces for the application.
// This resolves the "is not a module" error in components that import these types.

export interface SiteSettings {
  announcement: string;
  heroTitle: string;
  heroSubtitle: string;
  heroImageUrl: string;
  buttonLabels: {
    navConsultation: string;
    heroConsultation: string;
    heroSolutions: string;
    submitConsultation: string;
  };
  footer: {
    description: string;
    supportPhone: string;
    hqPhone: string;
    faultPhone: string;
  };
  webhookUrl: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  icon: string;
  linkUrl: string;
}

export interface NewsPost {
  id: string;
  title: string;
  content: string;
  date: string;
  imageUrl: string;
}

export interface Consultation {
  id: string;
  createdAt: string;
  storeName: string;
  customerName: string;
  phoneNumber: string;
  interests: string[];
}
