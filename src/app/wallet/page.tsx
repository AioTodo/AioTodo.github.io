'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface WalletData {
  id: string;
  balance: number;
  last_updated: string;
}

export default function WalletPage() {
  const { user } = useAuth();
  const [wallet, setWallet] = useState<WalletData | null>(null);
  const [loading, setLoading] = useState(true);
  const [amount, setAmount] = useState('');
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    async function loadWallet() {
      if (!user) return;

      try {
        const { data, error } = await supabase
          .from('wallets')
          .select('*')
          .eq('user_id', user.id)
          .single();

        if (error) throw error;
        setWallet(data);
      } catch (error) {
        console.error('Error loading wallet:', error);
      } finally {
        setLoading(false);
      }
    }

    loadWallet();
  }, [user]);

  const handleTopUp = async () => {
    if (!user || !wallet || processing) return;

    setProcessing(true);
    try {
      const amountNum = parseFloat(amount);
      if (isNaN(amountNum) || amountNum <= 0) {
        throw new Error('Invalid amount');
      }

      const { data, error } = await supabase
        .from('wallets')
        .update({
          balance: wallet.balance + amountNum,
          last_updated: new Date().toISOString(),
        })
        .eq('id', wallet.id)
        .select()
        .single();

      if (error) throw error;
      setWallet(data);
      setAmount('');
      alert('Wallet topped up successfully!');
    } catch (error) {
      console.error('Error topping up wallet:', error);
      alert('Failed to top up wallet. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading wallet...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Wallet</h1>
        <p className="text-muted-foreground">Please sign in to access your wallet.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">Your Wallet</h1>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="bg-secondary p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Balance</h2>
          <p className="text-3xl font-bold">
            ${wallet?.balance.toFixed(2) || '0.00'}
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Last updated: {wallet?.last_updated ? new Date(wallet.last_updated).toLocaleString() : 'Never'}
          </p>
        </div>

        <div className="bg-card p-6 rounded-lg border">
          <h2 className="text-xl font-semibold mb-4">Top Up Wallet</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Amount ($)
              </label>
              <Input
                type="number"
                min="0"
                step="0.01"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
              />
            </div>
            <Button
              onClick={handleTopUp}
              disabled={processing || !amount}
              className="w-full"
            >
              {processing ? 'Processing...' : 'Top Up'}
            </Button>
          </div>
        </div>

        <div className="md:col-span-2">
          <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
          {/* Transaction history will be implemented later */}
          <p className="text-muted-foreground">
            Transaction history coming soon...
          </p>
        </div>
      </div>
    </div>
  );
} 