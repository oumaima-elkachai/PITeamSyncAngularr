import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private themeReady = new BehaviorSubject<boolean>(false);
  
  initializeTheme() {
    // Wait for DOM to be ready
    if (document.readyState === 'complete') {
      this.applyTheme();
    } else {
      window.addEventListener('load', () => this.applyTheme());
    }
  }

  private applyTheme() {
    try {
      // Add any theme-specific initialization here
      const elements = document.querySelectorAll('[data-theme]');
      elements.forEach(element => {
        if (element instanceof HTMLElement) {
          element.classList.add(element.dataset['theme'] || '');
        }
      });
      this.themeReady.next(true);
    } catch (error) {
      console.error('Error initializing theme:', error);
    }
  }
}
