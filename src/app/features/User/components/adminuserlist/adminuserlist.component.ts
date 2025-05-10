import { Component } from '@angular/core';
import { User } from '../../models/user.model';
import { AuthService } from 'src/app/core/services/UserService/auth.service';

@Component({
  selector: 'app-adminuserlist',
  templateUrl: './adminuserlist.component.html',
  styleUrls: ['./adminuserlist.component.css']
})
export class AdminuserlistComponent {

  users: User[] = [];
  filteredUsers: User[] = [];
  searchTerm: string = '';

  constructor(private userService: AuthService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  // Load all users from the backend
  loadUsers(): void {
    this.userService.getAllUsers().subscribe(
      (data: User[]) => {
        this.users = data;
        // Initialize filteredUsers with the complete list so that the table is full initially.
        this.filteredUsers = data;
      },
      (error) => {
        console.error('Error fetching users', error);
      }
    );
  }

  // Delete user
  deleteUser(userId: string): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(userId).subscribe(
        (response) => {
          alert('User deleted successfully.');
          // Refresh the users list to update the datatable automatically
          this.loadUsers();
        },
        (error) => {
          console.error('Error deleting user', error);
          alert('Error deleting user!');
        }
      );
    }
  }
  applyFilter(search: string): void {
    this.searchTerm = search;
    if (!search) {
      this.filteredUsers = this.users;
      return;
    }
    const term = search.toLowerCase();
    this.filteredUsers = this.users.filter(user =>
      user.name.toLowerCase().includes(term) ||
      user.email.toLowerCase().includes(term) ||
      user.role.toLowerCase().includes(term) ||
      user.telephone?.toLowerCase().includes(term)
    );
  }
  sortField: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';
  
  // Method to apply sorting
  sortUsers(field: string): void {
    if (this.sortField === field) {
      // If clicking the same field, toggle direction
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      // If new field, start with ascending
      this.sortField = field;
      this.sortDirection = 'asc';
    }
  
    // Sort filteredUsers array
    this.filteredUsers.sort((a, b) => {
      const aField = (a as any)[field]?.toLowerCase?.() || '';
      const bField = (b as any)[field]?.toLowerCase?.() || '';
      if (aField < bField) return this.sortDirection === 'asc' ? -1 : 1;
      if (aField > bField) return this.sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }
  

  // Block user
  blockUser(userId: string): void {
    if (confirm('Are you sure you want to block this user?')) {
      this.userService.blockUser(userId).subscribe(
        (response) => {
          console.log('Block response:', response);
          alert('User blocked successfully.');
          this.loadUsers();
        },
        (error) => {
          console.error('Error blocking user', error);
          alert(`Failed to block user: ${error.message}`);
        }
      );
    }
  }
  unblockUser(userId: string): void {
    if (confirm('Are you sure you want to unblock this user?')) {
      this.userService.unblockUser(userId).subscribe(
        () => {
          alert('User unblocked successfully.');
          this.loadUsers();  // Refresh list
        },
        (error) => {
          console.error('Error unblocking user', error);
        }
      );
    }
  }
   
 // Pagination properties
currentPage: number = 1;
itemsPerPage: number = 10; // default 10
pageSizes: number[] = [5, 10, 20, 50];

// Getter for paginated users
get paginatedUsers(): User[] {
  const startIndex = (this.currentPage - 1) * this.itemsPerPage;
  const endIndex = startIndex + this.itemsPerPage;
  return this.filteredUsers.slice(startIndex, endIndex);
}

// Change page
changePage(page: number): void {
  this.currentPage = page;
}

// Change items per page
changeItemsPerPage(size: number): void {
  this.itemsPerPage = size;
  this.currentPage = 1; // reset to page 1
}

// Calculate total number of pages
get totalPages(): number {
  return Math.ceil(this.filteredUsers.length / this.itemsPerPage);
}

// For easy page navigation
get pages(): number[] {
  return Array(this.totalPages).fill(0).map((_, i) => i + 1);
}

  

}
