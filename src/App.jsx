import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "./ui/AppLayout";
import Dashboard from "./pages/Dashboard";
import Bookings from "./pages/Bookings";
import Cabins from "./pages/Cabins";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import Account from "./pages/Account";
import PageNotFound from "./pages/PageNotFound";
import GlobalStyles from "./styles/GlobalStyles";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import { useGeneralContext } from "./contexts/GeneralContext";
import BookingDetail from "./pages/BookingDetail";
import CabinDetail from "./pages/CabinDetail";
import ProtectedRoute from "./ui/ProtectedRoute";
import Guests from "./pages/Guests";
import { useEffect } from "react";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
});

function App() {
  const { isDarkMode } = useGeneralContext();
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.remove("light-mode");
      document.documentElement.classList.add("dark-mode");
      localStorage.setItem("mode", "dark");
    } else {
      document.documentElement.classList.remove("dark-mode");
      document.documentElement.classList.add("light-mode");
      localStorage.setItem("mode", "light");
    }
  }, [isDarkMode]);

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <GlobalStyles />
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "0.75rem" }}
        toastOptions={{
          success: { duration: 3000 },
          error: { duration: 5000 },
          style: {
            fontSize: "0.9rem",
            padding: "1rem",
            backgroundColor: "var(--color-Gray-0)",
            color: "var(--color-Gray-900)",
            border: "1px solid var(--color-Gray-200)",
          },
        }}
      />
      <BrowserRouter>
        <Routes>
          <Route
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate replace to="/dashboard" />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/bookings" element={<Bookings />} />
            <Route path="/bookings/:id" element={<BookingDetail />} />
            <Route path="/cabins" element={<Cabins />} />
            <Route path="/cabins/:id" element={<CabinDetail />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/guests" element={<Guests />} />
            <Route path="/account" element={<Account />} />
            <Route path="*" element={<PageNotFound />} />
          </Route>
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
