import { Injectable } from '@nestjs/common';
import { CestService } from 'src/core/infrastructure/prisma/cest.service';
import { SifmService } from 'src/core/infrastructure/prisma/sifm.service';
import { IPersonRepository } from '../../domain/repositories/person.repository';

@Injectable()
export class PrismaPersonRepository implements IPersonRepository {
  constructor(
    private pg: CestService, // Postgres
    private mysql: SifmService, // MySQL SIFM
  ) {}

  async findInSifmByCode(codigoEstudiante: string) {
    return await this.mysql.t_personas.findUnique({
      where: { cod_pers: codigoEstudiante },
    });
  }

  async upsertLocalPerson(sifmData: any) {
    await this.pg.certificacion_persona.upsert({
      where: { cod_pers: sifmData.cod_pers },
      update: {
        nombre: `${sifmData.nombre1} ${sifmData.nombre2 || ''}`.trim(),
        paterno: sifmData.apellido1,
        materno: sifmData.apellido2,
        cedula: sifmData.nro_docum,
      },
      create: {
        cod_pers: sifmData.cod_pers,
        nombre: `${sifmData.nombre1} ${sifmData.nombre2 || ''}`.trim(),
        paterno: sifmData.apellido1,
        materno: sifmData.apellido2,
        cedula: sifmData.nro_docum,
      },
    });
  }
}
