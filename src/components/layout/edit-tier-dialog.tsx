"use client";

import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { SaveIcon } from "lucide-react";
import { SettingsField } from "./settings-field";

interface EditTierDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tier?: { name: string; price: string };
}

export function EditTierDialog({
  open,
  onOpenChange,
  tier,
}: EditTierDialogProps) {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      planName: tier?.name ?? "Gold",
      price: tier?.price ?? "$49.99",
      features: "",
    },
  });

  const onSubmit = (data: unknown) => {
    console.log(data);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            Profile Settings
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            Modify the details of the subscription plan below.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-1">
          <SettingsField label="Plan Name" htmlFor="planName">
            <Input
              id="planName"
              {...register("planName")}
              className="bg-slate-50"
            />
          </SettingsField>
          <SettingsField label="Price" htmlFor="price">
            <Input id="price" {...register("price")} className="bg-slate-50" />
          </SettingsField>
          <SettingsField label="Features" htmlFor="features">
            <Textarea
              id="features"
              placeholder="Describe the plan features"
              rows={4}
              {...register("features")}
              className="bg-slate-50 resize-none"
            />
          </SettingsField>

          <div className="flex justify-end gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="px-6"
            >
              cancel
            </Button>
            <Button
              type="submit"
              className="bg-primary hover:bg-[#5B45D4] text-white gap-2 px-6"
            >
              <SaveIcon className="size-4" />
              Save Changes
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
