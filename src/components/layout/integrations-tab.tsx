"use client";

import { SettingsSection } from "./settings-section";
import { SaveButton } from "./save-button";
import { Input } from "@/components/ui/input";
import { SettingsField } from "./settings-field";

export function IntegrationsTab() {
  return (
    <div className="space-y-5">
      <SettingsSection title="Third-party Integrations">
        <div className="space-y-4">
          <SettingsField label="Google Maps API Key" htmlFor="googleMaps">
            <Input
              id="googleMaps"
              placeholder="Enter API key"
              className="bg-slate-50"
            />
          </SettingsField>
          <SettingsField label="Stripe API Key" htmlFor="stripe">
            <Input
              id="stripe"
              placeholder="Enter API key"
              className="bg-slate-50"
            />
          </SettingsField>
          <SettingsField label="Sendgrid API Key" htmlFor="sendgrid">
            <Input
              id="sendgrid"
              placeholder="Enter API key"
              className="bg-slate-50"
            />
          </SettingsField>
        </div>
      </SettingsSection>
      <SaveButton />
    </div>
  );
}
