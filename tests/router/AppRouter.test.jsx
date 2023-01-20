import { AppRouter } from "../../src/router/AppRouter";
import { AuthContext } from "../../src/auth/context/AuthContext";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

describe('Tests in AppRouter', () => {
  test('should show the login if not authenticated', () => {

    const contextValue = {
      logged: false
    }

    render(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter initialEntries={['/marvel']}>
          <AppRouter />
        </MemoryRouter>
      </AuthContext.Provider>
    );

    expect(screen.getAllByText('Login').length).toBe(2);
  });

  test('should show the marvel component if authenticated', () => {

    const contextValue = {
      logged: true,
      user: {
        id: '123',
        name: 'Santiago'
      }
    }

    render(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter initialEntries={['/marvel']}>
          <AppRouter />
        </MemoryRouter>
      </AuthContext.Provider>
    );

    expect(screen.getByText('Marvel Comics')).toBeTruthy();
  });
});