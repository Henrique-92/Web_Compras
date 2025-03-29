import { Title } from "@/components/ui/title";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Reports() {
  return (
    <div className="container mx-auto py-6">
      <Title>Relatórios</Title>
      
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Relatórios do Sistema</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">
            Esta é a página de relatórios. Aqui você poderá visualizar e exportar relatórios sobre vendas, estoque e atividade de usuários.
          </p>
          <div className="mt-6 p-8 text-center bg-gray-50 rounded-lg">
            <h3 className="text-lg font-medium mb-2">Funcionalidade em desenvolvimento</h3>
            <p className="text-gray-500">
              O módulo de relatórios será implementado em breve.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}