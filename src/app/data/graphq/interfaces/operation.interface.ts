export interface IOperation {
    resolve: string;
    gql: any
}  

export interface IOperations {
    create:IOperation;
    delete:IOperation;
    update:IOperation;
    // all:IOperation;
}
