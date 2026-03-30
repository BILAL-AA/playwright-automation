import { test, expect } from '@playwright/test';

test('login test - modern way', async ({ page }) => {
  // 1. الانتقال للموقع
  await page.goto('https://practice.expandtesting.com/login');

  // 2. إدخال اسم المستخدم باستخدام التسمية (Label)
  await page.getByLabel('Username').fill('practice');

  // 3. إدخال كلمة المرور باستخدام التسمية (Label)
  await page.getByLabel('Password').fill('SuperSecretPassword!');

  // 4. الضغط على زر الدخول باستخدام دوره (Role) واسمه
  await page.getByRole('button', { name: 'Login' }).click();

  // 5. التحقق من رسالة النجاح (تلقائياً ينتظر ظهورها)
  const flashMessage = page.locator('#flash');
  await expect(flashMessage).toContainText('You logged into a secure area!');
});