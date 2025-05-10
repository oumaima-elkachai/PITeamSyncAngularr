import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-image-modal',
  template: `
    <div class="modal-backdrop" (click)="close()">
      <div class="modal-content" (click)="$event.stopPropagation()">
        <span class="close-button" (click)="close()">&times;</span>
        <img [src]="imageUrl" alt="Enlarged event image">
      </div>
    </div>
  `,
  styles: [`
    .modal-backdrop {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.7);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1050;
    }
    .modal-content {
      position: relative;
      max-width: 90%;
      max-height: 90%;
      background: white;
      padding: 20px;
      border-radius: 8px;
    }
    .close-button {
      position: absolute;
      right: 10px;
      top: 5px;
      font-size: 24px;
      cursor: pointer;
      color: #333;
    }
    img {
      max-width: 100%;
      max-height: 80vh;
      object-fit: contain;
      display: block;
      margin: 0 auto;
    }
  `]
})
export class ImageModalComponent {
  @Input() imageUrl: string = '';
  @Output() closeModal = new EventEmitter<void>();

  close() {
    this.closeModal.emit();
  }
}
