import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne } from "typeorm";
import { Club } from "./Club";
import { EntityWithIdColumn } from "./EntityWithPrimaryColumn";

@Entity('notice')
export class Notice extends EntityWithIdColumn{
    @Column()
    writer: string;
    
    @Column()
    title: string;

    @Column({ type: "varchar", length: 3000})
    content: string;

    @CreateDateColumn()
    createdAt: Date;

    @ManyToOne(type => Club, club => club.notice)
    @JoinColumn({ name: 'club_id'})
    club: Club;
}