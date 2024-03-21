export interface ICategoryItem {
   id: number;
   name: string;
   description: string;
}

export interface ICategoryCreate {
   name: string;
   urlSlug: string;
   description: string;
}