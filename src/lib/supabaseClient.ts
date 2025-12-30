import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types for our database tables
export interface Author {
  id: string;
  name: string;
  bio?: string;
  avatar_url?: string;
  twitter_url?: string;
  instagram_url?: string;
  youtube_url?: string;
  linkedin_url?: string;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  color: string;
  icon: string;
  created_at: string;
  updated_at: string;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  icon: string;
  featured_image?: string;
  author_id?: string;
  category_id?: string;
  status: 'draft' | 'published' | 'archived';
  views: number;
  read_time: number;
  published_at?: string;
  created_at: string;
  updated_at: string;
  author?: Author;
  category?: Category;
  summary_points?: ArticleSummaryPoint[];
}

export interface ArticleSummaryPoint {
  id: string;
  article_id: string;
  point_text: string;
  order_index: number;
  created_at: string;
}

export interface Subscriber {
  id: string;
  email: string;
  status: 'active' | 'unsubscribed';
  subscribed_at: string;
  unsubscribed_at?: string;
}

export interface Media {
  id: string;
  url: string;
  filename: string;
  file_size?: number;
  mime_type?: string;
  width?: number;
  height?: number;
  uploaded_by?: string;
  created_at: string;
}
