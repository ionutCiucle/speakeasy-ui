import React, { useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { Outlet, useLocation, useNavigate } from 'react-router-native';
import { Color } from '@/styles';
import { MainNav, MainNavTab, PageHeader } from '@/components';
import { ModalRoot } from './ModalRoot';

interface RouteConfig {
  title: string;
  tab: MainNavTab;
  wizard?: boolean;
}

const ROUTE_CONFIG: Record<string, RouteConfig> = {
  '/home': { title: 'My Tabs', tab: 'home' },
  '/profile': { title: 'Profile', tab: 'profile' },
  '/create-tab': { title: 'New Tab', tab: 'newTab', wizard: true },
};

const TAB_ROUTES: Record<MainNavTab, string> = {
  home: '/home',
  newTab: '/create-tab',
  friends: '/friends',
  profile: '/profile',
};

export function AppLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const config =
    ROUTE_CONFIG[location.pathname] ??
    (location.pathname.startsWith('/create-tab')
      ? ROUTE_CONFIG['/create-tab']
      : undefined) ??
    ROUTE_CONFIG['/home'];

  const handleBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const handleClose = useCallback(() => {
    navigate('/home');
  }, [navigate]);

  const handleTabPress = useCallback(
    (tab: MainNavTab) => {
      if (TAB_ROUTES[tab] === location.pathname) {
        return;
      }
      navigate(TAB_ROUTES[tab]);
    },
    [navigate, location.pathname],
  );

  return (
    <View style={styles.screen}>
      <PageHeader
        title={config.title}
        onBack={config.wizard ? handleBack : undefined}
        onClose={config.wizard ? handleClose : undefined}
      />

      <View style={styles.content}>
        <Outlet />
      </View>

      <MainNav activeTab={config.tab} onTabPress={handleTabPress} />

      <ModalRoot />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Color.Cream,
  },
  content: {
    flex: 1,
  },
});
