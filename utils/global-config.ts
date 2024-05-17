import { chromium, expect } from "@playwright/test";



async function globalConfig(){
    const browser = await chromium.launch();
    const page = await browser.newPage();

   // Open the web site
   await page.goto("https://katalon-demo-cura.herokuapp.com/");
   // Click to the Menu element
   await page.locator('//*[@id="menu-toggle"]/i').click();
   // Click to the login button 
   await page.locator('//*[@id="sidebar-wrapper"]/ul/li[3]/a').click();
   // Get the userName and password from the demo login fields
   const userName = await page.locator('[aria-describedby="demo_username_label"]').inputValue();
   const password = await page.locator('[aria-describedby="demo_password_label"]').inputValue();
   // Fill the userName and password fields
   await page.locator('#txt-username').fill(userName);
   await page.locator('#txt-password').fill(password);
   // Click to the login button
   await page.locator('#btn-login').click();

   // check the login is successful
   await expect(page).toHaveURL("https://katalon-demo-cura.herokuapp.com/#appointment");

     await page.context().storageState({
        path: "storageState.json",
     });
}

export default globalConfig;