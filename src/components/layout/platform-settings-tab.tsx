"use client";

import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SettingsSection } from "./settings-section";
import { SettingsField } from "./settings-field";
import { ToggleRow } from "./toggle-row";
import { SaveButton } from "./save-button";

export function PlatformSettingsTab() {
  const { register } = useForm({
    defaultValues: { platformName: "REVIEW HUB", minReviewLength: "50" },
  });

  return (
    <div className="space-y-5">
      {/* General platform settings */}
      <SettingsSection title="General Platform settings">
        <div className="space-y-4">
          <SettingsField label="Platform Name" htmlFor="platformName">
            <Input
              id="platformName"
              {...register("platformName")}
              className="bg-slate-50"
            />
          </SettingsField>
          <SettingsField label="Platform Name" htmlFor="platformType">
            <Select defaultValue="general">
              <SelectTrigger id="platformType" className="bg-slate-50 w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="general">
                  General Platform settings
                </SelectItem>
                <SelectItem value="business">Business Platform</SelectItem>
                <SelectItem value="review">Review Platform</SelectItem>
              </SelectContent>
            </Select>
          </SettingsField>

          <SettingsField label="Time Zone" htmlFor="timezone">
            <Select defaultValue="utc">
              <SelectTrigger id="timezone" className="bg-slate-50 w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="utc">UTC</SelectItem>
                <SelectItem value="est">EST (UTC-5)</SelectItem>
                <SelectItem value="pst">PST (UTC-8)</SelectItem>
                <SelectItem value="gmt">GMT</SelectItem>
                <SelectItem value="ist">IST (UTC+5:30)</SelectItem>
              </SelectContent>
            </Select>
          </SettingsField>
        </div>
      </SettingsSection>

      {/* Review settings */}
      <SettingsSection title="General Platform settings">
        <div>
          <ToggleRow
            id="allow-review"
            label="Allow notification review"
            description="User can leave reviews without creating an account"
            defaultChecked={true}
          />
          <ToggleRow
            id="photo-required"
            label="Allow notification review"
            description="Users must upload a photo to prove visit"
            defaultChecked={false}
          />
          <div className="pt-3">
            <SettingsField
              label="Minimum review length (character)"
              htmlFor="minReviewLength"
            >
              <Input
                id="minReviewLength"
                {...register("minReviewLength")}
                className="bg-slate-50"
              />
            </SettingsField>
          </div>
        </div>
      </SettingsSection>

      <SaveButton />
    </div>
  );
}
