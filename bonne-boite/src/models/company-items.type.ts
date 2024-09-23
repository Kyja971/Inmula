export type CompanyItemsType = {
  city: string;
  citycode: string;
  company_name: string;
  department: string;
  department_number: number;
  headcount_max: string;
  headcount_min: string;
  hiring_potential: number;
  id: number;
  is_high_potential: boolean;
  location: {
    lat: number;
    lon: number;
  };
  naf: string;
  naf_label: string;
  office_name: string;
  postcode: string;
  region: string;
  rome: string;
  siret: string;
};
