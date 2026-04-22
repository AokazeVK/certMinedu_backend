export class CertificateEntity {
  constructor(
    public readonly id: number,
    public readonly nombre: string,
    public readonly paterno: string | null,
    public readonly materno: string | null,
    public readonly cedula: string,
    public readonly codigoEstudiante: string,
    public readonly gestion: number,
    public readonly tipo: 'TACFI' | 'TCLO',
    public readonly hojaRuta: number,
    public readonly codigoEsfm: number,
    public readonly taller: string | null,
    public readonly tacfi: string | null,
    public readonly nivel: string | null,
    public readonly lenguaOriginaria: string | null,
    public readonly cargaHoraria: number | null,
    // Los que no envías en el 'new' van al final con valor por defecto
    public readonly especialidad: string | null = null,
    public readonly validaDatos: number | null = null,
    public readonly cantidadDatos: number | null = null,
  ) {}

  getFullName(): string {
    return `${this.nombre} ${this.paterno ?? ''} ${this.materno ?? ''}`
      .trim()
      .toUpperCase();
  }
}
