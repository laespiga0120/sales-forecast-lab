import { Github, Linkedin } from "lucide-react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-primary text-primary-foreground mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left">
            <p className="font-semibold text-lg mb-1">
              Predicción de Ventas en Retail
            </p>
            <p className="text-sm opacity-90">
              Proyecto de Inteligencia Artificial: Principios y Técnicas - Universidad Privada Antenor Orrego
            </p>
            <p className="text-xs opacity-75 mt-2">
              © {currentYear} - Todos los derechos reservados
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/laespiga0120/sales-forecast-lab"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg hover:bg-primary-hover transition-colors"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
