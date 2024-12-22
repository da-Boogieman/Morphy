export interface SecurityStatus {
  defenseStatus: {
    activeDefenses: number;
    totalStrength: number;
    integrityLevel: number;
  };
  failsafeStatus: string;
  securityLevel: number;
}

export interface SecurityConfig {
  maxAttempts: number;
  lockoutDuration: number;
  minSecurityLevel: number;
}

export interface DefenseConfig {
  autoActivate: boolean;
  minStrength: number;
  recoveryThreshold: number;
}