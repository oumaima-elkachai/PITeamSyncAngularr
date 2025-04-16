export interface JobPosting {
  id?: string;
  title: string;
  description: string;
  department: string;
  category: string;
  status: string; 
  salary: number;
  datePosted: Date;
  expirationDate: Date;
  imageUrl: string;
  applicationIds: string[];
}
