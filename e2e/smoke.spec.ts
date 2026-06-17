import { test, expect } from '@playwright/test'

/**
 * Smoke tests de comportamiento, deliberadamente independientes del copy:
 * los textos del sitio se editan seguido (trabajo de marca en paralelo) y
 * no deben romper CI. Acá se verifica que las rutas rendericen su página,
 * que el router y el rewrite SPA funcionen y que el formulario valide.
 * Los selectores usan estructura (h1, name=, aria) en vez de textos.
 */

const NOT_FOUND_H1 = /Página no encontrada/

// Carga directa de cada ruta. Contra un deploy real esto también verifica
// el rewrite SPA de vercel.json (sin él, las rutas profundas dan 404).
const ROUTES = ['/', '/servicios', '/casos', '/nosotros', '/contacto', '/privacidad']

for (const path of ROUTES) {
  test(`carga directa de ${path}`, async ({ page }) => {
    await page.goto(path)
    const h1 = page.getByRole('heading', { level: 1 })
    await expect(h1).toBeVisible()
    await expect(h1).not.toContainText(NOT_FOUND_H1)
  })
}

test('la navegación principal funciona', async ({ page }) => {
  await page.goto('/')
  const firstLink = page.locator('header nav a').first()
  const href = await firstLink.getAttribute('href')
  expect(href).toBeTruthy()
  await firstLink.click()
  await expect(page).toHaveURL(new RegExp(`${href}$`))
  const h1 = page.getByRole('heading', { level: 1 })
  await expect(h1).toBeVisible()
  await expect(h1).not.toContainText(NOT_FOUND_H1)
})

test('ruta inexistente muestra el 404 propio', async ({ page }) => {
  await page.goto('/esta-ruta-no-existe')
  await expect(page.getByText('[ERR.404]')).toBeVisible()
  await expect(page.getByRole('heading', { level: 1 })).toContainText(NOT_FOUND_H1)
})

test('el formulario valida campos vacíos', async ({ page }) => {
  await page.goto('/contacto')
  await page.locator('form button[type="submit"]').click()
  // Los 4 campos (nombre, email, area, descripcion) quedan marcados inválidos
  await expect(page.locator('[aria-invalid="true"]')).toHaveCount(4)
})

test('el formulario completo llega al estado de éxito', async ({ page }) => {
  await page.goto('/contacto')
  await page.locator('[name="nombre"]').fill('Prueba Smoke')
  await page.locator('[name="email"]').fill('prueba@empresa.com')
  await page.locator('select[name="area"]').selectOption({ index: 1 })
  await page
    .locator('[name="descripcion"]')
    .fill('Proceso de facturas que hoy se carga a mano todos los días.')
  await page.locator('form button[type="submit"]').click()
  // El form se reemplaza por el panel de éxito
  await expect(page.locator('form')).toHaveCount(0)
})
