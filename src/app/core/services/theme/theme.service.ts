import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private themeReady = new BehaviorSubject<boolean>(false);
  
  initializeTheme() {
    // Wrap in requestAnimationFrame to ensure DOM is ready
    requestAnimationFrame(() => {
      try {
        this.applyTheme();
      } catch (error) {
        console.error('Theme initialization error:', error);
      }
    });
  }

  private applyTheme() {
    // Initialize theme elements
    const elements = document.querySelectorAll('[data-theme]');
    if (elements.length === 0) {
      console.warn('No theme elements found');
      return;
    }

    elements.forEach(element => {
      if (element instanceof HTMLElement) {
        const themeClass = element.dataset['theme'];
        if (themeClass) {
          element.classList.add(themeClass, 'theme-initialized');
        }
      }
    });

    this.themeReady.next(true);
  }

  isThemeReady(): Observable<boolean> {
    return this.themeReady.asObservable();
  }
}
