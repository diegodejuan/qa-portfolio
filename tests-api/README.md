# API Testing – mock-prueba (Playwright)

Este módulo contiene pruebas automatizadas de API contra el servicio ficticio [mock-prueba](https://mock-prueba.in/), utilizando Playwright.

## Objetivo
Demostrar buenas prácticas de **API Testing**:
- Separación de datos en fixtures (`fixtures/users.json`).
- Cobertura de casos **positivos y negativos**.
- Validación de códigos de estado HTTP y estructura del body.
- Uso de `baseURL` definido en `playwright.config.ts`.
- Validación de esquemas JSON con **AJV**.
- Validación de **metadatos de paginación**.

## Ejecución de tests
# Levantar el mock server de mock-prueba
node src/api/server.js

# Instalar dependencias
npm install

# Ejecutar todos los tests contra mock-prueba
npx playwright test tests-api --reporter=html

## Integración contínua
Desactivada debido a que mock-prueba tiene un límite muy bajo de peticiones en su versión gratuita,
lo cual hace que suelan fallar al ejecutarlos todos.
Se comenta el contenido del archivo ci.yml

