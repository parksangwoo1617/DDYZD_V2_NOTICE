import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from "typeorm";
import { User } from "./User";
import { Club } from "./Club";
import { EntityWithIdColumn } from "./EntityWithPrimaryColumn";

@Entity('notice')
export class Notice extends EntityWithIdColumn{
    @Column()
    user_id: number;

    @Column()
    title: string;

    @Column({ type: "varchar", length: 3000, name: "content"})
    content: string;

    @OneToOne(type => Club, club_id => Club.id)
    @JoinColumn()
    club_id: number;
}