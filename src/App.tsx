import { ClerkProvider, RedirectToSignIn, useUser } from "@clerk/clerk-react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "./components/Layout";
import { ProductRegistration } from "./pages/ProductRegistration";
import { ClaimsList } from "./pages/ClaimsList";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

function App() {
  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <RequireAuth>
                <Layout />
              </RequireAuth>
            }
          >
            <Route index element={<ProductRegistration />} />
            <Route path="claims" element={<ClaimsList />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ClerkProvider>
  );
}

function RequireAuth({ children }: { children: JSX.Element }) {
  const { isSignedIn } = useUser();
  if (!isSignedIn) {
    return <RedirectToSignIn />;
  }
  return children;
}

export default App;
