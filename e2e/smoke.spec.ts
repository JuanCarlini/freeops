import { test, expect } from '@playwright/test'

// Carga directa de cada ruta. Contra un deploy real esto también verifica
// el rewrite SPA de vercel.json (sin él, las rutas profundas dan 404).
const ROUTES: Array<{ path: string; heading: RegExp }> = [
  { path: '/', heading: /Automatización/ },
  { path: '/servicios', heading: /Seis áreas/ },
  { path: '/casos', heading: /Problemas reales/ },
  { path: '/nosotros', heading: /Liberar operaciones/ },
  { path: '/contacto', heading: /Diagnóstico gratuito/ },
  { path: '/privacidad', heading: /Privacidad/ },
]

for (const { path, heading } of ROUTES) {
  test(`carga directa de ${path}`, async ({ page }) => {
    await page.goto(path)
    await expect(page.getByRole('heading', { level: 1 })).toContainText(heading)
  })
}

test('la navegación principal funciona', async ({ page }) => {
  await page.goto('/')
  await page
    .getByLabel('Navegación principal')
    .getByRole('link', { name: 'Servicios' })
    .click()
  await expect(page).toHaveURL(/\/servicios$/)
  await expect(page.getByRole('heading', { level: 1 })).toContainText(/Seis áreas/)
})

test('ruta inexistente muestra el 404 propio', async ({ page }) => {
  await page.goto('/esta-ruta-no-existe')
  await expect(page.getByText('[ERR.404]')).toBeVisible()
  await expect(page.getByRole('heading', { level: 1 })).toContainText(/Página no encontrada/)
})

test('el formulario valida campos vacíos', async ({ page }) => {
  await page.goto('/contacto')
  await page.getByRole('button', { name: /Pedir diagnóstico/ }).click()
  await expect(page.getByText('Ingresá tu nombre.')).toBeVisible()
  await expect(page.getByText(/Ingresá un email válido/)).toBeVisible()
  await expect(page.getByText(/Elegí un área/)).toBeVisible()
  await expect(page.getByText(/Contanos un poco más/)).toBeVisible()
})

test('el formulario completo llega al estado de éxito', async ({ page }) => {
  await page.goto('/contacto')
  await page.getByLabel('Nombre').fill('Prueba Smoke')
  await page.getByLabel('Email').fill('prueba@empresa.com')
  await page.getByLabel('Área de interés').selectOption({ index: 1 })
  await page
    .getByLabel('Descripción del problema')
    .fill('Proceso de facturas que hoy se carga a mano todos los días.')
  await page.getByRole('button', { name: /Pedir diagnóstico/ }).click()
  await expect(page.getByText('Se abrió tu correo con el mensaje cargado.')).toBeVisible()
})
