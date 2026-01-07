import { create } from 'zustand';

// Create a store with an initial state and actions
// const useCounterStore = create((set) => ({
//   count: 0,
//   increment: () => set((state) => ({ count: state.count + 1 })),
//   decrement: () => set((state) => ({ count: state.count - 1 })),
//   reset: () => set({ count: 0 }),
//   incrementByAmount: (amount) => set((state) => ({ count: state.count + amount })),
// }));
export const useSwitcherState = create((set) => ({
  switcher: null,
  setSwitcher: (trigger) => set((state) => ({ ...state, switcher: trigger })),
}));

export const useMessagesState = create((set) => ({
  messages: [],
  setMessages: (newMessage) => set((state) => ({ messages: [...state.messages, newMessage] })
  ),
  setAnimatedMessage: (index) => set((state) => {
    const updated = [...state.messages];
    updated[updated.length - 1].content = '•••'.slice(0, index);
    return ({ messages: updated })
  }),
  deleteLastMessage: () => set((state) => state.messages.pop()),
  setMessagesForBot: (newMessage, index) => set((state) => {
    const updated = [...state.messages];
    updated[updated.length - 1].content = newMessage.slice(0, index);
    return ({ messages: updated })
  }),
}))

export const useSessionId = create((set) => ({
  sessionId: null,
  setSessionId: (id) => set((state) => ({ ...state, sessionId: id })),
}));