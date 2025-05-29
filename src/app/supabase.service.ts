import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://otaedzxedjzadltjtvzu.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im90YWVkenhlZGp6YWRsdGp0dnp1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzkwNTA1NDUsImV4cCI6MjA1NDYyNjU0NX0.mPZLDBWtfzcq-rEatzAlzWGrwggABZlmLP4EyL1VfZ4';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
  }

  async loginUser(email: string, password: string) {
  const { data, error } = await this.supabase
    .from('Users')        
    .select('*')
    .eq('email', email)
    .eq('password', password)   
    .single();                  

  return { data, error };
}


    async registerUser(name: string, email: string, password: string) {
    const { data, error } = await this.supabase
        .from('Users')
        .insert([{ name, email, password }]);
    return { data, error };
    }

    async getProperties() {
    const { data, error } = await this.supabase
        .from('Property')
        .select('*');

    return { data, error };
    }

    async getFeedbackByProperty(propertyId: number) {
  const { data, error } = await this.supabase
    .from('Feedback')
    .select('comment, rating')
    .eq('id_property', propertyId);
  return { data, error };
}

    async getPropertyById(id: number) {
  const { data, error } = await this.supabase
    .from('Property')
    .select('*')
    .eq('id', id)
    .single();

  return { data, error };
}

async createFeedback(
  propertyId: number,
  comment: string,
  rating: number
) {
  const { data, error } = await this.supabase
    .from('Feedback')
    .insert([{
      id_property: propertyId,
      comment,
      rating
    }]);
  return { data, error };
}

async createBooking(user_id: number, property_id: number) {
  const { data, error } = await this.supabase
    .from('Bookings')
    .insert([{ user_id, property_id }]);

  return { data, error };
}

async getBookingsByUser(userId: number) {
  const { data, error } = await this.supabase
    .from('Bookings')
    .select(`
      *,
      Property ( name, Img, latitude, longitude )
    `)
    .eq('user_id', userId);

  return { data, error };
}


  getUser() {
    return this.supabase.auth.getUser();
  }

  logout() {
    return this.supabase.auth.signOut();
  }
}
