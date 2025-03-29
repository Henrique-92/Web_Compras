import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { insertProductSchema, Product } from "@shared/schema";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { queryClient } from "@/lib/queryClient";
import { Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ProductFormProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

// Extend the schema with more validation for the form
const formSchema = insertProductSchema.extend({
  price: z.coerce.number().min(0, "O preço deve ser maior ou igual a zero"),
  stock: z.coerce.number().min(0, "O estoque deve ser maior ou igual a zero"),
});

type ProductFormValues = z.infer<typeof formSchema>;

export default function ProductForm({ product, isOpen, onClose }: ProductFormProps) {
  const isEditing = !!product;
  const { toast } = useToast();

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: product?.name || "",
      sku: product?.sku || "",
      category: product?.category || "Eletrônicos",
      price: product?.price || 0,
      stock: product?.stock || 0,
      status: product?.status || "active",
      image: product?.image || "",
    },
  });

  useEffect(() => {
    if (product) {
      form.reset({
        name: product.name,
        sku: product.sku,
        category: product.category,
        price: product.price,
        stock: product.stock,
        status: product.status,
        image: product.image || "",
      });
    } else {
      form.reset({
        name: "",
        sku: "",
        category: "Eletrônicos",
        price: 0,
        stock: 0,
        status: "active",
        image: "",
      });
    }
  }, [product, form]);

  const createMutation = useMutation({
    mutationFn: async (data: ProductFormValues) => {
      const response = await apiRequest('POST', '/api/products', data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/products'] });
      queryClient.invalidateQueries({ queryKey: ['/api/dashboard'] });
      toast({
        title: "Produto adicionado",
        description: "O produto foi adicionado com sucesso.",
        variant: "default",
      });
      onClose();
    },
    onError: (error) => {
      toast({
        title: "Erro",
        description: `Erro ao adicionar produto: ${error.message}`,
        variant: "destructive",
      });
    }
  });

  const updateMutation = useMutation({
    mutationFn: async (data: { id: number; values: ProductFormValues }) => {
      const response = await apiRequest('PATCH', `/api/products/${data.id}`, data.values);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/products'] });
      queryClient.invalidateQueries({ queryKey: ['/api/dashboard'] });
      toast({
        title: "Produto atualizado",
        description: "O produto foi atualizado com sucesso.",
        variant: "default",
      });
      onClose();
    },
    onError: (error) => {
      toast({
        title: "Erro",
        description: `Erro ao atualizar produto: ${error.message}`,
        variant: "destructive",
      });
    }
  });

  const onSubmit = (values: ProductFormValues) => {
    if (isEditing && product) {
      updateMutation.mutate({ id: product.id, values });
    } else {
      createMutation.mutate(values);
    }
  };

  const isPending = createMutation.isPending || updateMutation.isPending;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <div className="sm:flex sm:items-start">
            <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
              <Plus className="h-6 w-6 text-blue-600" />
            </div>
            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <DialogTitle className="text-lg leading-6 font-medium text-neutral-900">
                {isEditing ? "Editar Produto" : "Adicionar Novo Produto"}
              </DialogTitle>
              <DialogDescription className="mt-2 text-sm text-neutral-500">
                {isEditing 
                  ? "Atualize as informações do produto no catálogo." 
                  : "Preencha as informações do novo produto para adicionar ao catálogo."}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6 space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome do Produto</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categoria</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione uma categoria" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Eletrônicos">Eletrônicos</SelectItem>
                      <SelectItem value="Calçados">Calçados</SelectItem>
                      <SelectItem value="Vestuário">Vestuário</SelectItem>
                      <SelectItem value="Acessórios">Acessórios</SelectItem>
                      <SelectItem value="Casa e Decoração">Casa e Decoração</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Preço (R$)</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <span className="text-neutral-500 sm:text-sm">R$</span>
                        </div>
                        <Input 
                          type="number" 
                          step="0.01" 
                          className="pl-12" 
                          {...field} 
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="stock"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Estoque</FormLabel>
                    <FormControl>
                      <Input type="number" min={0} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="sku"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>SKU</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Status</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="active" id="active" />
                        <label htmlFor="active" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                          Ativo
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="low" id="low" />
                        <label htmlFor="low" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                          Baixo estoque
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="out_of_stock" id="out_of_stock" />
                        <label htmlFor="out_of_stock" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                          Sem estoque
                        </label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL da Imagem do Produto</FormLabel>
                  <FormControl>
                    <Input placeholder="https://exemplo.com/imagem.jpg" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end space-x-3 mt-6">
              <Button 
                type="button" 
                variant="outline" 
                onClick={onClose}
                disabled={isPending}
              >
                Cancelar
              </Button>
              <Button 
                type="submit"
                disabled={isPending}
              >
                {isPending ? "Salvando..." : isEditing ? "Atualizar" : "Salvar"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
