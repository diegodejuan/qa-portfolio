# 🔐 API Security Tests (Playwright)

Este módulo contiene un conjunto de **pruebas de seguridad** diseñadas para validar la robustez de un endpoint
de login.

Aunque se ejecuta contra una API de demo, la intención es demostrar **cómo un QA puede detectar riesgos de seguridad comunes** en APIs reales.

---

## 📌 Objetivos
- Verificar que la API **rechaza entradas maliciosas** (SQL Injection, XSS).
- Simular un escenario básico de **fuerza bruta**.
- Confirmar que **campos inesperados** no otorgan privilegios.
- Comprobar que los **mensajes de error** no revelan información sensible.
- Validar que la API maneja correctamente **payloads excesivos**.
- Asegurar la **validación de tipos** en los campos.

---

## 🧪 Casos incluidos
1. **Intentos de login con datos maliciosos**  
   - SQL Injection, XSS en email y password.  
   - Esperado: `400 Bad Request` con mensaje de error.

2. **Fuerza bruta**  
   - 5 intentos seguidos de login inválido.  
   - Esperado: todos los intentos fallan (`400`), eventualmente `429 Too Many Requests`.

3. **Campos inesperados**  
   - Se añade `admin: true` al payload.  
   - Esperado: login exitoso **sin** conceder campo `admin`.

4. **Respuestas genéricas**  
   - Se prueba con un usuario inexistente.  
   - Esperado: mensaje de error genérico, sin revelar si el usuario existe.

5. **Payload muy grande**  
   - Se envía un JSON de ~2MB.  
   - Esperado: rechazo (`400`, `413`, `ECONNRESET` o similar).

6. **Validación de tipos**  
   - `email` como número y `password` como array.  
   - Esperado: rechazo (`400`) con mensaje de error.

---

## 🚀 Ejecución
```bash
# Instalar dependencias
npm install

# Ejecutar solo los tests de seguridad
npx playwright test tests-api/security.spec.ts --reporter=html
