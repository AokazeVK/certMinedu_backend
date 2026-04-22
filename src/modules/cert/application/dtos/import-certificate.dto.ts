// src/modules/cert/application/dtos/import-certificate.dto.ts
import { IsNotEmpty, IsNumber, IsEnum, IsArray } from 'class-validator';

export class ImportCertificateDto {
  @IsEnum(['TACFI', 'TCLO'], { message: 'El tipo debe ser TACFI o TCLO' })
  tipo!: 'TACFI' | 'TCLO';

  @IsNumber({}, { message: 'El código ESFM debe ser un número' })
  codigo_esfm!: number;

  @IsNumber({}, { message: 'La hoja de ruta debe ser un número' })
  hoja_ruta!: number;

  @IsArray()
  excelData!: any[];
}
