export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          full_name: string | null
          phone_number: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          full_name?: string | null
          phone_number?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          full_name?: string | null
          phone_number?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      wallets: {
        Row: {
          id: string
          user_id: string
          balance: number
          last_updated: string
        }
        Insert: {
          id?: string
          user_id: string
          balance?: number
          last_updated?: string
        }
        Update: {
          id?: string
          user_id?: string
          balance?: number
          last_updated?: string
        }
      }
      categories: {
        Row: {
          id: string
          name: string
          description: string | null
          image_url: string | null
          slug: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          image_url?: string | null
          slug: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          image_url?: string | null
          slug?: string
          created_at?: string
        }
      }
      meals: {
        Row: {
          id: string
          category_id: string
          name: string
          description: string | null
          price: number
          image_url: string | null
          ingredients: Json | null
          nutritional_info: Json | null
          is_available: boolean
          rating: number | null
          slug: string
          created_at: string
        }
        Insert: {
          id?: string
          category_id: string
          name: string
          description?: string | null
          price: number
          image_url?: string | null
          ingredients?: Json | null
          nutritional_info?: Json | null
          is_available?: boolean
          rating?: number | null
          slug: string
          created_at?: string
        }
        Update: {
          id?: string
          category_id?: string
          name?: string
          description?: string | null
          price?: number
          image_url?: string | null
          ingredients?: Json | null
          nutritional_info?: Json | null
          is_available?: boolean
          rating?: number | null
          slug?: string
          created_at?: string
        }
      }
    }
  }
} 