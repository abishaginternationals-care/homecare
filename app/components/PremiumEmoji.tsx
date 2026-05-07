"use client";

import {
  Phone,
  MapPin,
  Mail,
  ShieldCheck,
  Sparkles,
  MessageCircle,
  UserCheck,
  Pill,
  Hospital,
  Star,
  ClipboardCheck,
  HeartHandshake,
  Stethoscope,
  Ambulance,
  Home,
  Clock,
  Award,
  CheckCircle2,
} from "lucide-react";

const iconMap: Record<string, any> = {
  // Healthcare
  care: HeartHandshake,
  doctor: UserCheck,
  medicine: Pill,
  hospital: Hospital,
  stethoscope: Stethoscope,
  ambulance: Ambulance,
  activity: UserCheck,

  // Contact
  phone: Phone,
  location: MapPin,
  mail: Mail,

  // Features
  trust: ShieldCheck,
  highlight: Sparkles,
  rating: Star,
  clipboard: ClipboardCheck,
  heart: HeartHandshake,
  home: Home,
  clock: Clock,
  award: Award,
  check: CheckCircle2,

  // Actions
  chat: MessageCircle,
};

export default function PremiumEmoji({
  name,
  className = "",
  color = "#6AB04C",
  size = "md",
}: {
  name: string;
  className?: string;
  color?: string;
  size?: "sm" | "md" | "lg";
}) {
  const Icon = iconMap[name];

  if (!Icon) return null;

  const sizeMap = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  const paddingMap = {
    sm: "p-1.5",
    md: "p-2",
    lg: "p-3",
  };

  return (
    <span
      className={`inline-flex items-center justify-center rounded-xl 
      shadow-sm transition-all duration-300 hover:scale-110 hover:shadow-md 
      ${paddingMap[size]} ${className}`}
      style={{
        background: `${color}18`,
        color: color,
      }}
    >
      <Icon className={sizeMap[size]} />
    </span>
  );
}
