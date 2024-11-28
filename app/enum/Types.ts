export interface Company {
  id: string;
  name: string
}

export interface Locations {
  id: string;
  name: string
  parentId: string | null
}

export interface LocationsOrganized extends Locations {
  children: LocationsOrganized[]
}