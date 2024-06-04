import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  const setup = async () => {
    const user = userEvent.setup();
    const result = await render(AppComponent);
    return { result, user };
  };
  describe('When checking the checkbox', () => {
    it('Then button is enabled', async () => {
      const { user } = await setup();

      const checkboxLabel = await screen.findByText('Agreed');
      await user.click(checkboxLabel);
      const checkbox = await screen.findByRole('checkbox');
      expect(checkbox).toBeChecked();

      const button = await screen.findByRole('button', { name: 'Submit' });
      expect(button).toBeEnabled();
    });
  });
});
