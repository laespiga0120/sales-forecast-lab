import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { StatCard } from "@/components/StatCard"; // Asegúrate que este componente exista o adáptalo
import { TrendingUp, DollarSign, Calendar, Info, Store as StoreIcon, Loader2 } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { toast } from "sonner";

// --- CONSTANTES DEL DATASET (TEST.CSV) ---
// Rango estricto para asegurar que usamos el calendario real de promociones
const MIN_DATE = "2015-08-01";
const MAX_DATE = "2015-09-17";

const Prediction = () => {
  // --- ESTADOS ---
  const [selectedStore, setSelectedStore] = useState("");
  // Fechas por defecto dentro del rango válido
  const [startDate, setStartDate] = useState(MIN_DATE);
  const [endDate, setEndDate] = useState("2015-08-14"); 
  
  const [predictions, setPredictions] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // Estados para la carga dinámica de tiendas
  const [stores, setStores] = useState<any[]>([]);
  const [loadingStores, setLoadingStores] = useState(true);

  // --- EFECTO: CARGAR TIENDAS DEL BACKEND ---
  useEffect(() => {
    const fetchStores = async () => {
      try {
        const response = await fetch('https://api-ia-9704af5f4972.herokuapp.com/stores');
        if (!response.ok) throw new Error("Error al obtener tiendas");
        const data = await response.json();
        setStores(data);
      } catch (error) {
        console.error("Error cargando tiendas:", error);
        toast.error("No se pudo cargar la lista de tiendas desde el servidor.");
      } finally {
        setLoadingStores(false);
      }
    };

    fetchStores();
  }, []);

  // --- LÓGICA DE PREDICCIÓN ---
  const handlePredict = async () => {
    // 1. Validaciones
    if (!selectedStore) {
      toast.error("Por favor selecciona una sucursal");
      return;
    }
    if (!startDate || !endDate) {
      toast.error("Por favor selecciona el rango de fechas");
      return;
    }
    
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    if (end < start) {
      toast.error("La fecha final debe ser posterior a la fecha inicial");
      return;
    }

    setLoading(true);
    setPredictions(null);

    try {
      // 2. Generar Array de Fechas
      const dateArray = [];
      let currentDate = new Date(start);

      while (currentDate <= end) {
        dateArray.push(new Date(currentDate).toISOString().split('T')[0]);
        currentDate.setDate(currentDate.getDate() + 1);
      }

      if (dateArray.length > 60) {
        toast.warning("Has seleccionado muchos días. Esto puede tardar unos segundos.");
      }

      // 3. Peticiones al Backend (Paralelo)
      const promises = dateArray.map(date => 
        fetch('https://api-ia-9704af5f4972.herokuapp.com/predict', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            Store: parseInt(selectedStore),
            Date: date
          })
        }).then(res => {
            if (!res.ok) throw new Error("Fallo en petición");
            return res.json();
        })
      );

      const results = await Promise.all(promises);

      // 4. Procesar Datos para Gráfica
      const chartData = results.map((res, index) => ({
        date: dateArray[index],
        ventas: res.predicted_sales,
        promo: res.promo_active, // Para debug o visualización futura
        status: res.status
      }));

      // 5. Cálculos de Totales
      const totalSales = chartData.reduce((acc, curr) => acc + curr.ventas, 0);
      const openDays = chartData.filter(d => d.ventas > 0).length;
      const avgDaily = openDays > 0 ? totalSales / openDays : 0;
      
      // Tendencia (Último día abierto - Primer día abierto)
      const firstSale = chartData.find(d => d.ventas > 0)?.ventas || 0;
      const lastSale = [...chartData].reverse().find(d => d.ventas > 0)?.ventas || 0;
      const trend = lastSale - firstSale;

      setPredictions({
        total: totalSales,
        avgDaily: avgDaily,
        days: chartData.length,
        openDays: openDays,
        trend: trend,
        chartData: chartData,
      });
      
      toast.success("Simulación completada con éxito");

    } catch (error) {
      console.error(error);
      toast.error("Error al conectar con el servidor. Verifica que 'app.py' esté corriendo.");
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen py-8 px-4 bg-gray-50/50">
      <div className="container mx-auto max-w-7xl">
        
        {/* Header */}
        <div className="mb-8 space-y-2">
          <div className="flex items-center gap-3">
             <div className="p-2 bg-primary/10 rounded-lg">
                <TrendingUp className="h-6 w-6 text-primary" />
             </div>
             <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Simulador de Ventas</h1>
          </div>
          <p className="text-muted-foreground text-lg ml-11">
            Predicción basada en datos históricos y calendario real de promociones (Q3 2015).
          </p>
        </div>
        
        {/* Form Section */}
        <Card className="p-6 mb-8 shadow-sm border-muted/60">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <StoreIcon className="h-5 w-5 text-gray-500" />
              Configuración del Escenario
            </h2>
            
            <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-md text-sm border border-blue-100">
                <Info className="h-4 w-4" />
                <span>Datos Disponibles: <strong>Agosto - Septiembre 2015</strong></span>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            
            {/* SELECTOR DE TIENDAS DINÁMICO */}
            <div className="space-y-2">
              <Label htmlFor="store">Sucursal / Entidad</Label>
              <Select value={selectedStore} onValueChange={setSelectedStore} disabled={loadingStores}>
                <SelectTrigger id="store" className="h-11">
                  <SelectValue placeholder={loadingStores ? "Cargando tiendas..." : "Selecciona una sucursal..."} />
                </SelectTrigger>
                <SelectContent>
                  {stores.length === 0 && !loadingStores && (
                     <SelectItem value="none" disabled>No se encontraron tiendas</SelectItem>
                  )}
                  {stores.map((store) => (
                    <SelectItem key={store.id} value={store.id}>
                      {store.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="start-date">Fecha Inicial</Label>
              <Input
                id="start-date"
                type="date"
                className="h-11"
                min={MIN_DATE}
                max={endDate || MAX_DATE}
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="end-date">Fecha Final</Label>
              <Input
                id="end-date"
                type="date"
                className="h-11"
                min={startDate || MIN_DATE}
                max={MAX_DATE}
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>
          
          <div className="mt-8 flex justify-end">
            <Button 
              size="lg" 
              onClick={handlePredict}
              disabled={loading || loadingStores}
              className="bg-primary hover:bg-primary/90 min-w-[200px] h-11 text-base shadow-md transition-all"
            >
              {loading ? (
                 <span className="flex items-center gap-2"><Loader2 className="animate-spin h-5 w-5" /> Calculando...</span> 
              ) : (
                 <span className="flex items-center gap-2"><TrendingUp className="h-5 w-5" /> Generar Predicción</span>
              )}
            </Button>
          </div>
        </Card>
        
        {/* Results Section */}
        {predictions && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            
            <div className="grid md:grid-cols-3 gap-6">
              <StatCard
                title="Ventas Totales"
                value={`€ ${predictions.total.toLocaleString('de-DE', { maximumFractionDigits: 0 })}`}
                icon={DollarSign}
                trend={{
                  value: Math.abs(predictions.trend),
                  isPositive: predictions.trend >= 0,
                }}
                subtitle="Ingreso bruto estimado"
              />
              <StatCard
                title="Promedio Diario"
                value={`€ ${predictions.avgDaily.toLocaleString('de-DE', { maximumFractionDigits: 0 })}`}
                icon={TrendingUp}
                subtitle={`En ${predictions.openDays} días de operación`}
              />
              <StatCard
                title="Días Analizados"
                value={predictions.days.toString()}
                icon={Calendar}
                subtitle={`${predictions.days - predictions.openDays} días cerrados`}
              />
            </div>
            
            <Card className="p-6 border-muted/60 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold">Tendencia de Ventas</h2>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-primary"></div>
                        <span>Venta Diaria</span>
                      </div>
                  </div>
              </div>
              
              <div className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={predictions.chartData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                    <XAxis 
                      dataKey="date" 
                      className="text-xs font-medium"
                      tick={{ fill: 'hsl(var(--muted-foreground))' }}
                      tickMargin={10}
                      tickFormatter={(val) => {
                          const d = new Date(val);
                          return `${d.getDate()}/${d.getMonth() + 1}`;
                      }}
                    />
                    <YAxis 
                      className="text-xs font-medium"
                      tick={{ fill: 'hsl(var(--muted-foreground))' }}
                      tickFormatter={(value) => `€${(value / 1000).toFixed(0)}k`}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '0.5rem',
                        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                      }}
                      itemStyle={{ color: 'hsl(var(--foreground))' }}
                      formatter={(value: any) => [`€ ${value.toLocaleString('de-DE')}`, 'Ventas']}
                      labelFormatter={(label) => {
                          const date = new Date(label);
                          return date.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' });
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="ventas" 
                      stroke="hsl(var(--primary))" 
                      strokeWidth={3}
                      dot={{ fill: 'hsl(var(--background))', stroke: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6, fill: 'hsl(var(--primary))' }}
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