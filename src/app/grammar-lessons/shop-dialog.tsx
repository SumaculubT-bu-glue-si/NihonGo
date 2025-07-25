
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
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { Howl } from 'howler';

interface ShopDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

const shopItems = [
  { hearts: 1, cost: 100 },
  { hearts: 2, cost: 150 },
  { hearts: 3, cost: 250 },
  { hearts: 4, cost: 300 },
  { hearts: 5, cost: 400 },
];

export function ShopDialog({ isOpen, onOpenChange }: ShopDialogProps) {
  const { appData, purchaseHearts } = useGlobalState();
  const { toast } = useToast();
  const { diamonds, hearts } = appData;

  const buySoundRef = useRef<Howl | null>(null);

  useEffect(() => {
    buySoundRef.current = new Howl({ src: ['/sounds/buy.mp3'], volume: 0.7 });
    return () => {
      buySoundRef.current?.unload();
    }
  }, []);

  const handlePurchase = (heartsToBuy: number, cost: number) => {
    const success = purchaseHearts(heartsToBuy, cost);
    if (success) {
      buySoundRef.current?.play();
      toast({
        title: 'Purchase Successful!',
        description: `You bought ${heartsToBuy} heart(s) for ${cost} diamonds.`,
      });
      onOpenChange(false);
    } else {
      toast({
        title: 'Purchase Failed',
        description: "You don't have enough diamonds.",
        variant: 'destructive',
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Heart Shop</DialogTitle>
          <DialogDescription>
            Out of lives? Refill your hearts with diamonds to keep learning!
            You currently have {diamonds} diamonds.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 space-y-3">
          {shopItems.map((item) => {
            const canAfford = diamonds >= item.cost;
            const isFull = hearts >= 5;
            const isDisabled = !canAfford || isFull;

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
