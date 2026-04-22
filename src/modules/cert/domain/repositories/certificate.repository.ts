import { CertificateEntity } from '../entities/certificate.entity';

export interface ICertificateRepository {
  runInTransaction<T>(
    work: (repo: ICertificateRepository) => Promise<T>,
  ): Promise<T>;
  clearTempTable(): Promise<void>;
  saveTemp(certificates: CertificateEntity[]): Promise<void>;
  getTempByEsfm(
    tipo: 'TACFI' | 'TCLO',
    codigoEsfm: number,
  ): Promise<CertificateEntity[]>;
  countPendingInTemp(): Promise<number>;
  getLastId(tipo: 'TACFI' | 'TCLO'): Promise<number>;
  runValidationProcedure(codigoEsfm: number, tipoCer: number): Promise<void>;
  migrateToHistory(tipo: 'TACFI' | 'TCLO'): Promise<void>;
  getCertificateWithDetails(id: number, tipo: 'TACFI' | 'TCLO'): Promise<any>;
  findInHistoryByStudentCode(
    codigo: string,
    tipo: 'TACFI' | 'TCLO',
  ): Promise<any[]>;
}
