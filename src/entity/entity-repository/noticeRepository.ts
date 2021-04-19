import { Connection, EntityRepository, getCustomRepository, Repository } from "typeorm";
import { Notice } from "../model/Notice";
import { Club } from "../model/Club";

@EntityRepository(Notice)
export class NoticeRepository extends Repository<Notice> {
    
    static getCustomRepository() {
        return getCustomRepository(NoticeRepository);
    }

    // club.name 로직 수정
    public async getNotice(user_id: string, size: string, page: string): Promise<Notice[]> {
          return this.createQueryBuilder('notice')
            .select("club.name", "club_name")
            .addSelect("notice.title", "notice_title")
            .addSelect("notice.content", "notice_content")
            .addSelect("notice.createdAt", "notice_date")
            .leftJoin("notice.club", "club")
            .limit(+size)
            .offset(+size * +page)
            .getMany();
    }

    public async getSpecificNotice(club_id: string): Promise<Notice[]> {
        return this.createQueryBuilder('notice')
            .select("club.name")
            .addSelect("notice.title")
            .addSelect("notice.content")
            .leftJoin("notice.club", "club")
            .where("notice.club = :id", { id: +club_id })
            .getRawMany();
    }

    public async createNotice(club: Club, title: string, content: string): Promise<void> {
        await this.createQueryBuilder()
            .insert()
            .into(Notice)
            .values([
                { club: club, title: title, content: content }
            ])
            .execute()
    }

    public async updateNotice(notice_id: string, title: string, content: string, ): Promise<void> {
        await this.createQueryBuilder()
            .update(Notice)
            .set({ title: title, content: content })
            .where("id = :id", { id: +notice_id})
            .execute()
    }

    public async deleteNotice(notice_id: string, notice: Notice): Promise<void> {
        await this.createQueryBuilder()
            .delete()
            .from(Notice)
            .where("id = :id", { id: +notice_id})
            .execute()
    }
}

