import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { Product } from "@shared/schema";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Search } from "lucide-react";
import ProductTable from "@/components/products/ProductTable";
import ProductForm from "@/components/products/ProductForm";
import DeleteProductDialog from "@/components/products/DeleteProductDialog";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function Products() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deletingProduct, setDeletingProduct] = useState<Product | null>(null);
  const { toast } = useToast();

  const { data: products = [], isLoading } = useQuery<Product[]>({
    queryKey: ['/api/products'],
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest('DELETE', `/api/products/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/products'] });
      queryClient.invalidateQueries({ queryKey: ['/api/dashboard'] });
      toast({
        title: "Produto excluído",
        description: "O produto foi excluído com sucesso.",
        variant: "default",
      });
      setDeletingProduct(null);
    },
    onError: (error) => {
      toast({
        title: "Erro",
        description: `Erro ao excluir produto: ${error.message}`,
        variant: "destructive",
      });
    }
  });

  const filteredProducts = searchQuery
    ? products.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : products;

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setShowAddModal(true);
  };

  const handleDelete = (product: Product) => {
    setDeletingProduct(product);
  };

  const confirmDelete = () => {
    if (deletingProduct) {
      deleteMutation.mutate(deletingProduct.id);
    }
  };

  return (
    <div>
      <div className="mt-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <h2 className="text-xl font-bold text-neutral-800">Produtos</h2>
          <div className="mt-3 sm:mt-0 flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
            <div className="relative flex-1 sm:min-w-72">
              <Input
                type="text"
                placeholder="Pesquisar produtos..."
                className="pl-10 pr-4 py-2"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-neutral-400" />
              </div>
            </div>
            <Button 
              onClick={() => {
                setEditingProduct(null);
                setShowAddModal(true);
              }}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="h-5 w-5 mr-1.5" />
              Novo Produto
            </Button>
          </div>
        </div>

        <ProductTable 
          products={filteredProducts}
          isLoading={isLoading}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>

      {showAddModal && (
        <ProductForm 
          product={editingProduct}
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
        />
      )}

      {deletingProduct && (
        <DeleteProductDialog
          isOpen={Boolean(deletingProduct)}
          product={deletingProduct}
          isDeleting={deleteMutation.isPending}
          onConfirm={confirmDelete}
          onCancel={() => setDeletingProduct(null)}
        />
      )}
    </div>
  );
}
