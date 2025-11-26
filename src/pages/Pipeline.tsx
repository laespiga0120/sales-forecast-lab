import { Card } from "@/components/ui/card";
import { Database, Filter, Code, TrendingUp, GitBranch, Brain, CheckCircle, Zap } from "lucide-react";

const Pipeline = () => {
  const stages = [
    {
      icon: Database,
      title: "Ingesta y Fusión de Datos",
      description: "Consolidación de fuentes transaccionales y relacionales",
      details: [
        "Merge de Train.csv y Store.csv (Left Join)", // [cite: 586]
        "Integración de datos climáticos externos", // [cite: 556]
        "Imputación de distancias de competencia" // [cite: 331]
      ],
      color: "primary",
    },
    {
      icon: TrendingUp,
      title: "Ingeniería de Características",
      description: "Creación de variables temporales y de negocio",
      details: [
        "Extracción: Año, Mes, Día, Semana", // [cite: 600]
        "Lags (Rezagos): 1, 7 y 14 días", // 
        "Medias Móviles: 7, 14 y 28 días", // 
        "Estado de Promociones (Promo2)" // [cite: 638]
      ],
      color: "gold",
    },
    {
      icon: Code,
      title: "Preprocesamiento y Escalado",
      description: "Transformación de datos para modelos ML/DL",
      details: [
        "One-Hot Encoding (StoreType, Assortment)", // [cite: 334]
        "MinMaxScaler (0-1) para Redes Neuronales", // [cite: 339]
        "Filtrado: Open=1 y Sales>0" // [cite: 332]
      ],
      color: "primary",
    },
    {
      icon: Zap,
      title: "Optimización de Memoria",
      description: "Pipeline eficiente para grandes volúmenes de datos",
      details: [
        "Clase personalizada DataGenerator", // [cite: 929]
        "Carga dinámica por lotes (Batches)", // [cite: 931]
        "Pipeline tf.data con Prefetching" // [cite: 991]
      ],
      color: "accent",
    },
    {
      icon: GitBranch,
      title: "División Cronológica",
      description: "Estrategia de validación Time Series Split",
      details: [
        "80% Entrenamiento", // 
        "10% Validación (Tuning)",
        "10% Prueba (Evaluación Final)",
        "Respeto estricto del orden temporal" // [cite: 675]
      ],
      color: "primary",
    },
    {
      icon: Brain,
      title: "Modelado Híbrido",
      description: "Entrenamiento de arquitecturas complementarias",
      details: [
        "Random Forest (Línea base robusta)", // [cite: 484]
        "GRU (Gated Recurrent Unit) para secuencias", // [cite: 486]
        "GridSearchCV para hiperparámetros" // [cite: 787]
      ],
      color: "gold",
    },
    {
      icon: CheckCircle,
      title: "Evaluación y Métricas",
      description: "Análisis de desempeño sobre datos no vistos",
      details: [
        "RMSE (Métrica principal)", // [cite: 505]
        "MAPE (< 7% en RF)", // [cite: 1164]
        "Detección de sesgo de subestimación" // [cite: 1128]
      ],
      color: "accent",
    },
  ];
  
  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Pipeline del Sistema</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Arquitectura de procesamiento end-to-end: desde la ingesta de datos brutos hasta 
            la predicción optimizada mediante modelos híbridos.
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
                            FASE {index + 1}
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
            <h2 className="text-2xl font-bold mb-4">Arquitectura Optimizada</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
              El pipeline implementa soluciones avanzadas como <strong>Data Generators</strong> para la gestión eficiente de memoria 
              y utiliza una estrategia de <strong>Validación Cruzada Temporal</strong> para garantizar que el modelo no "vea el futuro" durante el entrenamiento.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <div className="flex items-center gap-2 bg-background px-4 py-2 rounded-lg border">
                <CheckCircle className="h-4 w-4 text-accent" />
                <span className="font-medium">Memoria Eficiente (tf.data)</span>
              </div>
              <div className="flex items-center gap-2 bg-background px-4 py-2 rounded-lg border">
                <CheckCircle className="h-4 w-4 text-accent" />
                <span className="font-medium">Anti-Data Leakage</span>
              </div>
              <div className="flex items-center gap-2 bg-background px-4 py-2 rounded-lg border">
                <CheckCircle className="h-4 w-4 text-accent" />
                <span className="font-medium">Escalable (Cloud Ready)</span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Pipeline;