import { Title } from "@/components/ui/title";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Users() {
  return (
    <div className="container mx-auto py-6">
      <Title>Usuários</Title>
      
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Gerenciamento de Usuários</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">
            Esta é a página de gerenciamento de usuários. Aqui você poderá adicionar, editar e remover usuários do sistema.
          </p>
          <div className="mt-6 p-8 text-center bg-gray-50 rounded-lg">
            <h3 className="text-lg font-medium mb-2">Funcionalidade em desenvolvimento</h3>
            <p className="text-gray-500">
              O módulo de gerenciamento de usuários será implementado em breve.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}