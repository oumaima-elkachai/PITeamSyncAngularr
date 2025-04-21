import { Component, Output, EventEmitter, HostListener } from '@angular/core';

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.css']
})
export class AdminSidebarComponent {
  isSidebarCollapsed = false;
  @Output() sidebarState = new EventEmitter<boolean>();

  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
    this.sidebarState.emit(this.isSidebarCollapsed);
  }

  // Optional: Close sidebar on mobile when clicking outside
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (this.isSidebarCollapsed && 
        !target.closest('.kleon-vertical-nav') && 
        window.innerWidth < 992) {
      this.toggleSidebar();
    }
  }
}