'use client';

import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Wallet } from 'lucide-react';

export default function Header() {
  const { user } = useAuth();
  const { state } = useCart();

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-xl font-bold">
            INBites
          </Link>

          <nav className="flex items-center gap-6">
            <Link href="/menu" className="hover:text-primary">
              Menu
            </Link>
            {user ? (
              <>
                <Link href="/wallet" className="hover:text-primary">
                  <Wallet className="w-5 h-5" />
                </Link>
                <Link href="/cart" className="relative hover:text-primary">
                  <ShoppingCart className="w-5 h-5" />
                  {state.items.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground w-5 h-5 rounded-full text-xs flex items-center justify-center">
                      {state.items.length}
                    </span>
                  )}
                </Link>
                <Button
                  variant="outline"
                  onClick={() => supabase.auth.signOut()}
                >
                  Sign Out
                </Button>
              </>
            ) : (
              <Link href="/sign-in">
                <Button>Sign In</Button>
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
} 