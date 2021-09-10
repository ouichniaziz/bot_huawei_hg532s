const puppeteer = require("puppeteer");
require('dotenv').config();
const url = process.env.IP;
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Type input
  await page.goto(url);
  await page.type("[name=Username]", process.env.USERNAME);
  await page.type("[name=Password]", process.env.PASSWORD);
  await page.click("a#btnLogin");
  await page.waitForTimeout(2000);

  // Change frame
  const frameHandle = await page.$("frame[id='listfrm']");
  const frame = await frameHandle.contentFrame();
  await frame.click("a#link_Admin_1");
  console.log("Basic");
  await frame.click("a#link_Admin_1_3");
  console.log("WLAN");

  // Change frame for checkbox
  const frameHandleContent = await page.$("frame[id='contentfrm']");
  const frmContent = await frameHandleContent.contentFrame();
  await frmContent.waitForTimeout(2000);
  await frmContent.click("[name=wlEnbl]");
  console.log("WLAN Checkbox");
  console.log("WLAN Enabled/Disabled !");
  await frmContent.waitForTimeout(2000);

  await browser.close();
})();
