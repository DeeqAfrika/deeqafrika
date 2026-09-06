import {
  ArrowDownToLine,
  ArrowRight,
  BarChart3,
  Building2,
  ClipboardCheck,
  Flag,
  Globe2,
  HeartHandshake,
  MapPinned,
  Network,
  ShieldCheck,
  Sparkles,
  Target,
  Trophy,
  TrendingUp,
  UsersRound,
  Volleyball,
} from "lucide-react";

const icons = {
  arrow: ArrowRight,
  building: Building2,
  chart: BarChart3,
  clipboard: ClipboardCheck,
  download: ArrowDownToLine,
  flag: Flag,
  globe: Globe2,
  growth: TrendingUp,
  heart: HeartHandshake,
  map: MapPinned,
  network: Network,
  shield: ShieldCheck,
  spark: Sparkles,
  target: Target,
  trophy: Trophy,
  users: UsersRound,
  whistle: Volleyball,
};

export function CampaignIcon({
  name,
  size = 22,
  strokeWidth = 1.8,
}: {
  name: string;
  size?: number;
  strokeWidth?: number;
}) {
  const Icon = icons[name as keyof typeof icons] ?? Sparkles;
  return <Icon aria-hidden="true" size={size} strokeWidth={strokeWidth} />;
}
