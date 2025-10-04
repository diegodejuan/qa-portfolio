# API Testing – ReqRes.in (Playwright)

Este módulo contiene pruebas automatizadas de API contra el servicio público [ReqRes](https://reqres.in/), utilizando Playwright.

## Objetivo
Demostrar buenas prácticas de **API Testing**:
- Separación de datos en fixtures (`fixtures/users.json`).
- Cobertura de casos **positivos y negativos**.
- Validación de códigos de estado HTTP y estructura del body.
- Uso de `baseURL` definido en `playwright.config.ts`.
- Validación de esquemas JSON con **AJV**.
- Validación de **metadatos de paginación**.

## Ejecución de tests
# Instalar dependencias
npm install

# Ejecutar todos los tests contra Reqres
npx playwright test tests-api --reporter=html

## Integración contínua
Desactivada debido a que Reqres tiene un límite mu bajo de peticiones en su versión gratuíta,
lo cual hace que suelan fallar al ejecutarlos todos.
Se comenta el contenido del archivo ci.yml

