import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { SearchPage } from "../../../src/heroes/pages/SearchPage";

const mockedUseNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUseNavigate
}));

describe('Tests in SearchPage', () => {

  beforeEach(() => jest.clearAllMocks());

  test('should show properly with default values.', () => {

    const { container } = render(
      <MemoryRouter>
        <SearchPage />
      </MemoryRouter>
    );

    expect(container).toMatchSnapshot();
    // screen.debug();
  });

  test('should show batman and the input with queryString value.', () => {

    render(
      <MemoryRouter initialEntries={['/search?q=batman']}>
        <SearchPage />
      </MemoryRouter>
    );

    const input = screen.getByRole('textbox');
    const img = screen.getByRole('img');
    const alert = screen.getByLabelText('alert-danger');

    expect(input.value).toBe('batman');
    expect(img.src).toContain('/assets/heroes/dc-batman.jpg');
    expect(alert.style.display).toBe('none');
  });

  test('should show an error if the hero could not be find. (batman123)', () => {

    render(
      <MemoryRouter initialEntries={['/search?q=batman123']}>
        <SearchPage />
      </MemoryRouter>
    );

    const alert = screen.getByLabelText('alert-danger');
    expect(alert.style.display).toBe('');
  });

  test('should call the navigate to the new screen.', () => {
    render(
      <MemoryRouter initialEntries={['/search']}>
        <SearchPage />
      </MemoryRouter>
    );

    const input = screen.getByRole('textbox');
    const form = screen.getByLabelText('form');

    fireEvent.change(input, { target: { name: 'searchText', value: 'batman123' }});
    fireEvent.submit(form);

    expect(mockedUseNavigate).toHaveBeenCalledWith("?q=batman123");
  });
});