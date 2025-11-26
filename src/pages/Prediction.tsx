import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { StatCard } from "@/components/StatCard";
import { TrendingUp, DollarSign, Calendar } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { toast } from "sonner";

const Prediction = () => {
    const [selectedStore, setSelectedStore] = useState("");

    // --- FECHAS (Rango del archivo test.csv) ---
    // Fecha inicial FIJA: El inicio de los datos en test.csv
    const [startDate] = useState("2015-08-01");
    // Fecha final: Por defecto el final del archivo test.csv
    const [endDate, setEndDate] = useState("2015-09-17");

    const [predictions, setPredictions] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    // Límites estrictos basados en el archivo test.csv
    const MIN_DATE = "2015-08-01";
    const MAX_DATE = "2015-09-17";

    // Lista de tiendas representativas (asegúrate que estos IDs existan en tu test.csv)
    const stores = [
        { id: "1", name: "Sucursal Central" },
        { id: "3", name: "Sucursal Sur" },
        { id: "7", name: "Sucursal Este" },
        { id: "8", name: "Sucursal Oeste" },
        { id: "9", name: "Sucursal Norte" },
    ];

    const handlePredict = async () => {
        // Validaciones
        if (!selectedStore) {
            toast.error("Por favor selecciona una sucursal");
            return;
        }

        // Validación del rango de la fecha final
        if (endDate < MIN_DATE || endDate > MAX_DATE) {
            toast.error(`La fecha final debe estar entre ${MIN_DATE} y ${MAX_DATE} (Datos de test.csv)`);
            return;
        }

        if (new Date(endDate) < new Date(startDate)) {
            toast.error("La fecha final debe ser posterior a la fecha inicial");
            return;
        }

        setLoading(true);

        try {
            // Llamada al Backend:
            // El servidor buscará en su copia de 'test.csv' los datos reales
            // para esta tienda y fechas específicas.
            const response = await fetch('http://localhost:8000/api/v1/predict', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    store_id: selectedStore,
                    start_date: startDate,
                    end_date: endDate,
                    model_type: "xgboost"
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || 'Error al generar la predicción');
            }

            const data = await response.json();

            // Si no hay datos (por ejemplo, tienda cerrada o sin registros en CSV)
            if (data.chart_data.length === 0) {
                toast.warning("No se encontraron datos para esta tienda en las fechas seleccionadas.");
                setPredictions(null);
            } else {
                setPredictions({
                    total: data.total_sales,
                    avgDaily: data.avg_daily_sales,
                    days: data.days_analyzed,
                    trend: data.trend_percentage,
                    chartData: data.chart_data,
                });
                toast.success("Predicción generada usando datos reales (test.csv)");
            }

        } catch (error: any) {
            console.error(error);
            toast.error(error.message || "Error de conexión con el servidor");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen py-8 px-4">
            <div className="container mx-auto max-w-7xl">
                <div className="mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold mb-2">Predicción de Ventas Real</h1>
                    <p className="text-muted-foreground">
                        Consulta las proyecciones del modelo XGBoost basadas en los datos oficiales del archivo <code>test.csv</code> cargado en el servidor.
                    </p>
                </div>

                {/* Panel de Control */}
                <Card className="p-6 mb-8">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-semibold">Configuración de Consulta</h2>
                        <div className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full border border-green-200">
                            Dataset: test.csv (Activo)
                        </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="store">Sucursal</Label>
                            <Select value={selectedStore} onValueChange={setSelectedStore}>
                                <SelectTrigger id="store">
                                    <SelectValue placeholder="Selecciona una tienda..." />
                                </SelectTrigger>
                                <SelectContent>
                                    {stores.map((store) => (
                                        <SelectItem key={store.id} value={store.id}>
                                            {store.name} (ID: {store.id})
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="start-date">Fecha Inicial (Fija)</Label>
                            <Input
                                id="start-date"
                                type="date"
                                value={startDate}
                                disabled={true}
                                className="bg-muted opacity-100 cursor-not-allowed font-medium"
                            />
                            <p className="text-xs text-muted-foreground">Inicio del dataset de prueba</p>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="end-date">Fecha Final</Label>
                            <Input
                                id="end-date"
                                type="date"
                                value={endDate}
                                min={MIN_DATE}
                                max={MAX_DATE}
                                onChange={(e) => setEndDate(e.target.value)}
                            />
                            <p className="text-xs text-muted-foreground">Máximo: 17/09/2015</p>
                        </div>
                    </div>

                    <div className="mt-6">
                        <Button
                            size="lg"
                            onClick={handlePredict}
                            disabled={loading}
                            className="bg-primary hover:bg-primary-hover text-primary-foreground w-full md:w-auto shadow-md transition-all hover:scale-105"
                        >
                            <TrendingUp className="mr-2 h-5 w-5" />
                            {loading ? "Procesando con IA..." : "Calcular Predicción"}
                        </Button>
                    </div>
                </Card>

                {/* Resultados */}
                {predictions && (
                    <div className="space-y-6 animate-in fade-in-50 duration-500">
                        <div className="grid md:grid-cols-3 gap-6">
                            <StatCard
                                title="Ventas Totales Proyectadas"
                                value={`$${predictions.total.toLocaleString('es-ES', { maximumFractionDigits: 0 })}`}
                                icon={DollarSign}
                                trend={{
                                    value: predictions.trend,
                                    isPositive: predictions.trend > 0,
                                }}
                            />
                            <StatCard
                                title="Venta Diaria Promedio"
                                value={`$${predictions.avgDaily.toLocaleString('es-ES', { maximumFractionDigits: 0 })}`}
                                icon={TrendingUp}
                                subtitle="Basado en histórico real"
                            />
                            <StatCard
                                title="Días Proyectados"
                                value={predictions.days}
                                icon={Calendar}
                                subtitle={`${startDate} al ${endDate}`}
                            />
                        </div>

                        <Card className="p-6">
                            <h2 className="text-xl font-semibold mb-4">Tendencia de Ventas (Modelo XGBoost)</h2>
                            <div className="h-96">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={predictions.chartData}>
                                        <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                                        <XAxis
                                            dataKey="date"
                                            className="text-xs"
                                            tick={{ fill: 'hsl(var(--muted-foreground))' }}
                                            minTickGap={30}
                                        />
                                        <YAxis
                                            className="text-xs"
                                            tick={{ fill: 'hsl(var(--muted-foreground))' }}
                                            tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                                        />
                                        <Tooltip
                                            contentStyle={{
                                                backgroundColor: 'hsl(var(--card))',
                                                border: '1px solid hsl(var(--border))',
                                                borderRadius: '0.5rem',
                                                boxShadow: 'var(--shadow-md)'
                                            }}
                                            formatter={(value: any) => [`$${value.toLocaleString('es-ES', { maximumFractionDigits: 0 })}`, 'Ventas Predichas']}
                                            labelFormatter={(label) => `Fecha: ${label}`}
                                        />
                                        <Line
                                            type="monotone"
                                            dataKey="ventas"
                                            stroke="hsl(var(--primary))"
                                            strokeWidth={3}
                                            dot={{ fill: 'hsl(var(--primary))', r: 4, strokeWidth: 2, stroke: 'hsl(var(--background))' }}
                                            activeDot={{ r: 7 }}
                                            animationDuration={1500}
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </Card>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Prediction;