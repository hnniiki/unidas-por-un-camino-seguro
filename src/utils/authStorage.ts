import { UserProfile } from '../types';
import { db } from '../lib/firebase';
import { 
  doc, 
  setDoc, 
  getDoc, 
  collection, 
  query, 
  where, 
  getDocs,
  getDocFromServer
} from 'firebase/firestore';

const STORAGE_USERS_KEY = 'unidas_registered_users_v1';
const STORAGE_CURRENT_USER_KEY = 'unidas_active_session_user_v1';

export const AVATAR_OPTIONS = [
  { id: 'owl', emoji: '🦉', label: 'Búho Sabio (Navi)' },
  { id: 'fox', emoji: '🦊', label: 'Zorro Astuto' },
  { id: 'star', emoji: '⭐', label: 'Estrella Brillante' },
  { id: 'llama', emoji: '🦙', label: 'Llama Andina' },
  { id: 'butterfly', emoji: '🦋', label: 'Mariposa Libre' },
  { id: 'sun', emoji: '☀️', label: 'Sol Radiante' },
  { id: 'shield', emoji: '🛡️', label: 'Guardián Seguro' },
  { id: 'heart', emoji: '💜', label: 'Corazón Valiente' },
];

export const AVATAR_COLORS = [
  '#4B2E4F', // Brand Plum
  '#7A6786', // Brand Lilac
  '#2E5A88', // Ocean Blue
  '#2E7D32', // Emerald Forest
  '#C2185B', // Rose Berry
  '#E65100', // Amber Sunset
  '#00838F', // Teal Andes
];

export const INTEREST_TAGS = [
  'Prevención & Anticoncepción',
  'Salud Emocional & Autoestima',
  'Relaciones Sanas & Consentimiento',
  'Diálogo con la Familia',
  'Rutas de Ayuda & Derechos',
  'Proyecto de Vida & Estudios',
];

interface StoredAccount {
  user: UserProfile;
  passwordHash: string;
}

// Test connection on boot
(async function checkFirestoreConnection() {
  try {
    await getDocFromServer(doc(db, '_connection_test', 'status'));
  } catch {
    // Offline mode / initial connection check
  }
})();

