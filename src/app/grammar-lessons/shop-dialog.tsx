
'use client';

import { useState, useEffect, useRef } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Heart, Gem } from 'lucide-react';
import { useGlobalState } from '@/hooks/use-global-state';
import { useUserStats } from '@/hooks/use-user-stats';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { Howl } from 'howler';

interface ShopDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onHeartsChange?: (hearts: number) => void;
  onDiamondsChange?: (diamonds: number) => void;
}

const shopItems = [
  { hearts: 1, cost: 100 },
  { hearts: 2, cost: 150 },
  { hearts: 3, cost: 250 },
  { hearts: 4, cost: 300 },
  { hearts: 5, cost: 400 },
];

export function ShopDialog({ isOpen, onOpenChange, onHeartsChange, onDiamondsChange }: ShopDialogProps) {
  const { purchaseHearts } = useGlobalState();
  const { diamonds, hearts, loading: statsLoading } = useUserStats();
  const { toast } = useToast();

  // Local state for immediate UI updates
  const [localDiamonds, setLocalDiamonds] = useState(diamonds);
  const [localHearts, setLocalHearts] = useState(hearts);
  const [isPurchasing, setIsPurchasing] = useState(false);

  // Sync local state with database values
  useEffect(() => {
    setLocalDiamonds(diamonds);
    setLocalHearts(hearts);
  }, [diamonds, hearts]);

  const buySoundRef = useRef<Howl | null>(null);

  useEffect(() => {
    buySoundRef.current = new Howl({ src: ['/sounds/buy.mp3'], volume: 0.7 });
    return () => {
      buySoundRef.current?.unload();
    }
  }, []);

  const handlePurchase = async (heartsToBuy: number, cost: number) => {
    if (statsLoading || isPurchasing) {
      toast({
        title: 'Please wait',
        description: 'Loading user stats or purchase in progress...',
        variant: 'destructive',
      });
      return;
    }

    // Check if user can afford and hearts aren't full
    if (localDiamonds < cost) {
      toast({
        title: 'Insufficient Diamonds',
        description: `You need ${cost} diamonds but only have ${localDiamonds}.`,
        variant: 'destructive',
      });
      return;
    }

    if (localHearts >= 5) {
      toast({
        title: 'Hearts Already Full',
        description: 'Your hearts are already at maximum capacity.',
        variant: 'destructive',
      });
      return;
    }

    setIsPurchasing(true);

    try {
      // Immediately update UI for smooth experience
      const newHearts = Math.min(5, localHearts + heartsToBuy);
      const newDiamonds = localDiamonds - cost;

      setLocalHearts(newHearts);
      setLocalDiamonds(newDiamonds);

      // Update parent component's local state immediately
      onHeartsChange?.(newHearts);
      onDiamondsChange?.(newDiamonds);

      // Play sound immediately
      buySoundRef.current?.play();

      // Update database
      const success = await purchaseHearts(heartsToBuy, cost);

      if (success) {
        toast({
          title: 'Purchase Successful!',
          description: `You bought ${heartsToBuy} heart(s) for ${cost} diamonds.`,
        });
        onOpenChange(false);
      } else {
        // Revert UI if database update failed
        setLocalHearts(hearts);
        setLocalDiamonds(diamonds);
        onHeartsChange?.(hearts);
        onDiamondsChange?.(diamonds);
        toast({
          title: 'Purchase Failed',
          description: 'Failed to update database. Please try again.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      // Revert UI on error
      setLocalHearts(hearts);
      setLocalDiamonds(diamonds);
      onHeartsChange?.(hearts);
      onDiamondsChange?.(diamonds);
      toast({
        title: 'Purchase Failed',
        description: 'An error occurred. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsPurchasing(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Heart Shop</DialogTitle>
          <DialogDescription>
            Out of lives? Refill your hearts with diamonds to keep learning!
            You currently have {statsLoading ? '...' : localDiamonds} diamonds.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 space-y-3">
          {shopItems.map((item) => {
            const canAfford = localDiamonds >= item.cost;
            const isFull = localHearts >= 5;
            const isDisabled = !canAfford || isFull || statsLoading || isPurchasing;

            return (
              <div
                key={item.hearts}
                className={cn(
                  'flex items-center justify-between rounded-lg border p-4',
                  isDisabled && 'bg-muted/50 text-muted-foreground'
                )}
              >
                <div className="flex flex-col">
                  <div className="flex items-center gap-2 font-bold">
                    <Heart className="h-5 w-5 text-red-500 fill-red-500" />
                    <span>
                      Refill {item.hearts} Heart{item.hearts > 1 ? 's' : ''}
                    </span>
                  </div>
                  {isFull && !isDisabled && <p className="text-xs text-muted-foreground">Your hearts are already full.</p>}
                  {statsLoading && <p className="text-xs text-muted-foreground">Loading...</p>}
                  {isPurchasing && <p className="text-xs text-muted-foreground">Processing...</p>}
                </div>
                <Button
                  onClick={() => handlePurchase(item.hearts, item.cost)}
                  disabled={isDisabled}
                  size="sm"
                >
                  <Gem className="mr-2 h-4 w-4" />
                  {item.cost}
                </Button>
              </div>
            );
          })}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
