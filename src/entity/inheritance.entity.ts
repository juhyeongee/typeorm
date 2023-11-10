import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export class BaseModel{

    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}

@Entity()
export class BookModel extends BaseModel {

    @Column()
    name: string;
}

@Entity()
export class CarModel extends BaseModel {

    @Column()
    brand: string;
}

export class SingleBaseModel{

    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}

export class ComputerModel extends SingleBaseModel{
    @Column()
    brand: string ;
}

export class AirplaneModel extends SingleBaseModel{
    @Column()
    country : string ;
}