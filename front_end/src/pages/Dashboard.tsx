import { useEffect, useState } from 'react';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { School, Monitor, Wifi, Tablet, MapPin, Building2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ReactECharts from 'echarts-for-react';
import api from '@/services/api';

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [listaEscolas, setListaEscolas] = useState<any[]>([]);

  useEffect(() => {
    async function carregarDados() {
      try {
        const response = await api.get("/metrics/lista-escola");
        setListaEscolas(response.data);
      } catch (error) {
        console.error("Erro ao carregar lista", error);
      } finally {
        setIsLoading(false);
      }
    }

    carregarDados();
  }, []);


  // Carrega os dados quando a página abre
  useEffect(() => {
    // Simula carregamento de 1 segundo
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);



  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <DashboardHeader />
        <div className="container py-6 px-6">
          <p className="text-center">Carregando...</p>
        </div>
      </div>
    );
  }

  // Configuração do gráfico de barras
  const barChartConfig = {
    title: {
      text: 'Infraestrutura por Tipo',
      left: 'center'
    },
    tooltip: {},
    xAxis: {
      type: 'category',
      data: ['Lab + Internet', 'LAN sem Banda', 'Tablets sem Lab']
    },
    yAxis: {
      type: 'value'
    },
    series: [{
      data: [1247, 871, 2005],
      type: 'bar',
      itemStyle: {
        color: '#3b82f6'
      }
    }]
  };

  // Configuração do gráfico de pizza
  const pieChartConfig = {
    title: {
      text: 'Distribuição de Internet',
      left: 'center'
    },
    tooltip: {},
    series: [{
      type: 'pie',
      radius: '60%',
      data: [
        { value: 1247, name: 'Com Internet', itemStyle: { color: '#16a34a' } },
        { value: 871, name: 'LAN sem Banda', itemStyle: { color: '#f59e0b' } },
        { value: 1882, name: 'Sem Internet', itemStyle: { color: '#ef4444' } }
      ]
    }]
  };

  // Configuração do gráfico de linhas
  const lineChartConfig = {
    title: {
      text: 'Evolução de Computadores',
      left: 'center'
    },
    tooltip: {},
    xAxis: {
      type: 'category',
      data: ['2019', '2020', '2021', '2022', '2023']
    },
    yAxis: {
      type: 'value'
    },
    series: [{
      data: [800, 950, 1050, 1150, 1247],
      type: 'line',
      smooth: true,
      itemStyle: {
        color: '#8b5cf6'
      }
    }]
  };

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      
      <main className="container py-6 px-6 space-y-6">
        {/* Cards com números principais */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="Total de Escolas Nordeste"
            value="45.892"
            description="Todas as escolas da região"
            icon={Building2}
          />
          <StatsCard
            title="Escolas Área Rural"
            value="18.456"
            description="Escolas na zona rural"
            icon={MapPin}
          />
          <StatsCard
            title="Escolas com Lab + Internet"
            value="1.247"
            description="Laboratório e internet disponível"
            icon={School}
          />
          <StatsCard
            title="Computadores por Aluno"
            value="0.12"
            description="Média em escolas rurais"
            icon={Monitor}
          />
  
        </div>

        {/* Gráficos */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Gráfico de Barras</CardTitle>
            </CardHeader>
            <CardContent>
              <ReactECharts option={barChartConfig} style={{ height: '300px' }} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Gráfico de Pizza</CardTitle>
            </CardHeader>
            <CardContent>
              <ReactECharts option={pieChartConfig} style={{ height: '300px' }} />
            </CardContent>
          </Card>
        </div>

        {/* Tabela simples */}
       <Card>
        <CardHeader>
          <CardTitle>Lista de Escolas</CardTitle>
        </CardHeader>

        <CardContent>
          {/* container com scroll interno */}
          <div className="rounded-md border max-h-80 overflow-y-auto">
            <table className="w-full">
              <thead className="sticky top-0 bg-white">
                <tr className="border-b">
                  <th className="text-left p-4 font-medium">Nome da Escola</th>
                  <th className="text-left p-4 font-medium">Tem Internet</th>
                  <th className="text-left p-4 font-medium">Tem Laboratório</th>
                </tr>
              </thead>

              <tbody>
                {listaEscolas.map((escola, index) => (
                  <tr key={index} className="border-b">
                    <td className="p-4">{escola.nome_escola}</td>
                    <td className="p-4">{escola.possui_internet ? "Sim" : "Não"}</td>
                    <td className="p-4">{escola.possui_laboratorio ? "Sim" : "Não"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
      </main>
    </div>
  );
};

export default Dashboard;
