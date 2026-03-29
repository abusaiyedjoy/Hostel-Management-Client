"use client";

import { SettingsSection } from "./settings-section";
import { ToggleRow } from "./toggle-row";
import { SaveButton } from "./save-button";

export function NotificationTab() {
  return (
    <div className="space-y-5">
      <SettingsSection title="General Platform settings">
        <div>
          <ToggleRow
            id="new-user-registration"
            label="New User Registration"
            description="Notify when  new user sign up"
            defaultChecked={true}
          />
          <ToggleRow
            id="business-claim"
            label="Business claim request"
            description="Alert when business request ownership"
            defaultChecked={false}
          />
        </div>
      </SettingsSection>
      <SaveButton />
    </div>
  );
}
