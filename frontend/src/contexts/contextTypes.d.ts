
interface AuthContextType {
    user: User | null;
    login: (userData: User) => void;
    logout: () => void;
    register: (userData: User) => void;
  }

interface ProfileContextType {
    profile: UserProfile<User> | null;
}

type ContextProviderProps = React.PropsWithChildren 