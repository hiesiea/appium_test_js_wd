import wd from 'wd';
import chai from 'chai';

const {assert} = chai;

describe('カウントアップアプリ', function () {
  let driver;

  before(async function () {
    driver = await wd.promiseChainRemote("http://127.0.0.1:4723/wd/hub");

    const caps = {
      "platformName": "Android",
      "automationName": "Appium",
      "deviceName": "Android Emulator",
      "app": "/Users/Hitoshi/AndroidStudioProjects/flutter_app_for_appium/build/app/outputs/apk/release/app-release.apk"
    };

    await driver.init(caps);
    // ここで待たないと要素の取得に失敗してしまうので待つ
    await driver.setImplicitWaitTimeout(5000);
  });

  after(async function () {
    await driver.quit();
  });

  it('初期状態', async function () {
    let el1 = await driver.elementByXPath("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View[3]");
    const countText = await el1.text();
    assert.equal(countText, '0');
  });

  it('カウントアップされるか', async function () {
    let el1 = await driver.elementByXPath("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.widget.Button");
    await el1.click();
    let el2 = await driver.elementByXPath("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View[3]");
    const countText = await el2.text();
    assert.equal(countText, '1');
  });
});
