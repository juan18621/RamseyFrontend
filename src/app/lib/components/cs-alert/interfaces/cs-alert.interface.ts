export interface AlertInfo {
  title?: string;
  msg?: string;
  msgList?: CustomMessage;
  showIcon?: boolean;
  iconName?: string;
  color?: 'primary' | 'danger' | 'success' | 'white';
  buttons?: ButtonAlert[];
}

export interface ButtonAlert {
  buttonText: string;
  buttonHandler: any;
  buttonColor: 'primary' | 'danger' | 'success' | 'white' | 'dark';
  buttonIcon?: string;
}

export interface CustomMessage {
  msg: string;
  icon: string;
  iconSlot: string;
}
