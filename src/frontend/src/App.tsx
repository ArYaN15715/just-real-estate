import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  RouterProvider,
  createHashHistory,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { CustomCursor } from "./components/CustomCursor";
import { ScrollProgressBar } from "./components/ScrollProgressBar";
import { Layout } from "./components/layout/Layout";
import { ComparisonProvider } from "./context/ComparisonContext";
import ComparePage from "./pages/ComparePage";
import ContactPage from "./pages/ContactPage";
import HomePage from "./pages/HomePage";
import PropertiesPage from "./pages/PropertiesPage";
import PropertyDetailPage from "./pages/PropertyDetailPage";

const queryClient = new QueryClient();

const rootRoute = createRootRoute({
  component: () => (
    <ComparisonProvider>
      <ScrollProgressBar />
      <CustomCursor />
      <Layout>
        <Outlet />
      </Layout>
    </ComparisonProvider>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});
const propertiesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/properties",
  validateSearch: (search: Record<string, unknown>): { category?: string } => ({
    category: typeof search.category === "string" ? search.category : undefined,
  }),
  component: PropertiesPage,
});
const propertyDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/properties/$id",
  component: PropertyDetailPage,
});
const compareRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/compare",
  component: ComparePage,
});
const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/contact",
  component: ContactPage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  propertiesRoute,
  propertyDetailRoute,
  compareRoute,
  contactRoute,
]);

const hashHistory = createHashHistory();
const router = createRouter({ routeTree, history: hashHistory });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
