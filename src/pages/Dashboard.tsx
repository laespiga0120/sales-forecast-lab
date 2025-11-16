import { Card } from "@/components/ui/card";
import { StatCard } from "@/components/StatCard";
import { Database, Store, Package, TrendingUp, Users, Calendar } from "lucide-react";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const Dashboard = () => {
  // Mock data
  const topStores = [
    { name: "Sucursal A", ventas: 450000 },
    { name: "Sucursal B", ventas: 380000 },
    { name: "Sucursal C", ventas: 320000 },
    { name: "Sucursal D", ventas: 290000 },
    { name: "Sucursal E", ventas: 250000 },
  ];
  
  const salesOverTime = [
    { mes: "Ene", ventas: 320000, clientes: 4500 },
    { mes: "Feb", ventas: 350000, clientes: 4800 },
    { mes: "Mar", ventas: 380000, clientes: 5100 },
    { mes: "Abr", ventas: 420000, clientes: 5500 },
    { mes: "May", ventas: 390000, clientes: 5300 },
    { mes: "Jun", ventas: 450000, clientes: 5900 },
  ];
  
  const storeTypes = [
    { name: "Tipo A", value: 45, color: "hsl(var(--primary))" },
    { name: "Tipo B", value: 30, color: "hsl(var(--accent))" },
    { name: "Tipo C", value: 15, color: "hsl(var(--gold))" },
    { name: "Tipo D", value: 10, color: "hsl(var(--muted))" },
  ];
  
  const quarterlyData = [
    { trimestre: "Q1", ventas: 1050000 },
    { trimestre: "Q2", ventas: 1260000 },
    { trimestre: "Q3", ventas: 1180000 },
    { trimestre: "Q4", ventas: 1420000 },
  ];
  
  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Dashboard Analítico</h1>
          <p className="text-muted-foreground">
            Análisis estadístico y visualización del comportamiento histórico de ventas
          </p>
        </div>
        
        {/* Metrics Overview */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Registros Totales"
            value="1,234,567"
            icon={Database}
            subtitle="Datos procesados"
          />
          <StatCard
            title="Sucursales Activas"
            value="45"
            icon={Store}
            subtitle="Entidades en operación"
          />
          <StatCard
            title="Variables Creadas"
            value="28"
            icon={Package}
            subtitle="Features de ingeniería"
          />
          <StatCard
            title="Datos Limpios"
            value="98.7%"
            icon={TrendingUp}
            subtitle="Calidad del dataset"
          />
        </div>
        
        {/* Charts Grid */}
        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          {/* Top Stores */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Top 5 Sucursales por Ventas</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={topStores} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis 
                    type="number" 
                    tick={{ fill: 'hsl(var(--muted-foreground))' }}
                    tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                  />
                  <YAxis 
                    type="category" 
                    dataKey="name" 
                    tick={{ fill: 'hsl(var(--muted-foreground))' }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '0.5rem',
                    }}
                    formatter={(value: any) => [`$${value.toLocaleString('es-ES')}`, 'Ventas']}
                  />
                  <Bar dataKey="ventas" fill="hsl(var(--primary))" radius={[0, 8, 8, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
          
          {/* Sales Over Time */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Ventas a lo Largo del Tiempo</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={salesOverTime}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis 
                    dataKey="mes" 
                    tick={{ fill: 'hsl(var(--muted-foreground))' }}
                  />
                  <YAxis 
                    tick={{ fill: 'hsl(var(--muted-foreground))' }}
                    tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '0.5rem',
                    }}
                    formatter={(value: any) => `$${value.toLocaleString('es-ES')}`}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="ventas" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={2}
                    name="Ventas"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          {/* Store Types Distribution */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Distribución por Tipo de Tienda</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={storeTypes}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {storeTypes.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '0.5rem',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>
          
          {/* Quarterly Sales */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Ventas por Trimestre</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={quarterlyData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis 
                    dataKey="trimestre" 
                    tick={{ fill: 'hsl(var(--muted-foreground))' }}
                  />
                  <YAxis 
                    tick={{ fill: 'hsl(var(--muted-foreground))' }}
                    tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '0.5rem',
                    }}
                    formatter={(value: any) => [`$${value.toLocaleString('es-ES')}`, 'Ventas']}
                  />
                  <Bar dataKey="ventas" fill="hsl(var(--accent))" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
        
        {/* Clients Over Time */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Clientes a lo Largo del Tiempo</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={salesOverTime}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis 
                  dataKey="mes" 
                  tick={{ fill: 'hsl(var(--muted-foreground))' }}
                />
                <YAxis 
                  tick={{ fill: 'hsl(var(--muted-foreground))' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '0.5rem',
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="clientes" 
                  stroke="hsl(var(--accent))" 
                  strokeWidth={2}
                  dot={{ fill: 'hsl(var(--accent))', r: 4 }}
                  name="Clientes"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
