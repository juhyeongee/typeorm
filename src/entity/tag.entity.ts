import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { PostModel } from "./post.entity";
import { UserModel } from "./user.entity";

@Entity()
export class TagModel{
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToMany(()=> UserModel, (user) => user.posts)
    posts: PostModel[];

    @Column()
    name: string;
}