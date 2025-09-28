# 🧪 QA Portfolio

Este proyecto es un **portfolio de pruebas automatizadas en QA**.  
Incluye ejemplos de **API Testing con Playwright**, y está preparado para ampliarse con pruebas de **UI**, **Performance** y **Contract Testing**.

El objetivo es mostrar cómo se organiza, ejecuta y mantiene un proyecto de QA real, con integración continua en **GitHub Actions**.

---

## 📂 Estructura del proyecto

```bash
qa-portfolio/
├── tests-api/          # Pruebas de API con Playwright
│   └── tests/          # Casos de prueba (login, users, etc.)
├── .github/workflows/  # Pipelines de CI/CD
└── README.md           # Este archivo
```

---

## 🛠️ Requisitos previos

Antes de empezar, asegúrate de tener instalado:

- [Node.js](https://nodejs.org/) **>= 18**
- [npm](https://www.npmjs.com/) (se instala con Node.js)
- [Git](https://git-scm.com/)

Verifica que todo funciona:

```bash
node -v
npm -v
git --version
```

---

## 🚀 Instalación

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/diegodejuan/qa-portfolio.git
   cd qa-portfolio
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Instalar navegadores de Playwright**
   ```bash
   npx playwright install
   ```

---

## ▶️ Ejecución de pruebas

### 🔹 Ejecutar todos los tests
```bash
npx playwright test
```

### 🔹 Ejecutar un test específico
```bash
npx playwright test tests-api/tests/login.spec.ts
```

### 🔹 Generar un reporte en HTML
```bash
npx playwright test --reporter=html
```
Después abre el archivo `playwright-report/index.html` en tu navegador.

---

## 🤖 CI/CD con GitHub Actions

Este repositorio está preparado para integrarse con **GitHub Actions**:

- Cada push o pull request lanza los tests automáticamente.
- Los resultados se almacenan como artefactos.
- Esto permite validar el estado del proyecto sin necesidad de ejecutarlo en local.

Pipeline principal: `.github/workflows/ci.yml`.

---

## 🧩 Próximos pasos

- [ ] Añadir pruebas de **UI con Playwright**  
- [ ] Incluir **pruebas de performance** con k6  
- [ ] Incluir **contract testing** con Karate o Pact  
- [ ] Mejorar reportes con Allure/HTML detallados  
- [ ] Añadir datasets dinámicos para pruebas de integración  

---

## 🛠️ Troubleshooting

| Problema | Solución |
|----------|----------|
| `npm: command not found` | Instalar Node.js desde [nodejs.org](https://nodejs.org/) |
| `npx playwright test` falla porque no hay navegador | Ejecuta `npx playwright install` |
| Error de versión en GitHub Actions | Verifica que el workflow use `node-version: 18` |
| Playwright no reconoce tests | Asegúrate de que los ficheros acaben en `.spec.ts` |
| Permisos en Linux/Mac | Ejecutar con `chmod +x` o `sudo` según corresponda |

---

## 👤 Autor

**Diego de Juan**  
📍 QA Automation & Performance Engineer  
🔗 [GitHub](https://github.com/diegodejuan)  

---

### 💡 Nota final

Este repositorio es de **aprendizaje y portfolio**.  
No busca cubrir un sistema completo, sino servir como ejemplo de buenas prácticas en QA.
