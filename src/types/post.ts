export interface Post {
    id: string;
    userId: string;
    title: string;
    description: string;
    status: 'draft' | 'published';
    createDate: string;
    updateDate: string;
}