
interface AuthContextType {
    user: User | null;
    login: (userData: User) => void;
    logout: () => void;
  }

interface ProfileContextType {
    profile: UserProfile<User> | null;
}