import { expect, test } from '@playwright/test';

test('should navigate to the about page', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await expect(page.locator('body')).toContainText(
    '您好，欢迎体验 COFE 无代码。',
  );
});
