export class AppConstants {

  public static get baseURL(): string {
    return 'http://localhost:4200/api';
  }

  public static responseCode() {
    return {
      NO_AUTORIZADO: 0,
      AUTORIZADO: 1,
      RESET_PASSWORD: 2,
      SESSION_ACTIVE: 3
    };
  }

  responseCode() {
    return {
      NO_AUTORIZADO: 0,
      AUTORIZADO: 1,
      RESET_PASSWORD: 2,
      SESSION_ACTIVE: 3
    };
  }
}
