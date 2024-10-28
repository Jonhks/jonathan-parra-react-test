import { z } from "zod";

export type User = {
  email: string;
  password: string;
};

export const DetailProduct = z.object({
  id: z.number(),
  title: z.string(),
  price: z.number(),
  description: z.string(),
  category: z.string(),
  image: z.string(),
  rating: z.object({
    rate: z.number(),
    count: z.number(),
  }),
});

const NewProduct = z.object({
  title: z.string(),
  price: z.string(),
  description: z.string(),
  image: z.string(),
  category: z.string(),
});

export const DataProducts = z.array(DetailProduct);

export type DataProducts = z.infer<typeof DataProducts>;
export type DetailProduct = z.infer<typeof DetailProduct>;
export type NewProduct = z.infer<typeof NewProduct>;
