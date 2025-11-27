
# Proyecto de Predicción de Ventas para Rossmann Store Sales

## Abstract

Este proyecto se enmarca en el curso de Inteligencia Artificial: Principios y Técnicas, y aborda el desafío de predecir las ventas de la cadena de tiendas Rossmann para las próximas seis semanas. La solución se materializa en una aplicación web de arquitectura desacoplada, que no solo proporciona una interfaz interactiva para visualizar las predicciones, sino que también sirve como una plataforma robusta para la gestión y evaluación de modelos de Machine Learning. El sistema se compone de un servicio `backend` desarrollado en Python con Flask, responsable de la lógica de negocio y la exposición de los endpoints del modelo predictivo, y un `frontend` construido con React y TypeScript, que consume los datos para ofrecer una experiencia de usuario dinámica y rica en información.

---

## Arquitectura del Sistema

La arquitectura de este proyecto se basa en un enfoque de **sistemas desacoplados**, donde el cliente (Frontend) y el servidor (Backend) son dos entidades independientes que se comunican a través de una API RESTful. Esta separación de responsabilidades es fundamental para la escalabilidad y mantenibilidad del sistema.

-   **Comunicación Cliente-Servidor (REST):** El `frontend` (cliente) envía peticiones HTTP (e.g., `GET`, `POST`) a unos `endpoints` específicos expuestos por el `backend` (servidor). El servidor procesa estas peticiones, interactúa con los modelos de Machine Learning y los orígenes de datos, y devuelve respuestas en un formato estandarizado como JSON. Este patrón permite que ambos componentes evolucionen de forma independiente; por ejemplo, se podría desarrollar una aplicación móvil que consuma la misma API sin necesidad de modificar el `backend`.

-   **Patrones de Diseño:**
    -   **Single Page Application (SPA):** El `frontend` opera como una SPA, donde la navegación entre distintas vistas (páginas) se gestiona en el lado del cliente (utilizando `react-router-dom`), minimizando las recargas completas de la página y ofreciendo una experiencia de usuario fluida y rápida, similar a la de una aplicación de escritorio.
    -   **Modelo-Vista-Controlador (MVC) Adaptado:** Aunque Flask es un microframework, la estructura del `backend` sigue un patrón similar al MVC, donde el modelo (`Private_score.sav` y la lógica de datos con Pandas), la vista (los `endpoints` de la API que devuelven JSON) y el controlador (la lógica de `app.py` que gestiona las peticiones) están claramente separados.

---

## Stack Tecnológico y Justificación

La selección de tecnologías se ha realizado con un enfoque en el rendimiento, la escalabilidad y la eficiencia en el desarrollo, especialmente en el contexto de aplicaciones de ciencia de datos.

### Backend (API/Servidor)

| Tecnología      | Versión | Justificación Académica                                                                                                                                                             |
| :-------------- | :------ | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Python**      | 3.x     | Lenguaje de facto para la ciencia de datos y el Machine Learning debido a su sintaxis simple y su vasto ecosistema de librerías (NumPy, Pandas, Scikit-learn).                         |
| **Flask**       | `3.1.2` | Microframework ligero y modular, ideal para la creación de APIs RESTful. Su minimalismo reduce la sobrecarga y permite un control granular sobre los componentes de la aplicación. |
| **Gunicorn**    | `23.0.0`  | Servidor WSGI (Web Server Gateway Interface) de alto rendimiento, esencial para desplegar aplicaciones Python en entornos de producción de manera robusta y concurrente.         |
| **Scikit-learn**| `1.6.1` | Librería fundamental para el Machine Learning en Python. Proporciona herramientas eficientes para minería de datos y análisis, incluyendo la implementación de modelos predictivos. |
| **XGBoost**     | `3.1.1` | Implementación optimizada del algoritmo "Gradient Boosting", reconocida por su alto rendimiento y precisión en competiciones de Machine Learning y aplicaciones industriales.       |
| **Pandas**      | `2.2.2` | Librería crucial para la manipulación y análisis de datos. Su estructura de `DataFrame` es altamente eficiente para manejar los datos tabulares del problema de Rossmann.          |
| **NumPy**       | `1.26.4`| Proporciona soporte para arreglos y matrices multidimensionales, siendo la base para la computación científica y las operaciones numéricas requeridas por los modelos de ML.      |

### Frontend (Cliente Web)

