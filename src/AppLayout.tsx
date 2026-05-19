import React, { useCallback, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import { Outlet, useLocation, useNavigate } from 'react-router-native';
import { Color } from '@/styles';
import { MainNav, MainNavTab, PageHeader } from '@/components';
import { useCreateTabActions } from '@/state-management/create-tab';
import { useAppSelector } from '@/state-management/providerHooks';
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
  '/tab': { title: '', tab: 'home' },
};

const TAB_ROUTES: Record<MainNavTab, string> = {
  home: '/home',
  newTab: '/create-tab',
  friends: '/friends',
  profile: '/profile',
};

const WIZARD_PREV_ROUTE: Record<string, string> = {
  '/create-tab/add-members': '/create-tab/tab-details',
  '/create-tab/build-menu': '/create-tab/add-members',
  '/create-tab/review': '/create-tab/build-menu',
};

export function AppLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { reset } = useCreateTabActions();
  const lastCreateTabRoute = useRef('/create-tab');
  const createTabInProgress = useAppSelector(
    (state) => state.createTab.tabName !== '',
  );

  if (location.pathname.startsWith('/create-tab')) {
    lastCreateTabRoute.current = location.pathname;
  }

  const config =
    ROUTE_CONFIG[location.pathname] ??
    (location.pathname.startsWith('/create-tab')
      ? ROUTE_CONFIG['/create-tab']
      : undefined) ??
    (location.pathname.startsWith('/tab/')
      ? ROUTE_CONFIG['/tab']
      : undefined) ??
    ROUTE_CONFIG['/home'];

  const title =
    (location.state as { title?: string } | null)?.title ?? config.title;

  const handleBack = useCallback(() => {
    const prevWizardRoute = WIZARD_PREV_ROUTE[location.pathname];
    if (prevWizardRoute) {
      navigate(prevWizardRoute, { replace: true });
    } else {
      navigate(-1);
    }
  }, [navigate, location.pathname]);

  const handleClose = useCallback(() => {
    lastCreateTabRoute.current = '/create-tab';
    reset();
    navigate('/home');
  }, [reset, navigate]);

  const handleTabPress = useCallback(
    (tab: MainNavTab) => {
      const target =
        tab === 'newTab'
          ? createTabInProgress
            ? lastCreateTabRoute.current
            : '/create-tab'
          : TAB_ROUTES[tab];
      if (target === location.pathname) {
        return;
      }
      navigate(target);
    },
    [navigate, location.pathname, createTabInProgress],
  );

  return (
    <View style={styles.screen}>
      <PageHeader
        title={title}
        onBack={
          config.wizard || location.pathname.startsWith('/tab/')
            ? handleBack
            : undefined
        }
        onClose={config.wizard ? handleClose : undefined}
      />

      <View style={styles.content}>
        <Outlet />
      </View>

      <MainNav
        activeTab={config.tab}
        badgeTabs={createTabInProgress ? ['newTab'] : []}
        onTabPress={handleTabPress}
      />

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
