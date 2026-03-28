export interface Recommended {
  id: string,
  title: string,
  img: string,
  plot: string,
  year: string,
  creator: string,
  rating?: string,
  categoryId: number,
  link?: string
}

export interface Suggestion extends Recommended {
  genres: string[]
}

export interface History {
  recommended: Recommended,
  createdAt: string,
}

export interface Login {
  email: string,
  password: string,
}

export interface Register extends Login {
  name: string
}

export interface User {
  name: string,
  email: string,
  credits: number,
  avatarUrl: string,
}

export interface Person {
  id: number,
  trait: Record<string,string>,
  icon: string,
  desc: Record<string,string>,
  isActive: boolean
}

export interface Category {
  id: number,
  title: Record<string,string>,
  select?: boolean,
  isActive: boolean
}

export interface Product {
  id: string
  name: string
  credits: number
  price: number
  currency: string
  region: string
}

declare global {
  interface Window {
    adsbygoogle: any[]
  }
}

export { };
