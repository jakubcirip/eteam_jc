export interface Question {
  type: string;
  data: {
    'read-time': number;
    'answer-time': number;
    'play-time'?: number;
    text: string;
    url?: string;
  };
}
