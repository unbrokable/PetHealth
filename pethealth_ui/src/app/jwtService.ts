export const JWT = "jwt";

export const jwtService = {
  set: (value: string) => {
    localStorage.clear();
    localStorage.setItem(JWT, value);
  },
  get: () => {
    try {
      return localStorage.getItem(JWT);
    } catch {
      return null;
    }
  },
  remove: () => {
    localStorage.clear();
  },
  setRole: (role: string) => {
    localStorage.setItem("role", role);
  },
  getRole: (): string | null => {
    try {
      return localStorage.getItem("role") ?? "";
    } catch {
      return null;
    }
  },
};
