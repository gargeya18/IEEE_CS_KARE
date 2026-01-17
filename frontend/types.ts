
export interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  venue: string;
  category: 'Workshop' | 'Hackathon' | 'Webinar' | 'Social' | 'Conference';
  domain: 'Web Development' | 'AI/ML' | 'Hardware/IoT' | 'Cybersecurity' | 'General';
  status: 'LIVE' | 'OPEN' | 'CLOSING' | 'FULL' | 'COMPLETED';
  image: string;
  description: string;
  speaker?: string;
}

export interface Achievement {
  id: string;
  title: string;
  level: 'International' | 'National' | 'University';
  date: string;
  winners: string;
  description: string;
  category: 'Award' | 'Competition' | 'Recognition';
  image: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  domain?: string;
  linkedin?: string;
  email?: string;
  isLead?: boolean;
}

export interface GalleryItem {
  id: string;
  src: string;
  caption: string;
  category: string;
}

export interface Milestone {
  year: number;
  title: string;
  description: string;
  icon: string;
}

export interface Announcement {
  id: string;
  date: string;
  event: string;
  title?: string;
  fullDate?: string;
  prizes?: string;
  link?: string;
  image?: string;
}

export interface Society {
  id: string;
  name: string;
  logo: string; // URL or placeholder
  description?: string;
  link?: string;
}
