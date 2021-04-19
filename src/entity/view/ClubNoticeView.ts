import { Connection, ViewColumn, ViewEntity } from "typeorm";
import { Club } from "../model";

@ViewEntity({
    name: "club_clubHead_notice_view",
    expression: (connection: Connection) => connection.createQueryBuilder(Club, "club")
        .select("club.id", "club_id")
        .addSelect("club.name", "club_name")
        .addSelect("notice.title", "title")
        .addSelect("notice.content", "content")
        .leftJoin("club.head", "clubHead")
        .leftJoin("clubHead.club", "club")
        .leftJoin("notice.club", "club")
})

export class ClubNoticeView {
    @ViewColumn()
    user_id: number;

    @ViewColumn()
    club_id: number;

    @ViewColumn()
    club_name: string;

    @ViewColumn()
    title: string;

    @ViewColumn()
    content: string;

}