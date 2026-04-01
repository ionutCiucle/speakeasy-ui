import React from 'react';
import { Feather, Ionicons } from '@expo/vector-icons';
import { MainNavTab } from './MainNav';

interface Props {
  tab: MainNavTab;
  color: string;
}

export function NavIcon({ tab, color }: Props) {
  switch (tab) {
    case 'home': {
      return <Feather name="menu" size={20} color={color} />;
    }
    case 'newTab': {
      return <Feather name="plus" size={22} color={color} />;
    }
    case 'friends': {
      return <Ionicons name="people-outline" size={22} color={color} />;
    }
    case 'profile': {
      return <Feather name="user" size={18} color={color} />;
    }
  }
}
