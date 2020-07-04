export interface Operations {
    create:string;
    delete:string;
    update:string;
    all:string;
}

export interface ProvinceOperations extends Operations {
    create : "addProvince",
    delete : "deleteProvince",
    update : "updateProvince",
    all : "allProvincel"
}
