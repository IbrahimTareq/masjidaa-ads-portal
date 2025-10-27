export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      ad_requests: {
        Row: {
          business_id: string
          created_at: string
          expires_at: string | null
          id: string
          image: string
          masjid_id: string
          message: string | null
          rejected_reason: string | null
          status: Database["public"]["Enums"]["status_type"]
          stripe_payment_intent_id: string | null
          title: string
        }
        Insert: {
          business_id: string
          created_at?: string
          expires_at?: string | null
          id?: string
          image: string
          masjid_id: string
          message?: string | null
          rejected_reason?: string | null
          status?: Database["public"]["Enums"]["status_type"]
          stripe_payment_intent_id?: string | null
          title: string
        }
        Update: {
          business_id?: string
          created_at?: string
          expires_at?: string | null
          id?: string
          image?: string
          masjid_id?: string
          message?: string | null
          rejected_reason?: string | null
          status?: Database["public"]["Enums"]["status_type"]
          stripe_payment_intent_id?: string | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "ad_requests_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ad_requests_masjid_id_fkey"
            columns: ["masjid_id"]
            isOneToOne: false
            referencedRelation: "masjids"
            referencedColumns: ["id"]
          },
        ]
      }
      announcements: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          image: string | null
          masjid_id: string
          pinned: boolean
          push_notification: boolean | null
          short_link_id: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          image?: string | null
          masjid_id: string
          pinned?: boolean
          push_notification?: boolean | null
          short_link_id?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          image?: string | null
          masjid_id?: string
          pinned?: boolean
          push_notification?: boolean | null
          short_link_id?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "announcements_masjid_id_fkey"
            columns: ["masjid_id"]
            isOneToOne: false
            referencedRelation: "masjids"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "announcements_short_link_id_fkey"
            columns: ["short_link_id"]
            isOneToOne: false
            referencedRelation: "short_links"
            referencedColumns: ["id"]
          },
        ]
      }
      anonymous_users: {
        Row: {
          created_at: string | null
          device_brand: string | null
          device_model: string | null
          device_os: string | null
          device_os_version: string | null
          device_type: string | null
          id: string
          is_admin_device: boolean
          last_seen_at: string
          push_token: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          device_brand?: string | null
          device_model?: string | null
          device_os?: string | null
          device_os_version?: string | null
          device_type?: string | null
          id?: string
          is_admin_device?: boolean
          last_seen_at?: string
          push_token?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          device_brand?: string | null
          device_model?: string | null
          device_os?: string | null
          device_os_version?: string | null
          device_type?: string | null
          id?: string
          is_admin_device?: boolean
          last_seen_at?: string
          push_token?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      businesses: {
        Row: {
          address: string | null
          contact_email: string | null
          contact_number: string | null
          created_at: string
          description: string
          id: string
          name: string
          user_id: string | null
          website: string
        }
        Insert: {
          address?: string | null
          contact_email?: string | null
          contact_number?: string | null
          created_at?: string
          description: string
          id?: string
          name: string
          user_id?: string | null
          website: string
        }
        Update: {
          address?: string | null
          contact_email?: string | null
          contact_number?: string | null
          created_at?: string
          description?: string
          id?: string
          name?: string
          user_id?: string | null
          website?: string
        }
        Relationships: [
          {
            foreignKeyName: "businesses_user_id_users_id_fk"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      donation_campaigns: {
        Row: {
          active: boolean
          amount_raised: number
          bank_account_id: string
          created_at: string | null
          description: string | null
          id: string
          image: string | null
          masjid_id: string
          name: string
          short_link_id: string | null
          target_amount: number
          video: string | null
        }
        Insert: {
          active?: boolean
          amount_raised?: number
          bank_account_id: string
          created_at?: string | null
          description?: string | null
          id?: string
          image?: string | null
          masjid_id: string
          name: string
          short_link_id?: string | null
          target_amount: number
          video?: string | null
        }
        Update: {
          active?: boolean
          amount_raised?: number
          bank_account_id?: string
          created_at?: string | null
          description?: string | null
          id?: string
          image?: string | null
          masjid_id?: string
          name?: string
          short_link_id?: string | null
          target_amount?: number
          video?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "donation_campaigns_bank_account_id_fkey"
            columns: ["bank_account_id"]
            isOneToOne: false
            referencedRelation: "masjid_bank_accounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "donation_campaigns_masjid_id_fkey"
            columns: ["masjid_id"]
            isOneToOne: false
            referencedRelation: "masjids"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "donation_campaigns_short_link_id_fkey"
            columns: ["short_link_id"]
            isOneToOne: false
            referencedRelation: "short_links"
            referencedColumns: ["id"]
          },
        ]
      }
      donations: {
        Row: {
          amount: number
          campaign_id: string
          created_at: string | null
          currency: string
          donation_type: Database["public"]["Enums"]["donation_type"]
          donor_address: string | null
          donor_email: string | null
          donor_first_name: string
          donor_last_name: string
          donor_message: string | null
          gift_aid_declared: boolean
          id: string
          is_anonymous: boolean
          masjid_id: string
          receipt_id: string | null
          resend_id: string | null
          stripe_payment_id: string | null
          stripe_receipt_url: string | null
        }
        Insert: {
          amount: number
          campaign_id: string
          created_at?: string | null
          currency?: string
          donation_type?: Database["public"]["Enums"]["donation_type"]
          donor_address?: string | null
          donor_email?: string | null
          donor_first_name: string
          donor_last_name: string
          donor_message?: string | null
          gift_aid_declared?: boolean
          id?: string
          is_anonymous?: boolean
          masjid_id: string
          receipt_id?: string | null
          resend_id?: string | null
          stripe_payment_id?: string | null
          stripe_receipt_url?: string | null
        }
        Update: {
          amount?: number
          campaign_id?: string
          created_at?: string | null
          currency?: string
          donation_type?: Database["public"]["Enums"]["donation_type"]
          donor_address?: string | null
          donor_email?: string | null
          donor_first_name?: string
          donor_last_name?: string
          donor_message?: string | null
          gift_aid_declared?: boolean
          id?: string
          is_anonymous?: boolean
          masjid_id?: string
          receipt_id?: string | null
          resend_id?: string | null
          stripe_payment_id?: string | null
          stripe_receipt_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "donations_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "donation_campaigns"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "donations_masjid_id_fkey"
            columns: ["masjid_id"]
            isOneToOne: false
            referencedRelation: "masjids"
            referencedColumns: ["id"]
          },
        ]
      }
      event_form_submissions: {
        Row: {
          data: Json
          email: string
          event_id: string
          first_name: string
          form_id: string
          id: string
          last_name: string
          masjid_id: string
          submitted_at: string | null
        }
        Insert: {
          data: Json
          email: string
          event_id: string
          first_name: string
          form_id: string
          id?: string
          last_name: string
          masjid_id: string
          submitted_at?: string | null
        }
        Update: {
          data?: Json
          email?: string
          event_id?: string
          first_name?: string
          form_id?: string
          id?: string
          last_name?: string
          masjid_id?: string
          submitted_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "event_form_submissions_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "event_form_submissions_form_id_fkey"
            columns: ["form_id"]
            isOneToOne: false
            referencedRelation: "event_forms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "event_form_submissions_masjid_id_fkey"
            columns: ["masjid_id"]
            isOneToOne: false
            referencedRelation: "masjids"
            referencedColumns: ["id"]
          },
        ]
      }
      event_forms: {
        Row: {
          created_at: string | null
          id: string
          masjid_id: string
          name: string
          schema: Json
          ui_schema: Json | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          masjid_id: string
          name: string
          schema: Json
          ui_schema?: Json | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          masjid_id?: string
          name?: string
          schema?: Json
          ui_schema?: Json | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "forms_masjid_id_fkey"
            columns: ["masjid_id"]
            isOneToOne: false
            referencedRelation: "masjids"
            referencedColumns: ["id"]
          },
        ]
      }
      event_payments: {
        Row: {
          amount: number
          created_at: string | null
          currency: string
          email: string
          event_id: string
          first_name: string
          id: string
          last_name: string
          masjid_id: string
          receipt_id: string | null
          resend_id: string | null
          stripe_payment_intent_id: string | null
          stripe_receipt_url: string | null
        }
        Insert: {
          amount: number
          created_at?: string | null
          currency?: string
          email: string
          event_id: string
          first_name: string
          id?: string
          last_name: string
          masjid_id: string
          receipt_id?: string | null
          resend_id?: string | null
          stripe_payment_intent_id?: string | null
          stripe_receipt_url?: string | null
        }
        Update: {
          amount?: number
          created_at?: string | null
          currency?: string
          email?: string
          event_id?: string
          first_name?: string
          id?: string
          last_name?: string
          masjid_id?: string
          receipt_id?: string | null
          resend_id?: string | null
          stripe_payment_intent_id?: string | null
          stripe_receipt_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "event_payments_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "event_payments_masjid_id_fkey"
            columns: ["masjid_id"]
            isOneToOne: false
            referencedRelation: "masjids"
            referencedColumns: ["id"]
          },
        ]
      }
      events: {
        Row: {
          bank_account_id: string | null
          created_at: string | null
          date: string
          description: string | null
          enrolment_fee: number | null
          enrolment_limit: number | null
          event_form_id: string | null
          id: string
          image: string | null
          is_public: boolean
          location: string | null
          masjid_id: string
          push_notification: boolean
          recurrence: string | null
          short_link_id: string
          start_time: string | null
          status: Database["public"]["Enums"]["event_status"]
          title: string
          type: Database["public"]["Enums"]["event_type"]
          updated_at: string | null
        }
        Insert: {
          bank_account_id?: string | null
          created_at?: string | null
          date: string
          description?: string | null
          enrolment_fee?: number | null
          enrolment_limit?: number | null
          event_form_id?: string | null
          id?: string
          image?: string | null
          is_public?: boolean
          location?: string | null
          masjid_id: string
          push_notification?: boolean
          recurrence?: string | null
          short_link_id: string
          start_time?: string | null
          status?: Database["public"]["Enums"]["event_status"]
          title: string
          type?: Database["public"]["Enums"]["event_type"]
          updated_at?: string | null
        }
        Update: {
          bank_account_id?: string | null
          created_at?: string | null
          date?: string
          description?: string | null
          enrolment_fee?: number | null
          enrolment_limit?: number | null
          event_form_id?: string | null
          id?: string
          image?: string | null
          is_public?: boolean
          location?: string | null
          masjid_id?: string
          push_notification?: boolean
          recurrence?: string | null
          short_link_id?: string
          start_time?: string | null
          status?: Database["public"]["Enums"]["event_status"]
          title?: string
          type?: Database["public"]["Enums"]["event_type"]
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "events_bank_account_id_fkey"
            columns: ["bank_account_id"]
            isOneToOne: false
            referencedRelation: "masjid_bank_accounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "events_event_form_id_fkey"
            columns: ["event_form_id"]
            isOneToOne: false
            referencedRelation: "event_forms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "events_masjid_id_fkey"
            columns: ["masjid_id"]
            isOneToOne: false
            referencedRelation: "masjids"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "events_short_link_id_fkey"
            columns: ["short_link_id"]
            isOneToOne: false
            referencedRelation: "short_links"
            referencedColumns: ["id"]
          },
        ]
      }
      facilities: {
        Row: {
          description: string | null
          id: string
          name: string
        }
        Insert: {
          description?: string | null
          id?: string
          name: string
        }
        Update: {
          description?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      masjid_ads: {
        Row: {
          ad_price: number
          allow_ads: boolean
          id: string
          masjid_id: string
        }
        Insert: {
          ad_price?: number
          allow_ads?: boolean
          id?: string
          masjid_id: string
        }
        Update: {
          ad_price?: number
          allow_ads?: boolean
          id?: string
          masjid_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "masjid_ads_masjid_id_fkey"
            columns: ["masjid_id"]
            isOneToOne: false
            referencedRelation: "masjids"
            referencedColumns: ["id"]
          },
        ]
      }
      masjid_bank_accounts: {
        Row: {
          created_at: string | null
          default: boolean
          id: string
          masjid_id: string
          name: string | null
          status: Database["public"]["Enums"]["bank_account_status"]
          stripe_account_id: string
        }
        Insert: {
          created_at?: string | null
          default?: boolean
          id?: string
          masjid_id: string
          name?: string | null
          status?: Database["public"]["Enums"]["bank_account_status"]
          stripe_account_id: string
        }
        Update: {
          created_at?: string | null
          default?: boolean
          id?: string
          masjid_id?: string
          name?: string | null
          status?: Database["public"]["Enums"]["bank_account_status"]
          stripe_account_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "masjid_bank_accounts_masjid_id_fkey"
            columns: ["masjid_id"]
            isOneToOne: false
            referencedRelation: "masjids"
            referencedColumns: ["id"]
          },
        ]
      }
      masjid_custom_slides: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          image: string
          masjid_id: string
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          image: string
          masjid_id: string
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          image?: string
          masjid_id?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "masjid_custom_slides_masjid_id_fkey"
            columns: ["masjid_id"]
            isOneToOne: false
            referencedRelation: "masjids"
            referencedColumns: ["id"]
          },
        ]
      }
      masjid_facilities: {
        Row: {
          facility_id: string
          masjid_id: string
        }
        Insert: {
          facility_id: string
          masjid_id: string
        }
        Update: {
          facility_id?: string
          masjid_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "masjid_facilities_facility_id_fkey"
            columns: ["facility_id"]
            isOneToOne: false
            referencedRelation: "facilities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "masjid_facilities_masjid_id_fkey"
            columns: ["masjid_id"]
            isOneToOne: false
            referencedRelation: "masjids"
            referencedColumns: ["id"]
          },
        ]
      }
      masjid_followers: {
        Row: {
          anonymous_user_id: string
          created_at: string | null
          id: string
          masjid_id: string
          updated_at: string | null
        }
        Insert: {
          anonymous_user_id: string
          created_at?: string | null
          id?: string
          masjid_id: string
          updated_at?: string | null
        }
        Update: {
          anonymous_user_id?: string
          created_at?: string | null
          id?: string
          masjid_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "masjid_followers_anonymous_user_id_fkey"
            columns: ["anonymous_user_id"]
            isOneToOne: false
            referencedRelation: "anonymous_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "masjid_followers_masjid_id_fkey"
            columns: ["masjid_id"]
            isOneToOne: false
            referencedRelation: "masjids"
            referencedColumns: ["id"]
          },
        ]
      }
      masjid_iqamah_times: {
        Row: {
          active: boolean
          asr: string | null
          created_at: string | null
          dhuhr: string | null
          effective_from: string
          fajr: string | null
          id: string
          isha: string | null
          last_notified_at: string | null
          maghrib: string | null
          masjid_id: string | null
          send_push_notification: boolean
          updated_at: string | null
        }
        Insert: {
          active?: boolean
          asr?: string | null
          created_at?: string | null
          dhuhr?: string | null
          effective_from: string
          fajr?: string | null
          id?: string
          isha?: string | null
          last_notified_at?: string | null
          maghrib?: string | null
          masjid_id?: string | null
          send_push_notification?: boolean
          updated_at?: string | null
        }
        Update: {
          active?: boolean
          asr?: string | null
          created_at?: string | null
          dhuhr?: string | null
          effective_from?: string
          fajr?: string | null
          id?: string
          isha?: string | null
          last_notified_at?: string | null
          maghrib?: string | null
          masjid_id?: string | null
          send_push_notification?: boolean
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "iqamah_times_masjid_id_fkey"
            columns: ["masjid_id"]
            isOneToOne: false
            referencedRelation: "masjids"
            referencedColumns: ["id"]
          },
        ]
      }
      masjid_jummah_times: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          khutbah: string
          masjid_id: string
          send_push_notification: boolean | null
          starts: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          khutbah: string
          masjid_id: string
          send_push_notification?: boolean | null
          starts: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          khutbah?: string
          masjid_id?: string
          send_push_notification?: boolean | null
          starts?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "jumuah_times_masjid_id_fkey"
            columns: ["masjid_id"]
            isOneToOne: false
            referencedRelation: "masjids"
            referencedColumns: ["id"]
          },
        ]
      }
      masjid_prayer_settings: {
        Row: {
          asr_adjustment: number
          calculation_method: Database["public"]["Enums"]["calculation_method"]
          created_at: string | null
          dhuhr_adjustment: number
          duha_offset: string
          fajr_adjustment: number
          fajr_angle: number
          high_latitude_rule:
            | Database["public"]["Enums"]["high_latitude_rule"]
            | null
          isha_adjustment: number
          isha_angle: number
          latitude: number
          longitude: number
          madhab: Database["public"]["Enums"]["madhab"]
          maghrib_adjustment: number
          maghrib_angle: number
          masjid_id: string
          sunrise_offset: number
          time_format: Database["public"]["Enums"]["time_format"]
          timezone: string
          updated_at: string | null
        }
        Insert: {
          asr_adjustment?: number
          calculation_method: Database["public"]["Enums"]["calculation_method"]
          created_at?: string | null
          dhuhr_adjustment?: number
          duha_offset: string
          fajr_adjustment?: number
          fajr_angle?: number
          high_latitude_rule?:
            | Database["public"]["Enums"]["high_latitude_rule"]
            | null
          isha_adjustment?: number
          isha_angle?: number
          latitude: number
          longitude: number
          madhab: Database["public"]["Enums"]["madhab"]
          maghrib_adjustment?: number
          maghrib_angle?: number
          masjid_id: string
          sunrise_offset?: number
          time_format?: Database["public"]["Enums"]["time_format"]
          timezone?: string
          updated_at?: string | null
        }
        Update: {
          asr_adjustment?: number
          calculation_method?: Database["public"]["Enums"]["calculation_method"]
          created_at?: string | null
          dhuhr_adjustment?: number
          duha_offset?: string
          fajr_adjustment?: number
          fajr_angle?: number
          high_latitude_rule?:
            | Database["public"]["Enums"]["high_latitude_rule"]
            | null
          isha_adjustment?: number
          isha_angle?: number
          latitude?: number
          longitude?: number
          madhab?: Database["public"]["Enums"]["madhab"]
          maghrib_adjustment?: number
          maghrib_angle?: number
          masjid_id?: string
          sunrise_offset?: number
          time_format?: Database["public"]["Enums"]["time_format"]
          timezone?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "masjid_prayer_settings_masjid_id_fkey"
            columns: ["masjid_id"]
            isOneToOne: true
            referencedRelation: "masjids"
            referencedColumns: ["id"]
          },
        ]
      }
      masjid_services: {
        Row: {
          masjid_id: string
          service_id: string
        }
        Insert: {
          masjid_id: string
          service_id: string
        }
        Update: {
          masjid_id?: string
          service_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "masjid_services_masjid_id_fkey"
            columns: ["masjid_id"]
            isOneToOne: false
            referencedRelation: "masjids"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "masjid_services_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          },
        ]
      }
      masjid_site_settings: {
        Row: {
          created_at: string | null
          featured_campaign_id: string | null
          id: string
          masjid_id: string
          primary_description: string | null
          primary_title: string | null
          services: Json | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          featured_campaign_id?: string | null
          id?: string
          masjid_id: string
          primary_description?: string | null
          primary_title?: string | null
          services?: Json | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          featured_campaign_id?: string | null
          id?: string
          masjid_id?: string
          primary_description?: string | null
          primary_title?: string | null
          services?: Json | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "masjid_site_settings_featured_campaign_id_fkey"
            columns: ["featured_campaign_id"]
            isOneToOne: false
            referencedRelation: "donation_campaigns"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "masjid_site_settings_masjid_id_fkey"
            columns: ["masjid_id"]
            isOneToOne: false
            referencedRelation: "masjids"
            referencedColumns: ["id"]
          },
        ]
      }
      masjid_slides: {
        Row: {
          created_at: string | null
          id: string
          layout_type: Database["public"]["Enums"]["layout_type"]
          masjid_id: string
          props: Json
          reference_id: string | null
          slide_type: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          layout_type: Database["public"]["Enums"]["layout_type"]
          masjid_id: string
          props: Json
          reference_id?: string | null
          slide_type: string
        }
        Update: {
          created_at?: string | null
          id?: string
          layout_type?: Database["public"]["Enums"]["layout_type"]
          masjid_id?: string
          props?: Json
          reference_id?: string | null
          slide_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "masjid_slides_masjid_id_fkey"
            columns: ["masjid_id"]
            isOneToOne: false
            referencedRelation: "masjids"
            referencedColumns: ["id"]
          },
        ]
      }
      masjid_socials: {
        Row: {
          created_at: string
          facebook_url: string | null
          id: string
          instagram_url: string | null
          linkedin_url: string | null
          masjid_id: string
          tiktok_url: string | null
          twitter_url: string | null
          updated_at: string
          whatsapp_url: string | null
          youtube_channel_id: string | null
          youtube_url: string | null
        }
        Insert: {
          created_at?: string
          facebook_url?: string | null
          id?: string
          instagram_url?: string | null
          linkedin_url?: string | null
          masjid_id: string
          tiktok_url?: string | null
          twitter_url?: string | null
          updated_at?: string
          whatsapp_url?: string | null
          youtube_channel_id?: string | null
          youtube_url?: string | null
        }
        Update: {
          created_at?: string
          facebook_url?: string | null
          id?: string
          instagram_url?: string | null
          linkedin_url?: string | null
          masjid_id?: string
          tiktok_url?: string | null
          twitter_url?: string | null
          updated_at?: string
          whatsapp_url?: string | null
          youtube_channel_id?: string | null
          youtube_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "masjid_socials_masjid_id_fkey"
            columns: ["masjid_id"]
            isOneToOne: false
            referencedRelation: "masjids"
            referencedColumns: ["id"]
          },
        ]
      }
      masjid_subscriptions: {
        Row: {
          canceled_at: string | null
          created_at: string | null
          current_period_end: string | null
          current_period_start: string | null
          id: string
          masjid_id: string
          status: Database["public"]["Enums"]["subscription_status"]
          stripe_customer_id: string | null
          tier: Database["public"]["Enums"]["subscription_type"]
          tier_id: string
          updated_at: string | null
        }
        Insert: {
          canceled_at?: string | null
          created_at?: string | null
          current_period_end?: string | null
          current_period_start?: string | null
          id?: string
          masjid_id: string
          status: Database["public"]["Enums"]["subscription_status"]
          stripe_customer_id?: string | null
          tier: Database["public"]["Enums"]["subscription_type"]
          tier_id: string
          updated_at?: string | null
        }
        Update: {
          canceled_at?: string | null
          created_at?: string | null
          current_period_end?: string | null
          current_period_start?: string | null
          id?: string
          masjid_id?: string
          status?: Database["public"]["Enums"]["subscription_status"]
          stripe_customer_id?: string | null
          tier?: Database["public"]["Enums"]["subscription_type"]
          tier_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "masjid_subscriptions_masjid_id_fkey"
            columns: ["masjid_id"]
            isOneToOne: false
            referencedRelation: "masjids"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "masjid_subscriptions_tier_id_fkey"
            columns: ["tier_id"]
            isOneToOne: false
            referencedRelation: "subscription_tiers"
            referencedColumns: ["id"]
          },
        ]
      }
      masjid_tax_info: {
        Row: {
          address_required: boolean
          country_code: Database["public"]["Enums"]["supported_country_code"]
          created_at: string | null
          declaration_required: boolean
          id: string
          is_tax_deductible: boolean
          masjid_id: string
          registration_number: string | null
          scheme_name: Database["public"]["Enums"]["scheme_types"]
          updated_at: string | null
        }
        Insert: {
          address_required?: boolean
          country_code: Database["public"]["Enums"]["supported_country_code"]
          created_at?: string | null
          declaration_required?: boolean
          id?: string
          is_tax_deductible?: boolean
          masjid_id: string
          registration_number?: string | null
          scheme_name: Database["public"]["Enums"]["scheme_types"]
          updated_at?: string | null
        }
        Update: {
          address_required?: boolean
          country_code?: Database["public"]["Enums"]["supported_country_code"]
          created_at?: string | null
          declaration_required?: boolean
          id?: string
          is_tax_deductible?: boolean
          masjid_id?: string
          registration_number?: string | null
          scheme_name?: Database["public"]["Enums"]["scheme_types"]
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "masjid_tax_info_masjid_id_fkey"
            columns: ["masjid_id"]
            isOneToOne: true
            referencedRelation: "masjids"
            referencedColumns: ["id"]
          },
        ]
      }
      masjid_tickers: {
        Row: {
          created_at: string | null
          id: string
          is_active: boolean
          masjid_id: string
          ticker_messages: string[]
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_active?: boolean
          masjid_id: string
          ticker_messages?: string[]
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          is_active?: boolean
          masjid_id?: string
          ticker_messages?: string[]
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "masjid_tickers_masjid_id_fkey"
            columns: ["masjid_id"]
            isOneToOne: false
            referencedRelation: "masjids"
            referencedColumns: ["id"]
          },
        ]
      }
      masjids: {
        Row: {
          active: boolean
          address_label: string
          bg_image: string | null
          city: string
          claimed: boolean
          contact_number: string | null
          country: Database["public"]["Enums"]["supported_country_name"]
          country_code: Database["public"]["Enums"]["supported_country_code"]
          created_at: string | null
          description: string | null
          email: string | null
          fts: unknown
          hijri_date_adjustment: number
          id: string
          local_currency: Database["public"]["Enums"]["supported_currency"]
          logo: string | null
          name: string
          postcode: string | null
          region: string | null
          slug: string
          state: string | null
          street: string | null
          subscription_id: string | null
          suburb: string | null
          theme_color_id: string | null
          updated_at: string | null
          verified: boolean
          website: string | null
        }
        Insert: {
          active?: boolean
          address_label?: string
          bg_image?: string | null
          city?: string
          claimed?: boolean
          contact_number?: string | null
          country?: Database["public"]["Enums"]["supported_country_name"]
          country_code?: Database["public"]["Enums"]["supported_country_code"]
          created_at?: string | null
          description?: string | null
          email?: string | null
          fts?: unknown
          hijri_date_adjustment: number
          id?: string
          local_currency?: Database["public"]["Enums"]["supported_currency"]
          logo?: string | null
          name: string
          postcode?: string | null
          region?: string | null
          slug: string
          state?: string | null
          street?: string | null
          subscription_id?: string | null
          suburb?: string | null
          theme_color_id?: string | null
          updated_at?: string | null
          verified?: boolean
          website?: string | null
        }
        Update: {
          active?: boolean
          address_label?: string
          bg_image?: string | null
          city?: string
          claimed?: boolean
          contact_number?: string | null
          country?: Database["public"]["Enums"]["supported_country_name"]
          country_code?: Database["public"]["Enums"]["supported_country_code"]
          created_at?: string | null
          description?: string | null
          email?: string | null
          fts?: unknown
          hijri_date_adjustment?: number
          id?: string
          local_currency?: Database["public"]["Enums"]["supported_currency"]
          logo?: string | null
          name?: string
          postcode?: string | null
          region?: string | null
          slug?: string
          state?: string | null
          street?: string | null
          subscription_id?: string | null
          suburb?: string | null
          theme_color_id?: string | null
          updated_at?: string | null
          verified?: boolean
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "masjids_subscription_id_fkey"
            columns: ["subscription_id"]
            isOneToOne: false
            referencedRelation: "masjid_subscriptions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "masjids_theme_color_id_fkey"
            columns: ["theme_color_id"]
            isOneToOne: false
            referencedRelation: "themes"
            referencedColumns: ["id"]
          },
        ]
      }
      recurring_donations: {
        Row: {
          amount_cents: number
          campaign_id: string
          created_at: string | null
          currency: string
          email: string
          first_name: string
          frequency: string
          id: string
          last_name: string
          masjid_id: string
          status: Database["public"]["Enums"]["recurring_donation_status"]
          stripe_account_id: string
          stripe_customer_id: string
          stripe_payment_method_id: string
          stripe_subscription_id: string
          updated_at: string | null
        }
        Insert: {
          amount_cents: number
          campaign_id: string
          created_at?: string | null
          currency?: string
          email: string
          first_name: string
          frequency: string
          id?: string
          last_name: string
          masjid_id: string
          status?: Database["public"]["Enums"]["recurring_donation_status"]
          stripe_account_id: string
          stripe_customer_id: string
          stripe_payment_method_id: string
          stripe_subscription_id: string
          updated_at?: string | null
        }
        Update: {
          amount_cents?: number
          campaign_id?: string
          created_at?: string | null
          currency?: string
          email?: string
          first_name?: string
          frequency?: string
          id?: string
          last_name?: string
          masjid_id?: string
          status?: Database["public"]["Enums"]["recurring_donation_status"]
          stripe_account_id?: string
          stripe_customer_id?: string
          stripe_payment_method_id?: string
          stripe_subscription_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "recurring_donations_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "donation_campaigns"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "recurring_donations_masjid_id_fkey"
            columns: ["masjid_id"]
            isOneToOne: false
            referencedRelation: "masjids"
            referencedColumns: ["id"]
          },
        ]
      }
      services: {
        Row: {
          description: string | null
          id: string
          name: string
        }
        Insert: {
          description?: string | null
          id?: string
          name: string
        }
        Update: {
          description?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      short_links: {
        Row: {
          clicks: number | null
          created_at: string | null
          id: string
          is_admin: boolean
          masjid_id: string | null
          original_url: string
          short_code: string
          type: Database["public"]["Enums"]["short_link_type"]
        }
        Insert: {
          clicks?: number | null
          created_at?: string | null
          id?: string
          is_admin?: boolean
          masjid_id?: string | null
          original_url: string
          short_code: string
          type?: Database["public"]["Enums"]["short_link_type"]
        }
        Update: {
          clicks?: number | null
          created_at?: string | null
          id?: string
          is_admin?: boolean
          masjid_id?: string | null
          original_url?: string
          short_code?: string
          type?: Database["public"]["Enums"]["short_link_type"]
        }
        Relationships: [
          {
            foreignKeyName: "short_links_masjid_id_fkey"
            columns: ["masjid_id"]
            isOneToOne: false
            referencedRelation: "masjids"
            referencedColumns: ["id"]
          },
        ]
      }
      subscription_features: {
        Row: {
          created_at: string | null
          feature_key: string
          id: string
          tier_id: string
          value: string
        }
        Insert: {
          created_at?: string | null
          feature_key: string
          id?: string
          tier_id: string
          value: string
        }
        Update: {
          created_at?: string | null
          feature_key?: string
          id?: string
          tier_id?: string
          value?: string
        }
        Relationships: [
          {
            foreignKeyName: "subscription_features_tier_id_fkey"
            columns: ["tier_id"]
            isOneToOne: false
            referencedRelation: "subscription_tiers"
            referencedColumns: ["id"]
          },
        ]
      }
      subscription_tiers: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          name: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      template_collections: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          image: string | null
          is_active: boolean | null
          name: string
          slug: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          image?: string | null
          is_active?: boolean | null
          name: string
          slug?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          image?: string | null
          is_active?: boolean | null
          name?: string
          slug?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      templates_creative: {
        Row: {
          collection_id: string
          created_at: string | null
          description: string | null
          id: string
          is_featured: boolean | null
          name: string
          preview_url: string | null
          tags: string[] | null
          template_url: string
          updated_at: string | null
        }
        Insert: {
          collection_id: string
          created_at?: string | null
          description?: string | null
          id?: string
          is_featured?: boolean | null
          name: string
          preview_url?: string | null
          tags?: string[] | null
          template_url: string
          updated_at?: string | null
        }
        Update: {
          collection_id?: string
          created_at?: string | null
          description?: string | null
          id?: string
          is_featured?: boolean | null
          name?: string
          preview_url?: string | null
          tags?: string[] | null
          template_url?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "creative_templates_collection_id_fkey"
            columns: ["collection_id"]
            isOneToOne: false
            referencedRelation: "template_collections"
            referencedColumns: ["id"]
          },
        ]
      }
      themes: {
        Row: {
          accent_color: string
          base_color: string
          created_at: string | null
          gradient_color: string
          id: string
          name: string | null
          updated_at: string | null
        }
        Insert: {
          accent_color: string
          base_color: string
          created_at?: string | null
          gradient_color: string
          id?: string
          name?: string | null
          updated_at?: string | null
        }
        Update: {
          accent_color?: string
          base_color?: string
          created_at?: string | null
          gradient_color?: string
          id?: string
          name?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      user_notification_preferences: {
        Row: {
          announcements: boolean | null
          anonymous_user_id: string
          created_at: string | null
          events: boolean | null
          id: string
          iqamah_time_changes: boolean | null
          masjid_id: string
          updated_at: string | null
        }
        Insert: {
          announcements?: boolean | null
          anonymous_user_id: string
          created_at?: string | null
          events?: boolean | null
          id?: string
          iqamah_time_changes?: boolean | null
          masjid_id: string
          updated_at?: string | null
        }
        Update: {
          announcements?: boolean | null
          anonymous_user_id?: string
          created_at?: string | null
          events?: boolean | null
          id?: string
          iqamah_time_changes?: boolean | null
          masjid_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "notification_preferences_anonymous_user_id_fkey"
            columns: ["anonymous_user_id"]
            isOneToOne: false
            referencedRelation: "anonymous_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notification_preferences_masjid_id_fkey"
            columns: ["masjid_id"]
            isOneToOne: false
            referencedRelation: "masjids"
            referencedColumns: ["id"]
          },
        ]
      }
      volunteers: {
        Row: {
          additional_notes: string | null
          areas_of_interest: Database["public"]["Enums"]["volunteer_interest"][]
          contact_details: string
          contact_method: Database["public"]["Enums"]["contact_method"]
          created_at: string | null
          id: string
          masjid_id: string
          name: string
          updated_at: string | null
        }
        Insert: {
          additional_notes?: string | null
          areas_of_interest: Database["public"]["Enums"]["volunteer_interest"][]
          contact_details: string
          contact_method: Database["public"]["Enums"]["contact_method"]
          created_at?: string | null
          id?: string
          masjid_id: string
          name: string
          updated_at?: string | null
        }
        Update: {
          additional_notes?: string | null
          areas_of_interest?: Database["public"]["Enums"]["volunteer_interest"][]
          contact_details?: string
          contact_method?: Database["public"]["Enums"]["contact_method"]
          created_at?: string | null
          id?: string
          masjid_id?: string
          name?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "volunteers_masjid_id_fkey"
            columns: ["masjid_id"]
            isOneToOne: false
            referencedRelation: "masjids"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      donations_public: {
        Row: {
          amount: number | null
          campaign_id: string | null
          created_at: string | null
          currency: string | null
          donor_first_name: string | null
          donor_last_name: string | null
          is_anonymous: boolean | null
        }
        Insert: {
          amount?: number | null
          campaign_id?: string | null
          created_at?: string | null
          currency?: string | null
          donor_first_name?: string | null
          donor_last_name?: string | null
          is_anonymous?: boolean | null
        }
        Update: {
          amount?: number | null
          campaign_id?: string | null
          created_at?: string | null
          currency?: string | null
          donor_first_name?: string | null
          donor_last_name?: string | null
          is_anonymous?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "donations_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "donation_campaigns"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          created_at: string | null
          email: string | null
          first_name: string | null
          id: string | null
          last_name: string | null
          masjid_id: string | null
          masjid_name: string | null
          type: string[] | null
          updated_at: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      search_masjids: {
        Args: { search: string }
        Returns: {
          active: boolean
          address_label: string
          bg_image: string | null
          city: string
          claimed: boolean
          contact_number: string | null
          country: Database["public"]["Enums"]["supported_country_name"]
          country_code: Database["public"]["Enums"]["supported_country_code"]
          created_at: string | null
          description: string | null
          email: string | null
          fts: unknown
          hijri_date_adjustment: number
          id: string
          local_currency: Database["public"]["Enums"]["supported_currency"]
          logo: string | null
          name: string
          postcode: string | null
          region: string | null
          slug: string
          state: string | null
          street: string | null
          subscription_id: string | null
          suburb: string | null
          theme_color_id: string | null
          updated_at: string | null
          verified: boolean
          website: string | null
        }[]
        SetofOptions: {
          from: "*"
          to: "masjids"
          isOneToOne: false
          isSetofReturn: true
        }
      }
      update_user_metadata: {
        Args: { metadata: Json; user_id: string }
        Returns: undefined
      }
    }
    Enums: {
      bank_account_status: "pending" | "active" | "disabled"
      calculation_method:
        | "MuslimWorldLeague"
        | "NorthAmerica"
        | "Egyptian"
        | "Karachi"
        | "UmmAlQura"
        | "Dubai"
        | "MoonsightingCommittee"
        | "Qatar"
        | "Kuwait"
        | "Singapore"
        | "Turkey"
        | "Tehran"
        | "Other"
      contact_method: "email" | "phone"
      donation_type: "one-off" | "recurring"
      event_status: "active" | "draft"
      event_type: "none" | "free" | "paid"
      high_latitude_rule:
        | "MiddleOfTheNight"
        | "SeventhOfTheNight"
        | "TwilightAngle"
      layout_type: "simple" | "advanced"
      madhab: "Shafi" | "Hanafi"
      recurring_donation_status: "active" | "paused" | "canceled"
      scheme_types:
        | "GIFT_AID"
        | "IRS_501C3"
        | "CRA_REGISTERED"
        | "ATO_DGR"
        | "IRD_DONEE"
      short_link_type:
        | "event"
        | "announcement"
        | "donation-campaign"
        | "masjid"
        | "simple-layout"
        | "advanced-layout"
        | "prayer-screen-1"
        | "prayer-screen-2"
        | "prayer-screen-3"
        | "prayer-screen-4"
        | "prayer-screen-5"
        | "other"
      status_type:
        | "pending"
        | "approved"
        | "rejected"
        | "payment_failed"
        | "paid"
        | "live"
        | "expired"
      subscription_status: "active" | "inactive" | "canceled"
      subscription_type: "starter" | "community" | "hub"
      supported_country_code: "US" | "GB" | "CA" | "AU" | "NZ"
      supported_country_name:
        | "United States"
        | "United Kingdom"
        | "Canada"
        | "Australia"
        | "New Zealand"
      supported_currency: "aud" | "nzd" | "gbp" | "usd" | "cad"
      time_format: "12" | "24"
      volunteer_interest:
        | "Cleaning"
        | "Event Setup"
        | "Food Service"
        | "Teaching"
        | "Fundraising"
        | "Other"
        | "IT/AV"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      bank_account_status: ["pending", "active", "disabled"],
      calculation_method: [
        "MuslimWorldLeague",
        "NorthAmerica",
        "Egyptian",
        "Karachi",
        "UmmAlQura",
        "Dubai",
        "MoonsightingCommittee",
        "Qatar",
        "Kuwait",
        "Singapore",
        "Turkey",
        "Tehran",
        "Other",
      ],
      contact_method: ["email", "phone"],
      donation_type: ["one-off", "recurring"],
      event_status: ["active", "draft"],
      event_type: ["none", "free", "paid"],
      high_latitude_rule: [
        "MiddleOfTheNight",
        "SeventhOfTheNight",
        "TwilightAngle",
      ],
      layout_type: ["simple", "advanced"],
      madhab: ["Shafi", "Hanafi"],
      recurring_donation_status: ["active", "paused", "canceled"],
      scheme_types: [
        "GIFT_AID",
        "IRS_501C3",
        "CRA_REGISTERED",
        "ATO_DGR",
        "IRD_DONEE",
      ],
      short_link_type: [
        "event",
        "announcement",
        "donation-campaign",
        "masjid",
        "simple-layout",
        "advanced-layout",
        "prayer-screen-1",
        "prayer-screen-2",
        "prayer-screen-3",
        "prayer-screen-4",
        "prayer-screen-5",
        "other",
      ],
      status_type: [
        "pending",
        "approved",
        "rejected",
        "payment_failed",
        "paid",
        "live",
        "expired",
      ],
      subscription_status: ["active", "inactive", "canceled"],
      subscription_type: ["starter", "community", "hub"],
      supported_country_code: ["US", "GB", "CA", "AU", "NZ"],
      supported_country_name: [
        "United States",
        "United Kingdom",
        "Canada",
        "Australia",
        "New Zealand",
      ],
      supported_currency: ["aud", "nzd", "gbp", "usd", "cad"],
      time_format: ["12", "24"],
      volunteer_interest: [
        "Cleaning",
        "Event Setup",
        "Food Service",
        "Teaching",
        "Fundraising",
        "Other",
        "IT/AV",
      ],
    },
  },
} as const
