export interface IPersonRepository {
  // Buscar en la base de datos externa (SIFM)
  findInSifmByCode(codigoEstudiante: string): Promise<any>;
  // Guardar en la tabla local (certificacion_persona)
  upsertLocalPerson(personData: any): Promise<void>;
}
