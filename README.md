# 🦸 Angular Hero Manager App

SPA desarrollada en **Angular 20** como prueba técnica para gestión de superhéroes. La aplicación permite listar, crear, editar, eliminar y buscar héroes almacenados temporalmente en memoria.

---

## Tecnologías y herramientas utilizadas

- Angular 20 
- Signals (`input`, `output`, `signal`, `computed`)
- Angular Testing (Jasmine + Karma)
- Lazy Loading y arquitectura escalable
- Directivas personalizadas
- Pruebas unitarias con cobertura superior al 80%
- Buenas prácticas: separación por `core`, `shared` y `features`

---

## Funcionalidades

-  Ver listado paginado de héroes
-  Buscar héroes por nombre (componente desacoplado)
-  Crear nuevos héroes
-  Editar héroes existentes
-  Eliminar héroes
-  Vista previa de imagen desde URL (con validación de extensión)
-  Campo de nombre en mayúsculas mediante directiva personalizada (`appUppercase`)
-  Tests unitarios con más del 80% de coverage
-  Mensaje informativo si se intenta editar un héroe tras recargar la página (F5)

---

## 🐳 Docker

Para ejecutar esta app usando Docker:

```bash
# 1. Construir la imagen
docker build -t hero-app .

# 2. Ejecutar el contenedor en el puerto 8080
docker run -d -p 8080:80 hero-app

Accedé a la app en tu navegador: http://localhost:8080


## 🐳 Ejecutar con Docker (sin clonar el repo)

Podés levantar directamente la aplicación descargando la imagen desde Docker Hub:

```bash
# 1. Descargar imagen desde Docker Hub
docker pull pilo28/hero-app:latest

# 2. Ejecutar la app en el puerto 8080
docker run -d -p 8080:80 pilo28/hero-app

Luego abrí http://localhost:8080 en tu navegador.
