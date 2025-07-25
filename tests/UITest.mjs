import { Builder, By, until } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome';
import { mkdirSync } from 'fs';

// Use a temporary, unique user-data-dir
const uniqueDir = `/tmp/chrome-profile-${Date.now()}`;
mkdirSync(uniqueDir, { recursive: true });

const options = new chrome.Options();
options.addArguments(`--user-data-dir=${uniqueDir}`);
options.addArguments('--headless');
options.addArguments('--no-sandbox');
options.addArguments('--disable-dev-shm-usage');

let driver = await new Builder()
  .forBrowser('chrome')
  .setChromeOptions(options)
  .build();

try {
  await driver.get('http://localhost:8080/index.html');
  const input = await driver.findElement(By.name('query'));
  await input.sendKeys('apple');
  await input.submit();

  await driver.wait(until.urlContains('result.php'), 5000);
  const bodyText = await driver.findElement(By.tagName('body')).getText();

  if (bodyText.includes('apple')) {
    console.log('Test passed: input accepted and processed.');
  } else {
    throw new Error('Test failed: result text not found.');
  }
} catch (err) {
  console.error(err);
  process.exit(1);
} finally {
  await driver.quit();
}
