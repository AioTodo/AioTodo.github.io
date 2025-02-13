'use client';

import { useEffect, useState } from 'react';
import { useDatabase } from '@/lib/hooks/useDatabase';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import Image from 'next/image';

interface Category {
  id: string;
  name: string;
  description: string | null;
  image_url: string | null;
  slug: string;
}

interface Meal {
  id: string;
  name: string;
  description: string | null;
  price: number;
  image_url: string | null;
  is_available: boolean;
  category: Category;
}

export default function MenuPage() {
  const { getCategories, getMeals } = useDatabase();
  const { dispatch } = useCart();
  const [categories, setCategories] = useState<Category[]>([]);
  const [meals, setMeals] = useState<Meal[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        console.log('Fetching categories...');
        const categoriesData = await getCategories();
        console.log('Categories received:', categoriesData);
        setCategories(categoriesData);

        // Find the category ID based on selected name
        const selectedCategoryId = selectedCategory 
          ? categoriesData.find(cat => cat.name === selectedCategory)?.id 
          : undefined;

        console.log('Fetching meals with category:', selectedCategoryId);
        const mealsData = await getMeals(selectedCategoryId);
        console.log('Meals received:', mealsData);
        setMeals(mealsData);
      } catch (error) {
        console.error('Error loading menu data:', error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [getCategories, getMeals, selectedCategory]);

  const addToCart = (meal: Meal) => {
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        id: meal.id,
        name: meal.name,
        price: meal.price,
        quantity: 1,
        image_url: meal.image_url,
      },
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading menu...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Our Menu</h1>
      
      {/* Categories */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Categories</h2>
        <div className="flex gap-4 overflow-x-auto pb-4">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-4 py-2 rounded-md ${
              !selectedCategory ? 'bg-primary text-white' : 'bg-secondary'
            }`}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.name)}
              className={`px-4 py-2 rounded-md ${
                selectedCategory === category.name ? 'bg-primary text-white' : 'bg-secondary'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Debug info */}
      {process.env.NODE_ENV === 'development' && (
        <div className="mb-4 p-4 bg-gray-100 rounded">
          <p>Categories count: {categories.length}</p>
          <p>Meals count: {meals.length}</p>
          <p>Selected category: {selectedCategory || 'All'}</p>
        </div>
      )}

      {/* Meals */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {meals.map((meal) => (
          <div
            key={meal.id}
            className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
          >
            {meal.image_url && (
              <div className="aspect-video relative">
                <img
                  src={meal.image_url}
                  alt={meal.name}
                  className="object-cover w-full h-full"
                />
              </div>
            )}
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-2">{meal.name}</h3>
              {meal.description && (
                <p className="text-muted-foreground text-sm mb-3">
                  {meal.description}
                </p>
              )}
              <div className="flex items-center justify-between">
                <span className="font-medium">
                  DH{meal.price.toFixed(2)}
                </span>
                <button
                  className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm"
                  onClick={() => addToCart(meal)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {meals.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          No meals available in this category.
        </div>
      )}
    </div>
  );
} 