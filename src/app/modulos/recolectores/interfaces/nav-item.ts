export interface NavItem {
  displayName: string;
  disabled?: boolean;
  iconName: string;
  route?: string;
  children?: NavItem[];

  // linkReportes
  // esReporte?: boolean;
  // nombreReporte?: string;
  // dataReporte?: any;

  // Modal Data
  esModal?: boolean;
  disableClickOutside?: boolean;
  modal?: any;
  height?: string;
  width?: string;
  parametrosModal?: {};


  // documento manual modulo
  manual?: boolean;
  linkManual?: string;
}
