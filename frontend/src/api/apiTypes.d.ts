type UserType = 'member' | 'cm';
type ExperienceType = 'activity' | 'task'

interface User {
    first_name: string,
    last_name: string,
    email: string,
    password: string,
    user_type: UserType
}

interface RegisterResponse {
    user: Partial<User>,
    token: string
}

interface MemberProfile {

}

interface ManagerProfile {

}

// change if userType more than 2
type UserProfile<T extends User> = T['user_type'] extends 'member' ? MemberProfile : ManagerProfile;

type QuestSearchResponseItem = {
    quest_id: string,
    quest_title: string,
    quest_description: string,
    quest_location: string,
    score: number
}

type QuestSearchResponse = {
    quests: Array<QuestSearchResponseItem>
}

type CreateQuestInfo = {
    quest_date: string,
    quest_title: string,
    quest_duration: number,
    quest_description: string,
    exp_ids: Array<string>,
}

type QuestInfo = CreateQuestInfo & {
    quest_id: string
}

type CreateExperienceInfo = {
    exp_title: string,
    exp_description: string,
    exp_type: ExperienceType,
    exp_date: string,
    exp_start_time: number,
    exp_end_time: number,
    agent_name: string,
    agent_phone: string,
    agent_location: string
}

type ExperienceInfo = CreateExperienceInfo & {
    exp_id: string
}

type QuestDetails = QuestInfo & {
    exps: Array<ExperienceInfo>
}

type GetExperienceResponse = Array<ExperienceInfo>
type GetQuestResponse = Array<QuestInfo>


