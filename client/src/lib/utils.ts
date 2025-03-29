import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

export function getStatusText(status: string): string {
  switch (status) {
    case 'active':
      return 'Ativo';
    case 'low':
      return 'Baixo estoque';
    case 'out_of_stock':
      return 'Sem estoque';
    case 'inactive':
      return 'Inativo';
    default:
      return status;
  }
}
