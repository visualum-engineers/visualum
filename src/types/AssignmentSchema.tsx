export type Assigment = {
    title: string;
    due_date?: Date | string; 
    reward_pts: number; 
    creation_date: Date | string; 
    main_image?: {
        href: string;
        description?: string;
    }
}