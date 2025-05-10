// src/app/models/attachment.model.ts
export interface Attachment {
    id: string;
    taskId: string;
    fileName: string;
    fileType: string;
    fileSize: number;
    uploadedAt: Date;
    uploadedBy: string;
  }