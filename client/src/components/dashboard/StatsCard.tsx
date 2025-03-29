import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

type ColorType = "blue" | "green" | "purple" | "red";

interface StatsCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  color: ColorType;
  isLoading?: boolean;
}

const colorVariants: Record<ColorType, string> = {
  blue: "bg-blue-100 text-blue-600",
  green: "bg-green-100 text-green-600",
  purple: "bg-purple-100 text-purple-600",
  red: "bg-red-100 text-red-600",
};

export default function StatsCard({ title, value, icon, color, isLoading = false }: StatsCardProps) {
  return (
    <div className="bg-white p-5 rounded-lg shadow-sm border border-neutral-200">
      <div className="flex items-center">
        <div className={cn("p-3 rounded-full", colorVariants[color])}>
          {icon}
        </div>
        <div className="ml-4">
          <h2 className="text-sm font-medium text-neutral-500">{title}</h2>
          {isLoading ? (
            <Skeleton className="h-6 w-24 mt-1" />
          ) : (
            <p className="text-xl font-semibold text-neutral-800">{value}</p>
          )}
        </div>
      </div>
    </div>
  );
}
