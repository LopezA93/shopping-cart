import { render, screen, waitFor } from "@testing-library/react";
import ProductList from "../ProductList";
import { BrowserRouter } from "react-router-dom";
import { vi } from "vitest";
import { getProducts } from "../../../../services/products";
import { CartProvider } from "../../../../context/CartContext";

vi.mock("../../../../services/products");

const mockData = [
  {
    id: "1",
    image_url: "https://dummyimage.com/600x400/000/fff",
    stock: 20,
    productName: "Product 1",
    price: 10,
    productDescription: "Test product",
    favorite: 1,
  },
  {
    id: "2",
    image_url: "https://dummyimage.com/600x400/000/fff",
    stock: 15,
    productName: "Product 2",
    price: 75,
    productDescription: "Another test product",
    favorite: 0,
  },
];

describe("ProductList Component", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("renders products after fetching them", async () => {
    (getProducts as vi.Mock).mockResolvedValueOnce(mockData);

    render(
      <BrowserRouter>
        <CartProvider>
          <ProductList />
        </CartProvider>
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText("Product 1")).toBeInTheDocument();
      expect(screen.getByText("Product 2")).toBeInTheDocument();
    });
  });

  it("shows an error message when fetching fails", async () => {
    (getProducts as vi.Mock).mockRejectedValueOnce(new Error("API Failure"));

    render(
      <BrowserRouter>
        <CartProvider>
          <ProductList />
        </CartProvider>
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText("Error fetching products")).toBeInTheDocument();
    });
  });
});
