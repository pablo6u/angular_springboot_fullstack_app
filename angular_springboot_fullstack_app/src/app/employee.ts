export class Employee {
    // "!" is used to tell TypeScript that these properties will be definitely assigned a value, even though they are not initialized in the constructor.
    public id!: number;
    public firstName!: string;
    public lastName!: string;
    public emailId!: string;
}
