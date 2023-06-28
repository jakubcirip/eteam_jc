export interface Mail {
  id: number;
  email: string;
  attempt: number;
  type: string;
  data: string;
  success: boolean;
  hr_email_id: number;
  division_sender_id: number;
}
