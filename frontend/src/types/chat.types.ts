export interface Sender {
  id: string;
  name: string;
  role?: string;
}

export interface Message {
  _id?: string;
  sender: Sender | string;
  room: string;
  content: string;
  createdAt?: string;
  system?: boolean;
}