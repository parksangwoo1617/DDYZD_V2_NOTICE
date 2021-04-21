import { Column, CreateDateColumn, Entity } from "typeorm";
import { EntityWithIdColumn } from "./EntityWithPrimaryColumn";

@Entity('notice')
export class Notice extends EntityWithIdColumn{
    @Column()
    title: string;

    @Column({ type: "varchar", length: 3000})
    content: string;

    @CreateDateColumn()
    createdAt: Date;

    @Column()
    writer: string;
}