export interface Employee {
 id: string; // L'ID MongoDB de l'employé
 name: string; // Le nom de l'employé
 email: string; // L'email de l'employé
 department: string; // Le département auquel l'employé appartient
 role: string; // Le rôle de l'employé
 hireDate: string; // La date d'embauche (vous pouvez la gérer comme une chaîne de caractères ou un objet Date)
 
}