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

export const DataProducts = z.array(DetailProduct);

export type DataProducts = z.infer<typeof DataProducts>;
