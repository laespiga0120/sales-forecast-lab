import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { StatCard } from "@/components/StatCard"; // Asegúrate de tener este componente
import { Database, Store, Users, TrendingUp, DollarSign, PieChart as PieIcon, BarChart3, Loader2 } from "lucide-react";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { toast } from "sonner";

const Dashboard = () => {
  // --- ESTADOS DE DATOS ---
  const [kpis, setKpis] = useState<any>(null);
  const [topStores, setTopStores] = useState([]);
  const [salesHistory, setSalesHistory] = useState([]);
  const [storeTypes, setStoreTypes] = useState([]);
  const [quarterlyData, setQuarterlyData] = useState([]);
  
  const [loading, setLoading] = useState(true);

  // --- FUNCIÓN DE FORMATO DE MONEDA COMPACTO ---
  // Convierte 1,500,000 en "1.5M €" para ejes de gráficos
  const formatCompactCurrency = (value: number) => {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
      notation: "compact",
      maximumFractionDigits: 1
    }).format(value);
  };

  // --- CARGA DE DATOS (AL MONTAR EL COMPONENTE) ---
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Ejecutamos todas las peticiones en paralelo para que sea más rápido
        const [kpiRes, topRes, historyRes, typesRes, qRes] = await Promise.all([
          fetch('http://localhost:5000/dashboard/kpis'),
          fetch('http://localhost:5000/dashboard/top-stores'),
          fetch('http://localhost:5000/dashboard/sales-history'),
          fetch('http://localhost:5000/dashboard/store-types'),
          fetch('http://localhost:5000/dashboard/quarterly')
        ]);

        // Verificamos si alguna falló
        if (!kpiRes.ok || !topRes.ok) throw new Error("Error en la respuesta del servidor");

        const kpisData = await kpiRes.json();
        const topData = await topRes.json();
        const historyData = await historyRes.json();
        const typesData = await typesRes.json();
        const qData = await qRes.json();

        setKpis(kpisData);
        setTopStores(topData);
        setSalesHistory(historyData);
        setStoreTypes(typesData);
        setQuarterlyData(qData);
        
      } catch (error) {
        console.error("Error cargando dashboard:", error);
        toast.error("No se pudieron cargar los datos del dashboard. Revisa tu backend.");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // --- ESTADO DE CARGA ---
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
        <p className="text-muted-foreground">Procesando millones de registros históricos...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4 bg-gray-50/50">
      <div className="container mx-auto max-w-7xl">
        
        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 flex items-center gap-3">
            <BarChart3 className="h-8 w-8 text-primary" />
            Dashboard Analítico
          </h1>
          <p className="text-muted-foreground ml-11">
            Análisis de inteligencia de negocios basado en datos históricos reales (2013-2015).
          </p>
        </div>
        
        {/* 1. METRICS OVERVIEW (KPIs) */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Ventas Históricas Totales"
            value={kpis ? formatCompactCurrency(kpis.total_sales) : "0"}
            icon={DollarSign}
            subtitle="Ingresos brutos acumulados"
          />
          <StatCard
            title="Clientes Totales"
            value={kpis?.total_customers?.toLocaleString('de-DE') || "0"}
            icon={Users}
            subtitle="Visitas registradas"
          />
          <StatCard
            title="Registros Procesados"
            value={kpis?.total_records?.toLocaleString('de-DE') || "0"}
            icon={Database}
            subtitle="Filas en el dataset (Train)"
          />
          <StatCard
            title="Total Sucursales"
            value={kpis?.total_stores || "0"}
            icon={Store}
            subtitle="Tiendas físicas activas"
          />
        </div>
        
        {/* 2. CHARTS GRID - ROW 1 */}
        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          
          {/* A. HISTORIAL DE VENTAS MENSUAL */}
          <Card className="p-6 shadow-sm border-muted/60">
            <h2 className="text-xl font-semibold mb-1">Evolución de Ventas</h2>
            <p className="text-sm text-muted-foreground mb-4">Comportamiento mensual (Ene 2013 - Jul 2015)</p>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={salesHistory} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" vertical={false} />
                  <XAxis 
                    dataKey="mes" 
                    tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                    // Mostrar solo algunos meses para no saturar si son muchos datos
                    interval={2} 
                  />
                  <YAxis 
                    tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                    tickFormatter={(val) => formatCompactCurrency(val)}
                  />
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: '1px solid hsl(var(--border))' }}
                    formatter={(val: number) => [new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(val), "Ventas"]}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="ventas" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={2}
                    dot={false}
                    name="Ventas Mensuales"
                    activeDot={{ r: 6 }}
                  />
                  {/* Opcional: Línea de Clientes en eje secundario si quisieras */}
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* B. TOP STORES */}
          <Card className="p-6 shadow-sm border-muted/60">
            <h2 className="text-xl font-semibold mb-1">Top 5 Sucursales</h2>
            <p className="text-sm text-muted-foreground mb-4">Tiendas con mayor volumen de venta histórico</p>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={topStores} layout="vertical" margin={{ left: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} className="stroke-border" />
                  <XAxis 
                    type="number" 
                    tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                    tickFormatter={(val) => formatCompactCurrency(val)}
                  />
                  <YAxis 
                    type="category" 
                    dataKey="name" 
                    tick={{ fill: 'hsl(var(--foreground))', fontSize: 12, fontWeight: 500 }}
                    width={80}
                  />
                  <Tooltip 
                     contentStyle={{ borderRadius: '8px', border: '1px solid hsl(var(--border))' }}
                     formatter={(val: number) => [new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(val), "Total Ventas"]}
                  />
                  <Bar dataKey="ventas" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} barSize={30} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
        
        {/* 3. CHARTS GRID - ROW 2 */}
        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          
          {/* C. DISTRIBUCIÓN POR TIPO */}
          <Card className="p-6 shadow-sm border-muted/60">
            <h2 className="text-xl font-semibold mb-4">Distribución por Tipo de Tienda</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={storeTypes}
                    cx="50%"
                    cy="50%"
                    innerRadius={60} // Donut chart se ve más moderno
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {storeTypes.map((entry: any, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} strokeWidth={0} />
                    ))}
                  </Pie>
                  <Tooltip 
                     formatter={(val: number) => [val, "Tiendas"]}
                     contentStyle={{ borderRadius: '8px' }}
                  />
                  <Legend verticalAlign="bottom" height={36}/>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>
          
          {/* D. VENTAS TRIMESTRALES */}
          <Card className="p-6 shadow-sm border-muted/60">
            <h2 className="text-xl font-semibold mb-1">Estacionalidad Trimestral</h2>
            <p className="text-sm text-muted-foreground mb-4">Acumulado histórico por trimestre (Q1-Q4)</p>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={quarterlyData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} className="stroke-border" />
                  <XAxis 
                    dataKey="trimestre" 
                    tick={{ fill: 'hsl(var(--muted-foreground))' }}
                  />
                  <YAxis 
                    tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                    tickFormatter={(val) => formatCompactCurrency(val)}
                  />
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: '1px solid hsl(var(--border))' }}
                    formatter={(val: number) => [new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(val), "Ventas"]}
                  />
                  <Bar dataKey="ventas" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
        
      </div>
    </div>
  );
};

export default Dashboard;