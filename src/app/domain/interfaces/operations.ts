export interface IOperations {
    create:string;
    delete:string;
    update:string;
    all:string;
}

export const PROVINCE_OPERATIONS : IOperations = {
    create : "addProvince",
    delete : "deleteProvince",
    update : "updateProvince",
    all : "allProvincel"
}
