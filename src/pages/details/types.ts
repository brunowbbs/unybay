export type Product = {
  _id: string;
  name: string;
  manufacturer: string;
  category: string;
  price: number;
  url1: string;
  url2: string;
  description: string;
  user: {
    name: string;
    email: string;
    phone: string;
    city: string;
    state: string;
  };
};
