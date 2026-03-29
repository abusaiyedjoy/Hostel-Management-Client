"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PlusIcon, SaveIcon } from "lucide-react";
import { SettingsSection } from "./settings-section";
import { SettingsField } from "./settings-field";
import { SaveButton } from "./save-button";
import { EditTierDialog } from "./edit-tier-dialog";

const tiers = [
  {
    name: "Silver",
    price: "$5.99",
    features: ["Bassic Listing", "Up to 5 photos", "Standard Support"],
  },
  {
    name: "Gold",
    price: "$5.99",
    features: ["Bassic Listing", "Up to 5 photos", "Standard Support"],
  },
  {
    name: "Platinum",
    price: "$5.99",
    features: ["Bassic Listing", "Up to 5 photos", "Standard Support"],
  },
];

export function BillingSubscriptionTab() {
  const [editingTier, setEditingTier] = useState<{
    name: string;
    price: string;
  } | null>(null);
  const { register } = useForm({
    defaultValues: { transactionFee: "2.9", fixedFee: "0.30" },
  });

  return (
    <div className="space-y-5">
      {/* Payment gateway */}
      <SettingsSection title="Payment Gateway Configuration">
        <div className="space-y-4">
          <SettingsField label="Primary Payment Provider" htmlFor="provider">
            <Select defaultValue="reviewhub">
              <SelectTrigger id="provider" className="bg-slate-50 w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="reviewhub">REVIEW HUB</SelectItem>
                <SelectItem value="stripe">Stripe</SelectItem>
                <SelectItem value="paypal">PayPal</SelectItem>
              </SelectContent>
            </Select>
          </SettingsField>
          <SettingsField label="Transaction fee (%)" htmlFor="transactionFee">
            <Input
              id="transactionFee"
              {...register("transactionFee")}
              className="bg-slate-50"
            />
          </SettingsField>
          <SettingsField label="Fixed fee feel ($)" htmlFor="fixedFee">
            <Input
              id="fixedFee"
              {...register("fixedFee")}
              className="bg-slate-50"
            />
          </SettingsField>
          <div className="flex justify-end">
            <Button className="bg-primary hover:bg-[#5B45D4] text-white gap-2 px-6 rounded-lg cursor-pointer">
              <SaveIcon className="size-4" />
              Save Changes
            </Button>
          </div>
        </div>
      </SettingsSection>

      {/* Subscription tiers */}
      <div className="rounded-xl border border-border bg-slate-50 p-5">
        <div className="flex justify-end mb-4">
          <Button className="bg-primary hover:bg-[#5B45D4] text-white gap-1.5 rounded-lg cursor-pointer">
            <PlusIcon className="size-4" />
            Add plan
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className="rounded-xl border border-[#C7C9E8] bg-gradient-to-r from-[#D8E1FF] to-[#FAF0FF] p-4 flex flex-col"
            >
              <p className="text-sm font-semibold text-foreground mb-1">
                {tier.name}
              </p>
              <div className="flex items-baseline gap-0.5 mb-3">
                <span className="text-2xl font-bold text-foreground">
                  {tier.price}
                </span>
                <span className="text-sm text-muted-foreground">/month</span>
              </div>
              <ul className="space-y-1 flex-1 mb-4">
                {tier.features.map((f) => (
                  <li
                    key={f}
                    className="text-xs text-muted-foreground flex items-center gap-1.5"
                  >
                    <span className="size-1 rounded-full bg-muted-foreground/60 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Button
                variant="outline"
                className="w-full border-primary text-primary hover:bg-primary hover:text-white transition-colors bg-white/60"
                onClick={() =>
                  setEditingTier({ name: tier.name, price: tier.price })
                }
              >
                Edit Tier
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Edit tier modal */}
      <EditTierDialog
        open={!!editingTier}
        onOpenChange={(open) => !open && setEditingTier(null)}
        tier={editingTier ?? undefined}
      />
    </div>
  );
}
