declare module "drizzle"
declare module "drizzle-react"
declare module "drizzle-react-components"
declare module "redux-logger"

declare module "*.json" {
  const content: any;
  export = content;
}

declare module "*.svg" {
  const content: string;
  export = content;
}

declare module "*.png" {
  const content: string;
  export = content;
}

declare module "*.jpg" {
  const content: string;
  export = content;
}