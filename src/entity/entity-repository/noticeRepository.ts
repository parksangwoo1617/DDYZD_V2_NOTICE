import { EntityRepository, getCustomRepository, Repository } from "typeorm";
import { Notice } from "../model";

@EntityRepository(Notice)
export class NoticeRepository extends Repository<Notice> {

}

