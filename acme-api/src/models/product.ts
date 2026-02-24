import { z } from "zod";

export const ProductSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1).max(200),
  price: z.number().positive(),
  category: z.enum(["electronics", "clothing", "books", "home"]),
  inStock: z.boolean(),
});

export const CreateProductSchema = ProductSchema.omit({ id: true });

export type Product = z.infer<typeof ProductSchema>;
export type CreateProduct = z.infer<typeof CreateProductSchema>;

// In-memory store (demo only)
export const products: Product[] = [
  {
    id: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    name: "Wireless Keyboard",
    price: 79.99,
    category: "electronics",
    inStock: true,
  },
  {
    id: "b2c3d4e5-f6a7-8901-bcde-f12345678901",
    name: "TypeScript Handbook",
    price: 39.99,
    category: "books",
    inStock: true,
  },
  {
    id: "c3d4e5f6-a7b8-9012-cdef-123456789012",
    name: "Ergonomic Mouse",
    price: 59.99,
    category: "electronics",
    inStock: false,
  },
];
