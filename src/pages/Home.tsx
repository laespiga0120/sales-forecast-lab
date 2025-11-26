import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { TrendingUp, BarChart3, Brain, Database, GitBranch } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  
  const features = [
    {
      icon: TrendingUp,
      title: "Predicción Avanzada",
      description: "Genera predicciones precisas de ventas para cualquier rango de fechas utilizando modelos de machine learning entrenados.",
    },
    {
      icon: BarChart3,
      title: "Análisis Detallado",
      description: "Visualiza tendencias, patrones y comportamientos históricos con dashboards interactivos y gráficos profesionales.",
    },
    {
      icon: Brain,
      title: "Modelos Inteligentes",
      description: "Compara el rendimiento de modelos de ML clásico y Deep Learning con métricas detalladas de evaluación.",
    },
    {
      icon: Database,
      title: "Procesamiento Robusto",
      description: "Pipeline completo de preprocesamiento con ingeniería de características, lags y variables temporales.",
    },
  ];
  
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="container mx-auto relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium mb-6">
              <Brain className="h-4 w-4" />
              Inteligencia Artificial Aplicada
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Panel de Análisis y Predicción de Ventas
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Sistema inteligente para predecir ventas en el sector retail mediante machine learning supervisado. 
              Analiza datos históricos, genera predicciones precisas y evalúa tendencias con modelos avanzados.
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center">
              <Button 
                size="lg" 
                onClick={() => navigate("/prediction")}
                className="bg-primary hover:bg-primary-hover text-primary-foreground shadow-lg"
              >
                <TrendingUp className="mr-2 h-5 w-5" />
                Ir al Módulo de Predicción
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => navigate("/dashboard")}
                className="border-primary text-primary hover:bg-primary/10"
              >
                <BarChart3 className="mr-2 h-5 w-5" />
                Ver Dashboard General
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4 bg-background">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Capacidades del Sistema</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Una plataforma completa para análisis predictivo y toma de decisiones basada en datos
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {features.map((feature, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-all duration-300 border-border">
                <div className="flex items-start gap-4">
                  <div className="rounded-lg bg-primary/10 p-3 shrink-0">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <Card className="p-8 md:p-12 bg-gradient-to-br from-primary to-accent text-primary-foreground">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                ¿Listo para explorar las predicciones?
              </h2>
              <p className="text-lg mb-8 opacity-90">
                Accede a todas las funcionalidades del sistema y descubre insights valiosos sobre tus datos de ventas
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button 
                  size="lg" 
                  variant="secondary"
                  onClick={() => navigate("/models")}
                  className="bg-background text-foreground hover:bg-background/90"
                >
                  <Brain className="mr-2 h-5 w-5" />
                  Ver Modelos
                </Button>
                <Button 
                  size="lg" 
                  variant="secondary"
                  onClick={() => navigate("/pipeline")}
                  className="bg-background text-foreground hover:bg-background/90"
                >
                  <GitBranch className="mr-2 h-5 w-5" />
                  Ver Pipeline del Sistema
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Home;
