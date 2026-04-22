import { IsEnum, IsNumber, IsNotEmpty } from 'class-validator';

export class EmitCertificateDto {
  @IsEnum(['TACFI', 'TCLO'], { message: 'El tipo debe ser TACFI o TCLO' })
  @IsNotEmpty()
  tipo!: 'TACFI' | 'TCLO';

  @IsNumber({}, { message: 'El código ESFM debe ser un número válido' })
  @IsNotEmpty()
  codigo_esfm!: number;

  @IsNumber({}, { message: 'La hoja de ruta debe ser un número válido' })
  @IsNotEmpty()
  hoja_ruta!: number;
}
