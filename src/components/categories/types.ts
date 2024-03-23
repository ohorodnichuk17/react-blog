export interface ICategoryItem {
    id: number;
    name: string;
    description: string;
    urlSlug: string;
}

export interface ICategoryEdit{
    id: number;
    name: string;
    description: string;
}

export interface ICategoryCreate {
    name: string;
    description: string;
}