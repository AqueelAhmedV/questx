type UserType = 'member' | 'cm';

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
