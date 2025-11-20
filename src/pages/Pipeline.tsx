import { Card } from "@/components/ui/card";
import { Database, Filter, Code, TrendingUp, GitBranch, Brain, CheckCircle, Target } from "lucide-react";

const Pipeline = () => {
  const stages = [
    {
      icon: Database,
      title: "Carga y Fusión de Datos",
      description: "Consolidación de las bases de datos transaccionales y de metadatos de las tiendas.",
      // Se detalla la carga de los 3 archivos y la fusión por Store [cite: 510, 511, 523]
      details: ["Carga de train.csv, test.csv y store.csv", "Fusión de datos (Left Join por 'Store')", "Conversión de columna 'Date' a formato datetime"],
      color: "primary",
    },
    {
      icon: Filter,
      title: "Limpieza y Filtrado de Datos",
      description: "Tratamiento de valores faltantes y eliminación de registros no relevantes para la predicción.",
      // Se detalla la imputación y el filtrado por tiendas cerradas/ventas cero [cite: 583, 584, 589]
      details: ["Imputación de nulos con mediana/cero", "Filtrado de tiendas cerradas (Open=0)", "Filtrado de ventas iguales a cero (Sales=0)"],
      color: "accent",
    },
    {
      icon: Code,
      title: "Codificación de Variables",
      description: "Transformación de variables categóricas a un formato legible para los modelos.",
      // Se especifica el uso de One-Hot Encoding [cite: 585, 588]
      details: ["One-Hot Encoding (StoreType, Assortment)", "Mapeo a valores enteros (StateHoliday)", "Escalado de características numéricas"],
      color: "primary",
    },
    {
      icon: TrendingUp,
      title: "Ingeniería de Características",
      description: "Creación de variables derivadas para capturar patrones temporales y contextuales.",
      // Se detallan los 4 tipos de features creados [cite: 524, 545, 547, 561, 563]
      details: [
        "Extracción de componentes temporales (Año, Mes, Semana)",
        "Creación de Lags y Medias Móviles (7, 14, 28 días)",
        "Antigüedad de la Competencia (CompetitionAgeInMonths)",
        "Estado de la Promoción Continua (IsPromo2Active)",
      ],
      color: "gold",
    },
    {
      icon: GitBranch,
      title: "División Cronológica de Datos",
      description: "Separación de datos respetando el orden del tiempo para evitar fugas de información.",
      // Se corrige la división a 80/10/10 y el uso del orden cronológico [cite: 602, 603, 604, 608]
      details: ["División Cronológica estricta (80/10/10)", "80% Entrenamiento (datos más antiguos)", "10% Validación y 10% Prueba (datos más recientes)"],
      color: "accent",
    },
    {
      icon: Brain,
      title: "Entrenamiento y Optimización",
      description: "Ajuste de los modelos Random Forest y GRU para la predicción de ventas.",
      // Se actualiza de LSTM a GRU y se menciona la optimización [cite: 415, 726]
      details: ["Entrenamiento del modelo Random Forest Regressor", "Entrenamiento del modelo secuencial GRU", "Optimización con GridSearchCV y TimeSeriesSplit"],
      color: "primary",
    },
    {
      icon: CheckCircle,
      title: "Evaluación Final",
      description: "Medición imparcial del rendimiento de los modelos en datos no vistos.",
      // Se especifican las métricas y la des-normalización [cite: 1001, 1002, 1003, 1022]
      details: ["Cálculo de R², RMSE, MAE y MAPE", "Des-escalado de predicciones a unidades de venta (euros)", "Diagnóstico de sobreajuste (Train vs. Validation Loss)"],
      color: "accent",
    },
    {
      icon: Target,
      title: "Generación de Pronósticos",
      description: "Aplicación del mejor modelo para anticipar la demanda de productos en el futuro.",
      // Se enfoca la descripción en el objetivo de la predicción y el análisis visual [cite: 79, 1032]
      details: ["Pronósticos para la gestión de inventario", "Visualización de Predicciones vs. Ventas Reales", "Análisis de sesgos de subestimación en picos de demanda"],
      color: "gold",
    },
  ];
  
  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Pipeline del Sistema</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Proceso completo desde la carga de datos hasta la generación de predicciones de ventas
          </p>
        </div>
        
        {/* Timeline Layout */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-border hidden sm:block" />
          
          <div className="space-y-12">
            {stages.map((stage, index) => (
              <div
                key={index}
                className={`relative flex flex-col sm:flex-row gap-8 items-start ${
                  index % 2 === 0 ? "sm:flex-row-reverse" : ""
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-8 md:left-1/2 w-4 h-4 rounded-full bg-card border-4 border-primary transform -translate-x-1/2 hidden sm:block" />
                
                {/* Content card */}
                <div className={`flex-1 ${index % 2 === 0 ? "sm:text-right" : ""}`}>
                  <Card className="p-6 hover:shadow-lg transition-shadow duration-300">
                    <div className={`flex items-start gap-4 ${index % 2 === 0 ? "sm:flex-row-reverse" : ""}`}>
                      <div className={`rounded-lg p-3 shrink-0 ${
                        stage.color === "primary" ? "bg-primary/10" :
                        stage.color === "accent" ? "bg-accent/10" :
                        "bg-gold/10"
                      }`}>
                        <stage.icon className={`h-6 w-6 ${
                          stage.color === "primary" ? "text-primary" :
                          stage.color === "accent" ? "text-accent" :
                          "text-gold"
                        }`} />
                      </div>
                      
                      <div className={`flex-1 ${index % 2 === 0 ? "sm:text-right" : ""}`}>
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`text-sm font-semibold ${
                            stage.color === "primary" ? "text-primary" :
                            stage.color === "accent" ? "text-accent" :
                            "text-gold"
                          }`}>
                            ETAPA {index + 1}
                          </span>
                        </div>
                        
                        <h3 className="text-xl font-semibold mb-2">{stage.title}</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          {stage.description}
                        </p>
                        
                        <div className={`space-y-2 ${index % 2 === 0 ? "sm:items-end sm:flex sm:flex-col" : ""}`}>
                          {stage.details.map((detail, idx) => (
                            <div
                              key={idx}
                              className={`inline-flex items-center gap-2 text-xs bg-muted px-3 py-1.5 rounded-full ${
                                index % 2 === 0 ? "" : ""
                              }`}
                            >
                              <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                              <span>{detail}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
                
                {/* Spacer for alternating layout */}
                <div className="flex-1 hidden sm:block" />
              </div>
            ))}
          </div>
        </div>
        
        {/* Summary Card */}
        <Card className="mt-12 p-8 bg-gradient-to-br from-primary/5 to-accent/5">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Pipeline Completo y Robusto</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
              El sistema implementa un proceso end-to-end que garantiza calidad en cada etapa, 
              desde la preparación de datos hasta la generación de predicciones confiables para la toma de decisiones.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <div className="flex items-center gap-2 bg-background px-4 py-2 rounded-lg">
                <CheckCircle className="h-4 w-4 text-accent" />
                <span className="font-medium">Automatizado</span>
              </div>
              <div className="flex items-center gap-2 bg-background px-4 py-2 rounded-lg">
                <CheckCircle className="h-4 w-4 text-accent" />
                <span className="font-medium">Reproducible</span>
              </div>
              <div className="flex items-center gap-2 bg-background px-4 py-2 rounded-lg">
                <CheckCircle className="h-4 w-4 text-accent" />
                <span className="font-medium">Escalable</span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Pipeline;