| Tecnología        | Versión     | Justificación Académica                                                                                                                                                                                          |
| :---------------- | :---------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **React**         | `18.3.1`    | Librería declarativa para construir interfaces de usuario basada en componentes. Su Virtual DOM optimiza el rendimiento al minimizar las manipulaciones directas del DOM real.                                      |
| **TypeScript**    | `5.8.3`     | Superset de JavaScript que añade tipado estático. Esto mejora la robustez del código, facilita la refactorización y previene errores en tiempo de ejecución, lo cual es crítico en aplicaciones complejas.        |
| **Vite**          | `5.4.19`    | Herramienta de construcción de nueva generación que ofrece un servidor de desarrollo extremadamente rápido (usando ES modules nativos) y un empaquetado optimizado para producción.                                  |
| **Tailwind CSS**  | `3.4.17`    | Framework de CSS "utility-first" que permite construir diseños complejos directamente en el marcado HTML. Fomenta la consistencia y acelera el desarrollo sin necesidad de escribir CSS personalizado.            |
| **Shadcn/ui**     | N/A         | Colección de componentes de UI reutilizables y accesibles. No es una librería de componentes tradicional, sino un conjunto de scripts que instalan componentes directamente en el código fuente, ofreciendo máxima flexibilidad y personalización. |
| **Recharts**      | `2.15.4`    | Librería de gráficos para React, utilizada para la visualización de datos y resultados del modelo de una manera clara e interactiva.                                                                                 |
| **React Query**   | `5.83.0`    | Facilita la obtención, el almacenamiento en caché y la actualización de datos asíncronos en React. Simplifica la gestión del estado del servidor, eliminando la necesidad de manejar manualmente estados de carga y error. |

---

## Pre-requisitos e Instalación

Para desplegar este proyecto, es necesario clonar y configurar ambos repositorios por separado.

### 1. Instalación del Backend (Servidor & API)

**Pre-requisitos:**
*   Python 3.9 o superior
*   `pip` (gestor de paquetes de Python)

**Pasos:**

1.  **Clonar el repositorio del backend:**
    ```bash
    git clone https://github.com/laespiga0120/sales-forecast-backend.git
    cd sales-forecast-backend
    ```

2.  **(Recomendado) Crear y activar un entorno virtual:**
    ```bash
    python -m venv venv
    source venv/bin/activate  # En Windows: venv\Scripts\activate
    ```

3.  **Instalar las dependencias:**
    ```bash
    pip install -r requirements.txt
    ```

### 2. Instalación del Frontend (Cliente Web)

**Pre-requisitos:**
*   Node.js v18 o superior
*   `npm` (gestor de paquetes de Node.js)

**Pasos:**

1.  **Clonar el repositorio del frontend:**
    ```bash
    git clone https://github.com/laespiga0120/sales-forecast-lab.git
    cd sales-forecast-lab
    ```

2.  **Instalar las dependencias del proyecto:**
    ```bash
    npm install
    ```

---

## Variables de Entorno

Para un correcto funcionamiento, especialmente en entornos de producción o al conectar el `frontend` con el `backend`, podría ser necesario configurar variables de entorno.

Cree un archivo `.env` en la raíz del directorio del **frontend** y/o del **backend** si se requiere.

**Ejemplo para el Frontend (`sales-forecast-lab/.env`):**
```
# URL base de la API del backend
VITE_API_BASE_URL=http://127.0.0.1:5000
```

**Ejemplo para el Backend (`sales-forecast-backend/.env`):**
```
# Entorno de Flask (development, production)
FLASK_ENV=development
FLASK_DEBUG=1
```

---

## Despliegue y Ejecución

### Entorno de Desarrollo

1.  **Iniciar el Backend:**
    Asegúrese de estar en el directorio `sales-forecast-backend` con el entorno virtual activado.
    ```bash
    # Se asume que el punto de entrada es app.py dentro de src/
    export FLASK_APP=src.app
    flask run
    ```
    El servidor estará disponible en `http://127.0.0.1:5000`.

2.  **Iniciar el Frontend:**
    En una terminal separada, navegue al directorio `sales-forecast-lab`.
    ```bash
    npm run dev
    ```
    La aplicación web estará accesible en `http://localhost:5173` (o el puerto que indique Vite).

### Entorno de Producción

1.  **Servir el Backend con Gunicorn:**
    Desde el directorio `sales-forecast-backend`, ejecute Gunicorn.
    ```bash
    # Servir la aplicación en el puerto 8000 con 4 workers
    gunicorn --workers 4 --bind 0.0.0.0:8000 src.app:app
    ```

2.  **Construir y Previsualizar el Frontend:**
    Desde el directorio `sales-forecast-lab`:
    ```bash
    # 1. Generar los archivos estáticos de producción en la carpeta /dist
    npm run build

    # 2. (Opcional) Servir localmente los archivos generados para una vista previa
    npm run preview
    ```
    Para un despliegue real, el contenido de la carpeta `dist` debe ser servido por un servidor web estático como Nginx o en una plataforma como Vercel o Netlify.
