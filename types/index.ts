export type VotesType = {
  count: number;
  value: number;
}

export type PunctuationType = {
  countOpinions: number;
  punctuation: number;
  votes: VotesType[]
}

export type ReviewType = {
  name: string;
  avatar: string;
  description: string;
  punctuation: number;
}

export type ProductType = {
  id: string;
  name: string;
  thumb: string;
  price: string;
  count: number;
  color: string;
  size: string;
  images: string[];
  discount?: string;
  currentPrice: number;
  punctuation: PunctuationType;
  reviews: ReviewType[];
}

export type ProductTypeList = {
  id: string;
  name: string;
  price: string;
  color: string;
  images: string[];
  discount?: string;
  currentPrice?: number;
}

export type ProductStoreType = {
  id: string;
  name: string;
  thumb: string;
  price: number;
  count: number;
  color: string;
  size: string;
}

export type GtagEventType = {
  action: string;
  category: string;
  label: string;
  value: string
}

export type Color = {
  id: number;
  name: string;
  image: string;
  quantity: number;
  product_id: number;
}

export type SizeColor = {
  id: number;
  color: Color;
}

export type Size = {
  id: number;
  size: string;
  product_id: number;
  size_color: SizeColor[];
}

export type Product = {
  id: number;
  name: string;
  description: string;
  quantity: number;
  image: string;
  import_price: number;
  sell_price: number;
  status: number;
  display_order: number;
  createdAt: string;
  category: {
    id: number;
    name: string;
  };
  brand: {
    id: number;
    name: string;
  };
  product_type: {
    id: number;
    name: string;
  };
  colors: Color[];
  sizes: Size[];
}