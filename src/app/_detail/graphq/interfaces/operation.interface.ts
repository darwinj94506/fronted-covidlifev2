export interface IOperation {
    resolve: string;
    gpl: any
}  

export interface IOperations {
    create:IOperation;
    delete:IOperation;
    update:IOperation;
    all:IOperation;
}
