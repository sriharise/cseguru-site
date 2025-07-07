// Override bad type assumptions injected by Next
declare module "next" {
  export interface PageProps {
    params: { id: string };
  }
}
