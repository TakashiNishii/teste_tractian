export interface Company {
  id: string;
  name: string
}

export interface Locations {
  id: string;
  name: string
  parentId: string | null
}
export interface Assets extends Locations {
  sensorId?: string | null
  sensorType?: string | null
  status?: string | null
  gatewayId?: string | null
  typeAssets: string
}

export interface AssetsOrganized extends Assets {
  children: AssetsOrganized[]
}