import { useQuery } from "@tanstack/react-query";
import StatsCard from "@/components/dashboard/StatsCard";
import { UserRound, ShoppingBag, ClipboardList, DollarSign } from "lucide-react";

type DashboardStats = {
  users: number;
  products: number;
  orders: number;
  revenue: number;
};

export default function Dashboard() {
  const { data: stats, isLoading } = useQuery<DashboardStats>({
    queryKey: ['/api/dashboard'],
  });

  return (
    <div>
      <div className="mb-8 hidden md:block">
        <h1 className="text-2xl font-bold text-neutral-800">Painel de Controle</h1>
        <p className="text-neutral-600 mt-1">Gerencie seus dados com operações CRUD completas</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatsCard 
          title="Usuários"
          value={stats?.users.toString() || "0"}
          icon={<UserRound />}
          color="blue"
          isLoading={isLoading}
        />
        <StatsCard
          title="Produtos"
          value={stats?.products.toString() || "0"}
          icon={<ShoppingBag />}
          color="green"
          isLoading={isLoading}
        />
        <StatsCard
          title="Pedidos"
          value={stats?.orders.toString() || "0"}
          icon={<ClipboardList />}
          color="purple"
          isLoading={isLoading}
        />
        <StatsCard
          title="Receita"
          value={`R$ ${stats?.revenue.toFixed(2).replace('.', ',') || "0,00"}`}
          icon={<DollarSign />}
          color="red"
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
