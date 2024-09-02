//permet de passer 2 (ou plusieurs attributs) au ngModel
export interface ChatMessage {
    content: string; // Le contenu du message
    isTypingValue: boolean; // Indique si l'utilisateur est en train de taper
  }