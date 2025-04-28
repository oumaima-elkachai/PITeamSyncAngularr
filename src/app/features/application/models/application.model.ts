
  export interface Application {
    id?: string;
    jobTitle: string;
    jobId: string;
    candidateId: string;
    candidateName: string;
    candidateEmail: string;
    cvUrl: string;
    status?: string;
    submittedAt?: Date;
    experience: number;
    candidatePhone:  string;
    candidatePortfolio: string;
    candidateLinkedIn: string;
    candidateGithub: string;
    score: number;
    quizScore?: number; // Added for quiz score

  }
  