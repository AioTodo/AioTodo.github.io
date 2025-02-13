import { useCallback } from 'react'
import { supabase } from '@/lib/supabase/client'

export function useDatabase() {
  const getCategories = useCallback(async () => {
    console.log('Calling getCategories...');
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name');
      
      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }

      console.log('Categories data:', data);
      return data;
    } catch (error) {
      console.error('Failed to fetch categories:', error);
      throw error;
    }
  }, []);

  const getMeals = useCallback(async (categoryId?: string) => {
    console.log('Calling getMeals with categoryId:', categoryId);
    try {
      let query = supabase
        .from('meals')
        .select(`
          *,
          categories (
            id,
            name,
            description,
            image_url,
            slug
          )
        `)
        .eq('is_available', true);
      
      if (categoryId) {
        query = query.eq('category_id', categoryId);
      }
      
      const { data, error } = await query.order('name');
      
      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }

      console.log('Meals data:', data);
      return data;
    } catch (error) {
      console.error('Failed to fetch meals:', error);
      throw error;
    }
  }, []);

  return {
    getCategories,
    getMeals,
  };
} 