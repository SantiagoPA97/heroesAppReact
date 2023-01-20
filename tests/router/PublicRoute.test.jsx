import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { AuthContext } from "../../src/auth/context/AuthContext";
import { PublicRoute } from "../../src/router/PublicRoute";

describe('Tests in public route', () => {

  test('should show the children if not authenticated', () => {

    const contextValue = {
      logged: false
    }

    render(
      <AuthContext.Provider value={contextValue}>
        <PublicRoute>
          <h1>Public Route</h1>
        </PublicRoute>
      </AuthContext.Provider>

    );

    expect(screen.getByText('Public Route')).toBeTruthy();
  });

  test('should show navigate when the user is logged', () => {
    const contextValue = {
      logged: true,
      user: {
        name: 'Santiago',
        id: '123'
      }
    }

    render(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter initialEntries={['/login']}>
          <Routes>
            <Route path="login" element={
              <PublicRoute>
                <h1>Public Route</h1>
              </PublicRoute>}>
            </Route>
            <Route path='marvel' element={<h1>Marvel page</h1>}></Route>
          </Routes>
        </MemoryRouter>
      </AuthContext.Provider>
    );

    expect(screen.getByText('Marvel page')).toBeTruthy();
  });
});