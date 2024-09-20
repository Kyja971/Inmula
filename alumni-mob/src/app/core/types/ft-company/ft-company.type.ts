import { CompanyItemsType } from "./company-items.type"

export type FTCompanyType = {
  hits: number,
  params: {
    citycode: Array<string>,
    department: Array<string>,
    page: number,
    page_size: number,
    postcode: Array<string>,
    rome: Array<string>,
    sort_by: string,
    sort_direction: string,
  },
  resolved_params: {
    jobs: Array<{
      display: string,
      selection: string,
      type: string,
      value: string,
    }>,
    locations: Array<{
      display: string,
      geo: {
        latitude: number,
        longitude: number
      },
      selection: string,
      type: string,
      value: string
    }>
  },
  items: Array<CompanyItemsType>
}