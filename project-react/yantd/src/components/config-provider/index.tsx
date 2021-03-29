import React from "react";
import { ConfigContext, ConfigConsumer, ConfigConsumerProps } from "./context";

export {
  ConfigContext, ConfigConsumer
};
export type { ConfigConsumerProps };

export const configConsumerProps = [
  'getTargetContainer',
  'getPopupContainer',
  'rootPrefixCls',
  'getPrefixCls',
  'renderEmpty',
  'csp',
  'autoInsertSpaceInButton',
  'locale',
  'pageHeader',
];

export const defaultPrefixCls = 'yant';

export interface ConfigProviderProps {
  getTargetContainer?: () => HTMLElement;
  getPopupContainer?: (triggerNode: HTMLElement) => HTMLElement;
  prefixCls?: string;
  iconPrefixCls?: string;
  children?: React.ReactNode;
}

let globalPrefixCls: string;
function getGlobalPrefixCls() {
  return globalPrefixCls || defaultPrefixCls;
}

const ConfigProvider: React.FC<ConfigProviderProps> & {
  ConfigContext: typeof ConfigContext;
  config: typeof setGlobalConfig;
} = props => {
  return (
    <ConfigContext.Provider value={{getPrefixCls: globalConfig().getPrefixCls}}>{props.children}</ConfigContext.Provider>
  );
};

const setGlobalConfig = (params: Pick<ConfigProviderProps, 'prefixCls'>) => {
  if (params.prefixCls !== undefined) {
    globalPrefixCls = params.prefixCls;
  }
};

export const globalConfig = () => ({
  getPrefixCls: (suffixCls?: string, customizePrefixCls?: string) => {
    if (customizePrefixCls) return customizePrefixCls;
    return suffixCls ? `${getGlobalPrefixCls()}-${suffixCls}` : getGlobalPrefixCls();
  },
  getRootPrefixCls: (rootPrefixCls?: string, customizePrefixCls?: string) => {
    // Customize rootPrefixCls is first priority
    if (rootPrefixCls) {
      return rootPrefixCls;
    }

    // If Global prefixCls provided, use this
    if (globalPrefixCls) {
      return globalPrefixCls;
    }

    // [Legacy] If customize prefixCls provided, we cut it to get the prefixCls
    if (customizePrefixCls && customizePrefixCls.includes('-')) {
      return customizePrefixCls.replace(/^(.*)-[^-]*$/, '$1');
    }

    // Fallback to default prefixCls
    return getGlobalPrefixCls();
  },
});

ConfigProvider.ConfigContext = ConfigContext;
ConfigProvider.config = setGlobalConfig;

export default ConfigProvider;