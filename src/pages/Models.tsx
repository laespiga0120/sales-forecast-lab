import { Card } from "@/components/ui/card";
import { StatCard } from "@/components/StatCard";
import { Brain, Cpu, Activity, Target } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const Models = () => {
  const mlMetrics = [
    { metric: "R²", value: 0.924 },
    { metric: "MAE", value: 1243.56 },
    { metric: "RMSE", value: 1876.32 },
    { metric: "MAPE", value: 8.45 },
  ];
  
  const dlMetrics = [
    { metric: "R²", value: 0.889 },
    { metric: "MAE", value: 1567.89 },
    { metric: "RMSE", value: 2134.67 },
    { metric: "MAPE", value: 10.23 },
  ];
  
  const comparisonData = [
    { punto: "1", real: 15000, ml: 15200, dl: 14800 },
    { punto: "2", real: 18000, ml: 17800, dl: 17500 },
    { punto: "3", real: 22000, ml: 21900, dl: 20500 },
    { punto: "4", real: 19000, ml: 19100, dl: 18800 },
    { punto: "5", real: 16000, ml: 16200, dl: 16100 },
    { punto: "6", real: 20000, ml: 19800, dl: 18900 },
    { punto: "7", real: 24000, ml: 23700, dl: 21800 },
    { punto: "8", real: 21000, ml: 20900, dl: 20200 },
  ];
  
  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Evaluación de Modelos</h1>
          <p className="text-muted-foreground">
            Comparación de rendimiento entre modelos de Machine Learning clásico y Deep Learning
          </p>
        </div>
        
        {/* Model A - Machine Learning */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-primary/10">
              <Cpu className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-2xl font-semibold">Modelo A: Machine Learning Clásico</h2>
          </div>
          
          <div className="grid md:grid-cols-4 gap-4 mb-6">
            {mlMetrics.map((item, index) => (
              <Card key={index} className="p-6">
                <div className="text-center">
                  <p className="text-sm font-medium text-muted-foreground mb-2">{item.metric}</p>
                  <p className="text-3xl font-bold text-primary">{item.value}</p>
                </div>
              </Card>
            ))}
          </div>
          
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Características del Modelo</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <p className="text-sm"><span className="font-medium">Algoritmo:</span> Random Forest Regressor</p>
                <p className="text-sm"><span className="font-medium">Features:</span> 28 variables de entrada</p>
                <p className="text-sm"><span className="font-medium">Entrenamiento:</span> 80% datos históricos</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm"><span className="font-medium">Validación:</span> 20% datos de prueba</p>
                <p className="text-sm"><span className="font-medium">Hiperparámetros:</span> Optimizados por Grid Search</p>
                <p className="text-sm"><span className="font-medium">Tiempo entrenamiento:</span> 45 minutos</p>
              </div>
            </div>
            <div className="mt-4 p-4 bg-accent/10 rounded-lg border border-accent/20">
              <p className="text-sm text-gold-foreground">
                <span className="font-medium">Conclusión:</span> Modelo con excelente capacidad predictiva (R² = 0.924), 
                bajo error medio y alta precisión en tendencias generales. Ideal para predicciones a corto plazo.
              </p>
            </div>
          </Card>
        </div>
        
        {/* Model B - Deep Learning */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-accent/10">
              <Brain className="h-6 w-6 text-accent" />
            </div>
            <h2 className="text-2xl font-semibold">Modelo B: Deep Learning (LSTM)</h2>
          </div>
          
          <div className="grid md:grid-cols-4 gap-4 mb-6">
            {dlMetrics.map((item, index) => (
              <Card key={index} className="p-6">
                <div className="text-center">
                  <p className="text-sm font-medium text-muted-foreground mb-2">{item.metric}</p>
                  <p className="text-3xl font-bold text-accent">{item.value}</p>
                </div>
              </Card>
            ))}
          </div>
          
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Características del Modelo</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <p className="text-sm"><span className="font-medium">Arquitectura:</span> LSTM con 2 capas</p>
                <p className="text-sm"><span className="font-medium">Secuencias:</span> 30 días históricos</p>
                <p className="text-sm"><span className="font-medium">Neuronas:</span> 128 y 64 por capa</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm"><span className="font-medium">Dropout:</span> 0.2 para regularización</p>
                <p className="text-sm"><span className="font-medium">Epochs:</span> 100 con early stopping</p>
                <p className="text-sm"><span className="font-medium">Tiempo entrenamiento:</span> 2.5 horas</p>
              </div>
            </div>
            <div className="mt-4 p-4 bg-accent/10 rounded-lg border border-accent/20">
              <p className="text-sm text-gold-foreground">
                <span className="font-medium">Conclusión:</span> El modelo captura la tendencia general pero reduce picos altos. 
                Rendimiento ligeramente inferior al ML clásico en métricas, pero mejor en series con patrones complejos.
              </p>
            </div>
          </Card>
        </div>
        
        {/* Comparison Chart */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Comparación: Real vs Predicciones</h2>
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={comparisonData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis 
                  dataKey="punto" 
                  tick={{ fill: 'hsl(var(--muted-foreground))' }}
                  label={{ value: 'Punto de prueba', position: 'insideBottom', offset: -5 }}
                />
                <YAxis 
                  tick={{ fill: 'hsl(var(--muted-foreground))' }}
                  tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                  label={{ value: 'Ventas', angle: -90, position: 'insideLeft' }}
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
                  dataKey="real" 
                  stroke="hsl(var(--foreground))" 
                  strokeWidth={3}
                  name="Real"
                  dot={{ r: 5 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="ml" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2}
                  name="ML Clásico"
                  strokeDasharray="5 5"
                />
                <Line 
                  type="monotone" 
                  dataKey="dl" 
                  stroke="hsl(var(--accent))" 
                  strokeWidth={2}
                  name="Deep Learning"
                  strokeDasharray="5 5"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
        
        {/* Summary */}
        <div className="mt-8 grid md:grid-cols-2 gap-6">
          <Card className="p-6 bg-primary/5 border-primary/20">
            <div className="flex items-start gap-3 mb-3">
              <Target className="h-5 w-5 text-primary mt-1" />
              <h3 className="font-semibold text-lg">Mejor Modelo General</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              El modelo de Machine Learning clásico (Random Forest) muestra mejor desempeño general 
              con R² más alto y menor error, siendo más eficiente para predicciones de ventas en retail.
            </p>
          </Card>
          
          <Card className="p-6 bg-accent/5 border-accent/20">
            <div className="flex items-start gap-3 mb-3">
              <Activity className="h-5 w-5 text-accent mt-1" />
              <h3 className="font-semibold text-lg">Casos de Uso Especializado</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              El modelo de Deep Learning es preferible para análisis de series temporales largas 
              con patrones estacionales complejos o cuando se requiere capturar dependencias temporales profundas.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Models;
