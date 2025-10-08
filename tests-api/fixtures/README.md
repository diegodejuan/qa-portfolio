# Carpeta `fixtures`

Esta carpeta contiene utilidades y datos reutilizables para los tests automatizados.

## ¿Qué es un fixture?
Un fixture es un recurso que amplía el contexto de los tests, permitiendo acceder fácilmente a objetos, funciones o datos comunes sin tener que importarlos manualmente en cada archivo de prueba.

## ¿Qué incluye esta carpeta?
- **`apiClient.fixture.ts`**: Proporciona acceso directo al objeto `apiClient`, que encapsula las llamadas a la API y facilita la interacción con los endpoints en los tests.
- **`users.json`** (u otros datos): Contiene usuarios de prueba y otros datos que pueden ser usados en diferentes escenarios de testing.

## Ventajas
- Los tests son más limpios y fáciles de mantener.
- Permite reutilizar lógica y datos entre diferentes pruebas.
- Facilita la configuración y el acceso a recursos comunes.

## Ejemplo de uso
En un test, puedes acceder directamente a `apiClient` y a los datos de `users` gracias a estos fixtures, sin necesidad de importarlos manualmente:

```typescript
// ...en tu test...
const response = await apiClient.login(users.validUser);
```

Así, el contexto del test se amplía y se simplifica el código.
