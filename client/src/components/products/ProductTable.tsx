import { Product } from "@shared/schema";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface ProductTableProps {
  products: Product[];
  isLoading: boolean;
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
}

export default function ProductTable({ products, isLoading, onEdit, onDelete }: ProductTableProps) {
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "low":
        return "bg-yellow-100 text-yellow-800";
      case "out_of_stock":
        return "bg-red-100 text-red-800";
      default:
        return "bg-neutral-100 text-neutral-800";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "Ativo";
      case "low":
        return "Baixo estoque";
      case "out_of_stock":
        return "Sem estoque";
      default:
        return "Desconhecido";
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white shadow-sm rounded-lg overflow-hidden border border-neutral-200">
        <div className="p-6 space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center space-x-4">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-40" />
                <Skeleton className="h-4 w-24" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-sm rounded-lg overflow-hidden border border-neutral-200">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-neutral-200">
          <thead className="bg-neutral-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Produto</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Categoria</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Preço</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Estoque</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Status</th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-neutral-500 uppercase tracking-wider">Ações</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-neutral-200">
            {products.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-4 text-center text-sm text-neutral-500">
                  Nenhum produto encontrado
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <tr key={product.id} className="hover:bg-neutral-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0">
                        {product.image ? (
                          <img className="h-10 w-10 rounded-full object-cover" src={product.image} alt={product.name} />
                        ) : (
                          <div className="h-10 w-10 rounded-full bg-neutral-200 flex items-center justify-center">
                            <span className="text-neutral-500 text-xs">{product.name.substring(0, 2).toUpperCase()}</span>
                          </div>
                        )}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-neutral-900">{product.name}</div>
                        <div className="text-sm text-neutral-500">SKU: {product.sku}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-neutral-900">{product.category}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-neutral-900">R$ {product.price.toFixed(2).replace('.', ',')}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-neutral-900">{product.stock}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={cn(
                      "px-2 inline-flex text-xs leading-5 font-semibold rounded-full",
                      getStatusBadgeClass(product.status)
                    )}>
                      {getStatusText(product.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <Button variant="ghost" size="icon" className="text-blue-600 hover:text-blue-900">
                        <Eye className="h-5 w-5" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-indigo-600 hover:text-indigo-900" onClick={() => onEdit(product)}>
                        <Pencil className="h-5 w-5" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-red-600 hover:text-red-900" onClick={() => onDelete(product)}>
                        <Trash2 className="h-5 w-5" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="bg-white px-4 py-3 border-t border-neutral-200 sm:px-6">
        <div className="flex items-center justify-between">
          <div className="flex-1 flex justify-between sm:hidden">
            <Button variant="outline" size="sm" disabled>
              Anterior
            </Button>
            <Button variant="outline" size="sm" disabled>
              Próximo
            </Button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-neutral-700">
                Mostrando <span className="font-medium">1</span> a <span className="font-medium">{products.length}</span> de <span className="font-medium">{products.length}</span> resultados
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <Button
                  variant="outline"
                  className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-neutral-300 bg-white text-sm font-medium text-neutral-500"
                  disabled
                >
                  <span className="sr-only">Anterior</span>
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </Button>
                <Button
                  variant="outline"
                  className="relative inline-flex items-center px-4 py-2 border border-neutral-300 bg-white text-sm font-medium text-neutral-700"
                >
                  1
                </Button>
                <Button
                  variant="outline"
                  className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-neutral-300 bg-white text-sm font-medium text-neutral-500"
                  disabled
                >
                  <span className="sr-only">Próximo</span>
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </Button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
