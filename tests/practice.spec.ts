import { test, expect } from '@playwright/test';

// نجمع الاختبارات المتعلقة بالدخول في مجموعة واحدة
test.describe('اختبارات صفحة تسجيل الدخول', () => {

  // هذا الكود سيعمل تلقائياً قبل كل اختبار بالأسفل
  test.beforeEach(async ({ page }) => {
    // الذهاب للموقع مرة واحدة لكل الاختبارات
    await page.goto('https://practice.expandtesting.com/login');
  });

  test('سيناريو الدخول الناجح', async ({ page }) => {
    // إدخال البيانات الصحيحة
    await page.getByLabel('Username').fill('practice');
    await page.getByLabel('Password').fill('SuperSecretPassword!');
    
    // الضغط على الزر باستخدام الدور (Role)
    await page.getByRole('button', { name: 'Login' }).click();

    // التأكد من النجاح (Assertions)
    // 1. التأكد من الانتقال لصفحة المنطقة الآمنة
    await expect(page).toHaveURL(/.*secure/);
    
    // 2. التأكد من ظهور رسالة النجاح الخضراء
    const successAlert = page.locator('#flash');
    await expect(successAlert).toContainText('You logged into a secure area!');
    
    // 3. التأكد من ظهور زر الخروج (Logout)
    await expect(page.getByRole('link', { name: 'Logout' })).toBeVisible();
  });

  test('سيناريو الدخول الفاشل - بيانات خاطئة', async ({ page }) => {
    // إدخال بيانات غير صحيحة
    await page.getByLabel('Username').fill('belal_wrong');
    await page.getByLabel('Password').fill('12345');
    
    await page.getByRole('button', { name: 'Login' }).click();

    // التأكد من الفشل (Assertions)
    // 1. التأكد أننا ما زلنا في صفحة الدخول
    await expect(page).toHaveURL(/.*login/);
    
    // 2. التأكد من ظهور رسالة الخطأ الحمراء
    const errorAlert = page.locator('#flash');
    await expect(errorAlert).toContainText('Your username is invalid!');
  });

});