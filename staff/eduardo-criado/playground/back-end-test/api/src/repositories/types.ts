export interface IUserData {
  id: string;
  nombre: string;
  email: string;
  tipo_permiso: TipoPermiso;
  permiso_valido_hasta: Date;
}

export enum TipoPermiso {
  A = "A", // Moto
  B = "B", // Coche
  C = "C", // Camión
}

export enum TipoVehiculo {
  MOTO = "moto",
  COCHE = "coche",
  CAMION = "camion",
}

export const PERMISO_VEHICULO_MAP: Record<TipoPermiso, TipoVehiculo> = {
  [TipoPermiso.A]: TipoVehiculo.MOTO,
  [TipoPermiso.B]: TipoVehiculo.COCHE,
  [TipoPermiso.C]: TipoVehiculo.CAMION,
};

export interface IUserRepository {
  get(id: string): Promise<IUserData>;
  getAll(): Promise<IUserData[]>;
  create(user: IUserData): Promise<IUserData>;
  update(user: IUserData): Promise<IUserData>;
  delete(id: string): Promise<void>;
}

export interface IVehicleData {
  id: string;
  marca: string;
  modelo: string;
  matricula: string;
  tipo: TipoVehiculo;
  propietario_id: string;
}

export interface IVehicleRepository {
  get(id: string): Promise<IVehicleData>;
  getAll(): Promise<IVehicleData[]>;
  create(vehicle: IVehicleData): Promise<IVehicleData>;
  update(vehicle: IVehicleData): Promise<IVehicleData>;
  delete(id: string): Promise<void>;
}

export interface TransferOwnershipData {
  vehicleId: string;
  newOwnerId: string;
}
