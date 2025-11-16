import { Card } from "@/components/ui/card";
import { Database, Filter, Code, TrendingUp, GitBranch, Brain, CheckCircle, Target } from "lucide-react";

const Pipeline = () => {
  const stages = [
    {
      icon: Database,
      title: "Carga de Datos",
      description: "Importación del dataset histórico de ventas en formato CSV/SQL",
      details: ["Lectura de archivos", "Validación de estructura", "Detección de tipos de datos"],
      color: "primary",
    },
    {
      icon: Filter,
      title: "Limpieza de Datos",
      description: "Eliminación de registros incompletos y valores atípicos",
      details: ["Manejo de valores nulos", "Detección de outliers", "Normalización de formatos"],
      color: "accent",
    },
    {
      icon: Code,
      title: "Codificación de Variables",
      description: "Transformación de variables categóricas a numéricas",
      details: ["One-Hot Encoding", "Label Encoding", "Ordinal Encoding"],
      color: "primary",
    },
    {
      icon: TrendingUp,
      title: "Ingeniería de Características",
      description: "Creación de variables derivadas para mejorar el modelo",
      details: [
        "Lags temporales (7, 14, 30 días)",
        "Medias móviles (rolling means)",
        "Indicadores promocionales",
        "Variables de competencia",
        "Estacionalidad y tendencias",
      ],
      color: "gold",
    },
    {
      icon: GitBranch,
      title: "División Temporal",
      description: "Separación de datos en conjuntos de entrenamiento y prueba",
      details: ["80% entrenamiento", "20% validación", "Preservación orden temporal"],
      color: "accent",
    },
    {
      icon: Brain,
      title: "Entrenamiento del Modelo",
      description: "Ajuste de algoritmos de Machine Learning y Deep Learning",
      details: ["Random Forest", "LSTM Networks", "Optimización de hiperparámetros"],
      color: "primary",
    },
    {
      icon: CheckCircle,
      title: "Evaluación",
      description: "Medición del rendimiento con métricas estadísticas",
      details: ["Cálculo de R²", "MAE, RMSE, MAPE", "Análisis de residuales"],
      color: "accent",
    },
    {
      icon: Target,
      title: "Generación de Predicciones",
      description: "Aplicación del modelo para predecir ventas futuras",
      details: ["Predicción por rangos", "Intervalos de confianza", "Visualización de resultados"],
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
