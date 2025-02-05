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
      basic_game_cards: {
        Row: {
          id: string
          name: string
          name_ta: string | null
          image: string
          category_id: string | null
          selected: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          name_ta?: string | null
          image: string
          category_id?: string | null
          selected?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          name_ta?: string | null
          image?: string
          category_id?: string | null
          selected?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      game_categories: {
        Row: {
          id: string
          name: string
          name_ta: string | null
          slug: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          name_ta?: string | null
          slug: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          name_ta?: string | null
          slug?: string
          created_at?: string
          updated_at?: string
        }
      }
      hero_content: {
        Row: {
          id: string
          title: string
          title_ta: string | null
          subtitle: string
          subtitle_ta: string | null
          background_image: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          title_ta?: string | null
          subtitle: string
          subtitle_ta?: string | null
          background_image: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          title_ta?: string | null
          subtitle?: string
          subtitle_ta?: string | null
          background_image?: string
          created_at?: string
          updated_at?: string
        }
      }
      contact_info: {
        Row: {
          id: string
          email: string
          phone: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          phone: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          phone?: string
          created_at?: string
          updated_at?: string
        }
      }
      social_links: {
        Row: {
          id: string
          platform: string
          url: string
          icon: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          platform: string
          url: string
          icon: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          platform?: string
          url?: string
          icon?: string
          created_at?: string
          updated_at?: string
        }
      }
      footer_content: {
        Row: {
          id: string
          company_description: string
          company_description_ta: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          company_description: string
          company_description_ta?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          company_description?: string
          company_description_ta?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      booking_requests: {
        Row: {
          id: string
          name: string
          email: string
          phone: string
          date: string
          event_type: string
          requirements: string | null
          email_sent: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          phone: string
          date: string
          event_type: string
          requirements?: string | null
          email_sent?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          phone?: string
          date?: string
          event_type?: string
          requirements?: string | null
          email_sent?: boolean
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}