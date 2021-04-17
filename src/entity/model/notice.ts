import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne } from "typeorm";
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

    @CreateDateColumn()
    createdAt: Date;

    @OneToOne(type => Club, club => club.notice)
    @JoinColumn({ name: 'club_id'})
    club: Club;

    @Column()
    club_name: string;
}