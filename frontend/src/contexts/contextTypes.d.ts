
interface AuthContextType {
    user: User | null;
    login: (userData: User) => void;
    logout: () => void;
    register: (userData: User) => void;
    authToken: string | null
  }

interface ProfileContextType<T extends boolean> {
    profile: UserProfile<User> | null;
    showNavbar: T,
    setShowNavbar: React.Dispatch<React.SetStateAction<T>>
}

type ContextProviderProps = React.PropsWithChildren 