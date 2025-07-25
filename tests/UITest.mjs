import {Builder, By, until} from 'selenium-webdriver';
let driver = await new Builder().forBrowser('chrome').build();

try {
  await driver.get('http://localhost:8080');
  let input = await driver.findElement(By.name('query'));
  await input.sendKeys('test');
  await input.submit();
  await driver.wait(until.titleContains('Result'), 5000);
  console.log('UI Test Passed');
} catch (e) {
  console.error('UI Test Failed', e);
  process.exit(1);
} finally {
  await driver.quit();
}
