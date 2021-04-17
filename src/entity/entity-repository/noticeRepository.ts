import { Connection, EntityRepository, getCustomRepository, Repository } from "typeorm";
import { Notice } from "../model/Notice";
import { Club } from "../model/Club";

@EntityRepository(Notice)
export class NoticeRepository extends Repository<Notice> {
    
    static getCustomRepository() {
        return getCustomRepository(NoticeRepository);
    }

    public async getNotice(size: string, page: string): Promise<Notice[]> {
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

    public async createNotice(): Promise<Notice> {
        const createNotice = this.createQueryBuilder()
            .insert()
            .into(Notice)
            .values([
                { club_name: }
            ])
        return this.save(createNotice);
    }

    public async deleteNotice(club: Club, notice: Notice): Promise<void> {
        await this.delete({ club, notice });
    }
    
}

