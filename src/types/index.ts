export interface Service {
  id: string;
  title: string;
  description: string;
  image: string;
  features: string[];
}

export interface News {
  id: string;
  title: string;
  summary: string;
  image: string;
  date?: string;
}

export interface Testimonial {
  id: string;
  author: string;
  info: string;
  content: string;
  image: string;
}

export interface Faq {
  id: string;
  question: string;
  answer: string;
}

export interface WebsiteSetting {
  address: string;
  hotline: string;
  email: string;
  working_hours: string;
  logo?: string;
}
