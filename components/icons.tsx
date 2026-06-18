import {
  Leaf,
  Snowflake,
  Dumbbell,
  Sparkles,
  ShieldCheck,
  Zap,
  Droplets,
  Heart,
  Flame,
  type LucideIcon,
} from "lucide-react";
import type { IconKey } from "@/lib/content";

export const iconMap: Record<IconKey, LucideIcon> = {
  leaf: Leaf,
  snowflake: Snowflake,
  dumbbell: Dumbbell,
  sparkles: Sparkles,
  shield: ShieldCheck,
  zap: Zap,
  droplets: Droplets,
  heart: Heart,
  flame: Flame,
};
