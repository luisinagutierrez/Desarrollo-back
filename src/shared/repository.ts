export interface Repository<T> {
    findAll(): Promise<T[] | undefined>;
    findOne(item: {id: string}): Promise<T | undefined>; //exijo que se envie el id
    add(item: T): Promise<T | undefined>;
    update(item: T): Promise<T | undefined>;
    delete(item: {id: string}): Promise<T | undefined> //exijo que se envie el id
    //find(item:Partial<T>):T[]|undefined
  }