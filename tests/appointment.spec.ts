import {expect, test} from '@playwright/test'

test.describe("Appointment page test cases", () => { 
    test.use({
        storageState: "storageState.json",
    })
    test.beforeEach(async ({page}) =>{
     // Open the web site
     await page.goto("https://katalon-demo-cura.herokuapp.com/");
    });

    test("Make appointment test and check the history", async({page}) => {
       // Slected a combo box
       const comboBox = await page.locator('#combo_facility');
       const appFacility = "Hongkong CURA Healthcare Center";
       await comboBox.selectOption({ value: 'Hongkong CURA Healthcare Center' });

       // Select a checkbox
       await page.locator('#chk_hospotal_readmission').click();
       const appRea = await page.locator('#chk_hospotal_readmission').click();

       // Click on the radio button
       await page.locator('#radio_program_medicaid').click();

        // Locate the date field and fill the formatted date
        await page.getByPlaceholder('dd/mm/yyyy').click();
        await page.getByRole('cell', { name: '7' }).first().click();
        await page.getByRole('cell', { name: 'May' }).click();
        await page.getByRole('cell', { name: '2024' }).click();
        const appDate = "07/05/2024"
        // Fill the comment field
        await page.locator('#txt_comment').fill("This is a comment");

        // Click on the submit button
        await page.locator('#btn-book-appointment').click();

        // Get the text of confirmation
        const confirmationText = await page.locator('//*[@id="summary"]/div/div/div[1]/h2').textContent();
        // Assertion
        expect(confirmationText).toContain("Appointment Confirmation");

        // Check the history of the appointment
        
        // Click to the menu button
        await page.locator('//*[@id="menu-toggle"]/i').click();

        // Click to the history button
        await page.locator('//*[@id="sidebar-wrapper"]/ul/li[3]/a').click();
        await page.waitForTimeout(1000);

        // Get the text of history
        const historyText = await page.locator('//*[@id="history"]/div/div[1]/div/h2').textContent();
        // Assertion
        expect(historyText).toContain("History");

        // Get the appointment history
        const appointmentDate = await page.locator('//*[@id="history"]/div/div[2]/div/div/div[1]').textContent();
        expect(appointmentDate).toContain(appDate);
    });

});