import { PrivateRoute } from "../../src/router/PrivateRoute";
import { AuthContext } from "../../src/auth/context/AuthContext";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

describe('Tests in private route', () => {
  test('should show the children if authenticated', () => {

    Storage.prototype.setItem = jest.fn();

    const contextValue = {
      logged: true,
      user: {
        id: 'ABC',
        name: 'Santiago'
      }
    }

    render(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter initialEntries={['/search?q=batman']}>
          <PrivateRoute>
            <h1>Private Route</h1>
          </PrivateRoute>
        </MemoryRouter>
      </AuthContext.Provider>

    );

    expect(screen.getByText('Private Route')).toBeTruthy();
    expect(localStorage.setItem).toHaveBeenCalledWith("lastPath", "/search?q=batman");
  });
});