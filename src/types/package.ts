export interface Package {
    responseResult: boolean
    message: string
    data: PackageItem[]
}

export interface PackageItem {
    id?: number
    id_banner_ads_package: string
    package_name: string
    package_description: string
    package_price: number
    package_duration: number
    created_at: string
    package_is_active: boolean
}
