import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

interface Plan {
  id: string;
  name: string;
  data: string;
  validity: number;
  price: number;
  networks?: string;
  type?: 'limited' | 'unlimited';
}

export const usePlans = (planType: 'limited' | 'unlimited' = 'limited', country?: string) => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const tableName = planType === 'limited' ? 'limited_data_plans' : 'unlimited_data_plans';
        console.log('Fetching from table:', tableName, country ? `for country: ${country}` : '');
        
        let query = supabase.from(tableName).select('*');
        
        if (country) {
          query = query.eq('destination', country);
        }
        
        const { data, error } = await query;
        
        console.log('Supabase response:', { data, error });
        
        // Debug: Show all destinations in unlimited table
        if (tableName === 'unlimited_data_plans' && data) {
          const destinations = data.map(plan => plan.destination);
          console.log('Available destinations in unlimited table:', [...new Set(destinations)]);
        }
        
        if (error) {
          console.error('Supabase error:', error);
          setPlans([]);
        } else if (data) {
          const formattedPlans = data.map(plan => ({
            id: plan.id,
            name: plan.name,
            data: plan.data,
            validity: plan.validity,
            price: plan.price,
            networks: 'KDDI, NTT Docomo',
            type: planType
          }));
          console.log('Formatted plans:', formattedPlans);
          setPlans(formattedPlans);
        } else {
          setPlans([]);
        }
      } catch (err) {
        console.error('Fetch error:', err);
        setPlans([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, [planType, country]);

  return { plans, loading };
};