import { Projet } from "./projet.model";

export interface ProjectBudget {
 id?: string;
 projet: Projet;
 allocatedFunds: number;
 usedFunds: number;
}