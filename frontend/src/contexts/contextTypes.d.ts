
interface AuthContextType {
    user: User | null;
    login: (userData: User) => void;
    logout: () => void;
    register: (userData: User) => void;
  }

interface ProfileContextType {
    profile: UserProfile<User> | null;
}

interface ContextProviderProps {
  [key: string]: typeof React.Children
}