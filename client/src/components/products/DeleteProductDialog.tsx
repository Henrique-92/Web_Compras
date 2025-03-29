import { Product } from "@shared/schema";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { AlertTriangle } from "lucide-react";

interface DeleteProductDialogProps {
  isOpen: boolean;
  product: Product;
  isDeleting: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function DeleteProductDialog({
  isOpen,
  product,
  isDeleting,
  onConfirm,
  onCancel
}: DeleteProductDialogProps) {
  return (
    <AlertDialog open={isOpen} onOpenChange={onCancel}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <div className="sm:flex sm:items-start">
            <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <AlertDialogTitle className="text-lg leading-6 font-medium text-neutral-900">
                Excluir produto
              </AlertDialogTitle>
              <AlertDialogDescription className="mt-2 text-sm text-neutral-500">
                Tem certeza de que deseja excluir o produto <strong>{product.name}</strong>? Esta ação não pode ser desfeita.
              </AlertDialogDescription>
            </div>
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className="bg-red-600 focus:ring-red-600 hover:bg-red-700"
            disabled={isDeleting}
          >
            {isDeleting ? "Excluindo..." : "Excluir"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
