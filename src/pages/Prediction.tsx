import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { StatCard } from "@/components/StatCard";
import { TrendingUp, DollarSign, Calendar, Store } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { toast } from "sonner";

const Prediction = () => {
  const [selectedStore, setSelectedStore] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [predictions, setPredictions] = useState<any>(null);
  
  const stores = [
    { id: "1", name: "Sucursal Central" },
    { id: "2", name: "Sucursal Norte" },
    { id: "3", name: "Sucursal Sur" },
    { id: "4", name: "Sucursal Este" },
    { id: "5", name: "Sucursal Oeste" },
  ];
  
  const handlePredict = () => {
    // Validations
    if (!selectedStore) {
      toast.error("Por favor selecciona una sucursal");
      return;
    }
    if (!startDate) {
      toast.error("Por favor selecciona la fecha inicial");
      return;
    }
    if (!endDate) {
      toast.error("Por favor selecciona la fecha final");
      return;
    }
    if (new Date(endDate) < new Date(startDate)) {
      toast.error("La fecha final debe ser posterior a la fecha inicial");
      return;
    }
    
    // Simulate prediction
    const days = Math.ceil((new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000 * 60 * 60 * 24)) + 1;
    const avgDaily = 15000 + Math.random() * 5000;
    const total = avgDaily * days;
    
    const chartData = Array.from({ length: Math.min(days, 30) }, (_, i) => ({
      date: new Date(new Date(startDate).getTime() + i * 24 * 60 * 60 * 1000).toLocaleDateString(),
      ventas: avgDaily + (Math.random() - 0.5) * 3000,
    }));
    
    setPredictions({
      total,
      avgDaily,
      days,
      trend: (Math.random() - 0.5) * 20,
      chartData,
    });
    
    toast.success("Predicción generada exitosamente");
  };
  
  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Módulo de Predicción</h1>
          <p className="text-muted-foreground">
            Genera predicciones de ventas para rangos de fechas específicos utilizando modelos entrenados
          </p>
        </div>
        
        {/* Form Section */}
        <Card className="p-6 mb-8">
          <h2 className="text-xl font-semibold mb-6">Parámetros de Predicción</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="store">Sucursal / Entidad</Label>
              <Select value={selectedStore} onValueChange={setSelectedStore}>
                <SelectTrigger id="store">
                  <SelectValue placeholder="Selecciona una sucursal" />
                </SelectTrigger>
                <SelectContent>
                  {stores.map((store) => (
                    <SelectItem key={store.id} value={store.id}>
                      {store.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="start-date">Fecha Inicial (Desde)</Label>
              <Input
                id="start-date"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="end-date">Fecha Final (Hasta)</Label>
              <Input
                id="end-date"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>
          
          <div className="mt-6">
            <Button 
              size="lg" 
              onClick={handlePredict}
              className="bg-primary hover:bg-primary-hover text-primary-foreground w-full md:w-auto"
            >
              <TrendingUp className="mr-2 h-5 w-5" />
              Generar Predicción
            </Button>
          </div>
        </Card>
        
        {/* Results Section */}
        {predictions && (
          <div className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              <StatCard
                title="Ventas Totales Predichas"
                value={`$${predictions.total.toLocaleString('es-ES', { maximumFractionDigits: 0 })}`}
                icon={DollarSign}
                trend={{
                  value: Math.abs(predictions.trend),
                  isPositive: predictions.trend > 0,
                }}
              />
              <StatCard
                title="Promedio Diario"
                value={`$${predictions.avgDaily.toLocaleString('es-ES', { maximumFractionDigits: 0 })}`}
                icon={TrendingUp}
                subtitle="Por día en el período"
              />
              <StatCard
                title="Días Analizados"
                value={predictions.days}
                icon={Calendar}
                subtitle="Del rango seleccionado"
              />
            </div>
            
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Evolución de Ventas Predichas</h2>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={predictions.chartData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                    <XAxis 
                      dataKey="date" 
                      className="text-xs"
                      tick={{ fill: 'hsl(var(--muted-foreground))' }}
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
                      }}
                      formatter={(value: any) => [`$${value.toLocaleString('es-ES', { maximumFractionDigits: 0 })}`, 'Ventas']}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="ventas" 
                      stroke="hsl(var(--primary))" 
                      strokeWidth={2}
                      dot={{ fill: 'hsl(var(--primary))', r: 4 }}
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