export const authStorage = {
  getRegisteredAccounts(): StoredAccount[] {
    try {
      const data = localStorage.getItem(STORAGE_USERS_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  saveRegisteredAccounts(accounts: StoredAccount[]) {
    try {
      localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(accounts));
    } catch (e) {
      console.warn('Could not save local accounts:', e);
    }
  },

  getCurrentUser(): UserProfile | null {
    try {
      const data = localStorage.getItem(STORAGE_CURRENT_USER_KEY);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  },

  saveCurrentUser(user: UserProfile | null) {
    try {
      if (user) {
        // 1. Immediate Local Storage Cache
        localStorage.setItem(STORAGE_CURRENT_USER_KEY, JSON.stringify(user));
        
        if (!user.isGuest) {
          const accounts = this.getRegisteredAccounts();
          const idx = accounts.findIndex(
            a => a.user.id === user.id || a.user.username.toLowerCase() === user.username.toLowerCase()
          );
          if (idx !== -1) {
            accounts[idx].user = { ...user };
            this.saveRegisteredAccounts(accounts);
          }

          // 2. Cloud Firestore Cloud Sync in background
          this.syncUserToFirestore(user).catch(err => {
            console.warn('Background Firestore sync note:', err);
          });
        }
      } else {
        localStorage.removeItem(STORAGE_CURRENT_USER_KEY);
      }
    } catch (e) {
      console.warn('Could not save current user:', e);
    }
  },

  async syncUserToFirestore(user: UserProfile) {
    try {
      if (user.isGuest) return;
      const userRef = doc(db, 'users', user.id || user.username);
      await setDoc(userRef, {
        id: user.id,
        username: user.username,
        displayName: user.displayName,
        age: user.age,
        birthDate: user.birthDate,
        avatarIcon: user.avatarIcon,
        avatarColor: user.avatarColor,
        interests: user.interests || [],
        isGuest: false,
        createdAt: user.createdAt,
        xp: user.xp,
        streak: user.streak,
        lastActiveDate: user.lastActiveDate,
        updatedAt: new Date().toISOString()
      }, { merge: true });
    } catch (e) {
      console.warn('Firestore write error (cached locally):', e);
    }
  },

  async registerUser(
    username: string,
    displayName: string,
    age: number,
    birthDate: string,
    password: string,
    avatarIcon: string = '🦉',
    avatarColor: string = '#4B2E4F',
    interests: string[] = []
  ): Promise<{ success: boolean; error?: string; user?: UserProfile }> {
    const cleanUsername = username.trim().toLowerCase();
    if (!cleanUsername) {
      return { success: false, error: 'Por favor ingresa un seudónimo válido.' };
    }
    if (cleanUsername.length < 3) {
      return { success: false, error: 'El seudónimo debe tener al menos 3 caracteres.' };
    }
    if (password.length < 4) {
      return { success: false, error: 'La contraseña debe tener al menos 4 caracteres.' };
    }

    const accounts = this.getRegisteredAccounts();
    const existingLocal = accounts.find(a => a.user.username.toLowerCase() === cleanUsername);
    if (existingLocal) {
      return { success: false, error: 'Este seudónimo ya está registrado en este dispositivo. Por favor inicia sesión.' };
    }

    const todayStr = new Date().toISOString().split('T')[0];
    const passwordHash = btoa(password);

    const newUser: UserProfile = {
      id: `user-${cleanUsername}`,
      username: cleanUsername,
      displayName: displayName.trim() || cleanUsername,
      age: Number(age) || 15,
      birthDate: birthDate || '2009-01-01',
      avatarIcon: avatarIcon || '🦉',
      avatarColor: avatarColor || '#4B2E4F',
      interests: interests.length > 0 ? interests : ['Prevención & Anticoncepción', 'Salud Emocional & Autoestima'],
      isGuest: false,
      createdAt: todayStr,
      xp: 0,
      streak: 1, // First day reward
      lastActiveDate: todayStr,
      unlockedBadgeIds: [],
      completedChallengeIds: []
    };

    // Save locally
    accounts.push({
      user: newUser,
      passwordHash
    });
    this.saveRegisteredAccounts(accounts);
    this.saveCurrentUser(newUser);

    // Save to Firestore with hashed credentials
    try {
      const userDocRef = doc(db, 'users', newUser.id);
      await setDoc(userDocRef, {
        ...newUser,
        passwordHash
      }, { merge: true });
    } catch (e) {
      console.info('Saved locally, Firestore will sync when connected:', e);
    }

    return { success: true, user: newUser };
  },

  async loginUser(username: string, password: string): Promise<{ success: boolean; error?: string; user?: UserProfile }> {
    const cleanUsername = username.trim().toLowerCase();
    const passwordHash = btoa(password);

    // 1. Check local storage first for instant response
    const accounts = this.getRegisteredAccounts();
    const localAccount = accounts.find(a => a.user.username.toLowerCase() === cleanUsername);

    if (localAccount) {
      if (localAccount.passwordHash !== passwordHash) {
        return { success: false, error: 'Contraseña incorrecta. Intenta nuevamente.' };
      }
      const updatedUser = this.calculateUpdatedStreak(localAccount.user);
      localAccount.user = updatedUser;
      this.saveRegisteredAccounts(accounts);
      this.saveCurrentUser(updatedUser);
      return { success: true, user: updatedUser };
    }

    // 2. Check Firestore cloud database if not found locally
    try {
      const userDocRef = doc(db, 'users', `user-${cleanUsername}`);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const cloudData = userDoc.data();
        if (cloudData.passwordHash && cloudData.passwordHash !== passwordHash) {
          return { success: false, error: 'Contraseña incorrecta. Intenta nuevamente.' };
        }

        const cloudUser: UserProfile = {
          id: cloudData.id || `user-${cleanUsername}`,
          username: cloudData.username || cleanUsername,
          displayName: cloudData.displayName || cleanUsername,
          age: cloudData.age || 15,
          birthDate: cloudData.birthDate || '2009-01-01',
          avatarIcon: cloudData.avatarIcon || '🦉',
          avatarColor: cloudData.avatarColor || '#4B2E4F',
          interests: cloudData.interests || [],
          isGuest: false,
          createdAt: cloudData.createdAt || new Date().toISOString().split('T')[0],
          xp: cloudData.xp || 0,
          streak: cloudData.streak || 1,
          lastActiveDate: cloudData.lastActiveDate || new Date().toISOString().split('T')[0],
          unlockedBadgeIds: cloudData.unlockedBadgeIds || [],
          completedChallengeIds: cloudData.completedChallengeIds || []
        };

        const updatedUser = this.calculateUpdatedStreak(cloudUser);
        
        // Cache locally for offline use
        accounts.push({ user: updatedUser, passwordHash });
        this.saveRegisteredAccounts(accounts);
        this.saveCurrentUser(updatedUser);

        return { success: true, user: updatedUser };
      }
    } catch (err) {
      console.warn('Firestore login lookup note:', err);
    }

    return { success: false, error: 'No encontramos ninguna cuenta con ese seudónimo.' };
  },

  createGuestSession(): UserProfile {
    const todayStr = new Date().toISOString().split('T')[0];
    const guestUser: UserProfile = {
      id: `guest-${Date.now()}`,
      username: 'invitado',
      displayName: 'Invitado(a) Curioso(a)',
      age: 15,
      birthDate: '2009-01-01',
      avatarIcon: '🌱',
      avatarColor: '#7A6786',
      interests: ['Prevención & Anticoncepción', 'Salud Emocional & Autoestima'],
      isGuest: true,
      createdAt: todayStr,
      xp: 0,
      streak: 0,
      lastActiveDate: todayStr,
      unlockedBadgeIds: [],
      completedChallengeIds: []
    };

    this.saveCurrentUser(guestUser);
    return guestUser;
  },

  calculateUpdatedStreak(user: UserProfile): UserProfile {
    const todayStr = new Date().toISOString().split('T')[0];
    if (user.lastActiveDate === todayStr) {
      return user;
    }

    const lastActive = new Date(user.lastActiveDate);
    const today = new Date(todayStr);
    const diffTime = Math.abs(today.getTime() - lastActive.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    let newStreak = user.streak;
    if (diffDays === 1) {
      newStreak += 1; // Consecutive day
    } else if (diffDays > 1) {
      newStreak = 1; // Streak reset to 1
    }

    return {
      ...user,
      streak: newStreak,
      lastActiveDate: todayStr
    };
  }
};
