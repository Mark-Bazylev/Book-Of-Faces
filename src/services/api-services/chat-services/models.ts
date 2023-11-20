


export interface Message {
  _id: string;
  message: string,
  room: string,
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface ChatMessages {
  _id: string,
  createdBy: string,
  message: string,
  room: string,
  createdAt: string,
  updatedAt: string,
}

