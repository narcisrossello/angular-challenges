import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatButtonHarness } from '@angular/material/button/testing';
import { MatCheckboxHarness } from '@angular/material/checkbox/testing';
import { MatInputHarness } from '@angular/material/input/testing';
import { MatSliderHarness } from '@angular/material/slider/testing';
import { render } from '@testing-library/angular';
import { ChildComponent } from './child.component';

describe('ChildComponent', () => {
  async function setup() {
    const { fixture } = await render(ChildComponent);
    const loader = TestbedHarnessEnvironment.loader(fixture);
    return loader;
  }

  describe('When init', () => {
    test('Then show 1 slider, 3 checkboxes, 4 inputs, 2 buttons', async () => {
      // await render(ChildComponent);
      const loader = await setup();
      const slider = await loader.getAllHarnesses(MatSliderHarness);
      const checkboxes = await loader.getAllHarnesses(MatCheckboxHarness);
      const inputs = await loader.getAllHarnesses(MatInputHarness);
      const buttons = await loader.getAllHarnesses(MatButtonHarness);
      expect(slider.length).toBe(1);
      expect(checkboxes.length).toBe(3);
      expect(inputs.length).toBe(4);
      expect(buttons.length).toBe(2);
    });

    test('Then initial value of slider thumb is 0', async () => {
      // await render(ChildComponent);
      const loader = await setup();
      const slider = await loader.getHarness(MatSliderHarness);
      const thumb = await slider.getEndThumb();
      expect(await thumb.getValue()).toBe(0);
    });
  });

  describe('Given maxValue set to 109', () => {
    test('Then slider max value is 109', async () => {
      // await render(ChildComponent);
      const loader = await setup();
      const inputMaxValue = await loader.getHarness(
        MatInputHarness.with({
          selector: '#input-max',
        }),
      );
      inputMaxValue.setValue('109');
      const slider = await loader.getHarness(MatSliderHarness);
      const maxValue = await slider.getMaxValue();
      expect(maxValue).toBe(109);
    });
  });

  describe('When disabled checkbox is toggled', () => {
    test('Then slider is disabled', async () => {
      // await render(ChildComponent);
      const loader = await setup();
      const checkboxes = await loader.getAllHarnesses(MatCheckboxHarness);
      checkboxes[2].toggle();
      const slider = await loader.getHarness(MatSliderHarness);
      expect(slider.isDisabled()).toBeTruthy();
    });
  });

  describe('Given step value set to 5, and When clicking on forward button two times', () => {
    test('Then thumb value is 10', async () => {
      // await render(ChildComponent);
      const loader = await setup();
      const inputStepValue = await loader.getHarness(
        MatInputHarness.with({ selector: '#input-step' }),
      );
      await inputStepValue.setValue('5');
      const buttonForward = (await loader.getAllHarnesses(MatButtonHarness))[1];
      const slider = await loader.getHarness(MatSliderHarness);
      const thumbValue = await slider.getEndThumb();
      buttonForward.click();
      buttonForward.click();

      expect(await thumbValue.getValue()).toBe(10);
    });
  });

  describe('Given slider value set to 5, and step value to 6 and When clicking on back button', () => {
    test('Then slider value is still 5', async () => {
      // await render(ChildComponent);
      const loader = await setup();
      const sliderValue = await loader.getHarness(
        MatInputHarness.with({ selector: '#input-value' }),
      );
      await sliderValue.setValue('5');
      const inputStepValue = await loader.getHarness(
        MatInputHarness.with({ selector: '#input-step' }),
      );
      await inputStepValue.setValue('6');

      const slider = await loader.getHarness(MatSliderHarness);
      const thumbValue = await slider.getEndThumb();
      const buttonBackwards = (
        await loader.getAllHarnesses(MatButtonHarness)
      )[0];
      buttonBackwards.click();

      expect(await thumbValue.getValue()).toBe(5);
    });
  });
});
