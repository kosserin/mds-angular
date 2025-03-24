import { StatusFieldStyle } from "../models/status-field-style.model";

export const STATUS_FIELD_STYLES: Record<string, StatusFieldStyle> = {
  grey: {
    backgroundColor: "var(--background-primary)",
    textColor: "var(--text-primary)",
    iconSrc: "assets/icons/black-chevron-down-24x24.svg",
  },
  green: {
    backgroundColor: "var(--success-color)",
    textColor: "var(--white)",
    iconSrc: "assets/icons/white-chevron-down-24x24.svg",
  },
  blue: {
    backgroundColor: "var(--accent-color)",
    textColor: "var(--white)",
    iconSrc: "assets/icons/white-chevron-down-24x24.svg",
  },
};
