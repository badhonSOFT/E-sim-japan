import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

interface Plan {
  id: string;
  name: string;
  data: string;
  validity: number;
  price: number;
  networks?: string;
}

export const usePlans = () => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlans = async () => {
      const { data, error } = await supabase
        .from('limited_data_plans')
        .select('*');
      
      if (data && !error) {
        const formattedPlans = data.map(plan => ({
          id: plan.id,
          name: plan.name,
          data: plan.data,
          validity: plan.validity,
          price: plan.price,
          networks: 'KDDI, NTT Docomo'
        }));
        setPlans(formattedPlans);
      }
      setLoading(false);
    };

    fetchPlans();
  }, []);

  return { plans, loading };
};