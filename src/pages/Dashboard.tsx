import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { StatCard } from "@/components/StatCard";
import { Database, Store, TrendingUp, DollarSign } from "lucide-react";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { toast } from "sonner";

const Dashboard = () => {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    // Colores para el gráfico de pastel
    const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

    useEffect(() => {
        const fetchDashboard = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/v1/dashboard');
                if (!response.ok) throw new Error("Error al cargar datos del servidor");

                const result = await response.json();
                setData(result);
            } catch (error) {
                console.error(error);
                toast.error("No se pudieron cargar las estadísticas del Dashboard");
            } finally {
                setLoading(false);
            }
        };

        fetchDashboard();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-lg text-muted-foreground animate-pulse">Analizando 40,000+ registros de ventas...</p>
            </div>
        );
    }

    if (!data) return null;

    return (
        <div className="min-h-screen py-8 px-4">
            <div className="container mx-auto max-w-7xl">
                <div className="mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold mb-2">Dashboard Analítico (Test Data)</h1>
                    <p className="text-muted-foreground">
                        Análisis global de predicciones basado en el archivo <code>test.csv</code>.
                    </p>
                </div>

                {/* Metrics Overview */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <StatCard
                        title="Registros Procesados"
                        value={data.total_records.toLocaleString()}
                        icon={Database}
                        subtitle="Filas en test.csv"
                    />
                    <StatCard
                        title="Tiendas Activas"
                        value={data.total_stores}
                        icon={Store}
                        subtitle="En el periodo de prueba"
                    />
                    <StatCard
                        title="Ventas Totales Predichas"
                        value={`$${(data.total_predicted_sales / 1000000).toFixed(1)}M`}
                        icon={DollarSign}
                        subtitle="Proyección global"
                    />
                    <StatCard
                        title="Promedio por Tienda"
                        value={`$${data.avg_sales_per_store.toLocaleString('es-ES', { maximumFractionDigits: 0 })}`}
                        icon={TrendingUp}
                        subtitle="Venta acumulada prom."
                    />
                </div>

                {/* Charts Grid */}
                <div className="grid lg:grid-cols-2 gap-6 mb-6">
                    {/* Top Stores */}
                    <Card className="p-6">
                        <h2 className="text-xl font-semibold mb-4">Top 5 Sucursales (Mayor Venta)</h2>
                        <div className="h-80">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={data.top_stores} layout="vertical" margin={{ left: 20 }}>
                                    <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                                    <XAxis type="number" tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
                                    <YAxis type="category" dataKey="name" width={100} className="text-xs" />
                                    <Tooltip
                                        formatter={(value: any) => [`$${value.toLocaleString()}`, 'Ventas']}
                                        contentStyle={{ backgroundColor: 'hsl(var(--card))', borderRadius: '8px' }}
                                    />
                                    <Bar dataKey="ventas" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} barSize={30} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </Card>

                    {/* Sales Over Time */}
                    <Card className="p-6">
                        <h2 className="text-xl font-semibold mb-4">Proyección Temporal Global</h2>
                        <div className="h-80">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={data.sales_over_time}>
                                    <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                                    <XAxis
                                        dataKey="date"
                                        tick={{ fill: 'hsl(var(--muted-foreground))' }}
                                        minTickGap={30}
                                    />
                                    <YAxis
                                        tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`}
                                    />
                                    <Tooltip
                                        formatter={(value: any) => [`$${value.toLocaleString()}`, 'Ventas']}
                                        labelFormatter={(label) => `Fecha: ${label}`}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="ventas"
                                        stroke="hsl(var(--accent))"
                                        strokeWidth={3}
                                        dot={false}
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
                                        data={data.store_types}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                        outerRadius={100}
                                        fill="#8884d8"
                                        dataKey="value"
                                    >
                                        {data.store_types.map((entry: any, index: number) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;