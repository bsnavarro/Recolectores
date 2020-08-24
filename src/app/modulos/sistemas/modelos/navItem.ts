export class NavItem {
  displayName: string;
  disabled?: boolean;
  iconName: string;
  route?: string;
  param?: any;
  modoOperacion?: string;
  children?: NavItem[];
}
