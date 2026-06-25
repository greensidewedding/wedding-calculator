import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase credentials are not configured');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Lead Management Functions
export const saveLead = async (leadData: any) => {
  try {
    const { data, error } = await supabase
      .from('leads')
      .insert([
        {
          bride_groom_name: leadData.brideGroomName,
          whatsapp_number: leadData.whatsappNumber,
          instagram: leadData.instagram || null,
          city: leadData.city,
          guest_count: leadData.guestCount,
          total_budget: leadData.totalBudget,
          calculator_data: leadData.calculatorData,
          submitted_at: new Date().toISOString(),
        },
      ])
      .select();

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('Error saving lead:', error);
    return { success: false, error };
  }
};

export const getLeads = async () => {
  try {
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .order('submitted_at', { ascending: false });

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('Error fetching leads:', error);
    return { success: false, error };
  }
};

export const searchLeads = async (query: string) => {
  try {
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .or(
        `bride_groom_name.ilike.%${query}%,whatsapp_number.ilike.%${query}%,city.ilike.%${query}%`
      )
      .order('submitted_at', { ascending: false });

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('Error searching leads:', error);
    return { success: false, error };
  }
};

export const filterLeads = async (filters: {
  city?: string;
  minBudget?: number;
  maxBudget?: number;
  startDate?: string;
  endDate?: string;
}) => {
  try {
    let query = supabase.from('leads').select('*');

    if (filters.city) {
      query = query.ilike('city', `%${filters.city}%`);
    }
    if (filters.minBudget) {
      query = query.gte('total_budget', filters.minBudget);
    }
    if (filters.maxBudget) {
      query = query.lte('total_budget', filters.maxBudget);
    }
    if (filters.startDate) {
      query = query.gte('submitted_at', filters.startDate);
    }
    if (filters.endDate) {
      query = query.lte('submitted_at', filters.endDate);
    }

    const { data, error } = await query.order('submitted_at', { ascending: false });

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('Error filtering leads:', error);
    return { success: false, error };
  }
};
